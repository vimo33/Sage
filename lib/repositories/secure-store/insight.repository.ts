/**
 * SecureStore Insight Repository
 *
 * Provides a SecureStore-backed implementation of IInsightRepository for production use.
 * Data is persisted to expo-secure-store for encrypted storage on device.
 */

import * as SecureStore from 'expo-secure-store';
import type {
  IInsightRepository,
  Insight,
  InsightCreateInput,
  InsightUpdateInput,
} from '../types';

/**
 * SecureStore key for saved insights
 */
const SAVED_INSIGHTS_KEY = 'sage.saved_insights.v1';

/**
 * Generate a unique ID for insights
 */
function generateId(): string {
  return `insight_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * SecureStore implementation of the Insight Repository
 */
export class SecureStoreInsightRepository implements IInsightRepository {
  private insights: Map<string, Insight> = new Map();
  private initialized: boolean = false;

  /**
   * Load insights from SecureStore
   */
  private async loadFromStorage(): Promise<void> {
    if (this.initialized) return;

    try {
      const raw = await SecureStore.getItemAsync(SAVED_INSIGHTS_KEY);
      if (raw) {
        const insights = JSON.parse(raw) as Insight[];
        for (const insight of insights) {
          this.insights.set(insight.id, insight);
        }
      }
      this.initialized = true;
    } catch (error) {
      console.error('[InsightRepository] Failed to load from storage:', error);
      this.initialized = true;
    }
  }

  /**
   * Persist insights to SecureStore
   */
  private async persistToStorage(): Promise<void> {
    try {
      const insights = Array.from(this.insights.values());
      await SecureStore.setItemAsync(SAVED_INSIGHTS_KEY, JSON.stringify(insights));
    } catch (error) {
      console.error('[InsightRepository] Failed to persist to storage:', error);
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
   * Create a new insight
   */
  async create(input: InsightCreateInput): Promise<Insight> {
    await this.ensureInitialized();

    const now = Date.now();
    const insight: Insight = {
      id: generateId(),
      ...input,
      tags: input.tags?.map((t) => t.toLowerCase().trim()) ?? [],
      createdAt: now,
      updatedAt: now,
    };
    this.insights.set(insight.id, insight);
    await this.persistToStorage();
    return insight;
  }

  /**
   * Find an insight by ID
   */
  async findById(id: string): Promise<Insight | null> {
    await this.ensureInitialized();
    return this.insights.get(id) ?? null;
  }

  /**
   * Update an existing insight
   */
  async update(id: string, input: InsightUpdateInput): Promise<Insight | null> {
    await this.ensureInitialized();

    const existing = this.insights.get(id);
    if (!existing) {
      return null;
    }

    const updated: Insight = {
      ...existing,
      ...input,
      tags: input.tags?.map((t) => t.toLowerCase().trim()) ?? existing.tags,
      id: existing.id,
      createdAt: existing.createdAt,
      updatedAt: Date.now(),
    };
    this.insights.set(id, updated);
    await this.persistToStorage();
    return updated;
  }

  /**
   * Delete an insight by ID
   */
  async delete(id: string): Promise<boolean> {
    await this.ensureInitialized();

    const deleted = this.insights.delete(id);
    if (deleted) {
      await this.persistToStorage();
    }
    return deleted;
  }

  /**
   * Find all insights
   */
  async findAll(): Promise<Insight[]> {
    await this.ensureInitialized();
    return Array.from(this.insights.values()).sort(
      (a, b) => b.createdAt - a.createdAt
    );
  }

  /**
   * Count total insights
   */
  async count(): Promise<number> {
    await this.ensureInitialized();
    return this.insights.size;
  }

  /**
   * Find insights by a single tag
   */
  async findByTag(tag: string): Promise<Insight[]> {
    await this.ensureInitialized();
    const normalizedTag = tag.toLowerCase().trim();
    return Array.from(this.insights.values())
      .filter((insight) => insight.tags?.includes(normalizedTag))
      .sort((a, b) => b.createdAt - a.createdAt);
  }

  /**
   * Find insights by multiple tags (intersection - must have all tags)
   */
  async findByTags(tags: string[]): Promise<Insight[]> {
    await this.ensureInitialized();
    const normalizedTags = tags.map((t) => t.toLowerCase().trim());
    return Array.from(this.insights.values())
      .filter((insight) =>
        normalizedTags.every((tag) => insight.tags?.includes(tag))
      )
      .sort((a, b) => b.createdAt - a.createdAt);
  }

  /**
   * Get all unique tags across all insights
   */
  async getAllTags(): Promise<string[]> {
    await this.ensureInitialized();
    const tagSet = new Set<string>();
    const insightValues = Array.from(this.insights.values());
    for (const insight of insightValues) {
      if (insight.tags) {
        for (const tag of insight.tags) {
          tagSet.add(tag);
        }
      }
    }
    return Array.from(tagSet).sort();
  }

  /**
   * Search insights by content or notes
   */
  async search(query: string, filterTags?: string[]): Promise<Insight[]> {
    await this.ensureInitialized();
    const lowerQuery = query.toLowerCase();
    const normalizedFilterTags = filterTags?.map((t) => t.toLowerCase().trim());

    return Array.from(this.insights.values())
      .filter((insight) => {
        // Check content match
        const contentMatch =
          insight.verseContent.toLowerCase().includes(lowerQuery) ||
          insight.userNote?.toLowerCase().includes(lowerQuery) ||
          insight.sourceRef.toLowerCase().includes(lowerQuery);

        // Check tag filter
        const tagMatch =
          !normalizedFilterTags ||
          normalizedFilterTags.length === 0 ||
          normalizedFilterTags.some((tag) => insight.tags?.includes(tag));

        return contentMatch && tagMatch;
      })
      .sort((a, b) => b.createdAt - a.createdAt);
  }

  /**
   * Add a tag to an insight
   */
  async addTag(insightId: string, tag: string): Promise<Insight | null> {
    await this.ensureInitialized();

    const insight = this.insights.get(insightId);
    if (!insight) {
      return null;
    }

    const normalizedTag = tag.toLowerCase().trim();
    if (!normalizedTag) {
      return insight;
    }

    const tags = insight.tags ?? [];
    if (!tags.includes(normalizedTag)) {
      tags.push(normalizedTag);
      insight.tags = tags;
      insight.updatedAt = Date.now();
      this.insights.set(insightId, insight);
      await this.persistToStorage();
    }

    return insight;
  }

  /**
   * Remove a tag from an insight
   */
  async removeTag(insightId: string, tag: string): Promise<Insight | null> {
    await this.ensureInitialized();

    const insight = this.insights.get(insightId);
    if (!insight) {
      return null;
    }

    const normalizedTag = tag.toLowerCase().trim();
    const tags = insight.tags ?? [];
    const index = tags.indexOf(normalizedTag);

    if (index > -1) {
      tags.splice(index, 1);
      insight.tags = tags;
      insight.updatedAt = Date.now();
      this.insights.set(insightId, insight);
      await this.persistToStorage();
    }

    return insight;
  }

  /**
   * Check if a verse is already saved
   */
  async isVerseSaved(verseContent: string, sourceRef: string): Promise<boolean> {
    await this.ensureInitialized();
    const insightValues = Array.from(this.insights.values());
    for (const insight of insightValues) {
      if (
        insight.verseContent === verseContent &&
        insight.sourceRef === sourceRef
      ) {
        return true;
      }
    }
    return false;
  }

  /**
   * Find insight by source reference
   */
  async findBySourceRef(sourceRef: string): Promise<Insight | null> {
    await this.ensureInitialized();
    const insightValues = Array.from(this.insights.values());
    for (const insight of insightValues) {
      if (insight.sourceRef === sourceRef) {
        return insight;
      }
    }
    return null;
  }

  /**
   * Refresh from storage (useful for testing or syncing)
   */
  async refresh(): Promise<void> {
    this.initialized = false;
    this.insights.clear();
    await this.loadFromStorage();
  }

  /**
   * Clear all insights (useful for testing)
   */
  async clear(): Promise<void> {
    this.insights.clear();
    await SecureStore.deleteItemAsync(SAVED_INSIGHTS_KEY);
  }
}
