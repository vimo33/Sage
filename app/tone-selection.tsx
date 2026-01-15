import { router } from 'expo-router';
import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  useColorScheme,
} from 'react-native';
import { useSageStore, type TonePreference } from '../lib/storage/store';
import { COLORS, SPACING, RADII, SHADOWS, withAlpha, getThemedColors } from '../lib/ui/theme';

// Tone options with icons matching the requirements
const TONES: { id: TonePreference; title: string; desc: string; icon: string }[] = [
  { id: 'practical', title: 'Practical', desc: 'Direct, actionable advice. No fluff.', icon: '💼' },
  { id: 'poetic', title: 'Poetic', desc: 'Metaphorical and gentle guidance.', icon: '⭐' },
  { id: 'minimal', title: 'Minimal', desc: 'Short, concise prompts. Less is more.', icon: '➖' },
  { id: 'deep', title: 'Deep', desc: 'Philosophical and probing questions.', icon: '👁️' },
];

// Total number of steps in the onboarding flow
const TOTAL_STEPS = 4;
const CURRENT_STEP = 2; // Tone selection is step 2

export default function ToneSelectionScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);

  const preferences = useSageStore((s) => s.preferences);
  const setPreferences = useSageStore((s) => s.setPreferences);

  // Default to 'poetic' if no tone is set (green border default as per requirements)
  const [selectedTone, setSelectedTone] = useState<TonePreference>(
    preferences.tone || 'poetic'
  );

  const styles = createStyles(colors, isDark);

  const handleBack = () => {
    router.back();
  };

  const handleSkip = () => {
    // Skip without saving - go to next step or main app
    router.replace('/(tabs)');
  };

  const handleContinue = () => {
    // Save the selected tone and continue
    setPreferences({ tone: selectedTone });
    router.replace('/(tabs)');
  };

  const handleToneSelect = (toneId: TonePreference) => {
    setSelectedTone(toneId);
  };

  // Render progress dots
  const renderProgressDots = () => {
    return (
      <View style={styles.progressDotsContainer}>
        {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.progressDot,
              {
                backgroundColor:
                  index < CURRENT_STEP
                    ? COLORS.primary
                    : index === CURRENT_STEP - 1
                    ? COLORS.primary
                    : withAlpha(COLORS.primary, 0.3),
              },
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with back arrow and progress dots */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleBack}
          style={styles.backButton}
          testID="back-button"
          accessibilityLabel="Go back"
          accessibilityRole="button"
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        {renderProgressDots()}

        {/* Spacer to balance the header */}
        <View style={styles.headerSpacer} />
      </View>

      {/* Main content */}
      <ScrollView
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading} testID="heading">Choose your tone</Text>
        <Text style={styles.subheading}>
          Customize how Sage responds to your reflections.
        </Text>

        {/* Tone option cards */}
        <View style={styles.optionsList}>
          {TONES.map((tone) => (
            <TouchableOpacity
              key={tone.id}
              style={[
                styles.optionCard,
                selectedTone === tone.id && styles.optionCardActive,
              ]}
              onPress={() => handleToneSelect(tone.id)}
              testID={`tone-option-${tone.id}`}
              accessibilityLabel={`${tone.title}: ${tone.desc}`}
              accessibilityRole="button"
              accessibilityState={{ selected: selectedTone === tone.id }}
            >
              <View style={styles.optionIconContainer}>
                <Text style={styles.optionIcon}>{tone.icon}</Text>
              </View>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>{tone.title}</Text>
                <Text style={styles.optionDesc}>{tone.desc}</Text>
              </View>
              {selectedTone === tone.id && (
                <View style={styles.checkContainer}>
                  <Text style={styles.checkIcon}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Footer with buttons and privacy notice */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.skipLink}
          onPress={handleSkip}
          testID="skip-link"
          accessibilityLabel="Skip for now"
          accessibilityRole="button"
        >
          <Text style={styles.skipLinkText}>Skip for now</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          testID="continue-button"
          accessibilityLabel="Continue"
          accessibilityRole="button"
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>

        <View style={styles.privacyNotice}>
          <Text style={styles.privacyText}>
            🔒 Your preferences stay on your device.
          </Text>
        </View>
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
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: SPACING.lg,
      height: 60,
    },
    backButton: {
      width: 44,
      height: 44,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    backArrow: {
      color: colors.text,
      fontSize: 24,
    },
    progressDotsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: SPACING.sm,
    },
    progressDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },
    headerSpacer: {
      width: 44,
    },
    scrollContent: {
      flex: 1,
    },
    scrollContainer: {
      paddingHorizontal: SPACING.xl,
      paddingBottom: 40,
    },
    heading: {
      fontSize: 28,
      fontWeight: '800',
      color: COLORS.white,
      marginTop: SPACING.md,
      marginBottom: SPACING.xs,
    },
    subheading: {
      fontSize: 16,
      color: colors.textSecondary,
      marginBottom: SPACING.xl,
    },
    optionsList: {
      gap: SPACING.md,
    },
    optionCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      padding: SPACING.lg,
      borderRadius: RADII.md,
      borderWidth: 1,
      borderColor: 'transparent',
    },
    optionCardActive: {
      borderColor: COLORS.primary,
      backgroundColor: withAlpha(COLORS.primary, 0.05),
    },
    optionIconContainer: {
      width: 48,
      height: 48,
      borderRadius: RADII.sm,
      backgroundColor: colors.surfaceAlt,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: SPACING.md,
    },
    optionIcon: {
      fontSize: 24,
    },
    optionTextContainer: {
      flex: 1,
    },
    optionTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: COLORS.white,
      marginBottom: 2,
    },
    optionDesc: {
      fontSize: 13,
      color: colors.textSecondary,
    },
    checkContainer: {
      marginLeft: SPACING.sm,
    },
    checkIcon: {
      color: COLORS.primary,
      fontSize: 20,
      fontWeight: 'bold',
    },
    footer: {
      padding: SPACING.xl,
      gap: SPACING.lg,
    },
    skipLink: {
      alignItems: 'center',
      paddingVertical: SPACING.sm,
    },
    skipLinkText: {
      color: colors.textSecondary,
      fontSize: 14,
      fontWeight: '600',
    },
    continueButton: {
      backgroundColor: COLORS.primary,
      height: 56,
      borderRadius: RADII.md,
      justifyContent: 'center',
      alignItems: 'center',
      ...SHADOWS.sm,
    },
    continueButtonText: {
      color: COLORS.black,
      fontSize: 18,
      fontWeight: '700',
    },
    privacyNotice: {
      alignItems: 'center',
    },
    privacyText: {
      color: colors.textMuted,
      fontSize: 12,
    },
  });
