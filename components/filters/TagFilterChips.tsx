import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, useColorScheme } from 'react-native';
import { COLORS, SPACING, RADII, TYPOGRAPHY, getThemedColors, withAlpha } from '../../lib/ui/theme';

interface TagFilterChipsProps {
  availableTags: string[];
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
  testID?: string;
}

export function TagFilterChips({
  availableTags,
  selectedTag,
  onTagSelect,
  testID,
}: TagFilterChipsProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);
  const styles = createStyles(colors, isDark);

  // Default tags to show if no tags are available
  const defaultTags = ['#WorkLife', '#Gratitude', '#Anxiety'];
  const displayTags = availableTags.length > 0 ? availableTags : defaultTags;

  const isAllSelected = selectedTag === null;

  return (
    <View style={styles.container} testID={testID}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* All Tags chip */}
        <TouchableOpacity
          style={[styles.chip, isAllSelected && styles.chipSelected]}
          onPress={() => onTagSelect(null)}
          activeOpacity={0.7}
          testID={testID ? `${testID}-all` : undefined}
        >
          <Text style={[styles.chipText, isAllSelected && styles.chipTextSelected]}>
            All Tags
          </Text>
        </TouchableOpacity>

        {/* Tag chips */}
        {displayTags.map((tag) => {
          const isSelected = selectedTag === tag;
          const displayTag = tag.startsWith('#') ? tag : `#${tag}`;
          return (
            <TouchableOpacity
              key={tag}
              style={[styles.chip, isSelected && styles.chipSelected]}
              onPress={() => onTagSelect(tag)}
              activeOpacity={0.7}
              testID={testID ? `${testID}-${tag.replace('#', '')}` : undefined}
            >
              <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                {displayTag}
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
      paddingVertical: SPACING.md,
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
