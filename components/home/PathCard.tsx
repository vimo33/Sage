import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
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
import type { ThemePack } from '../../lib/theme-packs/types';
import { getThemeImage } from '../../lib/theme-packs/images';

interface PathCardProps {
  /** The theme pack path data */
  pack: ThemePack;
  /** Callback when card is pressed */
  onPress: () => void;
  /** Optional test ID */
  testID?: string;
}

/**
 * PathCard - A card displaying a 7-day path/journey
 *
 * Features:
 * - Thumbnail image (or emoji fallback)
 * - '7 DAYS' badge overlay
 * - Title
 * - Description (2 lines max)
 * - Right-aligned chevron for navigation
 */
export function PathCard({
  pack,
  onPress,
  testID = 'path-card',
}: PathCardProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);
  const styles = createStyles(colors, isDark, pack.color);

  const themeImage = getThemeImage(pack.image);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
      testID={testID}
    >
      {/* Image Container with Badge */}
      <View style={styles.imageContainer}>
        {themeImage ? (
          <Image
            source={themeImage}
            style={styles.thumbnailImage}
            resizeMode="contain"
            testID={`${testID}-image`}
          />
        ) : (
          <Text style={styles.emojiIcon} testID={`${testID}-emoji`}>
            {pack.icon}
          </Text>
        )}
        {/* 7 DAYS Badge */}
        <View style={styles.daysBadge} testID={`${testID}-badge`}>
          <Text style={styles.daysBadgeText}>{pack.dayCount} DAYS</Text>
        </View>
      </View>

      {/* Content Container */}
      <View style={styles.contentContainer}>
        {/* Title */}
        <Text style={styles.title} numberOfLines={1} testID={`${testID}-title`}>
          {pack.title}
        </Text>

        {/* Description */}
        <Text style={styles.description} numberOfLines={2} testID={`${testID}-description`}>
          {pack.description}
        </Text>
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
      width: 240,
      backgroundColor: colors.surface,
      borderRadius: RADII.lg,
      marginRight: SPACING.md,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: 'hidden',
      ...SHADOWS.sm,
    },
    imageContainer: {
      width: '100%',
      height: 120,
      backgroundColor: withAlpha(packColor, 0.2),
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    thumbnailImage: {
      width: 60,
      height: 60,
    },
    emojiIcon: {
      fontSize: 40,
    },
    daysBadge: {
      position: 'absolute',
      bottom: 8,
      left: 8,
      backgroundColor: 'rgba(0,0,0,0.6)',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: RADII.sm,
    },
    daysBadgeText: {
      color: COLORS.white,
      fontSize: 10,
      fontWeight: '700',
      letterSpacing: 0.5,
    },
    contentContainer: {
      padding: SPACING.md,
      flex: 1,
    },
    title: {
      ...TYPOGRAPHY.styles.bodyBold,
      color: colors.text,
      marginBottom: SPACING.xs,
    },
    description: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textSecondary,
      lineHeight: 16,
    },
    chevronContainer: {
      position: 'absolute',
      bottom: SPACING.md,
      right: SPACING.md,
      justifyContent: 'center',
      alignItems: 'center',
    },
    chevron: {
      fontSize: 24,
      color: colors.textSecondary,
      fontWeight: '300',
    },
  });

export default PathCard;
