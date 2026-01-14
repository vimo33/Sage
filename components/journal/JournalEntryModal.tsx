import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
} from 'react-native';
import { useSageStore } from '../../lib/storage/store';
import { HapticPatterns } from '../../lib/haptics';
import { COLORS, SPACING, RADII, SHADOWS, withAlpha, TYPOGRAPHY, getThemedColors } from '../../lib/ui/theme';

interface JournalEntryModalProps {
  visible: boolean;
  onClose: () => void;
  dailyPrompt?: string;
  initialContent?: string;
}

const MOOD_OPTIONS = [
  { emoji: '😊', label: 'Happy' },
  { emoji: '😌', label: 'Peaceful' },
  { emoji: '🤔', label: 'Reflective' },
  { emoji: '😔', label: 'Sad' },
  { emoji: '😤', label: 'Frustrated' },
  { emoji: '😴', label: 'Tired' },
  { emoji: '🙏', label: 'Grateful' },
  { emoji: '💪', label: 'Strong' },
];

export function JournalEntryModal({ visible, onClose, dailyPrompt, initialContent }: JournalEntryModalProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);

  const addJournalEntry = useSageStore((s) => s.addJournalEntry);
  const startTimeSession = useSageStore((s) => s.startTimeSession);
  const endTimeSession = useSageStore((s) => s.endTimeSession);

  const [content, setContent] = useState(initialContent ?? '');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [promptResponse, setPromptResponse] = useState('');

  // Track journal session time
  const journalSessionIdRef = useRef<string | null>(null);

  const styles = createStyles(colors, isDark);

  // Start/end time tracking when modal visibility changes
  useEffect(() => {
    if (visible) {
      journalSessionIdRef.current = startTimeSession('journal');
    } else if (journalSessionIdRef.current) {
      endTimeSession(journalSessionIdRef.current);
      journalSessionIdRef.current = null;
    }
  }, [visible, startTimeSession, endTimeSession]);

  // Update content when initialContent changes (e.g., when modal opens with pre-filled content)
  React.useEffect(() => {
    if (initialContent) {
      setContent(initialContent);
    }
  }, [initialContent]);

  const handleClose = useCallback(() => {
    setContent('');
    setSelectedMood(null);
    setPromptResponse('');
    onClose();
  }, [onClose]);

  const handleSave = useCallback(() => {
    if (!content.trim() && !promptResponse.trim()) {
      return;
    }

    const fullContent = dailyPrompt && promptResponse.trim()
      ? `Daily Prompt: ${dailyPrompt}\n\n${promptResponse.trim()}\n\n---\n\n${content.trim()}`
      : content.trim();

    addJournalEntry({
      content: fullContent || promptResponse.trim(),
      mood: selectedMood || undefined,
      linkedInsightIds: [],
    });

    // Trigger haptic feedback for journal entry save
    void HapticPatterns.saveJournalEntry();

    handleClose();
  }, [content, promptResponse, selectedMood, dailyPrompt, addJournalEntry, handleClose]);

  const canSave = content.trim().length > 0 || promptResponse.trim().length > 0;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        style={styles.modalOverlay}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={handleClose}
              style={styles.headerButton}
              testID="journal-modal-cancel"
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>New Entry</Text>
            <TouchableOpacity
              onPress={handleSave}
              style={[styles.headerButton, !canSave && styles.headerButtonDisabled]}
              disabled={!canSave}
              testID="journal-modal-save"
            >
              <Text style={[styles.saveText, !canSave && styles.saveTextDisabled]}>Save</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.modalContent}
            contentContainerStyle={styles.modalContentContainer}
            keyboardShouldPersistTaps="handled"
          >
            {/* Daily Prompt Section */}
            {dailyPrompt && (
              <View style={styles.promptSection}>
                <View style={styles.promptBadge}>
                  <Text style={styles.promptBadgeText}>DAILY PROMPT</Text>
                </View>
                <Text style={styles.promptText}>{dailyPrompt}</Text>
                <TextInput
                  style={styles.promptInput}
                  placeholder="Respond to the prompt..."
                  placeholderTextColor={colors.textMuted}
                  value={promptResponse}
                  onChangeText={setPromptResponse}
                  multiline
                  testID="journal-prompt-input"
                />
              </View>
            )}

            {/* Mood Selection */}
            <View style={styles.moodSection}>
              <Text style={styles.sectionLabel}>How are you feeling?</Text>
              <View style={styles.moodGrid}>
                {MOOD_OPTIONS.map((mood) => (
                  <TouchableOpacity
                    key={mood.label}
                    style={[
                      styles.moodButton,
                      selectedMood === mood.emoji && styles.moodButtonSelected,
                    ]}
                    onPress={() => setSelectedMood(
                      selectedMood === mood.emoji ? null : mood.emoji
                    )}
                    testID={`mood-${mood.label.toLowerCase()}`}
                  >
                    <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                    <Text style={[
                      styles.moodLabel,
                      selectedMood === mood.emoji && styles.moodLabelSelected,
                    ]}>{mood.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Main Journal Content */}
            <View style={styles.contentSection}>
              <Text style={styles.sectionLabel}>Your thoughts</Text>
              <TextInput
                style={styles.contentInput}
                placeholder="What's on your mind?"
                placeholderTextColor={colors.textMuted}
                value={content}
                onChangeText={setContent}
                multiline
                textAlignVertical="top"
                testID="journal-content-input"
              />
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const createStyles = (colors: ReturnType<typeof getThemedColors>, isDark: boolean) => StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: withAlpha(COLORS.black, 0.85),
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: colors.background,
    borderTopLeftRadius: RADII.xl,
    borderTopRightRadius: RADII.xl,
    maxHeight: '90%',
    minHeight: '70%',
    ...SHADOWS.md,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerButton: {
    minWidth: 60,
  },
  headerButtonDisabled: {
    opacity: 0.5,
  },
  cancelText: {
    color: colors.textSecondary,
    fontSize: 16,
  },
  modalTitle: {
    color: colors.text,
    ...TYPOGRAPHY.styles.h4,
  },
  saveText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'right',
  },
  saveTextDisabled: {
    color: colors.textMuted,
  },
  modalContent: {
    flex: 1,
  },
  modalContentContainer: {
    padding: SPACING.xl,
    paddingBottom: SPACING.xxxl,
  },
  promptSection: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: RADII.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.xxl,
    borderWidth: 1,
    borderColor: withAlpha(COLORS.primary, 0.2),
  },
  promptBadge: {
    backgroundColor: COLORS.primaryLight,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: SPACING.sm,
  },
  promptBadgeText: {
    color: COLORS.primary,
    ...TYPOGRAPHY.styles.label,
  },
  promptText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: SPACING.md,
    lineHeight: 22,
  },
  promptInput: {
    backgroundColor: colors.surface,
    borderRadius: RADII.md,
    padding: SPACING.md,
    color: colors.text,
    fontSize: 15,
    minHeight: 80,
  },
  moodSection: {
    marginBottom: SPACING.xxl,
  },
  sectionLabel: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: SPACING.md,
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  moodButton: {
    backgroundColor: colors.surface,
    borderRadius: RADII.md,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    minWidth: 70,
  },
  moodButtonSelected: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primary,
  },
  moodEmoji: {
    fontSize: 24,
    marginBottom: 2,
  },
  moodLabel: {
    color: colors.textMuted,
    fontSize: 11,
  },
  moodLabelSelected: {
    color: COLORS.primary,
  },
  contentSection: {
    flex: 1,
  },
  contentInput: {
    backgroundColor: colors.surface,
    borderRadius: RADII.lg,
    padding: SPACING.lg,
    color: colors.text,
    fontSize: 16,
    minHeight: 150,
    lineHeight: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
