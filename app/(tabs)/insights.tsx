import { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  useColorScheme,
} from 'react-native';
import { useRouter, Href } from 'expo-router';
import { useSageStore, type SavedInsight, type JournalEntry } from '../../lib/storage/store';
import { COLORS, SPACING, RADII, TYPOGRAPHY, SHADOWS, withAlpha, getThemedColors } from '../../lib/ui/theme';
import { BiometricGate } from '../../components/auth/BiometricGate';
import { InsightDetailModal } from '../../components/insights/InsightDetailModal';
import { TagChip } from '../../components/insights/TagChip';
import { MoodTrendChart } from '../../components/insights/MoodTrendChart';
import { AppHeader } from '../../components/navigation';
import { AskSageFAB } from '../../components/home';
import { FilterTabs, TagFilterChips, type FilterTabType } from '../../components/filters';

// Combined content item type for unified display
type ContentItem =
  | { type: 'insight'; data: SavedInsight; createdAt: number }
  | { type: 'journal'; data: JournalEntry; createdAt: number };

export default function InsightsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);

  const savedInsights = useSageStore((s) => s.savedInsights);
  const journalEntries = useSageStore((s) => s.journalEntries);
  const getAllTags = useSageStore((s) => s.getAllTags);
  const searchInsights = useSageStore((s) => s.searchInsights);

  const [selectedInsight, setSelectedInsight] = useState<SavedInsight | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // New filter state
  const [activeFilterTab, setActiveFilterTab] = useState<FilterTabType>('all');
  const [selectedTagFilter, setSelectedTagFilter] = useState<string | null>(null);

  const allTags = getAllTags();

  // Get tags from journal entries as well
  const journalTags = useMemo(() => {
    const tags = new Set<string>();
    journalEntries.forEach((entry) => {
      entry.tags?.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags);
  }, [journalEntries]);

  // Combined tags from both insights and journal entries
  const combinedTags = useMemo(() => {
    const allTagsSet = new Set([...allTags, ...journalTags]);
    return Array.from(allTagsSet).sort();
  }, [allTags, journalTags]);

  const styles = createStyles(colors, isDark);

  // Filter insights based on search query and selected tags
  const filteredInsights = useMemo(() => {
    let results = savedInsights;

    // Apply search and tag filters
    if (searchQuery || selectedTags.length > 0) {
      results = searchInsights(searchQuery, selectedTags);
    }

    // Apply tag filter from TagFilterChips
    if (selectedTagFilter) {
      results = results.filter((insight) =>
        insight.tags?.includes(selectedTagFilter)
      );
    }

    return results;
  }, [savedInsights, searchQuery, selectedTags, searchInsights, selectedTagFilter]);

  // Filter journal entries based on tag filter
  const filteredJournalEntries = useMemo(() => {
    if (!selectedTagFilter) {
      return journalEntries;
    }
    return journalEntries.filter((entry) =>
      entry.tags?.includes(selectedTagFilter)
    );
  }, [journalEntries, selectedTagFilter]);

  // Combined and filtered content based on active tab
  const filteredContent = useMemo((): ContentItem[] => {
    const insightItems: ContentItem[] = filteredInsights.map((insight) => ({
      type: 'insight' as const,
      data: insight,
      createdAt: insight.createdAt,
    }));

    const journalItems: ContentItem[] = filteredJournalEntries.map((entry) => ({
      type: 'journal' as const,
      data: entry,
      createdAt: entry.createdAt,
    }));

    let items: ContentItem[] = [];

    switch (activeFilterTab) {
      case 'all':
        items = [...insightItems, ...journalItems];
        break;
      case 'journal':
        items = journalItems;
        break;
      case 'insights':
        items = insightItems;
        break;
    }

    // Sort by creation date (newest first)
    return items.sort((a, b) => b.createdAt - a.createdAt);
  }, [filteredInsights, filteredJournalEntries, activeFilterTab]);

  const handleInsightPress = useCallback((insight: SavedInsight) => {
    setSelectedInsight(insight);
    setIsModalVisible(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalVisible(false);
    setSelectedInsight(null);
  }, []);

  const handleTagPress = useCallback((tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedTags([]);
    setSelectedTagFilter(null);
    setActiveFilterTab('all');
  }, []);

  const hasActiveFilters = searchQuery.length > 0 || selectedTags.length > 0 || selectedTagFilter !== null || activeFilterTab !== 'all';

  const renderInsight = (insight: SavedInsight) => (
    <TouchableOpacity
      style={styles.insightCard}
      key={insight.id}
      onPress={() => handleInsightPress(insight)}
      testID={`insight-card-${insight.id}`}
      activeOpacity={0.9}
    >
      <View style={styles.contentTypeBadge}>
        <Text style={styles.contentTypeBadgeText}>INSIGHT</Text>
      </View>
      <View style={styles.quoteIconContainer}>
        <Text style={styles.quoteIcon}>"</Text>
      </View>
      <Text style={styles.verseContent}>{insight.verseContent}</Text>
      <View style={styles.insightFooter}>
        <Text style={styles.sourceRef}>— {insight.sourceRef}</Text>
        <Text style={styles.insightDate}>
          {new Date(insight.createdAt).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric'
          })}
        </Text>
      </View>
      {insight.tags && insight.tags.length > 0 && (
        <View style={styles.tagsRow}>
          {insight.tags.map((tag) => (
            <TagChip
              key={tag}
              tag={tag}
              size="small"
              selected={selectedTags.includes(tag)}
              onPress={() => handleTagPress(tag)}
            />
          ))}
        </View>
      )}
      {insight.userNote && (
        <View style={styles.noteContainer}>
          <Text style={styles.noteLabel}>YOUR NOTE</Text>
          <Text style={styles.noteText}>{insight.userNote}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderJournalEntry = (entry: JournalEntry) => (
    <View
      style={styles.journalCard}
      key={entry.id}
      testID={`journal-card-${entry.id}`}
    >
      <View style={[styles.contentTypeBadge, styles.journalBadge]}>
        <Text style={[styles.contentTypeBadgeText, styles.journalBadgeText]}>JOURNAL</Text>
      </View>
      <View style={styles.journalHeader}>
        <Text style={styles.journalDate}>
          {new Date(entry.createdAt).toLocaleDateString(undefined, {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
          })}
        </Text>
        {entry.mood && (
          <View style={styles.moodBadge}>
            <Text style={styles.moodText}>{entry.mood}</Text>
          </View>
        )}
      </View>
      <Text style={styles.journalContent} numberOfLines={3}>
        {entry.content}
      </Text>
      {entry.tags && entry.tags.length > 0 && (
        <View style={styles.tagsRow}>
          {entry.tags.map((tag) => (
            <TagChip
              key={tag}
              tag={tag}
              size="small"
              selected={selectedTags.includes(tag)}
              onPress={() => handleTagPress(tag)}
            />
          ))}
        </View>
      )}
    </View>
  );

  const renderContentItem = (item: ContentItem) => {
    if (item.type === 'insight') {
      return renderInsight(item.data as SavedInsight);
    }
    return renderJournalEntry(item.data as JournalEntry);
  };

  return (
    <BiometricGate>
      <SafeAreaView style={styles.container}>
        <AppHeader
          variant="main"
          showProfile={true}
          showSearch={true}
          onSearchPress={() => router.push('/global-search' as Href)}
          showBorder={false}
          testID="insights-header"
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Insights</Text>
          <Text style={styles.subtitle}>Treasures of wisdom</Text>
        </View>

        {/* Filter Tabs */}
        <FilterTabs
          selectedTab={activeFilterTab}
          onTabChange={setActiveFilterTab}
          testID="filter-tabs"
        />

        {/* Tag Filter Chips */}
        <TagFilterChips
          availableTags={combinedTags}
          selectedTag={selectedTagFilter}
          onTagSelect={setSelectedTagFilter}
          testID="tag-filter-chips"
        />

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{savedInsights.length}</Text>
              <Text style={styles.statLabel}>SAVED</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{allTags.length}</Text>
              <Text style={styles.statLabel}>TAGS</Text>
            </View>
          </View>

          {/* Mood Trend Chart */}
          <MoodTrendChart testID="mood-trend-chart" />

          {(savedInsights.length > 0 || journalEntries.length > 0) && (
            <>
              {/* Search Bar */}
              <View style={styles.searchContainer}>
                <View style={styles.searchInputWrapper}>
                  <Text style={styles.searchIcon}>🔍</Text>
                  <TextInput
                    style={styles.searchInput}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder="Search insights..."
                    placeholderTextColor={colors.textMuted}
                    testID="insights-search-input"
                  />
                  {searchQuery.length > 0 && (
                    <TouchableOpacity
                      onPress={() => setSearchQuery('')}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                      testID="insights-search-clear"
                    >
                      <Text style={styles.clearIcon}>×</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              {/* Tag Filters */}
              {allTags.length > 0 && (
                <View style={styles.tagFiltersSection}>
                  <View style={styles.tagFiltersHeader}>
                    <Text style={styles.tagFiltersLabel}>FILTER BY TAG</Text>
                    {hasActiveFilters && (
                      <TouchableOpacity
                        onPress={handleClearFilters}
                        testID="insights-clear-filters"
                      >
                        <Text style={styles.clearFiltersText}>Clear all</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.tagFiltersScroll}
                  >
                    {allTags.map((tag) => (
                      <TagChip
                        key={tag}
                        tag={tag}
                        selected={selectedTags.includes(tag)}
                        onPress={() => handleTagPress(tag)}
                        testID={`tag-filter-${tag}`}
                      />
                    ))}
                  </ScrollView>
                </View>
              )}

              {/* Results Info */}
              {hasActiveFilters && (
                <View style={styles.resultsInfo}>
                  <Text style={styles.resultsText}>
                    {filteredContent.length === 0
                      ? 'No items match your filters'
                      : filteredContent.length === 1
                      ? '1 item found'
                      : `${filteredContent.length} items found`}
                  </Text>
                </View>
              )}
            </>
          )}

          {savedInsights.length === 0 && journalEntries.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>✨</Text>
              <Text style={styles.emptyTitle}>Your collection is empty</Text>
              <Text style={styles.emptySubtitle}>
                Save insights from your conversations with Sage or add journal entries to see them here.
              </Text>
            </View>
          ) : filteredContent.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>🔍</Text>
              <Text style={styles.emptyTitle}>No matching items</Text>
              <Text style={styles.emptySubtitle}>
                Try adjusting your search or removing some filters.
              </Text>
            </View>
          ) : (
            <View style={styles.insightsList}>
              {filteredContent.map(renderContentItem)}
            </View>
          )}
        </ScrollView>

        <InsightDetailModal
          visible={isModalVisible}
          insight={selectedInsight}
          onClose={handleModalClose}
        />

        <AskSageFAB testID="insights-ask-sage-fab" />
      </SafeAreaView>
    </BiometricGate>
  );
}

const createStyles = (colors: ReturnType<typeof getThemedColors>, isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  titleContainer: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.md,
  },
  title: {
    ...TYPOGRAPHY.styles.h1,
    color: colors.text,
  },
  subtitle: {
    ...TYPOGRAPHY.styles.body,
    color: colors.textSecondary,
    marginTop: 2,
  },
  scrollContainer: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: 100, // Extra padding for FAB
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: RADII.md,
    padding: SPACING.lg,
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: '60%',
    backgroundColor: colors.border,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.primary,
  },
  statLabel: {
    ...TYPOGRAPHY.styles.label,
    color: colors.textMuted,
    marginTop: 2,
  },
  searchContainer: {
    marginBottom: SPACING.lg,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: RADII.md,
    paddingHorizontal: SPACING.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    paddingVertical: SPACING.md,
    color: colors.text,
    fontSize: 15,
  },
  clearIcon: {
    fontSize: 20,
    color: colors.textMuted,
    paddingHorizontal: SPACING.sm,
  },
  tagFiltersSection: {
    marginBottom: SPACING.lg,
  },
  tagFiltersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  tagFiltersLabel: {
    ...TYPOGRAPHY.styles.label,
    color: colors.textMuted,
  },
  clearFiltersText: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '500',
  },
  tagFiltersScroll: {
    gap: SPACING.sm,
  },
  resultsInfo: {
    marginBottom: SPACING.lg,
  },
  resultsText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  insightsList: {
    gap: SPACING.xl,
  },
  insightCard: {
    backgroundColor: colors.surface,
    borderRadius: RADII.lg,
    padding: SPACING.xl,
    borderWidth: 1,
    borderColor: colors.border,
    ...SHADOWS.sm,
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
  },
  insightFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: SPACING.lg,
  },
  sourceRef: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textMuted,
    flex: 1,
  },
  insightDate: {
    fontSize: 11,
    color: colors.textMuted,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
    marginTop: SPACING.md,
  },
  noteContainer: {
    marginTop: SPACING.lg,
    paddingTop: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: withAlpha(colors.border, 0.5),
  },
  noteLabel: {
    ...TYPOGRAPHY.styles.label,
    color: COLORS.primary,
    marginBottom: 4,
  },
  noteText: {
    ...TYPOGRAPHY.styles.body,
    color: colors.textSecondary,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 60,
    paddingHorizontal: 40,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: SPACING.lg,
    opacity: 0.5,
  },
  emptyTitle: {
    ...TYPOGRAPHY.styles.h3,
    color: colors.text,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  emptySubtitle: {
    ...TYPOGRAPHY.styles.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  // Content type badge styles
  contentTypeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADII.sm,
    backgroundColor: withAlpha(COLORS.primary, 0.15),
    marginBottom: SPACING.sm,
  },
  contentTypeBadgeText: {
    ...TYPOGRAPHY.styles.label,
    color: COLORS.primary,
    fontSize: 10,
  },
  journalBadge: {
    backgroundColor: withAlpha(COLORS.info, 0.15),
  },
  journalBadgeText: {
    color: COLORS.info,
  },
  // Journal card styles
  journalCard: {
    backgroundColor: colors.surface,
    borderRadius: RADII.lg,
    padding: SPACING.xl,
    borderWidth: 1,
    borderColor: colors.border,
    ...SHADOWS.sm,
  },
  journalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  journalDate: {
    ...TYPOGRAPHY.styles.bodyBold,
    color: colors.text,
  },
  journalContent: {
    ...TYPOGRAPHY.styles.body,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  moodBadge: {
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADII.sm,
  },
  moodText: {
    fontSize: 11,
    color: colors.textMuted,
  },
});
