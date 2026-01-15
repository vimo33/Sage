import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  useColorScheme,
  Dimensions,
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
import { getThemeImage } from '../../lib/theme-packs/images';
import type { ExploreTheme } from '../../lib/explore-themes/types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
// Card width: (screen width - left padding - right padding - gap) / 2
const CARD_WIDTH = (SCREEN_WIDTH - SPACING.xl * 2 - SPACING.md) / 2;
const CARD_HEIGHT = 120;

interface ThemeCardProps {
  /** The theme data to display */
  theme: ExploreTheme;
  /** Callback when the card is pressed */
  onPress: () => void;
  /** Optional test ID */
  testID?: string;
}

/**
 * ThemeCard - A card displaying a theme with image background, icon overlay, and label
 *
 * Features:
 * - Image background with color overlay
 * - Icon overlay (emoji)
 * - Theme title label
 * - Touch feedback
 * - Dark/light mode support
 */
export function ThemeCard({
  theme,
  onPress,
  testID = 'theme-card',
}: ThemeCardProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);
  const styles = createStyles(colors, isDark, theme.color);

  const imageSource = getThemeImage(theme.image);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
      testID={testID}
      accessibilityLabel={`${theme.title} theme`}
      accessibilityRole="button"
    >
      {/* Background with color overlay */}
      <View style={styles.backgroundContainer}>
        {imageSource ? (
          <ImageBackground
            source={imageSource}
            style={styles.imageBackground}
            imageStyle={styles.imageStyle}
            resizeMode="cover"
          >
            <View style={styles.overlay} />
          </ImageBackground>
        ) : (
          <View style={styles.colorBackground} />
        )}
      </View>

      {/* Content - Icon and Label */}
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon} testID={`${testID}-icon`}>
            {theme.icon}
          </Text>
        </View>
        <Text style={styles.label} testID={`${testID}-label`} numberOfLines={1}>
          {theme.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const createStyles = (
  colors: ReturnType<typeof getThemedColors>,
  isDark: boolean,
  themeColor: string
) =>
  StyleSheet.create({
    card: {
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
      borderRadius: RADII.lg,
      overflow: 'hidden',
      ...SHADOWS.md,
    },
    backgroundContainer: {
      ...StyleSheet.absoluteFillObject,
    },
    imageBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageStyle: {
      borderRadius: RADII.lg,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: withAlpha(themeColor, 0.6),
    },
    colorBackground: {
      flex: 1,
      backgroundColor: themeColor,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: SPACING.md,
    },
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: RADII.full,
      backgroundColor: withAlpha(COLORS.white, 0.25),
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: SPACING.sm,
    },
    icon: {
      fontSize: 24,
    },
    label: {
      ...TYPOGRAPHY.styles.bodyBold,
      color: COLORS.white,
      textAlign: 'center',
      textShadowColor: withAlpha(COLORS.black, 0.3),
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },
  });

export default ThemeCard;
