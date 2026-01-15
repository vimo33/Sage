import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  useColorScheme,
} from 'react-native';
import { COLORS, SPACING, RADII, TYPOGRAPHY, getThemedColors, withAlpha } from '../../lib/ui/theme';
import { getQuickDateRanges, type DateRange } from '../../lib/search';

interface DateRangeFilterProps {
  selectedRange: DateRange;
  onRangeSelect: (range: DateRange) => void;
  testID?: string;
}

export function DateRangeFilter({
  selectedRange,
  onRangeSelect,
  testID,
}: DateRangeFilterProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);
  const styles = createStyles(colors, isDark);

  const quickRanges = getQuickDateRanges();

  // Determine which quick range is currently selected
  const getSelectedRangeLabel = (): string | null => {
    for (const quickRange of quickRanges) {
      const isSameStart =
        (quickRange.range.startDate === null && selectedRange.startDate === null) ||
        (quickRange.range.startDate !== null &&
          selectedRange.startDate !== null &&
          quickRange.range.startDate.getTime() === selectedRange.startDate.getTime());

      const isSameEnd =
        (quickRange.range.endDate === null && selectedRange.endDate === null) ||
        (quickRange.range.endDate !== null &&
          selectedRange.endDate !== null &&
          quickRange.range.endDate.getTime() === selectedRange.endDate.getTime());

      if (isSameStart && isSameEnd) {
        return quickRange.label;
      }
    }
    return null;
  };

  const selectedLabel = getSelectedRangeLabel();

  return (
    <View style={styles.container} testID={testID}>
      <Text style={styles.label}>DATE RANGE</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {quickRanges.map((item) => {
          const isSelected = selectedLabel === item.label;
          return (
            <TouchableOpacity
              key={item.label}
              style={[styles.chip, isSelected && styles.chipSelected]}
              onPress={() => onRangeSelect(item.range)}
              activeOpacity={0.7}
              testID={testID ? `${testID}-${item.label.toLowerCase().replace(/\s/g, '-')}` : undefined}
            >
              <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const createStyles = (colors: ReturnType<typeof getThemedColors>, isDark: boolean) =>
  StyleSheet.create({
    container: {
      paddingVertical: SPACING.sm,
    },
    label: {
      ...TYPOGRAPHY.styles.label,
      color: colors.textMuted,
      paddingHorizontal: SPACING.lg,
      marginBottom: SPACING.sm,
    },
    scrollContent: {
      paddingHorizontal: SPACING.lg,
      gap: SPACING.sm,
    },
    chip: {
      paddingHorizontal: SPACING.md,
      paddingVertical: SPACING.xs + 2,
      borderRadius: RADII.full,
      backgroundColor: withAlpha(colors.text, 0.08),
      borderWidth: 1,
      borderColor: 'transparent',
    },
    chipSelected: {
      backgroundColor: withAlpha(COLORS.primary, 0.15),
      borderColor: COLORS.primary,
    },
    chipText: {
      fontSize: TYPOGRAPHY.fontSize.sm,
      fontWeight: TYPOGRAPHY.fontWeight.medium,
      color: colors.textSecondary,
    },
    chipTextSelected: {
      color: COLORS.primary,
      fontWeight: TYPOGRAPHY.fontWeight.semibold,
    },
  });
