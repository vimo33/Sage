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

interface ThemePathProgressProps {
  /** The theme pack journey data */
  pack: ThemePack;
  /** User's progress on this journey */
  progress: ThemePackProgress;
  /** Callback when the component is pressed */
  onPress: () => void;
  /** Optional test ID */
  testID?: string;
}

/**
 * ThemePathProgress - A progress display for theme paths
 *
 * Features:
 * - Path name at the top
 * - "Day X of 7" badge
 * - Progress bar with green fill
 * - "Next: [prompt title]" with chevron
 */
export function ThemePathProgress({
  pack,
  progress,
  onPress,
  testID = 'theme-path-progress',
}: ThemePathProgressProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);
  const styles = createStyles(colors, isDark, pack.color);

  const nextDay = getNextAvailableDay(pack, progress);
  const progressPercent = getProgressPercentage(progress);

  // Get the next day's prompt title
  const nextDayData = nextDay ? pack.days.find(d => d.dayNumber === nextDay) : null;
  const nextPromptTitle = nextDayData?.title ?? 'Complete';

  // Determine which day to display (current day being worked on)
  const currentDay = nextDay ?? progress.completedDays.length;
  const isComplete = progress.isComplete;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
      testID={testID}
    >
      {/* Header Row: Path Name and Day Badge */}
      <View style={styles.headerRow}>
        <Text style={styles.pathName} numberOfLines={1} testID={`${testID}-path-name`}>
          {pack.title}
        </Text>
        <View style={styles.dayBadge} testID={`${testID}-day-badge`}>
          <Text style={styles.dayBadgeText}>
            Day {currentDay} of {pack.dayCount}
          </Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${progressPercent}%` },
            ]}
            testID={`${testID}-progress-fill`}
          />
        </View>
      </View>

      {/* Next Prompt Row */}
      <View style={styles.nextRow}>
        {isComplete ? (
          <Text style={styles.nextLabel} testID={`${testID}-next-label`}>
            <Text style={styles.nextPrefix}>Complete </Text>
            <Text style={styles.nextTitle}>All days finished</Text>
          </Text>
        ) : (
          <Text style={styles.nextLabel} numberOfLines={1} testID={`${testID}-next-label`}>
            <Text style={styles.nextPrefix}>Next: </Text>
            <Text style={styles.nextTitle}>{nextPromptTitle}</Text>
          </Text>
        )}
        <Text style={styles.chevron} testID={`${testID}-chevron`}>
          {'\u203A'}
        </Text>
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
    container: {
      backgroundColor: colors.surface,
      borderRadius: RADII.lg,
      padding: SPACING.lg,
      borderWidth: 1,
      borderColor: colors.border,
      ...SHADOWS.sm,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: SPACING.md,
    },
    pathName: {
      ...TYPOGRAPHY.styles.bodyBold,
      color: colors.text,
      flex: 1,
      marginRight: SPACING.sm,
    },
    dayBadge: {
      backgroundColor: COLORS.primary,
      paddingHorizontal: SPACING.sm,
      paddingVertical: SPACING.xs,
      borderRadius: RADII.full,
    },
    dayBadgeText: {
      ...TYPOGRAPHY.styles.caption,
      color: COLORS.primaryText,
      fontWeight: '700',
    },
    progressBarContainer: {
      marginBottom: SPACING.md,
    },
    progressBarBg: {
      height: 8,
      backgroundColor: withAlpha(colors.text, 0.1),
      borderRadius: RADII.full,
      overflow: 'hidden',
    },
    progressBarFill: {
      height: '100%',
      backgroundColor: COLORS.primary,
      borderRadius: RADII.full,
    },
    nextRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    nextLabel: {
      flex: 1,
      marginRight: SPACING.sm,
    },
    nextPrefix: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textSecondary,
    },
    nextTitle: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.text,
      fontWeight: '600',
    },
    chevron: {
      fontSize: 24,
      color: colors.textSecondary,
      fontWeight: '300',
    },
  });

export default ThemePathProgress;
