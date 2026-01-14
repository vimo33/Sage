/**
 * Cloud Sync Module
 *
 * Provides end-to-end encrypted backup functionality for journal entries and insights.
 * Users can save encrypted backups to iCloud (iOS) or Google Drive (Android) and
 * restore them on new devices.
 */

export {
  encryptBackup,
  decryptBackup,
  validatePassphrase,
  generatePassphraseSuggestion,
  type EncryptedPayload,
} from './encryption';

export {
  createBackup,
  restoreBackup,
  loadCloudSyncPreferences,
  setCloudSyncEnabled,
  setPassphraseHint,
  getBackupPreview,
  formatBackupDate,
  DEFAULT_CLOUD_SYNC_PREFERENCES,
  type BackupData,
  type BackupResult,
  type RestoreResult,
  type CloudSyncPreferences,
} from './service';
