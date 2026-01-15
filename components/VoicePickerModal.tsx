import { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import * as Speech from 'expo-speech';
import { useSageStore } from '../lib/storage/store';
import {
  COLORS,
  SPACING,
  RADII,
  TYPOGRAPHY,
  getThemedColors,
} from '../lib/ui/theme';

interface VoiceOption {
  identifier: string;
  name: string;
  language: string;
  quality: string;
}

interface VoicePickerModalProps {
  visible: boolean;
  onClose: () => void;
}

export function VoicePickerModal({ visible, onClose }: VoicePickerModalProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);

  const preferences = useSageStore((s) => s.preferences);
  const setPreferences = useSageStore((s) => s.setPreferences);

  const [voices, setVoices] = useState<VoiceOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTesting, setIsTesting] = useState<string | null>(null);

  // Load available voices on mount
  useEffect(() => {
    if (visible) {
      loadVoices();
    }
  }, [visible]);

  const loadVoices = async () => {
    setIsLoading(true);
    try {
      const availableVoices = await Speech.getAvailableVoicesAsync();

      // Filter to English voices and format them
      const englishVoices = availableVoices
        .filter((v) => v.language.startsWith('en'))
        .map((v) => ({
          identifier: v.identifier,
          name: v.name || v.identifier,
          language: v.language,
          quality: v.quality || 'Default',
        }))
        .sort((a, b) => a.name.localeCompare(b.name));

      setVoices(englishVoices);
    } catch (error) {
      console.error('[VoicePicker] Failed to load voices:', error);
      setVoices([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectVoice = useCallback((voiceId: string | null) => {
    setPreferences({ selectedVoiceId: voiceId });
  }, [setPreferences]);

  const handleTestVoice = useCallback(async (voiceId: string) => {
    setIsTesting(voiceId);
    try {
      // Stop any current speech
      const isSpeaking = await Speech.isSpeakingAsync();
      if (isSpeaking) {
        await Speech.stop();
      }

      // Test the voice
      Speech.speak('Hello, I am your Sage companion. I will guide you on your journey of wisdom.', {
        voice: voiceId,
        rate: preferences.voiceSpeed,
        pitch: 1.0,
        onDone: () => setIsTesting(null),
        onStopped: () => setIsTesting(null),
        onError: () => setIsTesting(null),
      });
    } catch (error) {
      console.error('[VoicePicker] Failed to test voice:', error);
      setIsTesting(null);
    }
  }, [preferences.voiceSpeed]);

  const handleStopTest = useCallback(async () => {
    try {
      await Speech.stop();
      setIsTesting(null);
    } catch (error) {
      console.error('[VoicePicker] Failed to stop test:', error);
    }
  }, []);

  const styles = createStyles(colors, isDark);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Voice Selection</Text>
            <TouchableOpacity
              testID="voice-picker-modal-close"
              onPress={onClose}
              style={styles.modalCloseBtn}
            >
              <Text style={styles.modalCloseText}>X</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.description}>
            Choose a voice for Sage's narration. Tap the play button to preview.
          </Text>

          <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
            {/* Default System Voice Option */}
            <TouchableOpacity
              testID="voice-option-default"
              style={[
                styles.voiceItem,
                preferences.selectedVoiceId === null && styles.voiceItemActive,
              ]}
              onPress={() => handleSelectVoice(null)}
            >
              <View style={styles.voiceRadio}>
                {preferences.selectedVoiceId === null && (
                  <View style={styles.voiceRadioInner} />
                )}
              </View>
              <View style={styles.voiceContent}>
                <Text style={styles.voiceName}>System Default</Text>
                <Text style={styles.voiceDescription}>
                  Use your device's default voice
                </Text>
              </View>
            </TouchableOpacity>

            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator color={COLORS.primary} size="large" />
                <Text style={styles.loadingText}>Loading available voices...</Text>
              </View>
            ) : voices.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  No additional voices available on this device.
                </Text>
              </View>
            ) : (
              voices.map((voice) => (
                <View key={voice.identifier} style={styles.voiceItemWrapper}>
                  <TouchableOpacity
                    testID={`voice-option-${voice.identifier}`}
                    style={[
                      styles.voiceItem,
                      preferences.selectedVoiceId === voice.identifier && styles.voiceItemActive,
                    ]}
                    onPress={() => handleSelectVoice(voice.identifier)}
                  >
                    <View style={styles.voiceRadio}>
                      {preferences.selectedVoiceId === voice.identifier && (
                        <View style={styles.voiceRadioInner} />
                      )}
                    </View>
                    <View style={styles.voiceContent}>
                      <Text style={styles.voiceName}>{voice.name}</Text>
                      <Text style={styles.voiceDescription}>
                        {voice.language} • {voice.quality}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    testID={`voice-test-${voice.identifier}`}
                    style={styles.testButton}
                    onPress={() =>
                      isTesting === voice.identifier
                        ? handleStopTest()
                        : handleTestVoice(voice.identifier)
                    }
                  >
                    {isTesting === voice.identifier ? (
                      <Text style={styles.testButtonText}>Stop</Text>
                    ) : (
                      <Text style={styles.testButtonText}>Test</Text>
                    )}
                  </TouchableOpacity>
                </View>
              ))
            )}
          </ScrollView>

          <View style={styles.infoSection}>
            <Text style={styles.infoText}>
              Voice availability depends on your device's language settings and installed voice packs.
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const createStyles = (colors: ReturnType<typeof getThemedColors>, isDark: boolean) =>
  StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'flex-end',
    },
    modalContent: {
      backgroundColor: colors.background,
      borderTopLeftRadius: RADII.xl,
      borderTopRightRadius: RADII.xl,
      padding: SPACING.xl,
      paddingBottom: 40,
      maxHeight: '80%',
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: SPACING.md,
    },
    modalTitle: {
      ...TYPOGRAPHY.styles.h2,
      color: colors.text,
    },
    modalCloseBtn: {
      width: 32,
      height: 32,
      borderRadius: RADII.full,
      backgroundColor: colors.surfaceAlt,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalCloseText: {
      color: colors.text,
      fontSize: 14,
      fontWeight: '600',
    },
    description: {
      ...TYPOGRAPHY.styles.body,
      color: colors.textSecondary,
      marginBottom: SPACING.lg,
    },
    scrollView: {
      maxHeight: 400,
    },
    voiceItemWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: SPACING.sm,
    },
    voiceItem: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      padding: SPACING.lg,
      borderRadius: RADII.md,
      borderWidth: 1,
      borderColor: 'transparent',
      marginBottom: SPACING.sm,
    },
    voiceItemActive: {
      borderColor: COLORS.primary,
      backgroundColor: COLORS.primaryLight,
    },
    voiceRadio: {
      width: 20,
      height: 20,
      borderRadius: RADII.full,
      borderWidth: 2,
      borderColor: colors.textMuted,
      marginRight: SPACING.md,
      justifyContent: 'center',
      alignItems: 'center',
    },
    voiceRadioInner: {
      width: 10,
      height: 10,
      borderRadius: RADII.full,
      backgroundColor: COLORS.primary,
    },
    voiceContent: {
      flex: 1,
    },
    voiceName: {
      fontSize: 15,
      fontWeight: '600',
      color: colors.text,
    },
    voiceDescription: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textSecondary,
      marginTop: 2,
    },
    testButton: {
      backgroundColor: colors.surfaceAlt,
      paddingHorizontal: SPACING.md,
      paddingVertical: SPACING.sm,
      borderRadius: RADII.sm,
      marginLeft: SPACING.sm,
      marginBottom: SPACING.sm,
    },
    testButtonText: {
      ...TYPOGRAPHY.styles.caption,
      color: COLORS.primary,
      fontWeight: '600',
    },
    loadingContainer: {
      alignItems: 'center',
      padding: SPACING.xxl,
    },
    loadingText: {
      ...TYPOGRAPHY.styles.body,
      color: colors.textSecondary,
      marginTop: SPACING.md,
    },
    emptyContainer: {
      alignItems: 'center',
      padding: SPACING.xxl,
    },
    emptyText: {
      ...TYPOGRAPHY.styles.body,
      color: colors.textMuted,
      textAlign: 'center',
    },
    infoSection: {
      marginTop: SPACING.lg,
      padding: SPACING.md,
      backgroundColor: colors.surfaceAlt,
      borderRadius: RADII.md,
    },
    infoText: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textMuted,
      textAlign: 'center',
      fontStyle: 'italic',
    },
  });

export default VoicePickerModal;
