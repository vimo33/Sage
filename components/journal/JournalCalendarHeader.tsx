/**
 * JournalCalendarHeader Component
 *
 * A custom header for the Journal screen with:
 * - Hamburger menu icon on the left
 * - Centered "Journal" title
 * - Calendar icon on the right for date picker
 */

import React from 'react';
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
  SIZES,
  SPACING,
  TYPOGRAPHY,
  getThemedColors,
} from '../../lib/ui/theme';

export interface JournalCalendarHeaderProps {
  /** Handler for hamburger menu press */
  onMenuPress?: () => void;
  /** Handler for calendar icon press */
  onCalendarPress?: () => void;
  /** Test ID for testing */
  testID?: string;
}

export function JournalCalendarHeader({
  onMenuPress,
  onCalendarPress,
  testID = 'journal-calendar-header',
}: JournalCalendarHeaderProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);
  const styles = createStyles(colors, isDark);

  return (
    <View style={styles.container} testID={testID}>
      {/* Left: Hamburger Menu */}
      <TouchableOpacity
        style={styles.iconButton}
        onPress={onMenuPress}
        testID={`${testID}-menu-btn`}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Ionicons
          name="menu"
          size={24}
          color={colors.text}
        />
      </TouchableOpacity>

      {/* Center: Title */}
      <View style={styles.centerContainer}>
        <Text style={styles.title}>Journal</Text>
      </View>

      {/* Right: Calendar Icon */}
      <TouchableOpacity
        style={styles.iconButton}
        onPress={onCalendarPress}
        testID={`${testID}-calendar-btn`}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Ionicons
          name="calendar-outline"
          size={24}
          color={colors.text}
        />
      </TouchableOpacity>
    </View>
  );
}

const createStyles = (
  colors: ReturnType<typeof getThemedColors>,
  _isDark: boolean
) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: SIZES.headerHeight,
      paddingHorizontal: SPACING.lg,
      backgroundColor: colors.background,
    },
    iconButton: {
      width: SIZES.tapTarget,
      height: SIZES.tapTarget,
      justifyContent: 'center',
      alignItems: 'center',
    },
    centerContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      ...TYPOGRAPHY.styles.h3,
      color: colors.text,
      fontWeight: '600',
    },
  });

export default JournalCalendarHeader;
