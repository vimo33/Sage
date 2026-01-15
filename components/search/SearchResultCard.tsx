import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { COLORS, SPACING, RADII, TYPOGRAPHY, SHADOWS, getThemedColors, withAlpha } from '../../lib/ui/theme';
import { TagChip } from '../insights/TagChip';
import type { UnifiedSearchResult, HighlightedText } from '../../lib/search';

interface SearchResultCardProps {
  result: UnifiedSearchResult;
  onPress: () => void;
  testID?: string;
}

/**
 * Render highlighted text with matching terms emphasized
 */
function HighlightedTextView({
  segments,
  style,
  highlightStyle,
}: {
  segments: HighlightedText[];
  style: object;
  highlightStyle: object;
}) {
  return (
    <Text style={style}>
      {segments.map((segment, index) => (
        <Text
          key={index}
          style={segment.isHighlighted ? highlightStyle : undefined}
        >
          {segment.text}
        </Text>
      ))}
    </Text>
  );
}

export function SearchResultCard({ result, onPress, testID }: SearchResultCardProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);
  const styles = createStyles(colors, isDark);

  const getTypeBadge = () => {
    switch (result.type) {
      case 'conversation':
        return { label: 'CONVERSATION', style: styles.conversationBadge, textStyle: styles.conversationBadgeText };
      case 'journal':
        return { label: 'JOURNAL', style: styles.journalBadge, textStyle: styles.journalBadgeText };
      case 'insight':
        return { label: 'INSIGHT', style: styles.insightBadge, textStyle: styles.insightBadgeText };
      default:
        return { label: 'ITEM', style: styles.defaultBadge, textStyle: styles.defaultBadgeText };
    }
  };

  const badge = getTypeBadge();

  const renderContent = () => {
    switch (result.type) {
      case 'conversation':
        return (
          <>
            <View style={styles.questionContainer}>
              <Text style={styles.questionLabel}>Q:</Text>
              <HighlightedTextView
                segments={result.matchedText}
                style={styles.questionText}
                highlightStyle={styles.highlightedText}
              />
            </View>
            {result.data.responsePreview && (
              <Text style={styles.previewText} numberOfLines={2}>
                {result.data.responsePreview}
              </Text>
            )}
          </>
        );

      case 'journal':
        return (
          <>
            {result.data.title && (
              <Text style={styles.titleText} numberOfLines={1}>
                {result.data.title}
              </Text>
            )}
            <HighlightedTextView
              segments={result.matchedText}
              style={styles.contentText}
              highlightStyle={styles.highlightedText}
            />
            {result.data.mood && (
              <View style={styles.moodContainer}>
                <Text style={styles.moodLabel}>Mood:</Text>
                <Text style={styles.moodText}>{result.data.mood}</Text>
              </View>
            )}
            {result.data.tags && result.data.tags.length > 0 && (
              <View style={styles.tagsRow}>
                {result.data.tags.slice(0, 3).map((tag) => (
                  <TagChip key={tag} tag={tag} size="small" />
                ))}
                {result.data.tags.length > 3 && (
                  <Text style={styles.moreTagsText}>+{result.data.tags.length - 3}</Text>
                )}
              </View>
            )}
          </>
        );

      case 'insight':
        return (
          <>
            <View style={styles.quoteContainer}>
              <Text style={styles.quoteIcon}>"</Text>
              <HighlightedTextView
                segments={result.matchedText}
                style={styles.verseText}
                highlightStyle={styles.highlightedText}
              />
            </View>
            <Text style={styles.sourceText}>— {result.data.sourceRef}</Text>
            {result.data.userNote && (
              <View style={styles.noteContainer}>
                <Text style={styles.noteLabel}>NOTE:</Text>
                <Text style={styles.noteText} numberOfLines={1}>
                  {result.data.userNote}
                </Text>
              </View>
            )}
            {result.data.tags && result.data.tags.length > 0 && (
              <View style={styles.tagsRow}>
                {result.data.tags.slice(0, 3).map((tag) => (
                  <TagChip key={tag} tag={tag} size="small" />
                ))}
                {result.data.tags.length > 3 && (
                  <Text style={styles.moreTagsText}>+{result.data.tags.length - 3}</Text>
                )}
              </View>
            )}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.9}
      testID={testID}
    >
      <View style={styles.header}>
        <View style={[styles.badge, badge.style]}>
          <Text style={[styles.badgeText, badge.textStyle]}>{badge.label}</Text>
        </View>
        <Text style={styles.dateText}>
          {new Date(result.createdAt).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </Text>
      </View>
      {renderContent()}
    </TouchableOpacity>
  );
}

const createStyles = (colors: ReturnType<typeof getThemedColors>, isDark: boolean) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.surface,
      borderRadius: RADII.lg,
      padding: SPACING.lg,
      marginHorizontal: SPACING.lg,
      marginBottom: SPACING.md,
      borderWidth: 1,
      borderColor: colors.border,
      ...SHADOWS.sm,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: SPACING.md,
    },
    badge: {
      paddingHorizontal: SPACING.sm,
      paddingVertical: 2,
      borderRadius: RADII.sm,
    },
    badgeText: {
      ...TYPOGRAPHY.styles.label,
      fontSize: 10,
    },
    conversationBadge: {
      backgroundColor: withAlpha(COLORS.info, 0.15),
    },
    conversationBadgeText: {
      color: COLORS.info,
    },
    journalBadge: {
      backgroundColor: withAlpha('#a855f7', 0.15),
    },
    journalBadgeText: {
      color: '#a855f7',
    },
    insightBadge: {
      backgroundColor: withAlpha(COLORS.primary, 0.15),
    },
    insightBadgeText: {
      color: COLORS.primary,
    },
    defaultBadge: {
      backgroundColor: withAlpha(colors.textMuted, 0.15),
    },
    defaultBadgeText: {
      color: colors.textMuted,
    },
    dateText: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textMuted,
    },
    // Highlighted text
    highlightedText: {
      backgroundColor: withAlpha(COLORS.primary, 0.3),
      color: COLORS.primary,
      fontWeight: TYPOGRAPHY.fontWeight.semibold,
    },
    // Conversation styles
    questionContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: SPACING.sm,
    },
    questionLabel: {
      ...TYPOGRAPHY.styles.bodyBold,
      color: COLORS.primary,
      marginRight: SPACING.xs,
    },
    questionText: {
      ...TYPOGRAPHY.styles.body,
      color: colors.text,
      flex: 1,
    },
    previewText: {
      ...TYPOGRAPHY.styles.body,
      color: colors.textSecondary,
      lineHeight: 20,
    },
    // Journal styles
    titleText: {
      ...TYPOGRAPHY.styles.bodyBold,
      color: colors.text,
      marginBottom: SPACING.xs,
    },
    contentText: {
      ...TYPOGRAPHY.styles.body,
      color: colors.textSecondary,
      lineHeight: 20,
    },
    moodContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: SPACING.sm,
    },
    moodLabel: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textMuted,
      marginRight: SPACING.xs,
    },
    moodText: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textSecondary,
    },
    // Insight styles
    quoteContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    quoteIcon: {
      fontSize: 32,
      color: withAlpha(COLORS.primary, 0.4),
      marginRight: SPACING.xs,
      lineHeight: 36,
      marginTop: -4,
    },
    verseText: {
      ...TYPOGRAPHY.styles.body,
      fontStyle: 'italic',
      color: colors.text,
      flex: 1,
      lineHeight: 22,
    },
    sourceText: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textMuted,
      marginTop: SPACING.sm,
      fontWeight: TYPOGRAPHY.fontWeight.semibold,
    },
    noteContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: SPACING.sm,
      paddingTop: SPACING.sm,
      borderTopWidth: 1,
      borderTopColor: withAlpha(colors.border, 0.5),
    },
    noteLabel: {
      ...TYPOGRAPHY.styles.label,
      color: COLORS.primary,
      marginRight: SPACING.xs,
    },
    noteText: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textSecondary,
      flex: 1,
    },
    // Tags
    tagsRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: SPACING.xs,
      marginTop: SPACING.md,
      alignItems: 'center',
    },
    moreTagsText: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textMuted,
    },
  });
