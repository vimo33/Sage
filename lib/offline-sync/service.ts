/**
 * Offline Sync Service
 *
 * Manages automatic synchronization of local data when network connectivity is restored.
 * Features:
 * - Automatic sync on network reconnection
 * - Background sync queue
 * - Conflict resolution
 * - Retry logic for failed syncs
 */

import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import * as SecureStore from 'expo-secure-store';
import type {
  SyncState,
  SyncPreferences,
  SyncResult,
  SyncQueueItem,
  SyncConflict,
  OverallSyncStatus,
} from './types';
import { DEFAULT_SYNC_STATE, DEFAULT_SYNC_PREFERENCES } from './types';
import {
  loadSyncQueue,
  saveSyncQueue,
  getPendingItems,
  markItemSyncing,
  markItemSynced,
  markItemConflict,
  updateQueueItemStatus,
  getQueueStats,
} from './queue';
import { resolveConflict } from './conflict-resolver';

// SecureStore keys
const SYNC_STATE_KEY = 'sage.offline_sync.state.v1';
const SYNC_PREFS_KEY = 'sage.offline_sync.prefs.v1';
const CONFLICTS_KEY = 'sage.offline_sync.conflicts.v1';

// Sync configuration
const SYNC_DEBOUNCE_MS = 3000; // Wait 3s after connectivity before syncing
const MAX_BATCH_SIZE = 50; // Max items per sync batch
const SYNC_TIMEOUT_MS = 30000; // 30s timeout for sync operations

// Singleton state
let syncInProgress = false;
let syncTimeout: ReturnType<typeof setTimeout> | null = null;
let networkUnsubscribe: (() => void) | null = null;
let syncListeners: Array<(state: SyncState) => void> = [];
let currentSyncState: SyncState = DEFAULT_SYNC_STATE;

/**
 * Load sync state from storage
 */
export async function loadSyncState(): Promise<SyncState> {
  try {
    const raw = await SecureStore.getItemAsync(SYNC_STATE_KEY);
    if (!raw) return DEFAULT_SYNC_STATE;
    return { ...DEFAULT_SYNC_STATE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SYNC_STATE;
  }
}

/**
 * Save sync state to storage
 */
export async function saveSyncState(state: SyncState): Promise<void> {
  try {
    currentSyncState = state;
    await SecureStore.setItemAsync(SYNC_STATE_KEY, JSON.stringify(state));
    // Notify listeners
    syncListeners.forEach(listener => listener(state));
  } catch (error) {
    console.error('[OfflineSync] Failed to save sync state:', error);
  }
}

/**
 * Load sync preferences
 */
export async function loadSyncPreferences(): Promise<SyncPreferences> {
  try {
    const raw = await SecureStore.getItemAsync(SYNC_PREFS_KEY);
    if (!raw) return DEFAULT_SYNC_PREFERENCES;
    return { ...DEFAULT_SYNC_PREFERENCES, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SYNC_PREFERENCES;
  }
}

/**
 * Save sync preferences
 */
export async function saveSyncPreferences(prefs: SyncPreferences): Promise<void> {
  try {
    await SecureStore.setItemAsync(SYNC_PREFS_KEY, JSON.stringify(prefs));
  } catch (error) {
    console.error('[OfflineSync] Failed to save sync preferences:', error);
  }
}

/**
 * Load unresolved conflicts
 */
export async function loadConflicts(): Promise<SyncConflict[]> {
  try {
    const raw = await SecureStore.getItemAsync(CONFLICTS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

/**
 * Save conflicts
 */
export async function saveConflicts(conflicts: SyncConflict[]): Promise<void> {
  try {
    await SecureStore.setItemAsync(CONFLICTS_KEY, JSON.stringify(conflicts));
  } catch (error) {
    console.error('[OfflineSync] Failed to save conflicts:', error);
  }
}

/**
 * Add a conflict
 */
export async function addConflict(conflict: SyncConflict): Promise<void> {
  const conflicts = await loadConflicts();
  conflicts.push(conflict);
  await saveConflicts(conflicts);
}

/**
 * Resolve and remove a conflict
 */
export async function removeConflict(conflictId: string): Promise<void> {
  const conflicts = await loadConflicts();
  const filtered = conflicts.filter(c => c.id !== conflictId);
  await saveConflicts(filtered);
}

/**
 * Get current sync state
 */
export function getSyncState(): SyncState {
  return currentSyncState;
}

/**
 * Subscribe to sync state changes
 */
export function subscribeSyncState(listener: (state: SyncState) => void): () => void {
  syncListeners.push(listener);
  return () => {
    syncListeners = syncListeners.filter(l => l !== listener);
  };
}

/**
 * Update sync status
 */
async function updateSyncStatus(status: OverallSyncStatus): Promise<void> {
  const state = await loadSyncState();
  const stats = await getQueueStats();

  await saveSyncState({
    ...state,
    status,
    pendingCount: stats.pending + stats.syncing,
    failedCount: stats.failed,
    conflictCount: stats.conflict,
  });
}

/**
 * Process a single sync item
 * Note: This is a placeholder for actual server sync.
 * Since the app is fully offline, we simulate successful sync.
 */
async function processSyncItem(item: SyncQueueItem): Promise<{
  success: boolean;
  conflict?: SyncConflict;
  error?: string;
}> {
  await markItemSyncing(item.id);

  try {
    // Simulate network delay (for demo purposes)
    await new Promise(resolve => setTimeout(resolve, 100));

    // In a real implementation, this would:
    // 1. Send the item to the server
    // 2. Check for version conflicts
    // 3. Handle server response

    // For now, we mark all items as synced successfully
    // This enables the offline-first architecture to work locally
    await markItemSynced(item.id, item.localVersion);

    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await updateQueueItemStatus(item.id, 'failed', errorMessage);
    return { success: false, error: errorMessage };
  }
}

/**
 * Perform sync of all pending items
 */
export async function performSync(): Promise<SyncResult> {
  if (syncInProgress) {
    return {
      success: false,
      syncedCount: 0,
      failedCount: 0,
      conflicts: [],
      errors: ['Sync already in progress'],
      timestamp: Date.now(),
    };
  }

  const prefs = await loadSyncPreferences();
  if (!prefs.enabled) {
    return {
      success: false,
      syncedCount: 0,
      failedCount: 0,
      conflicts: [],
      errors: ['Sync is disabled'],
      timestamp: Date.now(),
    };
  }

  // Check network connectivity
  const netInfo = await NetInfo.fetch();
  if (!netInfo.isConnected) {
    await updateSyncStatus('offline');
    return {
      success: false,
      syncedCount: 0,
      failedCount: 0,
      conflicts: [],
      errors: ['No network connection'],
      timestamp: Date.now(),
    };
  }

  // Check WiFi-only preference
  if (prefs.syncOnlyOnWifi && netInfo.type !== 'wifi') {
    return {
      success: false,
      syncedCount: 0,
      failedCount: 0,
      conflicts: [],
      errors: ['Waiting for WiFi connection'],
      timestamp: Date.now(),
    };
  }

  syncInProgress = true;
  await updateSyncStatus('syncing');

  const result: SyncResult = {
    success: true,
    syncedCount: 0,
    failedCount: 0,
    conflicts: [],
    errors: [],
    timestamp: Date.now(),
  };

  try {
    const pendingItems = await getPendingItems();
    const batch = pendingItems.slice(0, MAX_BATCH_SIZE);

    console.log(`[OfflineSync] Starting sync of ${batch.length} items`);

    for (const item of batch) {
      const itemResult = await processSyncItem(item);

      if (itemResult.success) {
        result.syncedCount++;
      } else {
        result.failedCount++;
        if (itemResult.error) {
          result.errors.push(itemResult.error);
        }
        if (itemResult.conflict) {
          result.conflicts.push(itemResult.conflict);
          await addConflict(itemResult.conflict);
        }
      }
    }

    // Update state
    const state = await loadSyncState();
    await saveSyncState({
      ...state,
      lastSyncAt: Date.now(),
      lastSuccessfulSyncAt: result.success ? Date.now() : state.lastSuccessfulSyncAt,
      status: result.failedCount === 0 ? 'up_to_date' : 'error',
      pendingCount: pendingItems.length - batch.length + result.failedCount,
      failedCount: result.failedCount,
      conflictCount: result.conflicts.length,
    });

    console.log(`[OfflineSync] Sync completed: ${result.syncedCount} synced, ${result.failedCount} failed`);

    result.success = result.failedCount === 0;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown sync error';
    result.success = false;
    result.errors.push(errorMessage);
    await updateSyncStatus('error');
    console.error('[OfflineSync] Sync failed:', error);
  } finally {
    syncInProgress = false;
  }

  return result;
}

/**
 * Schedule a sync after debounce period
 */
function scheduleSyncDebounced(): void {
  if (syncTimeout) {
    clearTimeout(syncTimeout);
  }

  syncTimeout = setTimeout(async () => {
    await performSync();
  }, SYNC_DEBOUNCE_MS);
}

/**
 * Handle network state changes
 */
async function handleNetworkChange(state: NetInfoState): Promise<void> {
  const prefs = await loadSyncPreferences();

  if (!prefs.enabled || !prefs.autoSync) {
    return;
  }

  if (state.isConnected) {
    // Network is now available - schedule sync
    console.log('[OfflineSync] Network connected, scheduling sync...');
    const syncState = await loadSyncState();
    if (syncState.pendingCount > 0) {
      scheduleSyncDebounced();
    }
    await updateSyncStatus('idle');
  } else {
    // Network lost
    console.log('[OfflineSync] Network disconnected');
    await updateSyncStatus('offline');
    if (syncTimeout) {
      clearTimeout(syncTimeout);
      syncTimeout = null;
    }
  }
}

/**
 * Initialize the sync service
 */
export async function initOfflineSync(): Promise<void> {
  console.log('[OfflineSync] Initializing offline sync service...');

  // Load initial state
  currentSyncState = await loadSyncState();

  // Update stats
  const stats = await getQueueStats();
  await saveSyncState({
    ...currentSyncState,
    pendingCount: stats.pending + stats.syncing,
    failedCount: stats.failed,
    conflictCount: stats.conflict,
  });

  // Subscribe to network changes
  if (networkUnsubscribe) {
    networkUnsubscribe();
  }
  networkUnsubscribe = NetInfo.addEventListener(handleNetworkChange);

  // Check current network state
  const netInfo = await NetInfo.fetch();
  await handleNetworkChange(netInfo);

  console.log('[OfflineSync] Offline sync service initialized');
}

/**
 * Cleanup the sync service
 */
export function cleanupOfflineSync(): void {
  if (networkUnsubscribe) {
    networkUnsubscribe();
    networkUnsubscribe = null;
  }
  if (syncTimeout) {
    clearTimeout(syncTimeout);
    syncTimeout = null;
  }
  syncListeners = [];
}

/**
 * Force an immediate sync
 */
export async function forceSyncNow(): Promise<SyncResult> {
  if (syncTimeout) {
    clearTimeout(syncTimeout);
    syncTimeout = null;
  }
  return performSync();
}

/**
 * Check if sync is enabled and configured
 */
export async function isSyncEnabled(): Promise<boolean> {
  const prefs = await loadSyncPreferences();
  return prefs.enabled;
}

/**
 * Enable or disable sync
 */
export async function setSyncEnabled(enabled: boolean): Promise<void> {
  const prefs = await loadSyncPreferences();
  await saveSyncPreferences({ ...prefs, enabled });

  if (enabled) {
    // Reinitialize if enabling
    await initOfflineSync();
  } else {
    // Cleanup if disabling
    cleanupOfflineSync();
  }
}

/**
 * Get pending items count
 */
export async function getPendingCount(): Promise<number> {
  const stats = await getQueueStats();
  return stats.pending + stats.syncing;
}

/**
 * Check if there are pending changes
 */
export async function hasPendingChanges(): Promise<boolean> {
  const count = await getPendingCount();
  return count > 0;
}
