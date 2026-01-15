import React, { useState, useCallback, useEffect, useMemo } from 'react';
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
import { useSageStore, type SavedInsight } from '../../lib/storage/store';
import { HapticPatterns } from '../../lib/haptics';
import { COLORS, SPACING, RADII, SHADOWS, withAlpha, TYPOGRAPHY, getThemedColors } from '../../lib/ui/theme';
import { InsightShareModal } from './InsightShareModal';
import { TagInput } from './TagInput';
import { TagChip } from './TagChip';
import { AudioPlayerCard } from './AudioPlayerCard';

// Generate reflection questions based on insight content
function generateReflectionQuestions(verseContent: string): string[] {
  // Default reflection questions that apply to any insight
  const baseQuestions = [
    'What does this insight mean to you personally?',
    'How might this wisdom apply to your current situation?',
    'What would change in your life if you fully embraced this teaching?',
  ];
  return baseQuestions;
}

// Generate a practice exercise based on insight content
function generatePracticeExercise(verseContent: string): string {
  return 'Take 5 minutes today to sit quietly and reflect on this insight. Notice any thoughts or feelings that arise, and consider one small action you could take to embody this wisdom.';
}

interface InsightDetailModalProps {
  visible: boolean;
  insight: SavedInsight | null;
  onClose: () => void;
}

export function InsightDetailModal({ visible, insight, onClose }: InsightDetailModalProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);

  const updateInsight = useSageStore((s) => s.updateInsight);
  const deleteInsight = useSageStore((s) => s.deleteInsight);
  const addTagToInsight = useSageStore((s) => s.addTagToInsight);
  const removeTagFromInsight = useSageStore((s) => s.removeTagFromInsight);
  const getAllTags = useSageStore((s) => s.getAllTags);

  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState('');
  const [isShareModalVisible, setIsShareModalVisible] = useState(false);

  // Journal prompt section state
  const [isJournalEditing, setIsJournalEditing] = useState(false);
  const [journalThoughts, setJournalThoughts] = useState('');

  const allTags = getAllTags();
  const currentTags = insight?.tags ?? [];

  const styles = createStyles(colors, isDark);

  const handleAddTag = useCallback(
    (tag: string) => {
      if (insight) {
        addTagToInsight(insight.id, tag);
      }
    },
    [insight, addTagToInsight]
  );

  const handleRemoveTag = useCallback(
    (tag: string) => {
      if (insight) {
        removeTagFromInsight(insight.id, tag);
      }
    },
    [insight, removeTagFromInsight]
  );

  useEffect(() => {
    if (insight) {
      setEditedNote(insight.userNote || '');
      setJournalThoughts(insight.userNote || '');
    }
  }, [insight]);

  const handleClose = useCallback(() => {
    setIsEditing(false);
    onClose();
  }, [onClose]);

  const handleSave = useCallback(() => {
    if (!insight) return;

    updateInsight(insight.id, {
      userNote: editedNote.trim() || undefined,
    });

    // Trigger haptic feedback for insight save
    void HapticPatterns.saveInsight();

    setIsEditing(false);
  }, [insight, editedNote, updateInsight]);

  const handleDelete = useCallback(() => {
    if (!insight) return;

    Alert.alert(
      'Delete Insight',
      'Are you sure you want to delete this saved insight? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteInsight(insight.id);
            handleClose();
          },
        },
      ]
    );
  }, [insight, deleteInsight, handleClose]);

  const handleCancelEdit = useCallback(() => {
    if (insight) {
      setEditedNote(insight.userNote || '');
    }
    setIsEditing(false);
  }, [insight]);

  const handleShare = useCallback(() => {
    setIsShareModalVisible(true);
  }, []);

  const handleShareModalClose = useCallback(() => {
    setIsShareModalVisible(false);
  }, []);

  // Journal prompt handlers
  const handleJournalEditToggle = useCallback(() => {
    if (isJournalEditing) {
      // Cancel editing - reset to saved value
      setJournalThoughts(insight?.userNote || '');
    }
    setIsJournalEditing(!isJournalEditing);
  }, [isJournalEditing, insight]);

  const handleSaveJournalNote = useCallback(() => {
    if (!insight) return;

    updateInsight(insight.id, {
      userNote: journalThoughts.trim() || undefined,
    });

    // Trigger haptic feedback for save
    void HapticPatterns.saveInsight();

    setIsJournalEditing(false);
  }, [insight, journalThoughts, updateInsight]);

  // Generate reflection questions and practice exercise based on insight content
  const reflectionQuestions = useMemo(
    () => (insight ? generateReflectionQuestions(insight.verseContent) : []),
    [insight?.verseContent]
  );

  const practiceExercise = useMemo(
    () => (insight ? generatePracticeExercise(insight.verseContent) : ''),
    [insight?.verseContent]
  );

  if (!insight) return null;

  const formattedDate = new Date(insight.createdAt).toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
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
              testID="insight-modal-close"
            >
              <Text style={styles.cancelText}>{isEditing ? 'Cancel' : 'Close'}</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>
              {isEditing ? 'Edit Note' : 'Saved Insight'}
            </Text>
            <TouchableOpacity
              onPress={isEditing ? handleSave : () => setIsEditing(true)}
              style={styles.headerButton}
              testID="insight-modal-edit-save"
            >
              <Text style={styles.saveText}>{isEditing ? 'Save' : 'Edit'}</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.modalContent}
            contentContainerStyle={styles.modalContentContainer}
            keyboardShouldPersistTaps="handled"
          >
            {/* Date Header */}
            <View style={styles.dateSection}>
              <Text style={styles.dateText}>Saved on {formattedDate}</Text>
            </View>

            {/* GUIDANCE Section - Quote */}
            <View style={styles.labeledSection} testID="guidance-section">
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionDot}>●</Text>
                <Text style={styles.sectionLabel}>GUIDANCE</Text>
              </View>
              <View style={styles.verseSection}>
                <View style={styles.quoteIconContainer}>
                  <Text style={styles.quoteIcon}>"</Text>
                </View>
                <Text style={styles.verseContent}>{insight.verseContent}</Text>
                <Text style={styles.sourceRef}>— {insight.sourceRef}</Text>
              </View>
            </View>

            {/* REFLECTION Section - Questions */}
            <View style={styles.labeledSection} testID="reflection-section">
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionDot}>●</Text>
                <Text style={styles.sectionLabel}>REFLECTION</Text>
              </View>
              <View style={styles.reflectionContainer}>
                {reflectionQuestions.map((question, index) => (
                  <View key={index} style={styles.questionItem}>
                    <Text style={styles.questionNumber}>{index + 1}.</Text>
                    <Text style={styles.questionText}>{question}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* PRACTICE Section - Exercise */}
            <View style={styles.labeledSection} testID="practice-section">
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionDot}>●</Text>
                <Text style={styles.sectionLabel}>PRACTICE</Text>
              </View>
              <View style={styles.practiceContainer}>
                <Text style={styles.practiceText}>{practiceExercise}</Text>
              </View>
            </View>

            {/* Audio Player Card */}
            <AudioPlayerCard
              text={insight.verseContent}
              testID="insight-audio-player"
            />

            {/* Journal Prompt Section */}
            <View style={styles.labeledSection} testID="journal-prompt-section">
              <View style={styles.journalSectionHeader}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionDot}>●</Text>
                  <Text style={styles.sectionLabel}>JOURNAL YOUR THOUGHTS</Text>
                </View>
                <TouchableOpacity
                  onPress={handleJournalEditToggle}
                  style={styles.journalEditButton}
                  testID="journal-edit-button"
                >
                  <Text style={styles.journalEditIcon}>{isJournalEditing ? '×' : '✎'}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.journalContainer}>
                {isJournalEditing ? (
                  <>
                    <TextInput
                      style={styles.journalInput}
                      value={journalThoughts}
                      onChangeText={setJournalThoughts}
                      multiline
                      textAlignVertical="top"
                      placeholder="Write your thoughts about this insight..."
                      placeholderTextColor={colors.textMuted}
                      testID="journal-input"
                    />
                    <TouchableOpacity
                      style={styles.saveNoteButton}
                      onPress={handleSaveJournalNote}
                      testID="save-note-button"
                    >
                      <Text style={styles.saveNoteButtonText}>Save Note</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <View style={styles.journalDisplay}>
                    {journalThoughts ? (
                      <Text style={styles.journalText}>{journalThoughts}</Text>
                    ) : (
                      <Text style={styles.journalPlaceholder}>
                        Tap the edit icon to journal your reflections on this insight.
                      </Text>
                    )}
                  </View>
                )}

                {/* Tag chips display */}
                {currentTags.length > 0 && (
                  <View style={styles.journalTagsContainer}>
                    <View style={styles.journalTagsList}>
                      {currentTags.map((tag) => (
                        <TagChip key={tag} tag={tag} size="small" testID={`journal-tag-${tag}`} />
                      ))}
                    </View>
                  </View>
                )}

                {/* Share Insight Action */}
                <TouchableOpacity
                  style={styles.shareInsightAction}
                  onPress={handleShare}
                  testID="share-insight-action"
                >
                  <Text style={styles.shareInsightActionText}>SHARE INSIGHT</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Note Section */}
            <View style={styles.noteSection}>
              <Text style={styles.sectionLabel}>YOUR NOTE</Text>
              {isEditing ? (
                <TextInput
                  style={styles.noteInput}
                  value={editedNote}
                  onChangeText={setEditedNote}
                  multiline
                  textAlignVertical="top"
                  placeholder="Add your personal reflection or note about this insight..."
                  placeholderTextColor={colors.textMuted}
                  testID="insight-note-input"
                />
              ) : (
                <View style={styles.noteDisplay}>
                  {insight.userNote ? (
                    <Text style={styles.noteText}>{insight.userNote}</Text>
                  ) : (
                    <Text style={styles.noNoteText}>
                      No note added yet. Tap "Edit" to add your personal reflection.
                    </Text>
                  )}
                </View>
              )}
            </View>

            {/* Tags Section */}
            <View style={styles.tagsSection}>
              <Text style={styles.sectionLabel}>TAGS</Text>
              {isEditing ? (
                <TagInput
                  currentTags={currentTags}
                  allTags={allTags}
                  onAddTag={handleAddTag}
                  onRemoveTag={handleRemoveTag}
                  testID="insight-tags-input"
                />
              ) : (
                <View style={styles.tagsDisplay}>
                  {currentTags.length > 0 ? (
                    <View style={styles.tagsList}>
                      {currentTags.map((tag) => (
                        <TagChip key={tag} tag={tag} size="medium" />
                      ))}
                    </View>
                  ) : (
                    <Text style={styles.noTagsText}>
                      No tags added yet. Tap "Edit" to organize with tags.
                    </Text>
                  )}
                </View>
              )}
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtonsRow}>
              {/* Share Button */}
              <TouchableOpacity
                style={styles.shareButton}
                onPress={handleShare}
                testID="insight-modal-share"
              >
                <Text style={styles.shareButtonText}>Share as Image</Text>
              </TouchableOpacity>

              {/* Delete Button */}
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleDelete}
                testID="insight-modal-delete"
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>

      {/* Share Modal */}
      <InsightShareModal
        visible={isShareModalVisible}
        insight={insight}
        onClose={handleShareModalClose}
      />
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
    minHeight: '60%',
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
    color: colors.textSecondary,
    ...TYPOGRAPHY.styles.body,
  },
  // New labeled section styles
  labeledSection: {
    marginBottom: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionDot: {
    color: COLORS.primary,
    fontSize: 12,
    marginRight: SPACING.sm,
  },
  verseSection: {
    backgroundColor: colors.surface,
    borderRadius: RADII.lg,
    padding: SPACING.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  // Reflection section styles
  reflectionContainer: {
    backgroundColor: colors.surface,
    borderRadius: RADII.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  questionItem: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
  },
  questionNumber: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: '600',
    marginRight: SPACING.sm,
    minWidth: 20,
  },
  questionText: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 22,
    flex: 1,
  },
  // Practice section styles
  practiceContainer: {
    backgroundColor: colors.surface,
    borderRadius: RADII.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  practiceText: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 22,
  },
  quoteIconContainer: {
    marginBottom: SPACING.sm,
  },
  quoteIcon: {
    fontSize: 48,
    color: withAlpha(COLORS.primary, 0.3),
    height: 36,
    lineHeight: 56,
  },
  verseContent: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    lineHeight: 26,
    fontStyle: 'italic',
    marginBottom: SPACING.lg,
  },
  sourceRef: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textMuted,
  },
  noteSection: {
    marginBottom: SPACING.xl,
  },
  sectionLabel: {
    ...TYPOGRAPHY.styles.label,
    color: COLORS.primary,
    marginBottom: SPACING.md,
  },
  noteDisplay: {
    backgroundColor: colors.surface,
    borderRadius: RADII.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 100,
  },
  noteText: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 24,
  },
  noNoteText: {
    color: colors.textMuted,
    fontSize: 16,
    lineHeight: 24,
    fontStyle: 'italic',
  },
  noteInput: {
    backgroundColor: colors.surface,
    borderRadius: RADII.lg,
    padding: SPACING.lg,
    color: colors.text,
    fontSize: 16,
    minHeight: 150,
    lineHeight: 24,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  tagsSection: {
    marginBottom: SPACING.xl,
  },
  tagsDisplay: {
    minHeight: 40,
  },
  tagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  noTagsText: {
    color: colors.textMuted,
    fontSize: 14,
    fontStyle: 'italic',
  },
  // Journal prompt section styles
  journalSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  journalEditButton: {
    width: 32,
    height: 32,
    borderRadius: RADII.full,
    backgroundColor: withAlpha(COLORS.primary, 0.1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  journalEditIcon: {
    fontSize: 16,
    color: COLORS.primary,
  },
  journalContainer: {
    backgroundColor: colors.surface,
    borderRadius: RADII.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  journalInput: {
    backgroundColor: 'transparent',
    color: colors.text,
    fontSize: 15,
    minHeight: 120,
    lineHeight: 22,
    textAlignVertical: 'top',
    padding: 0,
    marginBottom: SPACING.md,
  },
  journalDisplay: {
    minHeight: 60,
  },
  journalText: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 22,
  },
  journalPlaceholder: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  saveNoteButton: {
    backgroundColor: COLORS.primary,
    borderRadius: RADII.md,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
    alignSelf: 'flex-start',
    ...SHADOWS.primary,
  },
  saveNoteButtonText: {
    color: COLORS.primaryText,
    fontSize: 14,
    fontWeight: '700',
  },
  journalTagsContainer: {
    marginTop: SPACING.lg,
    paddingTop: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  journalTagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  shareInsightAction: {
    marginTop: SPACING.lg,
    paddingTop: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    alignItems: 'center',
  },
  shareInsightActionText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.xl,
  },
  shareButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: RADII.md,
    paddingVertical: SPACING.lg,
    alignItems: 'center',
    ...SHADOWS.primary,
  },
  shareButtonText: {
    color: COLORS.primaryText,
    fontSize: 16,
    fontWeight: '700',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: withAlpha(COLORS.danger, 0.1),
    borderRadius: RADII.md,
    paddingVertical: SPACING.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: withAlpha(COLORS.danger, 0.3),
  },
  deleteButtonText: {
    color: COLORS.danger,
    fontSize: 16,
    fontWeight: '600',
  },
});
