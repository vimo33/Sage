import React, { forwardRef } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { COLORS, SPACING, RADII, withAlpha } from '../../lib/ui/theme';
import type { SavedInsight } from '../../lib/storage/store';

interface InsightShareCardProps {
  insight: SavedInsight;
  style?: 'dark' | 'light' | 'gradient';
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Card dimensions optimized for social media (1:1.25 aspect ratio)
const CARD_WIDTH = SCREEN_WIDTH - SPACING.xl * 2;
const CARD_HEIGHT = CARD_WIDTH * 1.25;

/**
 * InsightShareCard - A beautifully styled card for sharing insights
 *
 * This component renders a visually appealing card that can be captured
 * as an image for sharing to social media or saving to camera roll.
 *
 * Design principles:
 * - No app branding visible (user requested)
 * - Beautiful typography with quote styling
 * - Elegant dark theme matching app aesthetic
 * - Decorative elements for visual interest
 */
export const InsightShareCard = forwardRef<View, InsightShareCardProps>(
  ({ insight, style = 'dark' }, ref) => {
    const styles = getStyles(style);

    // Truncate long quotes for better visual presentation
    const displayContent = insight.verseContent.length > 300
      ? insight.verseContent.substring(0, 297) + '...'
      : insight.verseContent;

    return (
      <View ref={ref} style={styles.card} collapsable={false}>
        {/* Decorative background elements */}
        <View style={styles.decorativeCircle1} />
        <View style={styles.decorativeCircle2} />

        {/* Main content */}
        <View style={styles.content}>
          {/* Opening quote mark */}
          <View style={styles.quoteMarkContainer}>
            <Text style={styles.quoteMark}>"</Text>
          </View>

          {/* Quote text */}
          <Text style={styles.quoteText}>{displayContent}</Text>

          {/* Closing quote mark */}
          <View style={styles.closingQuoteContainer}>
            <Text style={styles.closingQuoteMark}>"</Text>
          </View>

          {/* Decorative divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <View style={styles.dividerDot} />
            <View style={styles.dividerLine} />
          </View>

          {/* Source attribution */}
          <Text style={styles.sourceText}>{insight.sourceRef}</Text>
        </View>

        {/* Subtle corner decorations */}
        <View style={styles.cornerTopLeft} />
        <View style={styles.cornerBottomRight} />
      </View>
    );
  }
);

InsightShareCard.displayName = 'InsightShareCard';

const getStyles = (style: 'dark' | 'light' | 'gradient') => {
  const isDark = style === 'dark' || style === 'gradient';

  const backgroundColor = isDark ? '#0d1a0a' : '#fafbfa';
  const textColor = isDark ? '#ffffff' : '#1a1a1a';
  const accentColor = COLORS.primary;
  const mutedColor = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)';

  return StyleSheet.create({
    card: {
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
      backgroundColor,
      borderRadius: RADII.xl,
      overflow: 'hidden',
      position: 'relative',
    },

    // Decorative background circles
    decorativeCircle1: {
      position: 'absolute',
      top: -CARD_HEIGHT * 0.2,
      right: -CARD_WIDTH * 0.2,
      width: CARD_WIDTH * 0.6,
      height: CARD_WIDTH * 0.6,
      borderRadius: CARD_WIDTH * 0.3,
      backgroundColor: withAlpha(accentColor, 0.08),
    },
    decorativeCircle2: {
      position: 'absolute',
      bottom: -CARD_HEIGHT * 0.15,
      left: -CARD_WIDTH * 0.15,
      width: CARD_WIDTH * 0.5,
      height: CARD_WIDTH * 0.5,
      borderRadius: CARD_WIDTH * 0.25,
      backgroundColor: withAlpha(accentColor, 0.05),
    },

    // Corner decorations
    cornerTopLeft: {
      position: 'absolute',
      top: SPACING.lg,
      left: SPACING.lg,
      width: 24,
      height: 24,
      borderTopWidth: 2,
      borderLeftWidth: 2,
      borderColor: withAlpha(accentColor, 0.3),
    },
    cornerBottomRight: {
      position: 'absolute',
      bottom: SPACING.lg,
      right: SPACING.lg,
      width: 24,
      height: 24,
      borderBottomWidth: 2,
      borderRightWidth: 2,
      borderColor: withAlpha(accentColor, 0.3),
    },

    // Main content container
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: SPACING.xxxl,
      paddingVertical: SPACING['4xl'],
    },

    // Quote marks
    quoteMarkContainer: {
      marginBottom: SPACING.md,
    },
    quoteMark: {
      fontSize: 72,
      fontWeight: '700',
      color: withAlpha(accentColor, 0.4),
      lineHeight: 72,
      height: 56,
    },
    closingQuoteContainer: {
      marginTop: SPACING.md,
    },
    closingQuoteMark: {
      fontSize: 72,
      fontWeight: '700',
      color: withAlpha(accentColor, 0.4),
      lineHeight: 72,
      height: 56,
      transform: [{ rotate: '180deg' }],
    },

    // Quote text
    quoteText: {
      fontSize: 20,
      fontWeight: '500',
      color: textColor,
      lineHeight: 32,
      textAlign: 'center',
      fontStyle: 'italic',
      letterSpacing: 0.3,
    },

    // Divider
    divider: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: SPACING.xxl,
      marginBottom: SPACING.lg,
    },
    dividerLine: {
      width: 40,
      height: 1,
      backgroundColor: withAlpha(accentColor, 0.3),
    },
    dividerDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: accentColor,
      marginHorizontal: SPACING.md,
    },

    // Source attribution
    sourceText: {
      fontSize: 14,
      fontWeight: '600',
      color: mutedColor,
      letterSpacing: 1,
      textTransform: 'uppercase',
    },
  });
};

export default InsightShareCard;
