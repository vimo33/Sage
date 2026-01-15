import { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  useColorScheme,
  Dimensions,
  Animated,
  PanResponder,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { COLORS, SPACING, RADII, SHADOWS, withAlpha, getThemedColors } from '../../lib/ui/theme';
import type { TonePreference } from '../../lib/storage/store';

interface ToneAdjustmentSheetProps {
  visible: boolean;
  onClose: () => void;
  onApply: (tone: TonePreference, guidanceStyle: number) => void;
  currentTone?: TonePreference;
  currentGuidanceStyle?: number;
  previewQuote?: string;
}

interface ToneConfig {
  type: TonePreference;
  label: string;
  emoji: string;
  description: string;
  color: string;
}

const TONE_CONFIGS: ToneConfig[] = [
  {
    type: 'practical',
    label: 'Practical',
    emoji: '🎯',
    description: 'Clear, actionable guidance',
    color: '#3b82f6', // blue
  },
  {
    type: 'poetic',
    label: 'Poetic',
    emoji: '🌸',
    description: 'Beautiful, evocative language',
    color: '#ec4899', // pink
  },
  {
    type: 'minimal',
    label: 'Minimal',
    emoji: '✨',
    description: 'Brief, essential insights',
    color: '#14b8a6', // teal
  },
  {
    type: 'deep',
    label: 'Deep',
    emoji: '🔮',
    description: 'Philosophical exploration',
    color: '#8b5cf6', // purple
  },
];

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SLIDER_WIDTH = SCREEN_WIDTH - SPACING.xl * 2 - SPACING.xxl * 2;
const THUMB_SIZE = 24;

export function ToneAdjustmentSheet({
  visible,
  onClose,
  onApply,
  currentTone = 'practical',
  currentGuidanceStyle = 0.5,
  previewQuote = 'The wise find peace in acceptance, and strength in understanding.',
}: ToneAdjustmentSheetProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);
  const styles = createStyles(colors, isDark);

  const [selectedTone, setSelectedTone] = useState<TonePreference>(currentTone);
  const [guidanceValue, setGuidanceValue] = useState(currentGuidanceStyle);

  // Slider animation
  const sliderPosition = useRef(new Animated.Value(currentGuidanceStyle * SLIDER_WIDTH)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      },
      onPanResponderMove: (_, gestureState) => {
        const newPosition = Math.max(0, Math.min(SLIDER_WIDTH - THUMB_SIZE, gestureState.moveX - SPACING.xl - SPACING.xxl - THUMB_SIZE / 2));
        sliderPosition.setValue(newPosition);
        const newValue = newPosition / (SLIDER_WIDTH - THUMB_SIZE);
        setGuidanceValue(newValue);
      },
      onPanResponderRelease: () => {
        void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      },
    })
  ).current;

  const handleToneSelect = useCallback((tone: TonePreference) => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedTone(tone);
  }, []);

  const handleClose = useCallback(() => {
    // Reset to original values
    setSelectedTone(currentTone);
    setGuidanceValue(currentGuidanceStyle);
    sliderPosition.setValue(currentGuidanceStyle * (SLIDER_WIDTH - THUMB_SIZE));
    onClose();
  }, [currentTone, currentGuidanceStyle, sliderPosition, onClose]);

  const handleApply = useCallback(() => {
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    onApply(selectedTone, guidanceValue);
    onClose();
  }, [selectedTone, guidanceValue, onApply, onClose]);

  const selectedToneConfig = TONE_CONFIGS.find((t) => t.type === selectedTone) || TONE_CONFIGS[0];

  // Calculate guidance style label
  const getGuidanceLabel = () => {
    if (guidanceValue < 0.3) return 'More Questions';
    if (guidanceValue > 0.7) return 'More Statements';
    return 'Balanced';
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          onPress={handleClose}
          activeOpacity={1}
        />
        <View style={styles.modalContainer}>
          {/* Drag Handle */}
          <View style={styles.handle} testID="tone-adjustment-handle" />

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerIcon}>🎨</Text>
            <Text style={styles.headerTitle}>Adjust Response Style</Text>
            <Text style={styles.headerSubtitle}>
              Customize how Sage communicates with you
            </Text>
          </View>

          {/* Current Preview Card with Quote Icon */}
          <View style={[styles.previewCard, { borderColor: selectedToneConfig.color }]}>
            <View style={styles.quoteContainer}>
              <Text style={[styles.quoteIcon, { color: selectedToneConfig.color }]}>❝</Text>
              <Text style={styles.previewText}>{previewQuote}</Text>
            </View>
            <View style={styles.previewMeta}>
              <Text style={[styles.previewToneLabel, { color: selectedToneConfig.color }]}>
                {selectedToneConfig.emoji} {selectedToneConfig.label}
              </Text>
            </View>
          </View>

          {/* Tone Selector */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Response Tone</Text>
            <View style={styles.tonePillsContainer}>
              {TONE_CONFIGS.map((config) => (
                <TouchableOpacity
                  key={config.type}
                  style={[
                    styles.tonePill,
                    selectedTone === config.type && {
                      borderColor: config.color,
                      backgroundColor: withAlpha(config.color, 0.1),
                    },
                  ]}
                  onPress={() => handleToneSelect(config.type)}
                  testID={`tone-pill-${config.type}`}
                >
                  <Text style={styles.tonePillEmoji}>{config.emoji}</Text>
                  <Text
                    style={[
                      styles.tonePillText,
                      selectedTone === config.type && { color: config.color },
                    ]}
                  >
                    {config.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Guidance Style Slider */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Guidance Style</Text>
            <View style={styles.sliderLabelsRow}>
              <Text style={styles.sliderLabel}>More Questions</Text>
              <Text style={[styles.sliderValueLabel, { color: selectedToneConfig.color }]}>
                {getGuidanceLabel()}
              </Text>
              <Text style={styles.sliderLabel}>More Statements</Text>
            </View>
            <View style={styles.sliderContainer}>
              <View style={styles.sliderTrack}>
                <Animated.View
                  style={[
                    styles.sliderFill,
                    {
                      width: sliderPosition,
                      backgroundColor: selectedToneConfig.color,
                    },
                  ]}
                />
              </View>
              <Animated.View
                style={[
                  styles.sliderThumb,
                  {
                    transform: [{ translateX: sliderPosition }],
                    backgroundColor: selectedToneConfig.color,
                  },
                ]}
                {...panResponder.panHandlers}
                testID="guidance-slider-thumb"
              />
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[
                styles.applyButton,
                { backgroundColor: selectedToneConfig.color },
              ]}
              onPress={handleApply}
              testID="tone-adjustment-apply"
            >
              <Text style={styles.applyButtonText}>Apply Changes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleClose}
              testID="tone-adjustment-cancel"
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const createStyles = (colors: ReturnType<typeof getThemedColors>, isDark: boolean) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: withAlpha(COLORS.black, 0.6),
    },
    modalContainer: {
      backgroundColor: colors.surface,
      borderTopLeftRadius: RADII.xl,
      borderTopRightRadius: RADII.xl,
      paddingHorizontal: SPACING.xl,
      paddingBottom: SPACING['4xl'],
      maxHeight: '90%',
      ...SHADOWS.lg,
    },
    handle: {
      width: 40,
      height: 4,
      backgroundColor: colors.border,
      borderRadius: RADII.full,
      alignSelf: 'center',
      marginTop: SPACING.md,
      marginBottom: SPACING.lg,
    },
    header: {
      alignItems: 'center',
      marginBottom: SPACING.lg,
    },
    headerIcon: {
      fontSize: 40,
      marginBottom: SPACING.sm,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.text,
      marginBottom: SPACING.xs,
      textAlign: 'center',
    },
    headerSubtitle: {
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: 'center',
    },
    previewCard: {
      backgroundColor: colors.surfaceAlt,
      borderRadius: RADII.lg,
      padding: SPACING.lg,
      marginBottom: SPACING.xl,
      borderWidth: 2,
    },
    quoteContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: SPACING.sm,
    },
    quoteIcon: {
      fontSize: 32,
      lineHeight: 36,
      marginTop: -4,
    },
    previewText: {
      flex: 1,
      fontSize: 15,
      lineHeight: 22,
      color: colors.text,
      fontStyle: 'italic',
    },
    previewMeta: {
      marginTop: SPACING.md,
      alignItems: 'flex-end',
    },
    previewToneLabel: {
      fontSize: 12,
      fontWeight: '600',
    },
    sectionContainer: {
      marginBottom: SPACING.xl,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.textSecondary,
      marginBottom: SPACING.md,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    tonePillsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: SPACING.sm,
    },
    tonePill: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: SPACING.md,
      paddingVertical: SPACING.sm,
      borderRadius: RADII.full,
      borderWidth: 1.5,
      borderColor: colors.border,
      backgroundColor: colors.surfaceAlt,
      gap: SPACING.xs,
    },
    tonePillEmoji: {
      fontSize: 14,
    },
    tonePillText: {
      fontSize: 12,
      fontWeight: '600',
      color: colors.textSecondary,
    },
    sliderLabelsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: SPACING.md,
    },
    sliderLabel: {
      fontSize: 11,
      color: colors.textMuted,
    },
    sliderValueLabel: {
      fontSize: 12,
      fontWeight: '600',
    },
    sliderContainer: {
      height: THUMB_SIZE + SPACING.md,
      justifyContent: 'center',
    },
    sliderTrack: {
      height: 6,
      backgroundColor: colors.border,
      borderRadius: RADII.full,
      overflow: 'hidden',
    },
    sliderFill: {
      height: '100%',
      borderRadius: RADII.full,
    },
    sliderThumb: {
      position: 'absolute',
      width: THUMB_SIZE,
      height: THUMB_SIZE,
      borderRadius: THUMB_SIZE / 2,
      borderWidth: 3,
      borderColor: COLORS.white,
      ...SHADOWS.md,
    },
    buttonsContainer: {
      marginTop: SPACING.md,
    },
    applyButton: {
      borderRadius: RADII.full,
      paddingVertical: SPACING.md,
      alignItems: 'center',
      marginBottom: SPACING.md,
    },
    applyButtonText: {
      fontSize: 16,
      fontWeight: '700',
      color: COLORS.white,
    },
    cancelButton: {
      alignItems: 'center',
      paddingVertical: SPACING.sm,
    },
    cancelButtonText: {
      fontSize: 14,
      color: colors.textMuted,
      fontWeight: '500',
    },
  });
