/**
 * SecureStore Journal Repository
 *
 * Provides a SecureStore-backed implementation of IJournalRepository for production use.
 * Data is persisted to expo-secure-store for encrypted storage on device.
 */

import * as SecureStore from 'expo-secure-store';
import type {
  IJournalRepository,
  Journal,
  JournalCreateInput,
  JournalUpdateInput,
} from '../types';

/**
 * SecureStore key for journal entries
 */
const JOURNAL_ENTRIES_KEY = 'sage.journal_entries.v1';

/**
 * Generate a unique ID for journal entries
 */
function generateId(): string {
  return `journal_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * SecureStore implementation of the Journal Repository
 */
export class SecureStoreJournalRepository implements IJournalRepository {
  private entries: Map<string, Journal> = new Map();
  private initialized: boolean = false;

  /**
   * Load entries from SecureStore
   */
  private async loadFromStorage(): Promise<void> {
    if (this.initialized) return;

    try {
      const raw = await SecureStore.getItemAsync(JOURNAL_ENTRIES_KEY);
      if (raw) {
        const entries = JSON.parse(raw) as Journal[];
        for (const entry of entries) {
          this.entries.set(entry.id, entry);
        }
      }
      this.initialized = true;
    } catch (error) {
      console.error('[JournalRepository] Failed to load from storage:', error);
      this.initialized = true;
    }
  }

  /**
   * Persist entries to SecureStore
   */
  private async persistToStorage(): Promise<void> {
    try {
      const entries = Array.from(this.entries.values());
      await SecureStore.setItemAsync(JOURNAL_ENTRIES_KEY, JSON.stringify(entries));
    } catch (error) {
      console.error('[JournalRepository] Failed to persist to storage:', error);
    }
  }

  /**
   * Ensure storage is initialized
   */
  private async ensureInitialized(): Promise<void> {
    if (!this.initialized) {
      await this.loadFromStorage();
    }
  }

  /**
   * Create a new journal entry
   */
  async create(input: JournalCreateInput): Promise<Journal> {
    await this.ensureInitialized();

    const now = Date.now();
    const journal: Journal = {
      id: generateId(),
      ...input,
      createdAt: now,
      updatedAt: now,
      linkedInsightIds: input.linkedInsightIds ?? [],
    };
    this.entries.set(journal.id, journal);
    await this.persistToStorage();
    return journal;
  }

  /**
   * Find a journal entry by ID
   */
  async findById(id: string): Promise<Journal | null> {
    await this.ensureInitialized();
    return this.entries.get(id) ?? null;
  }

  /**
   * Update an existing journal entry
   */
  async update(id: string, input: JournalUpdateInput): Promise<Journal | null> {
    await this.ensureInitialized();

    const existing = this.entries.get(id);
    if (!existing) {
      return null;
    }

    const updated: Journal = {
      ...existing,
      ...input,
      id: existing.id,
      createdAt: existing.createdAt,
      updatedAt: Date.now(),
    };
    this.entries.set(id, updated);
    await this.persistToStorage();
    return updated;
  }

  /**
   * Delete a journal entry by ID
   */
  async delete(id: string): Promise<boolean> {
    await this.ensureInitialized();

    const deleted = this.entries.delete(id);
    if (deleted) {
      await this.persistToStorage();
    }
    return deleted;
  }

  /**
   * Find all journal entries
   */
  async findAll(): Promise<Journal[]> {
    await this.ensureInitialized();
    return Array.from(this.entries.values()).sort(
      (a, b) => b.createdAt - a.createdAt
    );
  }

  /**
   * Count total journal entries
   */
  async count(): Promise<number> {
    await this.ensureInitialized();
    return this.entries.size;
  }

  /**
   * Find journals by date range
   */
  async findByDateRange(startDate: number, endDate: number): Promise<Journal[]> {
    await this.ensureInitialized();
    return Array.from(this.entries.values())
      .filter((entry) => entry.createdAt >= startDate && entry.createdAt <= endDate)
      .sort((a, b) => b.createdAt - a.createdAt);
  }

  /**
   * Find journals by tags
   */
  async findByTags(tags: string[]): Promise<Journal[]> {
    await this.ensureInitialized();
    const normalizedTags = tags.map((t) => t.toLowerCase().trim());
    return Array.from(this.entries.values())
      .filter((entry) =>
        entry.tags?.some((tag) => normalizedTags.includes(tag.toLowerCase()))
      )
      .sort((a, b) => b.createdAt - a.createdAt);
  }

  /**
   * Search journals by content
   */
  async search(query: string): Promise<Journal[]> {
    await this.ensureInitialized();
    const lowerQuery = query.toLowerCase();
    return Array.from(this.entries.values())
      .filter(
        (entry) =>
          entry.content.toLowerCase().includes(lowerQuery) ||
          entry.title?.toLowerCase().includes(lowerQuery)
      )
      .sort((a, b) => b.createdAt - a.createdAt);
  }

  /**
   * Find journals by mood
   */
  async findByMood(mood: string): Promise<Journal[]> {
    await this.ensureInitialized();
    const lowerMood = mood.toLowerCase();
    return Array.from(this.entries.values())
      .filter((entry) => entry.mood?.toLowerCase() === lowerMood)
      .sort((a, b) => b.createdAt - a.createdAt);
  }

  /**
   * Link an insight to a journal entry
   */
  async linkInsight(journalId: string, insightId: string): Promise<Journal | null> {
    await this.ensureInitialized();

    const entry = this.entries.get(journalId);
    if (!entry) {
      return null;
    }

    if (!entry.linkedInsightIds.includes(insightId)) {
      entry.linkedInsightIds.push(insightId);
      entry.updatedAt = Date.now();
      this.entries.set(journalId, entry);
      await this.persistToStorage();
    }

    return entry;
  }

  /**
   * Unlink an insight from a journal entry
   */
  async unlinkInsight(journalId: string, insightId: string): Promise<Journal | null> {
    await this.ensureInitialized();

    const entry = this.entries.get(journalId);
    if (!entry) {
      return null;
    }

    const index = entry.linkedInsightIds.indexOf(insightId);
    if (index > -1) {
      entry.linkedInsightIds.splice(index, 1);
      entry.updatedAt = Date.now();
      this.entries.set(journalId, entry);
      await this.persistToStorage();
    }

    return entry;
  }

  /**
   * Find journals linked to a specific insight
   */
  async findByLinkedInsight(insightId: string): Promise<Journal[]> {
    await this.ensureInitialized();
    return Array.from(this.entries.values())
      .filter((entry) => entry.linkedInsightIds.includes(insightId))
      .sort((a, b) => b.createdAt - a.createdAt);
  }

  /**
   * Bulk import journal entries
   */
  async bulkCreate(
    entries: Array<{ content: string; mood?: string; createdAt: number }>
  ): Promise<Journal[]> {
    await this.ensureInitialized();

    const created: Journal[] = [];

    for (const entry of entries) {
      const journal: Journal = {
        id: `journal_${entry.createdAt}_${Math.random().toString(36).slice(2, 9)}`,
        content: entry.content,
        mood: entry.mood,
        createdAt: entry.createdAt,
        updatedAt: entry.createdAt,
        linkedInsightIds: [],
      };
      this.entries.set(journal.id, journal);
      created.push(journal);
    }

    await this.persistToStorage();
    return created.sort((a, b) => b.createdAt - a.createdAt);
  }

  /**
   * Refresh from storage (useful for testing or syncing)
   */
  async refresh(): Promise<void> {
    this.initialized = false;
    this.entries.clear();
    await this.loadFromStorage();
  }

  /**
   * Clear all entries (useful for testing)
   */
  async clear(): Promise<void> {
    this.entries.clear();
    await SecureStore.deleteItemAsync(JOURNAL_ENTRIES_KEY);
  }
}
