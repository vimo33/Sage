/**
 * Repository Factory
 *
 * Provides factory functions for creating repository instances.
 * Supports both in-memory implementations (for testing) and
 * persistent implementations (for production).
 */

import type {
  IRepositoryFactory,
  IJournalRepository,
  IInsightRepository,
  ICorpusRepository,
  IAnalyticsRepository,
} from './types';

// In-memory implementations
import {
  InMemoryJournalRepository,
  InMemoryInsightRepository,
  InMemoryCorpusRepository,
  InMemoryAnalyticsRepository,
} from './in-memory';

// SecureStore implementations
import {
  SecureStoreJournalRepository,
  SecureStoreInsightRepository,
  SecureStoreAnalyticsRepository,
  SQLiteCorpusRepository,
} from './secure-store';

/**
 * Repository type for selecting implementations
 */
export type RepositoryType = 'memory' | 'persistent';

/**
 * Configuration for repository factory
 */
export interface RepositoryFactoryConfig {
  type: RepositoryType;
}

/**
 * In-Memory Repository Factory
 *
 * Creates in-memory repository instances for testing.
 * Data is not persisted between sessions.
 */
export class InMemoryRepositoryFactory implements IRepositoryFactory {
  createJournalRepository(): IJournalRepository {
    return new InMemoryJournalRepository();
  }

  createInsightRepository(): IInsightRepository {
    return new InMemoryInsightRepository();
  }

  createCorpusRepository(): ICorpusRepository {
    return new InMemoryCorpusRepository();
  }

  createAnalyticsRepository(): IAnalyticsRepository {
    return new InMemoryAnalyticsRepository();
  }
}

/**
 * Persistent Repository Factory
 *
 * Creates persistent repository instances for production.
 * Data is persisted to SecureStore (encrypted) and SQLite.
 */
export class PersistentRepositoryFactory implements IRepositoryFactory {
  createJournalRepository(): IJournalRepository {
    return new SecureStoreJournalRepository();
  }

  createInsightRepository(): IInsightRepository {
    return new SecureStoreInsightRepository();
  }

  createCorpusRepository(): ICorpusRepository {
    return new SQLiteCorpusRepository();
  }

  createAnalyticsRepository(): IAnalyticsRepository {
    return new SecureStoreAnalyticsRepository();
  }
}

/**
 * Create a repository factory based on configuration
 */
export function createRepositoryFactory(
  config: RepositoryFactoryConfig
): IRepositoryFactory {
  switch (config.type) {
    case 'memory':
      return new InMemoryRepositoryFactory();
    case 'persistent':
      return new PersistentRepositoryFactory();
    default:
      throw new Error(`Unknown repository type: ${config.type}`);
  }
}

/**
 * Default factory for production use
 */
export const defaultRepositoryFactory = new PersistentRepositoryFactory();

/**
 * Test factory for testing
 */
export const testRepositoryFactory = new InMemoryRepositoryFactory();

/**
 * Singleton instances for common use cases
 */
let _journalRepository: IJournalRepository | null = null;
let _insightRepository: IInsightRepository | null = null;
let _corpusRepository: ICorpusRepository | null = null;
let _analyticsRepository: IAnalyticsRepository | null = null;

/**
 * Get or create the default journal repository
 */
export function getJournalRepository(): IJournalRepository {
  if (!_journalRepository) {
    _journalRepository = defaultRepositoryFactory.createJournalRepository();
  }
  return _journalRepository;
}

/**
 * Get or create the default insight repository
 */
export function getInsightRepository(): IInsightRepository {
  if (!_insightRepository) {
    _insightRepository = defaultRepositoryFactory.createInsightRepository();
  }
  return _insightRepository;
}

/**
 * Get or create the default corpus repository
 */
export function getCorpusRepository(): ICorpusRepository {
  if (!_corpusRepository) {
    _corpusRepository = defaultRepositoryFactory.createCorpusRepository();
  }
  return _corpusRepository;
}

/**
 * Get or create the default analytics repository
 */
export function getAnalyticsRepository(): IAnalyticsRepository {
  if (!_analyticsRepository) {
    _analyticsRepository = defaultRepositoryFactory.createAnalyticsRepository();
  }
  return _analyticsRepository;
}

/**
 * Reset all singleton instances (useful for testing)
 */
export function resetRepositories(): void {
  _journalRepository = null;
  _insightRepository = null;
  _corpusRepository = null;
  _analyticsRepository = null;
}

/**
 * Set custom repository instances (useful for testing with mocks)
 */
export function setRepositories(config: {
  journal?: IJournalRepository;
  insight?: IInsightRepository;
  corpus?: ICorpusRepository;
  analytics?: IAnalyticsRepository;
}): void {
  if (config.journal) {
    _journalRepository = config.journal;
  }
  if (config.insight) {
    _insightRepository = config.insight;
  }
  if (config.corpus) {
    _corpusRepository = config.corpus;
  }
  if (config.analytics) {
    _analyticsRepository = config.analytics;
  }
}
