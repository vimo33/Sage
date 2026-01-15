/**
 * JournalWeekStrip Component
 *
 * A horizontal week view with:
 * - Month/Year selector at the top
 * - Horizontal week view showing Mon-Sun
 * - Day dots indicating entries
 * - Green circle highlight for current/selected day
 */

import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  COLORS,
  SPACING,
  RADII,
  TYPOGRAPHY,
  getThemedColors,
  SIZES,
} from '../../lib/ui/theme';

// Day abbreviations (Mon-Sun)
const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export interface JournalWeekStripProps {
  /** Currently selected date */
  selectedDate: Date;
  /** Handler when a day is selected */
  onDaySelect: (date: Date) => void;
  /** Handler when month/year selector is pressed */
  onMonthYearPress?: () => void;
  /** Array of timestamps that have journal entries */
  entryDates?: number[];
  /** Test ID for testing */
  testID?: string;
}

/**
 * Get the week dates (Mon-Sun) for a given date
 */
function getWeekDates(date: Date): Date[] {
  const dates: Date[] = [];
  const current = new Date(date);

  // Get the day of week (0 = Sunday, 1 = Monday, etc.)
  const dayOfWeek = current.getDay();
  // Convert to Monday-based (0 = Monday, 6 = Sunday)
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

  // Get Monday of this week
  const monday = new Date(current);
  monday.setDate(current.getDate() + mondayOffset);
  monday.setHours(0, 0, 0, 0);

  // Generate Mon-Sun
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    dates.push(d);
  }

  return dates;
}

/**
 * Check if two dates are the same day
 */
function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * Check if a date has an entry
 */
function hasEntry(date: Date, entryDates: number[]): boolean {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  return entryDates.some(
    (timestamp) => timestamp >= startOfDay.getTime() && timestamp <= endOfDay.getTime()
  );
}

export function JournalWeekStrip({
  selectedDate,
  onDaySelect,
  onMonthYearPress,
  entryDates = [],
  testID = 'journal-week-strip',
}: JournalWeekStripProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);
  const styles = createStyles(colors, isDark);

  const today = useMemo(() => new Date(), []);
  const weekDates = useMemo(() => getWeekDates(selectedDate), [selectedDate]);

  // Format month and year
  const monthYearText = useMemo(() => {
    return selectedDate.toLocaleDateString(undefined, {
      month: 'long',
      year: 'numeric',
    });
  }, [selectedDate]);

  return (
    <View style={styles.container} testID={testID}>
      {/* Month/Year Selector */}
      <TouchableOpacity
        style={styles.monthYearButton}
        onPress={onMonthYearPress}
        testID={`${testID}-month-year-btn`}
      >
        <Text style={styles.monthYearText}>{monthYearText}</Text>
        <Ionicons
          name="chevron-down"
          size={18}
          color={colors.textSecondary}
          style={styles.chevronIcon}
        />
      </TouchableOpacity>

      {/* Week Days Strip */}
      <View style={styles.weekContainer}>
        {weekDates.map((date, index) => {
          const isToday = isSameDay(date, today);
          const isSelected = isSameDay(date, selectedDate);
          const hasEntryForDay = hasEntry(date, entryDates);

          return (
            <TouchableOpacity
              key={index}
              style={styles.dayContainer}
              onPress={() => onDaySelect(date)}
              testID={`${testID}-day-${index}`}
            >
              {/* Day Label (Mon, Tue, etc.) */}
              <Text
                style={[
                  styles.dayLabel,
                  isToday && styles.dayLabelToday,
                ]}
              >
                {DAY_LABELS[index]}
              </Text>

              {/* Day Number with Circle */}
              <View
                style={[
                  styles.dayNumberContainer,
                  isToday && styles.dayNumberContainerToday,
                  isSelected && !isToday && styles.dayNumberContainerSelected,
                ]}
              >
                <Text
                  style={[
                    styles.dayNumber,
                    isToday && styles.dayNumberToday,
                    isSelected && !isToday && styles.dayNumberSelected,
                  ]}
                >
                  {date.getDate()}
                </Text>
              </View>

              {/* Entry Dot Indicator */}
              {hasEntryForDay && (
                <View
                  style={[
                    styles.entryDot,
                    isToday && styles.entryDotToday,
                  ]}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const createStyles = (
  colors: ReturnType<typeof getThemedColors>,
  _isDark: boolean
) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      paddingBottom: SPACING.md,
    },
    monthYearButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: SPACING.sm,
      paddingHorizontal: SPACING.lg,
    },
    monthYearText: {
      ...TYPOGRAPHY.styles.bodyBold,
      color: colors.text,
    },
    chevronIcon: {
      marginLeft: SPACING.xs,
    },
    weekContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingHorizontal: SPACING.sm,
      paddingTop: SPACING.sm,
    },
    dayContainer: {
      alignItems: 'center',
      minWidth: SIZES.tapTarget,
      paddingVertical: SPACING.xs,
    },
    dayLabel: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textMuted,
      marginBottom: SPACING.xs,
      textTransform: 'uppercase',
      fontSize: 10,
    },
    dayLabelToday: {
      color: COLORS.primary,
      fontWeight: '600',
    },
    dayNumberContainer: {
      width: 36,
      height: 36,
      borderRadius: RADII.full,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: SPACING.xs,
    },
    dayNumberContainerToday: {
      backgroundColor: COLORS.primary,
    },
    dayNumberContainerSelected: {
      backgroundColor: colors.surfaceAlt,
      borderWidth: 1,
      borderColor: colors.border,
    },
    dayNumber: {
      ...TYPOGRAPHY.styles.body,
      color: colors.text,
      fontWeight: '500',
    },
    dayNumberToday: {
      color: COLORS.primaryText,
      fontWeight: '700',
    },
    dayNumberSelected: {
      color: colors.text,
      fontWeight: '600',
    },
    entryDot: {
      width: 6,
      height: 6,
      borderRadius: RADII.full,
      backgroundColor: colors.textMuted,
    },
    entryDotToday: {
      backgroundColor: COLORS.primaryText,
    },
  });

export default JournalWeekStrip;
