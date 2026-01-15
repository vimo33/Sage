/**
 * Unit Tests for Unified Search Service
 *
 * Tests the full-text search functionality across conversations,
 * journal entries, and saved insights.
 */

import {
  performUnifiedSearch,
  highlightMatches,
  getUniqueSources,
  getAllUniqueTags,
  extractSource,
  DEFAULT_FILTERS,
  type SearchFilters,
  type DateRange,
} from '../lib/search';
import type { SearchHistoryItem, JournalEntry, SavedInsight } from '../lib/storage/store';

// Mock data
const mockSearchHistory: SearchHistoryItem[] = [
  {
    id: 'conv-1',
    question: 'How can I find inner peace?',
    responsePreview: 'Inner peace comes from within...',
    timestamp: Date.now() - 86400000, // 1 day ago
    citedVerses: [
      { content: 'Be still and know.', sourceRef: 'Psalm 46:10' },
    ],
  },
  {
    id: 'conv-2',
    question: 'What does the Gita say about duty?',
    responsePreview: 'The Bhagavad Gita emphasizes dharma...',
    timestamp: Date.now() - 172800000, // 2 days ago
  },
];

const mockJournalEntries: JournalEntry[] = [
  {
    id: 'journal-1',
    title: 'Morning Reflection',
    content: 'Today I practiced meditation and felt a sense of peace.',
    mood: 'peaceful',
    tags: ['meditation', 'morning'],
    createdAt: Date.now() - 43200000, // 12 hours ago
    linkedInsightIds: [],
  },
  {
    id: 'journal-2',
    content: 'Gratitude for the small moments of joy in life.',
    mood: 'grateful',
    tags: ['gratitude'],
    createdAt: Date.now() - 259200000, // 3 days ago
    linkedInsightIds: [],
  },
];

const mockSavedInsights: SavedInsight[] = [
  {
    id: 'insight-1',
    verseContent: 'The mind is everything. What you think you become.',
    sourceRef: 'Buddha, Dhammapada',
    userNote: 'This reminds me to guard my thoughts.',
    tags: ['mindfulness', 'wisdom'],
    createdAt: Date.now() - 604800000, // 1 week ago
  },
  {
    id: 'insight-2',
    verseContent: 'You have the right to work, but not to the fruits of work.',
    sourceRef: 'Bhagavad Gita 2.47',
    tags: ['detachment', 'action'],
    createdAt: Date.now() - 1209600000, // 2 weeks ago
  },
];

describe('performUnifiedSearch', () => {
  it('should return all results when no query but with all content types filter', () => {
    // With no query but default filters, returns all results (since "all" contentTypes are selected)
    const result = performUnifiedSearch('', mockSearchHistory, mockJournalEntries, mockSavedInsights, DEFAULT_FILTERS);
    // The search returns results because it's searching "all" content types
    expect(result).not.toBeNull();
    expect(result!.results.length).toBe(6); // All mock data items
  });

  it('should search conversations by keyword', () => {
    const result = performUnifiedSearch(
      'peace',
      mockSearchHistory,
      mockJournalEntries,
      mockSavedInsights,
      { ...DEFAULT_FILTERS, contentTypes: ['conversation'] }
    );

    expect(result).not.toBeNull();
    expect(result!.results.length).toBeGreaterThan(0);
    expect(result!.results.every(r => r.type === 'conversation')).toBe(true);
  });

  it('should search journal entries by content', () => {
    const result = performUnifiedSearch(
      'meditation',
      mockSearchHistory,
      mockJournalEntries,
      mockSavedInsights,
      { ...DEFAULT_FILTERS, contentTypes: ['journal'] }
    );

    expect(result).not.toBeNull();
    expect(result!.results.length).toBeGreaterThan(0);
    expect(result!.results.every(r => r.type === 'journal')).toBe(true);
  });

  it('should search saved insights by verse content', () => {
    const result = performUnifiedSearch(
      'mind',
      mockSearchHistory,
      mockJournalEntries,
      mockSavedInsights,
      { ...DEFAULT_FILTERS, contentTypes: ['insight'] }
    );

    expect(result).not.toBeNull();
    expect(result!.results.length).toBeGreaterThan(0);
    expect(result!.results.some(r => r.type === 'insight')).toBe(true);
  });

  it('should filter by tags', () => {
    // Filter only journal and insights by gratitude tag
    // Conversations don't have tags in our mock data
    const result = performUnifiedSearch(
      '',
      mockSearchHistory,
      mockJournalEntries,
      mockSavedInsights,
      { ...DEFAULT_FILTERS, tags: ['gratitude'], contentTypes: ['journal', 'insight'] }
    );

    expect(result).not.toBeNull();
    expect(result!.results.length).toBe(1);
    expect(result!.results[0].type).toBe('journal');
  });

  it('should filter by date range', () => {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const result = performUnifiedSearch(
      '',
      mockSearchHistory,
      mockJournalEntries,
      mockSavedInsights,
      {
        ...DEFAULT_FILTERS,
        dateRange: { startDate: twoDaysAgo, endDate: null },
        tags: ['meditation'],
        contentTypes: ['journal'], // Only search journal entries
      }
    );

    expect(result).not.toBeNull();
    // Only the recent meditation entry should match
    expect(result!.results.length).toBe(1);
  });

  it('should filter by source/tradition', () => {
    const result = performUnifiedSearch(
      '',
      mockSearchHistory,
      mockJournalEntries,
      mockSavedInsights,
      { ...DEFAULT_FILTERS, sources: ['Bhagavad Gita'], contentTypes: ['insight'] }
    );

    expect(result).not.toBeNull();
    expect(result!.results.length).toBe(1);
    expect(result!.results[0].id).toBe('insight-2');
  });

  it('should return results sorted by relevance', () => {
    const result = performUnifiedSearch(
      'peace',
      mockSearchHistory,
      mockJournalEntries,
      mockSavedInsights,
      DEFAULT_FILTERS
    );

    expect(result).not.toBeNull();
    // Results should be sorted by relevance score (descending)
    for (let i = 1; i < result!.results.length; i++) {
      expect(result!.results[i - 1].relevanceScore).toBeGreaterThanOrEqual(
        result!.results[i].relevanceScore
      );
    }
  });

  it('should include search summary', () => {
    const result = performUnifiedSearch(
      'peace',
      mockSearchHistory,
      mockJournalEntries,
      mockSavedInsights,
      DEFAULT_FILTERS
    );

    expect(result).not.toBeNull();
    expect(result!.summary).toBeDefined();
    expect(result!.summary.totalResults).toBeGreaterThan(0);
    expect(result!.summary.searchDurationMs).toBeDefined();
  });
});

describe('highlightMatches', () => {
  it('should highlight matching terms in text', () => {
    const segments = highlightMatches('The quick brown fox jumps over the lazy dog', ['quick', 'fox']);

    expect(segments.length).toBeGreaterThan(1);

    const highlightedTexts = segments.filter(s => s.isHighlighted).map(s => s.text.toLowerCase());
    expect(highlightedTexts).toContain('quick');
    expect(highlightedTexts).toContain('fox');
  });

  it('should return original text if no matches', () => {
    const segments = highlightMatches('Hello world', ['xyz']);

    expect(segments.length).toBe(1);
    expect(segments[0].text).toBe('Hello world');
    expect(segments[0].isHighlighted).toBe(false);
  });

  it('should handle empty query terms', () => {
    const segments = highlightMatches('Some text', []);

    expect(segments.length).toBe(1);
    expect(segments[0].text).toBe('Some text');
    expect(segments[0].isHighlighted).toBe(false);
  });

  it('should handle overlapping matches', () => {
    const segments = highlightMatches('peaceful peace', ['peace']);

    const highlightedSegments = segments.filter(s => s.isHighlighted);
    expect(highlightedSegments.length).toBe(2);
  });
});

describe('extractSource', () => {
  it('should extract source name from reference', () => {
    expect(extractSource('Bhagavad Gita 2.47')).toBe('Bhagavad Gita');
    expect(extractSource('Tao Te Ching, Chapter 1')).toBe('Tao Te Ching');
    expect(extractSource('Buddha, Dhammapada')).toBe('Buddha');
  });

  it('should handle references without numbers', () => {
    expect(extractSource('Ancient Wisdom')).toBe('Ancient Wisdom');
  });
});

describe('getUniqueSources', () => {
  it('should return unique sources from insights', () => {
    const sources = getUniqueSources(mockSavedInsights);

    expect(sources).toContain('Buddha');
    expect(sources).toContain('Bhagavad Gita');
    expect(sources.length).toBe(2);
  });

  it('should return empty array for empty insights', () => {
    const sources = getUniqueSources([]);
    expect(sources).toEqual([]);
  });
});

describe('getAllUniqueTags', () => {
  it('should return unique tags from journal and insights', () => {
    const tags = getAllUniqueTags(mockJournalEntries, mockSavedInsights);

    expect(tags).toContain('meditation');
    expect(tags).toContain('gratitude');
    expect(tags).toContain('mindfulness');
    expect(tags).toContain('wisdom');
    expect(tags).toContain('detachment');
    expect(tags).toContain('action');
    expect(tags).toContain('morning');
  });

  it('should return sorted tags', () => {
    const tags = getAllUniqueTags(mockJournalEntries, mockSavedInsights);

    const sortedTags = [...tags].sort();
    expect(tags).toEqual(sortedTags);
  });
});

describe('search filters', () => {
  it('should support multiple content types', () => {
    const result = performUnifiedSearch(
      'peace',
      mockSearchHistory,
      mockJournalEntries,
      mockSavedInsights,
      { ...DEFAULT_FILTERS, contentTypes: ['conversation', 'journal'] }
    );

    expect(result).not.toBeNull();
    const types = new Set(result!.results.map(r => r.type));
    expect(types.has('insight')).toBe(false);
  });

  it('should support "all" content type', () => {
    const result = performUnifiedSearch(
      'peace',
      mockSearchHistory,
      mockJournalEntries,
      mockSavedInsights,
      { ...DEFAULT_FILTERS, contentTypes: ['all'] }
    );

    expect(result).not.toBeNull();
    // Should search all content types
  });
});
