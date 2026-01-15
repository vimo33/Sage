import { router, useLocalSearchParams, useFocusEffect } from 'expo-router';
import { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  useColorScheme,
  Alert,
} from 'react-native';
import { useSageStore } from '../lib/storage/store';
import {
  getGuidedReflectionById,
  generateReflectionResponse,
  getCurrentPrompt,
  getSessionProgress,
  isSessionComplete,
  generateSessionSummary,
  REFLECTION_DEPTH_LABELS,
} from '../lib/reflection';
import { COLORS, SPACING, RADII, TYPOGRAPHY, SHADOWS, withAlpha, getThemedColors } from '../lib/ui/theme';
import { QuestionVariations } from '../components/reflection/QuestionVariations';
import { AppHeader } from '../components/navigation';

export default function GuidedReflectionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);

  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [sessionSummary, setSessionSummary] = useState<string | null>(null);
  const [selectedVariation, setSelectedVariation] = useState<string | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const preferences = useSageStore((s) => s.preferences);
  const activeSession = useSageStore((s) => s.activeReflectionSession);
  const startReflectionSession = useSageStore((s) => s.startReflectionSession);
  const addReflectionResponse = useSageStore((s) => s.addReflectionResponse);
  const advanceReflectionStep = useSageStore((s) => s.advanceReflectionStep);
  const completeReflectionSession = useSageStore((s) => s.completeReflectionSession);
  const cancelReflectionSession = useSageStore((s) => s.cancelReflectionSession);
  const startTimeSession = useSageStore((s) => s.startTimeSession);
  const endTimeSession = useSageStore((s) => s.endTimeSession);

  const reflection = id ? getGuidedReflectionById(id) : null;

  // Track reflection session time
  const reflectionTimeSessionIdRef = useRef<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      // Start time tracking when screen comes into focus
      reflectionTimeSessionIdRef.current = startTimeSession('reflection');

      return () => {
        // End time tracking when screen loses focus
        if (reflectionTimeSessionIdRef.current) {
          endTimeSession(reflectionTimeSessionIdRef.current);
          reflectionTimeSessionIdRef.current = null;
        }
      };
    }, [startTimeSession, endTimeSession])
  );

  // Start the session when the screen loads
  useEffect(() => {
    if (id && !activeSession) {
      startReflectionSession(id);
    }
  }, [id, activeSession, startReflectionSession]);

  // Scroll to bottom when new content is added
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [activeSession?.responses, isGenerating]);

  const handleSelectVariation = useCallback((question: string) => {
    setSelectedVariation(question);
    // Scroll to the selected variation indicator
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!input.trim() || isGenerating || !activeSession || !reflection) return;

    const userResponse = input.trim();
    setInput('');
    setIsGenerating(true);
    setSelectedVariation(null); // Clear selected variation when submitting

    const currentPrompt = getCurrentPrompt(activeSession);
    if (!currentPrompt) {
      setIsGenerating(false);
      return;
    }

    try {
      const previousResponses = activeSession.responses.map((r) => ({
        userResponse: r.userResponse,
        sageResponse: r.sageResponse,
      }));

      const result = await generateReflectionResponse(
        reflection.id,
        currentPrompt.id,
        userResponse,
        preferences,
        previousResponses
      );

      addReflectionResponse(currentPrompt.id, userResponse, result.sageResponse);
      advanceReflectionStep();

      // Check if session is now complete
      const updatedSession = {
        ...activeSession,
        currentStep: activeSession.currentStep + 1,
      };

      if (updatedSession.currentStep >= reflection.prompts.length) {
        // Generate session summary
        const summary = await generateSessionSummary(updatedSession, preferences);
        setSessionSummary(summary);
      }
    } catch (error) {
      console.error('Reflection generation failed:', error);
      Alert.alert('Error', 'Failed to generate response. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  }, [input, isGenerating, activeSession, reflection, preferences, addReflectionResponse, advanceReflectionStep]);

  const handleComplete = useCallback(() => {
    completeReflectionSession();
    router.back();
  }, [completeReflectionSession]);

  const handleCancel = useCallback(() => {
    Alert.alert(
      'End Reflection?',
      'Your progress will not be saved.',
      [
        { text: 'Continue Reflecting', style: 'cancel' },
        {
          text: 'End Session',
          style: 'destructive',
          onPress: () => {
            cancelReflectionSession();
            router.back();
          },
        },
      ]
    );
  }, [cancelReflectionSession]);

  if (!reflection) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: colors.text }]}>Reflection not found</Text>
          <TouchableOpacity onPress={() => router.back()} style={styles.errorButton}>
            <Text style={styles.errorButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const currentPrompt = activeSession ? getCurrentPrompt(activeSession) : null;
  const progress = activeSession ? getSessionProgress(activeSession) : null;
  const isComplete = activeSession ? isSessionComplete(activeSession) : false;

  const dynamicStyles = createStyles(colors, isDark);

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={dynamicStyles.flex}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <AppHeader
          variant="close"
          title={reflection.title}
          onBack={handleCancel}
          showProfile={false}
          testID="guided-reflection-header"
        />

        {/* Progress Indicator */}
        {progress && !isComplete && (
          <View style={dynamicStyles.progressInfo}>
            <Text style={dynamicStyles.progressText}>
              Step {progress.currentStep + 1} of {progress.totalSteps}
            </Text>
          </View>
        )}

        {/* Progress Bar */}
        {progress && !isComplete && (
          <View style={dynamicStyles.progressContainer}>
            <View style={dynamicStyles.progressTrack}>
              <View
                style={[
                  dynamicStyles.progressFill,
                  { width: `${((progress.currentStep) / progress.totalSteps) * 100}%` },
                ]}
              />
            </View>
          </View>
        )}

        {/* Content */}
        <ScrollView
          ref={scrollViewRef}
          style={dynamicStyles.flex}
          contentContainerStyle={dynamicStyles.scrollContainer}
        >
          {/* Opening card */}
          <View style={dynamicStyles.openingCard}>
            <Text style={dynamicStyles.openingIcon}>{reflection.icon}</Text>
            <Text style={dynamicStyles.openingTitle}>{reflection.title}</Text>
            <Text style={dynamicStyles.openingDescription}>{reflection.description}</Text>
            <View style={dynamicStyles.openingMeta}>
              <Text style={dynamicStyles.openingMetaText}>
                {reflection.estimatedMinutes} min • {reflection.prompts.length} prompts
              </Text>
            </View>
          </View>

          {/* Previous responses */}
          {activeSession?.responses.map((response, idx) => {
            const prompt = reflection.prompts[idx];
            return (
              <View key={idx} style={dynamicStyles.exchangeContainer}>
                {/* Prompt */}
                <View style={dynamicStyles.promptCard}>
                  <Text style={dynamicStyles.promptLabel}>
                    {REFLECTION_DEPTH_LABELS[prompt.depth]}
                  </Text>
                  <Text style={dynamicStyles.promptText}>{prompt.promptText}</Text>
                </View>

                {/* User response */}
                <View style={dynamicStyles.userResponseContainer}>
                  <View style={dynamicStyles.userBubble}>
                    <Text style={dynamicStyles.userText}>{response.userResponse}</Text>
                  </View>
                </View>

                {/* Sage response */}
                <View style={dynamicStyles.sageResponseContainer}>
                  <View style={dynamicStyles.sageAvatar}>
                    <Text style={dynamicStyles.sageAvatarEmoji}>🌿</Text>
                  </View>
                  <View style={dynamicStyles.sageBubble}>
                    <Text style={dynamicStyles.sageText}>{response.sageResponse}</Text>
                  </View>
                </View>
              </View>
            );
          })}

          {/* Current prompt (if not complete) */}
          {currentPrompt && !isComplete && (
            <View style={dynamicStyles.currentPromptContainer}>
              <View style={dynamicStyles.promptCard}>
                <Text style={dynamicStyles.promptLabel}>
                  {REFLECTION_DEPTH_LABELS[currentPrompt.depth]}
                </Text>
                <Text style={dynamicStyles.promptText}>{currentPrompt.promptText}</Text>
                <Text style={dynamicStyles.promptGuidance}>{currentPrompt.guidance}</Text>

                {/* Question Variations - Expandable Section */}
                {currentPrompt.questionVariations && currentPrompt.questionVariations.length > 0 && (
                  <QuestionVariations
                    variations={currentPrompt.questionVariations}
                    isDark={isDark}
                    onSelectVariation={handleSelectVariation}
                  />
                )}
              </View>

              {/* Selected Variation Indicator */}
              {selectedVariation && (
                <View style={dynamicStyles.selectedVariationContainer}>
                  <Text style={dynamicStyles.selectedVariationLabel}>Considering:</Text>
                  <Text style={dynamicStyles.selectedVariationText}>{selectedVariation}</Text>
                </View>
              )}
            </View>
          )}

          {/* Generating indicator */}
          {isGenerating && (
            <View style={dynamicStyles.sageResponseContainer}>
              <View style={dynamicStyles.sageAvatar}>
                <Text style={dynamicStyles.sageAvatarEmoji}>🌿</Text>
              </View>
              <View style={[dynamicStyles.sageBubble, dynamicStyles.loadingBubble]}>
                <ActivityIndicator color={COLORS.primary} size="small" />
              </View>
            </View>
          )}

          {/* Completion state */}
          {isComplete && (
            <View style={dynamicStyles.completionContainer}>
              <View style={dynamicStyles.completionCard}>
                <Text style={dynamicStyles.completionIcon}>✨</Text>
                <Text style={dynamicStyles.completionTitle}>Reflection Complete</Text>
                {sessionSummary && (
                  <Text style={dynamicStyles.completionSummary}>{sessionSummary}</Text>
                )}
                <TouchableOpacity
                  style={dynamicStyles.completeButton}
                  onPress={handleComplete}
                >
                  <Text style={dynamicStyles.completeButtonText}>Finish</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input area (only when not complete) */}
        {!isComplete && (
          <View style={dynamicStyles.inputArea}>
            <View style={dynamicStyles.inputContainer}>
              <TextInput
                style={dynamicStyles.input}
                placeholder="Share your reflection..."
                placeholderTextColor={colors.textMuted}
                value={input}
                onChangeText={setInput}
                multiline
                maxLength={1000}
                editable={!isGenerating}
              />
              <TouchableOpacity
                style={[
                  dynamicStyles.sendBtn,
                  (!input.trim() || isGenerating) && dynamicStyles.sendBtnDisabled,
                ]}
                onPress={handleSubmit}
                disabled={!input.trim() || isGenerating}
              >
                <Text style={dynamicStyles.sendIcon}>→</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  errorText: {
    fontSize: 18,
    marginBottom: SPACING.lg,
  },
  errorButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: RADII.md,
  },
  errorButtonText: {
    color: COLORS.primaryText,
    fontWeight: '700',
  },
});

const createStyles = (colors: ReturnType<typeof getThemedColors>, isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    flex: {
      flex: 1,
    },
    progressInfo: {
      alignItems: 'center',
      paddingVertical: SPACING.xs,
    },
    progressText: {
      color: colors.textMuted,
      fontSize: 12,
    },
    progressContainer: {
      paddingHorizontal: SPACING.xl,
      paddingVertical: SPACING.sm,
    },
    progressTrack: {
      height: 4,
      backgroundColor: colors.surfaceAlt,
      borderRadius: 2,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      backgroundColor: COLORS.primary,
      borderRadius: 2,
    },
    scrollContainer: {
      padding: SPACING.lg,
      paddingBottom: 40,
    },
    openingCard: {
      backgroundColor: colors.surface,
      borderRadius: RADII.lg,
      padding: SPACING.xl,
      alignItems: 'center',
      marginBottom: SPACING.xxl,
      borderWidth: 1,
      borderColor: colors.border,
      ...SHADOWS.sm,
    },
    openingIcon: {
      fontSize: 48,
      marginBottom: SPACING.md,
    },
    openingTitle: {
      ...TYPOGRAPHY.styles.h3,
      color: colors.text,
      marginBottom: SPACING.sm,
    },
    openingDescription: {
      ...TYPOGRAPHY.styles.body,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: SPACING.md,
    },
    openingMeta: {
      backgroundColor: colors.surfaceAlt,
      paddingHorizontal: SPACING.md,
      paddingVertical: SPACING.xs,
      borderRadius: RADII.full,
    },
    openingMetaText: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textMuted,
    },
    exchangeContainer: {
      marginBottom: SPACING.xl,
    },
    promptCard: {
      backgroundColor: withAlpha(COLORS.primary, 0.08),
      borderRadius: RADII.md,
      padding: SPACING.lg,
      marginBottom: SPACING.md,
      borderLeftWidth: 3,
      borderLeftColor: COLORS.primary,
    },
    promptLabel: {
      ...TYPOGRAPHY.styles.label,
      color: COLORS.primary,
      marginBottom: SPACING.xs,
    },
    promptText: {
      ...TYPOGRAPHY.styles.body,
      color: colors.text,
      fontWeight: '500',
      lineHeight: 24,
    },
    promptGuidance: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textSecondary,
      fontStyle: 'italic',
      marginTop: SPACING.sm,
    },
    currentPromptContainer: {
      marginBottom: SPACING.lg,
    },
    selectedVariationContainer: {
      backgroundColor: withAlpha(COLORS.primary, 0.1),
      borderRadius: RADII.md,
      padding: SPACING.md,
      borderWidth: 1,
      borderColor: withAlpha(COLORS.primary, 0.2),
      marginTop: SPACING.sm,
    },
    selectedVariationLabel: {
      ...TYPOGRAPHY.styles.label,
      color: COLORS.primary,
      marginBottom: SPACING.xs,
    },
    selectedVariationText: {
      ...TYPOGRAPHY.styles.body,
      color: colors.text,
      fontStyle: 'italic',
      lineHeight: 22,
    },
    userResponseContainer: {
      alignItems: 'flex-end',
      marginBottom: SPACING.md,
    },
    userBubble: {
      backgroundColor: COLORS.primary,
      paddingHorizontal: SPACING.lg,
      paddingVertical: SPACING.md,
      borderRadius: RADII.md,
      borderTopRightRadius: 4,
      maxWidth: '85%',
      ...SHADOWS.sm,
    },
    userText: {
      color: COLORS.black,
      fontSize: 15,
      lineHeight: 22,
    },
    sageResponseContainer: {
      flexDirection: 'row',
      gap: SPACING.sm,
    },
    sageAvatar: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.surfaceAlt,
      justifyContent: 'center',
      alignItems: 'center',
    },
    sageAvatarEmoji: {
      fontSize: 16,
    },
    sageBubble: {
      flex: 1,
      backgroundColor: colors.surface,
      paddingHorizontal: SPACING.lg,
      paddingVertical: SPACING.md,
      borderRadius: RADII.md,
      borderTopLeftRadius: 4,
      ...SHADOWS.sm,
    },
    loadingBubble: {
      flex: 0,
      paddingHorizontal: SPACING.xl,
      minWidth: 60,
      alignItems: 'center',
    },
    sageText: {
      color: colors.text,
      fontSize: 15,
      lineHeight: 22,
    },
    completionContainer: {
      marginTop: SPACING.xl,
    },
    completionCard: {
      backgroundColor: colors.surface,
      borderRadius: RADII.lg,
      padding: SPACING.xxl,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: COLORS.primary,
      ...SHADOWS.md,
    },
    completionIcon: {
      fontSize: 48,
      marginBottom: SPACING.md,
    },
    completionTitle: {
      ...TYPOGRAPHY.styles.h3,
      color: colors.text,
      marginBottom: SPACING.md,
    },
    completionSummary: {
      ...TYPOGRAPHY.styles.body,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 24,
      marginBottom: SPACING.xl,
    },
    completeButton: {
      backgroundColor: COLORS.primary,
      paddingHorizontal: SPACING.xxxl,
      paddingVertical: SPACING.md,
      borderRadius: RADII.full,
      ...SHADOWS.primary,
    },
    completeButtonText: {
      color: COLORS.primaryText,
      fontSize: 16,
      fontWeight: '800',
    },
    inputArea: {
      backgroundColor: colors.background,
      padding: SPACING.lg,
      paddingBottom: Platform.OS === 'ios' ? 10 : 20,
      borderTopWidth: 1,
      borderTopColor: withAlpha(COLORS.white, 0.05),
    },
    inputContainer: {
      flexDirection: 'row',
      backgroundColor: colors.surface,
      borderRadius: 24,
      paddingLeft: SPACING.lg,
      paddingRight: 6,
      paddingVertical: 6,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    input: {
      flex: 1,
      color: colors.text,
      fontSize: 15,
      maxHeight: 100,
      paddingTop: 8,
      paddingBottom: 8,
    },
    sendBtn: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: COLORS.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    sendBtnDisabled: {
      backgroundColor: colors.surfaceAlt,
      opacity: 0.5,
    },
    sendIcon: {
      color: COLORS.black,
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
