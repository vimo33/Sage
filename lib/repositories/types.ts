/**
 * Repository Pattern Types
 *
 * This module defines the core domain models and repository interfaces
 * for the Sage AI application. These interfaces provide a clean separation
 * between domain logic and persistence concerns, enabling:
 *
 * 1. Independent testing of business logic without database dependencies
 * 2. Swappable data layer implementations (in-memory, SecureStore, SQLite, cloud)
 * 3. Clear boundaries between domain logic and infrastructure concerns
 */

// ============================================================================
// Domain Models (separated from persistence)
// ============================================================================

/**
 * Journal Entry domain model
 */
export interface Journal {
  id: string;
  title?: string;
  content: string;
  mood?: string;
  tags?: string[];
  createdAt: number;
  updatedAt?: number;
  linkedInsightIds: string[];
}

/**
 * Input for creating a new journal entry
 */
export type JournalCreateInput = Omit<Journal, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * Input for updating an existing journal entry
 */
export type JournalUpdateInput = Partial<Omit<Journal, 'id' | 'createdAt'>>;

/**
 * Saved Insight domain model
 */
export interface Insight {
  id: string;
  verseContent: string;
  sourceRef: string;
  userNote?: string;
  tags?: string[];
  createdAt: number;
  updatedAt?: number;
}

/**
 * Input for creating a new insight
 */
export type InsightCreateInput = Omit<Insight, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * Input for updating an existing insight
 */
export type InsightUpdateInput = Partial<Omit<Insight, 'id' | 'createdAt'>>;

/**
 * Theme tags for wisdom corpus
 */
export type ThemeTag =
  | 'action'
  | 'detachment'
  | 'suffering'
  | 'purpose'
  | 'discipline'
  | 'compassion'
  | 'self'
  | 'impermanence'
  | 'devotion'
  | 'knowledge'
  | 'meditation'
  | 'desire'
  | 'peace'
  | 'duty'
  | 'truth';

/**
 * Tone tags for wisdom corpus
 */
export type ToneTag = 'poetic' | 'philosophical' | 'direct' | 'devotional';

/**
 * Wisdom Chunk domain model (from corpus)
 */
export interface WisdomChunk {
  id: string;
  content: string;
  sourceRef: string;
  book: string;
  theme: ThemeTag;
  tone: ToneTag;
  chapter?: string;
  verseNum?: string;
  score?: number;
}

/**
 * Search options for corpus queries
 */
export interface CorpusSearchOptions {
  limit?: number;
  themes?: ThemeTag[];
  tones?: ToneTag[];
  books?: string[];
  minScore?: number;
}

/**
 * Paginated browse options for corpus
 */
export interface CorpusBrowseOptions {
  offset?: number;
  limit?: number;
  themes?: ThemeTag[];
  tones?: ToneTag[];
}

/**
 * Result of paginated corpus browsing
 */
export interface CorpusBrowseResult {
  chunks: WisdomChunk[];
  totalCount: number;
  hasMore: boolean;
}

/**
 * Analytics event types
 */
export type AnalyticsEventType =
  | 'app_opened'
  | 'app_backgrounded'
  | 'session_started'
  | 'session_ended'
  | 'feature_used'
  | 'setting_changed'
  | 'onboarding_completed';

/**
 * Analytics event domain model
 */
export interface AnalyticsEvent {
  id: string;
  timestamp: number;
  eventType: AnalyticsEventType;
  metadata?: Record<string, string | number | boolean>;
}

/**
 * Crash report domain model
 */
export interface CrashReport {
  id: string;
  timestamp: number;
  errorType: string;
  errorMessage: string;
  stackTrace: string;
  appVersion: string;
  platform: string;
  context?: string;
}

/**
 * Analytics summary
 */
export interface AnalyticsSummary {
  totalSessions: number;
  totalCrashes: number;
  featureUsage: Record<string, number>;
  avgSessionDurationMs: number;
  firstEventDate: number | null;
  lastEventDate: number | null;
}

/**
 * Filter options for analytics events
 */
export interface AnalyticsEventFilter {
  eventTypes?: AnalyticsEventType[];
  startDate?: number;
  endDate?: number;
  limit?: number;
}

// ============================================================================
// Base Repository Interface
// ============================================================================

/**
 * Base repository interface for standard CRUD operations
 */
export interface IRepository<T, CreateInput, UpdateInput> {
  /**
   * Create a new entity
   */
  create(input: CreateInput): Promise<T>;

  /**
   * Find an entity by its ID
   */
  findById(id: string): Promise<T | null>;

  /**
   * Update an existing entity
   */
  update(id: string, input: UpdateInput): Promise<T | null>;

  /**
   * Delete an entity by its ID
   */
  delete(id: string): Promise<boolean>;

  /**
   * Find all entities
   */
  findAll(): Promise<T[]>;

  /**
   * Count total entities
   */
  count(): Promise<number>;
}

// ============================================================================
// Specific Repository Interfaces
// ============================================================================

/**
 * Journal Repository Interface
 *
 * Provides data access operations for journal entries with support for
 * filtering, searching, and linking to insights.
 */
export interface IJournalRepository extends IRepository<Journal, JournalCreateInput, JournalUpdateInput> {
  /**
   * Find journals by date range
   */
  findByDateRange(startDate: number, endDate: number): Promise<Journal[]>;

  /**
   * Find journals by tags
   */
  findByTags(tags: string[]): Promise<Journal[]>;

  /**
   * Search journals by content
   */
  search(query: string): Promise<Journal[]>;

  /**
   * Find journals by mood
   */
  findByMood(mood: string): Promise<Journal[]>;

  /**
   * Link an insight to a journal entry
   */
  linkInsight(journalId: string, insightId: string): Promise<Journal | null>;

  /**
   * Unlink an insight from a journal entry
   */
  unlinkInsight(journalId: string, insightId: string): Promise<Journal | null>;

  /**
   * Find journals linked to a specific insight
   */
  findByLinkedInsight(insightId: string): Promise<Journal[]>;

  /**
   * Bulk import journal entries
   */
  bulkCreate(entries: Array<{ content: string; mood?: string; createdAt: number }>): Promise<Journal[]>;
}

/**
 * Insight Repository Interface
 *
 * Provides data access operations for saved insights (wisdom verses)
 * with support for tagging and searching.
 */
export interface IInsightRepository extends IRepository<Insight, InsightCreateInput, InsightUpdateInput> {
  /**
   * Find insights by tag
   */
  findByTag(tag: string): Promise<Insight[]>;

  /**
   * Find insights by multiple tags (intersection)
   */
  findByTags(tags: string[]): Promise<Insight[]>;

  /**
   * Get all unique tags across all insights
   */
  getAllTags(): Promise<string[]>;

  /**
   * Search insights by content or notes
   */
  search(query: string, filterTags?: string[]): Promise<Insight[]>;

  /**
   * Add a tag to an insight
   */
  addTag(insightId: string, tag: string): Promise<Insight | null>;

  /**
   * Remove a tag from an insight
   */
  removeTag(insightId: string, tag: string): Promise<Insight | null>;

  /**
   * Check if a verse is already saved
   */
  isVerseSaved(verseContent: string, sourceRef: string): Promise<boolean>;

  /**
   * Find insight by source reference
   */
  findBySourceRef(sourceRef: string): Promise<Insight | null>;
}

/**
 * Corpus Repository Interface
 *
 * Provides read-only access to the wisdom corpus (pre-populated database).
 * This is a read-only repository as the corpus is not user-modifiable.
 */
export interface ICorpusRepository {
  /**
   * Initialize the corpus database connection
   */
  initialize(): Promise<void>;

  /**
   * Close the corpus database connection
   */
  close(): Promise<void>;

  /**
   * Check if the corpus is initialized
   */
  isInitialized(): boolean;

  /**
   * Search wisdom chunks by query
   */
  search(query: string, options?: CorpusSearchOptions): Promise<WisdomChunk[]>;

  /**
   * Search by theme
   */
  searchByTheme(theme: ThemeTag, options?: Omit<CorpusSearchOptions, 'themes'>): Promise<WisdomChunk[]>;

  /**
   * Get a random wisdom chunk
   */
  getRandomWisdom(options?: CorpusSearchOptions): Promise<WisdomChunk | null>;

  /**
   * Get chunk by ID
   */
  findById(id: string): Promise<WisdomChunk | null>;

  /**
   * Get total chunk count
   */
  getChunkCount(options?: Pick<CorpusSearchOptions, 'themes' | 'books'>): Promise<number>;

  /**
   * Get available books with counts
   */
  getAvailableBooks(): Promise<Array<{ book: string; count: number }>>;

  /**
   * Get theme distribution
   */
  getThemeDistribution(): Promise<Array<{ theme: ThemeTag; count: number }>>;

  /**
   * Get chunks by book with pagination
   */
  getChunksByBook(book: string, options?: CorpusBrowseOptions): Promise<CorpusBrowseResult>;

  /**
   * Get chunks by theme with pagination
   */
  getChunksByTheme(theme: ThemeTag, options?: Omit<CorpusBrowseOptions, 'themes'>): Promise<CorpusBrowseResult>;

  /**
   * Detect intent themes from query
   */
  detectIntentThemes(query: string): ThemeTag[];

  /**
   * Get surrounding context for a chunk
   */
  getSurroundingContext(sourceRef: string, contextSize?: number): Promise<{
    targetChunk: WisdomChunk;
    beforeChunks: WisdomChunk[];
    afterChunks: WisdomChunk[];
  } | null>;
}

/**
 * Analytics Repository Interface
 *
 * Provides data access for anonymous, privacy-focused analytics
 * including usage events and crash reports.
 */
export interface IAnalyticsRepository {
  /**
   * Record a usage event
   */
  recordEvent(eventType: AnalyticsEventType, metadata?: Record<string, string | number | boolean>): Promise<AnalyticsEvent>;

  /**
   * Record a crash report
   */
  recordCrash(error: Error, context?: string): Promise<CrashReport>;

  /**
   * Get analytics events with optional filters
   */
  getEvents(filter?: AnalyticsEventFilter): Promise<AnalyticsEvent[]>;

  /**
   * Get crash reports
   */
  getCrashReports(): Promise<CrashReport[]>;

  /**
   * Get analytics summary
   */
  getSummary(): Promise<AnalyticsSummary>;

  /**
   * Delete events older than a timestamp
   */
  deleteOlderThan(timestamp: number): Promise<number>;

  /**
   * Clear all analytics data
   */
  clearAll(): Promise<void>;

  /**
   * Export all analytics data
   */
  exportData(): Promise<{
    events: AnalyticsEvent[];
    crashReports: CrashReport[];
    summary: AnalyticsSummary;
    exportedAt: number;
  }>;
}

// ============================================================================
// Repository Factory Interface
// ============================================================================

/**
 * Repository factory for dependency injection
 */
export interface IRepositoryFactory {
  createJournalRepository(): IJournalRepository;
  createInsightRepository(): IInsightRepository;
  createCorpusRepository(): ICorpusRepository;
  createAnalyticsRepository(): IAnalyticsRepository;
}
