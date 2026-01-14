/**
 * Cloud Sync Settings Modal
 *
 * Provides UI for opt-in encrypted cloud backup of journal entries and insights.
 * Supports backup to iCloud (iOS) and Google Drive (Android).
 */

import { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  useColorScheme,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useSageStore } from '../lib/storage/store';
import {
  COLORS,
  SPACING,
  RADII,
  TYPOGRAPHY,
  getThemedColors,
} from '../lib/ui/theme';
import {
  createBackup,
  restoreBackup,
  loadCloudSyncPreferences,
  setCloudSyncEnabled,
  setPassphraseHint,
  getBackupPreview,
  formatBackupDate,
  validatePassphrase,
  generatePassphraseSuggestion,
  type CloudSyncPreferences,
} from '../lib/cloud-sync';

interface CloudSyncSettingsModalProps {
  visible: boolean;
  onClose: () => void;
}

type ViewState = 'main' | 'backup' | 'restore' | 'setup';

export function CloudSyncSettingsModal({
  visible,
  onClose,
}: CloudSyncSettingsModalProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);

  const journalEntries = useSageStore((s) => s.journalEntries);
  const savedInsights = useSageStore((s) => s.savedInsights);
  const importJournalEntries = useSageStore((s) => s.importJournalEntries);

  const [viewState, setViewState] = useState<ViewState>('main');
  const [preferences, setPreferences] = useState<CloudSyncPreferences | null>(null);
  const [passphrase, setPassphrase] = useState('');
  const [confirmPassphrase, setConfirmPassphrase] = useState('');
  const [passphraseHintInput, setPassphraseHintInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassphrase, setShowPassphrase] = useState(false);
  const [passphraseErrors, setPassphraseErrors] = useState<string[]>([]);

  // Load preferences when modal opens
  useEffect(() => {
    if (visible) {
      loadCloudSyncPreferences().then(setPreferences);
      setViewState('main');
      setPassphrase('');
      setConfirmPassphrase('');
      setPassphraseHintInput('');
      setPassphraseErrors([]);
    }
  }, [visible]);

  // Validate passphrase on change
  useEffect(() => {
    if (passphrase) {
      const validation = validatePassphrase(passphrase);
      setPassphraseErrors(validation.errors);
    } else {
      setPassphraseErrors([]);
    }
  }, [passphrase]);

  const backupPreview = getBackupPreview(journalEntries, savedInsights);

  const handleEnableCloudSync = useCallback(async () => {
    await setCloudSyncEnabled(true);
    const updated = await loadCloudSyncPreferences();
    setPreferences(updated);
    setViewState('setup');
  }, []);

  const handleDisableCloudSync = useCallback(async () => {
    Alert.alert(
      'Disable Cloud Backup',
      'This will disable cloud backup. Your existing backups will not be deleted.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Disable',
          style: 'destructive',
          onPress: async () => {
            await setCloudSyncEnabled(false);
            const updated = await loadCloudSyncPreferences();
            setPreferences(updated);
          },
        },
      ]
    );
  }, []);

  const handleGeneratePassphrase = useCallback(async () => {
    const suggested = await generatePassphraseSuggestion();
    setPassphrase(suggested);
    setConfirmPassphrase(suggested);
    setShowPassphrase(true);
  }, []);

  const handleCreateBackup = useCallback(async () => {
    // Validate passphrase
    const validation = validatePassphrase(passphrase);
    if (!validation.valid) {
      Alert.alert('Invalid Passphrase', validation.errors.join('\n'));
      return;
    }

    if (passphrase !== confirmPassphrase) {
      Alert.alert('Passphrase Mismatch', 'The passphrases you entered do not match.');
      return;
    }

    setIsLoading(true);
    try {
      // Save passphrase hint if provided
      if (passphraseHintInput.trim()) {
        await setPassphraseHint(passphraseHintInput.trim());
      }

      const result = await createBackup(journalEntries, savedInsights, passphrase);

      if (result.success) {
        Alert.alert(
          'Backup Created',
          `Successfully created encrypted backup with ${result.entryCount} journal entries and ${result.insightCount} insights.`,
          [{ text: 'OK', onPress: () => {
            setViewState('main');
            loadCloudSyncPreferences().then(setPreferences);
          }}]
        );
      } else {
        if (result.error !== 'Backup cancelled') {
          Alert.alert('Backup Failed', result.error || 'An error occurred while creating the backup.');
        }
      }
    } finally {
      setIsLoading(false);
      setPassphrase('');
      setConfirmPassphrase('');
    }
  }, [passphrase, confirmPassphrase, passphraseHintInput, journalEntries, savedInsights]);

  const handleRestoreBackup = useCallback(async () => {
    if (!passphrase) {
      Alert.alert('Passphrase Required', 'Please enter the passphrase used to encrypt the backup.');
      return;
    }

    setIsLoading(true);
    try {
      const result = await restoreBackup(passphrase);

      if (!result.success) {
        if (result.error !== 'No file selected') {
          Alert.alert('Restore Failed', result.error || 'An error occurred while restoring the backup.');
        }
        return;
      }

      // Show confirmation before importing
      Alert.alert(
        'Confirm Restore',
        `This backup from ${result.backupDate ? formatBackupDate(result.backupDate) : 'unknown date'} contains:\n\n` +
        `- ${result.stats?.journalEntriesRestored || 0} journal entries\n` +
        `- ${result.stats?.insightsRestored || 0} saved insights\n\n` +
        'Do you want to import this data? Existing entries will be preserved.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Import',
            onPress: () => {
              // Import journal entries
              if (result.journalEntries && result.journalEntries.length > 0) {
                importJournalEntries(result.journalEntries.map(entry => ({
                  content: entry.content,
                  mood: entry.mood,
                  createdAt: entry.createdAt,
                })));
              }

              // Import insights - need to add them individually via store
              if (result.savedInsights && result.savedInsights.length > 0) {
                const saveInsight = useSageStore.getState().saveInsight;
                result.savedInsights.forEach(insight => {
                  // Check if insight already exists
                  const existing = useSageStore.getState().savedInsights.find(
                    i => i.verseContent === insight.verseContent && i.sourceRef === insight.sourceRef
                  );
                  if (!existing) {
                    saveInsight({
                      verseContent: insight.verseContent,
                      sourceRef: insight.sourceRef,
                      userNote: insight.userNote,
                    });
                  }
                });
              }

              Alert.alert(
                'Restore Complete',
                `Successfully restored ${result.stats?.journalEntriesRestored || 0} journal entries and ${result.stats?.insightsRestored || 0} insights.`,
                [{ text: 'OK', onPress: () => setViewState('main') }]
              );
            },
          },
        ]
      );
    } finally {
      setIsLoading(false);
      setPassphrase('');
    }
  }, [passphrase, importJournalEntries]);

  const styles = createStyles(colors, isDark);

  // Setup view - first time enabling
  if (viewState === 'setup') {
    return (
      <Modal
        visible={visible}
        animationType="slide"
        transparent
        onRequestClose={() => setViewState('main')}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Set Up Cloud Backup</Text>
              <TouchableOpacity
                testID="cloud-sync-setup-close"
                onPress={() => setViewState('main')}
                style={styles.modalCloseBtn}
              >
                <Text style={styles.modalCloseText}>X</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.infoBox}>
                <Text style={styles.infoTitle}>End-to-End Encryption</Text>
                <Text style={styles.infoText}>
                  Your backup is encrypted with a passphrase only you know. Without this passphrase,
                  your data cannot be read - not even by Sage.
                </Text>
              </View>

              <View style={styles.warningBox}>
                <Text style={styles.warningTitle}>Important</Text>
                <Text style={styles.warningText}>
                  If you forget your passphrase, your backup cannot be recovered.
                  Consider writing it down in a safe place.
                </Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Create Your Passphrase</Text>

                <View style={styles.inputContainer}>
                  <TextInput
                    testID="cloud-sync-passphrase-input"
                    style={styles.input}
                    value={passphrase}
                    onChangeText={setPassphrase}
                    placeholder="Enter a strong passphrase"
                    placeholderTextColor={colors.textMuted}
                    secureTextEntry={!showPassphrase}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    style={styles.showPassphraseBtn}
                    onPress={() => setShowPassphrase(!showPassphrase)}
                  >
                    <Text style={styles.showPassphraseText}>
                      {showPassphrase ? 'Hide' : 'Show'}
                    </Text>
                  </TouchableOpacity>
                </View>

                {passphraseErrors.length > 0 && (
                  <View style={styles.errorContainer}>
                    {passphraseErrors.map((error, i) => (
                      <Text key={i} style={styles.errorText}>- {error}</Text>
                    ))}
                  </View>
                )}

                <TouchableOpacity
                  style={styles.suggestButton}
                  onPress={handleGeneratePassphrase}
                >
                  <Text style={styles.suggestButtonText}>Suggest Strong Passphrase</Text>
                </TouchableOpacity>

                <View style={styles.inputContainer}>
                  <TextInput
                    testID="cloud-sync-confirm-passphrase-input"
                    style={styles.input}
                    value={confirmPassphrase}
                    onChangeText={setConfirmPassphrase}
                    placeholder="Confirm passphrase"
                    placeholderTextColor={colors.textMuted}
                    secureTextEntry={!showPassphrase}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>

                <Text style={styles.hintLabel}>Passphrase Hint (optional)</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    testID="cloud-sync-hint-input"
                    style={styles.input}
                    value={passphraseHintInput}
                    onChangeText={setPassphraseHintInput}
                    placeholder="A hint to help you remember"
                    placeholderTextColor={colors.textMuted}
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <TouchableOpacity
                testID="cloud-sync-create-backup-btn"
                style={[
                  styles.primaryButton,
                  (isLoading || passphraseErrors.length > 0 || !passphrase || passphrase !== confirmPassphrase) && styles.buttonDisabled
                ]}
                onPress={handleCreateBackup}
                disabled={isLoading || passphraseErrors.length > 0 || !passphrase || passphrase !== confirmPassphrase}
              >
                {isLoading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.primaryButtonText}>Create Backup Now</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => setViewState('main')}
              >
                <Text style={styles.secondaryButtonText}>Skip for Now</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  }

  // Backup view
  if (viewState === 'backup') {
    return (
      <Modal
        visible={visible}
        animationType="slide"
        transparent
        onRequestClose={() => setViewState('main')}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create Backup</Text>
              <TouchableOpacity
                testID="cloud-sync-backup-close"
                onPress={() => setViewState('main')}
                style={styles.modalCloseBtn}
              >
                <Text style={styles.modalCloseText}>X</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.previewCard}>
                <View style={styles.previewRow}>
                  <Text style={styles.previewLabel}>Journal entries</Text>
                  <Text style={styles.previewValue}>{backupPreview.journalCount}</Text>
                </View>
                <View style={styles.previewRow}>
                  <Text style={styles.previewLabel}>Saved insights</Text>
                  <Text style={styles.previewValue}>{backupPreview.insightCount}</Text>
                </View>
                {backupPreview.dateRange && (
                  <View style={styles.previewRow}>
                    <Text style={styles.previewLabel}>Date range</Text>
                    <Text style={styles.previewValue}>{backupPreview.dateRange}</Text>
                  </View>
                )}
                <View style={styles.previewRow}>
                  <Text style={styles.previewLabel}>Estimated size</Text>
                  <Text style={styles.previewValue}>{backupPreview.estimatedSize}</Text>
                </View>
              </View>

              {preferences?.passphraseHint && (
                <View style={styles.hintBox}>
                  <Text style={styles.hintBoxLabel}>Your passphrase hint:</Text>
                  <Text style={styles.hintBoxText}>{preferences.passphraseHint}</Text>
                </View>
              )}

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Enter Your Passphrase</Text>

                <View style={styles.inputContainer}>
                  <TextInput
                    testID="cloud-sync-backup-passphrase"
                    style={styles.input}
                    value={passphrase}
                    onChangeText={setPassphrase}
                    placeholder="Enter your passphrase"
                    placeholderTextColor={colors.textMuted}
                    secureTextEntry={!showPassphrase}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    style={styles.showPassphraseBtn}
                    onPress={() => setShowPassphrase(!showPassphrase)}
                  >
                    <Text style={styles.showPassphraseText}>
                      {showPassphrase ? 'Hide' : 'Show'}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                  <TextInput
                    testID="cloud-sync-backup-confirm"
                    style={styles.input}
                    value={confirmPassphrase}
                    onChangeText={setConfirmPassphrase}
                    placeholder="Confirm passphrase"
                    placeholderTextColor={colors.textMuted}
                    secureTextEntry={!showPassphrase}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              </View>

              <TouchableOpacity
                testID="cloud-sync-create-backup-confirm"
                style={[
                  styles.primaryButton,
                  (isLoading || !passphrase || passphrase !== confirmPassphrase) && styles.buttonDisabled
                ]}
                onPress={handleCreateBackup}
                disabled={isLoading || !passphrase || passphrase !== confirmPassphrase}
              >
                {isLoading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.primaryButtonText}>
                    Create Encrypted Backup
                  </Text>
                )}
              </TouchableOpacity>

              <Text style={styles.noteText}>
                The backup will be saved to your {Platform.OS === 'ios' ? 'Files app or iCloud' : 'device or Google Drive'}.
              </Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  }

  // Restore view
  if (viewState === 'restore') {
    return (
      <Modal
        visible={visible}
        animationType="slide"
        transparent
        onRequestClose={() => setViewState('main')}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Restore Backup</Text>
              <TouchableOpacity
                testID="cloud-sync-restore-close"
                onPress={() => setViewState('main')}
                style={styles.modalCloseBtn}
              >
                <Text style={styles.modalCloseText}>X</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.infoBox}>
                <Text style={styles.infoTitle}>Restore from Backup</Text>
                <Text style={styles.infoText}>
                  Select a backup file and enter the passphrase used to encrypt it.
                  Your current data will be preserved - restored entries will be merged.
                </Text>
              </View>

              {preferences?.passphraseHint && (
                <View style={styles.hintBox}>
                  <Text style={styles.hintBoxLabel}>Your passphrase hint:</Text>
                  <Text style={styles.hintBoxText}>{preferences.passphraseHint}</Text>
                </View>
              )}

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Enter Backup Passphrase</Text>

                <View style={styles.inputContainer}>
                  <TextInput
                    testID="cloud-sync-restore-passphrase"
                    style={styles.input}
                    value={passphrase}
                    onChangeText={setPassphrase}
                    placeholder="Enter the backup passphrase"
                    placeholderTextColor={colors.textMuted}
                    secureTextEntry={!showPassphrase}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    style={styles.showPassphraseBtn}
                    onPress={() => setShowPassphrase(!showPassphrase)}
                  >
                    <Text style={styles.showPassphraseText}>
                      {showPassphrase ? 'Hide' : 'Show'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                testID="cloud-sync-restore-btn"
                style={[
                  styles.primaryButton,
                  (isLoading || !passphrase) && styles.buttonDisabled
                ]}
                onPress={handleRestoreBackup}
                disabled={isLoading || !passphrase}
              >
                {isLoading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.primaryButtonText}>
                    Select Backup File
                  </Text>
                )}
              </TouchableOpacity>

              <Text style={styles.noteText}>
                Backup files have a .sage-backup extension.
              </Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  }

  // Main view
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Cloud Backup</Text>
            <TouchableOpacity
              testID="cloud-sync-modal-close"
              onPress={onClose}
              style={styles.modalCloseBtn}
            >
              <Text style={styles.modalCloseText}>X</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>Encrypted Cloud Backup</Text>
              <Text style={styles.infoText}>
                Securely backup your journal entries and saved insights with end-to-end encryption.
                Your data is encrypted before leaving your device - only you can decrypt it.
              </Text>
            </View>

            <View style={styles.privacyBox}>
              <Text style={styles.privacyTitle}>What's Backed Up</Text>
              <Text style={styles.privacyText}>
                - Journal entries{'\n'}
                - Saved insights and notes
              </Text>
              <Text style={[styles.privacyTitle, { marginTop: SPACING.md }]}>Never Backed Up</Text>
              <Text style={[styles.privacyText, styles.notBackedUpText]}>
                - Chat history{'\n'}
                - App preferences{'\n'}
                - Usage analytics
              </Text>
            </View>

            {!preferences?.enabled ? (
              <TouchableOpacity
                testID="cloud-sync-enable-btn"
                style={styles.enableButton}
                onPress={handleEnableCloudSync}
              >
                <Text style={styles.enableButtonText}>Enable Cloud Backup</Text>
                <Text style={styles.enableButtonSubtext}>
                  Save to {Platform.OS === 'ios' ? 'iCloud or Files' : 'Google Drive or local storage'}
                </Text>
              </TouchableOpacity>
            ) : (
              <>
                <View style={styles.statusCard}>
                  <View style={styles.statusRow}>
                    <Text style={styles.statusLabel}>Cloud Backup</Text>
                    <Text style={styles.statusEnabled}>Enabled</Text>
                  </View>
                  {preferences.lastBackupAt && (
                    <>
                      <View style={styles.statusDivider} />
                      <View style={styles.statusRow}>
                        <Text style={styles.statusLabel}>Last backup</Text>
                        <Text style={styles.statusValue}>
                          {formatBackupDate(preferences.lastBackupAt)}
                        </Text>
                      </View>
                      <View style={styles.statusRow}>
                        <Text style={styles.statusLabel}>Entries backed up</Text>
                        <Text style={styles.statusValue}>
                          {preferences.lastBackupEntryCount} journal, {preferences.lastBackupInsightCount} insights
                        </Text>
                      </View>
                    </>
                  )}
                </View>

                <View style={styles.actionsSection}>
                  <TouchableOpacity
                    testID="cloud-sync-backup-btn"
                    style={styles.actionButton}
                    onPress={() => setViewState('backup')}
                  >
                    <Text style={styles.actionButtonText}>Create New Backup</Text>
                    <Text style={styles.actionArrow}>{'>'}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    testID="cloud-sync-restore-action-btn"
                    style={styles.actionButton}
                    onPress={() => setViewState('restore')}
                  >
                    <Text style={styles.actionButtonText}>Restore from Backup</Text>
                    <Text style={styles.actionArrow}>{'>'}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    testID="cloud-sync-disable-btn"
                    style={[styles.actionButton, styles.dangerButton]}
                    onPress={handleDisableCloudSync}
                  >
                    <Text style={styles.dangerButtonText}>Disable Cloud Backup</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}

            <View style={styles.footerNote}>
              <Text style={styles.footerNoteText}>
                Backups are encrypted with your passphrase using strong encryption.
                Without your passphrase, backups cannot be decrypted.
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const createStyles = (colors: ReturnType<typeof getThemedColors>, isDark: boolean) =>
  StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'flex-end',
    },
    modalContent: {
      backgroundColor: colors.background,
      borderTopLeftRadius: RADII.xl,
      borderTopRightRadius: RADII.xl,
      padding: SPACING.xl,
      paddingBottom: 40,
      maxHeight: '90%',
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: SPACING.xl,
    },
    modalTitle: {
      ...TYPOGRAPHY.styles.h2,
      color: colors.text,
    },
    modalCloseBtn: {
      width: 32,
      height: 32,
      borderRadius: RADII.full,
      backgroundColor: colors.surfaceAlt,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalCloseText: {
      color: colors.text,
      fontSize: 14,
      fontWeight: '600',
    },
    infoBox: {
      backgroundColor: colors.surface,
      padding: SPACING.lg,
      borderRadius: RADII.md,
      marginBottom: SPACING.lg,
    },
    infoTitle: {
      ...TYPOGRAPHY.styles.bodyBold,
      color: colors.text,
      marginBottom: SPACING.xs,
    },
    infoText: {
      ...TYPOGRAPHY.styles.body,
      color: colors.textSecondary,
      lineHeight: 22,
    },
    warningBox: {
      backgroundColor: COLORS.warningLight,
      padding: SPACING.lg,
      borderRadius: RADII.md,
      marginBottom: SPACING.lg,
      borderWidth: 1,
      borderColor: COLORS.warning,
    },
    warningTitle: {
      ...TYPOGRAPHY.styles.bodyBold,
      color: COLORS.warning,
      marginBottom: SPACING.xs,
    },
    warningText: {
      ...TYPOGRAPHY.styles.body,
      color: colors.text,
      lineHeight: 22,
    },
    privacyBox: {
      backgroundColor: COLORS.primaryLight,
      padding: SPACING.lg,
      borderRadius: RADII.md,
      marginBottom: SPACING.lg,
    },
    privacyTitle: {
      ...TYPOGRAPHY.styles.bodyBold,
      color: COLORS.primary,
      marginBottom: SPACING.xs,
    },
    privacyText: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.text,
      lineHeight: 20,
    },
    notBackedUpText: {
      color: colors.textSecondary,
    },
    enableButton: {
      backgroundColor: COLORS.primary,
      padding: SPACING.lg,
      borderRadius: RADII.md,
      alignItems: 'center',
      marginBottom: SPACING.lg,
    },
    enableButtonText: {
      ...TYPOGRAPHY.styles.bodyBold,
      color: '#FFFFFF',
    },
    enableButtonSubtext: {
      ...TYPOGRAPHY.styles.caption,
      color: 'rgba(255,255,255,0.8)',
      marginTop: SPACING.xs,
    },
    statusCard: {
      backgroundColor: colors.surface,
      padding: SPACING.lg,
      borderRadius: RADII.md,
      marginBottom: SPACING.lg,
    },
    statusRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: SPACING.xs,
    },
    statusDivider: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: SPACING.sm,
    },
    statusLabel: {
      ...TYPOGRAPHY.styles.body,
      color: colors.textSecondary,
    },
    statusValue: {
      ...TYPOGRAPHY.styles.body,
      color: colors.text,
    },
    statusEnabled: {
      ...TYPOGRAPHY.styles.bodyBold,
      color: COLORS.primary,
    },
    actionsSection: {
      marginBottom: SPACING.lg,
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.surface,
      padding: SPACING.lg,
      borderRadius: RADII.md,
      marginBottom: SPACING.sm,
    },
    actionButtonText: {
      ...TYPOGRAPHY.styles.body,
      color: colors.text,
    },
    actionArrow: {
      fontSize: 18,
      color: colors.textSecondary,
      fontWeight: '600',
    },
    dangerButton: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: COLORS.danger,
    },
    dangerButtonText: {
      ...TYPOGRAPHY.styles.body,
      color: COLORS.danger,
    },
    footerNote: {
      marginTop: SPACING.md,
      padding: SPACING.lg,
      backgroundColor: colors.surfaceAlt,
      borderRadius: RADII.md,
    },
    footerNoteText: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textMuted,
      textAlign: 'center',
      fontStyle: 'italic',
    },
    section: {
      marginBottom: SPACING.lg,
    },
    sectionTitle: {
      ...TYPOGRAPHY.styles.label,
      color: colors.textMuted,
      textTransform: 'uppercase',
      marginBottom: SPACING.md,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: RADII.md,
      marginBottom: SPACING.md,
    },
    input: {
      flex: 1,
      padding: SPACING.lg,
      color: colors.text,
      fontSize: 16,
    },
    showPassphraseBtn: {
      paddingHorizontal: SPACING.lg,
      paddingVertical: SPACING.md,
    },
    showPassphraseText: {
      ...TYPOGRAPHY.styles.caption,
      color: COLORS.primary,
      fontWeight: '600',
    },
    errorContainer: {
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      padding: SPACING.md,
      borderRadius: RADII.sm,
      marginBottom: SPACING.md,
    },
    errorText: {
      ...TYPOGRAPHY.styles.caption,
      color: COLORS.danger,
      marginBottom: 2,
    },
    suggestButton: {
      backgroundColor: colors.surfaceAlt,
      padding: SPACING.md,
      borderRadius: RADII.md,
      alignItems: 'center',
      marginBottom: SPACING.lg,
    },
    suggestButtonText: {
      ...TYPOGRAPHY.styles.caption,
      color: COLORS.primary,
      fontWeight: '600',
    },
    hintLabel: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textSecondary,
      marginBottom: SPACING.xs,
    },
    hintBox: {
      backgroundColor: colors.surface,
      padding: SPACING.lg,
      borderRadius: RADII.md,
      marginBottom: SPACING.lg,
    },
    hintBoxLabel: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textMuted,
      marginBottom: SPACING.xs,
    },
    hintBoxText: {
      ...TYPOGRAPHY.styles.body,
      color: colors.text,
      fontStyle: 'italic',
    },
    primaryButton: {
      backgroundColor: COLORS.primary,
      padding: SPACING.lg,
      borderRadius: RADII.md,
      alignItems: 'center',
      marginBottom: SPACING.md,
    },
    primaryButtonText: {
      ...TYPOGRAPHY.styles.bodyBold,
      color: '#FFFFFF',
    },
    secondaryButton: {
      padding: SPACING.lg,
      borderRadius: RADII.md,
      alignItems: 'center',
      marginBottom: SPACING.md,
    },
    secondaryButtonText: {
      ...TYPOGRAPHY.styles.body,
      color: colors.textSecondary,
    },
    buttonDisabled: {
      opacity: 0.5,
    },
    previewCard: {
      backgroundColor: colors.surface,
      padding: SPACING.lg,
      borderRadius: RADII.md,
      marginBottom: SPACING.lg,
    },
    previewRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: SPACING.xs,
    },
    previewLabel: {
      ...TYPOGRAPHY.styles.body,
      color: colors.textSecondary,
    },
    previewValue: {
      ...TYPOGRAPHY.styles.bodyBold,
      color: colors.text,
    },
    noteText: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textMuted,
      textAlign: 'center',
      fontStyle: 'italic',
      marginTop: SPACING.sm,
    },
  });

export default CloudSyncSettingsModal;
