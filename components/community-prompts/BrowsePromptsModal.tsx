import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
  useColorScheme,
} from 'react-native';
import {
  COLORS,
  SPACING,
  RADII,
  TYPOGRAPHY,
  getThemedColors,
  withAlpha,
} from '../../lib/ui/theme';
import type { CommunityPromptCategory } from '../../lib/community-prompts/types';
import { CATEGORY_INFO } from '../../lib/community-prompts/types';
import {
  getAllCommunityPrompts,
  getPromptsByCategory,
  searchPrompts,
} from '../../lib/community-prompts/service';
import { useSageStore } from '../../lib/storage/store';
import { PromptCard } from './PromptCard';

interface BrowsePromptsModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectPrompt?: (promptText: string) => void;
}

const CATEGORIES = Object.keys(CATEGORY_INFO) as CommunityPromptCategory[];

export function BrowsePromptsModal({
  visible,
  onClose,
  onSelectPrompt,
}: BrowsePromptsModalProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);

  const [selectedCategory, setSelectedCategory] = useState<CommunityPromptCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const upvotedPromptIds = useSageStore((s) => s.upvotedPromptIds);
  const upvotePrompt = useSageStore((s) => s.upvotePrompt);
  const removeUpvote = useSageStore((s) => s.removeUpvote);
  const isPromptUpvoted = useSageStore((s) => s.isPromptUpvoted);

  const styles = createStyles(colors, isDark);

  const prompts = useMemo(() => {
    let result;

    if (searchQuery.trim()) {
      result = searchPrompts(searchQuery);
    } else if (selectedCategory === 'all') {
      result = getAllCommunityPrompts();
    } else {
      result = getPromptsByCategory(selectedCategory);
    }

    // Sort by upvotes (including user's local upvotes)
    return result.sort((a, b) => {
      const aUpvotes = a.upvotes + (upvotedPromptIds.includes(a.id) ? 1 : 0);
      const bUpvotes = b.upvotes + (upvotedPromptIds.includes(b.id) ? 1 : 0);
      return bUpvotes - aUpvotes;
    });
  }, [selectedCategory, searchQuery, upvotedPromptIds]);

  const handleUpvote = (promptId: string) => {
    if (isPromptUpvoted(promptId)) {
      removeUpvote(promptId);
    } else {
      upvotePrompt(promptId);
    }
  };

  const handleSelectPrompt = (promptText: string) => {
    onSelectPrompt?.(promptText);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Community Prompts</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Done</Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search prompts..."
            placeholderTextColor={colors.textMuted}
            testID="search-prompts-input"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              style={styles.clearSearchButton}
              onPress={() => setSearchQuery('')}
            >
              <Text style={styles.clearSearchText}>Clear</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Category Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
          contentContainerStyle={styles.categoryScrollContent}
        >
          <TouchableOpacity
            style={[
              styles.categoryChip,
              selectedCategory === 'all' && styles.categoryChipSelected,
            ]}
            onPress={() => setSelectedCategory('all')}
          >
            <Text style={styles.categoryChipIcon}>All</Text>
            <Text
              style={[
                styles.categoryChipLabel,
                selectedCategory === 'all' && styles.categoryChipLabelSelected,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>

          {CATEGORIES.map((category) => {
            const info = CATEGORY_INFO[category];
            const isSelected = selectedCategory === category;
            return (
              <TouchableOpacity
                key={category}
                style={[styles.categoryChip, isSelected && styles.categoryChipSelected]}
                onPress={() => setSelectedCategory(category)}
                testID={`filter-category-${category}`}
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

        {/* Prompts List */}
        <ScrollView style={styles.promptsList} contentContainerStyle={styles.promptsListContent}>
          {prompts.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateIcon}>
                {searchQuery ? '🔍' : '💭'}
              </Text>
              <Text style={styles.emptyStateTitle}>
                {searchQuery ? 'No prompts found' : 'No prompts yet'}
              </Text>
              <Text style={styles.emptyStateDescription}>
                {searchQuery
                  ? 'Try a different search term'
                  : 'Be the first to contribute a reflection question!'}
              </Text>
            </View>
          ) : (
            prompts.map((prompt) => (
              <PromptCard
                key={prompt.id}
                prompt={prompt}
                isUpvoted={isPromptUpvoted(prompt.id)}
                onPress={onSelectPrompt ? () => handleSelectPrompt(prompt.promptText) : undefined}
                onUpvote={() => handleUpvote(prompt.id)}
                showCategory={selectedCategory === 'all'}
              />
            ))
          )}
        </ScrollView>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {prompts.length} prompt{prompts.length !== 1 ? 's' : ''} available
          </Text>
        </View>
      </View>
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
      paddingHorizontal: SPACING.xl,
      paddingVertical: SPACING.lg,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    title: {
      ...TYPOGRAPHY.styles.h3,
      color: colors.text,
    },
    closeButton: {
      paddingVertical: SPACING.xs,
      paddingHorizontal: SPACING.md,
    },
    closeButtonText: {
      ...TYPOGRAPHY.styles.bodyBold,
      color: COLORS.primary,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: SPACING.xl,
      paddingVertical: SPACING.md,
    },
    searchInput: {
      flex: 1,
      backgroundColor: colors.surface,
      borderRadius: RADII.md,
      paddingHorizontal: SPACING.lg,
      paddingVertical: SPACING.md,
      borderWidth: 1,
      borderColor: colors.border,
      ...TYPOGRAPHY.styles.body,
      color: colors.text,
    },
    clearSearchButton: {
      marginLeft: SPACING.md,
      paddingVertical: SPACING.sm,
    },
    clearSearchText: {
      ...TYPOGRAPHY.styles.body,
      color: COLORS.primary,
    },
    categoryScroll: {
      maxHeight: 50,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    categoryScrollContent: {
      paddingHorizontal: SPACING.xl,
      paddingVertical: SPACING.sm,
    },
    categoryChip: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: SPACING.md,
      paddingVertical: SPACING.xs,
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
    promptsList: {
      flex: 1,
    },
    promptsListContent: {
      padding: SPACING.xl,
    },
    emptyState: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: SPACING['4xl'],
    },
    emptyStateIcon: {
      fontSize: 48,
      marginBottom: SPACING.lg,
    },
    emptyStateTitle: {
      ...TYPOGRAPHY.styles.h4,
      color: colors.text,
      marginBottom: SPACING.sm,
    },
    emptyStateDescription: {
      ...TYPOGRAPHY.styles.body,
      color: colors.textSecondary,
      textAlign: 'center',
    },
    footer: {
      paddingHorizontal: SPACING.xl,
      paddingVertical: SPACING.md,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      alignItems: 'center',
    },
    footerText: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textMuted,
    },
  });

export default BrowsePromptsModal;
