/**
 * In-Memory Journal Repository
 *
 * Provides an in-memory implementation of IJournalRepository for testing purposes.
 * All data is stored in a Map and is not persisted between sessions.
 */

import type {
  IJournalRepository,
  Journal,
  JournalCreateInput,
  JournalUpdateInput,
} from '../types';

/**
 * Generate a unique ID for journal entries
 */
function generateId(): string {
  return `journal_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * In-memory implementation of the Journal Repository
 */
export class InMemoryJournalRepository implements IJournalRepository {
  private entries: Map<string, Journal> = new Map();

  /**
   * Create a new journal entry
   */
  async create(input: JournalCreateInput): Promise<Journal> {
    const now = Date.now();
    const journal: Journal = {
      id: generateId(),
      ...input,
      createdAt: now,
      updatedAt: now,
      linkedInsightIds: input.linkedInsightIds ?? [],
    };
    this.entries.set(journal.id, journal);
    return journal;
  }

  /**
   * Find a journal entry by ID
   */
  async findById(id: string): Promise<Journal | null> {
    return this.entries.get(id) ?? null;
  }

  /**
   * Update an existing journal entry
   */
  async update(id: string, input: JournalUpdateInput): Promise<Journal | null> {
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
    return updated;
  }

  /**
   * Delete a journal entry by ID
   */
  async delete(id: string): Promise<boolean> {
    return this.entries.delete(id);
  }

  /**
   * Find all journal entries
   */
  async findAll(): Promise<Journal[]> {
    return Array.from(this.entries.values()).sort(
      (a, b) => b.createdAt - a.createdAt
    );
  }

  /**
   * Count total journal entries
   */
  async count(): Promise<number> {
    return this.entries.size;
  }

  /**
   * Find journals by date range
   */
  async findByDateRange(startDate: number, endDate: number): Promise<Journal[]> {
    return Array.from(this.entries.values())
      .filter((entry) => entry.createdAt >= startDate && entry.createdAt <= endDate)
      .sort((a, b) => b.createdAt - a.createdAt);
  }

  /**
   * Find journals by tags
   */
  async findByTags(tags: string[]): Promise<Journal[]> {
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
    const lowerMood = mood.toLowerCase();
    return Array.from(this.entries.values())
      .filter((entry) => entry.mood?.toLowerCase() === lowerMood)
      .sort((a, b) => b.createdAt - a.createdAt);
  }

  /**
   * Link an insight to a journal entry
   */
  async linkInsight(journalId: string, insightId: string): Promise<Journal | null> {
    const entry = this.entries.get(journalId);
    if (!entry) {
      return null;
    }

    if (!entry.linkedInsightIds.includes(insightId)) {
      entry.linkedInsightIds.push(insightId);
      entry.updatedAt = Date.now();
      this.entries.set(journalId, entry);
    }

    return entry;
  }

  /**
   * Unlink an insight from a journal entry
   */
  async unlinkInsight(journalId: string, insightId: string): Promise<Journal | null> {
    const entry = this.entries.get(journalId);
    if (!entry) {
      return null;
    }

    const index = entry.linkedInsightIds.indexOf(insightId);
    if (index > -1) {
      entry.linkedInsightIds.splice(index, 1);
      entry.updatedAt = Date.now();
      this.entries.set(journalId, entry);
    }

    return entry;
  }

  /**
   * Find journals linked to a specific insight
   */
  async findByLinkedInsight(insightId: string): Promise<Journal[]> {
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

    return created.sort((a, b) => b.createdAt - a.createdAt);
  }

  /**
   * Clear all entries (useful for testing)
   */
  clear(): void {
    this.entries.clear();
  }

  /**
   * Seed with initial data (useful for testing)
   */
  seed(journals: Journal[]): void {
    for (const journal of journals) {
      this.entries.set(journal.id, journal);
    }
  }
}
