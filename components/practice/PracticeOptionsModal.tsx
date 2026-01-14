import { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  useColorScheme,
  ScrollView,
} from 'react-native';
import { COLORS, SPACING, RADII, SHADOWS, withAlpha, getThemedColors } from '../../lib/ui/theme';
import type { PracticeOption, PracticeDuration } from '../../lib/practice/types';
import { getPracticeDurations } from '../../lib/practice/service';

interface PracticeOptionsModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectPractice: (option: PracticeOption) => void;
  options: PracticeOption[];
  conversationContext?: string;
}

const DURATION_CONFIG: Record<PracticeDuration, { emoji: string; color: string }> = {
  short: { emoji: '1', color: '#37ec13' },   // 1 minute - green
  medium: { emoji: '5', color: '#3b82f6' },  // 5 minutes - blue
  long: { emoji: '10+', color: '#f59e0b' },    // Daily - amber
};

export function PracticeOptionsModal({
  visible,
  onClose,
  onSelectPractice,
  options,
  conversationContext,
}: PracticeOptionsModalProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);
  const styles = createStyles(colors, isDark);

  const durations = getPracticeDurations();

  const handleSelectPractice = useCallback((option: PracticeOption) => {
    onSelectPractice(option);
    onClose();
  }, [onSelectPractice, onClose]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} onPress={onClose} activeOpacity={1} />
        <View style={styles.modalContainer}>
          <View style={styles.handle} />

          <View style={styles.header}>
            <Text style={styles.headerIcon}>🧘</Text>
            <Text style={styles.headerTitle}>Choose a Practice</Text>
            <Text style={styles.headerSubtitle}>
              Select a duration that fits your moment
            </Text>
          </View>

          <ScrollView
            style={styles.optionsContainer}
            showsVerticalScrollIndicator={false}
          >
            {options.map((option) => {
              const config = DURATION_CONFIG[option.duration];
              const durationInfo = durations.find(d => d.duration === option.duration);

              return (
                <TouchableOpacity
                  key={`${option.templateId}-${option.duration}`}
                  style={styles.optionCard}
                  onPress={() => handleSelectPractice(option)}
                  testID={`practice-option-${option.duration}`}
                  activeOpacity={0.7}
                >
                  <View style={styles.optionHeader}>
                    <View style={[styles.durationBadge, { backgroundColor: withAlpha(config.color, 0.15) }]}>
                      <Text style={[styles.durationNumber, { color: config.color }]}>
                        {config.emoji}
                      </Text>
                      <Text style={[styles.durationUnit, { color: config.color }]}>
                        min
                      </Text>
                    </View>
                    <View style={styles.optionTitleContainer}>
                      <Text style={styles.optionTitle}>{option.title}</Text>
                      <Text style={styles.optionLabel}>{durationInfo?.label}</Text>
                    </View>
                    <Text style={styles.optionIcon}>{option.icon}</Text>
                  </View>

                  <Text style={styles.optionDescription}>
                    {option.description}
                  </Text>

                  {option.contextualNote && (
                    <View style={styles.contextNoteContainer}>
                      <Text style={styles.contextNote}>
                        {option.contextualNote}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onClose}
            testID="practice-modal-cancel"
          >
            <Text style={styles.cancelButtonText}>Maybe Later</Text>
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
      maxHeight: '80%',
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
    optionsContainer: {
      maxHeight: 400,
    },
    optionCard: {
      backgroundColor: colors.surfaceAlt,
      borderRadius: RADII.lg,
      padding: SPACING.lg,
      marginBottom: SPACING.md,
      borderWidth: 1,
      borderColor: colors.border,
    },
    optionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: SPACING.md,
    },
    durationBadge: {
      width: 48,
      height: 48,
      borderRadius: RADII.md,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: SPACING.md,
    },
    durationNumber: {
      fontSize: 18,
      fontWeight: '800',
    },
    durationUnit: {
      fontSize: 10,
      fontWeight: '600',
      marginTop: -2,
    },
    optionTitleContainer: {
      flex: 1,
    },
    optionTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.text,
    },
    optionLabel: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 2,
    },
    optionIcon: {
      fontSize: 24,
    },
    optionDescription: {
      fontSize: 14,
      color: colors.textSecondary,
      lineHeight: 20,
    },
    contextNoteContainer: {
      marginTop: SPACING.sm,
      paddingTop: SPACING.sm,
      borderTopWidth: 1,
      borderTopColor: withAlpha(COLORS.primary, 0.1),
    },
    contextNote: {
      fontSize: 12,
      fontStyle: 'italic',
      color: COLORS.primary,
    },
    cancelButton: {
      alignItems: 'center',
      paddingVertical: SPACING.md,
      marginTop: SPACING.sm,
    },
    cancelButtonText: {
      fontSize: 14,
      color: colors.textMuted,
      fontWeight: '500',
    },
  });
