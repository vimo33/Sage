import { useState, useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  useColorScheme,
  TextInput,
  ScrollView,
  Animated,
} from 'react-native';
import { COLORS, SPACING, RADII, SHADOWS, withAlpha, getThemedColors } from '../../lib/ui/theme';
import { HapticPatterns } from '../../lib/haptics';
import type { PracticeOption } from '../../lib/practice/types';
import { getPracticeVariantDetails } from '../../lib/practice/service';
import { useSageStore } from '../../lib/storage/store';

interface PracticeSessionModalProps {
  visible: boolean;
  onClose: () => void;
  onComplete: (reflection?: string) => void;
  practiceOption: PracticeOption | null;
}

export function PracticeSessionModal({
  visible,
  onClose,
  onComplete,
  practiceOption,
}: PracticeSessionModalProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);
  const styles = createStyles(colors, isDark);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [reflection, setReflection] = useState('');
  const progressAnim = useRef(new Animated.Value(0)).current;

  const practiceDetails = practiceOption
    ? getPracticeVariantDetails(practiceOption.templateId, practiceOption.duration)
    : null;

  const totalSteps = practiceDetails?.steps.length || 0;
  const currentStep = practiceDetails?.steps[currentStepIndex];
  const isLastStep = currentStepIndex >= totalSteps - 1;

  // Reset state when modal opens with new practice
  useEffect(() => {
    if (visible && practiceOption) {
      setCurrentStepIndex(0);
      setIsCompleted(false);
      setReflection('');
      progressAnim.setValue(0);
    }
  }, [visible, practiceOption?.templateId, practiceOption?.duration]);

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
    onComplete(reflection.trim() || undefined);
    onClose();
  }, [reflection, onComplete, onClose]);

  const handleSkipReflection = useCallback(() => {
    onComplete(undefined);
    onClose();
  }, [onComplete, onClose]);

  if (!practiceOption || !practiceDetails) {
    return null;
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            testID="practice-session-close"
          >
            <Text style={styles.closeIcon}>x</Text>
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.practiceIcon}>{practiceOption.icon}</Text>
            <Text style={styles.practiceTitle}>{practiceOption.title}</Text>
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
                  <Text style={styles.durationHintText}>
                    ~{Math.ceil(currentStep.durationSeconds / 60)} min
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
                style={styles.nextButton}
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
      </View>
    </Modal>
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
      paddingTop: SPACING['4xl'],
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
    closeIcon: {
      fontSize: 18,
      color: colors.textSecondary,
      fontWeight: '600',
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
  });
