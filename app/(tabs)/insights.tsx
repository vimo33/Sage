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
import { useSageStore, type SavedInsight } from '../../lib/storage/store';
import { COLORS, SPACING, RADII, TYPOGRAPHY, SHADOWS, withAlpha, getThemedColors } from '../../lib/ui/theme';
import { BiometricGate } from '../../components/auth/BiometricGate';
import { InsightDetailModal } from '../../components/insights/InsightDetailModal';
import { TagChip } from '../../components/insights/TagChip';
import { MoodTrendChart } from '../../components/insights/MoodTrendChart';

export default function InsightsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);

  const savedInsights = useSageStore((s) => s.savedInsights);
  const getAllTags = useSageStore((s) => s.getAllTags);
  const searchInsights = useSageStore((s) => s.searchInsights);

  const [selectedInsight, setSelectedInsight] = useState<SavedInsight | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = getAllTags();

  const styles = createStyles(colors, isDark);

  // Filter insights based on search query and selected tags
  const filteredInsights = useMemo(() => {
    if (!searchQuery && selectedTags.length === 0) {
      return savedInsights;
    }
    return searchInsights(searchQuery, selectedTags);
  }, [savedInsights, searchQuery, selectedTags, searchInsights]);

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
  }, []);

  const hasActiveFilters = searchQuery.length > 0 || selectedTags.length > 0;

  const renderInsight = (insight: SavedInsight) => (
    <TouchableOpacity
      style={styles.insightCard}
      key={insight.id}
      onPress={() => handleInsightPress(insight)}
      testID={`insight-card-${insight.id}`}
      activeOpacity={0.9}
    >
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

  return (
    <BiometricGate>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Insights</Text>
          <Text style={styles.subtitle}>Treasures of wisdom</Text>
        </View>

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

          {savedInsights.length > 0 && (
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
                    {filteredInsights.length === 0
                      ? 'No insights match your filters'
                      : filteredInsights.length === 1
                      ? '1 insight found'
                      : `${filteredInsights.length} insights found`}
                  </Text>
                </View>
              )}
            </>
          )}

          {savedInsights.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>✨</Text>
              <Text style={styles.emptyTitle}>Your collection is empty</Text>
              <Text style={styles.emptySubtitle}>
                Save insights from your conversations with Sage to see them here.
              </Text>
            </View>
          ) : filteredInsights.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>🔍</Text>
              <Text style={styles.emptyTitle}>No matching insights</Text>
              <Text style={styles.emptySubtitle}>
                Try adjusting your search or removing some filters.
              </Text>
            </View>
          ) : (
            <View style={styles.insightsList}>
              {filteredInsights.map(renderInsight)}
            </View>
          )}
        </ScrollView>

        <InsightDetailModal
          visible={isModalVisible}
          insight={selectedInsight}
          onClose={handleModalClose}
        />
      </SafeAreaView>
    </BiometricGate>
  );
}

const createStyles = (colors: ReturnType<typeof getThemedColors>, isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.lg,
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
    paddingBottom: 40,
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
});
