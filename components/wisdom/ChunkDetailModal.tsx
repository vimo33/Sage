import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
  Alert,
} from 'react-native';
import type { WisdomChunk, ThemeTag } from '../../lib/retrieval/search';
import { getSurroundingContext } from '../../lib/retrieval/search';
import { useSageStore } from '../../lib/storage/store';
import { HapticPatterns } from '../../lib/haptics';
import { COLORS, SPACING, RADII, SHADOWS, withAlpha, TYPOGRAPHY, getThemedColors } from '../../lib/ui/theme';

interface ChunkDetailModalProps {
  visible: boolean;
  chunk: WisdomChunk | null;
  onClose: () => void;
}

const THEME_DISPLAY_NAMES: Record<ThemeTag, string> = {
  action: 'Action',
  detachment: 'Detachment',
  suffering: 'Suffering',
  purpose: 'Purpose',
  discipline: 'Discipline',
  compassion: 'Compassion',
  self: 'Self',
  impermanence: 'Impermanence',
  devotion: 'Devotion',
  knowledge: 'Knowledge',
  meditation: 'Meditation',
  desire: 'Desire',
  peace: 'Peace',
  duty: 'Duty',
  truth: 'Truth',
};

export function ChunkDetailModal({ visible, chunk, onClose }: ChunkDetailModalProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);

  const saveInsight = useSageStore((s) => s.saveInsight);
  const savedInsights = useSageStore((s) => s.savedInsights);

  const [showContext, setShowContext] = useState(false);
  const [contextChunks, setContextChunks] = useState<{
    before: WisdomChunk[];
    after: WisdomChunk[];
  }>({ before: [], after: [] });
  const [loadingContext, setLoadingContext] = useState(false);

  const styles = createStyles(colors, isDark);

  const isAlreadySaved = chunk
    ? savedInsights.some((i) => i.sourceRef === chunk.sourceRef)
    : false;

  const handleSaveAsInsight = useCallback(() => {
    if (!chunk) return;

    if (isAlreadySaved) {
      Alert.alert('Already Saved', 'This passage is already in your insights collection.');
      return;
    }

    saveInsight({
      verseContent: chunk.content,
      sourceRef: chunk.sourceRef,
    });

    void HapticPatterns.saveInsight();

    Alert.alert('Saved', 'This passage has been added to your insights collection.');
  }, [chunk, isAlreadySaved, saveInsight]);

  const handleShowContext = useCallback(async () => {
    if (!chunk || showContext) {
      setShowContext(!showContext);
      return;
    }

    setLoadingContext(true);
    try {
      const context = await getSurroundingContext(chunk.sourceRef, 2);
      if (context) {
        setContextChunks({
          before: context.beforeChunks,
          after: context.afterChunks,
        });
      }
      setShowContext(true);
    } catch (error) {
      console.error('[ChunkDetailModal] Failed to load context:', error);
    } finally {
      setLoadingContext(false);
    }
  }, [chunk, showContext]);

  const handleClose = useCallback(() => {
    setShowContext(false);
    setContextChunks({ before: [], after: [] });
    onClose();
  }, [onClose]);

  if (!chunk) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={handleClose}
              style={styles.headerButton}
              testID="chunk-modal-close"
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Passage Detail</Text>
            <TouchableOpacity
              onPress={handleSaveAsInsight}
              style={styles.headerButton}
              testID="chunk-modal-save"
              disabled={isAlreadySaved}
            >
              <Text style={[styles.saveText, isAlreadySaved && styles.saveTextDisabled]}>
                {isAlreadySaved ? 'Saved' : 'Save'}
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.modalContent}
            contentContainerStyle={styles.modalContentContainer}
          >
            {/* Source Reference */}
            <View style={styles.sourceSection}>
              <Text style={styles.sourceRef}>{chunk.sourceRef}</Text>
              <Text style={styles.bookName}>{chunk.book}</Text>
            </View>

            {/* Context - Before */}
            {showContext && contextChunks.before.length > 0 && (
              <View style={styles.contextSection}>
                <Text style={styles.contextLabel}>PRECEDING PASSAGES</Text>
                {contextChunks.before.map((c) => (
                  <View key={c.id} style={styles.contextChunk}>
                    <Text style={styles.contextContent}>{c.content}</Text>
                    <Text style={styles.contextRef}>{c.sourceRef}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Main Content */}
            <View style={styles.contentSection}>
              <View style={styles.quoteIconContainer}>
                <Text style={styles.quoteIcon}>"</Text>
              </View>
              <Text style={styles.mainContent}>{chunk.content}</Text>
            </View>

            {/* Context - After */}
            {showContext && contextChunks.after.length > 0 && (
              <View style={styles.contextSection}>
                <Text style={styles.contextLabel}>FOLLOWING PASSAGES</Text>
                {contextChunks.after.map((c) => (
                  <View key={c.id} style={styles.contextChunk}>
                    <Text style={styles.contextContent}>{c.content}</Text>
                    <Text style={styles.contextRef}>{c.sourceRef}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Metadata */}
            <View style={styles.metadataSection}>
              <Text style={styles.metadataLabel}>CLASSIFICATION</Text>
              <View style={styles.metadataRow}>
                <View style={styles.metadataItem}>
                  <Text style={styles.metadataKey}>Theme</Text>
                  <View style={styles.themeTag}>
                    <Text style={styles.themeTagText}>
                      {THEME_DISPLAY_NAMES[chunk.theme]}
                    </Text>
                  </View>
                </View>
                <View style={styles.metadataItem}>
                  <Text style={styles.metadataKey}>Tone</Text>
                  <View style={styles.toneTag}>
                    <Text style={styles.toneTagText}>{chunk.tone}</Text>
                  </View>
                </View>
              </View>
              {chunk.chapter && (
                <View style={styles.metadataItem}>
                  <Text style={styles.metadataKey}>Chapter</Text>
                  <Text style={styles.metadataValue}>{chunk.chapter}</Text>
                </View>
              )}
            </View>

            {/* Actions */}
            <View style={styles.actionsSection}>
              <TouchableOpacity
                style={styles.contextButton}
                onPress={handleShowContext}
                disabled={loadingContext}
                testID="chunk-modal-context"
              >
                <Text style={styles.contextButtonText}>
                  {loadingContext
                    ? 'Loading...'
                    : showContext
                    ? 'Hide Context'
                    : 'Show Surrounding Passages'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.saveButton, isAlreadySaved && styles.saveButtonDisabled]}
                onPress={handleSaveAsInsight}
                disabled={isAlreadySaved}
                testID="chunk-modal-save-button"
              >
                <Text style={[styles.saveButtonText, isAlreadySaved && styles.saveButtonTextDisabled]}>
                  {isAlreadySaved ? 'Already in Insights' : 'Save to Insights'}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const createStyles = (colors: ReturnType<typeof getThemedColors>, isDark: boolean) =>
  StyleSheet.create({
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
      minHeight: '50%',
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
    closeText: {
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
    sourceSection: {
      marginBottom: SPACING.xl,
    },
    sourceRef: {
      ...TYPOGRAPHY.styles.h3,
      color: COLORS.primary,
      marginBottom: 4,
    },
    bookName: {
      ...TYPOGRAPHY.styles.body,
      color: colors.textSecondary,
    },
    contentSection: {
      backgroundColor: colors.surface,
      borderRadius: RADII.lg,
      padding: SPACING.xl,
      marginBottom: SPACING.xl,
      borderWidth: 1,
      borderColor: colors.border,
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
    mainContent: {
      fontSize: 18,
      fontWeight: '500',
      color: colors.text,
      lineHeight: 28,
    },
    contextSection: {
      marginBottom: SPACING.xl,
    },
    contextLabel: {
      ...TYPOGRAPHY.styles.label,
      color: colors.textMuted,
      marginBottom: SPACING.md,
    },
    contextChunk: {
      backgroundColor: withAlpha(colors.surface, 0.5),
      borderRadius: RADII.md,
      padding: SPACING.lg,
      marginBottom: SPACING.sm,
      borderLeftWidth: 2,
      borderLeftColor: withAlpha(COLORS.primary, 0.3),
    },
    contextContent: {
      ...TYPOGRAPHY.styles.body,
      color: colors.textSecondary,
      lineHeight: 22,
      fontStyle: 'italic',
    },
    contextRef: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textMuted,
      marginTop: SPACING.sm,
    },
    metadataSection: {
      marginBottom: SPACING.xl,
    },
    metadataLabel: {
      ...TYPOGRAPHY.styles.label,
      color: colors.textMuted,
      marginBottom: SPACING.md,
    },
    metadataRow: {
      flexDirection: 'row',
      gap: SPACING.xl,
      marginBottom: SPACING.md,
    },
    metadataItem: {
      marginBottom: SPACING.sm,
    },
    metadataKey: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textMuted,
      marginBottom: 4,
    },
    metadataValue: {
      ...TYPOGRAPHY.styles.body,
      color: colors.text,
    },
    themeTag: {
      backgroundColor: withAlpha(COLORS.primary, 0.15),
      paddingHorizontal: SPACING.md,
      paddingVertical: SPACING.xs,
      borderRadius: RADII.sm,
      alignSelf: 'flex-start',
    },
    themeTagText: {
      fontSize: 14,
      fontWeight: '600',
      color: COLORS.primary,
    },
    toneTag: {
      backgroundColor: withAlpha(colors.textMuted, 0.2),
      paddingHorizontal: SPACING.md,
      paddingVertical: SPACING.xs,
      borderRadius: RADII.sm,
      alignSelf: 'flex-start',
    },
    toneTagText: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.textSecondary,
      textTransform: 'capitalize',
    },
    actionsSection: {
      gap: SPACING.md,
    },
    contextButton: {
      backgroundColor: colors.surface,
      borderRadius: RADII.md,
      paddingVertical: SPACING.lg,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    contextButtonText: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '600',
    },
    saveButton: {
      backgroundColor: COLORS.primary,
      borderRadius: RADII.md,
      paddingVertical: SPACING.lg,
      alignItems: 'center',
      ...SHADOWS.primary,
    },
    saveButtonDisabled: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      ...SHADOWS.none,
    },
    saveButtonText: {
      color: COLORS.primaryText,
      fontSize: 16,
      fontWeight: '700',
    },
    saveButtonTextDisabled: {
      color: colors.textMuted,
    },
  });
