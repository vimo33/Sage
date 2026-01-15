/**
 * Unified Full-Text Search Service
 *
 * Provides comprehensive search across:
 * - Conversations (chat history)
 * - Journal entries
 * - Saved insights
 *
 * Features:
 * - Full-text search with highlighting
 * - Date range filtering
 * - Tag filtering
 * - Source/tradition filtering (for insights)
 * - Relevance scoring
 */

import type { ChatMessage, JournalEntry, SavedInsight, SearchHistoryItem } from '../storage/store';

// ==================== Types ====================

export type SearchableContentType = 'conversation' | 'journal' | 'insight' | 'all';

export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

export interface SearchFilters {
  contentTypes: SearchableContentType[];
  dateRange: DateRange;
  tags: string[];
  sources: string[]; // tradition/book sources for insights
}

export interface HighlightedText {
  text: string;
  isHighlighted: boolean;
}

export interface SearchResultBase {
  id: string;
  type: SearchableContentType;
  matchedText: HighlightedText[];
  relevanceScore: number;
  createdAt: number;
  matchedFields: string[];
}

export interface ConversationSearchResult extends SearchResultBase {
  type: 'conversation';
  data: {
    question: string;
    responsePreview: string;
    citedVerses?: Array<{ content: string; sourceRef: string }>;
  };
}

export interface JournalSearchResult extends SearchResultBase {
  type: 'journal';
  data: {
    title?: string;
    content: string;
    mood?: string;
    tags?: string[];
  };
}

export interface InsightSearchResult extends SearchResultBase {
  type: 'insight';
  data: {
    verseContent: string;
    sourceRef: string;
    userNote?: string;
    tags?: string[];
  };
}

export type UnifiedSearchResult =
  | ConversationSearchResult
  | JournalSearchResult
  | InsightSearchResult;

export interface SearchSummary {
  totalResults: number;
  conversationCount: number;
  journalCount: number;
  insightCount: number;
  searchDurationMs: number;
}

export interface UnifiedSearchResponse {
  results: UnifiedSearchResult[];
  summary: SearchSummary;
  query: string;
  filters: SearchFilters;
}

// ==================== Constants ====================

const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
  'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'or', 'that',
  'the', 'to', 'was', 'were', 'will', 'with', 'i', 'me', 'my',
  'we', 'our', 'you', 'your', 'they', 'them', 'their', 'this',
  'what', 'which', 'who', 'how', 'when', 'where', 'why',
]);

// ==================== Helper Functions ====================

/**
 * Normalize and tokenize search query
 */
function tokenizeQuery(query: string): string[] {
  return query
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(term => term.length > 1 && !STOP_WORDS.has(term));
}

/**
 * Create highlighted text segments from content matching query terms
 */
export function highlightMatches(content: string, queryTerms: string[]): HighlightedText[] {
  if (!content || queryTerms.length === 0) {
    return [{ text: content, isHighlighted: false }];
  }

  const lowerContent = content.toLowerCase();
  const segments: HighlightedText[] = [];

  // Find all match positions
  const matches: { start: number; end: number }[] = [];

  for (const term of queryTerms) {
    let searchIndex = 0;
    while (true) {
      const index = lowerContent.indexOf(term, searchIndex);
      if (index === -1) break;

      matches.push({ start: index, end: index + term.length });
      searchIndex = index + 1;
    }
  }

  if (matches.length === 0) {
    return [{ text: content, isHighlighted: false }];
  }

  // Sort and merge overlapping matches
  matches.sort((a, b) => a.start - b.start);
  const mergedMatches: { start: number; end: number }[] = [];

  for (const match of matches) {
    if (mergedMatches.length === 0) {
      mergedMatches.push(match);
    } else {
      const last = mergedMatches[mergedMatches.length - 1];
      if (match.start <= last.end) {
        last.end = Math.max(last.end, match.end);
      } else {
        mergedMatches.push(match);
      }
    }
  }

  // Build segments
  let currentIndex = 0;
  for (const match of mergedMatches) {
    if (match.start > currentIndex) {
      segments.push({
        text: content.substring(currentIndex, match.start),
        isHighlighted: false,
      });
    }
    segments.push({
      text: content.substring(match.start, match.end),
      isHighlighted: true,
    });
    currentIndex = match.end;
  }

  if (currentIndex < content.length) {
    segments.push({
      text: content.substring(currentIndex),
      isHighlighted: false,
    });
  }

  return segments;
}

/**
 * Calculate relevance score based on match quality
 */
function calculateRelevanceScore(
  content: string,
  queryTerms: string[],
  matchedFields: string[]
): number {
  if (queryTerms.length === 0) return 0;

  const lowerContent = content.toLowerCase();
  let score = 0;

  // Count term occurrences
  for (const term of queryTerms) {
    let count = 0;
    let searchIndex = 0;
    while (true) {
      const index = lowerContent.indexOf(term, searchIndex);
      if (index === -1) break;
      count++;
      searchIndex = index + 1;
    }

    // More occurrences = higher score
    score += Math.min(count * 10, 50); // Cap at 50 per term

    // Exact word match bonus
    const wordBoundaryRegex = new RegExp(`\\b${term}\\b`, 'gi');
    const exactMatches = (content.match(wordBoundaryRegex) || []).length;
    score += exactMatches * 5;
  }

  // Field weight bonuses
  if (matchedFields.includes('title')) score += 30;
  if (matchedFields.includes('content')) score += 20;
  if (matchedFields.includes('tags')) score += 15;
  if (matchedFields.includes('sourceRef')) score += 10;
  if (matchedFields.includes('userNote')) score += 10;

  // Normalize to 0-100
  return Math.min(100, score);
}

/**
 * Check if content matches query terms
 */
function contentMatches(content: string, queryTerms: string[]): boolean {
  if (!content || queryTerms.length === 0) return true;

  const lowerContent = content.toLowerCase();
  return queryTerms.some(term => lowerContent.includes(term));
}

/**
 * Check if date is within range
 */
function isWithinDateRange(timestamp: number, dateRange: DateRange): boolean {
  const date = new Date(timestamp);

  if (dateRange.startDate && date < dateRange.startDate) {
    return false;
  }

  if (dateRange.endDate) {
    const endOfDay = new Date(dateRange.endDate);
    endOfDay.setHours(23, 59, 59, 999);
    if (date > endOfDay) {
      return false;
    }
  }

  return true;
}

/**
 * Extract source/tradition from sourceRef
 */
export function extractSource(sourceRef: string): string {
  // Common patterns: "Bhagavad Gita 2.47", "Tao Te Ching, Chapter 1"
  const parts = sourceRef.split(/[\d,.:]/);
  return parts[0].trim();
}

// ==================== Search Functions ====================

/**
 * Search through conversations (search history)
 */
function searchConversations(
  searchHistory: SearchHistoryItem[],
  queryTerms: string[],
  filters: SearchFilters
): ConversationSearchResult[] {
  const results: ConversationSearchResult[] = [];

  for (const item of searchHistory) {
    // Date range filter
    if (!isWithinDateRange(item.timestamp, filters.dateRange)) {
      continue;
    }

    // Search in question and response
    const matchedFields: string[] = [];
    const searchableContent = `${item.question} ${item.responsePreview}`;

    if (queryTerms.length === 0 || contentMatches(item.question, queryTerms)) {
      if (contentMatches(item.question, queryTerms)) {
        matchedFields.push('question');
      }
    }

    if (queryTerms.length === 0 || contentMatches(item.responsePreview, queryTerms)) {
      if (contentMatches(item.responsePreview, queryTerms)) {
        matchedFields.push('response');
      }
    }

    // Check cited verses too
    if (item.citedVerses) {
      for (const verse of item.citedVerses) {
        if (contentMatches(verse.content, queryTerms) || contentMatches(verse.sourceRef, queryTerms)) {
          matchedFields.push('citedVerses');
          break;
        }
      }
    }

    if (queryTerms.length === 0 || matchedFields.length > 0) {
      const relevanceScore = calculateRelevanceScore(searchableContent, queryTerms, matchedFields);

      // Create preview with first match highlighted
      const previewContent = item.question.length > 100
        ? item.question.substring(0, 100) + '...'
        : item.question;

      results.push({
        id: item.id,
        type: 'conversation',
        matchedText: highlightMatches(previewContent, queryTerms),
        relevanceScore,
        createdAt: item.timestamp,
        matchedFields,
        data: {
          question: item.question,
          responsePreview: item.responsePreview,
          citedVerses: item.citedVerses,
        },
      });
    }
  }

  return results;
}

/**
 * Search through journal entries
 */
function searchJournalEntries(
  journalEntries: JournalEntry[],
  queryTerms: string[],
  filters: SearchFilters
): JournalSearchResult[] {
  const results: JournalSearchResult[] = [];

  for (const entry of journalEntries) {
    // Date range filter
    if (!isWithinDateRange(entry.createdAt, filters.dateRange)) {
      continue;
    }

    // Tag filter
    if (filters.tags.length > 0) {
      const entryTags = entry.tags || [];
      const hasMatchingTag = filters.tags.some(tag => entryTags.includes(tag));
      if (!hasMatchingTag) {
        continue;
      }
    }

    // Search in title, content, mood, and tags
    const matchedFields: string[] = [];
    const searchableContent = [
      entry.title || '',
      entry.content,
      entry.mood || '',
      ...(entry.tags || []),
    ].join(' ');

    if (queryTerms.length === 0 || contentMatches(searchableContent, queryTerms)) {
      if (entry.title && contentMatches(entry.title, queryTerms)) {
        matchedFields.push('title');
      }
      if (contentMatches(entry.content, queryTerms)) {
        matchedFields.push('content');
      }
      if (entry.mood && contentMatches(entry.mood, queryTerms)) {
        matchedFields.push('mood');
      }
      if (entry.tags?.some(tag => contentMatches(tag, queryTerms))) {
        matchedFields.push('tags');
      }

      const relevanceScore = calculateRelevanceScore(searchableContent, queryTerms, matchedFields);

      // Create preview
      const previewContent = entry.content.length > 120
        ? entry.content.substring(0, 120) + '...'
        : entry.content;

      results.push({
        id: entry.id,
        type: 'journal',
        matchedText: highlightMatches(previewContent, queryTerms),
        relevanceScore,
        createdAt: entry.createdAt,
        matchedFields,
        data: {
          title: entry.title,
          content: entry.content,
          mood: entry.mood,
          tags: entry.tags,
        },
      });
    }
  }

  return results;
}

/**
 * Search through saved insights
 */
function searchSavedInsights(
  savedInsights: SavedInsight[],
  queryTerms: string[],
  filters: SearchFilters
): InsightSearchResult[] {
  const results: InsightSearchResult[] = [];

  for (const insight of savedInsights) {
    // Date range filter
    if (!isWithinDateRange(insight.createdAt, filters.dateRange)) {
      continue;
    }

    // Tag filter
    if (filters.tags.length > 0) {
      const insightTags = insight.tags || [];
      const hasMatchingTag = filters.tags.some(tag => insightTags.includes(tag));
      if (!hasMatchingTag) {
        continue;
      }
    }

    // Source/tradition filter
    if (filters.sources.length > 0) {
      const source = extractSource(insight.sourceRef);
      const hasMatchingSource = filters.sources.some(
        s => source.toLowerCase().includes(s.toLowerCase())
      );
      if (!hasMatchingSource) {
        continue;
      }
    }

    // Search in verse content, source ref, user note, and tags
    const matchedFields: string[] = [];
    const searchableContent = [
      insight.verseContent,
      insight.sourceRef,
      insight.userNote || '',
      ...(insight.tags || []),
    ].join(' ');

    if (queryTerms.length === 0 || contentMatches(searchableContent, queryTerms)) {
      if (contentMatches(insight.verseContent, queryTerms)) {
        matchedFields.push('verseContent');
      }
      if (contentMatches(insight.sourceRef, queryTerms)) {
        matchedFields.push('sourceRef');
      }
      if (insight.userNote && contentMatches(insight.userNote, queryTerms)) {
        matchedFields.push('userNote');
      }
      if (insight.tags?.some(tag => contentMatches(tag, queryTerms))) {
        matchedFields.push('tags');
      }

      const relevanceScore = calculateRelevanceScore(searchableContent, queryTerms, matchedFields);

      // Create preview
      const previewContent = insight.verseContent.length > 120
        ? insight.verseContent.substring(0, 120) + '...'
        : insight.verseContent;

      results.push({
        id: insight.id,
        type: 'insight',
        matchedText: highlightMatches(previewContent, queryTerms),
        relevanceScore,
        createdAt: insight.createdAt,
        matchedFields,
        data: {
          verseContent: insight.verseContent,
          sourceRef: insight.sourceRef,
          userNote: insight.userNote,
          tags: insight.tags,
        },
      });
    }
  }

  return results;
}

// ==================== Main Search Function ====================

export const DEFAULT_FILTERS: SearchFilters = {
  contentTypes: ['all'],
  dateRange: { startDate: null, endDate: null },
  tags: [],
  sources: [],
};

/**
 * Perform unified search across all content types
 */
export function performUnifiedSearch(
  query: string,
  searchHistory: SearchHistoryItem[],
  journalEntries: JournalEntry[],
  savedInsights: SavedInsight[],
  filters: SearchFilters = DEFAULT_FILTERS
): UnifiedSearchResponse {
  const startTime = Date.now();

  const queryTerms = tokenizeQuery(query);
  const searchAll = filters.contentTypes.includes('all') || filters.contentTypes.length === 0;

  const allResults: UnifiedSearchResult[] = [];

  // Search conversations
  if (searchAll || filters.contentTypes.includes('conversation')) {
    const conversationResults = searchConversations(searchHistory, queryTerms, filters);
    allResults.push(...conversationResults);
  }

  // Search journal entries
  if (searchAll || filters.contentTypes.includes('journal')) {
    const journalResults = searchJournalEntries(journalEntries, queryTerms, filters);
    allResults.push(...journalResults);
  }

  // Search saved insights
  if (searchAll || filters.contentTypes.includes('insight')) {
    const insightResults = searchSavedInsights(savedInsights, queryTerms, filters);
    allResults.push(...insightResults);
  }

  // Sort by relevance score (descending), then by date (newest first)
  allResults.sort((a, b) => {
    if (b.relevanceScore !== a.relevanceScore) {
      return b.relevanceScore - a.relevanceScore;
    }
    return b.createdAt - a.createdAt;
  });

  const endTime = Date.now();

  // Create summary
  const summary: SearchSummary = {
    totalResults: allResults.length,
    conversationCount: allResults.filter(r => r.type === 'conversation').length,
    journalCount: allResults.filter(r => r.type === 'journal').length,
    insightCount: allResults.filter(r => r.type === 'insight').length,
    searchDurationMs: endTime - startTime,
  };

  return {
    results: allResults,
    summary,
    query,
    filters,
  };
}

/**
 * Get all unique sources/traditions from saved insights
 */
export function getUniqueSources(savedInsights: SavedInsight[]): string[] {
  const sources = new Set<string>();

  for (const insight of savedInsights) {
    const source = extractSource(insight.sourceRef);
    if (source) {
      sources.add(source);
    }
  }

  return Array.from(sources).sort();
}

/**
 * Get all unique tags from all content types
 */
export function getAllUniqueTags(
  journalEntries: JournalEntry[],
  savedInsights: SavedInsight[]
): string[] {
  const tags = new Set<string>();

  for (const entry of journalEntries) {
    entry.tags?.forEach(tag => tags.add(tag));
  }

  for (const insight of savedInsights) {
    insight.tags?.forEach(tag => tags.add(tag));
  }

  return Array.from(tags).sort();
}

/**
 * Get suggested date ranges for quick filtering
 */
export function getQuickDateRanges(): Array<{ label: string; range: DateRange }> {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  return [
    {
      label: 'Today',
      range: {
        startDate: today,
        endDate: today,
      },
    },
    {
      label: 'This Week',
      range: {
        startDate: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000),
        endDate: today,
      },
    },
    {
      label: 'This Month',
      range: {
        startDate: new Date(today.getFullYear(), today.getMonth(), 1),
        endDate: today,
      },
    },
    {
      label: 'Last 3 Months',
      range: {
        startDate: new Date(today.getFullYear(), today.getMonth() - 3, 1),
        endDate: today,
      },
    },
    {
      label: 'This Year',
      range: {
        startDate: new Date(today.getFullYear(), 0, 1),
        endDate: today,
      },
    },
    {
      label: 'All Time',
      range: {
        startDate: null,
        endDate: null,
      },
    },
  ];
}
