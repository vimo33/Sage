import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import { useSageStore, type SessionSummary, type ChatMessage } from '../../lib/storage/store';
import { HapticPatterns } from '../../lib/haptics';
import { COLORS, SPACING, RADII, SHADOWS, withAlpha, TYPOGRAPHY, getThemedColors } from '../../lib/ui/theme';
import { calculateCumulativeReadingTime } from '../../lib/ui/text-metrics';

interface SessionSummaryModalProps {
  visible: boolean;
  summary: SessionSummary | null;
  isGenerating: boolean;
  onClose: () => void;
  onSaveToJournal: () => void;
  chatHistory?: ChatMessage[];
}

const THEME_LABELS: Record<string, string> = {
  action: 'Action',
  detachment: 'Detachment',
  suffering: 'Suffering',
  purpose: 'Purpose',
  discipline: 'Discipline',
  compassion: 'Compassion',
  self: 'Self-Knowledge',
  impermanence: 'Impermanence',
  devotion: 'Devotion',
  knowledge: 'Knowledge',
  meditation: 'Meditation',
  desire: 'Desire',
  peace: 'Peace',
  duty: 'Duty',
  truth: 'Truth',
};

function formatDuration(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (minutes === 0) {
    return `${seconds}s`;
  }
  return `${minutes}m ${seconds}s`;
}

export function SessionSummaryModal({
  visible,
  summary,
  isGenerating,
  onClose,
  onSaveToJournal,
  chatHistory = [],
}: SessionSummaryModalProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);

  const styles = createStyles(colors, isDark);

  // Calculate total estimated reading time for all assistant messages
  const assistantMessages = chatHistory
    .filter((msg) => msg.role === 'assistant')
    .map((msg) => msg.content);
  const totalReadingTime = calculateCumulativeReadingTime(assistantMessages);

  const handleSaveToJournal = useCallback(() => {
    // Trigger haptic feedback for save to journal
    void HapticPatterns.saveSummaryToJournal();
    onSaveToJournal();
  }, [onSaveToJournal]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Session Summary</Text>
            <TouchableOpacity
              onPress={onClose}
              style={styles.closeButton}
              testID="session-summary-close"
            >
              <Text style={styles.closeButtonText}>Done</Text>
            </TouchableOpacity>
          </View>

          {isGenerating ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={COLORS.primary} />
              <Text style={styles.loadingText}>Summarizing your session...</Text>
            </View>
          ) : summary ? (
            <ScrollView
              style={styles.modalContent}
              contentContainerStyle={styles.modalContentContainer}
              showsVerticalScrollIndicator={false}
            >
              {/* Session Stats */}
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{summary.messageCount}</Text>
                  <Text style={styles.statLabel}>Messages</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{formatDuration(summary.durationMs)}</Text>
                  <Text style={styles.statLabel}>Duration</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem} testID="reading-time-stat">
                  <Text style={styles.statValue}>{totalReadingTime.durationMinutes} min</Text>
                  <Text style={styles.statLabel}>Read Time</Text>
                </View>
              </View>

              {/* Summary Text */}
              <View style={styles.summarySection}>
                <Text style={styles.sectionTitle}>KEY INSIGHTS</Text>
                <Text style={styles.summaryText}>{summary.summaryText}</Text>
              </View>

              {/* Themes */}
              {summary.themes.length > 0 && (
                <View style={styles.themesSection}>
                  <Text style={styles.sectionTitle}>THEMES EXPLORED</Text>
                  <View style={styles.themeTags}>
                    {summary.themes.map((theme, index) => (
                      <View key={index} style={styles.themeTag}>
                        <Text style={styles.themeTagText}>
                          {THEME_LABELS[theme] || theme}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {/* Key Insights / Citations */}
              {summary.keyInsights.length > 0 && (
                <View style={styles.insightsSection}>
                  <Text style={styles.sectionTitle}>WISDOM SOURCES</Text>
                  {summary.keyInsights.map((insight, index) => (
                    <View key={index} style={styles.insightItem}>
                      <Text style={styles.insightSource}>{insight.sourceRef}</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Save to Journal Button */}
              <TouchableOpacity
                style={[
                  styles.saveToJournalBtn,
                  summary.savedToJournal && styles.saveToJournalBtnSaved,
                ]}
                onPress={handleSaveToJournal}
                disabled={summary.savedToJournal}
                testID="session-summary-save-journal"
              >
                <Text style={styles.saveToJournalIcon}>
                  {summary.savedToJournal ? '✓' : '📝'}
                </Text>
                <Text
                  style={[
                    styles.saveToJournalText,
                    summary.savedToJournal && styles.saveToJournalTextSaved,
                  ]}
                >
                  {summary.savedToJournal ? 'Saved to Journal' : 'Save to Journal'}
                </Text>
              </TouchableOpacity>

              <Text style={styles.footerHint}>
                Your session summary can help you track your journey.
              </Text>
            </ScrollView>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No summary available</Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

const createStyles = (colors: ReturnType<typeof getThemedColors>, isDark: boolean) =>
  StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: withAlpha(COLORS.black, 0.85),
      justifyContent: 'center',
      alignItems: 'center',
      padding: SPACING.lg,
    },
    modalContainer: {
      backgroundColor: colors.background,
      borderRadius: RADII.xl,
      width: '100%',
      maxWidth: 400,
      maxHeight: '85%',
      ...SHADOWS.md,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: SPACING.xl,
      paddingVertical: SPACING.lg,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    modalTitle: {
      color: colors.text,
      ...TYPOGRAPHY.styles.h4,
    },
    closeButton: {
      paddingVertical: SPACING.xs,
      paddingHorizontal: SPACING.md,
    },
    closeButtonText: {
      color: COLORS.primary,
      fontSize: 16,
      fontWeight: '600',
    },
    loadingContainer: {
      padding: SPACING.xxxl,
      alignItems: 'center',
      justifyContent: 'center',
    },
    loadingText: {
      color: colors.textSecondary,
      fontSize: 14,
      marginTop: SPACING.lg,
    },
    emptyContainer: {
      padding: SPACING.xxxl,
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyText: {
      color: colors.textMuted,
      fontSize: 14,
    },
    modalContent: {
      flex: 1,
    },
    modalContentContainer: {
      padding: SPACING.xl,
      paddingBottom: SPACING.xxxl,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.surfaceAlt,
      borderRadius: RADII.lg,
      padding: SPACING.lg,
      marginBottom: SPACING.xl,
    },
    statItem: {
      flex: 1,
      alignItems: 'center',
    },
    statValue: {
      color: COLORS.primary,
      fontSize: 24,
      fontWeight: '700',
    },
    statLabel: {
      color: colors.textMuted,
      fontSize: 12,
      marginTop: 2,
    },
    statDivider: {
      width: 1,
      height: 40,
      backgroundColor: colors.border,
      marginHorizontal: SPACING.lg,
    },
    summarySection: {
      marginBottom: SPACING.xl,
    },
    sectionTitle: {
      color: colors.textMuted,
      fontSize: 10,
      fontWeight: '800',
      letterSpacing: 1,
      marginBottom: SPACING.sm,
    },
    summaryText: {
      color: colors.text,
      fontSize: 16,
      lineHeight: 24,
    },
    themesSection: {
      marginBottom: SPACING.xl,
    },
    themeTags: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: SPACING.sm,
    },
    themeTag: {
      backgroundColor: withAlpha(COLORS.primary, 0.15),
      paddingHorizontal: SPACING.md,
      paddingVertical: SPACING.xs,
      borderRadius: RADII.full,
      borderWidth: 1,
      borderColor: withAlpha(COLORS.primary, 0.3),
    },
    themeTagText: {
      color: COLORS.primary,
      fontSize: 12,
      fontWeight: '600',
    },
    insightsSection: {
      marginBottom: SPACING.xl,
    },
    insightItem: {
      backgroundColor: colors.surface,
      borderRadius: RADII.md,
      padding: SPACING.md,
      marginBottom: SPACING.sm,
      borderLeftWidth: 3,
      borderLeftColor: COLORS.primary,
    },
    insightSource: {
      color: colors.textSecondary,
      fontSize: 13,
      fontStyle: 'italic',
    },
    saveToJournalBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: COLORS.primary,
      paddingVertical: SPACING.lg,
      borderRadius: RADII.md,
      marginBottom: SPACING.lg,
      gap: SPACING.sm,
    },
    saveToJournalBtnSaved: {
      backgroundColor: colors.surfaceAlt,
      borderWidth: 1,
      borderColor: withAlpha(COLORS.primary, 0.3),
    },
    saveToJournalIcon: {
      fontSize: 18,
    },
    saveToJournalText: {
      color: COLORS.black,
      fontSize: 16,
      fontWeight: '700',
    },
    saveToJournalTextSaved: {
      color: colors.textSecondary,
    },
    footerHint: {
      color: colors.textMuted,
      fontSize: 12,
      textAlign: 'center',
    },
  });
