import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  useColorScheme,
} from 'react-native';
import { COLORS, SPACING, RADII, SHADOWS, withAlpha, TYPOGRAPHY, getThemedColors } from '../../lib/ui/theme';
import { getSurroundingContext, type SurroundingContextResult, type WisdomChunk } from '../../lib/retrieval/search';
import { HapticPatterns } from '../../lib/haptics';

interface PassageContextModalProps {
  visible: boolean;
  sourceRef: string;
  onClose: () => void;
  onSaveVerse?: (content: string, sourceRef: string) => void;
  isVerseSaved?: (content: string, sourceRef: string) => boolean;
}

export function PassageContextModal({
  visible,
  sourceRef,
  onClose,
  onSaveVerse,
  isVerseSaved,
}: PassageContextModalProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);
  const styles = createStyles(colors, isDark);

  const [loading, setLoading] = useState(true);
  const [context, setContext] = useState<SurroundingContextResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (visible && sourceRef) {
      loadContext();
    }
  }, [visible, sourceRef]);

  const loadContext = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getSurroundingContext(sourceRef, 3);
      setContext(result);
      if (!result) {
        setError('Unable to find passage context');
      }
    } catch (err) {
      setError('Failed to load passage context');
      console.error('[PassageContextModal] Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = useCallback(() => {
    setContext(null);
    setError(null);
    onClose();
  }, [onClose]);

  const handleSaveVerse = useCallback((chunk: WisdomChunk) => {
    if (onSaveVerse) {
      onSaveVerse(chunk.content, chunk.sourceRef);
      void HapticPatterns.saveInsight();
    }
  }, [onSaveVerse]);

  const renderChunk = (chunk: WisdomChunk, isTarget: boolean = false) => {
    const saved = isVerseSaved ? isVerseSaved(chunk.content, chunk.sourceRef) : false;

    return (
      <View
        key={chunk.id}
        style={[
          styles.verseContainer,
          isTarget && styles.targetVerseContainer,
        ]}
        testID={isTarget ? 'target-verse' : `context-verse-${chunk.id}`}
      >
        <View style={styles.verseHeader}>
          <Text style={[styles.verseRef, isTarget && styles.targetVerseRef]}>
            {chunk.sourceRef}
          </Text>
          {onSaveVerse && (
            <TouchableOpacity
              style={[styles.saveBtn, saved && styles.saveBtnSaved]}
              onPress={() => handleSaveVerse(chunk)}
              disabled={saved}
              testID={`save-context-verse-${chunk.id}`}
            >
              <Text style={[styles.saveBtnText, saved && styles.saveBtnTextSaved]}>
                {saved ? 'Saved' : 'Save'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <Text style={[styles.verseContent, isTarget && styles.targetVerseContent]}>
          {chunk.content}
        </Text>
      </View>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
      testID="passage-context-modal"
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={handleClose}
              style={styles.closeButton}
              testID="close-context-modal"
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Passage Context</Text>
            <View style={styles.headerSpacer} />
          </View>

          {/* Content */}
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={true}
          >
            {loading && (
              <View style={styles.loadingContainer} testID="context-loading">
                <ActivityIndicator size="large" color={COLORS.primary} />
                <Text style={styles.loadingText}>Loading context...</Text>
              </View>
            )}

            {error && !loading && (
              <View style={styles.errorContainer} testID="context-error">
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity style={styles.retryBtn} onPress={loadContext}>
                  <Text style={styles.retryBtnText}>Retry</Text>
                </TouchableOpacity>
              </View>
            )}

            {context && !loading && (
              <>
                {/* Book/Chapter Info */}
                <View style={styles.bookInfoContainer}>
                  <Text style={styles.bookName}>{context.targetChunk.book}</Text>
                  {context.targetChunk.chapter && (
                    <Text style={styles.chapterInfo}>
                      Chapter {context.targetChunk.chapter}
                    </Text>
                  )}
                </View>

                {/* Divider */}
                <View style={styles.divider} />

                {/* Before chunks */}
                {context.beforeChunks.map((chunk) => renderChunk(chunk, false))}

                {/* Target chunk (highlighted) */}
                {renderChunk(context.targetChunk, true)}

                {/* After chunks */}
                {context.afterChunks.map((chunk) => renderChunk(chunk, false))}

                {/* Info footer */}
                <View style={styles.infoFooter}>
                  <Text style={styles.infoText}>
                    Showing surrounding verses for fuller context
                  </Text>
                </View>
              </>
            )}
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
    closeButton: {
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
    headerSpacer: {
      minWidth: 60,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      padding: SPACING.xl,
      paddingBottom: SPACING.xxxl,
    },
    loadingContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: SPACING.xxxl,
    },
    loadingText: {
      color: colors.textSecondary,
      marginTop: SPACING.lg,
      ...TYPOGRAPHY.styles.body,
    },
    errorContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: SPACING.xxxl,
    },
    errorText: {
      color: COLORS.danger,
      marginBottom: SPACING.lg,
      ...TYPOGRAPHY.styles.body,
    },
    retryBtn: {
      backgroundColor: COLORS.primary,
      paddingHorizontal: SPACING.xl,
      paddingVertical: SPACING.md,
      borderRadius: RADII.md,
    },
    retryBtnText: {
      color: COLORS.primaryText,
      fontWeight: '600',
    },
    bookInfoContainer: {
      alignItems: 'center',
      marginBottom: SPACING.lg,
    },
    bookName: {
      color: COLORS.primary,
      ...TYPOGRAPHY.styles.h3,
      marginBottom: SPACING.xs,
    },
    chapterInfo: {
      color: colors.textSecondary,
      ...TYPOGRAPHY.styles.body,
    },
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: SPACING.lg,
    },
    verseContainer: {
      backgroundColor: colors.surface,
      borderRadius: RADII.lg,
      padding: SPACING.lg,
      marginBottom: SPACING.md,
      borderWidth: 1,
      borderColor: colors.border,
    },
    targetVerseContainer: {
      backgroundColor: withAlpha(COLORS.primary, 0.1),
      borderColor: COLORS.primary,
      borderWidth: 2,
    },
    verseHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: SPACING.sm,
    },
    verseRef: {
      color: colors.textMuted,
      fontSize: 12,
      fontWeight: '600',
    },
    targetVerseRef: {
      color: COLORS.primary,
      fontWeight: '700',
    },
    verseContent: {
      color: colors.text,
      fontSize: 15,
      lineHeight: 22,
    },
    targetVerseContent: {
      fontWeight: '500',
      fontStyle: 'italic',
    },
    saveBtn: {
      backgroundColor: withAlpha(COLORS.primary, 0.15),
      paddingHorizontal: SPACING.md,
      paddingVertical: SPACING.xs,
      borderRadius: RADII.sm,
    },
    saveBtnSaved: {
      backgroundColor: withAlpha(COLORS.primary, 0.3),
    },
    saveBtnText: {
      color: COLORS.primary,
      fontSize: 12,
      fontWeight: '600',
    },
    saveBtnTextSaved: {
      color: colors.textMuted,
    },
    infoFooter: {
      alignItems: 'center',
      marginTop: SPACING.xl,
      paddingTop: SPACING.lg,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    infoText: {
      color: colors.textMuted,
      fontSize: 12,
      fontStyle: 'italic',
    },
  });
