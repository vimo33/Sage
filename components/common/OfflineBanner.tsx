/**
 * OfflineBanner Component
 *
 * A reusable banner component that displays when the user is offline.
 * Features:
 * - Yellow/amber background to indicate warning state
 * - Cloud-slash icon for visual representation
 * - "You're currently offline" primary text
 * - "Reflections are saved locally" subtitle for reassurance
 * - "RETRY" button to attempt reconnection
 *
 * The banner automatically shows when offline and hides when online.
 * It can also be controlled manually via props.
 */

import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
  RADII,
  ANIMATION,
  getThemedColors,
  withAlpha,
} from '@/lib/ui/theme';
import { useNetworkState } from '@/lib/connectivity/useNetworkState';

interface OfflineBannerProps {
  /** Whether to show the banner (overrides automatic detection) */
  visible?: boolean;
  /** Callback when the retry button is pressed */
  onRetry?: () => void;
  /** Test ID for testing purposes */
  testID?: string;
}

// Static version for web (no animations to avoid worklet issues)
function OfflineBannerWeb({
  visible,
  onRetry,
  testID = 'offline-banner',
}: OfflineBannerProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);
  const { isConnected, isLoading } = useNetworkState();

  // If visible is explicitly set, use it; otherwise use network state (wait for loading)
  const shouldShow = visible !== undefined ? visible : (!isLoading && !isConnected);

  // Don't render if should not show
  if (!shouldShow) {
    return null;
  }

  const styles = createStyles(colors, isDark);

  return (
    <View
      testID={testID}
      style={styles.container}
      accessibilityRole="alert"
      accessibilityLabel="You're currently offline. Reflections are saved locally."
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons
            name="cloud-offline-outline"
            size={24}
            color={COLORS.neutral[800]}
            testID={`${testID}-icon`}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title} testID={`${testID}-title`}>
            You're currently offline
          </Text>
          <Text style={styles.subtitle} testID={`${testID}-subtitle`}>
            Reflections are saved locally
          </Text>
        </View>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={onRetry}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Retry connection"
          testID={`${testID}-retry-button`}
        >
          <Text style={styles.retryButtonText}>RETRY</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Animated version for native platforms
function OfflineBannerNative({
  visible,
  onRetry,
  testID = 'offline-banner',
}: OfflineBannerProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);
  const { isConnected, isLoading } = useNetworkState();

  // Animation values
  const slideY = useSharedValue(-100);
  const opacity = useSharedValue(0);

  // If visible is explicitly set, use it; otherwise use network state (wait for loading)
  const shouldShow = visible !== undefined ? visible : (!isLoading && !isConnected);

  // Animate in/out based on visibility
  useEffect(() => {
    if (shouldShow) {
      slideY.value = withTiming(0, {
        duration: ANIMATION.normal,
        easing: Easing.out(Easing.ease),
      });
      opacity.value = withTiming(1, { duration: ANIMATION.normal });
    } else {
      slideY.value = withTiming(-100, {
        duration: ANIMATION.fast,
        easing: Easing.in(Easing.ease),
      });
      opacity.value = withTiming(0, { duration: ANIMATION.fast });
    }
  }, [shouldShow, slideY, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: slideY.value }],
    opacity: opacity.value,
  }));

  // Don't render if visible is not explicitly true and we're loading
  if (visible === undefined && isLoading) {
    return null;
  }

  // Don't render at all if explicitly set to false
  if (!shouldShow) {
    return null;
  }

  const styles = createStyles(colors, isDark);

  return (
    <Animated.View
      testID={testID}
      style={[styles.container, animatedStyle]}
      accessibilityRole="alert"
      accessibilityLabel="You're currently offline. Reflections are saved locally."
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons
            name="cloud-offline-outline"
            size={24}
            color={COLORS.neutral[800]}
            testID={`${testID}-icon`}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title} testID={`${testID}-title`}>
            You're currently offline
          </Text>
          <Text style={styles.subtitle} testID={`${testID}-subtitle`}>
            Reflections are saved locally
          </Text>
        </View>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={onRetry}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Retry connection"
          testID={`${testID}-retry-button`}
        >
          <Text style={styles.retryButtonText}>RETRY</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

/**
 * OfflineBanner - A reusable offline status banner
 *
 * @example
 * // Automatic mode (shows when offline, hides when online)
 * <OfflineBanner onRetry={() => checkConnection()} />
 *
 * @example
 * // Manual control mode
 * <OfflineBanner visible={isOffline} onRetry={handleRetry} />
 */
export function OfflineBanner(props: OfflineBannerProps) {
  if (Platform.OS === 'web') {
    return <OfflineBannerWeb {...props} />;
  }
  return <OfflineBannerNative {...props} />;
}

const createStyles = (
  colors: ReturnType<typeof getThemedColors>,
  isDark: boolean
) =>
  StyleSheet.create({
    container: {
      backgroundColor: COLORS.warning,
      borderRadius: RADII.md,
      marginHorizontal: SPACING.lg,
      marginVertical: SPACING.sm,
      overflow: 'hidden',
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: SPACING.md,
      paddingHorizontal: SPACING.lg,
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: RADII.full,
      backgroundColor: withAlpha(COLORS.neutral[800], 0.1),
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: SPACING.md,
    },
    textContainer: {
      flex: 1,
    },
    title: {
      ...TYPOGRAPHY.styles.bodyBold,
      color: COLORS.neutral[900],
      marginBottom: SPACING.xs / 2,
    },
    subtitle: {
      ...TYPOGRAPHY.styles.caption,
      color: withAlpha(COLORS.neutral[800], 0.8),
    },
    retryButton: {
      backgroundColor: withAlpha(COLORS.neutral[900], 0.15),
      paddingHorizontal: SPACING.lg,
      paddingVertical: SPACING.sm,
      borderRadius: RADII.sm,
      marginLeft: SPACING.sm,
    },
    retryButtonText: {
      ...TYPOGRAPHY.styles.label,
      color: COLORS.neutral[900],
      fontWeight: '700',
    },
  });

export default OfflineBanner;
