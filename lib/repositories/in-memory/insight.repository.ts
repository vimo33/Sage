/**
 * In-Memory Insight Repository
 *
 * Provides an in-memory implementation of IInsightRepository for testing purposes.
 * All data is stored in a Map and is not persisted between sessions.
 */

import type {
  IInsightRepository,
  Insight,
  InsightCreateInput,
  InsightUpdateInput,
} from '../types';

/**
 * Generate a unique ID for insights
 */
function generateId(): string {
  return `insight_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * In-memory implementation of the Insight Repository
 */
export class InMemoryInsightRepository implements IInsightRepository {
  private insights: Map<string, Insight> = new Map();

  /**
   * Create a new insight
   */
  async create(input: InsightCreateInput): Promise<Insight> {
    const now = Date.now();
    const insight: Insight = {
      id: generateId(),
      ...input,
      tags: input.tags?.map((t) => t.toLowerCase().trim()) ?? [],
      createdAt: now,
      updatedAt: now,
    };
    this.insights.set(insight.id, insight);
    return insight;
  }

  /**
   * Find an insight by ID
   */
  async findById(id: string): Promise<Insight | null> {
    return this.insights.get(id) ?? null;
  }

  /**
   * Update an existing insight
   */
  async update(id: string, input: InsightUpdateInput): Promise<Insight | null> {
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
    return updated;
  }

  /**
   * Delete an insight by ID
   */
  async delete(id: string): Promise<boolean> {
    return this.insights.delete(id);
  }

  /**
   * Find all insights
   */
  async findAll(): Promise<Insight[]> {
    return Array.from(this.insights.values()).sort(
      (a, b) => b.createdAt - a.createdAt
    );
  }

  /**
   * Count total insights
   */
  async count(): Promise<number> {
    return this.insights.size;
  }

  /**
   * Find insights by a single tag
   */
  async findByTag(tag: string): Promise<Insight[]> {
    const normalizedTag = tag.toLowerCase().trim();
    return Array.from(this.insights.values())
      .filter((insight) => insight.tags?.includes(normalizedTag))
      .sort((a, b) => b.createdAt - a.createdAt);
  }

  /**
   * Find insights by multiple tags (intersection - must have all tags)
   */
  async findByTags(tags: string[]): Promise<Insight[]> {
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
    }

    return insight;
  }

  /**
   * Remove a tag from an insight
   */
  async removeTag(insightId: string, tag: string): Promise<Insight | null> {
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
    }

    return insight;
  }

  /**
   * Check if a verse is already saved
   */
  async isVerseSaved(verseContent: string, sourceRef: string): Promise<boolean> {
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
    const insightValues = Array.from(this.insights.values());
    for (const insight of insightValues) {
      if (insight.sourceRef === sourceRef) {
        return insight;
      }
    }
    return null;
  }

  /**
   * Clear all insights (useful for testing)
   */
  clear(): void {
    this.insights.clear();
  }

  /**
   * Seed with initial data (useful for testing)
   */
  seed(insights: Insight[]): void {
    for (const insight of insights) {
      this.insights.set(insight.id, insight);
    }
  }
}
