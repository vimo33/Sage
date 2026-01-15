/**
 * Donation Success Screen
 *
 * Displayed after a successful donation to thank the user.
 * Features:
 * - Large heart icon
 * - Thank you heading
 * - Confirmation message
 * - Return to Sage button
 */

import { View, Text, StyleSheet, SafeAreaView, useColorScheme } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {
  COLORS,
  SPACING,
  RADII,
  TYPOGRAPHY,
  getThemedColors,
  SHADOWS,
} from '@/lib/ui/theme';

export default function DonationSuccessScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);

  // Optional: Get donation amount from params if passed
  const { amount } = useLocalSearchParams<{ amount?: string }>();

  const handleReturnToSage = () => {
    router.replace('/(tabs)');
  };

  const styles = createStyles(colors, isDark);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        {/* Heart Icon */}
        <View style={styles.iconContainer}>
          <Ionicons
            name="heart"
            size={100}
            color={COLORS.primary}
            testID="donation-success-heart-icon"
          />
        </View>

        {/* Thank You Heading */}
        <Text style={styles.heading} testID="donation-success-heading">
          Thank You!
        </Text>

        {/* Confirmation Message */}
        <Text style={styles.message} testID="donation-success-message">
          Your generous donation helps keep Sage free and supports continued development.
          {amount ? ` We've received your ${amount} contribution.` : ''} Your kindness means the world to us.
        </Text>

        {/* Gratitude Note */}
        <View style={styles.gratitudeContainer}>
          <Text style={styles.gratitudeEmoji}>🙏</Text>
          <Text style={styles.gratitudeText}>
            May your path be filled with wisdom and peace.
          </Text>
        </View>

        {/* Return to Sage Button */}
        <TouchableOpacity
          style={styles.returnButton}
          onPress={handleReturnToSage}
          activeOpacity={0.8}
          testID="donation-success-return-button"
        >
          <Text style={styles.returnButtonText}>Return to Sage</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (colors: ReturnType<typeof getThemedColors>, isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: SPACING.xl,
    },
    iconContainer: {
      marginBottom: SPACING.xxl,
      padding: SPACING.xl,
      borderRadius: RADII.full,
      backgroundColor: isDark ? COLORS.dark.surface : COLORS.light.surface,
      ...SHADOWS.md,
    },
    heading: {
      ...TYPOGRAPHY.styles.h1,
      color: colors.text,
      marginBottom: SPACING.lg,
      textAlign: 'center',
    },
    message: {
      ...TYPOGRAPHY.styles.body,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 24,
      marginBottom: SPACING.xxl,
      paddingHorizontal: SPACING.lg,
    },
    gratitudeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDark ? COLORS.dark.surfaceAlt : COLORS.primaryLight,
      paddingVertical: SPACING.md,
      paddingHorizontal: SPACING.lg,
      borderRadius: RADII.md,
      marginBottom: SPACING['4xl'],
    },
    gratitudeEmoji: {
      fontSize: 24,
      marginRight: SPACING.md,
    },
    gratitudeText: {
      ...TYPOGRAPHY.styles.body,
      color: isDark ? colors.text : COLORS.primaryText,
      fontStyle: 'italic',
      flex: 1,
    },
    returnButton: {
      backgroundColor: COLORS.primary,
      paddingVertical: SPACING.lg,
      paddingHorizontal: SPACING['5xl'],
      borderRadius: RADII.md,
      ...SHADOWS.primary,
    },
    returnButtonText: {
      ...TYPOGRAPHY.styles.bodyBold,
      color: COLORS.primaryText,
      textAlign: 'center',
    },
  });
