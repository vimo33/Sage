/**
 * BreathTimerModal Component
 *
 * An animated breath timer for guided breathing exercises.
 * Features:
 * - Circular breathing animation
 * - Haptic feedback on phase transitions
 * - Support for 4-7-8, box breathing, and other patterns
 * - Calming visual design with smooth animations
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  useColorScheme,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  Easing,
  runOnJS,
  cancelAnimation,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import {
  COLORS,
  SPACING,
  RADII,
  SHADOWS,
  withAlpha,
  getThemedColors,
} from '../../lib/ui/theme';
import {
  type BreathingPattern,
  type BreathPhase,
  getAllBreathingPatterns,
  getCycleDuration,
  formatDuration,
} from '../../lib/practice/breath-timer-types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CIRCLE_SIZE = Math.min(SCREEN_WIDTH * 0.7, 280);
const INNER_CIRCLE_SIZE = CIRCLE_SIZE * 0.3;

interface BreathTimerModalProps {
  visible: boolean;
  onClose: () => void;
  onComplete: (cycles: number, pattern: BreathingPattern) => void;
  /** Optional pre-selected pattern. If not provided, shows pattern selection */
  initialPattern?: BreathingPattern;
}

type TimerPhase = 'selection' | 'ready' | 'active' | 'paused' | 'complete';

export function BreathTimerModal({
  visible,
  onClose,
  onComplete,
  initialPattern,
}: BreathTimerModalProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);
  const styles = createStyles(colors, isDark);

  // State
  const [phase, setPhase] = useState<TimerPhase>('selection');
  const [selectedPattern, setSelectedPattern] = useState<BreathingPattern | null>(
    initialPattern || null
  );
  const [cycles, setCycles] = useState(4);
  const [currentCycle, setCurrentCycle] = useState(1);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);

  // Animation values
  const circleScale = useSharedValue(1);
  const circleOpacity = useSharedValue(0.3);
  const innerCircleScale = useSharedValue(1);
  const phaseProgress = useSharedValue(0);

  // Timer ref for cleanup
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isRunningRef = useRef(false);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (visible) {
      if (initialPattern) {
        setSelectedPattern(initialPattern);
        setPhase('ready');
        setCycles(initialPattern.defaultCycles);
      } else {
        setPhase('selection');
        setSelectedPattern(null);
      }
      setCurrentCycle(1);
      setCurrentPhaseIndex(0);
      circleScale.value = 1;
      circleOpacity.value = 0.3;
      innerCircleScale.value = 1;
      phaseProgress.value = 0;
      isRunningRef.current = false;
    } else {
      // Clean up timers on close
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      isRunningRef.current = false;
      cancelAnimation(circleScale);
      cancelAnimation(circleOpacity);
      cancelAnimation(innerCircleScale);
    }
  }, [visible, initialPattern]);

  // Get current breath phase
  const currentBreathPhase = selectedPattern?.phases[currentPhaseIndex];

  // Haptic feedback helper
  const triggerHaptic = useCallback(async (type: 'light' | 'medium' | 'success') => {
    try {
      if (type === 'success') {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } else if (type === 'medium') {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      } else {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    } catch {
      // Haptics not available on this device
    }
  }, []);

  // Advance to next phase
  const advancePhase = useCallback(() => {
    if (!selectedPattern || !isRunningRef.current) return;

    const nextPhaseIndex = currentPhaseIndex + 1;

    // Check if cycle is complete
    if (nextPhaseIndex >= selectedPattern.phases.length) {
      const nextCycle = currentCycle + 1;

      // Check if all cycles are complete
      if (nextCycle > cycles) {
        isRunningRef.current = false;
        setPhase('complete');
        triggerHaptic('success');
        return;
      }

      // Start next cycle
      setCurrentCycle(nextCycle);
      setCurrentPhaseIndex(0);
      triggerHaptic('medium');
    } else {
      // Move to next phase within cycle
      setCurrentPhaseIndex(nextPhaseIndex);
      triggerHaptic('light');
    }
  }, [selectedPattern, currentPhaseIndex, currentCycle, cycles, triggerHaptic]);

  // Animate a single breath phase
  const animatePhase = useCallback(
    (breathPhase: BreathPhase) => {
      if (!isRunningRef.current) return;

      const duration = breathPhase.durationSeconds * 1000;

      // Determine animation based on phase type
      if (breathPhase.name === 'inhale') {
        // Expand animation for inhale
        circleScale.value = withTiming(1.4, {
          duration,
          easing: Easing.inOut(Easing.ease),
        });
        circleOpacity.value = withTiming(0.6, {
          duration,
          easing: Easing.inOut(Easing.ease),
        });
        innerCircleScale.value = withTiming(1.2, {
          duration,
          easing: Easing.inOut(Easing.ease),
        });
      } else if (breathPhase.name === 'exhale') {
        // Contract animation for exhale
        circleScale.value = withTiming(1, {
          duration,
          easing: Easing.inOut(Easing.ease),
        });
        circleOpacity.value = withTiming(0.3, {
          duration,
          easing: Easing.inOut(Easing.ease),
        });
        innerCircleScale.value = withTiming(1, {
          duration,
          easing: Easing.inOut(Easing.ease),
        });
      } else {
        // Hold phases - gentle pulse
        circleOpacity.value = withSequence(
          withTiming(circleOpacity.value + 0.1, { duration: duration / 2 }),
          withTiming(circleOpacity.value, { duration: duration / 2 })
        );
      }

      // Schedule next phase
      timerRef.current = setTimeout(() => {
        if (isRunningRef.current) {
          runOnJS(advancePhase)();
        }
      }, duration);
    },
    [advancePhase]
  );

  // Start/trigger animation when phase changes
  useEffect(() => {
    if (phase === 'active' && currentBreathPhase && isRunningRef.current) {
      animatePhase(currentBreathPhase);
    }
  }, [phase, currentPhaseIndex, currentCycle, currentBreathPhase, animatePhase]);

  // Start the breathing session
  const handleStart = useCallback(() => {
    if (!selectedPattern) return;

    isRunningRef.current = true;
    setPhase('active');
    setCurrentCycle(1);
    setCurrentPhaseIndex(0);
    triggerHaptic('medium');
  }, [selectedPattern, triggerHaptic]);

  // Pause/Resume
  const handlePauseResume = useCallback(() => {
    if (phase === 'active') {
      isRunningRef.current = false;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      setPhase('paused');
      cancelAnimation(circleScale);
      cancelAnimation(circleOpacity);
      cancelAnimation(innerCircleScale);
    } else if (phase === 'paused') {
      isRunningRef.current = true;
      setPhase('active');
      // Re-trigger animation for current phase
      if (currentBreathPhase) {
        animatePhase(currentBreathPhase);
      }
    }
  }, [phase, currentBreathPhase, animatePhase]);

  // Handle pattern selection
  const handleSelectPattern = useCallback((pattern: BreathingPattern) => {
    setSelectedPattern(pattern);
    setCycles(pattern.defaultCycles);
    setPhase('ready');
    triggerHaptic('light');
  }, [triggerHaptic]);

  // Handle completion
  const handleComplete = useCallback(() => {
    if (selectedPattern) {
      onComplete(cycles, selectedPattern);
    }
    onClose();
  }, [selectedPattern, cycles, onComplete, onClose]);

  // Handle close with cleanup
  const handleClose = useCallback(() => {
    isRunningRef.current = false;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    onClose();
  }, [onClose]);

  // Cycle adjustment
  const adjustCycles = useCallback(
    (delta: number) => {
      setCycles((prev) => Math.max(1, Math.min(10, prev + delta)));
      triggerHaptic('light');
    },
    [triggerHaptic]
  );

  // Animated styles
  const outerCircleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: circleScale.value }],
    opacity: circleOpacity.value,
  }));

  const innerCircleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: innerCircleScale.value }],
  }));

  // Calculate estimated time
  const estimatedTime = selectedPattern
    ? formatDuration(getCycleDuration(selectedPattern) * cycles)
    : '';

  if (!visible) return null;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleClose}
            testID="breath-timer-close"
          >
            <Text style={styles.closeIcon}>x</Text>
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            {selectedPattern && (
              <>
                <Text style={styles.patternIcon}>{selectedPattern.icon}</Text>
                <Text style={styles.patternName}>{selectedPattern.name}</Text>
              </>
            )}
            {!selectedPattern && (
              <Text style={styles.headerTitle}>Choose a Breathing Pattern</Text>
            )}
          </View>
          <View style={styles.placeholder} />
        </View>

        {/* Pattern Selection Phase */}
        {phase === 'selection' && (
          <View style={styles.selectionContainer}>
            {getAllBreathingPatterns().map((pattern) => (
              <TouchableOpacity
                key={pattern.id}
                style={styles.patternCard}
                onPress={() => handleSelectPattern(pattern)}
                testID={`pattern-${pattern.id}`}
              >
                <Text style={styles.patternCardIcon}>{pattern.icon}</Text>
                <View style={styles.patternCardContent}>
                  <Text style={styles.patternCardName}>{pattern.name}</Text>
                  <Text style={styles.patternCardDescription}>
                    {pattern.description}
                  </Text>
                  <View style={styles.patternPhases}>
                    {pattern.phases.map((p, idx) => (
                      <Text key={idx} style={styles.patternPhaseText}>
                        {p.name === 'inhale'
                          ? 'In'
                          : p.name === 'exhale'
                          ? 'Out'
                          : 'Hold'}{' '}
                        {p.durationSeconds}s
                        {idx < pattern.phases.length - 1 ? ' • ' : ''}
                      </Text>
                    ))}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Ready Phase - Cycle Selection */}
        {phase === 'ready' && selectedPattern && (
          <View style={styles.readyContainer}>
            <View style={styles.benefitsContainer}>
              {selectedPattern.benefits.map((benefit, idx) => (
                <Text key={idx} style={styles.benefitText}>
                  {benefit}
                </Text>
              ))}
            </View>

            <View style={styles.cycleSelector}>
              <Text style={styles.cycleSelectorLabel}>Rounds</Text>
              <View style={styles.cycleSelectorControls}>
                <TouchableOpacity
                  style={styles.cycleButton}
                  onPress={() => adjustCycles(-1)}
                  disabled={cycles <= 1}
                  testID="decrease-cycles"
                >
                  <Text
                    style={[styles.cycleButtonText, cycles <= 1 && styles.cycleButtonDisabled]}
                  >
                    -
                  </Text>
                </TouchableOpacity>
                <Text style={styles.cycleCount}>{cycles}</Text>
                <TouchableOpacity
                  style={styles.cycleButton}
                  onPress={() => adjustCycles(1)}
                  disabled={cycles >= 10}
                  testID="increase-cycles"
                >
                  <Text
                    style={[styles.cycleButtonText, cycles >= 10 && styles.cycleButtonDisabled]}
                  >
                    +
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.estimatedTime}>~{estimatedTime}</Text>
            </View>

            <TouchableOpacity
              style={styles.startButton}
              onPress={handleStart}
              testID="start-breathing"
            >
              <Text style={styles.startButtonText}>Begin</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setPhase('selection')}
              testID="back-to-selection"
            >
              <Text style={styles.backButtonText}>Choose Different Pattern</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Active/Paused Phase - Animation */}
        {(phase === 'active' || phase === 'paused') && selectedPattern && currentBreathPhase && (
          <View style={styles.activeContainer}>
            {/* Breathing Circle */}
            <View style={styles.circleContainer}>
              <Animated.View style={[styles.outerCircle, outerCircleStyle]} />
              <Animated.View style={[styles.innerCircle, innerCircleStyle]}>
                <Text style={styles.phaseText}>{currentBreathPhase.displayName}</Text>
                <Text style={styles.phaseInstruction}>{currentBreathPhase.instruction}</Text>
              </Animated.View>
            </View>

            {/* Progress Indicator */}
            <View style={styles.progressContainer}>
              <Text style={styles.cycleProgress}>
                Round {currentCycle} of {cycles}
              </Text>
              <View style={styles.phaseDotsContainer}>
                {selectedPattern.phases.map((_, idx) => (
                  <View
                    key={idx}
                    style={[
                      styles.phaseDot,
                      idx === currentPhaseIndex && styles.phaseDotActive,
                      idx < currentPhaseIndex && styles.phaseDotCompleted,
                    ]}
                  />
                ))}
              </View>
            </View>

            {/* Pause/Resume Button */}
            <TouchableOpacity
              style={styles.pauseButton}
              onPress={handlePauseResume}
              testID="pause-resume-breathing"
            >
              <Text style={styles.pauseButtonText}>
                {phase === 'paused' ? 'Resume' : 'Pause'}
              </Text>
            </TouchableOpacity>

            {phase === 'paused' && (
              <TouchableOpacity
                style={styles.endEarlyButton}
                onPress={handleComplete}
                testID="end-early"
              >
                <Text style={styles.endEarlyButtonText}>End Session</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Complete Phase */}
        {phase === 'complete' && selectedPattern && (
          <View style={styles.completeContainer}>
            <Text style={styles.completeEmoji}>✨</Text>
            <Text style={styles.completeTitle}>Well Done</Text>
            <Text style={styles.completeSubtitle}>
              You completed {cycles} rounds of {selectedPattern.name}
            </Text>

            <View style={styles.completeBenefits}>
              <Text style={styles.completeBenefitsTitle}>How you may feel:</Text>
              {selectedPattern.benefits.map((benefit, idx) => (
                <Text key={idx} style={styles.completeBenefitText}>
                  {benefit}
                </Text>
              ))}
            </View>

            <TouchableOpacity
              style={styles.doneButton}
              onPress={handleComplete}
              testID="complete-breathing"
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        )}
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
    headerTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
    },
    patternIcon: {
      fontSize: 32,
      marginBottom: SPACING.xs,
    },
    patternName: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    placeholder: {
      width: 40,
    },

    // Selection Phase
    selectionContainer: {
      flex: 1,
      paddingHorizontal: SPACING.xl,
      paddingTop: SPACING.xl,
    },
    patternCard: {
      flexDirection: 'row',
      backgroundColor: colors.surface,
      borderRadius: RADII.lg,
      padding: SPACING.lg,
      marginBottom: SPACING.md,
      borderWidth: 1,
      borderColor: colors.border,
      ...SHADOWS.sm,
    },
    patternCardIcon: {
      fontSize: 36,
      marginRight: SPACING.lg,
    },
    patternCardContent: {
      flex: 1,
    },
    patternCardName: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.text,
      marginBottom: SPACING.xs,
    },
    patternCardDescription: {
      fontSize: 14,
      color: colors.textSecondary,
      lineHeight: 20,
      marginBottom: SPACING.sm,
    },
    patternPhases: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    patternPhaseText: {
      fontSize: 12,
      color: COLORS.primary,
      fontWeight: '500',
    },

    // Ready Phase
    readyContainer: {
      flex: 1,
      paddingHorizontal: SPACING.xl,
      justifyContent: 'center',
      alignItems: 'center',
    },
    benefitsContainer: {
      backgroundColor: withAlpha(COLORS.primary, 0.1),
      borderRadius: RADII.lg,
      padding: SPACING.lg,
      marginBottom: SPACING.xxl,
      width: '100%',
    },
    benefitText: {
      fontSize: 14,
      color: COLORS.primary,
      lineHeight: 24,
      textAlign: 'center',
    },
    cycleSelector: {
      alignItems: 'center',
      marginBottom: SPACING.xxl,
    },
    cycleSelectorLabel: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: SPACING.sm,
    },
    cycleSelectorControls: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: SPACING.xl,
    },
    cycleButton: {
      width: 48,
      height: 48,
      borderRadius: RADII.full,
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    cycleButtonText: {
      fontSize: 24,
      color: colors.text,
      fontWeight: '600',
    },
    cycleButtonDisabled: {
      color: colors.textMuted,
    },
    cycleCount: {
      fontSize: 48,
      fontWeight: '700',
      color: colors.text,
      minWidth: 80,
      textAlign: 'center',
    },
    estimatedTime: {
      fontSize: 14,
      color: colors.textMuted,
      marginTop: SPACING.sm,
    },
    startButton: {
      backgroundColor: COLORS.primary,
      paddingHorizontal: SPACING['4xl'],
      paddingVertical: SPACING.lg,
      borderRadius: RADII.full,
      ...SHADOWS.primary,
    },
    startButtonText: {
      fontSize: 18,
      fontWeight: '700',
      color: COLORS.black,
    },
    backButton: {
      marginTop: SPACING.xl,
      paddingVertical: SPACING.md,
    },
    backButtonText: {
      fontSize: 14,
      color: colors.textMuted,
    },

    // Active Phase
    activeContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: SPACING.xl,
    },
    circleContainer: {
      width: CIRCLE_SIZE,
      height: CIRCLE_SIZE,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: SPACING.xxl,
    },
    outerCircle: {
      position: 'absolute',
      width: CIRCLE_SIZE,
      height: CIRCLE_SIZE,
      borderRadius: CIRCLE_SIZE / 2,
      backgroundColor: COLORS.primary,
    },
    innerCircle: {
      width: INNER_CIRCLE_SIZE,
      height: INNER_CIRCLE_SIZE,
      borderRadius: INNER_CIRCLE_SIZE / 2,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      padding: SPACING.sm,
      ...SHADOWS.md,
    },
    phaseText: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.text,
      textAlign: 'center',
    },
    phaseInstruction: {
      fontSize: 11,
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: SPACING.xs,
    },
    progressContainer: {
      alignItems: 'center',
      marginBottom: SPACING.xxl,
    },
    cycleProgress: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: SPACING.sm,
    },
    phaseDotsContainer: {
      flexDirection: 'row',
      gap: SPACING.sm,
    },
    phaseDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: colors.surfaceAlt,
    },
    phaseDotActive: {
      backgroundColor: COLORS.primary,
      transform: [{ scale: 1.3 }],
    },
    phaseDotCompleted: {
      backgroundColor: withAlpha(COLORS.primary, 0.5),
    },
    pauseButton: {
      backgroundColor: colors.surface,
      paddingHorizontal: SPACING.xxxl,
      paddingVertical: SPACING.md,
      borderRadius: RADII.full,
      borderWidth: 1,
      borderColor: colors.border,
    },
    pauseButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    endEarlyButton: {
      marginTop: SPACING.lg,
      paddingVertical: SPACING.md,
    },
    endEarlyButtonText: {
      fontSize: 14,
      color: colors.textMuted,
    },

    // Complete Phase
    completeContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: SPACING.xl,
    },
    completeEmoji: {
      fontSize: 64,
      marginBottom: SPACING.lg,
    },
    completeTitle: {
      fontSize: 28,
      fontWeight: '700',
      color: colors.text,
      marginBottom: SPACING.sm,
    },
    completeSubtitle: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: SPACING.xxl,
    },
    completeBenefits: {
      backgroundColor: withAlpha(COLORS.primary, 0.1),
      borderRadius: RADII.lg,
      padding: SPACING.lg,
      marginBottom: SPACING.xxl,
      width: '100%',
    },
    completeBenefitsTitle: {
      fontSize: 12,
      fontWeight: '600',
      color: COLORS.primary,
      marginBottom: SPACING.sm,
      textAlign: 'center',
    },
    completeBenefitText: {
      fontSize: 14,
      color: colors.text,
      lineHeight: 24,
      textAlign: 'center',
    },
    doneButton: {
      backgroundColor: COLORS.primary,
      paddingHorizontal: SPACING['4xl'],
      paddingVertical: SPACING.lg,
      borderRadius: RADII.full,
      ...SHADOWS.primary,
    },
    doneButtonText: {
      fontSize: 18,
      fontWeight: '700',
      color: COLORS.black,
    },
  });
