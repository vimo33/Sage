/**
 * Cloud Sync Service
 *
 * Handles backup and restore of journal entries and insights to user's
 * cloud storage (iCloud on iOS, Google Drive on Android).
 *
 * Key features:
 * - End-to-end encryption with user passphrase
 * - Journal entries and insights only (not chat history)
 * - Opt-in only - user must explicitly enable
 * - Manual backup/restore (no automatic sync to preserve privacy)
 */

import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import { Share, Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { encryptBackup, decryptBackup, type EncryptedPayload } from './encryption';
import type { JournalEntry, SavedInsight } from '../storage/store';

// SecureStore keys - MUST use only alphanumeric, '.', '-', '_' characters (NO colons!)
const CLOUD_SYNC_ENABLED_KEY = 'sage.cloud_sync.enabled';
const LAST_BACKUP_KEY = 'sage.cloud_sync.last_backup';
const BACKUP_PASSPHRASE_HINT_KEY = 'sage.cloud_sync.passphrase_hint';

// Backup file constants
const BACKUP_FILE_EXTENSION = '.sage-backup';
const BACKUP_FILENAME_PREFIX = 'sage-backup';

/**
 * Backup data structure
 */
export interface BackupData {
  version: number;
  createdAt: number;
  deviceInfo: {
    platform: string;
    appVersion: string;
  };
  data: {
    journalEntries: JournalEntry[];
    savedInsights: SavedInsight[];
  };
}

/**
 * Cloud sync preferences stored locally
 */
export interface CloudSyncPreferences {
  enabled: boolean;
  lastBackupAt: number | null;
  lastBackupEntryCount: number;
  lastBackupInsightCount: number;
  passphraseHint: string | null;
}

/**
 * Result of a backup operation
 */
export interface BackupResult {
  success: boolean;
  error?: string;
  timestamp?: number;
  entryCount?: number;
  insightCount?: number;
}

/**
 * Result of a restore operation
 */
export interface RestoreResult {
  success: boolean;
  error?: string;
  journalEntries?: JournalEntry[];
  savedInsights?: SavedInsight[];
  backupDate?: number;
  stats?: {
    journalEntriesRestored: number;
    insightsRestored: number;
  };
}

/**
 * Default cloud sync preferences
 */
export const DEFAULT_CLOUD_SYNC_PREFERENCES: CloudSyncPreferences = {
  enabled: false,
  lastBackupAt: null,
  lastBackupEntryCount: 0,
  lastBackupInsightCount: 0,
  passphraseHint: null,
};

/**
 * Generate backup filename with timestamp
 */
function generateBackupFilename(): string {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD
  return `${BACKUP_FILENAME_PREFIX}-${dateStr}${BACKUP_FILE_EXTENSION}`;
}

/**
 * Create backup data structure
 */
function createBackupData(
  journalEntries: JournalEntry[],
  savedInsights: SavedInsight[]
): BackupData {
  return {
    version: 1,
    createdAt: Date.now(),
    deviceInfo: {
      platform: Platform.OS,
      appVersion: '1.0.0',
    },
    data: {
      journalEntries: journalEntries.map(entry => ({
        ...entry,
        // Ensure all fields are serializable
        id: entry.id,
        content: entry.content,
        mood: entry.mood,
        createdAt: entry.createdAt,
        linkedInsightIds: entry.linkedInsightIds || [],
      })),
      savedInsights: savedInsights.map(insight => ({
        ...insight,
        id: insight.id,
        verseContent: insight.verseContent,
        sourceRef: insight.sourceRef,
        userNote: insight.userNote,
        createdAt: insight.createdAt,
      })),
    },
  };
}

/**
 * Validate backup data structure
 */
function validateBackupData(data: unknown): data is BackupData {
  if (!data || typeof data !== 'object') return false;

  const backup = data as BackupData;

  if (typeof backup.version !== 'number') return false;
  if (typeof backup.createdAt !== 'number') return false;
  if (!backup.data || typeof backup.data !== 'object') return false;
  if (!Array.isArray(backup.data.journalEntries)) return false;
  if (!Array.isArray(backup.data.savedInsights)) return false;

  return true;
}

/**
 * Load cloud sync preferences from secure storage
 */
export async function loadCloudSyncPreferences(): Promise<CloudSyncPreferences> {
  try {
    const [enabled, lastBackup, hint] = await Promise.all([
      SecureStore.getItemAsync(CLOUD_SYNC_ENABLED_KEY),
      SecureStore.getItemAsync(LAST_BACKUP_KEY),
      SecureStore.getItemAsync(BACKUP_PASSPHRASE_HINT_KEY),
    ]);

    const prefs: CloudSyncPreferences = {
      ...DEFAULT_CLOUD_SYNC_PREFERENCES,
      enabled: enabled === 'true',
      passphraseHint: hint,
    };

    if (lastBackup) {
      try {
        const parsed = JSON.parse(lastBackup);
        prefs.lastBackupAt = parsed.timestamp;
        prefs.lastBackupEntryCount = parsed.entryCount || 0;
        prefs.lastBackupInsightCount = parsed.insightCount || 0;
      } catch {
        // Ignore parse errors
      }
    }

    return prefs;
  } catch {
    return DEFAULT_CLOUD_SYNC_PREFERENCES;
  }
}

/**
 * Save cloud sync enabled state
 */
export async function setCloudSyncEnabled(enabled: boolean): Promise<void> {
  await SecureStore.setItemAsync(CLOUD_SYNC_ENABLED_KEY, enabled.toString());
}

/**
 * Save passphrase hint (optional user-provided hint)
 */
export async function setPassphraseHint(hint: string | null): Promise<void> {
  if (hint) {
    await SecureStore.setItemAsync(BACKUP_PASSPHRASE_HINT_KEY, hint);
  } else {
    await SecureStore.deleteItemAsync(BACKUP_PASSPHRASE_HINT_KEY);
  }
}

/**
 * Record a successful backup
 */
async function recordBackup(entryCount: number, insightCount: number): Promise<void> {
  const data = JSON.stringify({
    timestamp: Date.now(),
    entryCount,
    insightCount,
  });
  await SecureStore.setItemAsync(LAST_BACKUP_KEY, data);
}

/**
 * Create an encrypted backup and share it (allows saving to Files/iCloud/Drive)
 */
export async function createBackup(
  journalEntries: JournalEntry[],
  savedInsights: SavedInsight[],
  passphrase: string
): Promise<BackupResult> {
  try {
    // Create backup data
    const backupData = createBackupData(journalEntries, savedInsights);
    const jsonData = JSON.stringify(backupData);

    // Encrypt the backup
    const encryptedPayload = await encryptBackup(jsonData, passphrase);
    const encryptedJson = JSON.stringify(encryptedPayload);

    // Generate filename
    const filename = generateBackupFilename();

    // Save to cache directory first
    const filePath = `${FileSystem.cacheDirectory}${filename}`;
    await FileSystem.writeAsStringAsync(filePath, encryptedJson, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    // Share the file (this allows saving to Files app, iCloud, Google Drive, etc.)
    const shareResult = await Share.share(
      Platform.OS === 'ios'
        ? { url: filePath }
        : { message: encryptedJson, title: 'Sage Backup' },
      { dialogTitle: 'Save Encrypted Backup' }
    );

    // Clean up cache file after a delay
    setTimeout(async () => {
      try {
        await FileSystem.deleteAsync(filePath, { idempotent: true });
      } catch {
        // Ignore cleanup errors
      }
    }, 5000);

    if (shareResult.action === Share.dismissedAction) {
      return {
        success: false,
        error: 'Backup cancelled',
      };
    }

    // Record the backup
    await recordBackup(journalEntries.length, savedInsights.length);

    return {
      success: true,
      timestamp: backupData.createdAt,
      entryCount: journalEntries.length,
      insightCount: savedInsights.length,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create backup',
    };
  }
}

/**
 * Restore from an encrypted backup file
 */
export async function restoreBackup(passphrase: string): Promise<RestoreResult> {
  try {
    // Pick a backup file
    const result = await DocumentPicker.getDocumentAsync({
      type: ['application/json', 'application/octet-stream', '*/*'],
      copyToCacheDirectory: true,
    });

    if (result.canceled || !result.assets || result.assets.length === 0) {
      return {
        success: false,
        error: 'No file selected',
      };
    }

    const asset = result.assets[0];

    // Read the file
    const fileContent = await FileSystem.readAsStringAsync(asset.uri, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    // Clean up the cache file
    try {
      await FileSystem.deleteAsync(asset.uri, { idempotent: true });
    } catch {
      // Ignore cleanup errors
    }

    // Parse the encrypted payload
    let encryptedPayload: EncryptedPayload;
    try {
      encryptedPayload = JSON.parse(fileContent);
    } catch {
      return {
        success: false,
        error: 'Invalid backup file format',
      };
    }

    // Validate the encrypted payload structure
    if (!encryptedPayload.version || !encryptedPayload.data || !encryptedPayload.iv) {
      return {
        success: false,
        error: 'Invalid backup file: missing required fields',
      };
    }

    // Decrypt the backup
    let decryptedJson: string;
    try {
      decryptedJson = await decryptBackup(encryptedPayload, passphrase);
    } catch (decryptError) {
      const errorMessage = decryptError instanceof Error ? decryptError.message : 'Decryption failed';
      if (errorMessage.includes('Authentication failed')) {
        return {
          success: false,
          error: 'Incorrect passphrase or corrupted backup',
        };
      }
      return {
        success: false,
        error: `Decryption failed: ${errorMessage}`,
      };
    }

    // Parse the decrypted backup data
    let backupData: BackupData;
    try {
      backupData = JSON.parse(decryptedJson);
    } catch {
      return {
        success: false,
        error: 'Failed to parse backup data',
      };
    }

    // Validate the backup data structure
    if (!validateBackupData(backupData)) {
      return {
        success: false,
        error: 'Invalid backup data structure',
      };
    }

    // Check backup version compatibility
    if (backupData.version > 1) {
      return {
        success: false,
        error: `Backup version ${backupData.version} is not supported. Please update the app.`,
      };
    }

    return {
      success: true,
      journalEntries: backupData.data.journalEntries,
      savedInsights: backupData.data.savedInsights,
      backupDate: backupData.createdAt,
      stats: {
        journalEntriesRestored: backupData.data.journalEntries.length,
        insightsRestored: backupData.data.savedInsights.length,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to restore backup',
    };
  }
}

/**
 * Get a summary of what would be backed up
 */
export function getBackupPreview(
  journalEntries: JournalEntry[],
  savedInsights: SavedInsight[]
): {
  journalCount: number;
  insightCount: number;
  estimatedSize: string;
  dateRange: string | null;
} {
  const journalCount = journalEntries.length;
  const insightCount = savedInsights.length;

  // Estimate size
  const journalSize = journalEntries.reduce((sum, e) => sum + (e.content?.length || 0), 0);
  const insightSize = savedInsights.reduce(
    (sum, i) => sum + (i.verseContent?.length || 0) + (i.userNote?.length || 0),
    0
  );
  const totalBytes = journalSize + insightSize + 1000; // Add overhead for metadata

  const estimatedSize =
    totalBytes < 1024
      ? `${totalBytes} B`
      : totalBytes < 1024 * 1024
        ? `${(totalBytes / 1024).toFixed(1)} KB`
        : `${(totalBytes / (1024 * 1024)).toFixed(1)} MB`;

  // Calculate date range
  let dateRange: string | null = null;
  const allTimestamps = [
    ...journalEntries.map(e => e.createdAt),
    ...savedInsights.map(i => i.createdAt),
  ].filter(Boolean);

  if (allTimestamps.length > 0) {
    const oldest = new Date(Math.min(...allTimestamps));
    const newest = new Date(Math.max(...allTimestamps));

    const formatDate = (d: Date) =>
      d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    dateRange =
      oldest.toDateString() === newest.toDateString()
        ? formatDate(oldest)
        : `${formatDate(oldest)} - ${formatDate(newest)}`;
  }

  return {
    journalCount,
    insightCount,
    estimatedSize,
    dateRange,
  };
}

/**
 * Format a timestamp for display
 */
export function formatBackupDate(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}
