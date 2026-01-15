import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { COLORS, SPACING, RADII, TYPOGRAPHY, withAlpha, getThemedColors } from '../../lib/ui/theme';

interface JournalEmptyStateProps {
  isDark: boolean;
}

// Book illustration SVG (inline to avoid require issues with SVG)
const getBookIllustrationSvg = (isDark: boolean) => {
  const pageColor = isDark ? '#2a3829' : '#f5f5f5';
  const pageEdge = isDark ? '#404040' : '#e5e5e5';
  const lineColor = isDark ? '#404040' : '#d4d4d4';

  return `
    <svg width="120" height="120" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Book spine shadow -->
      <path d="M80 50 L80 120" stroke="#37ec13" stroke-width="3" opacity="0.3"/>

      <!-- Left page -->
      <path d="M30 55 Q50 50 80 55 L80 115 Q50 110 30 115 Z" fill="${pageColor}" stroke="${pageEdge}" stroke-width="1"/>

      <!-- Right page -->
      <path d="M130 55 Q110 50 80 55 L80 115 Q110 110 130 115 Z" fill="${pageColor}" stroke="${pageEdge}" stroke-width="1"/>

      <!-- Left page lines (subtle) -->
      <line x1="40" y1="65" x2="70" y2="62" stroke="${lineColor}" stroke-width="1" opacity="0.5"/>
      <line x1="40" y1="75" x2="70" y2="72" stroke="${lineColor}" stroke-width="1" opacity="0.5"/>
      <line x1="40" y1="85" x2="70" y2="82" stroke="${lineColor}" stroke-width="1" opacity="0.5"/>
      <line x1="40" y1="95" x2="70" y2="92" stroke="${lineColor}" stroke-width="1" opacity="0.5"/>

      <!-- Right page lines (subtle) -->
      <line x1="90" y1="62" x2="120" y2="65" stroke="${lineColor}" stroke-width="1" opacity="0.5"/>
      <line x1="90" y1="72" x2="120" y2="75" stroke="${lineColor}" stroke-width="1" opacity="0.5"/>
      <line x1="90" y1="82" x2="120" y2="85" stroke="${lineColor}" stroke-width="1" opacity="0.5"/>
      <line x1="90" y1="92" x2="120" y2="95" stroke="${lineColor}" stroke-width="1" opacity="0.5"/>

      <!-- Book cover edges (left) -->
      <path d="M28 53 Q48 48 80 53" stroke="#37ec13" stroke-width="2" fill="none" opacity="0.6"/>
      <path d="M28 117 Q48 112 80 117" stroke="#37ec13" stroke-width="2" fill="none" opacity="0.6"/>
      <line x1="28" y1="53" x2="28" y2="117" stroke="#37ec13" stroke-width="2" opacity="0.6"/>

      <!-- Book cover edges (right) -->
      <path d="M132 53 Q112 48 80 53" stroke="#37ec13" stroke-width="2" fill="none" opacity="0.6"/>
      <path d="M132 117 Q112 112 80 117" stroke="#37ec13" stroke-width="2" fill="none" opacity="0.6"/>
      <line x1="132" y1="53" x2="132" y2="117" stroke="#37ec13" stroke-width="2" opacity="0.6"/>

      <!-- Decorative pen/quill hint -->
      <g transform="translate(115, 45) rotate(45)">
        <rect x="-2" y="-15" width="4" height="20" rx="1" fill="#37ec13" opacity="0.4"/>
        <path d="M-2 5 L0 12 L2 5 Z" fill="#37ec13" opacity="0.5"/>
      </g>
    </svg>
  `;
};

export function JournalEmptyState({ isDark }: JournalEmptyStateProps) {
  const colors = getThemedColors(isDark);
  const styles = createStyles(colors, isDark);

  return (
    <View style={styles.container} testID="journal-empty-state">
      {/* Large circular background */}
      <View style={styles.circleBackground}>
        {/* Book illustration */}
        <View style={styles.illustrationContainer}>
          <SvgXml xml={getBookIllustrationSvg(isDark)} width={120} height={120} />
        </View>
      </View>

      {/* Heading */}
      <Text style={styles.heading}>Your space to reflect</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Your thoughts are safe here.{'\n'}Tap the + to begin your first entry.
      </Text>
    </View>
  );
}

const createStyles = (colors: ReturnType<typeof getThemedColors>, isDark: boolean) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      paddingVertical: SPACING['4xl'],
      paddingHorizontal: SPACING.xl,
    },
    circleBackground: {
      width: 180,
      height: 180,
      borderRadius: RADII.full,
      backgroundColor: withAlpha(COLORS.primary, isDark ? 0.1 : 0.08),
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: SPACING.xxl,
    },
    illustrationContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    heading: {
      ...TYPOGRAPHY.styles.h2,
      color: colors.text,
      textAlign: 'center',
      marginBottom: SPACING.md,
    },
    subtitle: {
      ...TYPOGRAPHY.styles.body,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 22,
    },
  });

export default JournalEmptyState;
