import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { COLORS, SPACING, RADII, TYPOGRAPHY, getThemedColors, withAlpha } from '../../lib/ui/theme';

interface TagChipProps {
  tag: string;
  selected?: boolean;
  removable?: boolean;
  onPress?: () => void;
  onRemove?: () => void;
  size?: 'small' | 'medium';
  testID?: string;
}

export function TagChip({
  tag,
  selected = false,
  removable = false,
  onPress,
  onRemove,
  size = 'medium',
  testID,
}: TagChipProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);
  const styles = createStyles(colors, isDark, selected, size);

  const content = (
    <View style={styles.container}>
      <Text style={styles.label}>{tag}</Text>
      {removable && onRemove && (
        <TouchableOpacity
          onPress={onRemove}
          style={styles.removeButton}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          testID={testID ? `${testID}-remove` : undefined}
        >
          <Text style={styles.removeIcon}>×</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        testID={testID}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return content;
}

const createStyles = (
  colors: ReturnType<typeof getThemedColors>,
  isDark: boolean,
  selected: boolean,
  size: 'small' | 'medium'
) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: selected
        ? withAlpha(COLORS.primary, 0.2)
        : withAlpha(colors.text, 0.08),
      borderRadius: RADII.full,
      paddingHorizontal: size === 'small' ? SPACING.sm : SPACING.md,
      paddingVertical: size === 'small' ? 3 : SPACING.xs,
      borderWidth: selected ? 1 : 0,
      borderColor: selected ? COLORS.primary : 'transparent',
    },
    label: {
      fontSize: size === 'small' ? 11 : 13,
      fontWeight: '500',
      color: selected ? COLORS.primary : colors.textSecondary,
      textTransform: 'lowercase',
    },
    removeButton: {
      marginLeft: 4,
      width: size === 'small' ? 14 : 16,
      height: size === 'small' ? 14 : 16,
      borderRadius: RADII.full,
      backgroundColor: withAlpha(colors.text, 0.1),
      alignItems: 'center',
      justifyContent: 'center',
    },
    removeIcon: {
      fontSize: size === 'small' ? 12 : 14,
      color: colors.textMuted,
      lineHeight: size === 'small' ? 14 : 16,
      marginTop: -1,
    },
  });
