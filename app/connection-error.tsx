/**
 * Connection Error Screen
 *
 * Displayed when the app encounters a connection pause or network issue.
 * Features:
 * - Back arrow navigation
 * - Circular broken chain illustration
 * - 'Connection Pause' heading
 * - Retry message
 * - 'Retry' button
 * - 'Return to Home' link
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Svg, { Circle, Path, G } from 'react-native-svg';
import {
  COLORS,
  SPACING,
  RADII,
  SHADOWS,
  TYPOGRAPHY,
  getThemedColors,
  withAlpha,
} from '../lib/ui/theme';
import { AppHeader } from '../components/navigation/AppHeader';

/**
 * Broken Chain Illustration Component
 * A circular illustration showing a broken chain link to represent connection pause
 */
function BrokenChainIllustration({ color, size = 120 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      {/* Background circle */}
      <Circle
        cx="60"
        cy="60"
        r="55"
        fill={withAlpha(COLORS.warning, 0.15)}
        stroke={withAlpha(COLORS.warning, 0.3)}
        strokeWidth="2"
      />

      {/* Left chain link */}
      <G>
        <Path
          d="M30 50 C30 40, 40 35, 50 40 L50 55 C40 52, 35 55, 35 60 C35 65, 40 68, 50 65 L50 80 C40 85, 30 80, 30 70 Z"
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Left link oval */}
        <Path
          d="M35 48 C35 38, 48 35, 55 42 L55 48 C50 44, 42 45, 42 52 L42 68 C42 75, 50 76, 55 72 L55 78 C48 85, 35 82, 35 72 Z"
          fill="none"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </G>

      {/* Right chain link */}
      <G>
        <Path
          d="M90 50 C90 40, 80 35, 70 40 L70 55 C80 52, 85 55, 85 60 C85 65, 80 68, 70 65 L70 80 C80 85, 90 80, 90 70 Z"
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Right link oval */}
        <Path
          d="M85 48 C85 38, 72 35, 65 42 L65 48 C70 44, 78 45, 78 52 L78 68 C78 75, 70 76, 65 72 L65 78 C72 85, 85 82, 85 72 Z"
          fill="none"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </G>

      {/* Break/gap indicator - lightning bolt style break */}
      <Path
        d="M56 55 L60 50 L58 58 L64 53 L60 60 L62 52 L56 55"
        fill={COLORS.warning}
        stroke={COLORS.warning}
        strokeWidth="1"
      />

      {/* Spark/disconnect indicators */}
      <Circle cx="58" cy="48" r="2" fill={COLORS.warning} />
      <Circle cx="62" cy="72" r="2" fill={COLORS.warning} />
      <Path
        d="M54 68 L52 72"
        stroke={COLORS.warning}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M66 48 L68 44"
        stroke={COLORS.warning}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default function ConnectionErrorScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);
  const styles = createStyles(colors, isDark);

  const handleRetry = () => {
    // Navigate back to attempt reconnection or refresh
    router.back();
  };

  const handleReturnHome = () => {
    // Navigate to home screen
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.container} testID="connection-error-screen">
      <AppHeader
        variant="back"
        showProfile={false}
        testID="connection-error-header"
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Illustration */}
        <View style={styles.illustrationContainer} testID="connection-error-illustration">
          <BrokenChainIllustration color={colors.text} size={140} />
        </View>

        {/* Heading */}
        <Text style={styles.title} testID="connection-error-title">
          Connection Pause
        </Text>

        {/* Retry Message */}
        <Text style={styles.description} testID="connection-error-description">
          We're having trouble connecting right now. This could be due to a temporary
          network issue. Please check your connection and try again.
        </Text>

        {/* Tips Section */}
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>Quick Tips</Text>
          <View style={styles.tipItem}>
            <View style={styles.tipBullet} />
            <Text style={styles.tipText}>Check if you're connected to Wi-Fi or mobile data</Text>
          </View>
          <View style={styles.tipItem}>
            <View style={styles.tipBullet} />
            <Text style={styles.tipText}>Try turning airplane mode on and off</Text>
          </View>
          <View style={styles.tipItem}>
            <View style={styles.tipBullet} />
            <Text style={styles.tipText}>Move to an area with better signal</Text>
          </View>
        </View>
      </ScrollView>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={handleRetry}
          testID="connection-error-retry-button"
          activeOpacity={0.8}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.homeLink}
          onPress={handleReturnHome}
          testID="connection-error-home-link"
          activeOpacity={0.7}
        >
          <Text style={styles.homeLinkText}>Return to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (colors: ReturnType<typeof getThemedColors>, isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollView: {
      flex: 1,
    },
    contentContainer: {
      padding: SPACING.xl,
      paddingBottom: SPACING.xxxl,
      alignItems: 'center',
    },
    illustrationContainer: {
      marginTop: SPACING['4xl'],
      marginBottom: SPACING.xxxl,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      ...TYPOGRAPHY.styles.h2,
      color: colors.text,
      textAlign: 'center',
      marginBottom: SPACING.lg,
    },
    description: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 24,
      marginBottom: SPACING.xxl,
      paddingHorizontal: SPACING.md,
    },
    tipsContainer: {
      width: '100%',
      backgroundColor: colors.surface,
      borderRadius: RADII.lg,
      padding: SPACING.lg,
      marginBottom: SPACING.xxl,
      borderWidth: 1,
      borderColor: colors.border,
    },
    tipsTitle: {
      ...TYPOGRAPHY.styles.h4,
      color: colors.text,
      marginBottom: SPACING.md,
    },
    tipItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: SPACING.sm,
    },
    tipBullet: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: COLORS.primary,
      marginTop: 7,
      marginRight: SPACING.md,
    },
    tipText: {
      flex: 1,
      fontSize: 14,
      color: colors.textSecondary,
      lineHeight: 20,
    },
    buttonContainer: {
      padding: SPACING.xl,
      paddingBottom: SPACING.xxxl,
      gap: SPACING.lg,
      backgroundColor: colors.background,
      ...SHADOWS.md,
    },
    retryButton: {
      backgroundColor: COLORS.primary,
      borderRadius: RADII.lg,
      paddingVertical: SPACING.lg,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 52,
    },
    retryButtonText: {
      fontSize: 16,
      fontWeight: '700',
      color: COLORS.primaryText,
    },
    homeLink: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: SPACING.sm,
    },
    homeLinkText: {
      fontSize: 16,
      fontWeight: '600',
      color: COLORS.primary,
    },
  });
