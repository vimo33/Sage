/**
 * OfflineIndicator Component
 *
 * Persistent visual indicator showing network status, sync status, and on-device processing.
 * Reinforces the privacy promise with real-time status:
 * - When offline: Shows "Fully Private - On-Device Only" (green/positive)
 * - When online: Shows "Network Available - Processing Stays Local" (info)
 * - Shows sync status when there are pending changes
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
  Platform,
  TouchableOpacity,
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
  TYPOGRAPHY,
  ANIMATION,
  getThemedColors,
  Z_INDEX,
  withAlpha,
} from '../lib/ui/theme';
import { useNetworkState } from '../lib/connectivity/useNetworkState';
import { useSyncState } from '../lib/offline-sync/useSyncState';

interface OfflineIndicatorProps {
  /** Whether to show the indicator even when online */
  alwaysShow?: boolean;
  /** Callback when sync button is pressed */
  onSyncPress?: () => void;
}

// Static version for web (no animations to avoid worklet issues)
function OfflineIndicatorWeb({ alwaysShow = true, onSyncPress }: OfflineIndicatorProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);
  const { isConnected, isLoading } = useNetworkState();
  const { pendingCount, isSyncing, hasPendingChanges, lastSyncFormatted, sync } = useSyncState();

  // Don't render anything while loading
  if (isLoading) {
    return null;
  }

  // If not always showing and online, hide
  if (!alwaysShow && isConnected) {
    return null;
  }

  // Determine display content based on connection and sync status
  const isOffline = !isConnected;

  // Determine status color and text based on state
  let statusColor: string;
  let statusText: string;
  let statusIcon: string;
  let syncStatusText: string | null = null;

  if (isOffline) {
    statusColor = COLORS.success;
    statusText = 'Fully Private - On-Device Only';
    statusIcon = '🔒';
    if (hasPendingChanges) {
      syncStatusText = `${pendingCount} change${pendingCount > 1 ? 's' : ''} waiting to sync`;
    }
  } else if (isSyncing) {
    statusColor = COLORS.info;
    statusText = 'Syncing...';
    statusIcon = '🔄';
  } else if (hasPendingChanges) {
    statusColor = COLORS.warning;
    statusText = 'Changes pending sync';
    statusIcon = '📤';
    syncStatusText = `${pendingCount} item${pendingCount > 1 ? 's' : ''} to sync`;
  } else {
    statusColor = COLORS.info;
    statusText = 'Network Available - Processing Stays Local';
    statusIcon = '🛡️';
    if (lastSyncFormatted) {
      syncStatusText = `Last synced: ${lastSyncFormatted}`;
    }
  }

  const styles = createStyles(colors, isDark, statusColor);

  const handleSyncPress = async () => {
    if (onSyncPress) {
      onSyncPress();
    } else if (isConnected && !isSyncing) {
      await sync();
    }
  };

  return (
    <View
      testID="offline-indicator"
      accessibilityRole="none"
      accessibilityLabel={statusText}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.content}
          onPress={handleSyncPress}
          disabled={!isConnected || isSyncing}
          activeOpacity={0.7}
        >
          <View style={styles.statusSection}>
            <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
            <Text style={styles.icon}>{statusIcon}</Text>
            <Text style={styles.statusText} testID="offline-indicator-text">
              {statusText}
            </Text>
          </View>
          {syncStatusText && (
            <Text style={styles.syncStatusText}>
              {syncStatusText}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Animated version for native platforms
function OfflineIndicatorNative({ alwaysShow = true, onSyncPress }: OfflineIndicatorProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);
  const { isConnected, isLoading } = useNetworkState();
  const { pendingCount, isSyncing, hasPendingChanges, lastSyncFormatted, sync } = useSyncState();

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

  // Determine display content based on connection and sync status
  const isOffline = !isConnected;

  // Determine status color and text based on state
  let statusColor: string;
  let statusText: string;
  let statusIcon: string;
  let syncStatusText: string | null = null;

  if (isOffline) {
    statusColor = COLORS.success;
    statusText = 'Fully Private - On-Device Only';
    statusIcon = '🔒';
    if (hasPendingChanges) {
      syncStatusText = `${pendingCount} change${pendingCount > 1 ? 's' : ''} waiting to sync`;
    }
  } else if (isSyncing) {
    statusColor = COLORS.info;
    statusText = 'Syncing...';
    statusIcon = '🔄';
  } else if (hasPendingChanges) {
    statusColor = COLORS.warning;
    statusText = 'Changes pending sync';
    statusIcon = '📤';
    syncStatusText = `${pendingCount} item${pendingCount > 1 ? 's' : ''} to sync`;
  } else {
    statusColor = COLORS.info;
    statusText = 'Network Available - Processing Stays Local';
    statusIcon = '🛡️';
    if (lastSyncFormatted) {
      syncStatusText = `Last synced: ${lastSyncFormatted}`;
    }
  }

  const styles = createStyles(colors, isDark, statusColor);

  const handleSyncPress = async () => {
    if (onSyncPress) {
      onSyncPress();
    } else if (isConnected && !isSyncing) {
      await sync();
    }
  };

  return (
    <View
      testID="offline-indicator"
      accessibilityRole="none"
      accessibilityLabel={statusText}
    >
      <Animated.View style={[styles.container, containerAnimatedStyle]}>
        <TouchableOpacity
          style={styles.content}
          onPress={handleSyncPress}
          disabled={!isConnected || isSyncing}
          activeOpacity={0.7}
        >
          <View style={styles.statusSection}>
            <Animated.View style={[styles.statusDot, pulseStyle, { backgroundColor: statusColor }]} />
            <Text style={styles.icon}>{statusIcon}</Text>
            <Text style={styles.statusText} testID="offline-indicator-text">
              {statusText}
            </Text>
          </View>
          {syncStatusText && (
            <Text style={styles.syncStatusText}>
              {syncStatusText}
            </Text>
          )}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

// Export the appropriate component based on platform
export function OfflineIndicator(props: OfflineIndicatorProps) {
  if (Platform.OS === 'web') {
    return <OfflineIndicatorWeb {...props} />;
  }
  return <OfflineIndicatorNative {...props} />;
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
      flexDirection: 'column',
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
    syncStatusText: {
      ...TYPOGRAPHY.styles.caption,
      color: withAlpha(colors.textSecondary, 0.8),
      fontSize: 10,
      marginTop: 2,
    },
  });
