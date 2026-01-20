/**
 * Practice Session Screen
 *
 * Full-screen practice experience for guided practices from the Explore page.
 * Accepts template ID and duration as query parameters.
 */

import { router, useLocalSearchParams } from 'expo-router';
import { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Animated,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADII, SHADOWS, TYPOGRAPHY, getThemedColors, withAlpha } from '../lib/ui/theme';
import { getPracticeTemplateById, getPracticeVariantDetails } from '../lib/practice';
import type { PracticeDuration, PracticeVariant, PracticeStep } from '../lib/practice/types';
import { HapticPatterns } from '../lib/haptics';
import { useSageStore } from '../lib/storage/store';
import { AppHeader } from '../components/navigation';

export default function PracticeSessionScreen() {
  const { id, duration } = useLocalSearchParams<{ id: string; duration: string }>();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);
  const styles = createStyles(colors, isDark);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [reflection, setReflection] = useState('');
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Get the practice template and variant
  const template = id ? getPracticeTemplateById(id) : null;
  const practiceDuration = (duration as PracticeDuration) || 'short';
  const practiceDetails = template ? template.variants[practiceDuration] : null;

  const totalSteps = practiceDetails?.steps.length || 0;
  const currentStep = practiceDetails?.steps[currentStepIndex];
  const isLastStep = currentStepIndex >= totalSteps - 1;

  // Animate progress bar
  useEffect(() => {
    if (totalSteps > 0) {
      Animated.timing(progressAnim, {
        toValue: (currentStepIndex + 1) / totalSteps,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [currentStepIndex, totalSteps]);

  const handleNextStep = useCallback(() => {
    if (isLastStep) {
      setIsCompleted(true);
    } else {
      setCurrentStepIndex((prev) => prev + 1);
    }
  }, [isLastStep]);

  const handlePreviousStep = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  }, [currentStepIndex]);

  const handleComplete = useCallback(() => {
    // Trigger haptic feedback for practice completion
    void HapticPatterns.practiceComplete();
    // Navigate back
    router.back();
  }, []);

  const handleSkipReflection = useCallback(() => {
    router.back();
  }, []);

  const handleClose = useCallback(() => {
    router.back();
  }, []);

  // Handle not found cases
  if (!template || !practiceDetails) {
    return (
      <SafeAreaView style={styles.container}>
        <AppHeader
          variant="back"
          title="Practice"
          showProfile={false}
        />
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={48} color={colors.textMuted} />
          <Text style={styles.errorTitle}>Practice Not Found</Text>
          <Text style={styles.errorText}>
            This practice is not available. Please try another one.
          </Text>
          <TouchableOpacity style={styles.errorButton} onPress={handleClose}>
            <Text style={styles.errorButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={handleClose}
          testID="practice-session-close"
        >
          <Ionicons name="close" size={24} color={colors.textSecondary} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.practiceIcon}>{template.icon}</Text>
          <Text style={styles.practiceTitle}>{practiceDetails.title}</Text>
        </View>
        <View style={styles.placeholder} />
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>
      <Text style={styles.progressText}>
        {isCompleted ? 'Complete' : `Step ${currentStepIndex + 1} of ${totalSteps}`}
      </Text>

      <ScrollView
        style={styles.contentScroll}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {!isCompleted ? (
          // Practice Step View
          <View style={styles.stepContainer}>
            <Text style={styles.stepInstruction}>
              {currentStep?.instruction}
            </Text>

            {currentStep?.durationSeconds && currentStep.durationSeconds > 0 && (
              <View style={styles.durationHint}>
                <Ionicons name="time-outline" size={14} color={COLORS.primary} />
                <Text style={styles.durationHintText}>
                  ~{currentStep.durationSeconds >= 60
                    ? `${Math.ceil(currentStep.durationSeconds / 60)} min`
                    : `${currentStep.durationSeconds} sec`
                  }
                </Text>
              </View>
            )}
          </View>
        ) : (
          // Completion View with Reflection Prompt
          <View style={styles.completionContainer}>
            <Text style={styles.completionEmoji}>✨</Text>
            <Text style={styles.completionTitle}>Practice Complete</Text>
            <Text style={styles.closingPrompt}>
              {practiceDetails.closingPrompt}
            </Text>

            <View style={styles.reflectionInputContainer}>
              <TextInput
                style={styles.reflectionInput}
                placeholder="Share your reflection (optional)..."
                placeholderTextColor={colors.textMuted}
                value={reflection}
                onChangeText={setReflection}
                multiline
                maxLength={500}
                testID="practice-reflection-input"
              />
            </View>
          </View>
        )}
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        {!isCompleted ? (
          <>
            {currentStepIndex > 0 && (
              <TouchableOpacity
                style={styles.backButton}
                onPress={handlePreviousStep}
                testID="practice-prev-step"
              >
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.nextButton, currentStepIndex === 0 && styles.nextButtonFull]}
              onPress={handleNextStep}
              testID="practice-next-step"
            >
              <Text style={styles.nextButtonText}>
                {isLastStep ? 'Complete' : 'Next'}
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={styles.skipButton}
              onPress={handleSkipReflection}
              testID="practice-skip-reflection"
            >
              <Text style={styles.skipButtonText}>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleComplete}
              testID="practice-save-reflection"
            >
              <Text style={styles.saveButtonText}>
                {reflection.trim() ? 'Save Reflection' : 'Done'}
              </Text>
            </TouchableOpacity>
          </>
        )}
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
      paddingTop: SPACING.lg,
      paddingBottom: SPACING.md,
    },
    closeButton: {
      width: 40,
      height: 40,
      borderRadius: RADII.full,
      backgroundColor: colors.surfaceAlt,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerCenter: {
      alignItems: 'center',
    },
    practiceIcon: {
      fontSize: 32,
      marginBottom: SPACING.xs,
    },
    practiceTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    placeholder: {
      width: 40,
    },
    progressContainer: {
      height: 4,
      backgroundColor: colors.surfaceAlt,
      marginHorizontal: SPACING.xl,
      borderRadius: RADII.full,
      overflow: 'hidden',
    },
    progressBar: {
      height: '100%',
      backgroundColor: COLORS.primary,
      borderRadius: RADII.full,
    },
    progressText: {
      fontSize: 12,
      color: colors.textMuted,
      textAlign: 'center',
      marginTop: SPACING.sm,
      marginBottom: SPACING.lg,
    },
    contentScroll: {
      flex: 1,
    },
    contentContainer: {
      paddingHorizontal: SPACING.xl,
      paddingBottom: SPACING.xxl,
      flexGrow: 1,
      justifyContent: 'center',
    },
    stepContainer: {
      alignItems: 'center',
      paddingVertical: SPACING['4xl'],
    },
    stepInstruction: {
      fontSize: 22,
      fontWeight: '500',
      color: colors.text,
      textAlign: 'center',
      lineHeight: 32,
    },
    durationHint: {
      marginTop: SPACING.xl,
      flexDirection: 'row',
      alignItems: 'center',
      gap: SPACING.xs,
      paddingHorizontal: SPACING.lg,
      paddingVertical: SPACING.sm,
      backgroundColor: withAlpha(COLORS.primary, 0.1),
      borderRadius: RADII.full,
    },
    durationHintText: {
      fontSize: 12,
      color: COLORS.primary,
      fontWeight: '600',
    },
    completionContainer: {
      alignItems: 'center',
      paddingVertical: SPACING.xxl,
    },
    completionEmoji: {
      fontSize: 48,
      marginBottom: SPACING.lg,
    },
    completionTitle: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.text,
      marginBottom: SPACING.lg,
    },
    closingPrompt: {
      fontSize: 18,
      fontWeight: '500',
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 26,
      marginBottom: SPACING.xl,
      fontStyle: 'italic',
    },
    reflectionInputContainer: {
      width: '100%',
      backgroundColor: colors.surface,
      borderRadius: RADII.lg,
      borderWidth: 1,
      borderColor: colors.border,
      padding: SPACING.md,
    },
    reflectionInput: {
      fontSize: 16,
      color: colors.text,
      minHeight: 100,
      textAlignVertical: 'top',
    },
    actionsContainer: {
      flexDirection: 'row',
      paddingHorizontal: SPACING.xl,
      paddingVertical: SPACING.lg,
      paddingBottom: SPACING['4xl'],
      gap: SPACING.md,
    },
    backButton: {
      flex: 1,
      paddingVertical: SPACING.md,
      borderRadius: RADII.lg,
      backgroundColor: colors.surfaceAlt,
      alignItems: 'center',
    },
    backButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.textSecondary,
    },
    nextButton: {
      flex: 2,
      paddingVertical: SPACING.md,
      borderRadius: RADII.lg,
      backgroundColor: COLORS.primary,
      alignItems: 'center',
      ...SHADOWS.primary,
    },
    nextButtonFull: {
      flex: 1,
    },
    nextButtonText: {
      fontSize: 16,
      fontWeight: '700',
      color: COLORS.black,
    },
    skipButton: {
      flex: 1,
      paddingVertical: SPACING.md,
      borderRadius: RADII.lg,
      backgroundColor: colors.surfaceAlt,
      alignItems: 'center',
    },
    skipButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.textSecondary,
    },
    saveButton: {
      flex: 2,
      paddingVertical: SPACING.md,
      borderRadius: RADII.lg,
      backgroundColor: COLORS.primary,
      alignItems: 'center',
      ...SHADOWS.primary,
    },
    saveButtonText: {
      fontSize: 16,
      fontWeight: '700',
      color: COLORS.black,
    },
    // Error state styles
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: SPACING.xl,
    },
    errorTitle: {
      ...TYPOGRAPHY.styles.h4,
      color: colors.text,
      marginTop: SPACING.lg,
      marginBottom: SPACING.sm,
    },
    errorText: {
      ...TYPOGRAPHY.styles.body,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: SPACING.xl,
    },
    errorButton: {
      backgroundColor: COLORS.primary,
      paddingHorizontal: SPACING.xl,
      paddingVertical: SPACING.md,
      borderRadius: RADII.lg,
    },
    errorButtonText: {
      ...TYPOGRAPHY.styles.bodyBold,
      color: COLORS.primaryText,
    },
  });
