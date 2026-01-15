/**
 * AudioPlayerCard Component
 *
 * An audio player card with waveform visualization and speed control
 * for TTS (text-to-speech) playback of insight content.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  Animated,
} from 'react-native';
import { COLORS, SPACING, RADII, withAlpha, TYPOGRAPHY, getThemedColors } from '../../lib/ui/theme';
import { speakAssistantReply, stopSpeaking, isSpeakingAsync } from '../../lib/tts/service';
import { HapticPatterns } from '../../lib/haptics';
import { useSageStore } from '../../lib/storage/store';

interface AudioPlayerCardProps {
  text: string;
  testID?: string;
}

const WAVEFORM_BAR_COUNT = 20;
const SPEED_OPTIONS = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];

export function AudioPlayerCard({ text, testID }: AudioPlayerCardProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);

  const preferences = useSageStore((s) => s.preferences);
  const setPreferences = useSageStore((s) => s.setPreferences);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(preferences.voiceSpeed || 1.0);
  const [showSpeedOptions, setShowSpeedOptions] = useState(false);

  // Animated values for waveform bars
  const waveformAnimations = useRef<Animated.Value[]>(
    Array.from({ length: WAVEFORM_BAR_COUNT }, () => new Animated.Value(0.3))
  ).current;

  // Animation loop reference
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  const styles = createStyles(colors, isDark);

  // Start waveform animation
  const startWaveformAnimation = useCallback(() => {
    const animations = waveformAnimations.map((anim, index) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 0.3 + Math.random() * 0.7,
            duration: 150 + Math.random() * 200,
            useNativeDriver: false,
          }),
          Animated.timing(anim, {
            toValue: 0.2 + Math.random() * 0.3,
            duration: 150 + Math.random() * 200,
            useNativeDriver: false,
          }),
        ])
      );
    });

    animationRef.current = Animated.parallel(animations);
    animationRef.current.start();
  }, [waveformAnimations]);

  // Stop waveform animation
  const stopWaveformAnimation = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.stop();
    }
    // Reset all bars to idle state
    waveformAnimations.forEach((anim) => {
      Animated.timing(anim, {
        toValue: 0.3,
        duration: 200,
        useNativeDriver: false,
      }).start();
    });
  }, [waveformAnimations]);

  // Handle play/pause
  const handlePlayPause = useCallback(async () => {
    if (isPlaying) {
      // Stop playback
      stopSpeaking();
      setIsPlaying(false);
      stopWaveformAnimation();
      void HapticPatterns.stopTTS();
    } else {
      // Start playback
      void HapticPatterns.startTTS();
      setIsPlaying(true);
      startWaveformAnimation();

      // Create a modified preferences object with the current speed
      const modifiedPreferences = {
        ...preferences,
        voiceSpeed: currentSpeed,
        narrateResponses: true, // Force enable for this playback
      };

      await speakAssistantReply(text, modifiedPreferences, {
        onStart: () => {
          setIsPlaying(true);
          startWaveformAnimation();
        },
        onDone: () => {
          setIsPlaying(false);
          stopWaveformAnimation();
        },
        onStopped: () => {
          setIsPlaying(false);
          stopWaveformAnimation();
        },
        onError: () => {
          setIsPlaying(false);
          stopWaveformAnimation();
        },
      });
    }
  }, [isPlaying, text, currentSpeed, preferences, startWaveformAnimation, stopWaveformAnimation]);

  // Handle speed change
  const handleSpeedChange = useCallback((speed: number) => {
    setCurrentSpeed(speed);
    setShowSpeedOptions(false);
    // Update user preferences with new speed
    setPreferences({ voiceSpeed: speed });
    void HapticPatterns.selection();
  }, [setPreferences]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
      if (animationRef.current) {
        animationRef.current.stop();
      }
    };
  }, []);

  // Check and sync with TTS state on mount
  useEffect(() => {
    const checkTTSState = async () => {
      const speaking = await isSpeakingAsync();
      if (!speaking && isPlaying) {
        setIsPlaying(false);
        stopWaveformAnimation();
      }
    };
    void checkTTSState();
  }, [isPlaying, stopWaveformAnimation]);

  return (
    <View style={styles.container} testID={testID}>
      {/* Header with label and speed control */}
      <View style={styles.header}>
        <Text style={styles.label}>LISTEN</Text>
        <TouchableOpacity
          style={styles.speedBadge}
          onPress={() => setShowSpeedOptions(!showSpeedOptions)}
          testID={`${testID}-speed-badge`}
        >
          <Text style={styles.speedBadgeText}>{currentSpeed.toFixed(1)}x</Text>
        </TouchableOpacity>
      </View>

      {/* Speed options dropdown */}
      {showSpeedOptions && (
        <View style={styles.speedOptionsContainer}>
          {SPEED_OPTIONS.map((speed) => (
            <TouchableOpacity
              key={speed}
              style={[
                styles.speedOption,
                currentSpeed === speed && styles.speedOptionActive,
              ]}
              onPress={() => handleSpeedChange(speed)}
              testID={`${testID}-speed-option-${speed}`}
            >
              <Text
                style={[
                  styles.speedOptionText,
                  currentSpeed === speed && styles.speedOptionTextActive,
                ]}
              >
                {speed.toFixed(1)}x
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Player controls with waveform */}
      <View style={styles.playerContainer}>
        {/* Play/Pause button */}
        <TouchableOpacity
          style={styles.playButton}
          onPress={handlePlayPause}
          testID={`${testID}-play-button`}
        >
          <View style={styles.playIconContainer}>
            {isPlaying ? (
              // Pause icon (two vertical bars)
              <View style={styles.pauseIcon}>
                <View style={styles.pauseBar} />
                <View style={styles.pauseBar} />
              </View>
            ) : (
              // Play icon (triangle)
              <View style={styles.playIcon} />
            )}
          </View>
        </TouchableOpacity>

        {/* Waveform visualization */}
        <View style={styles.waveformContainer}>
          {waveformAnimations.map((anim, index) => (
            <Animated.View
              key={index}
              style={[
                styles.waveformBar,
                {
                  height: anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['20%', '100%'],
                  }),
                  backgroundColor: isPlaying
                    ? COLORS.primary
                    : withAlpha(COLORS.primary, 0.4),
                },
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const createStyles = (colors: ReturnType<typeof getThemedColors>, isDark: boolean) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.surface,
      borderRadius: RADII.lg,
      padding: SPACING.lg,
      marginBottom: SPACING.xl,
      borderWidth: 1,
      borderColor: colors.border,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: SPACING.md,
    },
    label: {
      ...TYPOGRAPHY.styles.label,
      color: COLORS.primary,
    },
    speedBadge: {
      backgroundColor: withAlpha(COLORS.primary, 0.15),
      paddingHorizontal: SPACING.sm,
      paddingVertical: SPACING.xs,
      borderRadius: RADII.sm,
      borderWidth: 1,
      borderColor: withAlpha(COLORS.primary, 0.3),
    },
    speedBadgeText: {
      color: COLORS.primary,
      fontSize: 12,
      fontWeight: '700',
    },
    speedOptionsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: SPACING.xs,
      marginBottom: SPACING.md,
      padding: SPACING.sm,
      backgroundColor: withAlpha(colors.text, 0.05),
      borderRadius: RADII.sm,
    },
    speedOption: {
      paddingHorizontal: SPACING.md,
      paddingVertical: SPACING.xs,
      borderRadius: RADII.sm,
      backgroundColor: withAlpha(colors.text, 0.1),
    },
    speedOptionActive: {
      backgroundColor: COLORS.primary,
    },
    speedOptionText: {
      color: colors.textSecondary,
      fontSize: 12,
      fontWeight: '600',
    },
    speedOptionTextActive: {
      color: COLORS.primaryText,
    },
    playerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: SPACING.md,
    },
    playButton: {
      width: 48,
      height: 48,
      borderRadius: RADII.full,
      backgroundColor: COLORS.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    playIconContainer: {
      width: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    playIcon: {
      width: 0,
      height: 0,
      marginLeft: 3,
      borderLeftWidth: 14,
      borderTopWidth: 9,
      borderBottomWidth: 9,
      borderLeftColor: COLORS.primaryText,
      borderTopColor: 'transparent',
      borderBottomColor: 'transparent',
    },
    pauseIcon: {
      flexDirection: 'row',
      gap: 4,
    },
    pauseBar: {
      width: 4,
      height: 16,
      backgroundColor: COLORS.primaryText,
      borderRadius: 2,
    },
    waveformContainer: {
      flex: 1,
      height: 40,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
    },
    waveformBar: {
      flex: 1,
      borderRadius: 2,
      minHeight: 8,
    },
  });
