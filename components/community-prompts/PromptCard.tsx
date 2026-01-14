import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import {
  COLORS,
  SPACING,
  RADII,
  TYPOGRAPHY,
  getThemedColors,
} from '../../lib/ui/theme';
import type { CommunityPrompt } from '../../lib/community-prompts/types';
import { CATEGORY_INFO } from '../../lib/community-prompts/types';

interface PromptCardProps {
  prompt: CommunityPrompt;
  isUpvoted: boolean;
  onPress?: () => void;
  onUpvote?: () => void;
  showCategory?: boolean;
}

export function PromptCard({
  prompt,
  isUpvoted,
  onPress,
  onUpvote,
  showCategory = true,
}: PromptCardProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);

  const categoryInfo = CATEGORY_INFO[prompt.category];

  const styles = createStyles(colors, isDark);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      testID={`prompt-card-${prompt.id}`}
    >
      {showCategory && (
        <View style={styles.categoryRow}>
          <Text style={styles.categoryIcon}>{categoryInfo.icon}</Text>
          <Text style={styles.categoryLabel}>{categoryInfo.label}</Text>
          {prompt.isCurated && (
            <View style={styles.curatedBadge}>
              <Text style={styles.curatedBadgeText}>Curated</Text>
            </View>
          )}
        </View>
      )}

      <Text style={styles.promptText}>{prompt.promptText}</Text>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.upvoteButton, isUpvoted && styles.upvoteButtonActive]}
          onPress={onUpvote}
          testID={`upvote-button-${prompt.id}`}
        >
          <Text style={[styles.upvoteIcon, isUpvoted && styles.upvoteIconActive]}>
            {isUpvoted ? '❤️' : '🤍'}
          </Text>
          <Text style={[styles.upvoteCount, isUpvoted && styles.upvoteCountActive]}>
            {prompt.upvotes + (isUpvoted ? 1 : 0)}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const createStyles = (colors: ReturnType<typeof getThemedColors>, isDark: boolean) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.surface,
      borderRadius: RADII.md,
      padding: SPACING.lg,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: SPACING.md,
    },
    categoryRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: SPACING.sm,
    },
    categoryIcon: {
      fontSize: 16,
      marginRight: SPACING.xs,
    },
    categoryLabel: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textSecondary,
      textTransform: 'uppercase',
      fontWeight: '600',
    },
    curatedBadge: {
      marginLeft: SPACING.sm,
      backgroundColor: isDark ? 'rgba(55, 236, 19, 0.2)' : 'rgba(55, 236, 19, 0.1)',
      paddingHorizontal: SPACING.sm,
      paddingVertical: 2,
      borderRadius: RADII.sm,
    },
    curatedBadgeText: {
      fontSize: 10,
      fontWeight: '700',
      color: COLORS.primary,
    },
    promptText: {
      ...TYPOGRAPHY.styles.body,
      color: colors.text,
      lineHeight: 24,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: SPACING.md,
    },
    upvoteButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: SPACING.md,
      paddingVertical: SPACING.xs,
      borderRadius: RADII.full,
      backgroundColor: colors.surfaceAlt,
    },
    upvoteButtonActive: {
      backgroundColor: isDark ? 'rgba(239, 68, 68, 0.2)' : 'rgba(239, 68, 68, 0.1)',
    },
    upvoteIcon: {
      fontSize: 14,
      marginRight: SPACING.xs,
    },
    upvoteIconActive: {},
    upvoteCount: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textSecondary,
      fontWeight: '600',
    },
    upvoteCountActive: {
      color: COLORS.danger,
    },
  });

export default PromptCard;
