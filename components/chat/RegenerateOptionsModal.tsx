import { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  useColorScheme,
  Switch,
} from 'react-native';
import { COLORS, SPACING, RADII, SHADOWS, withAlpha, getThemedColors } from '../../lib/ui/theme';
import type { RegenerateTemperature, RegenerateOptions } from '../../lib/chat/service';

interface RegenerateOptionsModalProps {
  visible: boolean;
  onClose: () => void;
  onRegenerate: (options: RegenerateOptions) => void;
  isRegenerating?: boolean;
}

interface TemperatureOption {
  value: RegenerateTemperature;
  label: string;
  emoji: string;
  description: string;
  color: string;
}

const TEMPERATURE_OPTIONS: TemperatureOption[] = [
  {
    value: 'low',
    label: 'Focused',
    emoji: '🎯',
    description: 'More consistent, similar framing',
    color: '#3b82f6', // blue
  },
  {
    value: 'medium',
    label: 'Balanced',
    emoji: '⚖️',
    description: 'Natural variation in response',
    color: '#37ec13', // green
  },
  {
    value: 'high',
    label: 'Creative',
    emoji: '✨',
    description: 'More varied, exploratory response',
    color: '#f59e0b', // amber
  },
];

export function RegenerateOptionsModal({
  visible,
  onClose,
  onRegenerate,
  isRegenerating = false,
}: RegenerateOptionsModalProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);
  const styles = createStyles(colors, isDark);

  const [selectedTemperature, setSelectedTemperature] = useState<RegenerateTemperature>('medium');
  const [useDifferentWisdom, setUseDifferentWisdom] = useState(false);

  const handleRegenerate = useCallback(() => {
    onRegenerate({
      temperature: selectedTemperature,
      useDifferentWisdom,
    });
  }, [selectedTemperature, useDifferentWisdom, onRegenerate]);

  const handleClose = useCallback(() => {
    if (!isRegenerating) {
      onClose();
    }
  }, [isRegenerating, onClose]);

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
          disabled={isRegenerating}
        />
        <View style={styles.modalContainer}>
          <View style={styles.handle} />

          <View style={styles.header}>
            <Text style={styles.headerIcon}>🔄</Text>
            <Text style={styles.headerTitle}>Regenerate Response</Text>
            <Text style={styles.headerSubtitle}>
              Get a different perspective on this guidance
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>RESPONSE STYLE</Text>
            <View style={styles.optionsRow}>
              {TEMPERATURE_OPTIONS.map((option) => {
                const isSelected = selectedTemperature === option.value;
                return (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.temperatureOption,
                      isSelected && { borderColor: option.color, backgroundColor: withAlpha(option.color, 0.1) },
                    ]}
                    onPress={() => setSelectedTemperature(option.value)}
                    testID={`temperature-option-${option.value}`}
                    disabled={isRegenerating}
                  >
                    <Text style={styles.optionEmoji}>{option.emoji}</Text>
                    <Text style={[styles.optionLabel, isSelected && { color: option.color }]}>
                      {option.label}
                    </Text>
                    <Text style={styles.optionDescription}>{option.description}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.toggleRow}>
              <View style={styles.toggleInfo}>
                <Text style={styles.toggleLabel}>Different Wisdom Sources</Text>
                <Text style={styles.toggleDescription}>
                  Draw from alternative passages and teachings
                </Text>
              </View>
              <Switch
                value={useDifferentWisdom}
                onValueChange={setUseDifferentWisdom}
                trackColor={{ false: colors.border, true: withAlpha(COLORS.primary, 0.4) }}
                thumbColor={useDifferentWisdom ? COLORS.primary : colors.textMuted}
                testID="different-wisdom-toggle"
                disabled={isRegenerating}
              />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.regenerateButton, isRegenerating && styles.regenerateButtonDisabled]}
            onPress={handleRegenerate}
            testID="regenerate-confirm-btn"
            disabled={isRegenerating}
          >
            <Text style={styles.regenerateButtonText}>
              {isRegenerating ? 'Regenerating...' : 'Regenerate'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleClose}
            testID="regenerate-modal-cancel"
            disabled={isRegenerating}
          >
            <Text style={[styles.cancelButtonText, isRegenerating && styles.cancelButtonTextDisabled]}>
              Cancel
            </Text>
          </TouchableOpacity>
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
      marginBottom: SPACING.xl,
    },
    headerIcon: {
      fontSize: 40,
      marginBottom: SPACING.sm,
    },
    headerTitle: {
      fontSize: 22,
      fontWeight: '700',
      color: colors.text,
      marginBottom: SPACING.xs,
    },
    headerSubtitle: {
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: 'center',
    },
    section: {
      marginBottom: SPACING.xl,
    },
    sectionTitle: {
      fontSize: 10,
      fontWeight: '800',
      color: colors.textMuted,
      letterSpacing: 1,
      marginBottom: SPACING.md,
    },
    optionsRow: {
      flexDirection: 'row',
      gap: SPACING.sm,
    },
    temperatureOption: {
      flex: 1,
      backgroundColor: colors.surfaceAlt,
      borderRadius: RADII.md,
      padding: SPACING.md,
      borderWidth: 2,
      borderColor: colors.border,
      alignItems: 'center',
    },
    optionEmoji: {
      fontSize: 24,
      marginBottom: SPACING.xs,
    },
    optionLabel: {
      fontSize: 13,
      fontWeight: '700',
      color: colors.text,
      marginBottom: SPACING.xs,
    },
    optionDescription: {
      fontSize: 10,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 14,
    },
    toggleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surfaceAlt,
      borderRadius: RADII.md,
      padding: SPACING.md,
    },
    toggleInfo: {
      flex: 1,
      marginRight: SPACING.md,
    },
    toggleLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
      marginBottom: SPACING.xs,
    },
    toggleDescription: {
      fontSize: 12,
      color: colors.textSecondary,
    },
    regenerateButton: {
      backgroundColor: COLORS.primary,
      borderRadius: RADII.full,
      paddingVertical: SPACING.md,
      alignItems: 'center',
      marginBottom: SPACING.md,
    },
    regenerateButtonDisabled: {
      opacity: 0.6,
    },
    regenerateButtonText: {
      fontSize: 16,
      fontWeight: '700',
      color: COLORS.black,
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
    cancelButtonTextDisabled: {
      opacity: 0.5,
    },
  });
