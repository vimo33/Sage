/**
 * VoiceInputButton Component
 *
 * A microphone button that enables hands-free voice input for questions.
 * Provides visual feedback during recording and transcription states.
 * Uses on-device speech recognition for privacy-preserving transcription.
 */

import React, { useState, useCallback, useEffect } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Animated,
  useColorScheme,
  Alert,
  Platform,
} from 'react-native';
import {
  checkSpeechRecognitionAvailability,
  requestSpeechRecognitionPermission,
  getSpeechRecognitionPermission,
  startSpeechRecognition,
  stopSpeechRecognition,
  useSpeechRecognitionEvent,
} from '../../lib/stt';
import { HapticPatterns } from '../../lib/haptics';
import { COLORS, SPACING, RADII, withAlpha, getThemedColors } from '../../lib/ui/theme';

export type VoiceInputButtonProps = {
  /** Callback when transcription is received */
  onTranscript: (transcript: string) => void;
  /** Callback when recording starts */
  onRecordingStart?: () => void;
  /** Callback when recording ends */
  onRecordingEnd?: () => void;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Test ID for testing */
  testID?: string;
};

export function VoiceInputButton({
  onTranscript,
  onRecordingStart,
  onRecordingEnd,
  disabled = false,
  testID = 'voice-input-btn',
}: VoiceInputButtonProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);

  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [currentTranscript, setCurrentTranscript] = useState('');

  // Pulsing animation for recording state
  const pulseAnim = React.useRef(new Animated.Value(1)).current;

  // Check availability and permissions on mount
  useEffect(() => {
    const checkAvailability = async () => {
      const { available, onDeviceAvailable } = checkSpeechRecognitionAvailability();
      setIsAvailable(available || onDeviceAvailable);

      if (available || onDeviceAvailable) {
        const permission = await getSpeechRecognitionPermission();
        setHasPermission(permission);
      }
    };

    void checkAvailability();
  }, []);

  // Pulse animation during recording
  useEffect(() => {
    if (isRecording) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isRecording, pulseAnim]);

  // Speech recognition event handlers
  useSpeechRecognitionEvent('start', () => {
    setIsRecording(true);
    setCurrentTranscript('');
    onRecordingStart?.();
    void HapticPatterns.buttonPress();
  });

  useSpeechRecognitionEvent('end', () => {
    setIsRecording(false);
    setIsProcessing(false);
    onRecordingEnd?.();
  });

  useSpeechRecognitionEvent('result', (event) => {
    const transcript = event.results[0]?.transcript || '';
    const isFinal = event.isFinal;

    setCurrentTranscript(transcript);

    if (isFinal && transcript.trim()) {
      onTranscript(transcript.trim());
      void HapticPatterns.saveInsight();
    }
  });

  useSpeechRecognitionEvent('error', (event) => {
    console.error('[VoiceInput] Speech recognition error:', event.error);
    setIsRecording(false);
    setIsProcessing(false);
    onRecordingEnd?.();

    // Show user-friendly error message
    const errorMessage = getErrorMessage(event.error);
    if (errorMessage) {
      Alert.alert('Voice Input', errorMessage);
    }
  });

  const handlePress = useCallback(async () => {
    if (disabled || isProcessing) return;

    void HapticPatterns.buttonPress();

    // If currently recording, stop
    if (isRecording) {
      setIsProcessing(true);
      await stopSpeechRecognition();
      return;
    }

    // Check/request permission if needed
    if (hasPermission === null || hasPermission === false) {
      const granted = await requestSpeechRecognitionPermission();
      setHasPermission(granted);

      if (!granted) {
        Alert.alert(
          'Microphone Permission Required',
          'Please enable microphone access in Settings to use voice input.',
          [{ text: 'OK' }]
        );
        return;
      }
    }

    // Check availability
    if (!isAvailable) {
      Alert.alert(
        'Voice Input Unavailable',
        'Speech recognition is not available on this device.',
        [{ text: 'OK' }]
      );
      return;
    }

    // Start recognition
    try {
      await startSpeechRecognition({
        language: 'en-US',
        interimResults: true,
        requiresOnDeviceRecognition: true,
        addsPunctuation: true,
      });
    } catch (error) {
      console.error('[VoiceInput] Failed to start:', error);
      Alert.alert(
        'Voice Input Error',
        'Failed to start voice recognition. Please try again.',
        [{ text: 'OK' }]
      );
    }
  }, [disabled, isProcessing, isRecording, hasPermission, isAvailable]);

  const styles = createStyles(colors, isDark, isRecording, disabled);

  // Don't render if not available
  if (isAvailable === false) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
        <TouchableOpacity
          testID={testID}
          style={[
            styles.button,
            isRecording && styles.buttonRecording,
            disabled && styles.buttonDisabled,
          ]}
          onPress={handlePress}
          disabled={disabled || isProcessing}
          activeOpacity={0.7}
        >
          {isProcessing ? (
            <ActivityIndicator size="small" color={COLORS.primary} />
          ) : (
            <Text style={styles.icon}>{isRecording ? '⏹️' : '🎤'}</Text>
          )}
        </TouchableOpacity>
      </Animated.View>

      {/* Show interim transcript feedback */}
      {isRecording && currentTranscript && (
        <View style={styles.transcriptPreview}>
          <Text style={styles.transcriptText} numberOfLines={2}>
            {currentTranscript}
          </Text>
        </View>
      )}
    </View>
  );
}

/**
 * Get user-friendly error message for speech recognition errors
 */
function getErrorMessage(error: string): string | null {
  switch (error) {
    case 'no-speech':
      return 'No speech detected. Please try speaking again.';
    case 'audio-capture':
      return 'Could not capture audio. Please check your microphone.';
    case 'not-allowed':
      return 'Microphone access was denied. Please enable it in Settings.';
    case 'network':
      return 'Network error. Voice input requires on-device recognition.';
    case 'aborted':
      return null; // User cancelled, no message needed
    default:
      return 'Voice recognition error. Please try again.';
  }
}

const createStyles = (
  colors: ReturnType<typeof getThemedColors>,
  isDark: boolean,
  isRecording: boolean,
  disabled: boolean
) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    button: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: colors.surfaceAlt,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    buttonRecording: {
      backgroundColor: withAlpha(COLORS.danger, 0.2),
      borderColor: COLORS.danger,
    },
    buttonDisabled: {
      opacity: 0.5,
    },
    icon: {
      fontSize: 18,
    },
    transcriptPreview: {
      position: 'absolute',
      bottom: 50,
      left: -100,
      right: -100,
      backgroundColor: colors.surface,
      borderRadius: RADII.md,
      padding: SPACING.sm,
      borderWidth: 1,
      borderColor: colors.border,
      ...Platform.select({
        ios: {
          shadowColor: COLORS.black,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        android: {
          elevation: 3,
        },
      }),
    },
    transcriptText: {
      color: colors.textSecondary,
      fontSize: 12,
      textAlign: 'center',
      fontStyle: 'italic',
    },
  });

export default VoiceInputButton;
