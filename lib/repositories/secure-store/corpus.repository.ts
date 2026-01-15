/**
 * SQLite Corpus Repository
 *
 * Provides a SQLite-backed implementation of ICorpusRepository for production use.
 * This wraps the existing search.ts functionality to provide a clean repository interface.
 */

import type {
  ICorpusRepository,
  WisdomChunk,
  ThemeTag,
  CorpusSearchOptions,
  CorpusBrowseOptions,
  CorpusBrowseResult,
} from '../types';
import {
  initWisdomDB,
  closeWisdomDB,
  searchWisdom,
  searchByTheme,
  getRandomWisdom,
  getChunkById,
  getChunkCount,
  getAvailableBooks,
  getThemeDistribution,
  getChunksByBook,
  getChunksByThemeWithPagination,
  detectIntentThemes,
  getSurroundingContext,
} from '../../retrieval/search';

/**
 * SQLite implementation of the Corpus Repository
 *
 * This is a wrapper around the existing search.ts functionality that provides
 * a clean repository interface for dependency injection and testing.
 */
export class SQLiteCorpusRepository implements ICorpusRepository {
  private _initialized: boolean = false;

  /**
   * Initialize the corpus database connection
   */
  async initialize(): Promise<void> {
    await initWisdomDB();
    this._initialized = true;
  }

  /**
   * Close the corpus database connection
   */
  async close(): Promise<void> {
    await closeWisdomDB();
    this._initialized = false;
  }

  /**
   * Check if the corpus is initialized
   */
  isInitialized(): boolean {
    return this._initialized;
  }

  /**
   * Search wisdom chunks by query
   */
  async search(query: string, options?: CorpusSearchOptions): Promise<WisdomChunk[]> {
    return searchWisdom(query, options);
  }

  /**
   * Search by theme
   */
  async searchByTheme(
    theme: ThemeTag,
    options?: Omit<CorpusSearchOptions, 'themes'>
  ): Promise<WisdomChunk[]> {
    return searchByTheme(theme, options);
  }

  /**
   * Get a random wisdom chunk
   */
  async getRandomWisdom(options?: CorpusSearchOptions): Promise<WisdomChunk | null> {
    return getRandomWisdom(options);
  }

  /**
   * Get chunk by ID
   */
  async findById(id: string): Promise<WisdomChunk | null> {
    return getChunkById(id);
  }

  /**
   * Get total chunk count
   */
  async getChunkCount(
    options?: Pick<CorpusSearchOptions, 'themes' | 'books'>
  ): Promise<number> {
    return getChunkCount(options);
  }

  /**
   * Get available books with counts
   */
  async getAvailableBooks(): Promise<Array<{ book: string; count: number }>> {
    return getAvailableBooks();
  }

  /**
   * Get theme distribution
   */
  async getThemeDistribution(): Promise<Array<{ theme: ThemeTag; count: number }>> {
    return getThemeDistribution();
  }

  /**
   * Get chunks by book with pagination
   */
  async getChunksByBook(
    book: string,
    options?: CorpusBrowseOptions
  ): Promise<CorpusBrowseResult> {
    return getChunksByBook(book, options);
  }

  /**
   * Get chunks by theme with pagination
   */
  async getChunksByTheme(
    theme: ThemeTag,
    options?: Omit<CorpusBrowseOptions, 'themes'>
  ): Promise<CorpusBrowseResult> {
    return getChunksByThemeWithPagination(theme, options);
  }

  /**
   * Detect intent themes from query
   */
  detectIntentThemes(query: string): ThemeTag[] {
    return detectIntentThemes(query);
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
    return getSurroundingContext(sourceRef, contextSize);
  }
}
