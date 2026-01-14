/**
 * OfflineIndicator Component
 *
 * Persistent visual indicator showing network status and on-device processing.
 * Reinforces the privacy promise with real-time status:
 * - When offline: Shows "Fully Private - On-Device Only" (green/positive)
 * - When online: Shows "Network Available - Processing Stays Local" (info)
 *
 * The app is fully offline-capable, so this indicator is informational
 * and emphasizes the privacy-first architecture.
 */

import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withRepeat,
  Easing,
} from 'react-native-reanimated';
import {
  COLORS,
  SPACING,
  RADII,
  TYPOGRAPHY,
  ANIMATION,
  getThemedColors,
  Z_INDEX,
  withAlpha,
} from '../lib/ui/theme';
import { useNetworkState } from '../lib/connectivity/useNetworkState';

interface OfflineIndicatorProps {
  /** Whether to show the indicator even when online */
  alwaysShow?: boolean;
}

export function OfflineIndicator({ alwaysShow = true }: OfflineIndicatorProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);
  const { isConnected, isLoading } = useNetworkState();

  // Animation for the status dot pulse
  const pulseScale = useSharedValue(1);
  const opacity = useSharedValue(0);

  // Animate the indicator appearing
  useEffect(() => {
    if (!isLoading) {
      opacity.value = withTiming(1, { duration: ANIMATION.normal });
    }
  }, [isLoading, opacity]);

  // Pulse animation for the status dot
  useEffect(() => {
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) })
      ),
      -1, // Infinite repeat
      false
    );
  }, [pulseScale]);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  // Don't render anything while loading
  if (isLoading) {
    return null;
  }

  // If not always showing and online, hide
  if (!alwaysShow && isConnected) {
    return null;
  }

  // Determine display content based on connection status
  const isOffline = !isConnected;
  const statusColor = isOffline ? COLORS.success : COLORS.info;
  const statusText = isOffline
    ? 'Fully Private - On-Device Only'
    : 'Network Available - Processing Stays Local';
  const statusIcon = isOffline ? '🔒' : '🛡️';

  const styles = createStyles(colors, isDark, statusColor);

  return (
    <View
      testID="offline-indicator"
      accessibilityRole="none"
      accessibilityLabel={statusText}
    >
      <Animated.View style={[styles.container, containerAnimatedStyle]}>
        <View style={styles.content}>
          <View style={styles.statusSection}>
            <Animated.View style={[styles.statusDot, pulseStyle, { backgroundColor: statusColor }]} />
            <Text style={styles.icon}>{statusIcon}</Text>
            <Text style={styles.statusText} testID="offline-indicator-text">
              {statusText}
            </Text>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const createStyles = (
  colors: ReturnType<typeof getThemedColors>,
  isDark: boolean,
  statusColor: string
) =>
  StyleSheet.create({
    container: {
      zIndex: Z_INDEX.sticky,
      backgroundColor: withAlpha(colors.surface, 0.95),
      borderBottomWidth: 1,
      borderBottomColor: withAlpha(statusColor, 0.3),
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: SPACING.sm,
      paddingHorizontal: SPACING.lg,
    },
    statusSection: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    statusDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginRight: SPACING.sm,
    },
    icon: {
      fontSize: 14,
      marginRight: SPACING.xs,
    },
    statusText: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.text,
      letterSpacing: 0.3,
    },
  });
