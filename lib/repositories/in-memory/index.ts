/**
 * In-Memory Repository Implementations
 *
 * These implementations store all data in memory and are designed for:
 * - Unit testing without database dependencies
 * - Integration testing with isolated data
 * - Development and prototyping
 *
 * Data is NOT persisted between sessions.
 */

export { InMemoryJournalRepository } from './journal.repository';
export { InMemoryInsightRepository } from './insight.repository';
export { InMemoryCorpusRepository, createSampleWisdomChunks } from './corpus.repository';
export { InMemoryAnalyticsRepository } from './analytics.repository';
