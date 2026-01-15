/**
 * In-Memory Corpus Repository
 *
 * Provides an in-memory implementation of ICorpusRepository for testing purposes.
 * This can be seeded with sample wisdom data for isolated testing without
 * requiring the actual SQLite database.
 */

import type {
  ICorpusRepository,
  WisdomChunk,
  ThemeTag,
  CorpusSearchOptions,
  CorpusBrowseOptions,
  CorpusBrowseResult,
} from '../types';

/**
 * Intent-to-theme mapping for detecting themes from queries
 */
const INTENT_THEME_MAP: Record<string, ThemeTag[]> = {
  stress: ['peace', 'detachment', 'meditation'],
  anxious: ['peace', 'meditation', 'detachment'],
  anxiety: ['peace', 'meditation', 'detachment'],
  worried: ['peace', 'detachment', 'impermanence'],
  angry: ['peace', 'compassion', 'detachment'],
  anger: ['peace', 'compassion', 'detachment'],
  sad: ['suffering', 'impermanence', 'compassion'],
  depressed: ['suffering', 'purpose', 'self'],
  lonely: ['compassion', 'self', 'devotion'],
  confused: ['knowledge', 'truth', 'self'],
  lost: ['purpose', 'self', 'knowledge'],
  stuck: ['action', 'purpose', 'discipline'],
  overwhelm: ['peace', 'detachment', 'discipline'],
  work: ['action', 'duty', 'purpose'],
  job: ['action', 'duty', 'purpose'],
  career: ['purpose', 'action', 'duty'],
  relationship: ['compassion', 'detachment', 'duty'],
  family: ['duty', 'compassion', 'devotion'],
  friend: ['compassion', 'truth', 'duty'],
  death: ['impermanence', 'self', 'truth'],
  loss: ['impermanence', 'suffering', 'detachment'],
  change: ['impermanence', 'detachment', 'action'],
  decision: ['knowledge', 'duty', 'action'],
  conflict: ['peace', 'duty', 'compassion'],
  meaning: ['purpose', 'truth', 'self'],
  purpose: ['purpose', 'duty', 'action'],
  happiness: ['peace', 'detachment', 'self'],
  peace: ['peace', 'meditation', 'detachment'],
  calm: ['peace', 'meditation', 'discipline'],
  focus: ['meditation', 'discipline', 'action'],
  motivation: ['action', 'purpose', 'discipline'],
  strength: ['discipline', 'self', 'action'],
  wisdom: ['knowledge', 'truth', 'self'],
  truth: ['truth', 'knowledge', 'self'],
  enlighten: ['knowledge', 'self', 'truth'],
  meditat: ['meditation', 'peace', 'discipline'],
  spiritual: ['self', 'devotion', 'truth'],
  god: ['devotion', 'truth', 'self'],
  divine: ['devotion', 'self', 'truth'],
};

/**
 * Default search options
 */
const DEFAULT_SEARCH_OPTIONS: Required<Pick<CorpusSearchOptions, 'limit' | 'minScore'>> = {
  limit: 5,
  minScore: 0,
};

/**
 * In-memory implementation of the Corpus Repository
 */
export class InMemoryCorpusRepository implements ICorpusRepository {
  private chunks: Map<string, WisdomChunk> = new Map();
  private initialized: boolean = false;

  /**
   * Initialize the corpus (no-op for in-memory)
   */
  async initialize(): Promise<void> {
    this.initialized = true;
  }

  /**
   * Close the corpus (no-op for in-memory)
   */
  async close(): Promise<void> {
    this.initialized = false;
  }

  /**
   * Check if initialized
   */
  isInitialized(): boolean {
    return this.initialized;
  }

  /**
   * Search wisdom chunks by query
   */
  async search(query: string, options?: CorpusSearchOptions): Promise<WisdomChunk[]> {
    const opts = { ...DEFAULT_SEARCH_OPTIONS, ...options };
    const lowerQuery = query.toLowerCase();
    const queryTerms = lowerQuery.split(/\s+/).filter((t) => t.length > 2);

    let results = Array.from(this.chunks.values()).map((chunk) => {
      // Calculate a simple relevance score based on term matches
      let score = 0;
      const lowerContent = chunk.content.toLowerCase();
      const lowerSourceRef = chunk.sourceRef.toLowerCase();

      for (const term of queryTerms) {
        if (lowerContent.includes(term)) {
          score += 2;
        }
        if (lowerSourceRef.includes(term)) {
          score += 1;
        }
      }

      return { ...chunk, score };
    });

    // Apply filters
    if (opts.themes && opts.themes.length > 0) {
      results = results.filter((chunk) => opts.themes!.includes(chunk.theme));
    }

    if (opts.tones && opts.tones.length > 0) {
      results = results.filter((chunk) => opts.tones!.includes(chunk.tone));
    }

    if (opts.books && opts.books.length > 0) {
      results = results.filter((chunk) => opts.books!.includes(chunk.book));
    }

    // Filter by score and limit
    return results
      .filter((chunk) => (chunk.score ?? 0) >= opts.minScore)
      .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
      .slice(0, opts.limit);
  }

  /**
   * Search by theme
   */
  async searchByTheme(
    theme: ThemeTag,
    options?: Omit<CorpusSearchOptions, 'themes'>
  ): Promise<WisdomChunk[]> {
    const opts = { ...DEFAULT_SEARCH_OPTIONS, ...options };

    let results = Array.from(this.chunks.values()).filter(
      (chunk) => chunk.theme === theme
    );

    if (opts.tones && opts.tones.length > 0) {
      results = results.filter((chunk) => opts.tones!.includes(chunk.tone));
    }

    if (opts.books && opts.books.length > 0) {
      results = results.filter((chunk) => opts.books!.includes(chunk.book));
    }

    // Random selection for variety
    return this.shuffleArray(results).slice(0, opts.limit);
  }

  /**
   * Get a random wisdom chunk
   */
  async getRandomWisdom(options?: CorpusSearchOptions): Promise<WisdomChunk | null> {
    let candidates = Array.from(this.chunks.values());

    if (options?.themes && options.themes.length > 0) {
      candidates = candidates.filter((chunk) =>
        options.themes!.includes(chunk.theme)
      );
    }

    if (options?.tones && options.tones.length > 0) {
      candidates = candidates.filter((chunk) =>
        options.tones!.includes(chunk.tone)
      );
    }

    if (options?.books && options.books.length > 0) {
      candidates = candidates.filter((chunk) =>
        options.books!.includes(chunk.book)
      );
    }

    if (candidates.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * candidates.length);
    return candidates[randomIndex];
  }

  /**
   * Get chunk by ID
   */
  async findById(id: string): Promise<WisdomChunk | null> {
    return this.chunks.get(id) ?? null;
  }

  /**
   * Get total chunk count
   */
  async getChunkCount(
    options?: Pick<CorpusSearchOptions, 'themes' | 'books'>
  ): Promise<number> {
    let candidates = Array.from(this.chunks.values());

    if (options?.themes && options.themes.length > 0) {
      candidates = candidates.filter((chunk) =>
        options.themes!.includes(chunk.theme)
      );
    }

    if (options?.books && options.books.length > 0) {
      candidates = candidates.filter((chunk) =>
        options.books!.includes(chunk.book)
      );
    }

    return candidates.length;
  }

  /**
   * Get available books with counts
   */
  async getAvailableBooks(): Promise<Array<{ book: string; count: number }>> {
    const bookCounts = new Map<string, number>();
    const chunkValues = Array.from(this.chunks.values());

    for (const chunk of chunkValues) {
      const count = bookCounts.get(chunk.book) ?? 0;
      bookCounts.set(chunk.book, count + 1);
    }

    return Array.from(bookCounts.entries())
      .map(([book, count]) => ({ book, count }))
      .sort((a, b) => b.count - a.count);
  }

  /**
   * Get theme distribution
   */
  async getThemeDistribution(): Promise<Array<{ theme: ThemeTag; count: number }>> {
    const themeCounts = new Map<ThemeTag, number>();
    const chunkValues = Array.from(this.chunks.values());

    for (const chunk of chunkValues) {
      const count = themeCounts.get(chunk.theme) ?? 0;
      themeCounts.set(chunk.theme, count + 1);
    }

    return Array.from(themeCounts.entries())
      .map(([theme, count]) => ({ theme, count }))
      .sort((a, b) => b.count - a.count);
  }

  /**
   * Get chunks by book with pagination
   */
  async getChunksByBook(
    book: string,
    options?: CorpusBrowseOptions
  ): Promise<CorpusBrowseResult> {
    const { offset = 0, limit = 20, themes, tones } = options ?? {};

    let candidates = Array.from(this.chunks.values()).filter(
      (chunk) => chunk.book === book
    );

    if (themes && themes.length > 0) {
      candidates = candidates.filter((chunk) => themes.includes(chunk.theme));
    }

    if (tones && tones.length > 0) {
      candidates = candidates.filter((chunk) => tones.includes(chunk.tone));
    }

    // Sort by chapter and verse
    candidates.sort((a, b) => {
      const chapterCompare = (a.chapter ?? '').localeCompare(b.chapter ?? '');
      if (chapterCompare !== 0) return chapterCompare;
      return (a.verseNum ?? '').localeCompare(b.verseNum ?? '');
    });

    const totalCount = candidates.length;
    const chunks = candidates.slice(offset, offset + limit);

    return {
      chunks,
      totalCount,
      hasMore: offset + chunks.length < totalCount,
    };
  }

  /**
   * Get chunks by theme with pagination
   */
  async getChunksByTheme(
    theme: ThemeTag,
    options?: Omit<CorpusBrowseOptions, 'themes'>
  ): Promise<CorpusBrowseResult> {
    const { offset = 0, limit = 20, tones } = options ?? {};

    let candidates = Array.from(this.chunks.values()).filter(
      (chunk) => chunk.theme === theme
    );

    if (tones && tones.length > 0) {
      candidates = candidates.filter((chunk) => tones.includes(chunk.tone));
    }

    // Sort by book, chapter, and verse
    candidates.sort((a, b) => {
      const bookCompare = a.book.localeCompare(b.book);
      if (bookCompare !== 0) return bookCompare;
      const chapterCompare = (a.chapter ?? '').localeCompare(b.chapter ?? '');
      if (chapterCompare !== 0) return chapterCompare;
      return (a.verseNum ?? '').localeCompare(b.verseNum ?? '');
    });

    const totalCount = candidates.length;
    const chunks = candidates.slice(offset, offset + limit);

    return {
      chunks,
      totalCount,
      hasMore: offset + chunks.length < totalCount,
    };
  }

  /**
   * Detect intent themes from query
   */
  detectIntentThemes(query: string): ThemeTag[] {
    const lowerQuery = query.toLowerCase();
    const themes: ThemeTag[] = [];

    for (const [keyword, mappedThemes] of Object.entries(INTENT_THEME_MAP)) {
      if (!lowerQuery.includes(keyword)) continue;
      for (const theme of mappedThemes) {
        if (!themes.includes(theme)) {
          themes.push(theme);
        }
      }
    }

    return themes.slice(0, 3);
  }

  /**
   * Get surrounding context for a chunk
   */
  async getSurroundingContext(
    sourceRef: string,
    contextSize: number = 2
  ): Promise<{
    targetChunk: WisdomChunk;
    beforeChunks: WisdomChunk[];
    afterChunks: WisdomChunk[];
  } | null> {
    // Find the target chunk
    let targetChunk: WisdomChunk | null = null;
    const chunkValues = Array.from(this.chunks.values());
    for (const chunk of chunkValues) {
      if (chunk.sourceRef === sourceRef) {
        targetChunk = chunk;
        break;
      }
    }

    if (!targetChunk) {
      return null;
    }

    // Get chunks from the same book
    const sameBookChunks = Array.from(this.chunks.values())
      .filter((chunk) => chunk.book === targetChunk!.book)
      .sort((a, b) => {
        const chapterCompare = (a.chapter ?? '').localeCompare(b.chapter ?? '');
        if (chapterCompare !== 0) return chapterCompare;
        return (a.verseNum ?? '').localeCompare(b.verseNum ?? '');
      });

    const targetIndex = sameBookChunks.findIndex(
      (chunk) => chunk.sourceRef === sourceRef
    );

    const beforeChunks = sameBookChunks
      .slice(Math.max(0, targetIndex - contextSize), targetIndex)
      .reverse()
      .reverse(); // Maintain order

    const afterChunks = sameBookChunks.slice(
      targetIndex + 1,
      targetIndex + 1 + contextSize
    );

    return {
      targetChunk,
      beforeChunks,
      afterChunks,
    };
  }

  /**
   * Clear all chunks (useful for testing)
   */
  clear(): void {
    this.chunks.clear();
  }

  /**
   * Seed with initial data (useful for testing)
   */
  seed(chunks: WisdomChunk[]): void {
    for (const chunk of chunks) {
      this.chunks.set(chunk.id, chunk);
    }
  }

  /**
   * Add a single chunk (useful for testing)
   */
  addChunk(chunk: WisdomChunk): void {
    this.chunks.set(chunk.id, chunk);
  }

  /**
   * Shuffle array utility
   */
  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}

/**
 * Sample wisdom data for testing
 */
export function createSampleWisdomChunks(): WisdomChunk[] {
  return [
    {
      id: 'chunk_1',
      content: 'You have the right to work, but never to the fruit of work.',
      sourceRef: 'Bhagavad Gita 2.47',
      book: 'Bhagavad Gita',
      theme: 'action',
      tone: 'philosophical',
      chapter: '2',
      verseNum: '47',
    },
    {
      id: 'chunk_2',
      content: 'The mind is restless and difficult to restrain, but it is subdued by practice.',
      sourceRef: 'Bhagavad Gita 6.35',
      book: 'Bhagavad Gita',
      theme: 'meditation',
      tone: 'direct',
      chapter: '6',
      verseNum: '35',
    },
    {
      id: 'chunk_3',
      content: 'For one who has conquered the mind, the mind is the best of friends.',
      sourceRef: 'Bhagavad Gita 6.6',
      book: 'Bhagavad Gita',
      theme: 'self',
      tone: 'philosophical',
      chapter: '6',
      verseNum: '6',
    },
    {
      id: 'chunk_4',
      content: 'The soul is neither born, nor does it ever die; nor having once existed, does it ever cease to be.',
      sourceRef: 'Bhagavad Gita 2.20',
      book: 'Bhagavad Gita',
      theme: 'impermanence',
      tone: 'poetic',
      chapter: '2',
      verseNum: '20',
    },
    {
      id: 'chunk_5',
      content: 'When meditation is mastered, the mind is unwavering like the flame of a lamp in a windless place.',
      sourceRef: 'Bhagavad Gita 6.19',
      book: 'Bhagavad Gita',
      theme: 'peace',
      tone: 'poetic',
      chapter: '6',
      verseNum: '19',
    },
    {
      id: 'chunk_6',
      content: 'Perform your obligatory duty, because action is indeed better than inaction.',
      sourceRef: 'Bhagavad Gita 3.8',
      book: 'Bhagavad Gita',
      theme: 'duty',
      tone: 'direct',
      chapter: '3',
      verseNum: '8',
    },
    {
      id: 'chunk_7',
      content: 'The peace of God is with those whose mind and soul are in harmony.',
      sourceRef: 'Bhagavad Gita 5.29',
      book: 'Bhagavad Gita',
      theme: 'devotion',
      tone: 'devotional',
      chapter: '5',
      verseNum: '29',
    },
    {
      id: 'chunk_8',
      content: 'Knowledge is better than mere ritualistic practice.',
      sourceRef: 'Bhagavad Gita 12.12',
      book: 'Bhagavad Gita',
      theme: 'knowledge',
      tone: 'direct',
      chapter: '12',
      verseNum: '12',
    },
  ];
}
