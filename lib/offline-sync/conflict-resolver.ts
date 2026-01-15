/**
 * Conflict Resolution
 *
 * Handles conflicts between local and server data during sync.
 * Supports multiple resolution strategies based on user preferences.
 */

import type {
  SyncConflict,
  ConflictResolutionStrategy,
  SyncableDataType,
  SyncableItem,
} from './types';
import type { JournalEntry, SavedInsight } from '../storage/store';

/**
 * Generate a conflict ID
 */
function generateConflictId(): string {
  return `conflict_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Create a sync conflict record
 */
export function createConflict(
  dataType: SyncableDataType,
  dataId: string,
  localData: unknown,
  serverData: unknown,
  localTimestamp: number,
  serverTimestamp: number
): SyncConflict {
  return {
    id: generateConflictId(),
    dataType,
    dataId,
    localData,
    serverData,
    localTimestamp,
    serverTimestamp,
  };
}

/**
 * Detect if there's a conflict between local and server versions
 */
export function detectConflict(
  localData: SyncableItem,
  serverData: SyncableItem
): boolean {
  // If both have been modified since last sync
  const localModified = localData.updatedAt ?? localData.createdAt;
  const serverModified = serverData.updatedAt ?? serverData.createdAt;
  const lastSync = localData.lastSyncedAt ?? 0;

  return localModified > lastSync && serverModified > lastSync;
}

/**
 * Resolve a conflict using the specified strategy
 */
export function resolveConflict<T extends SyncableItem>(
  conflict: SyncConflict,
  strategy: ConflictResolutionStrategy
): { resolved: boolean; data: T | null; resolution: ConflictResolutionStrategy } {
  const { localData, serverData, localTimestamp, serverTimestamp } = conflict;

  switch (strategy) {
    case 'local_wins':
      return {
        resolved: true,
        data: localData as T,
        resolution: 'local_wins',
      };

    case 'server_wins':
      return {
        resolved: true,
        data: serverData as T,
        resolution: 'server_wins',
      };

    case 'latest_wins':
      if (localTimestamp >= serverTimestamp) {
        return {
          resolved: true,
          data: localData as T,
          resolution: 'latest_wins',
        };
      }
      return {
        resolved: true,
        data: serverData as T,
        resolution: 'latest_wins',
      };

    case 'merge':
      const merged = mergeData(conflict.dataType, localData, serverData);
      if (merged) {
        return {
          resolved: true,
          data: merged as T,
          resolution: 'merge',
        };
      }
      // Fall back to latest_wins if merge fails
      return resolveConflict(conflict, 'latest_wins');

    case 'manual':
    default:
      // Requires user intervention
      return {
        resolved: false,
        data: null,
        resolution: 'manual',
      };
  }
}

/**
 * Attempt to merge two versions of data
 */
function mergeData(
  dataType: SyncableDataType,
  localData: unknown,
  serverData: unknown
): unknown | null {
  switch (dataType) {
    case 'journal_entry':
      return mergeJournalEntry(localData as JournalEntry, serverData as JournalEntry);

    case 'saved_insight':
      return mergeInsight(localData as SavedInsight, serverData as SavedInsight);

    case 'conversation':
      // Conversations are harder to merge - use latest_wins
      return null;

    default:
      return null;
  }
}

/**
 * Merge two journal entries
 * Strategy: Keep longest content, merge tags, use most recent mood
 */
function mergeJournalEntry(
  local: JournalEntry,
  server: JournalEntry
): JournalEntry {
  // Determine which has longer content (likely more complete)
  const useLocalContent = (local.content?.length ?? 0) >= (server.content?.length ?? 0);

  // Merge tags (union of both)
  const tagSet = new Set([...(local.tags ?? []), ...(server.tags ?? [])]);
  const mergedTags = Array.from(tagSet);

  // Use most recent entry for mood and title
  const localTime = local.createdAt;
  const serverTime = server.createdAt;
  const useLocalMetadata = localTime >= serverTime;

  // Merge linked insight IDs
  const insightIdSet = new Set([...(local.linkedInsightIds ?? []), ...(server.linkedInsightIds ?? [])]);
  const mergedInsightIds = Array.from(insightIdSet);

  return {
    id: local.id,
    title: useLocalMetadata ? local.title : server.title,
    content: useLocalContent ? local.content : server.content,
    mood: useLocalMetadata ? local.mood : server.mood,
    tags: mergedTags.length > 0 ? mergedTags : undefined,
    createdAt: Math.min(local.createdAt, server.createdAt),
    linkedInsightIds: mergedInsightIds,
  };
}

/**
 * Merge two saved insights
 * Strategy: Merge tags and notes
 */
function mergeInsight(
  local: SavedInsight,
  server: SavedInsight
): SavedInsight {
  // Merge tags
  const tagSet = new Set([...(local.tags ?? []), ...(server.tags ?? [])]);
  const mergedTags = Array.from(tagSet);

  // For user notes, append if different
  let mergedNote = local.userNote;
  if (server.userNote && server.userNote !== local.userNote) {
    if (local.userNote) {
      mergedNote = `${local.userNote}\n\n---\n\n${server.userNote}`;
    } else {
      mergedNote = server.userNote;
    }
  }

  return {
    id: local.id,
    verseContent: local.verseContent, // Should be same
    sourceRef: local.sourceRef, // Should be same
    userNote: mergedNote,
    tags: mergedTags.length > 0 ? mergedTags : undefined,
    createdAt: Math.min(local.createdAt, server.createdAt),
  };
}

/**
 * Check if two items are identical (no sync needed)
 */
export function areItemsIdentical(itemA: unknown, itemB: unknown): boolean {
  return JSON.stringify(itemA) === JSON.stringify(itemB);
}

/**
 * Get the version number from a syncable item
 */
export function getItemVersion(item: SyncableItem): number {
  return item.syncVersion ?? 1;
}

/**
 * Update the sync version of an item
 */
export function incrementVersion<T extends SyncableItem>(item: T): T {
  return {
    ...item,
    syncVersion: (item.syncVersion ?? 0) + 1,
    updatedAt: Date.now(),
  };
}
