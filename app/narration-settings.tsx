import { router } from 'expo-router';
import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Switch,
  useColorScheme,
} from 'react-native';
import { useSageStore } from '../lib/storage/store';
import {
  COLORS,
  SPACING,
  RADII,
  TYPOGRAPHY,
  SHADOWS,
  withAlpha,
  getThemedColors,
} from '../lib/ui/theme';
import { VoicePickerModal } from '../components/VoicePickerModal';

// Speed labels for the slider
const SPEED_LABELS = ['Slow', 'Normal', 'Fast'] as const;
type SpeedLabel = (typeof SPEED_LABELS)[number];

// Map speed values to labels
function getSpeedLabel(speed: number): SpeedLabel {
  if (speed <= 0.7) return 'Slow';
  if (speed <= 1.3) return 'Normal';
  return 'Fast';
}

// Map labels to speed values
function getSpeedValue(label: SpeedLabel): number {
  switch (label) {
    case 'Slow':
      return 0.5;
    case 'Normal':
      return 1.0;
    case 'Fast':
      return 1.5;
  }
}

export default function NarrationSettingsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);

  const preferences = useSageStore((s) => s.preferences);
  const setPreferences = useSageStore((s) => s.setPreferences);

  const [showVoicePicker, setShowVoicePicker] = useState(false);

  const styles = createStyles(colors, isDark);

  const handleBack = () => {
    router.back();
  };

  const handleSkip = () => {
    // Navigate to the main app or previous screen
    router.back();
  };

  const handleFinishSetup = () => {
    // Complete the setup and navigate
    router.back();
  };

  // Get display name for selected voice
  const getVoiceDisplayName = (): string => {
    if (!preferences.selectedVoiceId) {
      return 'System Default';
    }
    // Extract a readable name from the voice identifier
    const id = preferences.selectedVoiceId;
    // Common patterns: "com.apple.voice.compact.en-US.Samantha" -> "Samantha"
    const parts = id.split('.');
    return parts[parts.length - 1] || 'Custom Voice';
  };

  const currentSpeedLabel = getSpeedLabel(preferences.voiceSpeed);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleBack}
          style={styles.backButton}
          testID="narration-settings-back"
        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Narration Settings</Text>
        <TouchableOpacity onPress={handleSkip} testID="narration-settings-skip">
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Heading */}
        <Text style={styles.headline}>Customize your experience</Text>
        <Text style={styles.subheadline}>
          Configure how Sage narrates responses and guides you through reflections.
        </Text>

        {/* Settings Section */}
        <View style={styles.settingsGroup}>
          {/* Enable Narration Toggle */}
          <View style={styles.settingRow} testID="enable-narration-row">
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingLabel}>Enable Narration</Text>
              <Text style={styles.settingSublabel}>
                Hear voice guidance during sessions
              </Text>
            </View>
            <Switch
              value={preferences.narrateResponses}
              onValueChange={(val) => setPreferences({ narrateResponses: val })}
              trackColor={{ false: colors.surfaceAlt, true: COLORS.primary }}
              testID="narration-toggle"
            />
          </View>

          {/* Voice Selector */}
          <TouchableOpacity
            style={styles.settingRow}
            onPress={() => setShowVoicePicker(true)}
            testID="voice-selector"
            disabled={!preferences.narrateResponses}
          >
            <View style={styles.settingTextContainer}>
              <Text
                style={[
                  styles.settingLabel,
                  !preferences.narrateResponses && styles.settingLabelDisabled,
                ]}
              >
                Voice
              </Text>
              <Text
                style={[
                  styles.settingSublabel,
                  !preferences.narrateResponses && styles.settingSublabelDisabled,
                ]}
              >
                Select the voice for narration
              </Text>
            </View>
            <View style={styles.dropdownContainer}>
              <Text
                style={[
                  styles.dropdownValue,
                  !preferences.narrateResponses && styles.dropdownValueDisabled,
                ]}
              >
                {getVoiceDisplayName()}
              </Text>
              <Text
                style={[
                  styles.dropdownArrow,
                  !preferences.narrateResponses && styles.dropdownArrowDisabled,
                ]}
              >
                ▼
              </Text>
            </View>
          </TouchableOpacity>

          {/* Speaking Speed Slider */}
          <View style={styles.settingBox} testID="speaking-speed-section">
            <View style={styles.settingHeader}>
              <Text
                style={[
                  styles.settingLabel,
                  !preferences.narrateResponses && styles.settingLabelDisabled,
                ]}
              >
                Speaking Speed
              </Text>
              <Text
                style={[
                  styles.speedValueBadge,
                  !preferences.narrateResponses && styles.speedValueBadgeDisabled,
                ]}
              >
                {currentSpeedLabel}
              </Text>
            </View>

            {/* Speed Labels Row */}
            <View style={styles.speedLabelsRow}>
              {SPEED_LABELS.map((label) => (
                <TouchableOpacity
                  key={label}
                  style={[
                    styles.speedLabelButton,
                    currentSpeedLabel === label && styles.speedLabelButtonActive,
                    !preferences.narrateResponses && styles.speedLabelButtonDisabled,
                  ]}
                  onPress={() => setPreferences({ voiceSpeed: getSpeedValue(label) })}
                  disabled={!preferences.narrateResponses}
                  testID={`speed-${label.toLowerCase()}`}
                >
                  <Text
                    style={[
                      styles.speedLabelText,
                      currentSpeedLabel === label && styles.speedLabelTextActive,
                      !preferences.narrateResponses && styles.speedLabelTextDisabled,
                    ]}
                  >
                    {label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Custom Slider Track */}
            <View
              style={[
                styles.sliderTrack,
                !preferences.narrateResponses && styles.sliderTrackDisabled,
              ]}
            >
              <View
                style={[
                  styles.sliderFill,
                  {
                    width: `${((preferences.voiceSpeed - 0.5) / 1.5) * 100}%`,
                  },
                  !preferences.narrateResponses && styles.sliderFillDisabled,
                ]}
              />
              {/* Slider Thumb */}
              <View
                style={[
                  styles.sliderThumb,
                  {
                    left: `${((preferences.voiceSpeed - 0.5) / 1.5) * 100}%`,
                  },
                  !preferences.narrateResponses && styles.sliderThumbDisabled,
                ]}
              />
            </View>

            {/* Fine-tune buttons */}
            <View style={styles.finetuneRow}>
              <TouchableOpacity
                style={[
                  styles.finetuneButton,
                  !preferences.narrateResponses && styles.finetuneButtonDisabled,
                ]}
                onPress={() =>
                  setPreferences({
                    voiceSpeed: Math.max(0.5, preferences.voiceSpeed - 0.1),
                  })
                }
                disabled={!preferences.narrateResponses}
                testID="speed-decrease"
              >
                <Text
                  style={[
                    styles.finetuneButtonText,
                    !preferences.narrateResponses && styles.finetuneButtonTextDisabled,
                  ]}
                >
                  -
                </Text>
              </TouchableOpacity>
              <Text
                style={[
                  styles.speedNumericValue,
                  !preferences.narrateResponses && styles.speedNumericValueDisabled,
                ]}
              >
                {preferences.voiceSpeed.toFixed(1)}x
              </Text>
              <TouchableOpacity
                style={[
                  styles.finetuneButton,
                  !preferences.narrateResponses && styles.finetuneButtonDisabled,
                ]}
                onPress={() =>
                  setPreferences({
                    voiceSpeed: Math.min(2.0, preferences.voiceSpeed + 0.1),
                  })
                }
                disabled={!preferences.narrateResponses}
                testID="speed-increase"
              >
                <Text
                  style={[
                    styles.finetuneButtonText,
                    !preferences.narrateResponses && styles.finetuneButtonTextDisabled,
                  ]}
                >
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Privacy Notice */}
        <View style={styles.privacyNotice} testID="privacy-notice">
          <Text style={styles.privacyIcon}>🔒</Text>
          <Text style={styles.privacyText}>
            All narration is processed on your device. Your voice preferences and
            settings remain private and are never shared.
          </Text>
        </View>
      </ScrollView>

      {/* Footer with Finish Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleFinishSetup}
          testID="finish-setup-button"
        >
          <Text style={styles.primaryButtonText}>Finish Setup</Text>
        </TouchableOpacity>
      </View>

      {/* Voice Picker Modal */}
      <VoicePickerModal
        visible={showVoicePicker}
        onClose={() => setShowVoicePicker(false)}
      />
    </SafeAreaView>
  );
}

const createStyles = (
  colors: ReturnType<typeof getThemedColors>,
  isDark: boolean
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: SPACING.lg,
      height: 60,
    },
    backButton: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    backText: {
      color: colors.text,
      fontSize: 24,
    },
    headerTitle: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '700',
    },
    skipText: {
      color: colors.textSecondary,
      fontSize: 14,
      fontWeight: '600',
    },
    scrollContent: {
      flex: 1,
    },
    scrollContainer: {
      paddingHorizontal: SPACING.xl,
      paddingBottom: 40,
    },
    headline: {
      fontSize: 28,
      fontWeight: '800',
      color: COLORS.white,
      marginTop: SPACING.md,
      marginBottom: SPACING.xs,
    },
    subheadline: {
      fontSize: 16,
      color: colors.textSecondary,
      marginBottom: SPACING.xxl,
      lineHeight: 22,
    },
    settingsGroup: {
      gap: SPACING.md,
    },
    settingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.surface,
      padding: SPACING.lg,
      borderRadius: RADII.md,
    },
    settingTextContainer: {
      flex: 1,
      marginRight: SPACING.md,
    },
    settingLabel: {
      fontSize: 16,
      fontWeight: '700',
      color: COLORS.white,
    },
    settingLabelDisabled: {
      color: colors.textMuted,
    },
    settingSublabel: {
      fontSize: 13,
      color: colors.textSecondary,
      marginTop: 2,
    },
    settingSublabelDisabled: {
      color: colors.textMuted,
    },
    dropdownContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surfaceAlt,
      paddingHorizontal: SPACING.md,
      paddingVertical: SPACING.sm,
      borderRadius: RADII.sm,
    },
    dropdownValue: {
      color: COLORS.white,
      fontSize: 14,
      fontWeight: '500',
      marginRight: SPACING.sm,
    },
    dropdownValueDisabled: {
      color: colors.textMuted,
    },
    dropdownArrow: {
      color: colors.textSecondary,
      fontSize: 10,
    },
    dropdownArrowDisabled: {
      color: colors.textMuted,
    },
    settingBox: {
      backgroundColor: colors.surface,
      padding: SPACING.lg,
      borderRadius: RADII.md,
    },
    settingHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: SPACING.lg,
    },
    speedValueBadge: {
      color: COLORS.primary,
      fontWeight: 'bold',
      backgroundColor: withAlpha(COLORS.primary, 0.1),
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: RADII.sm,
      fontSize: 13,
    },
    speedValueBadgeDisabled: {
      color: colors.textMuted,
      backgroundColor: colors.surfaceAlt,
    },
    speedLabelsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: SPACING.lg,
    },
    speedLabelButton: {
      flex: 1,
      paddingVertical: SPACING.sm,
      paddingHorizontal: SPACING.md,
      marginHorizontal: SPACING.xs,
      borderRadius: RADII.sm,
      backgroundColor: colors.surfaceAlt,
      alignItems: 'center',
    },
    speedLabelButtonActive: {
      backgroundColor: withAlpha(COLORS.primary, 0.15),
      borderWidth: 1,
      borderColor: COLORS.primary,
    },
    speedLabelButtonDisabled: {
      opacity: 0.5,
    },
    speedLabelText: {
      color: colors.textSecondary,
      fontSize: 14,
      fontWeight: '600',
    },
    speedLabelTextActive: {
      color: COLORS.primary,
    },
    speedLabelTextDisabled: {
      color: colors.textMuted,
    },
    sliderTrack: {
      height: 6,
      backgroundColor: colors.surfaceAlt,
      borderRadius: 3,
      marginBottom: SPACING.lg,
      position: 'relative',
    },
    sliderTrackDisabled: {
      opacity: 0.5,
    },
    sliderFill: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      backgroundColor: COLORS.primary,
      borderRadius: 3,
    },
    sliderFillDisabled: {
      backgroundColor: colors.textMuted,
    },
    sliderThumb: {
      position: 'absolute',
      top: -5,
      width: 16,
      height: 16,
      borderRadius: 8,
      backgroundColor: COLORS.primary,
      marginLeft: -8,
      ...SHADOWS.sm,
    },
    sliderThumbDisabled: {
      backgroundColor: colors.textMuted,
    },
    finetuneRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: SPACING.lg,
    },
    finetuneButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.surfaceAlt,
      justifyContent: 'center',
      alignItems: 'center',
    },
    finetuneButtonDisabled: {
      opacity: 0.5,
    },
    finetuneButtonText: {
      color: COLORS.white,
      fontSize: 22,
      fontWeight: '600',
    },
    finetuneButtonTextDisabled: {
      color: colors.textMuted,
    },
    speedNumericValue: {
      color: COLORS.white,
      fontSize: 18,
      fontWeight: '700',
      minWidth: 50,
      textAlign: 'center',
    },
    speedNumericValueDisabled: {
      color: colors.textMuted,
    },
    privacyNotice: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      backgroundColor: withAlpha(COLORS.primary, 0.08),
      padding: SPACING.lg,
      borderRadius: RADII.md,
      marginTop: SPACING.xxl,
      borderWidth: 1,
      borderColor: withAlpha(COLORS.primary, 0.2),
    },
    privacyIcon: {
      fontSize: 18,
      marginRight: SPACING.md,
    },
    privacyText: {
      flex: 1,
      fontSize: 13,
      color: colors.textSecondary,
      lineHeight: 20,
    },
    footer: {
      padding: SPACING.xl,
      paddingBottom: SPACING.xxl,
    },
    primaryButton: {
      backgroundColor: COLORS.primary,
      height: 56,
      borderRadius: RADII.md,
      justifyContent: 'center',
      alignItems: 'center',
      ...SHADOWS.sm,
    },
    primaryButtonText: {
      color: COLORS.black,
      fontSize: 18,
      fontWeight: '700',
    },
  });
