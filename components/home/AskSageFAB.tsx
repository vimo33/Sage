/**
 * AskSageFAB - Pill-shaped Floating Action Button
 *
 * A reusable floating action button with:
 * - Chat icon (sparkles emoji)
 * - "Ask Sage" text
 * - Sage logo watermark
 *
 * Designed to be positioned at the bottom center of screens
 * and reused across Home and Explore screens.
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Image,
  useColorScheme,
  ViewStyle,
} from 'react-native';
import { router } from 'expo-router';
import {
  COLORS,
  SPACING,
  RADII,
  SHADOWS,
  getThemedColors,
} from '@/lib/ui/theme';

interface AskSageFABProps {
  /** Optional custom onPress handler. Defaults to navigating to /ask */
  onPress?: () => void;
  /** Optional test ID for testing purposes */
  testID?: string;
  /** Optional custom style overrides for positioning */
  style?: ViewStyle;
}

export function AskSageFAB({
  onPress,
  testID = 'ask-sage-fab',
  style,
}: AskSageFABProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);
  const styles = createStyles(colors, isDark);

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push('/ask');
    }
  };

  return (
    <TouchableOpacity
      style={[styles.fab, style]}
      onPress={handlePress}
      activeOpacity={0.85}
      testID={testID}
      accessibilityLabel="Ask Sage"
      accessibilityRole="button"
      accessibilityHint="Opens the chat interface to ask Sage a question"
    >
      {/* Chat Icon */}
      <Text style={styles.fabIcon}>💬</Text>

      {/* Ask Sage Text */}
      <Text style={styles.fabText}>Ask Sage</Text>

      {/* Sage Logo Watermark */}
      <View style={styles.logoContainer}>
        <Image
          source={require('@/assets/images/sage-leaf.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
}

const createStyles = (colors: ReturnType<typeof getThemedColors>, isDark: boolean) =>
  StyleSheet.create({
    fab: {
      position: 'absolute',
      bottom: 30,
      alignSelf: 'center',
      left: '50%',
      transform: [{ translateX: -85 }], // Half of estimated width (~170px)
      backgroundColor: COLORS.primary,
      height: 56,
      borderRadius: RADII.full,
      paddingHorizontal: SPACING.xl,
      paddingVertical: SPACING.md,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: SPACING.sm,
      ...SHADOWS.primary,
      // Enhanced shadow for better visibility
      shadowOpacity: 0.3,
      elevation: 8,
    },
    fabIcon: {
      fontSize: 20,
    },
    fabText: {
      color: COLORS.primaryText,
      fontWeight: '800',
      fontSize: 16,
      letterSpacing: 0.3,
    },
    logoContainer: {
      marginLeft: SPACING.xs,
      opacity: 0.6, // Subtle watermark effect
    },
    logoImage: {
      width: 20,
      height: 20,
      tintColor: COLORS.primaryText,
    },
  });

export default AskSageFAB;
