import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSageStore } from '../lib/storage/store';
import { COLORS, SPACING, RADII, TYPOGRAPHY, SHADOWS, getThemedColors, withAlpha } from '../lib/ui/theme';
import { BiometricGate } from '../components/auth/BiometricGate';
import {
  performUnifiedSearch,
  getUniqueSources,
  getAllUniqueTags,
  DEFAULT_FILTERS,
  type SearchFilters,
  type DateRange,
  type SearchableContentType,
  type UnifiedSearchResult,
} from '../lib/search';
import { DateRangeFilter, SourceFilter, SearchResultCard } from '../components/search';
import { FilterTabs, TagFilterChips, type FilterTabType } from '../components/filters';

// Map FilterTabType to SearchableContentType
function mapFilterTabToContentType(tab: FilterTabType): SearchableContentType[] {
  switch (tab) {
    case 'journal':
      return ['journal'];
    case 'insights':
      return ['insight'];
    case 'all':
    default:
      return ['all'];
  }
}

// Extended filter tabs for search
const SEARCH_FILTER_TABS: { key: FilterTabType | 'conversations'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'conversations', label: 'Conversations' },
  { key: 'journal', label: 'Journal' },
  { key: 'insights', label: 'Insights' },
];

export default function GlobalSearchScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);
  const styles = createStyles(colors, isDark);

  // Store data
  const searchHistory = useSageStore((s) => s.searchHistory);
  const journalEntries = useSageStore((s) => s.journalEntries);
  const savedInsights = useSageStore((s) => s.savedInsights);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<FilterTabType | 'conversations'>('all');
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Get available tags and sources
  const availableTags = useMemo(
    () => getAllUniqueTags(journalEntries, savedInsights),
    [journalEntries, savedInsights]
  );

  const availableSources = useMemo(
    () => getUniqueSources(savedInsights),
    [savedInsights]
  );

  // Build search filters
  const searchFilters = useMemo((): SearchFilters => {
    let contentTypes: SearchableContentType[] = [];
    switch (activeTab) {
      case 'conversations':
        contentTypes = ['conversation'];
        break;
      case 'journal':
        contentTypes = ['journal'];
        break;
      case 'insights':
        contentTypes = ['insight'];
        break;
      default:
        contentTypes = ['all'];
    }

    return {
      contentTypes,
      dateRange: selectedDateRange,
      tags: selectedTags,
      sources: selectedSources,
    };
  }, [activeTab, selectedDateRange, selectedTags, selectedSources]);

  // Perform search
  const searchResults = useMemo(() => {
    // Only search if there's a query or filters are applied
    const hasFilters =
      selectedTags.length > 0 ||
      selectedSources.length > 0 ||
      selectedDateRange.startDate !== null ||
      selectedDateRange.endDate !== null;

    if (!searchQuery.trim() && !hasFilters) {
      return null;
    }

    return performUnifiedSearch(
      searchQuery,
      searchHistory,
      journalEntries,
      savedInsights,
      searchFilters
    );
  }, [searchQuery, searchHistory, journalEntries, savedInsights, searchFilters]);

  // Handlers
  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleTagToggle = useCallback((tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }, []);

  const handleSourceToggle = useCallback((source: string) => {
    setSelectedSources((prev) =>
      prev.includes(source) ? prev.filter((s) => s !== source) : [...prev, source]
    );
  }, []);

  const handleClearSources = useCallback(() => {
    setSelectedSources([]);
  }, []);

  const handleClearAllFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedTags([]);
    setSelectedSources([]);
    setSelectedDateRange({ startDate: null, endDate: null });
    setActiveTab('all');
  }, []);

  const handleResultPress = useCallback(
    (result: UnifiedSearchResult) => {
      // Navigate to appropriate detail view based on result type
      switch (result.type) {
        case 'conversation':
          // Could navigate to chat history view
          // For now, just show the conversation in insights page
          router.push('/(tabs)/insights');
          break;
        case 'journal':
          router.push('/(tabs)/journal');
          break;
        case 'insight':
          router.push('/(tabs)/insights');
          break;
      }
    },
    [router]
  );

  const hasActiveFilters =
    selectedTags.length > 0 ||
    selectedSources.length > 0 ||
    selectedDateRange.startDate !== null ||
    selectedDateRange.endDate !== null ||
    activeTab !== 'all';

  const renderEmptyState = () => {
    if (!searchQuery.trim() && !hasActiveFilters) {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>🔍</Text>
          <Text style={styles.emptyTitle}>Search your wisdom</Text>
          <Text style={styles.emptySubtitle}>
            Find past conversations, journal entries, and saved insights by
            keywords, date, tags, or source.
          </Text>
        </View>
      );
    }

    if (searchResults && searchResults.results.length === 0) {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>📭</Text>
          <Text style={styles.emptyTitle}>No results found</Text>
          <Text style={styles.emptySubtitle}>
            Try adjusting your search terms or removing some filters.
          </Text>
          {hasActiveFilters && (
            <TouchableOpacity
              style={styles.clearFiltersButton}
              onPress={handleClearAllFilters}
              testID="global-search-clear-filters"
            >
              <Text style={styles.clearFiltersText}>Clear all filters</Text>
            </TouchableOpacity>
          )}
        </View>
      );
    }

    return null;
  };

  return (
    <BiometricGate>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoid}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBack}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              testID="global-search-back"
            >
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <View style={styles.searchInputContainer}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                style={styles.searchInput}
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search conversations, journal, insights..."
                placeholderTextColor={colors.textMuted}
                autoFocus
                returnKeyType="search"
                testID="global-search-input"
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity
                  onPress={() => setSearchQuery('')}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  testID="global-search-clear"
                >
                  <Text style={styles.clearIcon}>×</Text>
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity
              style={[styles.filterButton, showFilters && styles.filterButtonActive]}
              onPress={() => setShowFilters(!showFilters)}
              testID="global-search-filter-toggle"
            >
              <Text
                style={[
                  styles.filterButtonText,
                  showFilters && styles.filterButtonTextActive,
                ]}
              >
                ⚙️
              </Text>
              {hasActiveFilters && <View style={styles.filterBadge} />}
            </TouchableOpacity>
          </View>

          {/* Content Type Tabs */}
          <View style={styles.tabsContainer}>
            {SEARCH_FILTER_TABS.map((tab) => {
              const isSelected = activeTab === tab.key;
              return (
                <TouchableOpacity
                  key={tab.key}
                  style={[styles.tab, isSelected && styles.tabSelected]}
                  onPress={() => setActiveTab(tab.key as FilterTabType | 'conversations')}
                  testID={`global-search-tab-${tab.key}`}
                >
                  <Text style={[styles.tabText, isSelected && styles.tabTextSelected]}>
                    {tab.label}
                  </Text>
                  {isSelected && <View style={styles.tabUnderline} />}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Filters Panel */}
          {showFilters && (
            <View style={styles.filtersPanel}>
              <DateRangeFilter
                selectedRange={selectedDateRange}
                onRangeSelect={setSelectedDateRange}
                testID="global-search-date-filter"
              />

              {activeTab === 'all' || activeTab === 'insights' ? (
                <SourceFilter
                  availableSources={availableSources}
                  selectedSources={selectedSources}
                  onSourceToggle={handleSourceToggle}
                  onClearSources={handleClearSources}
                  testID="global-search-source-filter"
                />
              ) : null}

              {availableTags.length > 0 && (activeTab === 'all' || activeTab === 'journal' || activeTab === 'insights') && (
                <View style={styles.tagFilterSection}>
                  <View style={styles.tagFilterHeader}>
                    <Text style={styles.filterLabel}>TAGS</Text>
                    {selectedTags.length > 0 && (
                      <TouchableOpacity
                        onPress={() => setSelectedTags([])}
                        testID="global-search-clear-tags"
                      >
                        <Text style={styles.clearTagsText}>Clear</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.tagScrollContent}
                  >
                    {availableTags.map((tag) => {
                      const isSelected = selectedTags.includes(tag);
                      return (
                        <TouchableOpacity
                          key={tag}
                          style={[styles.tagChip, isSelected && styles.tagChipSelected]}
                          onPress={() => handleTagToggle(tag)}
                          testID={`global-search-tag-${tag}`}
                        >
                          <Text
                            style={[
                              styles.tagChipText,
                              isSelected && styles.tagChipTextSelected,
                            ]}
                          >
                            #{tag}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                </View>
              )}
            </View>
          )}

          {/* Results Summary */}
          {searchResults && searchResults.results.length > 0 && (
            <View style={styles.resultsSummary}>
              <Text style={styles.resultsSummaryText}>
                {searchResults.summary.totalResults}{' '}
                {searchResults.summary.totalResults === 1 ? 'result' : 'results'}
                {searchQuery.trim() && (
                  <Text style={styles.resultsSummaryQuery}> for "{searchQuery}"</Text>
                )}
              </Text>
              <Text style={styles.resultsSummaryBreakdown}>
                {searchResults.summary.conversationCount > 0 &&
                  `${searchResults.summary.conversationCount} conversations`}
                {searchResults.summary.conversationCount > 0 &&
                  (searchResults.summary.journalCount > 0 ||
                    searchResults.summary.insightCount > 0) &&
                  ' · '}
                {searchResults.summary.journalCount > 0 &&
                  `${searchResults.summary.journalCount} journal entries`}
                {searchResults.summary.journalCount > 0 &&
                  searchResults.summary.insightCount > 0 &&
                  ' · '}
                {searchResults.summary.insightCount > 0 &&
                  `${searchResults.summary.insightCount} insights`}
              </Text>
            </View>
          )}

          {/* Results List */}
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            {renderEmptyState()}

            {searchResults?.results.map((result) => (
              <SearchResultCard
                key={`${result.type}-${result.id}`}
                result={result}
                onPress={() => handleResultPress(result)}
                testID={`search-result-${result.type}-${result.id}`}
              />
            ))}

            {/* Bottom padding */}
            <View style={{ height: 40 }} />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </BiometricGate>
  );
}

const createStyles = (colors: ReturnType<typeof getThemedColors>, isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    keyboardAvoid: {
      flex: 1,
    },
    // Header
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: SPACING.md,
      paddingVertical: SPACING.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    backButton: {
      padding: SPACING.sm,
      marginRight: SPACING.sm,
    },
    backIcon: {
      fontSize: 24,
      color: colors.text,
    },
    searchInputContainer: {
      flex: 1,
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
    filterButton: {
      marginLeft: SPACING.sm,
      padding: SPACING.sm,
      borderRadius: RADII.md,
      position: 'relative',
    },
    filterButtonActive: {
      backgroundColor: withAlpha(COLORS.primary, 0.15),
    },
    filterButtonText: {
      fontSize: 20,
    },
    filterButtonTextActive: {
      opacity: 1,
    },
    filterBadge: {
      position: 'absolute',
      top: 4,
      right: 4,
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: COLORS.primary,
    },
    // Tabs
    tabsContainer: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    tab: {
      paddingHorizontal: SPACING.lg,
      paddingVertical: SPACING.md,
      position: 'relative',
    },
    tabSelected: {},
    tabText: {
      fontSize: TYPOGRAPHY.fontSize.sm,
      fontWeight: TYPOGRAPHY.fontWeight.medium,
      color: colors.textSecondary,
    },
    tabTextSelected: {
      color: COLORS.primary,
      fontWeight: TYPOGRAPHY.fontWeight.semibold,
    },
    tabUnderline: {
      position: 'absolute',
      bottom: 0,
      left: SPACING.lg,
      right: SPACING.lg,
      height: 2,
      backgroundColor: COLORS.primary,
      borderRadius: 1,
    },
    // Filters
    filtersPanel: {
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      paddingBottom: SPACING.sm,
    },
    filterLabel: {
      ...TYPOGRAPHY.styles.label,
      color: colors.textMuted,
    },
    tagFilterSection: {
      paddingVertical: SPACING.sm,
    },
    tagFilterHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: SPACING.lg,
      marginBottom: SPACING.sm,
    },
    clearTagsText: {
      fontSize: TYPOGRAPHY.fontSize.sm,
      color: COLORS.primary,
      fontWeight: TYPOGRAPHY.fontWeight.medium,
    },
    tagScrollContent: {
      paddingHorizontal: SPACING.lg,
      gap: SPACING.sm,
    },
    tagChip: {
      paddingHorizontal: SPACING.md,
      paddingVertical: SPACING.xs + 2,
      borderRadius: RADII.full,
      backgroundColor: withAlpha(colors.text, 0.08),
      borderWidth: 1,
      borderColor: 'transparent',
    },
    tagChipSelected: {
      backgroundColor: withAlpha(COLORS.primary, 0.15),
      borderColor: COLORS.primary,
    },
    tagChipText: {
      fontSize: TYPOGRAPHY.fontSize.sm,
      fontWeight: TYPOGRAPHY.fontWeight.medium,
      color: colors.textSecondary,
    },
    tagChipTextSelected: {
      color: COLORS.primary,
      fontWeight: TYPOGRAPHY.fontWeight.semibold,
    },
    // Results Summary
    resultsSummary: {
      paddingHorizontal: SPACING.lg,
      paddingVertical: SPACING.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    resultsSummaryText: {
      ...TYPOGRAPHY.styles.bodyBold,
      color: colors.text,
    },
    resultsSummaryQuery: {
      fontStyle: 'italic',
      fontWeight: TYPOGRAPHY.fontWeight.normal,
    },
    resultsSummaryBreakdown: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textMuted,
      marginTop: 2,
    },
    // Results
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingTop: SPACING.md,
    },
    // Empty State
    emptyState: {
      alignItems: 'center',
      paddingVertical: 60,
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
    clearFiltersButton: {
      marginTop: SPACING.lg,
      paddingHorizontal: SPACING.xl,
      paddingVertical: SPACING.md,
      backgroundColor: withAlpha(COLORS.primary, 0.15),
      borderRadius: RADII.full,
    },
    clearFiltersText: {
      fontSize: TYPOGRAPHY.fontSize.sm,
      color: COLORS.primary,
      fontWeight: TYPOGRAPHY.fontWeight.semibold,
    },
  });
