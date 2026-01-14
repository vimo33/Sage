import { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { useSageStore } from '../../lib/storage/store';
import {
  COLORS,
  SPACING,
  RADII,
  TYPOGRAPHY,
  SHADOWS,
  withAlpha,
  getThemedColors,
} from '../../lib/ui/theme';
import {
  findContrastingPassages,
  THEME_DESCRIPTIONS,
  SUGGESTED_CONTRAST_TOPICS,
  type ContrastSet,
  type ContrastPair,
} from '../../lib/retrieval/contrasts';
import type { WisdomChunk } from '../../lib/retrieval/search';

export default function ContrastsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);

  const savedContrasts = useSageStore((s) => s.savedContrasts);
  const saveContrastSet = useSageStore((s) => s.saveContrastSet);

  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [currentContrasts, setCurrentContrasts] = useState<ContrastSet | null>(null);
  const [activeTab, setActiveTab] = useState<'explore' | 'saved'>('explore');

  const styles = createStyles(colors, isDark);

  const handleSearch = useCallback(async () => {
    if (!query.trim()) return;

    setIsSearching(true);
    try {
      const results = await findContrastingPassages(query.trim(), {
        maxPairs: 3,
        includeComplementary: true,
        includeContrasting: true,
      });
      setCurrentContrasts(results);
    } catch (error) {
      console.error('Failed to find contrasts:', error);
    } finally {
      setIsSearching(false);
    }
  }, [query]);

  const handleSuggestedTopic = useCallback((topic: string) => {
    setQuery(topic);
  }, []);

  const handleSaveContrast = useCallback(() => {
    if (currentContrasts && currentContrasts.pairs.length > 0) {
      saveContrastSet(currentContrasts);
    }
  }, [currentContrasts, saveContrastSet]);

  const renderPassageCard = (passage: WisdomChunk, index: number, contrastType: string) => (
    <View key={`${passage.id}-${index}`} style={styles.passageCard}>
      <View style={styles.passageHeader}>
        <View style={[styles.passageBadge, contrastType === 'contrasting' ? styles.contrastingBadge : styles.complementaryBadge]}>
          <Text style={styles.passageBadgeText}>
            {index === 0 ? 'Perspective A' : 'Perspective B'}
          </Text>
        </View>
        <Text style={styles.passageTheme}>{passage.theme}</Text>
      </View>
      <View style={styles.quoteIconContainer}>
        <Text style={styles.quoteIcon}>"</Text>
      </View>
      <Text style={styles.passageContent}>{passage.content}</Text>
      <View style={styles.passageFooter}>
        <Text style={styles.sourceRef}>— {passage.sourceRef}</Text>
        <Text style={styles.bookName}>{passage.book}</Text>
      </View>
    </View>
  );

  const renderContrastPair = (pair: ContrastPair) => (
    <View key={pair.id} style={styles.contrastPairContainer}>
      <View style={styles.contrastTypeHeader}>
        <View style={[styles.contrastTypeBadge, pair.contrastType === 'contrasting' ? styles.contrastingTypeBadge : styles.complementaryTypeBadge]}>
          <Text style={styles.contrastTypeText}>
            {pair.contrastType === 'contrasting' ? '⚡ Contrasting Views' : '🤝 Complementary Views'}
          </Text>
        </View>
        <Text style={styles.themeDescription}>
          {THEME_DESCRIPTIONS[pair.theme]}
        </Text>
      </View>
      <View style={styles.passagesContainer}>
        {pair.passages.map((passage, index) => renderPassageCard(passage, index, pair.contrastType))}
      </View>
      <View style={styles.contrastConnector}>
        <View style={styles.connectorLine} />
        <Text style={styles.connectorText}>
          {pair.contrastType === 'contrasting' ? 'Different approaches' : 'Balanced perspectives'}
        </Text>
        <View style={styles.connectorLine} />
      </View>
    </View>
  );

  const renderExploreTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={query}
          onChangeText={setQuery}
          placeholder="What topic would you like to explore?"
          placeholderTextColor={colors.textMuted}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity
          style={[styles.searchButton, !query.trim() && styles.searchButtonDisabled]}
          onPress={handleSearch}
          disabled={!query.trim() || isSearching}
        >
          {isSearching ? (
            <ActivityIndicator color={COLORS.primaryText} size="small" />
          ) : (
            <Text style={styles.searchButtonText}>Find</Text>
          )}
        </TouchableOpacity>
      </View>

      {!currentContrasts && !isSearching && (
        <View style={styles.suggestionsContainer}>
          <Text style={styles.suggestionsTitle}>Suggested Topics</Text>
          <View style={styles.suggestionsList}>
            {SUGGESTED_CONTRAST_TOPICS.slice(0, 4).map((topic, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestionChip}
                onPress={() => handleSuggestedTopic(topic)}
              >
                <Text style={styles.suggestionText} numberOfLines={1}>
                  {topic}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {currentContrasts && currentContrasts.pairs.length > 0 && (
        <View style={styles.resultsContainer}>
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsTitle}>Multiple Perspectives</Text>
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveContrast}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.resultsQuery}>"{currentContrasts.query}"</Text>
          {currentContrasts.pairs.map(renderContrastPair)}
        </View>
      )}

      {currentContrasts && currentContrasts.pairs.length === 0 && (
        <View style={styles.emptyResults}>
          <Text style={styles.emptyEmoji}>🔍</Text>
          <Text style={styles.emptyTitle}>No contrasts found</Text>
          <Text style={styles.emptySubtitle}>
            Try a different topic or use one of the suggested queries.
          </Text>
        </View>
      )}
    </View>
  );

  const renderSavedTab = () => (
    <View style={styles.tabContent}>
      {savedContrasts.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>🔄</Text>
          <Text style={styles.emptyTitle}>No saved contrasts</Text>
          <Text style={styles.emptySubtitle}>
            Explore different perspectives and save them here for reflection.
          </Text>
        </View>
      ) : (
        <View style={styles.savedList}>
          {savedContrasts.map((contrastSet) => (
            <View key={contrastSet.id} style={styles.savedCard}>
              <Text style={styles.savedQuery}>"{contrastSet.query}"</Text>
              <Text style={styles.savedMeta}>
                {contrastSet.pairs.length} perspective{contrastSet.pairs.length !== 1 ? 's' : ''} •{' '}
                {new Date(contrastSet.createdAt).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                })}
              </Text>
              {contrastSet.pairs.slice(0, 1).map(renderContrastPair)}
            </View>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Contrasts</Text>
        <Text style={styles.subtitle}>Multiple perspectives on wisdom</Text>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'explore' && styles.activeTab]}
          onPress={() => setActiveTab('explore')}
        >
          <Text style={[styles.tabText, activeTab === 'explore' && styles.activeTabText]}>
            Explore
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'saved' && styles.activeTab]}
          onPress={() => setActiveTab('saved')}
        >
          <Text style={[styles.tabText, activeTab === 'saved' && styles.activeTabText]}>
            Saved ({savedContrasts.length})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {activeTab === 'explore' ? renderExploreTab() : renderSavedTab()}
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: ReturnType<typeof getThemedColors>, isDark: boolean) =>
  StyleSheet.create({
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
    tabBar: {
      flexDirection: 'row',
      paddingHorizontal: SPACING.xl,
      marginBottom: SPACING.md,
      gap: SPACING.sm,
    },
    tab: {
      paddingVertical: SPACING.sm,
      paddingHorizontal: SPACING.lg,
      borderRadius: RADII.full,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    activeTab: {
      backgroundColor: COLORS.primary,
      borderColor: COLORS.primary,
    },
    tabText: {
      ...TYPOGRAPHY.styles.body,
      color: colors.textSecondary,
      fontWeight: '600',
    },
    activeTabText: {
      color: COLORS.primaryText,
    },
    scrollContainer: {
      paddingHorizontal: SPACING.xl,
      paddingBottom: 100,
    },
    tabContent: {
      flex: 1,
    },
    searchContainer: {
      flexDirection: 'row',
      gap: SPACING.sm,
      marginBottom: SPACING.xl,
    },
    searchInput: {
      flex: 1,
      backgroundColor: colors.surface,
      borderRadius: RADII.md,
      paddingHorizontal: SPACING.lg,
      paddingVertical: SPACING.md,
      ...TYPOGRAPHY.styles.body,
      color: colors.text,
      borderWidth: 1,
      borderColor: colors.border,
    },
    searchButton: {
      backgroundColor: COLORS.primary,
      borderRadius: RADII.md,
      paddingHorizontal: SPACING.xl,
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: 70,
    },
    searchButtonDisabled: {
      opacity: 0.5,
    },
    searchButtonText: {
      ...TYPOGRAPHY.styles.bodyBold,
      color: COLORS.primaryText,
    },
    suggestionsContainer: {
      marginTop: SPACING.md,
    },
    suggestionsTitle: {
      ...TYPOGRAPHY.styles.label,
      color: colors.textMuted,
      marginBottom: SPACING.md,
    },
    suggestionsList: {
      gap: SPACING.sm,
    },
    suggestionChip: {
      backgroundColor: colors.surface,
      borderRadius: RADII.md,
      paddingHorizontal: SPACING.lg,
      paddingVertical: SPACING.md,
      borderWidth: 1,
      borderColor: colors.border,
    },
    suggestionText: {
      ...TYPOGRAPHY.styles.body,
      color: colors.text,
    },
    resultsContainer: {
      marginTop: SPACING.md,
    },
    resultsHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: SPACING.sm,
    },
    resultsTitle: {
      ...TYPOGRAPHY.styles.h3,
      color: colors.text,
    },
    saveButton: {
      backgroundColor: withAlpha(COLORS.primary, 0.2),
      borderRadius: RADII.full,
      paddingHorizontal: SPACING.lg,
      paddingVertical: SPACING.sm,
    },
    saveButtonText: {
      ...TYPOGRAPHY.styles.bodyBold,
      color: COLORS.primary,
      fontSize: 13,
    },
    resultsQuery: {
      ...TYPOGRAPHY.styles.body,
      color: colors.textSecondary,
      fontStyle: 'italic',
      marginBottom: SPACING.xl,
    },
    contrastPairContainer: {
      marginBottom: SPACING.xxxl,
    },
    contrastTypeHeader: {
      marginBottom: SPACING.lg,
    },
    contrastTypeBadge: {
      alignSelf: 'flex-start',
      borderRadius: RADII.full,
      paddingHorizontal: SPACING.md,
      paddingVertical: SPACING.xs,
      marginBottom: SPACING.sm,
    },
    contrastingTypeBadge: {
      backgroundColor: withAlpha('#f59e0b', 0.2),
    },
    complementaryTypeBadge: {
      backgroundColor: withAlpha(COLORS.primary, 0.2),
    },
    contrastTypeText: {
      ...TYPOGRAPHY.styles.caption,
      fontWeight: '700',
      color: colors.text,
    },
    themeDescription: {
      ...TYPOGRAPHY.styles.body,
      color: colors.textSecondary,
    },
    passagesContainer: {
      gap: SPACING.lg,
    },
    passageCard: {
      backgroundColor: colors.surface,
      borderRadius: RADII.lg,
      padding: SPACING.xl,
      borderWidth: 1,
      borderColor: colors.border,
      ...SHADOWS.sm,
    },
    passageHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: SPACING.sm,
    },
    passageBadge: {
      borderRadius: RADII.sm,
      paddingHorizontal: SPACING.sm,
      paddingVertical: 2,
    },
    contrastingBadge: {
      backgroundColor: withAlpha('#f59e0b', 0.15),
    },
    complementaryBadge: {
      backgroundColor: withAlpha(COLORS.primary, 0.15),
    },
    passageBadgeText: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.text,
      fontWeight: '600',
    },
    passageTheme: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textMuted,
      textTransform: 'capitalize',
    },
    quoteIconContainer: {
      marginBottom: SPACING.xs,
    },
    quoteIcon: {
      fontSize: 36,
      color: withAlpha(COLORS.primary, 0.3),
      height: 28,
      lineHeight: 44,
    },
    passageContent: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.text,
      lineHeight: 24,
      fontStyle: 'italic',
    },
    passageFooter: {
      marginTop: SPACING.lg,
    },
    sourceRef: {
      fontSize: 13,
      fontWeight: '700',
      color: colors.textMuted,
    },
    bookName: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textMuted,
      marginTop: 2,
    },
    contrastConnector: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: SPACING.lg,
      gap: SPACING.md,
    },
    connectorLine: {
      flex: 1,
      height: 1,
      backgroundColor: colors.border,
    },
    connectorText: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textMuted,
    },
    emptyResults: {
      alignItems: 'center',
      marginTop: 60,
      paddingHorizontal: 40,
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
    savedList: {
      gap: SPACING.xl,
    },
    savedCard: {
      backgroundColor: colors.surface,
      borderRadius: RADII.lg,
      padding: SPACING.xl,
      borderWidth: 1,
      borderColor: colors.border,
      ...SHADOWS.sm,
    },
    savedQuery: {
      ...TYPOGRAPHY.styles.h4,
      color: colors.text,
      fontStyle: 'italic',
      marginBottom: SPACING.xs,
    },
    savedMeta: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textMuted,
      marginBottom: SPACING.lg,
    },
  });
