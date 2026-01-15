import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  useColorScheme,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  getAvailableBooks,
  getThemeDistribution,
  getChunksByBook,
  getChunksByThemeWithPagination,
  getChunkCount,
  type WisdomChunk,
  type ThemeTag,
  type BrowseChunksResult,
} from '../lib/retrieval/search';
import { useSageStore } from '../lib/storage/store';
import { COLORS, SPACING, RADII, TYPOGRAPHY, SHADOWS, withAlpha, getThemedColors } from '../lib/ui/theme';
import { ChunkDetailModal } from '../components/wisdom/ChunkDetailModal';
import { AppHeader } from '../components/navigation';

type BrowseMode = 'source' | 'theme';

interface SourceItem {
  book: string;
  count: number;
}

interface ThemeItem {
  theme: ThemeTag;
  count: number;
}

const THEME_DISPLAY_NAMES: Record<ThemeTag, string> = {
  action: 'Action',
  detachment: 'Detachment',
  suffering: 'Suffering',
  purpose: 'Purpose',
  discipline: 'Discipline',
  compassion: 'Compassion',
  self: 'Self',
  impermanence: 'Impermanence',
  devotion: 'Devotion',
  knowledge: 'Knowledge',
  meditation: 'Meditation',
  desire: 'Desire',
  peace: 'Peace',
  duty: 'Duty',
  truth: 'Truth',
};

const PAGE_SIZE = 20;

export default function WisdomBrowserScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);

  const [browseMode, setBrowseMode] = useState<BrowseMode>('source');
  const [sources, setSources] = useState<SourceItem[]>([]);
  const [themes, setThemes] = useState<ThemeItem[]>([]);
  const [totalChunks, setTotalChunks] = useState(0);
  const [loading, setLoading] = useState(true);

  // Selected item for expansion
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<ThemeTag | null>(null);

  // Chunks list state
  const [chunks, setChunks] = useState<WisdomChunk[]>([]);
  const [chunksLoading, setChunksLoading] = useState(false);
  const [hasMoreChunks, setHasMoreChunks] = useState(false);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [chunksTotal, setChunksTotal] = useState(0);

  // Modal state
  const [selectedChunk, setSelectedChunk] = useState<WisdomChunk | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const styles = createStyles(colors, isDark);

  // Load initial data
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [booksData, themesData, total] = await Promise.all([
          getAvailableBooks(),
          getThemeDistribution(),
          getChunkCount(),
        ]);
        setSources(booksData);
        setThemes(themesData);
        setTotalChunks(total);
      } catch (error) {
        console.error('[WisdomBrowser] Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Load chunks when selection changes
  useEffect(() => {
    async function loadChunks() {
      if (browseMode === 'source' && selectedSource) {
        setChunksLoading(true);
        setChunks([]);
        setCurrentOffset(0);
        try {
          const result = await getChunksByBook(selectedSource, { limit: PAGE_SIZE, offset: 0 });
          setChunks(result.chunks);
          setHasMoreChunks(result.hasMore);
          setChunksTotal(result.totalCount);
        } catch (error) {
          console.error('[WisdomBrowser] Failed to load chunks:', error);
        } finally {
          setChunksLoading(false);
        }
      } else if (browseMode === 'theme' && selectedTheme) {
        setChunksLoading(true);
        setChunks([]);
        setCurrentOffset(0);
        try {
          const result = await getChunksByThemeWithPagination(selectedTheme, { limit: PAGE_SIZE, offset: 0 });
          setChunks(result.chunks);
          setHasMoreChunks(result.hasMore);
          setChunksTotal(result.totalCount);
        } catch (error) {
          console.error('[WisdomBrowser] Failed to load chunks:', error);
        } finally {
          setChunksLoading(false);
        }
      }
    }
    loadChunks();
  }, [selectedSource, selectedTheme, browseMode]);

  const handleLoadMore = useCallback(async () => {
    if (chunksLoading || !hasMoreChunks) return;

    const newOffset = currentOffset + PAGE_SIZE;
    setChunksLoading(true);

    try {
      let result: BrowseChunksResult;
      if (browseMode === 'source' && selectedSource) {
        result = await getChunksByBook(selectedSource, { limit: PAGE_SIZE, offset: newOffset });
      } else if (browseMode === 'theme' && selectedTheme) {
        result = await getChunksByThemeWithPagination(selectedTheme, { limit: PAGE_SIZE, offset: newOffset });
      } else {
        return;
      }
      setChunks((prev) => [...prev, ...result.chunks]);
      setHasMoreChunks(result.hasMore);
      setCurrentOffset(newOffset);
    } catch (error) {
      console.error('[WisdomBrowser] Failed to load more chunks:', error);
    } finally {
      setChunksLoading(false);
    }
  }, [chunksLoading, hasMoreChunks, currentOffset, browseMode, selectedSource, selectedTheme]);

  const handleSourcePress = useCallback((book: string) => {
    setSelectedSource((prev) => (prev === book ? null : book));
    setSelectedTheme(null);
  }, []);

  const handleThemePress = useCallback((theme: ThemeTag) => {
    setSelectedTheme((prev) => (prev === theme ? null : theme));
    setSelectedSource(null);
  }, []);

  const handleChunkPress = useCallback((chunk: WisdomChunk) => {
    setSelectedChunk(chunk);
    setIsModalVisible(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalVisible(false);
    setSelectedChunk(null);
  }, []);

  const handleModeChange = useCallback((mode: BrowseMode) => {
    setBrowseMode(mode);
    setSelectedSource(null);
    setSelectedTheme(null);
    setChunks([]);
  }, []);

  const renderChunkItem = useCallback(
    ({ item }: { item: WisdomChunk }) => (
      <TouchableOpacity
        style={styles.chunkCard}
        onPress={() => handleChunkPress(item)}
        activeOpacity={0.8}
        testID={`chunk-card-${item.id}`}
      >
        <Text style={styles.chunkContent} numberOfLines={3}>
          {item.content}
        </Text>
        <View style={styles.chunkMeta}>
          <Text style={styles.chunkSource}>{item.sourceRef}</Text>
          <View style={styles.chunkTags}>
            <View style={styles.themeTag}>
              <Text style={styles.themeTagText}>{THEME_DISPLAY_NAMES[item.theme]}</Text>
            </View>
            <View style={styles.toneTag}>
              <Text style={styles.toneTagText}>{item.tone}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    ),
    [styles, handleChunkPress]
  );

  const renderSourceItem = useCallback(
    (item: SourceItem) => {
      const isSelected = selectedSource === item.book;
      return (
        <TouchableOpacity
          key={item.book}
          style={[styles.categoryCard, isSelected && styles.categoryCardSelected]}
          onPress={() => handleSourcePress(item.book)}
          activeOpacity={0.8}
          testID={`source-card-${item.book.replace(/\s+/g, '-')}`}
        >
          <View style={styles.categoryHeader}>
            <Text style={[styles.categoryTitle, isSelected && styles.categoryTitleSelected]}>
              {item.book}
            </Text>
            <Text style={[styles.categoryCount, isSelected && styles.categoryCountSelected]}>
              {item.count.toLocaleString()} passages
            </Text>
          </View>
          <Text style={styles.expandIndicator}>{isSelected ? '−' : '+'}</Text>
        </TouchableOpacity>
      );
    },
    [styles, selectedSource, handleSourcePress]
  );

  const renderThemeItem = useCallback(
    (item: ThemeItem) => {
      const isSelected = selectedTheme === item.theme;
      return (
        <TouchableOpacity
          key={item.theme}
          style={[styles.categoryCard, isSelected && styles.categoryCardSelected]}
          onPress={() => handleThemePress(item.theme)}
          activeOpacity={0.8}
          testID={`theme-card-${item.theme}`}
        >
          <View style={styles.categoryHeader}>
            <Text style={[styles.categoryTitle, isSelected && styles.categoryTitleSelected]}>
              {THEME_DISPLAY_NAMES[item.theme]}
            </Text>
            <Text style={[styles.categoryCount, isSelected && styles.categoryCountSelected]}>
              {item.count.toLocaleString()} passages
            </Text>
          </View>
          <Text style={styles.expandIndicator}>{isSelected ? '−' : '+'}</Text>
        </TouchableOpacity>
      );
    },
    [styles, selectedTheme, handleThemePress]
  );

  const showChunksList = (browseMode === 'source' && selectedSource) || (browseMode === 'theme' && selectedTheme);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading wisdom corpus...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        variant="back"
        title="Wisdom Library"
        showProfile={false}
        testID="wisdom-browser-header"
      />
      <View style={styles.headerSubtitle}>
        <Text style={styles.subtitle}>
          {totalChunks.toLocaleString()} passages from ancient texts
        </Text>
      </View>

      {/* Mode Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, browseMode === 'source' && styles.tabActive]}
          onPress={() => handleModeChange('source')}
          testID="browse-mode-source"
        >
          <Text style={[styles.tabText, browseMode === 'source' && styles.tabTextActive]}>
            By Source
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, browseMode === 'theme' && styles.tabActive]}
          onPress={() => handleModeChange('theme')}
          testID="browse-mode-theme"
        >
          <Text style={[styles.tabText, browseMode === 'theme' && styles.tabTextActive]}>
            By Theme
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {!showChunksList ? (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {browseMode === 'source' ? (
            <>
              <Text style={styles.sectionLabel}>SOURCE TEXTS ({sources.length})</Text>
              {sources.map(renderSourceItem)}
            </>
          ) : (
            <>
              <Text style={styles.sectionLabel}>THEMES ({themes.length})</Text>
              {themes.map(renderThemeItem)}
            </>
          )}
        </ScrollView>
      ) : (
        <View style={styles.chunksContainer}>
          {/* Selection Header */}
          <View style={styles.selectionHeader}>
            <Text style={styles.selectionTitle}>
              {browseMode === 'source'
                ? selectedSource
                : selectedTheme
                ? THEME_DISPLAY_NAMES[selectedTheme]
                : ''}
            </Text>
            <Text style={styles.selectionCount}>
              {chunksTotal.toLocaleString()} passages
            </Text>
            <TouchableOpacity
              onPress={() => {
                setSelectedSource(null);
                setSelectedTheme(null);
              }}
              style={styles.closeSelectionButton}
              testID="close-selection"
            >
              <Text style={styles.closeSelectionText}>Close</Text>
            </TouchableOpacity>
          </View>

          {/* Chunks List */}
          <FlatList
            data={chunks}
            renderItem={renderChunkItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.chunksList}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              chunksLoading ? (
                <View style={styles.loadingMore}>
                  <ActivityIndicator size="small" color={COLORS.primary} />
                  <Text style={styles.loadingMoreText}>Loading more...</Text>
                </View>
              ) : hasMoreChunks ? (
                <TouchableOpacity
                  style={styles.loadMoreButton}
                  onPress={handleLoadMore}
                  testID="load-more-chunks"
                >
                  <Text style={styles.loadMoreText}>Load More</Text>
                </TouchableOpacity>
              ) : chunks.length > 0 ? (
                <Text style={styles.endOfListText}>
                  Showing all {chunks.length} passages
                </Text>
              ) : null
            }
            ListEmptyComponent={
              !chunksLoading ? (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyText}>No passages found</Text>
                </View>
              ) : null
            }
            testID="chunks-list"
          />
        </View>
      )}

      {/* Chunk Detail Modal */}
      <ChunkDetailModal
        visible={isModalVisible}
        chunk={selectedChunk}
        onClose={handleModalClose}
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
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: SPACING.lg,
    },
    loadingText: {
      color: colors.textSecondary,
      ...TYPOGRAPHY.styles.body,
    },
    headerSubtitle: {
      paddingHorizontal: SPACING.xl,
      paddingBottom: SPACING.md,
    },
    subtitle: {
      ...TYPOGRAPHY.styles.body,
      color: colors.textSecondary,
    },
    tabsContainer: {
      flexDirection: 'row',
      paddingHorizontal: SPACING.xl,
      paddingVertical: SPACING.md,
      gap: SPACING.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    tab: {
      flex: 1,
      paddingVertical: SPACING.md,
      borderRadius: RADII.md,
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    tabActive: {
      backgroundColor: COLORS.primary,
      borderColor: COLORS.primary,
    },
    tabText: {
      fontSize: 15,
      fontWeight: '600',
      color: colors.textSecondary,
    },
    tabTextActive: {
      color: COLORS.primaryText,
    },
    scrollContent: {
      padding: SPACING.xl,
      gap: SPACING.md,
    },
    sectionLabel: {
      ...TYPOGRAPHY.styles.label,
      color: colors.textMuted,
      marginBottom: SPACING.sm,
    },
    categoryCard: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: RADII.lg,
      padding: SPACING.lg,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: SPACING.sm,
    },
    categoryCardSelected: {
      borderColor: COLORS.primary,
      backgroundColor: withAlpha(COLORS.primary, 0.1),
    },
    categoryHeader: {
      flex: 1,
    },
    categoryTitle: {
      ...TYPOGRAPHY.styles.h4,
      color: colors.text,
      marginBottom: 2,
    },
    categoryTitleSelected: {
      color: COLORS.primary,
    },
    categoryCount: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textMuted,
    },
    categoryCountSelected: {
      color: colors.textSecondary,
    },
    expandIndicator: {
      fontSize: 24,
      color: COLORS.primary,
      fontWeight: '300',
    },
    chunksContainer: {
      flex: 1,
    },
    selectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: SPACING.xl,
      paddingVertical: SPACING.md,
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      gap: SPACING.md,
    },
    selectionTitle: {
      ...TYPOGRAPHY.styles.h4,
      color: COLORS.primary,
      flex: 1,
    },
    selectionCount: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textMuted,
    },
    closeSelectionButton: {
      paddingHorizontal: SPACING.md,
      paddingVertical: SPACING.sm,
    },
    closeSelectionText: {
      color: colors.textSecondary,
      fontWeight: '500',
    },
    chunksList: {
      padding: SPACING.xl,
      gap: SPACING.md,
    },
    chunkCard: {
      backgroundColor: colors.surface,
      borderRadius: RADII.lg,
      padding: SPACING.lg,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: SPACING.md,
      ...SHADOWS.sm,
    },
    chunkContent: {
      ...TYPOGRAPHY.styles.body,
      color: colors.text,
      lineHeight: 22,
      marginBottom: SPACING.md,
    },
    chunkMeta: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    chunkSource: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textMuted,
      fontWeight: '600',
      flex: 1,
    },
    chunkTags: {
      flexDirection: 'row',
      gap: SPACING.xs,
    },
    themeTag: {
      backgroundColor: withAlpha(COLORS.primary, 0.15),
      paddingHorizontal: SPACING.sm,
      paddingVertical: 2,
      borderRadius: RADII.sm,
    },
    themeTagText: {
      fontSize: 11,
      fontWeight: '600',
      color: COLORS.primary,
    },
    toneTag: {
      backgroundColor: withAlpha(colors.textMuted, 0.2),
      paddingHorizontal: SPACING.sm,
      paddingVertical: 2,
      borderRadius: RADII.sm,
    },
    toneTagText: {
      fontSize: 11,
      fontWeight: '500',
      color: colors.textSecondary,
    },
    loadingMore: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: SPACING.sm,
      paddingVertical: SPACING.lg,
    },
    loadingMoreText: {
      color: colors.textMuted,
      fontSize: 14,
    },
    loadMoreButton: {
      alignItems: 'center',
      paddingVertical: SPACING.lg,
    },
    loadMoreText: {
      color: COLORS.primary,
      fontWeight: '600',
    },
    endOfListText: {
      textAlign: 'center',
      color: colors.textMuted,
      fontSize: 13,
      paddingVertical: SPACING.lg,
    },
    emptyState: {
      alignItems: 'center',
      paddingVertical: SPACING.xxxl,
    },
    emptyText: {
      color: colors.textMuted,
      fontSize: 16,
    },
  });
