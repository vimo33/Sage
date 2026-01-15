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
  Modal,
  Image,
} from 'react-native';
import { useSageStore, type TonePreference } from '../lib/storage/store';
import { COLORS, SPACING, RADII, TYPOGRAPHY, SHADOWS, withAlpha, getThemedColors } from '../lib/ui/theme';

// Default settings that will be applied when skipping onboarding
const DEFAULT_SETTINGS = {
  tone: 'practical' as TonePreference,
  voiceSpeed: 1.0,
  narrateResponses: false,
};

// Human-readable labels for tone options
const TONE_LABELS: Record<TonePreference, string> = {
  practical: 'Practical',
  poetic: 'Poetic',
  minimal: 'Minimal',
  deep: 'Deep',
};

export default function OnboardingScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);

  const [step, setStep] = useState(1);
  const [showSkipConfirmation, setShowSkipConfirmation] = useState(false);
  const preferences = useSageStore((s) => s.preferences);
  const setPreferences = useSageStore((s) => s.setPreferences);

  const styles = createStyles(colors, isDark);

  const completeOnboarding = () => {
    console.log('[Sage] Completing onboarding...');
    setPreferences({ hasCompletedOnboarding: true });
    // Small delay to allow state to persist before navigation
    setTimeout(() => {
      console.log('[Sage] Navigating to tabs...');
      router.replace('/(tabs)');
    }, 100);
  };

  const handleSkipPress = () => {
    setShowSkipConfirmation(true);
  };

  const handleConfirmSkip = () => {
    console.log('[Sage] Skipping onboarding with defaults...');
    // Apply default settings and complete onboarding
    setPreferences({
      tone: DEFAULT_SETTINGS.tone,
      voiceSpeed: DEFAULT_SETTINGS.voiceSpeed,
      narrateResponses: DEFAULT_SETTINGS.narrateResponses,
      hasCompletedOnboarding: true,
    });
    setShowSkipConfirmation(false);
    // Small delay to allow state to persist before navigation
    setTimeout(() => {
      console.log('[Sage] Navigating to tabs...');
      router.replace('/(tabs)');
    }, 100);
  };

  const handleCancelSkip = () => {
    setShowSkipConfirmation(false);
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  // Skip Confirmation Modal
  const SkipConfirmationModal = () => (
    <Modal
      visible={showSkipConfirmation}
      transparent
      animationType="fade"
      onRequestClose={handleCancelSkip}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Use Default Settings?</Text>
          <Text style={styles.modalSubtitle}>
            Skip setup and start with these defaults:
          </Text>

          <View style={styles.defaultsList}>
            <View style={styles.defaultItem}>
              <Text style={styles.defaultLabel}>Tone</Text>
              <Text style={styles.defaultValue}>{TONE_LABELS[DEFAULT_SETTINGS.tone]}</Text>
            </View>
            <View style={styles.defaultItem}>
              <Text style={styles.defaultLabel}>Voice Speed</Text>
              <Text style={styles.defaultValue}>{DEFAULT_SETTINGS.voiceSpeed}x</Text>
            </View>
            <View style={styles.defaultItem}>
              <Text style={styles.defaultLabel}>Narration</Text>
              <Text style={styles.defaultValue}>{DEFAULT_SETTINGS.narrateResponses ? 'On' : 'Off'}</Text>
            </View>
          </View>

          <Text style={styles.modalNote}>
            You can change these anytime in Settings.
          </Text>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={styles.modalSecondaryButton}
              onPress={handleCancelSkip}
              testID="skip-cancel-button"
            >
              <Text style={styles.modalSecondaryButtonText}>Customize</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalPrimaryButton}
              onPress={handleConfirmSkip}
              testID="skip-confirm-button"
            >
              <Text style={styles.modalPrimaryButtonText}>Use Defaults</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  if (step === 1) {
    return (
      <SafeAreaView style={styles.container}>
        <SkipConfirmationModal />
        <View style={styles.header}>
          <TouchableOpacity onPress={handleSkipPress} testID="skip-button">
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/images/sage-app-icon.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.heroTitle}>
            A quiet place{"\n"}to <Text style={styles.primaryText}>reflect.</Text>
          </Text>
          <Text style={styles.heroSubtitle}>
            Capture your thoughts, track your growth, and find clarity in a private digital sanctuary.
          </Text>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.primaryButton} onPress={nextStep} testID="begin-button">
            <Text style={styles.primaryButtonText}>Begin →</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={() => {}} testID="learn-more-button">
            <Text style={styles.secondaryButtonText}>Learn more</Text>
          </TouchableOpacity>
          <View style={styles.privacyNote}>
            <Text style={styles.privacyText}>
              🔒 Your reflections stay on your device.
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (step === 2) {
    const tones: { id: TonePreference; title: string; desc: string; icon: string }[] = [
      { id: 'practical', title: 'Practical', desc: 'Direct, actionable advice. No fluff.', icon: '💼' },
      { id: 'poetic', title: 'Poetic', desc: 'Metaphorical and gentle guidance.', icon: '🕊️' },
      { id: 'minimal', title: 'Minimal', desc: 'Short, concise prompts. Less is more.', icon: '➖' },
      { id: 'deep', title: 'Deep', desc: 'Philosophical and probing questions.', icon: '👁️' },
    ];

    return (
      <SafeAreaView style={styles.container}>
        <SkipConfirmationModal />
        <View style={styles.header}>
          <TouchableOpacity onPress={prevStep}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.stepTitle}>Tone</Text>
          <TouchableOpacity onPress={handleSkipPress} testID="skip-button">
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollContent} contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.headline}>Choose your tone</Text>
          <Text style={styles.subheadline}>Customize how Sage responds to your reflections.</Text>

          <View style={styles.optionsList}>
            {tones.map((t) => (
              <TouchableOpacity
                key={t.id}
                style={[
                  styles.optionCard,
                  preferences.tone === t.id && styles.optionCardActive,
                ]}
                onPress={() => setPreferences({ tone: t.id })}
              >
                <View style={styles.optionIconContainer}>
                  <Text style={styles.optionIcon}>{t.icon}</Text>
                </View>
                <View style={styles.optionTextContainer}>
                  <Text style={styles.optionTitle}>{t.title}</Text>
                  <Text style={styles.optionDesc}>{t.desc}</Text>
                </View>
                {preferences.tone === t.id && (
                  <View style={styles.checkContainer}>
                    <Text style={styles.checkIcon}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.primaryButton} onPress={nextStep}>
            <Text style={styles.primaryButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <SkipConfirmationModal />
      <View style={styles.header}>
        <TouchableOpacity onPress={prevStep}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.stepTitle}>Narration</Text>
        <TouchableOpacity onPress={handleSkipPress} testID="skip-button">
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.headline}>Customize experience</Text>
        <Text style={styles.subheadline}>Adjust how Sage speaks to you during guided reflections.</Text>
        
        <View style={styles.settingsGroup}>
          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingLabel}>Enable Narration</Text>
              <Text style={styles.settingSublabel}>Hear voice guidance during sessions</Text>
            </View>
            <Switch
              value={preferences.narrateResponses}
              onValueChange={(val) => setPreferences({ narrateResponses: val })}
              trackColor={{ false: colors.surfaceAlt, true: COLORS.primary }}
            />
          </View>

          <View style={styles.settingBox}>
            <View style={styles.settingHeader}>
              <Text style={styles.settingLabel}>Speaking Speed</Text>
              <Text style={styles.speedValue}>{preferences.voiceSpeed.toFixed(1)}x</Text>
            </View>
            <View style={styles.sliderPlaceholder}>
              <TouchableOpacity 
                style={styles.speedBtn} 
                onPress={() => setPreferences({ voiceSpeed: Math.max(0.5, preferences.voiceSpeed - 0.1) })}
              >
                <Text style={styles.speedBtnText}>-</Text>
              </TouchableOpacity>
              <View style={styles.speedBar}>
                <View style={[styles.speedFill, { width: `${((preferences.voiceSpeed - 0.5) / 1.5) * 100}%` }]} />
              </View>
              <TouchableOpacity 
                style={styles.speedBtn}
                onPress={() => setPreferences({ voiceSpeed: Math.min(2.0, preferences.voiceSpeed + 0.1) })}
              >
                <Text style={styles.speedBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.primaryButton} onPress={completeOnboarding}>
          <Text style={styles.primaryButtonText}>Finish Setup</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (colors: ReturnType<typeof getThemedColors>, isDark: boolean) => StyleSheet.create({
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
  skipText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  backText: {
    color: colors.text,
    fontSize: 24,
    width: 40,
  },
  stepTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.xl,
    justifyContent: 'center',
  },
  scrollContent: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: 40,
  },
  logoContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  logoImage: {
    width: 120,
    height: 120,
  },
  heroTitle: {
    fontSize: 40,
    fontWeight: '800',
    color: COLORS.white,
    lineHeight: 48,
    marginBottom: SPACING.lg,
  },
  primaryText: {
    color: COLORS.primary,
  },
  heroSubtitle: {
    fontSize: 18,
    color: colors.textSecondary,
    lineHeight: 26,
    maxWidth: '90%',
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
  settingLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.white,
  },
  settingSublabel: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
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
  speedValue: {
    color: COLORS.primary,
    fontWeight: 'bold',
    backgroundColor: withAlpha(COLORS.primary, 0.1),
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  sliderPlaceholder: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  speedBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
  },
  speedBtnText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '600',
  },
  speedBar: {
    flex: 1,
    height: 4,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 2,
    overflow: 'hidden',
  },
  speedFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  footer: {
    padding: SPACING.xl,
    gap: SPACING.lg,
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
  secondaryButton: {
    height: 56,
    borderRadius: RADII.md,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryButtonText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
  },
  privacyNote: {
    alignItems: 'center',
  },
  privacyText: {
    color: colors.textMuted,
    fontSize: 12,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: RADII.lg,
    padding: SPACING.xl,
    width: '100%',
    maxWidth: 340,
    ...SHADOWS.lg,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  modalSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  defaultsList: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: RADII.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  defaultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  defaultLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  defaultValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.white,
  },
  modalNote: {
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  modalSecondaryButton: {
    flex: 1,
    height: 48,
    borderRadius: RADII.md,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
  },
  modalSecondaryButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  modalPrimaryButton: {
    flex: 1,
    height: 48,
    borderRadius: RADII.md,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  modalPrimaryButtonText: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: '700',
  },
});
