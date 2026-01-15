/**
 * Offline Sync Module
 *
 * Provides offline-first functionality with automatic sync when network is restored.
 * Includes conflict resolution for journal entries, insights, and conversations.
 */

// Types
export type {
  SyncableDataType,
  SyncOperation,
  SyncItemStatus,
  SyncQueueItem,
  ConflictResolutionStrategy,
  SyncConflict,
  OverallSyncStatus,
  SyncState,
  SyncPreferences,
  SyncResult,
  SyncEvent,
  SyncableItem,
} from './types';

export {
  DEFAULT_SYNC_PREFERENCES,
  DEFAULT_SYNC_STATE,
} from './types';

// Queue management
export {
  loadSyncQueue,
  saveSyncQueue,
  addToSyncQueue,
  updateQueueItemStatus,
  getPendingItems,
  getRetryableItems,
  removeFromQueue,
  clearSyncedItems,
  clearSyncQueue,
  getQueueStats,
  markItemSyncing,
  markItemSynced,
  markItemConflict,
} from './queue';

// Conflict resolution
export {
  createConflict,
  detectConflict,
  resolveConflict,
  areItemsIdentical,
  getItemVersion,
  incrementVersion,
} from './conflict-resolver';

// Sync service
export {
  initOfflineSync,
  cleanupOfflineSync,
  performSync,
  forceSyncNow,
  loadSyncState,
  saveSyncState,
  loadSyncPreferences,
  saveSyncPreferences,
  loadConflicts,
  saveConflicts,
  addConflict,
  removeConflict,
  getSyncState,
  subscribeSyncState,
  isSyncEnabled,
  setSyncEnabled,
  getPendingCount,
  hasPendingChanges,
} from './service';

// Hook
export { useSyncState } from './useSyncState';
export type { UseSyncStateResult } from './useSyncState';
