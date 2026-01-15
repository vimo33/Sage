/**
 * Repository Pattern Implementation
 *
 * This module provides a clean separation between domain logic and persistence
 * concerns through the repository pattern. It enables:
 *
 * 1. Independent testing of business logic without database dependencies
 * 2. Swappable data layer implementations (in-memory, SecureStore, SQLite, cloud)
 * 3. Clear boundaries between domain logic and infrastructure concerns
 *
 * ## Usage
 *
 * ### Production (persistent storage)
 * ```typescript
 * import { getJournalRepository, getInsightRepository } from '@/lib/repositories';
 *
 * // Get repository instances
 * const journalRepo = getJournalRepository();
 * const insightRepo = getInsightRepository();
 *
 * // Use repositories
 * const journal = await journalRepo.create({ content: 'My thoughts...' });
 * const insights = await insightRepo.findByTag('peace');
 * ```
 *
 * ### Testing (in-memory storage)
 * ```typescript
 * import {
 *   InMemoryJournalRepository,
 *   InMemoryInsightRepository,
 *   createSampleWisdomChunks,
 * } from '@/lib/repositories';
 *
 * // Create test instances
 * const journalRepo = new InMemoryJournalRepository();
 * const insightRepo = new InMemoryInsightRepository();
 *
 * // Test with isolated data
 * const journal = await journalRepo.create({ content: 'Test entry' });
 * expect(await journalRepo.count()).toBe(1);
 *
 * // Clean up
 * journalRepo.clear();
 * ```
 *
 * ### Dependency Injection
 * ```typescript
 * import {
 *   createRepositoryFactory,
 *   setRepositories,
 *   resetRepositories,
 * } from '@/lib/repositories';
 *
 * // Create a test factory
 * const testFactory = createRepositoryFactory({ type: 'memory' });
 *
 * // Inject test repositories
 * setRepositories({
 *   journal: testFactory.createJournalRepository(),
 *   insight: testFactory.createInsightRepository(),
 * });
 *
 * // After tests, reset to defaults
 * resetRepositories();
 * ```
 */

// ============================================================================
// Types and Interfaces
// ============================================================================

export type {
  // Domain models
  Journal,
  JournalCreateInput,
  JournalUpdateInput,
  Insight,
  InsightCreateInput,
  InsightUpdateInput,
  WisdomChunk,
  ThemeTag,
  ToneTag,
  AnalyticsEvent,
  AnalyticsEventType,
  CrashReport,
  AnalyticsSummary,

  // Search/filter options
  CorpusSearchOptions,
  CorpusBrowseOptions,
  CorpusBrowseResult,
  AnalyticsEventFilter,

  // Repository interfaces
  IRepository,
  IJournalRepository,
  IInsightRepository,
  ICorpusRepository,
  IAnalyticsRepository,
  IRepositoryFactory,
} from './types';

// ============================================================================
// In-Memory Implementations (for testing)
// ============================================================================

export {
  InMemoryJournalRepository,
  InMemoryInsightRepository,
  InMemoryCorpusRepository,
  InMemoryAnalyticsRepository,
  createSampleWisdomChunks,
} from './in-memory';

// ============================================================================
// Persistent Implementations (for production)
// ============================================================================

export {
  SecureStoreJournalRepository,
  SecureStoreInsightRepository,
  SecureStoreAnalyticsRepository,
  SQLiteCorpusRepository,
} from './secure-store';

// ============================================================================
// Factory and Dependency Injection
// ============================================================================

export {
  // Factory classes
  InMemoryRepositoryFactory,
  PersistentRepositoryFactory,
  createRepositoryFactory,

  // Default instances
  defaultRepositoryFactory,
  testRepositoryFactory,

  // Singleton accessors
  getJournalRepository,
  getInsightRepository,
  getCorpusRepository,
  getAnalyticsRepository,

  // Dependency injection utilities
  resetRepositories,
  setRepositories,

  // Types
  type RepositoryType,
  type RepositoryFactoryConfig,
} from './factory';
