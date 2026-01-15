import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { router } from 'expo-router';
import {
  COLORS,
  SPACING,
  RADII,
  TYPOGRAPHY,
  SHADOWS,
  getThemedColors,
  withAlpha,
} from '../lib/ui/theme';
import type { CommunityPromptCategory } from '../lib/community-prompts/types';
import { CATEGORY_INFO } from '../lib/community-prompts/types';
import {
  getAllCommunityPrompts,
  getPromptsByCategory,
  getFeaturedPrompts,
  getPromptsForTimeOfDay,
} from '../lib/community-prompts/service';
import { useSageStore } from '../lib/storage/store';
import { PromptCard } from '../components/community-prompts/PromptCard';
import { SubmissionModal } from '../components/community-prompts/SubmissionModal';
import { BrowsePromptsModal } from '../components/community-prompts/BrowsePromptsModal';
import { AppHeader } from '../components/navigation';

const CATEGORIES = Object.keys(CATEGORY_INFO) as CommunityPromptCategory[];

export default function CommunityPromptsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);

  const [selectedCategory, setSelectedCategory] = useState<CommunityPromptCategory | 'all' | 'featured' | 'suggested'>('featured');
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [showBrowseModal, setShowBrowseModal] = useState(false);

  const upvotedPromptIds = useSageStore((s) => s.upvotedPromptIds);
  const upvotePrompt = useSageStore((s) => s.upvotePrompt);
  const removeUpvote = useSageStore((s) => s.removeUpvote);
  const isPromptUpvoted = useSageStore((s) => s.isPromptUpvoted);

  const styles = createStyles(colors, isDark);

  const prompts = useMemo(() => {
    let result;

    switch (selectedCategory) {
      case 'featured':
        result = getFeaturedPrompts([], 10);
        break;
      case 'suggested':
        result = getPromptsForTimeOfDay();
        break;
      case 'all':
        result = getAllCommunityPrompts();
        break;
      default:
        result = getPromptsByCategory(selectedCategory);
    }

    // Sort by upvotes (including user's local upvotes)
    return result.sort((a, b) => {
      const aUpvotes = a.upvotes + (upvotedPromptIds.includes(a.id) ? 1 : 0);
      const bUpvotes = b.upvotes + (upvotedPromptIds.includes(b.id) ? 1 : 0);
      return bUpvotes - aUpvotes;
    });
  }, [selectedCategory, upvotedPromptIds]);

  const handleUpvote = (promptId: string) => {
    if (isPromptUpvoted(promptId)) {
      removeUpvote(promptId);
    } else {
      upvotePrompt(promptId);
    }
  };

  const handlePromptPress = (promptText: string) => {
    // Navigate to journal or reflection with this prompt
    router.push({
      pathname: '/ask',
      params: { prompt: promptText },
    });
  };

  const getTimeOfDayGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Morning';
    if (hour >= 12 && hour < 17) return 'Afternoon';
    if (hour >= 17 && hour < 21) return 'Evening';
    return 'Night';
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        variant="back"
        title="Community Prompts"
        showProfile={false}
        testID="community-prompts-header"
        rightElement={
          <TouchableOpacity
            onPress={() => setShowBrowseModal(true)}
            style={styles.searchButton}
            testID="search-button"
          >
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        }
      />

      {/* Category Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryScrollContent}
      >
        <TouchableOpacity
          style={[styles.categoryTab, selectedCategory === 'featured' && styles.categoryTabSelected]}
          onPress={() => setSelectedCategory('featured')}
          testID="tab-featured"
        >
          <Text style={styles.categoryTabIcon}>Top</Text>
          <Text style={[styles.categoryTabLabel, selectedCategory === 'featured' && styles.categoryTabLabelSelected]}>
            Featured
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.categoryTab, selectedCategory === 'suggested' && styles.categoryTabSelected]}
          onPress={() => setSelectedCategory('suggested')}
          testID="tab-suggested"
        >
          <Text style={styles.categoryTabIcon}>
            {getTimeOfDayGreeting() === 'Morning' ? '☀️' : getTimeOfDayGreeting() === 'Evening' || getTimeOfDayGreeting() === 'Night' ? '🌙' : '🌤️'}
          </Text>
          <Text style={[styles.categoryTabLabel, selectedCategory === 'suggested' && styles.categoryTabLabelSelected]}>
            For {getTimeOfDayGreeting()}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.categoryTab, selectedCategory === 'all' && styles.categoryTabSelected]}
          onPress={() => setSelectedCategory('all')}
          testID="tab-all"
        >
          <Text style={styles.categoryTabIcon}>All</Text>
          <Text style={[styles.categoryTabLabel, selectedCategory === 'all' && styles.categoryTabLabelSelected]}>
            All Prompts
          </Text>
        </TouchableOpacity>

        {CATEGORIES.map((category) => {
          const info = CATEGORY_INFO[category];
          const isSelected = selectedCategory === category;
          return (
            <TouchableOpacity
              key={category}
              style={[styles.categoryTab, isSelected && styles.categoryTabSelected]}
              onPress={() => setSelectedCategory(category)}
              testID={`tab-${category}`}
            >
              <Text style={styles.categoryTabIcon}>{info.icon}</Text>
              <Text style={[styles.categoryTabLabel, isSelected && styles.categoryTabLabelSelected]}>
                {info.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Prompts List */}
      <ScrollView style={styles.promptsList} contentContainerStyle={styles.promptsListContent}>
        {/* Description */}
        <View style={styles.descriptionCard}>
          <Text style={styles.descriptionIcon}>💭</Text>
          <View style={styles.descriptionContent}>
            <Text style={styles.descriptionTitle}>
              {selectedCategory === 'featured'
                ? 'Most loved prompts'
                : selectedCategory === 'suggested'
                ? `Prompts for your ${getTimeOfDayGreeting().toLowerCase()}`
                : selectedCategory === 'all'
                ? 'All community prompts'
                : CATEGORY_INFO[selectedCategory as CommunityPromptCategory].description}
            </Text>
            <Text style={styles.descriptionText}>
              Tap a prompt to start reflecting with Sage
            </Text>
          </View>
        </View>

        {prompts.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>💭</Text>
            <Text style={styles.emptyStateTitle}>No prompts yet</Text>
            <Text style={styles.emptyStateDescription}>
              Be the first to share a reflection question with the community!
            </Text>
          </View>
        ) : (
          prompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
              isUpvoted={isPromptUpvoted(prompt.id)}
              onPress={() => handlePromptPress(prompt.promptText)}
              onUpvote={() => handleUpvote(prompt.id)}
              showCategory={selectedCategory === 'all' || selectedCategory === 'featured' || selectedCategory === 'suggested'}
            />
          ))
        )}
      </ScrollView>

      {/* FAB to submit new prompt */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setShowSubmissionModal(true)}
        testID="submit-fab"
      >
        <Text style={styles.fabIcon}>+</Text>
        <Text style={styles.fabText}>Contribute</Text>
      </TouchableOpacity>

      {/* Modals */}
      <SubmissionModal
        visible={showSubmissionModal}
        onClose={() => setShowSubmissionModal(false)}
        onSubmitSuccess={() => {
          // Optionally refresh or show feedback
        }}
      />

      <BrowsePromptsModal
        visible={showBrowseModal}
        onClose={() => setShowBrowseModal(false)}
        onSelectPrompt={handlePromptPress}
      />
    </SafeAreaView>
  );
}

const createStyles = (colors: ReturnType<typeof getThemedColors>, isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    searchButton: {
      paddingVertical: SPACING.xs,
    },
    searchButtonText: {
      ...TYPOGRAPHY.styles.body,
      color: COLORS.primary,
    },
    categoryScroll: {
      maxHeight: 60,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    categoryScrollContent: {
      paddingHorizontal: SPACING.xl,
      paddingVertical: SPACING.md,
    },
    categoryTab: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: SPACING.lg,
      paddingVertical: SPACING.sm,
      borderRadius: RADII.full,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      marginRight: SPACING.sm,
    },
    categoryTabSelected: {
      backgroundColor: withAlpha(COLORS.primary, 0.15),
      borderColor: COLORS.primary,
    },
    categoryTabIcon: {
      fontSize: 14,
      marginRight: SPACING.xs,
    },
    categoryTabLabel: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textSecondary,
      fontWeight: '600',
    },
    categoryTabLabelSelected: {
      color: COLORS.primary,
    },
    promptsList: {
      flex: 1,
    },
    promptsListContent: {
      padding: SPACING.xl,
      paddingBottom: 120,
    },
    descriptionCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surfaceAlt,
      padding: SPACING.lg,
      borderRadius: RADII.md,
      marginBottom: SPACING.xl,
    },
    descriptionIcon: {
      fontSize: 28,
      marginRight: SPACING.md,
    },
    descriptionContent: {
      flex: 1,
    },
    descriptionTitle: {
      ...TYPOGRAPHY.styles.bodyBold,
      color: colors.text,
      marginBottom: SPACING.xs,
    },
    descriptionText: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textSecondary,
    },
    emptyState: {
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
    fab: {
      position: 'absolute',
      bottom: 30,
      right: 20,
      backgroundColor: COLORS.primary,
      height: 56,
      borderRadius: RADII.full,
      paddingHorizontal: SPACING.xxl,
      flexDirection: 'row',
      alignItems: 'center',
      ...SHADOWS.primary,
    },
    fabIcon: {
      fontSize: 24,
      color: COLORS.primaryText,
      fontWeight: '700',
      marginRight: SPACING.xs,
    },
    fabText: {
      color: COLORS.primaryText,
      fontWeight: '800',
      fontSize: 16,
    },
  });
