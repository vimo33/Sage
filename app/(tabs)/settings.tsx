import { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
  useColorScheme,
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { useSageStore, type TonePreference, type FontSizePreference } from '../../lib/storage/store';
import { COLORS, SPACING, RADII, getThemedColors, getScaledTypography, ACCENT_COLORS } from '../../lib/ui/theme';
import { getBiometricTypeName } from '../../lib/auth/biometric';
import { shareJournalExport, getExportPreview, type ExportFormat } from '../../lib/storage/export';
import { importJournalFromFile, type ImportResult } from '../../lib/storage/import';
import { NotificationSettingsModal } from '../../components/NotificationSettingsModal';
import { AnalyticsSettingsModal } from '../../components/AnalyticsSettingsModal';
import { CloudSyncSettingsModal } from '../../components/CloudSyncSettingsModal';
import { TipJarModal } from '../../components/TipJarModal';
import { DeveloperSettingsModal } from '../../components/DeveloperSettingsModal';
import { AccentColorPickerModal } from '../../components/AccentColorPickerModal';
import { TraditionSelectorModal } from '../../components/TraditionSelectorModal';
import { formatTimeForDisplay, getFrequencyLabel } from '../../lib/notifications';
import { loadCloudSyncPreferences, formatBackupDate, type CloudSyncPreferences } from '../../lib/cloud-sync';
import { getSupporterTier, getSupporterTierInfo, formatAmount } from '../../lib/donations';
import { validateModel, importModelFromUri, type ModelValidationResult } from '../../lib/llm/model-validator';
import { isModelReady, initModel, getModelStatus } from '../../lib/llm/inference';
import * as DocumentPicker from 'expo-document-picker';
import { Platform } from 'react-native';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);

  const preferences = useSageStore((s) => s.preferences);
  const setPreferences = useSageStore((s) => s.setPreferences);
  const biometricSupport = useSageStore((s) => s.biometricSupport);
  const initBiometricSupport = useSageStore((s) => s.initBiometricSupport);
  const setBiometricLockEnabled = useSageStore((s) => s.setBiometricLockEnabled);

  const [isTogglingBiometric, setIsTogglingBiometric] = useState(false);
  const [isExportModalVisible, setIsExportModalVisible] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isImportModalVisible, setIsImportModalVisible] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const [isNotificationModalVisible, setIsNotificationModalVisible] = useState(false);
  const [isAnalyticsModalVisible, setIsAnalyticsModalVisible] = useState(false);
  const [isCloudSyncModalVisible, setIsCloudSyncModalVisible] = useState(false);
  const [cloudSyncPrefs, setCloudSyncPrefs] = useState<CloudSyncPreferences | null>(null);
  const [isTipJarModalVisible, setIsTipJarModalVisible] = useState(false);
  const [isDeveloperSettingsModalVisible, setIsDeveloperSettingsModalVisible] = useState(false);
  const [isAccentColorModalVisible, setIsAccentColorModalVisible] = useState(false);
  const [isTraditionSelectorModalVisible, setIsTraditionSelectorModalVisible] = useState(false);
  const [modelStatus, setModelStatus] = useState<ModelValidationResult | null>(null);
  const [isCheckingModel, setIsCheckingModel] = useState(false);
  const [isImportingModel, setIsImportingModel] = useState(false);

  const initNotifications = useSageStore((s) => s.initNotifications);
  const donationPreferences = useSageStore((s) => s.donationPreferences);
  const notifPrefs = preferences.notificationPreferences;
  const analyticsPrefs = preferences.analyticsPreferences;

  const journalEntries = useSageStore((s) => s.journalEntries);
  const importJournalEntries = useSageStore((s) => s.importJournalEntries);
  const exportPreview = getExportPreview(journalEntries);

  // Initialize biometric support check on mount
  useEffect(() => {
    if (!biometricSupport) {
      void initBiometricSupport();
    }
  }, [biometricSupport, initBiometricSupport]);

  // Initialize notifications on mount
  useEffect(() => {
    void initNotifications();
  }, [initNotifications]);

  // Load cloud sync preferences on mount
  useEffect(() => {
    loadCloudSyncPreferences().then(setCloudSyncPrefs);
  }, []);

  // Check model status on mount
  useEffect(() => {
    checkModelStatus();
  }, []);

  const checkModelStatus = useCallback(async () => {
    setIsCheckingModel(true);
    try {
      const result = await validateModel();
      setModelStatus(result);
    } catch (error) {
      console.error('[Settings] Failed to check model status:', error);
    } finally {
      setIsCheckingModel(false);
    }
  }, []);

  const handleImportModel = useCallback(async () => {
    setIsImportingModel(true);
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['*/*'],
        copyToCacheDirectory: false,
      });

      if (result.canceled) {
        return;
      }

      const file = result.assets[0];
      if (!file.uri) {
        Alert.alert('Error', 'Could not access file URI');
        return;
      }

      // Import the model
      const importResult = await importModelFromUri(file.uri);

      if (importResult.status === 'valid' && importResult.localUri) {
        // Try to load the model immediately
        try {
          const isIOS = Platform.OS === 'ios';
          const modelConfig = isIOS ? {
            modelPath: importResult.localUri,
            isModelAsset: false,
            nCtx: 1024,
            nGpuLayers: 0,
            nThreads: 2,
            useMlock: false,
          } : {
            modelPath: importResult.localUri,
            isModelAsset: false,
            nCtx: 2048,
            nGpuLayers: 1,
            nThreads: 4,
          };

          await initModel(modelConfig);
          Alert.alert('Success', 'Model imported and loaded successfully! You can now use AI chat.', [
            { text: 'OK', onPress: () => checkModelStatus() }
          ]);
        } catch (loadError) {
          console.error('[Settings] Failed to load model:', loadError);
          Alert.alert('Success', 'Model imported! Please restart the app to load the AI model.', [
            { text: 'OK', onPress: () => checkModelStatus() }
          ]);
        }
      } else {
        Alert.alert('Import Failed', importResult.error || 'Invalid model file. Make sure you selected a .gguf file.');
      }
    } catch (error) {
      Alert.alert('Import Failed', error instanceof Error ? error.message : 'Failed to import model');
    } finally {
      setIsImportingModel(false);
    }
  }, [checkModelStatus]);

  // Reload cloud sync preferences when modal closes
  const handleCloudSyncModalClose = useCallback(() => {
    setIsCloudSyncModalVisible(false);
    loadCloudSyncPreferences().then(setCloudSyncPrefs);
  }, []);

  // Long-press handler for developer settings
  const handleVersionLongPress = useCallback(() => {
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setIsDeveloperSettingsModalVisible(true);
  }, []);

  const handleBiometricToggle = useCallback(async (enabled: boolean) => {
    setIsTogglingBiometric(true);
    try {
      const success = await setBiometricLockEnabled(enabled);
      if (!success && enabled) {
        Alert.alert(
          'Could Not Enable',
          'Biometric authentication could not be enabled. Make sure biometrics are set up on your device.',
          [{ text: 'OK' }]
        );
      }
    } finally {
      setIsTogglingBiometric(false);
    }
  }, [setBiometricLockEnabled]);

  const handleExport = useCallback(async (format: ExportFormat) => {
    setIsExporting(true);
    try {
      const result = await shareJournalExport(journalEntries, format);
      if (!result.success && result.error) {
        Alert.alert(
          'Export Failed',
          result.error,
          [{ text: 'OK' }]
        );
      }
    } finally {
      setIsExporting(false);
      setIsExportModalVisible(false);
    }
  }, [journalEntries]);

  const handleImport = useCallback(async () => {
    setIsImporting(true);
    setImportResult(null);
    try {
      const result = await importJournalFromFile(journalEntries, true);
      setImportResult(result);

      if (!result.success) {
        if (result.error !== 'No file selected') {
          Alert.alert(
            'Import Failed',
            result.error || 'Failed to import journal entries',
            [{ text: 'OK' }]
          );
        }
        setIsImportModalVisible(false);
        return;
      }

      if (result.entries.length === 0) {
        Alert.alert(
          'No New Entries',
          result.skipped > 0
            ? `All ${result.skipped} entries were duplicates and skipped.`
            : 'No valid entries found in the file.',
          [{ text: 'OK' }]
        );
        setIsImportModalVisible(false);
        return;
      }

      // Show confirmation before importing
      setIsImportModalVisible(true);
    } catch (error) {
      Alert.alert(
        'Import Failed',
        error instanceof Error ? error.message : 'An unexpected error occurred',
        [{ text: 'OK' }]
      );
      setIsImportModalVisible(false);
    } finally {
      setIsImporting(false);
    }
  }, [journalEntries]);

  const confirmImport = useCallback(() => {
    if (!importResult || !importResult.entries.length) {
      setIsImportModalVisible(false);
      return;
    }

    const count = importJournalEntries(importResult.entries);
    Alert.alert(
      'Import Complete',
      `Successfully imported ${count} journal ${count === 1 ? 'entry' : 'entries'}.`,
      [{ text: 'OK' }]
    );
    setIsImportModalVisible(false);
    setImportResult(null);
  }, [importResult, importJournalEntries]);

  const scaledTypography = getScaledTypography(preferences.fontSize);
  const styles = createStyles(colors, isDark, scaledTypography);

  const tones: { id: TonePreference; title: string; icon: string }[] = [
    { id: 'practical', title: 'Practical', icon: '💼' },
    { id: 'poetic', title: 'Poetic', icon: '🕊️' },
    { id: 'minimal', title: 'Minimal', icon: '➖' },
    { id: 'deep', title: 'Deep', icon: '👁️' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Customize your Sage experience</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Response Tone</Text>
          <View style={styles.toneGrid}>
            {tones.map((t) => (
              <TouchableOpacity
                key={t.id}
                style={[
                  styles.toneCard,
                  preferences.tone === t.id && styles.toneCardActive,
                ]}
                onPress={() => setPreferences({ tone: t.id })}
              >
                <Text style={styles.toneIcon}>{t.icon}</Text>
                <Text style={styles.toneLabel}>{t.title}</Text>
                {preferences.tone === t.id && <View style={styles.activeDot} />}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Wisdom Traditions</Text>
          <View style={styles.card}>
            <TouchableOpacity
              testID="tradition-preferences-button"
              style={styles.exportRow}
              onPress={() => setIsTraditionSelectorModalVisible(true)}
            >
              <View style={styles.rowContent}>
                <Text style={styles.rowLabel}>Preferred Traditions</Text>
                <Text style={styles.rowSublabel}>
                  {preferences.preferredTraditions.length === 0
                    ? 'All traditions (default)'
                    : `${preferences.preferredTraditions.length} tradition${preferences.preferredTraditions.length === 1 ? '' : 's'} selected`}
                </Text>
              </View>
              <Text style={styles.exportArrow}>{'>'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Narration</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <View>
                <Text style={styles.rowLabel}>Voice Guidance</Text>
                <Text style={styles.rowSublabel}>Hear Sage during reflections</Text>
              </View>
              <Switch
                value={preferences.narrateResponses}
                onValueChange={(val) => setPreferences({ narrateResponses: val })}
                trackColor={{ false: colors.surfaceAlt, true: COLORS.primary }}
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.speedSection}>
              <View style={styles.speedHeader}>
                <Text style={styles.rowLabel}>Speaking Speed</Text>
                <Text style={styles.speedValue}>{preferences.voiceSpeed.toFixed(1)}x</Text>
              </View>
              <View style={styles.speedControls}>
                <TouchableOpacity
                  style={styles.speedBtn}
                  onPress={() => setPreferences({ voiceSpeed: Math.max(0.5, preferences.voiceSpeed - 0.1) })}
                >
                  <Text style={styles.speedBtnText}>-</Text>
                </TouchableOpacity>
                <View style={styles.speedTrack}>
                  <View
                    style={[
                      styles.speedFill,
                      { width: `${((preferences.voiceSpeed - 0.5) / 1.5) * 100}%` },
                    ]}
                  />
                </View>
                <TouchableOpacity
                  style={styles.speedBtn}
                  onPress={() => setPreferences({ voiceSpeed: Math.min(2.0, preferences.voiceSpeed + 0.1) })}
                >
                  <Text style={styles.speedBtnText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Display</Text>
          <View style={styles.card}>
            <View style={styles.fontSizeSection}>
              <Text style={styles.rowLabel}>Text Size</Text>
              <Text style={styles.rowSublabel}>Adjust base font size for better readability</Text>
              <View style={styles.fontSizeOptions}>
                {([
                  { id: 'small', label: 'Small', icon: 'A' },
                  { id: 'medium', label: 'Medium', icon: 'A' },
                  { id: 'large', label: 'Large', icon: 'A' },
                ] as const).map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    testID={`font-size-${option.id}`}
                    style={[
                      styles.fontSizeOption,
                      preferences.fontSize === option.id && styles.fontSizeOptionActive,
                    ]}
                    onPress={() => setPreferences({ fontSize: option.id })}
                  >
                    <Text
                      style={[
                        styles.fontSizeIcon,
                        option.id === 'small' && styles.fontSizeIconSmall,
                        option.id === 'medium' && styles.fontSizeIconMedium,
                        option.id === 'large' && styles.fontSizeIconLarge,
                        preferences.fontSize === option.id && styles.fontSizeIconActive,
                      ]}
                    >
                      {option.icon}
                    </Text>
                    <Text
                      style={[
                        styles.fontSizeLabel,
                        preferences.fontSize === option.id && styles.fontSizeLabelActive,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <View>
                <Text style={styles.rowLabel}>Show Citations</Text>
                <Text style={styles.rowSublabel}>Display source references in responses</Text>
              </View>
              <Switch
                testID="citation-toggle"
                value={preferences.showCitations}
                onValueChange={(val) => setPreferences({ showCitations: val })}
                trackColor={{ false: colors.surfaceAlt, true: COLORS.primary }}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          <View style={styles.card}>
            <TouchableOpacity
              testID="accent-color-settings-button"
              style={styles.exportRow}
              onPress={() => setIsAccentColorModalVisible(true)}
            >
              <View style={styles.rowContent}>
                <Text style={styles.rowLabel}>Accent Color</Text>
                <Text style={styles.rowSublabel}>
                  {ACCENT_COLORS[preferences.accentColor]?.name ?? 'Forest'}
                </Text>
              </View>
              <View style={styles.accentColorPreview}>
                <View
                  style={[
                    styles.accentColorDot,
                    {
                      backgroundColor:
                        ACCENT_COLORS[preferences.accentColor]?.primary ?? COLORS.primary,
                    },
                  ]}
                />
                <Text style={styles.exportArrow}>{'>'}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reminders</Text>
          <View style={styles.card}>
            <TouchableOpacity
              testID="notification-settings-button"
              style={styles.exportRow}
              onPress={() => setIsNotificationModalVisible(true)}
            >
              <View style={styles.rowContent}>
                <Text style={styles.rowLabel}>Daily Check-in Reminders</Text>
                <Text style={styles.rowSublabel}>
                  {notifPrefs.enabled
                    ? `${formatTimeForDisplay(notifPrefs.reminderTime)} - ${getFrequencyLabel(notifPrefs.frequency)}`
                    : 'Disabled'}
                </Text>
              </View>
              <Text style={styles.exportArrow}>{'>'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <View style={styles.rowContent}>
                <Text style={styles.rowLabel}>Biometric Lock</Text>
                <Text style={styles.rowSublabel}>
                  {biometricSupport?.isSupported && biometricSupport?.isEnrolled
                    ? `Protect Journal & Insights with ${getBiometricTypeName(biometricSupport.biometricType)}`
                    : 'Set up Face ID or Touch ID on your device to enable'}
                </Text>
              </View>
              {isTogglingBiometric ? (
                <ActivityIndicator color={COLORS.primary} />
              ) : (
                <Switch
                  testID="biometric-lock-toggle"
                  value={preferences.biometricLockEnabled}
                  onValueChange={handleBiometricToggle}
                  trackColor={{ false: colors.surfaceAlt, true: COLORS.primary }}
                  disabled={!biometricSupport?.isSupported || !biometricSupport?.isEnrolled}
                />
              )}
            </View>
            {biometricSupport?.isSupported && biometricSupport?.isEnrolled && (
              <>
                <View style={styles.divider} />
                <View style={styles.infoRow}>
                  <Text style={styles.infoText}>
                    When enabled, you will need to authenticate to view your Journal and Insights
                  </Text>
                </View>
              </>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI Model</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <View style={styles.rowContent}>
                <Text style={styles.rowLabel}>LLM Status</Text>
                <Text style={styles.rowSublabel}>
                  {(() => {
                    if (isCheckingModel) return 'Checking model status...';
                    if (modelStatus?.status !== 'valid') return 'Not imported - AI responses disabled';
                    const llmStatus = getModelStatus();
                    if (llmStatus.ready) {
                      return `✅ Loaded & Verified (${(modelStatus.size / (1024 * 1024)).toFixed(0)}MB)`;
                    } else if (llmStatus.contextExists) {
                      return `⚠️ Context exists but NOT verified - LLM may not work`;
                    } else {
                      return `Model available (${(modelStatus.size / (1024 * 1024)).toFixed(0)}MB) - tap to load`;
                    }
                  })()}
                </Text>
              </View>
              <View style={styles.modelStatusIndicator}>
                <View
                  style={[
                    styles.modelStatusDot,
                    {
                      backgroundColor: (() => {
                        if (modelStatus?.status !== 'valid') return COLORS.danger;
                        const llmStatus = getModelStatus();
                        if (llmStatus.ready) return COLORS.success;
                        if (llmStatus.contextExists) return COLORS.warning;
                        return COLORS.warning;
                      })(),
                    },
                  ]}
                />
              </View>
            </View>
            {modelStatus?.status === 'valid' && modelStatus.localUri && (
              <>
                <View style={styles.divider} />
                <View style={styles.infoRow}>
                  <Text style={styles.infoText} numberOfLines={2}>
                    Path: {modelStatus.localUri.replace('file://', '')}
                  </Text>
                </View>
              </>
            )}
            <View style={styles.divider} />
            <TouchableOpacity
              testID="import-model-button"
              style={styles.exportRow}
              onPress={handleImportModel}
              disabled={isImportingModel}
            >
              <View style={styles.rowContent}>
                <Text style={styles.rowLabel}>
                  {modelStatus?.status === 'valid' ? 'Replace Model' : 'Import Model'}
                </Text>
                <Text style={styles.rowSublabel}>
                  {modelStatus?.status === 'valid'
                    ? 'Import a different GGUF model file'
                    : 'Import a GGUF model file from device storage'}
                </Text>
              </View>
              {isImportingModel ? (
                <ActivityIndicator color={COLORS.primary} size="small" />
              ) : (
                <Text style={styles.exportArrow}>{'>'}</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Analytics</Text>
          <View style={styles.card}>
            <TouchableOpacity
              testID="analytics-settings-button"
              style={styles.exportRow}
              onPress={() => setIsAnalyticsModalVisible(true)}
            >
              <View style={styles.rowContent}>
                <Text style={styles.rowLabel}>Anonymous Analytics</Text>
                <Text style={styles.rowSublabel}>
                  {analyticsPrefs.enabled
                    ? `Enabled - ${[
                        analyticsPrefs.crashReportingEnabled && 'Crash reports',
                        analyticsPrefs.usageMetricsEnabled && 'Usage patterns',
                      ].filter(Boolean).join(', ')}`
                    : 'Disabled - Opt-in for crash reports & usage'}
                </Text>
              </View>
              <Text style={styles.exportArrow}>{'>'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy & Data</Text>
          <View style={styles.card}>
            <TouchableOpacity
              testID="cloud-backup-settings-button"
              style={styles.exportRow}
              onPress={() => setIsCloudSyncModalVisible(true)}
            >
              <View style={styles.rowContent}>
                <Text style={styles.rowLabel}>Cloud Backup</Text>
                <Text style={styles.rowSublabel}>
                  {cloudSyncPrefs?.enabled
                    ? cloudSyncPrefs.lastBackupAt
                      ? `Last backup: ${formatBackupDate(cloudSyncPrefs.lastBackupAt)}`
                      : 'Enabled - No backups yet'
                    : 'End-to-end encrypted backup'}
                </Text>
              </View>
              <View style={styles.cloudSyncStatus}>
                {cloudSyncPrefs?.enabled && (
                  <Text style={styles.statusBadgeSmall}>ON</Text>
                )}
                <Text style={styles.exportArrow}>{'>'}</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.divider} />
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Local Storage Only</Text>
              <Text style={styles.statusBadge}>Active</Text>
            </View>
            <View style={styles.divider} />
            <TouchableOpacity
              testID="export-journal-button"
              style={styles.exportRow}
              onPress={() => setIsExportModalVisible(true)}
              disabled={journalEntries.length === 0}
            >
              <View style={styles.rowContent}>
                <Text style={[styles.rowLabel, journalEntries.length === 0 && styles.disabledText]}>
                  Export Journal
                </Text>
                <Text style={styles.rowSublabel}>
                  {journalEntries.length === 0
                    ? 'No entries to export'
                    : `${exportPreview.entryCount} ${exportPreview.entryCount === 1 ? 'entry' : 'entries'} (${exportPreview.estimatedSize})`}
                </Text>
              </View>
              <Text style={[styles.exportArrow, journalEntries.length === 0 && styles.disabledText]}>
                {'>'}
              </Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity
              testID="import-journal-button"
              style={styles.exportRow}
              onPress={handleImport}
              disabled={isImporting}
            >
              <View style={styles.rowContent}>
                <Text style={styles.rowLabel}>
                  Import Journal
                </Text>
                <Text style={styles.rowSublabel}>
                  Restore entries from exported file
                </Text>
              </View>
              {isImporting ? (
                <ActivityIndicator color={COLORS.primary} size="small" />
              ) : (
                <Text style={styles.exportArrow}>{'>'}</Text>
              )}
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.dangerRow}>
              <Text style={styles.dangerText}>Clear Chat History</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.card}>
            <TouchableOpacity
              testID="tip-jar-button"
              style={styles.exportRow}
              onPress={() => setIsTipJarModalVisible(true)}
            >
              <View style={styles.rowContent}>
                <Text style={styles.rowLabel}>Support Sage</Text>
                <Text style={styles.rowSublabel}>
                  {donationPreferences.totalDonated > 0
                    ? `Thank you for your support! (${formatAmount(donationPreferences.totalDonated)})`
                    : 'Help fund development with a tip'}
                </Text>
              </View>
              {getSupporterTier(donationPreferences.totalDonated) !== 'none' && (
                <Text style={styles.supporterBadgeIcon}>
                  {getSupporterTierInfo(getSupporterTier(donationPreferences.totalDonated)).icon}
                </Text>
              )}
              <Text style={styles.exportArrow}>{'>'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Pressable
          testID="version-long-press"
          style={styles.footerInfo}
          onLongPress={handleVersionLongPress}
          delayLongPress={800}
        >
          <Text style={styles.versionText}>Sage AI v1.0.0 (Local)</Text>
          <Text style={styles.copyrightText}>Fully on-device wisdom</Text>
          {preferences.developerSettings?.enabled && (
            <View style={styles.devModeBadge}>
              <Text style={styles.devModeBadgeText}>DEV MODE</Text>
            </View>
          )}
        </Pressable>
      </ScrollView>

      {/* Export Journal Modal */}
      <Modal
        visible={isExportModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setIsExportModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Export Journal</Text>
              <TouchableOpacity
                testID="export-modal-close"
                onPress={() => setIsExportModalVisible(false)}
                style={styles.modalCloseBtn}
              >
                <Text style={styles.modalCloseText}>X</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.exportInfo}>
              <Text style={styles.exportInfoLabel}>Entries to export</Text>
              <Text style={styles.exportInfoValue}>{exportPreview.entryCount}</Text>
            </View>
            <View style={styles.exportInfo}>
              <Text style={styles.exportInfoLabel}>Date range</Text>
              <Text style={styles.exportInfoValue}>{exportPreview.dateRange}</Text>
            </View>
            <View style={styles.exportInfo}>
              <Text style={styles.exportInfoLabel}>Estimated size</Text>
              <Text style={styles.exportInfoValue}>{exportPreview.estimatedSize}</Text>
            </View>

            <Text style={styles.formatLabel}>Choose format</Text>

            <View style={styles.formatOptions}>
              <TouchableOpacity
                testID="export-text-button"
                style={styles.formatButton}
                onPress={() => handleExport('text')}
                disabled={isExporting}
              >
                {isExporting ? (
                  <ActivityIndicator color={colors.text} />
                ) : (
                  <>
                    <Text style={styles.formatIcon}>TXT</Text>
                    <Text style={styles.formatButtonText}>Plain Text</Text>
                    <Text style={styles.formatDesc}>Simple readable format</Text>
                  </>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                testID="export-markdown-button"
                style={styles.formatButton}
                onPress={() => handleExport('markdown')}
                disabled={isExporting}
              >
                {isExporting ? (
                  <ActivityIndicator color={colors.text} />
                ) : (
                  <>
                    <Text style={styles.formatIcon}>MD</Text>
                    <Text style={styles.formatButtonText}>Markdown</Text>
                    <Text style={styles.formatDesc}>Formatted with headers</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>

            <Text style={styles.exportNote}>
              Your data stays on your device. Export creates a shareable file that you control.
            </Text>
          </View>
        </View>
      </Modal>

      {/* Import Journal Modal */}
      <Modal
        visible={isImportModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => {
          setIsImportModalVisible(false);
          setImportResult(null);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Import Journal</Text>
              <TouchableOpacity
                testID="import-modal-close"
                onPress={() => {
                  setIsImportModalVisible(false);
                  setImportResult(null);
                }}
                style={styles.modalCloseBtn}
              >
                <Text style={styles.modalCloseText}>X</Text>
              </TouchableOpacity>
            </View>

            {importResult && (
              <>
                <View style={styles.exportInfo}>
                  <Text style={styles.exportInfoLabel}>Entries to import</Text>
                  <Text style={styles.exportInfoValue}>{importResult.entries.length}</Text>
                </View>
                {importResult.skipped > 0 && (
                  <View style={styles.exportInfo}>
                    <Text style={styles.exportInfoLabel}>Duplicates skipped</Text>
                    <Text style={styles.exportInfoValue}>{importResult.skipped}</Text>
                  </View>
                )}
                {importResult.errors.length > 0 && (
                  <View style={styles.exportInfo}>
                    <Text style={styles.exportInfoLabel}>Parse errors</Text>
                    <Text style={[styles.exportInfoValue, styles.errorText]}>{importResult.errors.length}</Text>
                  </View>
                )}

                <View style={styles.importActions}>
                  <TouchableOpacity
                    testID="import-cancel-button"
                    style={[styles.importButton, styles.importButtonSecondary]}
                    onPress={() => {
                      setIsImportModalVisible(false);
                      setImportResult(null);
                    }}
                  >
                    <Text style={styles.importButtonSecondaryText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    testID="import-confirm-button"
                    style={[styles.importButton, styles.importButtonPrimary]}
                    onPress={confirmImport}
                  >
                    <Text style={styles.importButtonPrimaryText}>Import</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.exportNote}>
                  Imported entries will be merged with your existing journal entries.
                </Text>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Notification Settings Modal */}
      <NotificationSettingsModal
        visible={isNotificationModalVisible}
        onClose={() => setIsNotificationModalVisible(false)}
      />

      {/* Analytics Settings Modal */}
      <AnalyticsSettingsModal
        visible={isAnalyticsModalVisible}
        onClose={() => setIsAnalyticsModalVisible(false)}
      />

      {/* Cloud Sync Settings Modal */}
      <CloudSyncSettingsModal
        visible={isCloudSyncModalVisible}
        onClose={handleCloudSyncModalClose}
      />

      {/* Tip Jar Modal */}
      <TipJarModal
        visible={isTipJarModalVisible}
        onClose={() => setIsTipJarModalVisible(false)}
      />

      {/* Developer Settings Modal */}
      <DeveloperSettingsModal
        visible={isDeveloperSettingsModalVisible}
        onClose={() => setIsDeveloperSettingsModalVisible(false)}
      />

      {/* Accent Color Picker Modal */}
      <AccentColorPickerModal
        visible={isAccentColorModalVisible}
        onClose={() => setIsAccentColorModalVisible(false)}
      />

      {/* Tradition Selector Modal */}
      <TraditionSelectorModal
        visible={isTraditionSelectorModalVisible}
        onClose={() => setIsTraditionSelectorModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const createStyles = (
  colors: ReturnType<typeof getThemedColors>,
  isDark: boolean,
  scaledTypography: ReturnType<typeof getScaledTypography>
) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  title: {
    ...scaledTypography.styles.h1,
    color: colors.text,
  },
  subtitle: {
    ...scaledTypography.styles.body,
    color: colors.textSecondary,
    marginTop: 2,
  },
  scrollContainer: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: 40,
  },
  section: {
    marginTop: SPACING.xxl,
  },
  sectionTitle: {
    ...scaledTypography.styles.label,
    color: colors.textMuted,
    textTransform: 'uppercase',
    marginBottom: SPACING.md,
    marginLeft: 4,
  },
  toneGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  toneCard: {
    width: '47%',
    aspectRatio: 1,
    backgroundColor: colors.surface,
    borderRadius: RADII.md,
    padding: SPACING.lg,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.transparent,
  },
  toneCardActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  toneIcon: {
    fontSize: 32,
    marginBottom: SPACING.sm,
  },
  toneLabel: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 14,
  },
  activeDot: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: RADII.full,
    backgroundColor: COLORS.primary,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: RADII.md,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.lg,
  },
  rowLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  rowSublabel: {
    ...scaledTypography.styles.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  rowContent: {
    flex: 1,
    marginRight: SPACING.md,
  },
  infoRow: {
    padding: SPACING.lg,
    paddingTop: SPACING.md,
  },
  infoText: {
    ...scaledTypography.styles.caption,
    color: colors.textMuted,
    fontStyle: 'italic',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: SPACING.lg,
  },
  speedSection: {
    padding: SPACING.lg,
  },
  speedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  speedValue: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  speedControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  speedBtn: {
    width: 32,
    height: 32,
    borderRadius: RADII.full,
    backgroundColor: colors.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
  },
  speedBtnText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  speedTrack: {
    flex: 1,
    height: 4,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 2,
    overflow: 'hidden',
  },
  speedFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  // Font size selector styles
  fontSizeSection: {
    padding: SPACING.lg,
  },
  fontSizeOptions: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.md,
  },
  fontSizeOption: {
    flex: 1,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
    borderRadius: RADII.md,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  fontSizeOptionActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  fontSizeIcon: {
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  fontSizeIconSmall: {
    fontSize: 14,
  },
  fontSizeIconMedium: {
    fontSize: 18,
  },
  fontSizeIconLarge: {
    fontSize: 24,
  },
  fontSizeIconActive: {
    color: COLORS.primary,
  },
  fontSizeLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  fontSizeLabelActive: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  statusBadge: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADII.sm,
  },
  dangerRow: {
    padding: SPACING.lg,
    alignItems: 'center',
  },
  dangerText: {
    color: COLORS.danger,
    fontWeight: '600',
    fontSize: 15,
  },
  footerInfo: {
    marginTop: 40,
    alignItems: 'center',
    gap: 4,
  },
  versionText: {
    color: colors.textMuted,
    ...scaledTypography.styles.caption,
  },
  copyrightText: {
    color: colors.textMuted,
    fontSize: 11,
    opacity: 0.7,
  },
  devModeBadge: {
    backgroundColor: COLORS.warning,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADII.sm,
    marginTop: SPACING.sm,
  },
  devModeBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#000000',
  },
  // Export UI styles
  exportRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.lg,
  },
  exportArrow: {
    fontSize: 18,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  disabledText: {
    opacity: 0.4,
  },
  // Modal styles
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
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  modalTitle: {
    ...scaledTypography.styles.h2,
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
  exportInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  exportInfoLabel: {
    ...scaledTypography.styles.body,
    color: colors.textSecondary,
  },
  exportInfoValue: {
    ...scaledTypography.styles.bodyBold,
    color: colors.text,
  },
  formatLabel: {
    ...scaledTypography.styles.label,
    color: colors.textMuted,
    textTransform: 'uppercase',
    marginTop: SPACING.xl,
    marginBottom: SPACING.md,
  },
  formatOptions: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  formatButton: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: RADII.md,
    padding: SPACING.lg,
    alignItems: 'center',
    minHeight: 100,
    justifyContent: 'center',
  },
  formatIcon: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  formatButtonText: {
    ...scaledTypography.styles.bodyBold,
    color: colors.text,
    marginBottom: 2,
  },
  formatDesc: {
    ...scaledTypography.styles.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  exportNote: {
    ...scaledTypography.styles.caption,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: SPACING.xl,
    fontStyle: 'italic',
  },
  // Import UI styles
  errorText: {
    color: COLORS.danger,
  },
  importActions: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.xl,
  },
  importButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderRadius: RADII.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  importButtonPrimary: {
    backgroundColor: COLORS.primary,
  },
  importButtonSecondary: {
    backgroundColor: colors.surfaceAlt,
  },
  importButtonPrimaryText: {
    ...scaledTypography.styles.bodyBold,
    color: '#FFFFFF',
  },
  importButtonSecondaryText: {
    ...scaledTypography.styles.bodyBold,
    color: colors.text,
  },
  // Cloud sync styles
  cloudSyncStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  statusBadgeSmall: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: SPACING.xs,
    paddingVertical: 2,
    borderRadius: RADII.sm,
  },
  // Support/Tip jar styles
  supporterBadgeIcon: {
    fontSize: 20,
    marginRight: SPACING.sm,
  },
  // Accent color styles
  accentColorPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  accentColorDot: {
    width: 20,
    height: 20,
    borderRadius: RADII.full,
  },
  // Model status styles
  modelStatusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modelStatusDot: {
    width: 12,
    height: 12,
    borderRadius: RADII.full,
  },
});
