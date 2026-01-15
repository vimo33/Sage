/**
 * Sync State Hook
 *
 * Provides real-time sync status and actions for React components.
 */

import { useEffect, useState, useCallback } from 'react';
import type { SyncState, SyncResult, SyncPreferences } from './types';
import { DEFAULT_SYNC_STATE, DEFAULT_SYNC_PREFERENCES } from './types';
import {
  loadSyncState,
  subscribeSyncState,
  loadSyncPreferences,
  saveSyncPreferences,
  forceSyncNow,
  getPendingCount,
  loadConflicts,
} from './service';
import type { SyncConflict } from './types';

export interface UseSyncStateResult {
  /** Current sync state */
  state: SyncState;
  /** Sync preferences */
  preferences: SyncPreferences;
  /** Whether initial loading is complete */
  isLoaded: boolean;
  /** Number of pending items to sync */
  pendingCount: number;
  /** Unresolved conflicts */
  conflicts: SyncConflict[];
  /** Force an immediate sync */
  sync: () => Promise<SyncResult>;
  /** Update sync preferences */
  updatePreferences: (prefs: Partial<SyncPreferences>) => Promise<void>;
  /** Whether sync is in progress */
  isSyncing: boolean;
  /** Whether there are pending changes */
  hasPendingChanges: boolean;
  /** Last successful sync time formatted */
  lastSyncFormatted: string | null;
}

/**
 * Format a timestamp for display
 */
function formatSyncTime(timestamp: number | null): string | null {
  if (!timestamp) return null;

  const now = Date.now();
  const diff = now - timestamp;

  // Less than a minute ago
  if (diff < 60 * 1000) {
    return 'Just now';
  }

  // Less than an hour ago
  if (diff < 60 * 60 * 1000) {
    const minutes = Math.floor(diff / (60 * 1000));
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  }

  // Less than a day ago
  if (diff < 24 * 60 * 60 * 1000) {
    const hours = Math.floor(diff / (60 * 60 * 1000));
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }

  // Show date
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

/**
 * Hook to access and manage sync state
 */
export function useSyncState(): UseSyncStateResult {
  const [state, setState] = useState<SyncState>(DEFAULT_SYNC_STATE);
  const [preferences, setPreferences] = useState<SyncPreferences>(DEFAULT_SYNC_PREFERENCES);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [conflicts, setConflicts] = useState<SyncConflict[]>([]);

  // Load initial state
  useEffect(() => {
    async function loadInitial() {
      const [syncState, syncPrefs, pending, conflictList] = await Promise.all([
        loadSyncState(),
        loadSyncPreferences(),
        getPendingCount(),
        loadConflicts(),
      ]);

      setState(syncState);
      setPreferences(syncPrefs);
      setPendingCount(pending);
      setConflicts(conflictList);
      setIsLoaded(true);
    }

    loadInitial();
  }, []);

  // Subscribe to state changes
  useEffect(() => {
    const unsubscribe = subscribeSyncState(async (newState) => {
      setState(newState);
      setPendingCount(newState.pendingCount);
      // Also refresh conflicts
      const conflictList = await loadConflicts();
      setConflicts(conflictList);
    });

    return unsubscribe;
  }, []);

  // Force sync callback
  const sync = useCallback(async (): Promise<SyncResult> => {
    return forceSyncNow();
  }, []);

  // Update preferences callback
  const updatePreferences = useCallback(async (prefs: Partial<SyncPreferences>): Promise<void> => {
    const newPrefs = { ...preferences, ...prefs };
    await saveSyncPreferences(newPrefs);
    setPreferences(newPrefs);
  }, [preferences]);

  return {
    state,
    preferences,
    isLoaded,
    pendingCount,
    conflicts,
    sync,
    updatePreferences,
    isSyncing: state.status === 'syncing',
    hasPendingChanges: pendingCount > 0,
    lastSyncFormatted: formatSyncTime(state.lastSuccessfulSyncAt),
  };
}
