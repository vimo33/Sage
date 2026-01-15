/**
 * Offline Sync Types
 *
 * Type definitions for the offline-first sync system.
 * Supports automatic synchronization when reconnected with conflict resolution.
 */

/**
 * Types of data that can be synced
 */
export type SyncableDataType = 'journal_entry' | 'saved_insight' | 'conversation';

/**
 * Sync operation types
 */
export type SyncOperation = 'create' | 'update' | 'delete';

/**
 * Status of a sync item in the queue
 */
export type SyncItemStatus = 'pending' | 'syncing' | 'synced' | 'failed' | 'conflict';

/**
 * A single item in the sync queue
 */
export interface SyncQueueItem {
  id: string;
  dataType: SyncableDataType;
  operation: SyncOperation;
  dataId: string; // ID of the actual data item
  data: unknown; // The actual data to sync
  timestamp: number; // When the operation was performed
  status: SyncItemStatus;
  retryCount: number;
  lastError?: string;
  localVersion: number; // Version number for conflict detection
  serverVersion?: number; // Server version if known
}

/**
 * Conflict resolution strategies
 */
export type ConflictResolutionStrategy =
  | 'local_wins' // Local changes always win
  | 'server_wins' // Server changes always win
  | 'latest_wins' // Most recent timestamp wins
  | 'merge' // Attempt to merge changes
  | 'manual'; // Require user intervention

/**
 * A detected conflict between local and remote data
 */
export interface SyncConflict {
  id: string;
  dataType: SyncableDataType;
  dataId: string;
  localData: unknown;
  serverData: unknown;
  localTimestamp: number;
  serverTimestamp: number;
  resolvedAt?: number;
  resolution?: ConflictResolutionStrategy;
  resolvedData?: unknown;
}

/**
 * Sync status for the overall sync system
 */
export type OverallSyncStatus =
  | 'idle' // No sync in progress
  | 'syncing' // Currently syncing
  | 'offline' // Device is offline
  | 'error' // Sync failed
  | 'up_to_date'; // All synced

/**
 * Sync state stored in the app
 */
export interface SyncState {
  status: OverallSyncStatus;
  lastSyncAt: number | null;
  lastSuccessfulSyncAt: number | null;
  pendingCount: number;
  failedCount: number;
  conflictCount: number;
  isEnabled: boolean;
  autoSyncEnabled: boolean;
  syncOnlyOnWifi: boolean;
}

/**
 * Sync preferences
 */
export interface SyncPreferences {
  enabled: boolean;
  autoSync: boolean;
  syncOnlyOnWifi: boolean;
  conflictResolution: ConflictResolutionStrategy;
  syncJournalEntries: boolean;
  syncInsights: boolean;
  syncConversations: boolean;
}

/**
 * Result of a sync operation
 */
export interface SyncResult {
  success: boolean;
  syncedCount: number;
  failedCount: number;
  conflicts: SyncConflict[];
  errors: string[];
  timestamp: number;
}

/**
 * Event emitted during sync
 */
export interface SyncEvent {
  type: 'sync_started' | 'sync_progress' | 'sync_completed' | 'sync_failed' | 'conflict_detected';
  timestamp: number;
  data?: {
    progress?: number;
    total?: number;
    itemId?: string;
    error?: string;
    conflict?: SyncConflict;
  };
}

/**
 * Syncable data item interface - all syncable items must implement this
 */
export interface SyncableItem {
  id: string;
  createdAt: number;
  updatedAt?: number;
  syncVersion?: number;
  lastSyncedAt?: number;
  isDeleted?: boolean;
}

/**
 * Default sync preferences
 */
export const DEFAULT_SYNC_PREFERENCES: SyncPreferences = {
  enabled: true,
  autoSync: true,
  syncOnlyOnWifi: false,
  conflictResolution: 'latest_wins',
  syncJournalEntries: true,
  syncInsights: true,
  syncConversations: true,
};

/**
 * Default sync state
 */
export const DEFAULT_SYNC_STATE: SyncState = {
  status: 'idle',
  lastSyncAt: null,
  lastSuccessfulSyncAt: null,
  pendingCount: 0,
  failedCount: 0,
  conflictCount: 0,
  isEnabled: true,
  autoSyncEnabled: true,
  syncOnlyOnWifi: false,
};
