import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  useColorScheme,
  ScrollView,
} from 'react-native';
import ViewShot from 'react-native-view-shot';
import { COLORS, SPACING, RADII, SHADOWS, withAlpha, TYPOGRAPHY, getThemedColors } from '../../lib/ui/theme';
import type { SavedInsight } from '../../lib/storage/store';
import { InsightShareCard } from './InsightShareCard';
import {
  saveToMediaLibrary,
  shareImage,
  cleanupTempImage,
} from '../../lib/sharing/insight-card';

interface InsightShareModalProps {
  visible: boolean;
  insight: SavedInsight | null;
  onClose: () => void;
}

type CardStyle = 'dark' | 'light';

export function InsightShareModal({ visible, insight, onClose }: InsightShareModalProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);

  const viewShotRef = useRef<ViewShot>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardStyle, setCardStyle] = useState<CardStyle>('dark');

  const styles = createStyles(colors, isDark);

  const captureCard = useCallback(async (): Promise<string | null> => {
    if (!viewShotRef.current || !insight) return null;

    try {
      const uri = await viewShotRef.current.capture?.();

      if (uri) {
        return uri;
      }
      return null;
    } catch (err) {
      console.error('[InsightShareModal] Failed to capture card:', err);
      return null;
    }
  }, [insight]);

  const handleShare = useCallback(async () => {
    setIsProcessing(true);

    try {
      const imageUri = await captureCard();

      if (!imageUri) {
        Alert.alert('Error', 'Failed to create image. Please try again.');
        return;
      }

      const result = await shareImage(imageUri);

      if (!result.success && result.error) {
        Alert.alert('Share Failed', result.error);
      }

      // Clean up temp file after a delay
      setTimeout(() => cleanupTempImage(imageUri), 5000);
    } catch {
      Alert.alert('Error', 'An unexpected error occurred while sharing.');
    } finally {
      setIsProcessing(false);
    }
  }, [captureCard]);

  const handleSaveToCameraRoll = useCallback(async () => {
    setIsProcessing(true);

    try {
      const imageUri = await captureCard();

      if (!imageUri) {
        Alert.alert('Error', 'Failed to create image. Please try again.');
        return;
      }

      const result = await saveToMediaLibrary(imageUri);

      if (result.success) {
        Alert.alert('Saved', 'Image saved to your camera roll.');
      } else if (result.error) {
        Alert.alert('Save Failed', result.error);
      }

      // Clean up temp file
      await cleanupTempImage(imageUri);
    } catch {
      Alert.alert('Error', 'An unexpected error occurred while saving.');
    } finally {
      setIsProcessing(false);
    }
  }, [captureCard]);

  if (!insight) return null;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={onClose}
              style={styles.headerButton}
              disabled={isProcessing}
              testID="share-modal-close"
            >
              <Text style={styles.cancelText}>Close</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Share Insight</Text>
            <View style={styles.headerButton} />
          </View>

          {/* Card Preview */}
          <ScrollView
            style={styles.previewContainer}
            contentContainerStyle={styles.previewContent}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.previewLabel}>PREVIEW</Text>

            <ViewShot
              ref={viewShotRef}
              options={{
                format: 'png',
                quality: 1,
              }}
              style={styles.viewShotContainer}
            >
              <InsightShareCard insight={insight} style={cardStyle} />
            </ViewShot>

            {/* Style Selector */}
            <View style={styles.styleSelector}>
              <Text style={styles.styleSelectorLabel}>STYLE</Text>
              <View style={styles.styleOptions}>
                <TouchableOpacity
                  style={[
                    styles.styleOption,
                    cardStyle === 'dark' && styles.styleOptionActive,
                  ]}
                  onPress={() => setCardStyle('dark')}
                  testID="style-dark"
                >
                  <View style={[styles.stylePreviewDot, styles.stylePreviewDark]} />
                  <Text
                    style={[
                      styles.styleOptionText,
                      cardStyle === 'dark' && styles.styleOptionTextActive,
                    ]}
                  >
                    Dark
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.styleOption,
                    cardStyle === 'light' && styles.styleOptionActive,
                  ]}
                  onPress={() => setCardStyle('light')}
                  testID="style-light"
                >
                  <View style={[styles.stylePreviewDot, styles.stylePreviewLight]} />
                  <Text
                    style={[
                      styles.styleOptionText,
                      cardStyle === 'light' && styles.styleOptionTextActive,
                    ]}
                  >
                    Light
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveToCameraRoll}
              disabled={isProcessing}
              testID="save-to-camera-roll"
            >
              {isProcessing ? (
                <ActivityIndicator color={COLORS.primary} size="small" />
              ) : (
                <>
                  <Text style={styles.saveButtonIcon}>📷</Text>
                  <Text style={styles.saveButtonText}>Save to Photos</Text>
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.shareButton}
              onPress={handleShare}
              disabled={isProcessing}
              testID="share-button"
            >
              {isProcessing ? (
                <ActivityIndicator color="#ffffff" size="small" />
              ) : (
                <>
                  <Text style={styles.shareButtonIcon}>📤</Text>
                  <Text style={styles.shareButtonText}>Share</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const createStyles = (colors: ReturnType<typeof getThemedColors>, isDark: boolean) =>
  StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: withAlpha(COLORS.black, 0.9),
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      backgroundColor: colors.background,
      borderRadius: RADII.xl,
      width: '95%',
      maxHeight: '90%',
      ...SHADOWS.lg,
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
    previewContainer: {
      flex: 1,
    },
    previewContent: {
      alignItems: 'center',
      paddingVertical: SPACING.xl,
      paddingHorizontal: SPACING.lg,
    },
    previewLabel: {
      ...TYPOGRAPHY.styles.label,
      color: colors.textMuted,
      marginBottom: SPACING.lg,
    },
    viewShotContainer: {
      borderRadius: RADII.xl,
      overflow: 'hidden',
      ...SHADOWS.md,
    },
    styleSelector: {
      marginTop: SPACING.xxl,
      alignItems: 'center',
    },
    styleSelectorLabel: {
      ...TYPOGRAPHY.styles.label,
      color: colors.textMuted,
      marginBottom: SPACING.md,
    },
    styleOptions: {
      flexDirection: 'row',
      gap: SPACING.md,
    },
    styleOption: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: SPACING.lg,
      paddingVertical: SPACING.sm,
      borderRadius: RADII.full,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      gap: SPACING.sm,
    },
    styleOptionActive: {
      borderColor: COLORS.primary,
      backgroundColor: withAlpha(COLORS.primary, 0.1),
    },
    stylePreviewDot: {
      width: 16,
      height: 16,
      borderRadius: 8,
      borderWidth: 1,
    },
    stylePreviewDark: {
      backgroundColor: '#0d1a0a',
      borderColor: '#2a3829',
    },
    stylePreviewLight: {
      backgroundColor: '#fafbfa',
      borderColor: '#e5e5e5',
    },
    styleOptionText: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    styleOptionTextActive: {
      color: COLORS.primary,
      fontWeight: '600',
    },
    actionButtons: {
      flexDirection: 'row',
      gap: SPACING.md,
      padding: SPACING.xl,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    saveButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: SPACING.lg,
      borderRadius: RADII.md,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      gap: SPACING.sm,
    },
    saveButtonIcon: {
      fontSize: 18,
    },
    saveButtonText: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '600',
    },
    shareButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: SPACING.lg,
      borderRadius: RADII.md,
      backgroundColor: COLORS.primary,
      gap: SPACING.sm,
      ...SHADOWS.primary,
    },
    shareButtonIcon: {
      fontSize: 18,
    },
    shareButtonText: {
      color: COLORS.primaryText,
      fontSize: 16,
      fontWeight: '700',
    },
  });

export default InsightShareModal;
