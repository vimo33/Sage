import { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Switch,
  ScrollView,
  useColorScheme,
  Alert,
  ActivityIndicator,
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
  DATA_DISCLOSURE,
  getAnalyticsSummary,
  formatDuration,
  formatAnalyticsDate,
  type AnalyticsSummary,
} from '../lib/analytics';

interface AnalyticsSettingsModalProps {
  visible: boolean;
  onClose: () => void;
}

export function AnalyticsSettingsModal({
  visible,
  onClose,
}: AnalyticsSettingsModalProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);

  const preferences = useSageStore((s) => s.preferences);
  const giveAnalyticsConsent = useSageStore((s) => s.giveAnalyticsConsent);
  const revokeAnalyticsConsent = useSageStore((s) => s.revokeAnalyticsConsent);
  const setAnalyticsPreferences = useSageStore((s) => s.setAnalyticsPreferences);
  const clearAnalyticsData = useSageStore((s) => s.clearAnalyticsData);

  const analyticsPrefs = preferences.analyticsPreferences;

  const [showDataDisclosure, setShowDataDisclosure] = useState(false);
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  // Load summary when modal opens and analytics is enabled
  useEffect(() => {
    if (visible && analyticsPrefs.enabled) {
      setIsLoadingSummary(true);
      getAnalyticsSummary()
        .then(setSummary)
        .finally(() => setIsLoadingSummary(false));
    }
  }, [visible, analyticsPrefs.enabled]);

  const handleToggleCrashReporting = useCallback(async (enabled: boolean) => {
    if (!analyticsPrefs.consentGiven && enabled) {
      // First time enabling - show consent
      setShowDataDisclosure(true);
      return;
    }
    await setAnalyticsPreferences({ crashReportingEnabled: enabled });
  }, [analyticsPrefs.consentGiven, setAnalyticsPreferences]);

  const handleToggleUsageMetrics = useCallback(async (enabled: boolean) => {
    if (!analyticsPrefs.consentGiven && enabled) {
      // First time enabling - show consent
      setShowDataDisclosure(true);
      return;
    }
    await setAnalyticsPreferences({ usageMetricsEnabled: enabled });
  }, [analyticsPrefs.consentGiven, setAnalyticsPreferences]);

  const handleGiveConsent = useCallback(async () => {
    await giveAnalyticsConsent(true, true);
    setShowDataDisclosure(false);
  }, [giveAnalyticsConsent]);

  const handleRevokeConsent = useCallback(() => {
    Alert.alert(
      'Disable Analytics',
      'This will disable all analytics and delete any collected data. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Disable & Delete',
          style: 'destructive',
          onPress: async () => {
            await revokeAnalyticsConsent();
            setSummary(null);
          },
        },
      ]
    );
  }, [revokeAnalyticsConsent]);

  const handleClearData = useCallback(() => {
    Alert.alert(
      'Clear Analytics Data',
      'This will delete all collected analytics data while keeping your preferences. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear Data',
          style: 'destructive',
          onPress: async () => {
            setIsClearing(true);
            await clearAnalyticsData();
            setSummary(null);
            setIsClearing(false);
            Alert.alert('Data Cleared', 'All analytics data has been deleted.');
          },
        },
      ]
    );
  }, [clearAnalyticsData]);

  const styles = createStyles(colors, isDark);

  // Consent/Data Disclosure View
  if (showDataDisclosure) {
    return (
      <Modal
        visible={visible}
        animationType="slide"
        transparent
        onRequestClose={() => setShowDataDisclosure(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Data Collection</Text>
              <TouchableOpacity
                testID="analytics-disclosure-close"
                onPress={() => setShowDataDisclosure(false)}
                style={styles.modalCloseBtn}
              >
                <Text style={styles.modalCloseText}>X</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.consentIntro}>
                Sage values your privacy. Before enabling analytics, please review exactly what data is collected.
              </Text>

              {/* Crash Reporting Section */}
              <View style={styles.disclosureSection}>
                <Text style={styles.disclosureTitle}>
                  {DATA_DISCLOSURE.crashReporting.title}
                </Text>
                <Text style={styles.disclosureDescription}>
                  {DATA_DISCLOSURE.crashReporting.description}
                </Text>

                <Text style={styles.disclosureSubtitle}>Data collected:</Text>
                {DATA_DISCLOSURE.crashReporting.dataCollected.map((item, i) => (
                  <View key={i} style={styles.bulletItem}>
                    <Text style={styles.bulletPoint}>-</Text>
                    <Text style={styles.bulletText}>{item}</Text>
                  </View>
                ))}

                <Text style={[styles.disclosureSubtitle, styles.notCollectedTitle]}>
                  Never collected:
                </Text>
                {DATA_DISCLOSURE.crashReporting.dataNotCollected.map((item, i) => (
                  <View key={i} style={styles.bulletItem}>
                    <Text style={[styles.bulletPoint, styles.notCollectedBullet]}>-</Text>
                    <Text style={[styles.bulletText, styles.notCollectedText]}>{item}</Text>
                  </View>
                ))}
              </View>

              {/* Usage Metrics Section */}
              <View style={styles.disclosureSection}>
                <Text style={styles.disclosureTitle}>
                  {DATA_DISCLOSURE.usageMetrics.title}
                </Text>
                <Text style={styles.disclosureDescription}>
                  {DATA_DISCLOSURE.usageMetrics.description}
                </Text>

                <Text style={styles.disclosureSubtitle}>Data collected:</Text>
                {DATA_DISCLOSURE.usageMetrics.dataCollected.map((item, i) => (
                  <View key={i} style={styles.bulletItem}>
                    <Text style={styles.bulletPoint}>-</Text>
                    <Text style={styles.bulletText}>{item}</Text>
                  </View>
                ))}

                <Text style={[styles.disclosureSubtitle, styles.notCollectedTitle]}>
                  Never collected:
                </Text>
                {DATA_DISCLOSURE.usageMetrics.dataNotCollected.map((item, i) => (
                  <View key={i} style={styles.bulletItem}>
                    <Text style={[styles.bulletPoint, styles.notCollectedBullet]}>-</Text>
                    <Text style={[styles.bulletText, styles.notCollectedText]}>{item}</Text>
                  </View>
                ))}
              </View>

              {/* Key Privacy Points */}
              <View style={styles.privacyBox}>
                <Text style={styles.privacyTitle}>Your Privacy Rights</Text>
                <Text style={styles.privacyText}>
                  - All data stays on your device{'\n'}
                  - You can view collected data anytime{'\n'}
                  - You can delete all data anytime{'\n'}
                  - You can disable analytics anytime
                </Text>
              </View>

              <View style={styles.consentActions}>
                <TouchableOpacity
                  testID="analytics-consent-decline"
                  style={[styles.consentButton, styles.consentButtonSecondary]}
                  onPress={() => setShowDataDisclosure(false)}
                >
                  <Text style={styles.consentButtonSecondaryText}>Not Now</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  testID="analytics-consent-accept"
                  style={[styles.consentButton, styles.consentButtonPrimary]}
                  onPress={handleGiveConsent}
                >
                  <Text style={styles.consentButtonPrimaryText}>Enable Analytics</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  }

  // Main Settings View
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
            <Text style={styles.modalTitle}>Analytics</Text>
            <TouchableOpacity
              testID="analytics-modal-close"
              onPress={onClose}
              style={styles.modalCloseBtn}
            >
              <Text style={styles.modalCloseText}>X</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Main Info */}
            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>Privacy-First Analytics</Text>
              <Text style={styles.infoText}>
                Help improve Sage with optional, anonymous analytics. All data stays on your device.
              </Text>
            </View>

            {/* Quick Enable */}
            {!analyticsPrefs.consentGiven && (
              <TouchableOpacity
                testID="analytics-enable-button"
                style={styles.enableButton}
                onPress={() => setShowDataDisclosure(true)}
              >
                <Text style={styles.enableButtonText}>Enable Anonymous Analytics</Text>
                <Text style={styles.enableButtonSubtext}>Review what data is collected</Text>
              </TouchableOpacity>
            )}

            {/* Settings when consent given */}
            {analyticsPrefs.consentGiven && (
              <>
                {/* Crash Reporting Toggle */}
                <View style={styles.section}>
                  <View style={styles.row}>
                    <View style={styles.rowContent}>
                      <Text style={styles.rowLabel}>Crash Reporting</Text>
                      <Text style={styles.rowSublabel}>
                        Help fix app crashes
                      </Text>
                    </View>
                    <Switch
                      testID="analytics-crash-toggle"
                      value={analyticsPrefs.crashReportingEnabled}
                      onValueChange={handleToggleCrashReporting}
                      trackColor={{ false: colors.surfaceAlt, true: COLORS.primary }}
                    />
                  </View>
                </View>

                {/* Usage Metrics Toggle */}
                <View style={styles.section}>
                  <View style={styles.row}>
                    <View style={styles.rowContent}>
                      <Text style={styles.rowLabel}>Usage Patterns</Text>
                      <Text style={styles.rowSublabel}>
                        Help improve features
                      </Text>
                    </View>
                    <Switch
                      testID="analytics-usage-toggle"
                      value={analyticsPrefs.usageMetricsEnabled}
                      onValueChange={handleToggleUsageMetrics}
                      trackColor={{ false: colors.surfaceAlt, true: COLORS.primary }}
                    />
                  </View>
                </View>

                {/* Data Summary */}
                {analyticsPrefs.enabled && (
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Your Data</Text>
                    <View style={styles.summaryCard}>
                      {isLoadingSummary ? (
                        <ActivityIndicator color={COLORS.primary} />
                      ) : summary ? (
                        <>
                          <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Sessions recorded</Text>
                            <Text style={styles.summaryValue}>{summary.totalSessions}</Text>
                          </View>
                          <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Crash reports</Text>
                            <Text style={styles.summaryValue}>{summary.totalCrashes}</Text>
                          </View>
                          {summary.avgSessionDurationMs > 0 && (
                            <View style={styles.summaryRow}>
                              <Text style={styles.summaryLabel}>Avg session</Text>
                              <Text style={styles.summaryValue}>
                                {formatDuration(summary.avgSessionDurationMs)}
                              </Text>
                            </View>
                          )}
                          {summary.firstEventDate && (
                            <View style={styles.summaryRow}>
                              <Text style={styles.summaryLabel}>Since</Text>
                              <Text style={styles.summaryValue}>
                                {formatAnalyticsDate(summary.firstEventDate)}
                              </Text>
                            </View>
                          )}
                        </>
                      ) : (
                        <Text style={styles.noDataText}>No data collected yet</Text>
                      )}
                    </View>
                  </View>
                )}

                {/* Consent Info */}
                {analyticsPrefs.consentTimestamp && (
                  <View style={styles.consentInfo}>
                    <Text style={styles.consentInfoText}>
                      Consent given on {formatAnalyticsDate(analyticsPrefs.consentTimestamp)}
                    </Text>
                  </View>
                )}

                {/* Data Controls */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Data Controls</Text>

                  <TouchableOpacity
                    testID="analytics-view-disclosure"
                    style={styles.controlButton}
                    onPress={() => setShowDataDisclosure(true)}
                  >
                    <Text style={styles.controlButtonText}>View Data Disclosure</Text>
                    <Text style={styles.controlButtonArrow}>{'>'}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    testID="analytics-clear-data"
                    style={styles.controlButton}
                    onPress={handleClearData}
                    disabled={isClearing}
                  >
                    {isClearing ? (
                      <ActivityIndicator color={colors.text} size="small" />
                    ) : (
                      <>
                        <Text style={styles.controlButtonText}>Clear Collected Data</Text>
                        <Text style={styles.controlButtonArrow}>{'>'}</Text>
                      </>
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    testID="analytics-disable"
                    style={[styles.controlButton, styles.dangerButton]}
                    onPress={handleRevokeConsent}
                  >
                    <Text style={styles.dangerButtonText}>Disable & Delete All</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}

            {/* Footer Note */}
            <View style={styles.footerNote}>
              <Text style={styles.footerNoteText}>
                Your journal entries and conversations are never collected or analyzed.
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
    section: {
      marginBottom: SPACING.lg,
    },
    sectionTitle: {
      ...TYPOGRAPHY.styles.label,
      color: colors.textMuted,
      textTransform: 'uppercase',
      marginBottom: SPACING.md,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.surface,
      padding: SPACING.lg,
      borderRadius: RADII.md,
    },
    rowContent: {
      flex: 1,
      marginRight: SPACING.md,
    },
    rowLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    rowSublabel: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textSecondary,
      marginTop: 2,
    },
    summaryCard: {
      backgroundColor: colors.surface,
      padding: SPACING.lg,
      borderRadius: RADII.md,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: SPACING.xs,
    },
    summaryLabel: {
      ...TYPOGRAPHY.styles.body,
      color: colors.textSecondary,
    },
    summaryValue: {
      ...TYPOGRAPHY.styles.bodyBold,
      color: colors.text,
    },
    noDataText: {
      ...TYPOGRAPHY.styles.body,
      color: colors.textMuted,
      textAlign: 'center',
      fontStyle: 'italic',
    },
    consentInfo: {
      marginBottom: SPACING.lg,
    },
    consentInfoText: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textMuted,
      textAlign: 'center',
      fontStyle: 'italic',
    },
    controlButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.surface,
      padding: SPACING.lg,
      borderRadius: RADII.md,
      marginBottom: SPACING.sm,
    },
    controlButtonText: {
      ...TYPOGRAPHY.styles.body,
      color: colors.text,
    },
    controlButtonArrow: {
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
    // Consent/Disclosure styles
    consentIntro: {
      ...TYPOGRAPHY.styles.body,
      color: colors.text,
      marginBottom: SPACING.xl,
      lineHeight: 22,
    },
    disclosureSection: {
      backgroundColor: colors.surface,
      padding: SPACING.lg,
      borderRadius: RADII.md,
      marginBottom: SPACING.lg,
    },
    disclosureTitle: {
      ...TYPOGRAPHY.styles.bodyBold,
      color: colors.text,
      marginBottom: SPACING.xs,
    },
    disclosureDescription: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textSecondary,
      marginBottom: SPACING.md,
    },
    disclosureSubtitle: {
      ...TYPOGRAPHY.styles.label,
      color: colors.textMuted,
      marginTop: SPACING.sm,
      marginBottom: SPACING.xs,
    },
    notCollectedTitle: {
      color: COLORS.primary,
    },
    bulletItem: {
      flexDirection: 'row',
      paddingLeft: SPACING.sm,
      marginBottom: 4,
    },
    bulletPoint: {
      color: colors.textSecondary,
      marginRight: SPACING.sm,
    },
    bulletText: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textSecondary,
      flex: 1,
    },
    notCollectedBullet: {
      color: COLORS.primary,
    },
    notCollectedText: {
      color: COLORS.primary,
    },
    privacyBox: {
      backgroundColor: COLORS.primaryLight,
      padding: SPACING.lg,
      borderRadius: RADII.md,
      marginBottom: SPACING.xl,
    },
    privacyTitle: {
      ...TYPOGRAPHY.styles.bodyBold,
      color: COLORS.primary,
      marginBottom: SPACING.sm,
    },
    privacyText: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.text,
      lineHeight: 20,
    },
    consentActions: {
      flexDirection: 'row',
      gap: SPACING.md,
      marginBottom: SPACING.lg,
    },
    consentButton: {
      flex: 1,
      paddingVertical: SPACING.md,
      borderRadius: RADII.md,
      alignItems: 'center',
      justifyContent: 'center',
    },
    consentButtonPrimary: {
      backgroundColor: COLORS.primary,
    },
    consentButtonSecondary: {
      backgroundColor: colors.surfaceAlt,
    },
    consentButtonPrimaryText: {
      ...TYPOGRAPHY.styles.bodyBold,
      color: '#FFFFFF',
    },
    consentButtonSecondaryText: {
      ...TYPOGRAPHY.styles.bodyBold,
      color: colors.text,
    },
  });

export default AnalyticsSettingsModal;
