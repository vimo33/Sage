import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY, getThemedColors, withAlpha } from '../../lib/ui/theme';

export type FilterTabType = 'all' | 'journal' | 'insights';

interface FilterTabsProps {
  selectedTab: FilterTabType;
  onTabChange: (tab: FilterTabType) => void;
  testID?: string;
}

const TABS: { key: FilterTabType; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'journal', label: 'Journal only' },
  { key: 'insights', label: 'Insights only' },
];

export function FilterTabs({ selectedTab, onTabChange, testID }: FilterTabsProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);
  const styles = createStyles(colors, isDark);

  return (
    <View style={styles.container} testID={testID}>
      {TABS.map((tab) => {
        const isSelected = selectedTab === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, isSelected && styles.tabSelected]}
            onPress={() => onTabChange(tab.key)}
            activeOpacity={0.7}
            testID={testID ? `${testID}-${tab.key}` : undefined}
          >
            <Text style={[styles.tabText, isSelected && styles.tabTextSelected]}>
              {tab.label}
            </Text>
            {isSelected && <View style={styles.underline} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const createStyles = (colors: ReturnType<typeof getThemedColors>, isDark: boolean) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    tab: {
      paddingHorizontal: SPACING.lg,
      paddingVertical: SPACING.md,
      position: 'relative',
    },
    tabSelected: {
      // Selected state styling handled by underline
    },
    tabText: {
      fontSize: TYPOGRAPHY.fontSize.sm,
      fontWeight: TYPOGRAPHY.fontWeight.medium,
      color: colors.textSecondary,
    },
    tabTextSelected: {
      color: COLORS.primary,
      fontWeight: TYPOGRAPHY.fontWeight.semibold,
    },
    underline: {
      position: 'absolute',
      bottom: 0,
      left: SPACING.lg,
      right: SPACING.lg,
      height: 2,
      backgroundColor: COLORS.primary,
      borderRadius: 1,
    },
  });
