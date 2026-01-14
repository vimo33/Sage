import React, { useState, useCallback, useEffect } from 'react';
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
  Alert,
  useColorScheme,
} from 'react-native';
import { useSageStore, type JournalEntry } from '../../lib/storage/store';
import { COLORS, SPACING, RADII, SHADOWS, withAlpha, TYPOGRAPHY, getThemedColors } from '../../lib/ui/theme';

interface JournalEntryDetailModalProps {
  visible: boolean;
  entry: JournalEntry | null;
  onClose: () => void;
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

export function JournalEntryDetailModal({ visible, entry, onClose }: JournalEntryDetailModalProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);

  const updateJournalEntry = useSageStore((s) => s.updateJournalEntry);
  const deleteJournalEntry = useSageStore((s) => s.deleteJournalEntry);
  const journalEntries = useSageStore((s) => s.journalEntries);

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [editedMood, setEditedMood] = useState<string | undefined>(undefined);

  const styles = createStyles(colors, isDark);

  // Get mood history for this entry's date
  const getMoodHistory = useCallback(() => {
    if (!entry) return [];

    const entryDate = new Date(entry.createdAt).toDateString();
    return journalEntries
      .filter((e) => new Date(e.createdAt).toDateString() === entryDate && e.mood)
      .map((e) => ({
        mood: e.mood!,
        time: new Date(e.createdAt).toLocaleTimeString(undefined, {
          hour: '2-digit',
          minute: '2-digit',
        }),
      }));
  }, [entry, journalEntries]);

  useEffect(() => {
    if (entry) {
      setEditedContent(entry.content);
      setEditedMood(entry.mood);
    }
  }, [entry]);

  const handleClose = useCallback(() => {
    setIsEditing(false);
    onClose();
  }, [onClose]);

  const handleSave = useCallback(() => {
    if (!entry) return;

    updateJournalEntry(entry.id, {
      content: editedContent,
      mood: editedMood,
    });
    setIsEditing(false);
  }, [entry, editedContent, editedMood, updateJournalEntry]);

  const handleDelete = useCallback(() => {
    if (!entry) return;

    Alert.alert(
      'Delete Entry',
      'Are you sure you want to delete this journal entry? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteJournalEntry(entry.id);
            handleClose();
          },
        },
      ]
    );
  }, [entry, deleteJournalEntry, handleClose]);

  const handleCancelEdit = useCallback(() => {
    if (entry) {
      setEditedContent(entry.content);
      setEditedMood(entry.mood);
    }
    setIsEditing(false);
  }, [entry]);

  if (!entry) return null;

  const moodHistory = getMoodHistory();
  const formattedDate = new Date(entry.createdAt).toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const formattedTime = new Date(entry.createdAt).toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });

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
              onPress={isEditing ? handleCancelEdit : handleClose}
              style={styles.headerButton}
              testID="detail-modal-close"
            >
              <Text style={styles.cancelText}>{isEditing ? 'Cancel' : 'Close'}</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>
              {isEditing ? 'Edit Entry' : 'Journal Entry'}
            </Text>
            <TouchableOpacity
              onPress={isEditing ? handleSave : () => setIsEditing(true)}
              style={styles.headerButton}
              testID="detail-modal-edit-save"
            >
              <Text style={styles.saveText}>{isEditing ? 'Save' : 'Edit'}</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.modalContent}
            contentContainerStyle={styles.modalContentContainer}
            keyboardShouldPersistTaps="handled"
          >
            {/* Date/Time Header */}
            <View style={styles.dateSection}>
              <Text style={styles.dateText}>{formattedDate}</Text>
              <Text style={styles.timeText}>{formattedTime}</Text>
            </View>

            {/* Mood History Section */}
            {moodHistory.length > 0 && (
              <View style={styles.moodHistorySection}>
                <Text style={styles.sectionLabel}>Mood History (Today)</Text>
                <View style={styles.moodHistoryGrid}>
                  {moodHistory.map((item, index) => (
                    <View key={index} style={styles.moodHistoryItem}>
                      <Text style={styles.moodHistoryEmoji}>{item.mood}</Text>
                      <Text style={styles.moodHistoryTime}>{item.time}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Current Mood (Edit Mode) */}
            {isEditing && (
              <View style={styles.moodSection}>
                <Text style={styles.sectionLabel}>Current Mood</Text>
                <View style={styles.moodGrid}>
                  {MOOD_OPTIONS.map((mood) => (
                    <TouchableOpacity
                      key={mood.label}
                      style={[
                        styles.moodButton,
                        editedMood === mood.emoji && styles.moodButtonSelected,
                      ]}
                      onPress={() =>
                        setEditedMood(editedMood === mood.emoji ? undefined : mood.emoji)
                      }
                      testID={`edit-mood-${mood.label.toLowerCase()}`}
                    >
                      <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                      <Text
                        style={[
                          styles.moodLabel,
                          editedMood === mood.emoji && styles.moodLabelSelected,
                        ]}
                      >
                        {mood.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* Content Section */}
            <View style={styles.contentSection}>
              <View style={styles.contentHeader}>
                <Text style={styles.sectionLabel}>Entry</Text>
                {!isEditing && entry.mood && (
                  <View style={styles.currentMoodBadge}>
                    <Text style={styles.currentMoodEmoji}>{entry.mood}</Text>
                    <Text style={styles.currentMoodLabel}>
                      {MOOD_OPTIONS.find((m) => m.emoji === entry.mood)?.label || 'Mood'}
                    </Text>
                  </View>
                )}
              </View>
              {isEditing ? (
                <TextInput
                  style={styles.contentInput}
                  value={editedContent}
                  onChangeText={setEditedContent}
                  multiline
                  textAlignVertical="top"
                  testID="detail-content-input"
                />
              ) : (
                <View style={styles.contentDisplay}>
                  <Text style={styles.contentText}>{entry.content}</Text>
                </View>
              )}
            </View>

            {/* Delete Button */}
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDelete}
              testID="detail-modal-delete"
            >
              <Text style={styles.deleteButtonText}>Delete Entry</Text>
            </TouchableOpacity>
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
  modalContent: {
    flex: 1,
  },
  modalContentContainer: {
    padding: SPACING.xl,
    paddingBottom: SPACING.xxxl,
  },
  dateSection: {
    marginBottom: SPACING.xl,
  },
  dateText: {
    color: colors.text,
    ...TYPOGRAPHY.styles.h3,
  },
  timeText: {
    color: colors.textSecondary,
    ...TYPOGRAPHY.styles.body,
    marginTop: 4,
  },
  moodHistorySection: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: RADII.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    borderWidth: 1,
    borderColor: withAlpha(COLORS.primary, 0.2),
  },
  moodHistoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
    marginTop: SPACING.sm,
  },
  moodHistoryItem: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADII.md,
    minWidth: 70,
  },
  moodHistoryEmoji: {
    fontSize: 24,
  },
  moodHistoryTime: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 2,
  },
  moodSection: {
    marginBottom: SPACING.xl,
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
    marginBottom: SPACING.xl,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  currentMoodBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
    borderRadius: RADII.full,
    gap: SPACING.xs,
  },
  currentMoodEmoji: {
    fontSize: 16,
  },
  currentMoodLabel: {
    color: COLORS.primary,
    ...TYPOGRAPHY.styles.caption,
  },
  contentDisplay: {
    backgroundColor: colors.surface,
    borderRadius: RADII.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  contentText: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 24,
  },
  contentInput: {
    backgroundColor: colors.surface,
    borderRadius: RADII.lg,
    padding: SPACING.lg,
    color: colors.text,
    fontSize: 16,
    minHeight: 200,
    lineHeight: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  deleteButton: {
    backgroundColor: withAlpha(COLORS.danger, 0.1),
    borderRadius: RADII.md,
    paddingVertical: SPACING.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: withAlpha(COLORS.danger, 0.3),
    marginTop: SPACING.lg,
  },
  deleteButtonText: {
    color: COLORS.danger,
    fontSize: 16,
    fontWeight: '600',
  },
});
