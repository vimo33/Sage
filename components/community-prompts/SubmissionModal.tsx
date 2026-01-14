import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {
  COLORS,
  SPACING,
  RADII,
  TYPOGRAPHY,
  SIZES,
  getThemedColors,
  withAlpha,
} from '../../lib/ui/theme';
import type { CommunityPromptCategory } from '../../lib/community-prompts/types';
import { CATEGORY_INFO } from '../../lib/community-prompts/types';
import { validatePromptText } from '../../lib/community-prompts/service';
import { useSageStore } from '../../lib/storage/store';

interface SubmissionModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmitSuccess?: () => void;
}

const CATEGORIES = Object.keys(CATEGORY_INFO) as CommunityPromptCategory[];

export function SubmissionModal({ visible, onClose, onSubmitSuccess }: SubmissionModalProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);

  const [promptText, setPromptText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CommunityPromptCategory>('general');
  const [error, setError] = useState<string | null>(null);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  const communityPreferences = useSageStore((s) => s.communityPreferences);
  const acceptCommunityPrivacyPolicy = useSageStore((s) => s.acceptCommunityPrivacyPolicy);
  const submitCommunityPrompt = useSageStore((s) => s.submitCommunityPrompt);

  const styles = createStyles(colors, isDark);

  const handleSubmit = () => {
    // Validate the prompt
    const validation = validatePromptText(promptText);
    if (!validation.valid) {
      setError(validation.error ?? 'Invalid prompt');
      return;
    }

    // Check privacy policy
    if (!communityPreferences.hasAcceptedPrivacyPolicy) {
      setShowPrivacyPolicy(true);
      return;
    }

    // Submit the prompt
    const submission = submitCommunityPrompt(promptText, selectedCategory);
    if (submission) {
      setPromptText('');
      setSelectedCategory('general');
      setError(null);
      onSubmitSuccess?.();
      Alert.alert(
        'Prompt Submitted',
        'Your reflection question has been submitted for review. Thank you for contributing to the community!',
        [{ text: 'OK', onPress: onClose }]
      );
    } else {
      setError('Failed to submit prompt. Please try again.');
    }
  };

  const handleAcceptPrivacy = () => {
    acceptCommunityPrivacyPolicy();
    setShowPrivacyPolicy(false);
    handleSubmit();
  };

  const categoryInfo = CATEGORY_INFO[selectedCategory];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Submit a Question</Text>
          <TouchableOpacity
            onPress={handleSubmit}
            style={[styles.submitButton, !promptText.trim() && styles.submitButtonDisabled]}
            disabled={!promptText.trim()}
            testID="submit-prompt-button"
          >
            <Text
              style={[
                styles.submitButtonText,
                !promptText.trim() && styles.submitButtonTextDisabled,
              ]}
            >
              Submit
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          <Text style={styles.sectionTitle}>Your Reflection Question</Text>
          <Text style={styles.sectionDescription}>
            Share a question that has helped you reflect deeply. It will be reviewed before being
            shared with the community.
          </Text>

          <TextInput
            style={styles.textInput}
            value={promptText}
            onChangeText={(text) => {
              setPromptText(text);
              setError(null);
            }}
            placeholder="What question has helped you reflect?"
            placeholderTextColor={colors.textMuted}
            multiline
            maxLength={500}
            testID="prompt-text-input"
          />

          <View style={styles.charCount}>
            <Text style={styles.charCountText}>{promptText.length}/500</Text>
          </View>

          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          <Text style={styles.sectionTitle}>Category</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScroll}
          >
            {CATEGORIES.map((category) => {
              const info = CATEGORY_INFO[category];
              const isSelected = selectedCategory === category;
              return (
                <TouchableOpacity
                  key={category}
                  style={[styles.categoryChip, isSelected && styles.categoryChipSelected]}
                  onPress={() => setSelectedCategory(category)}
                  testID={`category-${category}`}
                >
                  <Text style={styles.categoryChipIcon}>{info.icon}</Text>
                  <Text
                    style={[
                      styles.categoryChipLabel,
                      isSelected && styles.categoryChipLabelSelected,
                    ]}
                  >
                    {info.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <View style={styles.selectedCategoryInfo}>
            <Text style={styles.selectedCategoryIcon}>{categoryInfo.icon}</Text>
            <Text style={styles.selectedCategoryDescription}>{categoryInfo.description}</Text>
          </View>

          <View style={styles.privacyNote}>
            <Text style={styles.privacyNoteTitle}>Privacy Note</Text>
            <Text style={styles.privacyNoteText}>
              Your submission will be anonymized before being shared. Personal information like
              names, emails, and dates will be automatically removed.
            </Text>
          </View>
        </ScrollView>

        {/* Privacy Policy Modal */}
        <Modal
          visible={showPrivacyPolicy}
          animationType="fade"
          transparent
          onRequestClose={() => setShowPrivacyPolicy(false)}
        >
          <View style={styles.privacyOverlay}>
            <View style={styles.privacyModal}>
              <Text style={styles.privacyModalTitle}>Privacy Policy</Text>
              <ScrollView style={styles.privacyModalContent}>
                <Text style={styles.privacyModalText}>
                  By submitting a reflection question to the community, you agree to the following:
                </Text>
                <Text style={styles.privacyModalText}>
                  {'\n'}1. Your submission will be anonymized. Personal information will be
                  automatically removed.
                </Text>
                <Text style={styles.privacyModalText}>
                  {'\n'}2. Approved prompts may be shared with other users of the app.
                </Text>
                <Text style={styles.privacyModalText}>
                  {'\n'}3. We do not collect or store any device identifiers or personal information
                  with your submission.
                </Text>
                <Text style={styles.privacyModalText}>
                  {'\n'}4. You can stop participating at any time by disabling community features in
                  settings.
                </Text>
              </ScrollView>
              <View style={styles.privacyModalButtons}>
                <TouchableOpacity
                  style={styles.privacyDeclineButton}
                  onPress={() => setShowPrivacyPolicy(false)}
                >
                  <Text style={styles.privacyDeclineButtonText}>Decline</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.privacyAcceptButton}
                  onPress={handleAcceptPrivacy}
                  testID="accept-privacy-button"
                >
                  <Text style={styles.privacyAcceptButtonText}>Accept & Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
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
      paddingVertical: SPACING.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    closeButton: {
      paddingVertical: SPACING.xs,
    },
    closeButtonText: {
      ...TYPOGRAPHY.styles.body,
      color: colors.textSecondary,
    },
    title: {
      ...TYPOGRAPHY.styles.h4,
      color: colors.text,
    },
    submitButton: {
      paddingVertical: SPACING.xs,
      paddingHorizontal: SPACING.md,
      backgroundColor: COLORS.primary,
      borderRadius: RADII.sm,
    },
    submitButtonDisabled: {
      backgroundColor: colors.border,
    },
    submitButtonText: {
      ...TYPOGRAPHY.styles.bodyBold,
      color: COLORS.primaryText,
    },
    submitButtonTextDisabled: {
      color: colors.textMuted,
    },
    content: {
      flex: 1,
    },
    contentContainer: {
      padding: SPACING.xl,
    },
    sectionTitle: {
      ...TYPOGRAPHY.styles.h4,
      color: colors.text,
      marginBottom: SPACING.sm,
    },
    sectionDescription: {
      ...TYPOGRAPHY.styles.body,
      color: colors.textSecondary,
      marginBottom: SPACING.lg,
    },
    textInput: {
      backgroundColor: colors.surface,
      borderRadius: RADII.md,
      padding: SPACING.lg,
      borderWidth: 1,
      borderColor: colors.border,
      ...TYPOGRAPHY.styles.body,
      color: colors.text,
      minHeight: 120,
      textAlignVertical: 'top',
    },
    charCount: {
      alignItems: 'flex-end',
      marginTop: SPACING.xs,
    },
    charCountText: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textMuted,
    },
    errorContainer: {
      backgroundColor: withAlpha(COLORS.danger, 0.1),
      padding: SPACING.md,
      borderRadius: RADII.sm,
      marginTop: SPACING.md,
    },
    errorText: {
      ...TYPOGRAPHY.styles.body,
      color: COLORS.danger,
    },
    categoryScroll: {
      marginBottom: SPACING.lg,
    },
    categoryChip: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: SPACING.md,
      paddingVertical: SPACING.sm,
      borderRadius: RADII.full,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      marginRight: SPACING.sm,
    },
    categoryChipSelected: {
      backgroundColor: withAlpha(COLORS.primary, 0.15),
      borderColor: COLORS.primary,
    },
    categoryChipIcon: {
      fontSize: 14,
      marginRight: SPACING.xs,
    },
    categoryChipLabel: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textSecondary,
      fontWeight: '600',
    },
    categoryChipLabelSelected: {
      color: COLORS.primary,
    },
    selectedCategoryInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surfaceAlt,
      padding: SPACING.md,
      borderRadius: RADII.md,
      marginBottom: SPACING.xl,
    },
    selectedCategoryIcon: {
      fontSize: 24,
      marginRight: SPACING.md,
    },
    selectedCategoryDescription: {
      ...TYPOGRAPHY.styles.body,
      color: colors.textSecondary,
      flex: 1,
    },
    privacyNote: {
      backgroundColor: isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)',
      padding: SPACING.lg,
      borderRadius: RADII.md,
      borderLeftWidth: 3,
      borderLeftColor: COLORS.info,
    },
    privacyNoteTitle: {
      ...TYPOGRAPHY.styles.bodyBold,
      color: colors.text,
      marginBottom: SPACING.sm,
    },
    privacyNoteText: {
      ...TYPOGRAPHY.styles.body,
      color: colors.textSecondary,
      lineHeight: 22,
    },
    privacyOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: SPACING.xl,
    },
    privacyModal: {
      backgroundColor: colors.surface,
      borderRadius: RADII.lg,
      padding: SPACING.xl,
      width: '100%',
      maxHeight: '80%',
    },
    privacyModalTitle: {
      ...TYPOGRAPHY.styles.h3,
      color: colors.text,
      marginBottom: SPACING.lg,
      textAlign: 'center',
    },
    privacyModalContent: {
      maxHeight: 300,
    },
    privacyModalText: {
      ...TYPOGRAPHY.styles.body,
      color: colors.textSecondary,
      lineHeight: 22,
    },
    privacyModalButtons: {
      flexDirection: 'row',
      marginTop: SPACING.xl,
      gap: SPACING.md,
    },
    privacyDeclineButton: {
      flex: 1,
      paddingVertical: SPACING.md,
      borderRadius: RADII.md,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
    },
    privacyDeclineButtonText: {
      ...TYPOGRAPHY.styles.bodyBold,
      color: colors.textSecondary,
    },
    privacyAcceptButton: {
      flex: 1,
      paddingVertical: SPACING.md,
      borderRadius: RADII.md,
      backgroundColor: COLORS.primary,
      alignItems: 'center',
    },
    privacyAcceptButtonText: {
      ...TYPOGRAPHY.styles.bodyBold,
      color: COLORS.primaryText,
    },
  });

export default SubmissionModal;
