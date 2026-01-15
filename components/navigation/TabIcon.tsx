/**
 * TabIcon Component
 *
 * A reusable tab icon component supporting:
 * - SVG-based icons with filled vs outlined variants
 * - Active state with primary color
 * - Optional badge support for notifications
 *
 * @example
 * <TabIcon
 *   icon={{ filled: '💬', outlined: '💭' }}
 *   focused={true}
 *   badge={3}
 * />
 */

import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import {
  COLORS,
  SIZES,
  SPACING,
  RADII,
  SHADOWS,
  getThemedColors,
  withAlpha,
} from '../../lib/ui/theme';

/**
 * Icon definition supporting filled and outlined variants
 * Can be a string (emoji/text) or a React element (SVG)
 */
export interface TabIconDefinition {
  /** Icon displayed when tab is active/selected */
  filled: string | React.ReactElement;
  /** Icon displayed when tab is inactive */
  outlined: string | React.ReactElement;
}

export interface TabIconProps {
  /** Icon definition with filled and outlined variants */
  icon: TabIconDefinition;
  /** Whether the tab is currently focused/active */
  focused: boolean;
  /** Optional badge count for notifications (null/undefined = no badge, 0 = no badge) */
  badge?: number | null;
  /** Size of the icon */
  size?: 'sm' | 'md' | 'lg';
  /** Custom primary color override (defaults to theme primary) */
  primaryColor?: string;
  /** Test ID for testing */
  testID?: string;
}

const ICON_SIZES: Record<'sm' | 'md' | 'lg', number> = {
  sm: SIZES.iconSm,  // 16
  md: SIZES.iconLg,  // 24
  lg: SIZES.iconXl,  // 32
};

const ICON_FONT_SIZES: Record<'sm' | 'md' | 'lg', number> = {
  sm: 18,
  md: 22,
  lg: 28,
};

/**
 * TabIcon - A reusable navigation tab icon component
 *
 * Supports both emoji/text icons and SVG React elements
 * Handles filled vs outlined variants based on focus state
 * Includes optional notification badge with customizable count
 */
export function TabIcon({
  icon,
  focused,
  badge,
  size = 'md',
  primaryColor,
  testID,
}: TabIconProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);
  const activePrimaryColor = primaryColor ?? COLORS.primary;

  const styles = createStyles(colors, isDark, focused, activePrimaryColor, size);

  // Get the appropriate icon variant
  const currentIcon = focused ? icon.filled : icon.outlined;
  const isTextIcon = typeof currentIcon === 'string';

  // Determine if badge should be shown
  const showBadge = badge !== null && badge !== undefined && badge > 0;
  const badgeText = badge && badge > 99 ? '99+' : String(badge);

  return (
    <View style={styles.container} testID={testID}>
      {/* Icon wrapper */}
      <View style={styles.iconWrapper}>
        {isTextIcon ? (
          <Text
            style={[
              styles.iconText,
              focused && styles.iconTextFocused,
            ]}
            allowFontScaling={false}
          >
            {currentIcon}
          </Text>
        ) : (
          <View style={[styles.svgIconWrapper, focused && styles.svgIconWrapperFocused]}>
            {currentIcon}
          </View>
        )}
      </View>

      {/* Badge */}
      {showBadge && (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText} allowFontScaling={false}>
            {badgeText}
          </Text>
        </View>
      )}
    </View>
  );
}

const createStyles = (
  colors: ReturnType<typeof getThemedColors>,
  isDark: boolean,
  focused: boolean,
  primaryColor: string,
  size: 'sm' | 'md' | 'lg'
) => {
  const iconSize = ICON_SIZES[size];
  const fontSize = ICON_FONT_SIZES[size];

  // Badge size scales with icon size
  const badgeSize = size === 'sm' ? 16 : size === 'md' ? 18 : 20;
  const badgeFontSize = size === 'sm' ? 9 : size === 'md' ? 10 : 11;

  return StyleSheet.create({
    container: {
      width: SIZES.tapTarget,
      height: SIZES.tapTarget,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    iconWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      width: iconSize + SPACING.md,
      height: iconSize + SPACING.md,
      borderRadius: RADII.md,
      backgroundColor: focused
        ? withAlpha(primaryColor, isDark ? 0.15 : 0.1)
        : 'transparent',
    },
    iconText: {
      fontSize: fontSize,
      opacity: 0.6,
      textAlign: 'center',
    },
    iconTextFocused: {
      opacity: 1,
    },
    svgIconWrapper: {
      opacity: 0.6,
    },
    svgIconWrapperFocused: {
      opacity: 1,
    },
    badgeContainer: {
      position: 'absolute',
      top: 2,
      right: 2,
      minWidth: badgeSize,
      height: badgeSize,
      borderRadius: RADII.full,
      backgroundColor: COLORS.danger,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: SPACING.xs,
      borderWidth: 2,
      borderColor: colors.surface,
      ...SHADOWS.sm,
    },
    badgeText: {
      fontSize: badgeFontSize,
      fontWeight: '700',
      color: COLORS.white,
      textAlign: 'center',
      includeFontPadding: false,
    },
  });
};

/**
 * Pre-defined tab icons for common navigation items
 * These use emoji icons as the default (no SVG library required)
 */
export const TAB_ICON_PRESETS: Record<string, TabIconDefinition> = {
  // Chat/Explore
  chat: { filled: '💬', outlined: '💭' },
  explore: { filled: '💬', outlined: '💭' },

  // Journal
  journal: { filled: '📔', outlined: '📓' },
  notebook: { filled: '📔', outlined: '📓' },

  // Contrasts/Compare
  contrasts: { filled: '🔄', outlined: '🔃' },
  compare: { filled: '🔄', outlined: '🔃' },

  // Insights/Analytics
  insights: { filled: '✨', outlined: '⭐' },
  analytics: { filled: '📊', outlined: '📈' },

  // Settings
  settings: { filled: '⚙️', outlined: '🔧' },
  gear: { filled: '⚙️', outlined: '🔧' },

  // Home
  home: { filled: '🏠', outlined: '🏡' },

  // Profile/User
  profile: { filled: '👤', outlined: '👥' },
  user: { filled: '👤', outlined: '👥' },

  // Search
  search: { filled: '🔍', outlined: '🔎' },

  // Notifications
  notifications: { filled: '🔔', outlined: '🔕' },
  bell: { filled: '🔔', outlined: '🔕' },

  // Heart/Favorites
  favorites: { filled: '❤️', outlined: '🤍' },
  heart: { filled: '❤️', outlined: '🤍' },

  // Calendar
  calendar: { filled: '📅', outlined: '🗓️' },

  // Messages
  messages: { filled: '✉️', outlined: '📧' },
  mail: { filled: '✉️', outlined: '📧' },
};

export default TabIcon;
