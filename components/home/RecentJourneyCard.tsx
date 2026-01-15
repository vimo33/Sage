import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import {
  COLORS,
  SPACING,
  RADII,
  TYPOGRAPHY,
  SHADOWS,
  getThemedColors,
  withAlpha,
} from '../../lib/ui/theme';
import type { ThemePack, ThemePackProgress } from '../../lib/theme-packs/types';
import { getProgressPercentage, getNextAvailableDay } from '../../lib/theme-packs';

interface RecentJourneyCardProps {
  /** The theme pack journey data */
  pack: ThemePack;
  /** User's progress on this journey */
  progress: ThemePackProgress;
  /** Callback when card is pressed */
  onPress: () => void;
  /** Optional test ID */
  testID?: string;
}

/**
 * Helper to format relative time from timestamp
 */
function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diffMs = now - timestamp;
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  return new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/**
 * RecentJourneyCard - A horizontal card showing a recent journey in progress
 *
 * Features:
 * - Icon (emoji) on the left with themed background
 * - Title and metadata (duration, relative time)
 * - Progress indicator showing current day
 * - Chevron for navigation
 */
export function RecentJourneyCard({
  pack,
  progress,
  onPress,
  testID = 'recent-journey-card',
}: RecentJourneyCardProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);
  const styles = createStyles(colors, isDark, pack.color);

  const nextDay = getNextAvailableDay(pack, progress);
  const progressPercent = getProgressPercentage(progress);
  const relativeTime = formatRelativeTime(progress.lastActivityAt);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
      testID={testID}
    >
      {/* Icon Container */}
      <View style={[styles.iconContainer, { backgroundColor: withAlpha(pack.color, 0.15) }]}>
        <Text style={styles.icon} testID={`${testID}-icon`}>{pack.icon}</Text>
      </View>

      {/* Content Container */}
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title} numberOfLines={1} testID={`${testID}-title`}>
          {pack.title}
        </Text>

        {/* Meta Row: Duration and Relative Time */}
        <View style={styles.metaRow}>
          <Text style={styles.metaText}>🕒 {pack.estimatedMinutesPerDay}m/day</Text>
          <Text style={styles.metaSeparator}>•</Text>
          <Text style={styles.metaText}>{relativeTime}</Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${progressPercent}%`, backgroundColor: pack.color },
              ]}
              testID={`${testID}-progress-fill`}
            />
          </View>
          <Text style={styles.progressText} testID={`${testID}-progress-text`}>
            Day {nextDay ?? progress.completedDays.length} of {pack.dayCount}
          </Text>
        </View>
      </View>

      {/* Chevron */}
      <View style={styles.chevronContainer}>
        <Text style={styles.chevron} testID={`${testID}-chevron`}>›</Text>
      </View>
    </TouchableOpacity>
  );
}

const createStyles = (
  colors: ReturnType<typeof getThemedColors>,
  isDark: boolean,
  packColor: string
) =>
  StyleSheet.create({
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: RADII.lg,
      padding: SPACING.lg,
      marginRight: SPACING.md,
      width: 300,
      borderWidth: 1,
      borderColor: colors.border,
      ...SHADOWS.sm,
    },
    iconContainer: {
      width: 56,
      height: 56,
      borderRadius: RADII.lg,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: SPACING.md,
    },
    icon: {
      fontSize: 28,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
    },
    title: {
      ...TYPOGRAPHY.styles.bodyBold,
      color: colors.text,
      marginBottom: SPACING.xs,
    },
    metaRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: SPACING.sm,
    },
    metaText: {
      fontSize: 12,
      color: colors.textSecondary,
    },
    metaSeparator: {
      fontSize: 12,
      color: colors.textMuted,
      marginHorizontal: SPACING.xs,
    },
    progressContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    progressBar: {
      flex: 1,
      height: 4,
      backgroundColor: withAlpha(colors.text, 0.1),
      borderRadius: RADII.full,
      overflow: 'hidden',
      marginRight: SPACING.sm,
    },
    progressFill: {
      height: '100%',
      borderRadius: RADII.full,
    },
    progressText: {
      fontSize: 10,
      color: colors.textMuted,
      minWidth: 55,
    },
    chevronContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: SPACING.sm,
    },
    chevron: {
      fontSize: 28,
      color: colors.textSecondary,
      fontWeight: '300',
    },
  });

export default RecentJourneyCard;
