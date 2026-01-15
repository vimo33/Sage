/**
 * Offline Sync Queue
 *
 * Manages a queue of pending operations to sync when connectivity is restored.
 * All operations are stored locally and automatically synced when online.
 */

import * as SecureStore from 'expo-secure-store';
import type {
  SyncQueueItem,
  SyncableDataType,
  SyncOperation,
  SyncItemStatus,
} from './types';

// SecureStore key for the sync queue
const SYNC_QUEUE_KEY = 'sage.offline_sync.queue.v1';
const MAX_QUEUE_SIZE = 1000; // Maximum items in queue
const MAX_RETRY_COUNT = 3;

/**
 * Generate a unique ID for queue items
 */
function generateQueueItemId(): string {
  return `sync_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Load the sync queue from secure storage
 */
export async function loadSyncQueue(): Promise<SyncQueueItem[]> {
  try {
    const raw = await SecureStore.getItemAsync(SYNC_QUEUE_KEY);
    if (!raw) return [];
    const queue = JSON.parse(raw) as SyncQueueItem[];
    // Filter out old completed/synced items
    return queue.filter(
      item => item.status !== 'synced' || Date.now() - item.timestamp < 24 * 60 * 60 * 1000
    );
  } catch (error) {
    console.error('[OfflineSync] Failed to load sync queue:', error);
    return [];
  }
}

/**
 * Save the sync queue to secure storage
 */
export async function saveSyncQueue(queue: SyncQueueItem[]): Promise<void> {
  try {
    // Trim queue if too large
    const trimmedQueue = queue.slice(0, MAX_QUEUE_SIZE);
    await SecureStore.setItemAsync(SYNC_QUEUE_KEY, JSON.stringify(trimmedQueue));
  } catch (error) {
    console.error('[OfflineSync] Failed to save sync queue:', error);
  }
}

/**
 * Add an item to the sync queue
 */
export async function addToSyncQueue(
  dataType: SyncableDataType,
  operation: SyncOperation,
  dataId: string,
  data: unknown,
  localVersion: number = 1
): Promise<SyncQueueItem> {
  const queue = await loadSyncQueue();

  // Check if there's already a pending operation for this data item
  const existingIndex = queue.findIndex(
    item => item.dataId === dataId && item.dataType === dataType && item.status === 'pending'
  );

  const newItem: SyncQueueItem = {
    id: generateQueueItemId(),
    dataType,
    operation,
    dataId,
    data,
    timestamp: Date.now(),
    status: 'pending',
    retryCount: 0,
    localVersion,
  };

  if (existingIndex >= 0) {
    // Merge operations: update replaces create, delete replaces both
    const existing = queue[existingIndex];
    if (operation === 'delete') {
      // Delete operation takes precedence
      if (existing.operation === 'create') {
        // If we created and then deleted locally, just remove from queue
        queue.splice(existingIndex, 1);
        await saveSyncQueue(queue);
        return newItem; // Return the new item but don't add it
      }
      // Replace existing with delete
      queue[existingIndex] = newItem;
    } else if (operation === 'update') {
      // Update operation - merge data
      queue[existingIndex] = {
        ...existing,
        data,
        timestamp: Date.now(),
        localVersion,
      };
    }
    // Create operation won't happen if existing
  } else {
    // Add new item to queue
    queue.unshift(newItem);
  }

  await saveSyncQueue(queue);
  return existingIndex >= 0 ? queue[existingIndex] : newItem;
}

/**
 * Update the status of a queue item
 */
export async function updateQueueItemStatus(
  itemId: string,
  status: SyncItemStatus,
  error?: string
): Promise<void> {
  const queue = await loadSyncQueue();
  const index = queue.findIndex(item => item.id === itemId);

  if (index >= 0) {
    queue[index] = {
      ...queue[index],
      status,
      lastError: error,
      retryCount: status === 'failed' ? queue[index].retryCount + 1 : queue[index].retryCount,
    };
    await saveSyncQueue(queue);
  }
}

/**
 * Get all pending items from the queue
 */
export async function getPendingItems(): Promise<SyncQueueItem[]> {
  const queue = await loadSyncQueue();
  return queue.filter(item => item.status === 'pending' || item.status === 'failed');
}

/**
 * Get items that can be retried
 */
export async function getRetryableItems(): Promise<SyncQueueItem[]> {
  const queue = await loadSyncQueue();
  return queue.filter(
    item => item.status === 'failed' && item.retryCount < MAX_RETRY_COUNT
  );
}

/**
 * Remove an item from the queue
 */
export async function removeFromQueue(itemId: string): Promise<void> {
  const queue = await loadSyncQueue();
  const filtered = queue.filter(item => item.id !== itemId);
  await saveSyncQueue(filtered);
}

/**
 * Clear all synced items from the queue
 */
export async function clearSyncedItems(): Promise<void> {
  const queue = await loadSyncQueue();
  const pending = queue.filter(item => item.status !== 'synced');
  await saveSyncQueue(pending);
}

/**
 * Clear the entire sync queue
 */
export async function clearSyncQueue(): Promise<void> {
  await SecureStore.deleteItemAsync(SYNC_QUEUE_KEY);
}

/**
 * Get queue statistics
 */
export async function getQueueStats(): Promise<{
  total: number;
  pending: number;
  syncing: number;
  synced: number;
  failed: number;
  conflict: number;
}> {
  const queue = await loadSyncQueue();
  return {
    total: queue.length,
    pending: queue.filter(item => item.status === 'pending').length,
    syncing: queue.filter(item => item.status === 'syncing').length,
    synced: queue.filter(item => item.status === 'synced').length,
    failed: queue.filter(item => item.status === 'failed').length,
    conflict: queue.filter(item => item.status === 'conflict').length,
  };
}

/**
 * Mark an item as syncing
 */
export async function markItemSyncing(itemId: string): Promise<void> {
  await updateQueueItemStatus(itemId, 'syncing');
}

/**
 * Mark an item as synced
 */
export async function markItemSynced(itemId: string, serverVersion?: number): Promise<void> {
  const queue = await loadSyncQueue();
  const index = queue.findIndex(item => item.id === itemId);

  if (index >= 0) {
    queue[index] = {
      ...queue[index],
      status: 'synced',
      serverVersion,
    };
    await saveSyncQueue(queue);
  }
}

/**
 * Mark an item as having a conflict
 */
export async function markItemConflict(itemId: string, serverVersion: number): Promise<void> {
  const queue = await loadSyncQueue();
  const index = queue.findIndex(item => item.id === itemId);

  if (index >= 0) {
    queue[index] = {
      ...queue[index],
      status: 'conflict',
      serverVersion,
    };
    await saveSyncQueue(queue);
  }
}
