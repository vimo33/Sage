/**
 * Unit Tests for Repository Implementations
 *
 * Tests the repository pattern implementation including:
 * - In-memory repositories for testing
 * - CRUD operations
 * - Search and filtering
 * - Tag management
 * - Factory pattern
 */

// Mock expo-secure-store before imports
jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn().mockResolvedValue(null),
  setItemAsync: jest.fn().mockResolvedValue(undefined),
  deleteItemAsync: jest.fn().mockResolvedValue(undefined),
}));

// Mock expo-sqlite modules
jest.mock('expo-sqlite', () => ({
  openDatabaseAsync: jest.fn(),
  importDatabaseFromAssetAsync: jest.fn(),
  defaultDatabaseDirectory: '/mock/path',
}));

// Mock expo-file-system
jest.mock('expo-file-system', () => ({
  documentDirectory: '/mock/documents/',
  getInfoAsync: jest.fn().mockResolvedValue({ exists: false }),
  makeDirectoryAsync: jest.fn().mockResolvedValue(undefined),
  copyAsync: jest.fn().mockResolvedValue(undefined),
  deleteAsync: jest.fn().mockResolvedValue(undefined),
}));

// Mock expo-asset
jest.mock('expo-asset', () => ({
  Asset: {
    loadAsync: jest.fn().mockResolvedValue([{ localUri: '/mock/path' }]),
  },
}));

// Mock react-native Platform for analytics repository
jest.mock('react-native', () => ({
  Platform: { OS: 'ios' },
}));

import {
  InMemoryJournalRepository,
  InMemoryInsightRepository,
  InMemoryCorpusRepository,
  InMemoryAnalyticsRepository,
  createSampleWisdomChunks,
  createRepositoryFactory,
  testRepositoryFactory,
} from './index';

describe('InMemoryJournalRepository', () => {
  let repo: InMemoryJournalRepository;

  beforeEach(() => {
    repo = new InMemoryJournalRepository();
  });

  afterEach(() => {
    repo.clear();
  });

  describe('create', () => {
    it('should create a journal entry with auto-generated id and timestamps', async () => {
      const journal = await repo.create({
        content: 'Test journal entry',
        mood: 'peaceful',
        linkedInsightIds: [],
      });

      expect(journal.id).toBeDefined();
      expect(journal.id).toMatch(/^journal_/);
      expect(journal.content).toBe('Test journal entry');
      expect(journal.mood).toBe('peaceful');
      expect(journal.createdAt).toBeDefined();
      expect(journal.updatedAt).toBeDefined();
    });

    it('should increment count when creating entries', async () => {
      expect(await repo.count()).toBe(0);
      await repo.create({ content: 'Entry 1', linkedInsightIds: [] });
      expect(await repo.count()).toBe(1);
      await repo.create({ content: 'Entry 2', linkedInsightIds: [] });
      expect(await repo.count()).toBe(2);
    });
  });

  describe('findById', () => {
    it('should find an existing journal entry by id', async () => {
      const created = await repo.create({ content: 'Find me', linkedInsightIds: [] });
      const found = await repo.findById(created.id);

      expect(found).not.toBeNull();
      expect(found?.content).toBe('Find me');
    });

    it('should return null for non-existent id', async () => {
      const found = await repo.findById('non-existent');
      expect(found).toBeNull();
    });
  });

  describe('update', () => {
    it('should update an existing journal entry', async () => {
      const created = await repo.create({ content: 'Original', linkedInsightIds: [] });
      const updated = await repo.update(created.id, { content: 'Updated' });

      expect(updated).not.toBeNull();
      expect(updated?.content).toBe('Updated');
      expect(updated?.updatedAt).toBeGreaterThanOrEqual(created.createdAt);
    });

    it('should return null when updating non-existent entry', async () => {
      const updated = await repo.update('non-existent', { content: 'Updated' });
      expect(updated).toBeNull();
    });

    it('should preserve id and createdAt when updating', async () => {
      const created = await repo.create({ content: 'Original', linkedInsightIds: [] });
      const updated = await repo.update(created.id, { content: 'Updated' });

      expect(updated?.id).toBe(created.id);
      expect(updated?.createdAt).toBe(created.createdAt);
    });
  });

  describe('delete', () => {
    it('should delete an existing journal entry', async () => {
      const created = await repo.create({ content: 'Delete me', linkedInsightIds: [] });
      const deleted = await repo.delete(created.id);

      expect(deleted).toBe(true);
      expect(await repo.count()).toBe(0);
    });

    it('should return false when deleting non-existent entry', async () => {
      const deleted = await repo.delete('non-existent');
      expect(deleted).toBe(false);
    });
  });

  describe('findAll', () => {
    it('should return all entries sorted by createdAt (newest first)', async () => {
      await repo.create({ content: 'First', linkedInsightIds: [] });
      await new Promise((resolve) => setTimeout(resolve, 10)); // Small delay for different timestamps
      await repo.create({ content: 'Second', linkedInsightIds: [] });

      const all = await repo.findAll();
      expect(all).toHaveLength(2);
      expect(all[0].content).toBe('Second');
      expect(all[1].content).toBe('First');
    });
  });

  describe('findByDateRange', () => {
    it('should find entries within date range', async () => {
      const now = Date.now();
      const journal = await repo.create({ content: 'In range', linkedInsightIds: [] });

      const results = await repo.findByDateRange(now - 1000, now + 1000);
      expect(results).toHaveLength(1);
      expect(results[0].id).toBe(journal.id);
    });

    it('should exclude entries outside date range', async () => {
      await repo.create({ content: 'Created now', linkedInsightIds: [] });

      const results = await repo.findByDateRange(0, 1000); // Very old range
      expect(results).toHaveLength(0);
    });
  });

  describe('findByTags', () => {
    it('should find entries by tags', async () => {
      await repo.create({ content: 'Tagged', tags: ['meditation', 'peace'], linkedInsightIds: [] });
      await repo.create({ content: 'No tags', linkedInsightIds: [] });

      const results = await repo.findByTags(['meditation']);
      expect(results).toHaveLength(1);
      expect(results[0].content).toBe('Tagged');
    });

    it('should be case-insensitive for tags', async () => {
      await repo.create({ content: 'Tagged', tags: ['MEDITATION'], linkedInsightIds: [] });

      const results = await repo.findByTags(['meditation']);
      expect(results).toHaveLength(1);
    });
  });

  describe('search', () => {
    it('should search in content', async () => {
      await repo.create({ content: 'Finding inner peace today', linkedInsightIds: [] });
      await repo.create({ content: 'Random thoughts', linkedInsightIds: [] });

      const results = await repo.search('peace');
      expect(results).toHaveLength(1);
      expect(results[0].content).toContain('peace');
    });

    it('should search in title', async () => {
      await repo.create({ content: 'Content here', title: 'My Peaceful Day', linkedInsightIds: [] });

      const results = await repo.search('peaceful');
      expect(results).toHaveLength(1);
    });

    it('should be case-insensitive', async () => {
      await repo.create({ content: 'PEACE and calm', linkedInsightIds: [] });

      const results = await repo.search('peace');
      expect(results).toHaveLength(1);
    });
  });

  describe('findByMood', () => {
    it('should find entries by mood', async () => {
      await repo.create({ content: 'Happy', mood: 'happy', linkedInsightIds: [] });
      await repo.create({ content: 'Sad', mood: 'sad', linkedInsightIds: [] });

      const results = await repo.findByMood('happy');
      expect(results).toHaveLength(1);
      expect(results[0].content).toBe('Happy');
    });
  });

  describe('linkInsight and unlinkInsight', () => {
    it('should link an insight to a journal', async () => {
      const journal = await repo.create({ content: 'Journal', linkedInsightIds: [] });
      const linked = await repo.linkInsight(journal.id, 'insight_123');

      expect(linked?.linkedInsightIds).toContain('insight_123');
    });

    it('should not duplicate insight links', async () => {
      const journal = await repo.create({ content: 'Journal', linkedInsightIds: [] });
      await repo.linkInsight(journal.id, 'insight_123');
      await repo.linkInsight(journal.id, 'insight_123');

      const found = await repo.findById(journal.id);
      expect(found?.linkedInsightIds.filter((id) => id === 'insight_123')).toHaveLength(1);
    });

    it('should unlink an insight from a journal', async () => {
      const journal = await repo.create({ content: 'Journal', linkedInsightIds: [] });
      await repo.linkInsight(journal.id, 'insight_123');
      const unlinked = await repo.unlinkInsight(journal.id, 'insight_123');

      expect(unlinked?.linkedInsightIds).not.toContain('insight_123');
    });
  });

  describe('bulkCreate', () => {
    it('should import multiple entries', async () => {
      const entries = [
        { content: 'Entry 1', createdAt: Date.now() - 1000 },
        { content: 'Entry 2', mood: 'happy', createdAt: Date.now() },
      ];

      const created = await repo.bulkCreate(entries);
      expect(created).toHaveLength(2);
      expect(await repo.count()).toBe(2);
    });
  });
});

describe('InMemoryInsightRepository', () => {
  let repo: InMemoryInsightRepository;

  beforeEach(() => {
    repo = new InMemoryInsightRepository();
  });

  afterEach(() => {
    repo.clear();
  });

  describe('create', () => {
    it('should create an insight with normalized tags', async () => {
      const insight = await repo.create({
        verseContent: 'Wisdom verse',
        sourceRef: 'Bhagavad Gita 2.47',
        tags: ['ACTION', 'Purpose'],
      });

      expect(insight.id).toBeDefined();
      expect(insight.tags).toEqual(['action', 'purpose']);
    });
  });

  describe('findByTag', () => {
    it('should find insights by single tag', async () => {
      await repo.create({ verseContent: 'V1', sourceRef: 'Ref1', tags: ['peace'] });
      await repo.create({ verseContent: 'V2', sourceRef: 'Ref2', tags: ['action'] });

      const results = await repo.findByTag('peace');
      expect(results).toHaveLength(1);
      expect(results[0].verseContent).toBe('V1');
    });
  });

  describe('findByTags', () => {
    it('should find insights with ALL specified tags (intersection)', async () => {
      await repo.create({ verseContent: 'V1', sourceRef: 'Ref1', tags: ['peace', 'meditation'] });
      await repo.create({ verseContent: 'V2', sourceRef: 'Ref2', tags: ['peace'] });

      const results = await repo.findByTags(['peace', 'meditation']);
      expect(results).toHaveLength(1);
      expect(results[0].verseContent).toBe('V1');
    });
  });

  describe('getAllTags', () => {
    it('should return all unique tags sorted alphabetically', async () => {
      await repo.create({ verseContent: 'V1', sourceRef: 'Ref1', tags: ['peace', 'action'] });
      await repo.create({ verseContent: 'V2', sourceRef: 'Ref2', tags: ['meditation', 'peace'] });

      const tags = await repo.getAllTags();
      expect(tags).toEqual(['action', 'meditation', 'peace']);
    });
  });

  describe('search', () => {
    it('should search in verse content', async () => {
      await repo.create({ verseContent: 'The mind is restless', sourceRef: 'Ref1' });
      await repo.create({ verseContent: 'Peace comes from within', sourceRef: 'Ref2' });

      const results = await repo.search('mind');
      expect(results).toHaveLength(1);
    });

    it('should search with tag filter', async () => {
      await repo.create({ verseContent: 'Mind verse', sourceRef: 'Ref1', tags: ['meditation'] });
      await repo.create({ verseContent: 'Mind verse', sourceRef: 'Ref2', tags: ['action'] });

      const results = await repo.search('mind', ['meditation']);
      expect(results).toHaveLength(1);
    });
  });

  describe('addTag and removeTag', () => {
    it('should add a tag to an insight', async () => {
      const insight = await repo.create({ verseContent: 'V', sourceRef: 'R' });
      const updated = await repo.addTag(insight.id, 'new-tag');

      expect(updated?.tags).toContain('new-tag');
    });

    it('should remove a tag from an insight', async () => {
      const insight = await repo.create({ verseContent: 'V', sourceRef: 'R', tags: ['remove-me'] });
      const updated = await repo.removeTag(insight.id, 'remove-me');

      expect(updated?.tags).not.toContain('remove-me');
    });

    it('should normalize tags when adding', async () => {
      const insight = await repo.create({ verseContent: 'V', sourceRef: 'R' });
      await repo.addTag(insight.id, '  UPPER  ');

      const found = await repo.findById(insight.id);
      expect(found?.tags).toContain('upper');
    });
  });

  describe('isVerseSaved', () => {
    it('should return true if verse is already saved', async () => {
      await repo.create({ verseContent: 'Unique verse', sourceRef: 'Ref1' });

      const isSaved = await repo.isVerseSaved('Unique verse', 'Ref1');
      expect(isSaved).toBe(true);
    });

    it('should return false if verse is not saved', async () => {
      const isSaved = await repo.isVerseSaved('Not saved', 'Ref1');
      expect(isSaved).toBe(false);
    });
  });

  describe('findBySourceRef', () => {
    it('should find insight by source reference', async () => {
      await repo.create({ verseContent: 'V', sourceRef: 'Bhagavad Gita 2.47' });

      const found = await repo.findBySourceRef('Bhagavad Gita 2.47');
      expect(found).not.toBeNull();
      expect(found?.sourceRef).toBe('Bhagavad Gita 2.47');
    });
  });
});

describe('InMemoryCorpusRepository', () => {
  let repo: InMemoryCorpusRepository;

  beforeEach(async () => {
    repo = new InMemoryCorpusRepository();
    const sampleChunks = createSampleWisdomChunks();
    repo.seed(sampleChunks);
    await repo.initialize();
  });

  afterEach(async () => {
    await repo.close();
    repo.clear();
  });

  describe('initialization', () => {
    it('should track initialization state', async () => {
      expect(repo.isInitialized()).toBe(true);

      await repo.close();
      expect(repo.isInitialized()).toBe(false);
    });
  });

  describe('search', () => {
    it('should search chunks by content', async () => {
      const results = await repo.search('mind');
      expect(results.length).toBeGreaterThan(0);
      expect(results.some((r) => r.content.toLowerCase().includes('mind'))).toBe(true);
    });

    it('should limit results', async () => {
      const results = await repo.search('the', { limit: 2 });
      expect(results.length).toBeLessThanOrEqual(2);
    });

    it('should filter by themes', async () => {
      const results = await repo.search('mind', { themes: ['meditation'] });
      results.forEach((r) => {
        expect(r.theme).toBe('meditation');
      });
    });
  });

  describe('searchByTheme', () => {
    it('should return chunks with specific theme', async () => {
      const results = await repo.searchByTheme('peace');
      results.forEach((r) => {
        expect(r.theme).toBe('peace');
      });
    });
  });

  describe('getRandomWisdom', () => {
    it('should return a random chunk', async () => {
      const chunk = await repo.getRandomWisdom();
      expect(chunk).not.toBeNull();
      expect(chunk?.content).toBeDefined();
    });

    it('should filter by options', async () => {
      const chunk = await repo.getRandomWisdom({ themes: ['action'] });
      expect(chunk?.theme).toBe('action');
    });
  });

  describe('findById', () => {
    it('should find chunk by id', async () => {
      const chunk = await repo.findById('chunk_1');
      expect(chunk).not.toBeNull();
      expect(chunk?.id).toBe('chunk_1');
    });

    it('should return null for non-existent id', async () => {
      const chunk = await repo.findById('non-existent');
      expect(chunk).toBeNull();
    });
  });

  describe('getChunkCount', () => {
    it('should count all chunks', async () => {
      const count = await repo.getChunkCount();
      expect(count).toBe(8); // Sample data has 8 chunks
    });

    it('should filter count by themes', async () => {
      const count = await repo.getChunkCount({ themes: ['action'] });
      expect(count).toBe(1);
    });
  });

  describe('getAvailableBooks', () => {
    it('should return books with counts', async () => {
      const books = await repo.getAvailableBooks();
      expect(books.length).toBeGreaterThan(0);
      expect(books[0]).toHaveProperty('book');
      expect(books[0]).toHaveProperty('count');
    });
  });

  describe('getThemeDistribution', () => {
    it('should return themes with counts', async () => {
      const themes = await repo.getThemeDistribution();
      expect(themes.length).toBeGreaterThan(0);
      expect(themes[0]).toHaveProperty('theme');
      expect(themes[0]).toHaveProperty('count');
    });
  });

  describe('detectIntentThemes', () => {
    it('should detect themes from query', () => {
      const themes = repo.detectIntentThemes('I feel stressed and anxious');
      expect(themes).toContain('peace');
    });

    it('should return up to 3 themes', () => {
      const themes = repo.detectIntentThemes('stressed anxious worried angry sad');
      expect(themes.length).toBeLessThanOrEqual(3);
    });
  });

  describe('getChunksByBook', () => {
    it('should return chunks paginated by book', async () => {
      const result = await repo.getChunksByBook('Bhagavad Gita', { limit: 3 });
      expect(result.chunks.length).toBeLessThanOrEqual(3);
      expect(result).toHaveProperty('totalCount');
      expect(result).toHaveProperty('hasMore');
    });
  });

  describe('getChunksByTheme', () => {
    it('should return chunks paginated by theme', async () => {
      const result = await repo.getChunksByTheme('meditation', { limit: 2 });
      expect(result.chunks.length).toBeLessThanOrEqual(2);
      result.chunks.forEach((c) => {
        expect(c.theme).toBe('meditation');
      });
    });
  });
});

describe('InMemoryAnalyticsRepository', () => {
  let repo: InMemoryAnalyticsRepository;

  beforeEach(() => {
    repo = new InMemoryAnalyticsRepository();
  });

  afterEach(() => {
    repo.clear();
  });

  describe('recordEvent', () => {
    it('should record a usage event', async () => {
      const event = await repo.recordEvent('app_opened');

      expect(event.id).toBeDefined();
      expect(event.eventType).toBe('app_opened');
      expect(event.timestamp).toBeDefined();
    });

    it('should record metadata with event', async () => {
      const event = await repo.recordEvent('feature_used', { feature: 'journal' });

      expect(event.metadata?.feature).toBe('journal');
    });

    it('should increment event count', async () => {
      await repo.recordEvent('app_opened');
      await repo.recordEvent('session_started');

      expect(repo.getEventCount()).toBe(2);
    });
  });

  describe('recordCrash', () => {
    it('should record a crash report', async () => {
      const error = new Error('Test error');
      const report = await repo.recordCrash(error, 'test context');

      expect(report.id).toBeDefined();
      expect(report.errorType).toBe('Error');
      expect(report.errorMessage).toBe('Test error');
      expect(report.context).toBe('test context');
    });

    it('should sanitize stack trace', async () => {
      const error = new Error('Test');
      error.stack = '/Users/secret/path/file.js';
      const report = await repo.recordCrash(error);

      expect(report.stackTrace).not.toContain('secret');
      expect(report.stackTrace).toContain('***');
    });
  });

  describe('getEvents', () => {
    it('should return all events', async () => {
      await repo.recordEvent('app_opened');
      await repo.recordEvent('session_started');

      const events = await repo.getEvents();
      expect(events).toHaveLength(2);
    });

    it('should filter by event types', async () => {
      await repo.recordEvent('app_opened');
      await repo.recordEvent('session_started');

      const events = await repo.getEvents({ eventTypes: ['app_opened'] });
      expect(events).toHaveLength(1);
      expect(events[0].eventType).toBe('app_opened');
    });

    it('should filter by date range', async () => {
      const now = Date.now();
      await repo.recordEvent('app_opened');

      const events = await repo.getEvents({ startDate: now - 1000, endDate: now + 1000 });
      expect(events).toHaveLength(1);
    });

    it('should limit results', async () => {
      await repo.recordEvent('app_opened');
      await repo.recordEvent('session_started');
      await repo.recordEvent('feature_used');

      const events = await repo.getEvents({ limit: 2 });
      expect(events).toHaveLength(2);
    });
  });

  describe('getSummary', () => {
    it('should return analytics summary', async () => {
      await repo.recordEvent('session_started');
      await repo.recordEvent('session_ended', { durationMs: 60000 });
      await repo.recordEvent('feature_used', { feature: 'journal' });
      await repo.recordEvent('feature_used', { feature: 'journal' });

      const summary = await repo.getSummary();

      expect(summary.totalSessions).toBe(1);
      expect(summary.featureUsage['journal']).toBe(2);
      expect(summary.avgSessionDurationMs).toBe(60000);
    });
  });

  describe('deleteOlderThan', () => {
    it('should delete old events and crash reports', async () => {
      await repo.recordEvent('app_opened');
      await repo.recordCrash(new Error('Old crash'));

      // Delete everything before now + 1 second (all events)
      const deleted = await repo.deleteOlderThan(Date.now() + 1000);

      expect(deleted).toBe(2);
      expect(repo.getEventCount()).toBe(0);
      expect(repo.getCrashReportCount()).toBe(0);
    });
  });

  describe('clearAll', () => {
    it('should clear all data', async () => {
      await repo.recordEvent('app_opened');
      await repo.recordCrash(new Error('Test'));

      await repo.clearAll();

      expect(repo.getEventCount()).toBe(0);
      expect(repo.getCrashReportCount()).toBe(0);
    });
  });

  describe('exportData', () => {
    it('should export all analytics data', async () => {
      await repo.recordEvent('app_opened');
      await repo.recordCrash(new Error('Test'));

      const exported = await repo.exportData();

      expect(exported.events).toHaveLength(1);
      expect(exported.crashReports).toHaveLength(1);
      expect(exported.summary).toBeDefined();
      expect(exported.exportedAt).toBeDefined();
    });
  });
});

describe('Repository Factory', () => {
  describe('createRepositoryFactory', () => {
    it('should create in-memory factory', () => {
      const factory = createRepositoryFactory({ type: 'memory' });

      expect(factory.createJournalRepository()).toBeInstanceOf(InMemoryJournalRepository);
      expect(factory.createInsightRepository()).toBeInstanceOf(InMemoryInsightRepository);
      expect(factory.createCorpusRepository()).toBeInstanceOf(InMemoryCorpusRepository);
      expect(factory.createAnalyticsRepository()).toBeInstanceOf(InMemoryAnalyticsRepository);
    });

    it('should throw for unknown type', () => {
      expect(() => createRepositoryFactory({ type: 'unknown' as any })).toThrow();
    });
  });

  describe('testRepositoryFactory', () => {
    it('should provide in-memory implementations', () => {
      expect(testRepositoryFactory.createJournalRepository()).toBeInstanceOf(
        InMemoryJournalRepository
      );
    });
  });
});
