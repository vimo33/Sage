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

interface SourceFilterProps {
  availableSources: string[];
  selectedSources: string[];
  onSourceToggle: (source: string) => void;
  onClearSources: () => void;
  testID?: string;
}

export function SourceFilter({
  availableSources,
  selectedSources,
  onSourceToggle,
  onClearSources,
  testID,
}: SourceFilterProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);
  const styles = createStyles(colors, isDark);

  if (availableSources.length === 0) {
    return null;
  }

  const hasSelection = selectedSources.length > 0;

  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.header}>
        <Text style={styles.label}>TRADITION / SOURCE</Text>
        {hasSelection && (
          <TouchableOpacity
            onPress={onClearSources}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            testID={testID ? `${testID}-clear` : undefined}
          >
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {availableSources.map((source) => {
          const isSelected = selectedSources.includes(source);
          return (
            <TouchableOpacity
              key={source}
              style={[styles.chip, isSelected && styles.chipSelected]}
              onPress={() => onSourceToggle(source)}
              activeOpacity={0.7}
              testID={testID ? `${testID}-${source.toLowerCase().replace(/\s/g, '-')}` : undefined}
            >
              <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                {source}
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
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: SPACING.lg,
      marginBottom: SPACING.sm,
    },
    label: {
      ...TYPOGRAPHY.styles.label,
      color: colors.textMuted,
    },
    clearText: {
      fontSize: TYPOGRAPHY.fontSize.sm,
      color: COLORS.primary,
      fontWeight: TYPOGRAPHY.fontWeight.medium,
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
      backgroundColor: withAlpha(COLORS.info, 0.15),
      borderColor: COLORS.info,
    },
    chipText: {
      fontSize: TYPOGRAPHY.fontSize.sm,
      fontWeight: TYPOGRAPHY.fontWeight.medium,
      color: colors.textSecondary,
    },
    chipTextSelected: {
      color: COLORS.info,
      fontWeight: TYPOGRAPHY.fontWeight.semibold,
    },
  });
