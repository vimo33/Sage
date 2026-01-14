/**
 * Journal Export Utility
 *
 * Exports journal entries as formatted text or markdown files.
 * Supports local file saving and sharing via system share sheet.
 */

import * as FileSystem from 'expo-file-system';
import { Share, Platform } from 'react-native';
import type { JournalEntry } from './store';

export type ExportFormat = 'text' | 'markdown';

interface ExportResult {
  success: boolean;
  filePath?: string;
  error?: string;
}

/**
 * Format a timestamp into a readable date string
 */
function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format a timestamp into a readable time string
 */
function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Generate filename with timestamp
 */
function generateFilename(format: ExportFormat): string {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD
  const extension = format === 'markdown' ? 'md' : 'txt';
  return `sage-journal-${dateStr}.${extension}`;
}

/**
 * Format journal entries as plain text
 */
function formatAsText(entries: JournalEntry[]): string {
  if (entries.length === 0) {
    return 'No journal entries to export.';
  }

  const sortedEntries = [...entries].sort((a, b) => b.createdAt - a.createdAt);

  const lines: string[] = [
    '═══════════════════════════════════════════════════════════════',
    '                    SAGE JOURNAL EXPORT',
    `                    ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`,
    '═══════════════════════════════════════════════════════════════',
    '',
    `Total Entries: ${entries.length}`,
    '',
  ];

  sortedEntries.forEach((entry, index) => {
    lines.push('───────────────────────────────────────────────────────────────');
    lines.push(`Entry ${index + 1} of ${entries.length}`);
    lines.push(`Date: ${formatDate(entry.createdAt)}`);
    lines.push(`Time: ${formatTime(entry.createdAt)}`);

    if (entry.mood) {
      lines.push(`Mood: ${entry.mood}`);
    }

    lines.push('');
    lines.push(entry.content);
    lines.push('');
  });

  lines.push('═══════════════════════════════════════════════════════════════');
  lines.push('                    END OF EXPORT');
  lines.push('                  Exported from Sage AI');
  lines.push('═══════════════════════════════════════════════════════════════');

  return lines.join('\n');
}

/**
 * Format journal entries as markdown
 */
function formatAsMarkdown(entries: JournalEntry[]): string {
  if (entries.length === 0) {
    return '# Sage Journal Export\n\n*No journal entries to export.*';
  }

  const sortedEntries = [...entries].sort((a, b) => b.createdAt - a.createdAt);

  const lines: string[] = [
    '# Sage Journal Export',
    '',
    `**Exported:** ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`,
    '',
    `**Total Entries:** ${entries.length}`,
    '',
    '---',
    '',
  ];

  sortedEntries.forEach((entry) => {
    lines.push(`## ${formatDate(entry.createdAt)}`);
    lines.push('');
    lines.push(`*${formatTime(entry.createdAt)}*`);

    if (entry.mood) {
      lines.push(`  •  **Mood:** ${entry.mood}`);
    }

    lines.push('');
    lines.push(entry.content);
    lines.push('');
    lines.push('---');
    lines.push('');
  });

  lines.push('');
  lines.push('*Exported from Sage AI - Your personal wisdom journal*');

  return lines.join('\n');
}

/**
 * Format journal entries based on the specified format
 */
export function formatJournalEntries(entries: JournalEntry[], format: ExportFormat): string {
  return format === 'markdown'
    ? formatAsMarkdown(entries)
    : formatAsText(entries);
}

/**
 * Save exported content to a file in the app's document directory
 */
export async function saveExportToFile(
  entries: JournalEntry[],
  format: ExportFormat
): Promise<ExportResult> {
  try {
    const content = formatJournalEntries(entries, format);
    const filename = generateFilename(format);
    const filePath = `${FileSystem.documentDirectory}${filename}`;

    await FileSystem.writeAsStringAsync(filePath, content, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    return { success: true, filePath };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to save export file',
    };
  }
}

/**
 * Export journal entries and share via system share sheet
 */
export async function shareJournalExport(
  entries: JournalEntry[],
  format: ExportFormat
): Promise<ExportResult> {
  try {
    const content = formatJournalEntries(entries, format);
    const filename = generateFilename(format);

    // First save to file
    const filePath = `${FileSystem.cacheDirectory}${filename}`;
    await FileSystem.writeAsStringAsync(filePath, content, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    // Share the file
    const shareResult = await Share.share(
      Platform.OS === 'ios'
        ? { url: filePath }
        : { message: content, title: 'Sage Journal Export' },
      { dialogTitle: 'Export Journal' }
    );

    // Clean up cache file on Android after sharing
    if (Platform.OS === 'android') {
      // Delay cleanup to ensure share completes
      setTimeout(async () => {
        try {
          await FileSystem.deleteAsync(filePath, { idempotent: true });
        } catch {
          // Ignore cleanup errors
        }
      }, 5000);
    }

    return {
      success: shareResult.action !== Share.dismissedAction,
      filePath
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to share export',
    };
  }
}

/**
 * Get the size of the export in a human-readable format
 */
export function getExportPreview(entries: JournalEntry[]): {
  entryCount: number;
  dateRange: string;
  estimatedSize: string;
} {
  const entryCount = entries.length;

  if (entryCount === 0) {
    return {
      entryCount: 0,
      dateRange: 'No entries',
      estimatedSize: '0 KB',
    };
  }

  const sortedEntries = [...entries].sort((a, b) => a.createdAt - b.createdAt);
  const oldest = new Date(sortedEntries[0].createdAt);
  const newest = new Date(sortedEntries[sortedEntries.length - 1].createdAt);

  const dateRange = oldest.toDateString() === newest.toDateString()
    ? formatDate(oldest.getTime())
    : `${oldest.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - ${newest.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;

  // Estimate size based on average content length
  const totalChars = entries.reduce((sum, e) => sum + e.content.length, 0);
  const estimatedBytes = totalChars + (entries.length * 200); // Add overhead for formatting
  const estimatedSize = estimatedBytes < 1024
    ? `${estimatedBytes} B`
    : estimatedBytes < 1024 * 1024
      ? `${(estimatedBytes / 1024).toFixed(1)} KB`
      : `${(estimatedBytes / (1024 * 1024)).toFixed(1)} MB`;

  return {
    entryCount,
    dateRange,
    estimatedSize,
  };
}
