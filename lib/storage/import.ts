/**
 * Journal Import Utility
 *
 * Parses and imports previously exported journal entries.
 * Validates format and handles duplicate detection during import.
 */

import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import type { JournalEntry } from './store';

export type ImportFormat = 'text' | 'markdown' | 'json';

export interface ImportValidationError {
  entryIndex: number;
  reason: string;
  rawContent?: string;
}

export interface DuplicateMatch {
  newEntry: ParsedEntry;
  existingEntry: JournalEntry;
  matchType: 'id' | 'content_timestamp' | 'content_exact';
}

export interface ParsedEntry {
  content: string;
  mood?: string;
  createdAt: number;
  originalId?: string;
}

export interface ImportResult {
  success: boolean;
  imported: number;
  skipped: number;
  duplicates: DuplicateMatch[];
  errors: ImportValidationError[];
  entries: ParsedEntry[];
  error?: string;
}

// Valid mood emojis that can be imported
const VALID_MOODS = ['😊', '😌', '🤔', '😔', '😤', '😴', '🙏', '💪'];

/**
 * Parse date string from export format back to timestamp
 * Handles formats like "Thursday, January 13, 2026"
 */
function parseDateString(dateStr: string): Date | null {
  try {
    // Remove weekday prefix if present
    const withoutWeekday = dateStr.replace(/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday),?\s*/i, '');
    const date = new Date(withoutWeekday);
    if (isNaN(date.getTime())) {
      return null;
    }
    return date;
  } catch {
    return null;
  }
}

/**
 * Parse time string from export format
 * Handles formats like "3:14 PM" or "10:30 AM"
 */
function parseTimeString(timeStr: string, baseDate: Date): Date | null {
  try {
    const match = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (!match) return null;

    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const period = match[3].toUpperCase();

    if (period === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }

    const result = new Date(baseDate);
    result.setHours(hours, minutes, 0, 0);
    return result;
  } catch {
    return null;
  }
}

/**
 * Validate a mood string
 */
function validateMood(mood: string | undefined): string | undefined {
  if (!mood) return undefined;
  const trimmed = mood.trim();
  return VALID_MOODS.includes(trimmed) ? trimmed : undefined;
}

/**
 * Parse plain text export format
 */
export function parseTextExport(content: string): { entries: ParsedEntry[]; errors: ImportValidationError[] } {
  const entries: ParsedEntry[] = [];
  const errors: ImportValidationError[] = [];

  // Split by entry delimiter
  const entryDelimiter = '───────────────────────────────────────────────────────────────';
  const footerDelimiter = '═══════════════════════════════════════════════════════════════';
  const sections = content.split(entryDelimiter);

  // Skip header section (first section before first delimiter)
  let entryIndex = 0;
  for (let i = 1; i < sections.length; i++) {
    let section = sections[i].trim();
    if (!section || section.startsWith('═══')) continue; // Skip footer

    // Remove any footer content that might be in the last section
    const footerIndex = section.indexOf(footerDelimiter);
    if (footerIndex !== -1) {
      section = section.slice(0, footerIndex).trim();
    }

    if (!section) continue;

    const lines = section.split('\n').map(l => l.trim()).filter(l => l);
    if (lines.length < 3) {
      errors.push({ entryIndex, reason: 'Entry section too short', rawContent: section.slice(0, 100) });
      entryIndex++;
      continue;
    }

    // Parse entry header
    let dateStr: string | null = null;
    let timeStr: string | null = null;
    let mood: string | undefined;
    let contentStartIndex = 0;

    for (let j = 0; j < lines.length; j++) {
      const line = lines[j];

      if (line.startsWith('Entry ')) {
        continue; // Skip "Entry X of Y" line
      }
      if (line.startsWith('Date: ')) {
        dateStr = line.replace('Date: ', '').trim();
        continue;
      }
      if (line.startsWith('Time: ')) {
        timeStr = line.replace('Time: ', '').trim();
        continue;
      }
      if (line.startsWith('Mood: ')) {
        mood = line.replace('Mood: ', '').trim();
        continue;
      }

      // First line that doesn't match headers is content start
      contentStartIndex = j;
      break;
    }

    if (!dateStr) {
      errors.push({ entryIndex, reason: 'Missing date', rawContent: section.slice(0, 100) });
      entryIndex++;
      continue;
    }

    const parsedDate = parseDateString(dateStr);
    if (!parsedDate) {
      errors.push({ entryIndex, reason: `Invalid date format: ${dateStr}`, rawContent: section.slice(0, 100) });
      entryIndex++;
      continue;
    }

    let timestamp: number;
    if (timeStr) {
      const dateWithTime = parseTimeString(timeStr, parsedDate);
      timestamp = dateWithTime ? dateWithTime.getTime() : parsedDate.getTime();
    } else {
      timestamp = parsedDate.getTime();
    }

    // Extract content (everything after headers), but filter out footer lines
    const contentLines = lines.slice(contentStartIndex).filter(line =>
      !line.startsWith('═══') &&
      line !== 'END OF EXPORT' &&
      line !== 'Exported from Sage AI'
    );
    const entryContent = contentLines.join('\n').trim();

    if (!entryContent) {
      errors.push({ entryIndex, reason: 'Empty content', rawContent: section.slice(0, 100) });
      entryIndex++;
      continue;
    }

    entries.push({
      content: entryContent,
      mood: validateMood(mood),
      createdAt: timestamp,
    });
    entryIndex++;
  }

  return { entries, errors };
}

/**
 * Parse markdown export format
 */
export function parseMarkdownExport(content: string): { entries: ParsedEntry[]; errors: ImportValidationError[] } {
  const entries: ParsedEntry[] = [];
  const errors: ImportValidationError[] = [];

  // Split by horizontal rule (entry separator)
  const sections = content.split(/\n---\n/);

  let entryIndex = 0;
  for (const section of sections) {
    const trimmed = section.trim();

    // Skip header section and footer
    if (trimmed.startsWith('# Sage Journal Export') ||
        trimmed.startsWith('*Exported from Sage AI') ||
        trimmed.includes('**Exported:**') ||
        trimmed.includes('**Total Entries:**')) {
      continue;
    }

    // Look for entry pattern: ## Date header followed by *Time* and optional Mood
    const headerMatch = trimmed.match(/^## (.+?)$/m);
    if (!headerMatch) continue;

    const dateStr = headerMatch[1].trim();
    const parsedDate = parseDateString(dateStr);
    if (!parsedDate) {
      errors.push({ entryIndex, reason: `Invalid date format: ${dateStr}`, rawContent: trimmed.slice(0, 100) });
      entryIndex++;
      continue;
    }

    // Find time (format: *3:14 PM*)
    const timeMatch = trimmed.match(/\*(\d{1,2}:\d{2}\s*(?:AM|PM))\*/i);
    let timestamp: number;
    if (timeMatch) {
      const dateWithTime = parseTimeString(timeMatch[1], parsedDate);
      timestamp = dateWithTime ? dateWithTime.getTime() : parsedDate.getTime();
    } else {
      timestamp = parsedDate.getTime();
    }

    // Find mood (format:   •  **Mood:** 😌)
    const moodMatch = trimmed.match(/\*\*Mood:\*\*\s*(.+?)$/m);
    const mood = moodMatch ? validateMood(moodMatch[1].trim()) : undefined;

    // Extract content: everything after headers
    let contentStartIndex = trimmed.indexOf('\n\n');
    if (contentStartIndex === -1) {
      errors.push({ entryIndex, reason: 'Cannot find content section', rawContent: trimmed.slice(0, 100) });
      entryIndex++;
      continue;
    }

    // Find where actual content starts (after date, time, mood lines)
    const lines = trimmed.split('\n');
    let contentLines: string[] = [];
    let foundContent = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      // Skip header lines
      if (line.startsWith('##') || line.startsWith('*') || line.includes('**Mood:**')) {
        continue;
      }
      // Skip empty lines before content
      if (!foundContent && !line.trim()) {
        continue;
      }
      foundContent = true;
      contentLines.push(line);
    }

    const entryContent = contentLines.join('\n').trim();
    if (!entryContent) {
      errors.push({ entryIndex, reason: 'Empty content', rawContent: trimmed.slice(0, 100) });
      entryIndex++;
      continue;
    }

    entries.push({
      content: entryContent,
      mood,
      createdAt: timestamp,
    });
    entryIndex++;
  }

  return { entries, errors };
}

/**
 * Parse JSON export format (for future extensibility)
 */
export function parseJsonExport(content: string): { entries: ParsedEntry[]; errors: ImportValidationError[] } {
  const entries: ParsedEntry[] = [];
  const errors: ImportValidationError[] = [];

  try {
    const data = JSON.parse(content);
    const rawEntries = Array.isArray(data) ? data : data.entries;

    if (!Array.isArray(rawEntries)) {
      errors.push({ entryIndex: 0, reason: 'Invalid JSON structure: expected array or object with entries array' });
      return { entries, errors };
    }

    rawEntries.forEach((entry, index) => {
      if (!entry.content || typeof entry.content !== 'string') {
        errors.push({ entryIndex: index, reason: 'Missing or invalid content field' });
        return;
      }

      if (!entry.createdAt || typeof entry.createdAt !== 'number') {
        errors.push({ entryIndex: index, reason: 'Missing or invalid createdAt field' });
        return;
      }

      entries.push({
        content: entry.content.trim(),
        mood: validateMood(entry.mood),
        createdAt: entry.createdAt,
        originalId: entry.id,
      });
    });
  } catch (e) {
    errors.push({ entryIndex: 0, reason: `JSON parse error: ${e instanceof Error ? e.message : String(e)}` });
  }

  return { entries, errors };
}

/**
 * Detect file format from content
 */
export function detectFormat(content: string): ImportFormat {
  const trimmed = content.trim();

  // Try JSON first
  if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
    try {
      JSON.parse(trimmed);
      return 'json';
    } catch {
      // Not valid JSON
    }
  }

  // Check for Markdown indicators
  if (trimmed.startsWith('# Sage Journal Export') || trimmed.includes('\n## ')) {
    return 'markdown';
  }

  // Check for text format indicators
  if (trimmed.includes('═══════════════════════════') || trimmed.includes('SAGE JOURNAL EXPORT')) {
    return 'text';
  }

  // Default to text format
  return 'text';
}

/**
 * Find duplicate entries
 */
export function findDuplicates(
  newEntries: ParsedEntry[],
  existingEntries: JournalEntry[]
): DuplicateMatch[] {
  const duplicates: DuplicateMatch[] = [];

  for (const newEntry of newEntries) {
    // Check for ID match first (if original ID was preserved)
    if (newEntry.originalId) {
      const idMatch = existingEntries.find(e => e.id === newEntry.originalId);
      if (idMatch) {
        duplicates.push({ newEntry, existingEntry: idMatch, matchType: 'id' });
        continue;
      }
    }

    // Check for content + timestamp match (within 60 seconds tolerance)
    const contentTimestampMatch = existingEntries.find(e =>
      e.content === newEntry.content &&
      Math.abs(e.createdAt - newEntry.createdAt) < 60000
    );
    if (contentTimestampMatch) {
      duplicates.push({ newEntry, existingEntry: contentTimestampMatch, matchType: 'content_timestamp' });
      continue;
    }

    // Check for exact content match
    const contentMatch = existingEntries.find(e => e.content === newEntry.content);
    if (contentMatch) {
      duplicates.push({ newEntry, existingEntry: contentMatch, matchType: 'content_exact' });
    }
  }

  return duplicates;
}

/**
 * Parse content based on detected or specified format
 */
export function parseExportContent(
  content: string,
  format?: ImportFormat
): { entries: ParsedEntry[]; errors: ImportValidationError[] } {
  const detectedFormat = format || detectFormat(content);

  switch (detectedFormat) {
    case 'json':
      return parseJsonExport(content);
    case 'markdown':
      return parseMarkdownExport(content);
    case 'text':
    default:
      return parseTextExport(content);
  }
}

/**
 * Pick a file using document picker
 */
export async function pickImportFile(): Promise<{ uri: string; name: string } | null> {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['text/plain', 'text/markdown', 'application/json', '*/*'],
      copyToCacheDirectory: true,
    });

    if (result.canceled || !result.assets || result.assets.length === 0) {
      return null;
    }

    const asset = result.assets[0];
    return { uri: asset.uri, name: asset.name };
  } catch {
    return null;
  }
}

/**
 * Read file content from URI
 */
export async function readFileContent(uri: string): Promise<string> {
  return FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.UTF8,
  });
}

/**
 * Main import function that orchestrates the import process
 */
export async function importJournalFromFile(
  existingEntries: JournalEntry[],
  skipDuplicates: boolean = true
): Promise<ImportResult> {
  // Pick file
  const file = await pickImportFile();
  if (!file) {
    return {
      success: false,
      imported: 0,
      skipped: 0,
      duplicates: [],
      errors: [],
      entries: [],
      error: 'No file selected',
    };
  }

  try {
    // Read file content
    const content = await readFileContent(file.uri);
    if (!content.trim()) {
      return {
        success: false,
        imported: 0,
        skipped: 0,
        duplicates: [],
        errors: [],
        entries: [],
        error: 'File is empty',
      };
    }

    // Parse content
    const { entries: parsedEntries, errors } = parseExportContent(content);

    if (parsedEntries.length === 0) {
      return {
        success: false,
        imported: 0,
        skipped: 0,
        duplicates: [],
        errors,
        entries: [],
        error: errors.length > 0
          ? `Failed to parse any entries. ${errors.length} error(s) found.`
          : 'No entries found in file',
      };
    }

    // Find duplicates
    const duplicates = findDuplicates(parsedEntries, existingEntries);
    const duplicateContents = new Set(duplicates.map(d => d.newEntry.content));

    // Filter out duplicates if requested
    const entriesToImport = skipDuplicates
      ? parsedEntries.filter(e => !duplicateContents.has(e.content))
      : parsedEntries;

    return {
      success: true,
      imported: entriesToImport.length,
      skipped: duplicates.length,
      duplicates,
      errors,
      entries: entriesToImport,
    };
  } catch (e) {
    return {
      success: false,
      imported: 0,
      skipped: 0,
      duplicates: [],
      errors: [],
      entries: [],
      error: `Failed to read file: ${e instanceof Error ? e.message : String(e)}`,
    };
  }
}

/**
 * Get import preview without actually importing
 */
export function getImportPreview(content: string): {
  format: ImportFormat;
  entryCount: number;
  dateRange: string;
  errors: ImportValidationError[];
} {
  const format = detectFormat(content);
  const { entries, errors } = parseExportContent(content, format);

  if (entries.length === 0) {
    return {
      format,
      entryCount: 0,
      dateRange: 'No entries',
      errors,
    };
  }

  const sortedEntries = [...entries].sort((a, b) => a.createdAt - b.createdAt);
  const oldest = new Date(sortedEntries[0].createdAt);
  const newest = new Date(sortedEntries[sortedEntries.length - 1].createdAt);

  const formatDateShort = (d: Date) => d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const dateRange = oldest.toDateString() === newest.toDateString()
    ? formatDateShort(oldest)
    : `${formatDateShort(oldest)} - ${formatDateShort(newest)}`;

  return {
    format,
    entryCount: entries.length,
    dateRange,
    errors,
  };
}
