import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  Dimensions,
} from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import {
  COLORS,
  SPACING,
  RADII,
  TYPOGRAPHY,
  SHADOWS,
  getThemedColors,
  withAlpha,
} from '../../lib/ui/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface DailyReflectionHeroCardProps {
  /** The reflection question to display */
  question: string;
  /** Callback when the Start Reflection button is pressed */
  onStartReflection: () => void;
  /** Callback when the menu button is pressed */
  onMenuPress?: () => void;
  /** Optional test ID for testing */
  testID?: string;
}

/**
 * DailyReflectionHeroCard - A large hero card for daily reflection prompts
 *
 * Features:
 * - Wavy dark green gradient background pattern
 * - 'Daily Reflection' chip badge
 * - Menu dots button (top right)
 * - Large question text
 * - Full-width green 'Start Reflection →' CTA button
 */
export function DailyReflectionHeroCard({
  question,
  onStartReflection,
  onMenuPress,
  testID = 'daily-reflection-hero-card',
}: DailyReflectionHeroCardProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);
  const styles = createStyles(colors, isDark);

  return (
    <View style={styles.container} testID={testID}>
      {/* Wavy Background Pattern */}
      <View style={styles.backgroundContainer}>
        <WavyBackground isDark={isDark} />
      </View>

      {/* Content Overlay */}
      <View style={styles.contentContainer}>
        {/* Header Row: Badge and Menu */}
        <View style={styles.headerRow}>
          <View style={styles.badge} testID={`${testID}-badge`}>
            <Text style={styles.badgeText}>Daily Reflection</Text>
          </View>
          {onMenuPress && (
            <TouchableOpacity
              style={styles.menuButton}
              onPress={onMenuPress}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              testID={`${testID}-menu-button`}
              accessibilityLabel="More options"
            >
              <View style={styles.menuDots}>
                <View style={styles.menuDot} />
                <View style={styles.menuDot} />
                <View style={styles.menuDot} />
              </View>
            </TouchableOpacity>
          )}
        </View>

        {/* Question Text */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionText} testID={`${testID}-question`}>
            {question}
          </Text>
        </View>

        {/* CTA Button */}
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={onStartReflection}
          activeOpacity={0.8}
          testID={`${testID}-cta-button`}
        >
          <Text style={styles.ctaButtonText}>Start Reflection →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/**
 * WavyBackground - SVG wavy pattern for the hero card background
 */
function WavyBackground({ isDark }: { isDark: boolean }) {
  const cardWidth = SCREEN_WIDTH - SPACING.xl * 2;
  const cardHeight = 280;

  // Dark green gradient colors
  const gradientStart = isDark ? '#0a1a08' : '#1a3a15';
  const gradientEnd = isDark ? '#132210' : '#0d1a0a';
  const waveColor1 = withAlpha(COLORS.primary, 0.08);
  const waveColor2 = withAlpha(COLORS.primary, 0.05);
  const waveColor3 = withAlpha(COLORS.primary, 0.03);

  return (
    <Svg
      width={cardWidth}
      height={cardHeight}
      viewBox={`0 0 ${cardWidth} ${cardHeight}`}
      style={StyleSheet.absoluteFillObject}
    >
      <Defs>
        <LinearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor={gradientStart} />
          <Stop offset="100%" stopColor={gradientEnd} />
        </LinearGradient>
      </Defs>

      {/* Base gradient background */}
      <Path
        d={`M0,0 H${cardWidth} V${cardHeight} H0 Z`}
        fill="url(#bgGradient)"
      />

      {/* Wave 1 - Bottom wave */}
      <Path
        d={`
          M0,${cardHeight * 0.7}
          Q${cardWidth * 0.25},${cardHeight * 0.55}
          ${cardWidth * 0.5},${cardHeight * 0.65}
          Q${cardWidth * 0.75},${cardHeight * 0.75}
          ${cardWidth},${cardHeight * 0.6}
          V${cardHeight}
          H0
          Z
        `}
        fill={waveColor1}
      />

      {/* Wave 2 - Middle wave */}
      <Path
        d={`
          M0,${cardHeight * 0.8}
          Q${cardWidth * 0.3},${cardHeight * 0.65}
          ${cardWidth * 0.6},${cardHeight * 0.75}
          Q${cardWidth * 0.85},${cardHeight * 0.85}
          ${cardWidth},${cardHeight * 0.7}
          V${cardHeight}
          H0
          Z
        `}
        fill={waveColor2}
      />

      {/* Wave 3 - Front wave */}
      <Path
        d={`
          M0,${cardHeight * 0.9}
          Q${cardWidth * 0.2},${cardHeight * 0.8}
          ${cardWidth * 0.45},${cardHeight * 0.85}
          Q${cardWidth * 0.7},${cardHeight * 0.9}
          ${cardWidth},${cardHeight * 0.82}
          V${cardHeight}
          H0
          Z
        `}
        fill={waveColor3}
      />

      {/* Decorative circles */}
      <Path
        d={`
          M${cardWidth * 0.85},${cardHeight * 0.15}
          m-30,0
          a30,30 0 1,0 60,0
          a30,30 0 1,0 -60,0
        `}
        fill={withAlpha(COLORS.primary, 0.06)}
      />
      <Path
        d={`
          M${cardWidth * 0.1},${cardHeight * 0.25}
          m-20,0
          a20,20 0 1,0 40,0
          a20,20 0 1,0 -40,0
        `}
        fill={withAlpha(COLORS.primary, 0.04)}
      />
    </Svg>
  );
}

const createStyles = (colors: ReturnType<typeof getThemedColors>, isDark: boolean) =>
  StyleSheet.create({
    container: {
      borderRadius: RADII.xl,
      overflow: 'hidden',
      minHeight: 280,
      position: 'relative',
      ...SHADOWS.lg,
    },
    backgroundContainer: {
      ...StyleSheet.absoluteFillObject,
    },
    contentContainer: {
      flex: 1,
      padding: SPACING.xl,
      justifyContent: 'space-between',
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    badge: {
      backgroundColor: withAlpha(COLORS.primary, 0.2),
      paddingHorizontal: SPACING.md,
      paddingVertical: SPACING.xs,
      borderRadius: RADII.full,
      borderWidth: 1,
      borderColor: withAlpha(COLORS.primary, 0.3),
    },
    badgeText: {
      ...TYPOGRAPHY.styles.label,
      color: COLORS.primary,
      textTransform: 'uppercase',
      letterSpacing: 0.8,
    },
    menuButton: {
      padding: SPACING.xs,
    },
    menuDots: {
      flexDirection: 'row',
      gap: 3,
    },
    menuDot: {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: withAlpha(COLORS.white, 0.6),
    },
    questionContainer: {
      flex: 1,
      justifyContent: 'center',
      paddingVertical: SPACING.lg,
    },
    questionText: {
      ...TYPOGRAPHY.styles.h2,
      color: COLORS.white,
      lineHeight: 36,
      textAlign: 'left',
    },
    ctaButton: {
      backgroundColor: COLORS.primary,
      paddingVertical: SPACING.lg,
      borderRadius: RADII.md,
      alignItems: 'center',
      justifyContent: 'center',
      ...SHADOWS.primary,
    },
    ctaButtonText: {
      ...TYPOGRAPHY.styles.bodyBold,
      color: COLORS.primaryText,
      fontSize: 16,
      fontWeight: '700',
    },
  });

export default DailyReflectionHeroCard;
