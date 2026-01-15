/**
 * Explore Screen
 *
 * The main discovery screen featuring:
 * - Sage logo header with profile avatar
 * - Search themes search bar
 * - Theme grid section
 * - Paths section with horizontal scroll
 * - Floating Ask button
 */

import { router, Href } from 'expo-router';
import { useState, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADII, TYPOGRAPHY, SHADOWS, getThemedColors, withAlpha } from '../../lib/ui/theme';
import { getJourneys, getQuickPaths, getProgressPercentage, getThemeImage } from '../../lib/theme-packs';
import { getPracticeTemplatesByCategory, type PracticeTemplate } from '../../lib/practice';
import { useSageStore } from '../../lib/storage/store';
import { AppHeader } from '../../components/navigation';
import { AskSageFAB } from '../../components/home';

export default function ExploreScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);
  const [searchQuery, setSearchQuery] = useState('');

  // Get theme packs and progress
  const themePackProgress = useSageStore((s) => s.themePackProgress);
  const journeys = getJourneys(); // 7-day deep journeys for Themes grid
  const quickPaths = getQuickPaths(); // 3-day beginner paths for Paths section

  // Get practice templates
  const breathPractices = getPracticeTemplatesByCategory('breath');
  const allPractices = [
    ...getPracticeTemplatesByCategory('stillness'),
    ...getPracticeTemplatesByCategory('movement'),
    ...getPracticeTemplatesByCategory('gratitude'),
    ...getPracticeTemplatesByCategory('compassion'),
  ];

  // Get user preferences for avatar
  const preferences = useSageStore((s) => s.preferences);
  const profileImageUri = preferences.profileImageUri;
  const userName = preferences.userName;

  // Generate user initials for avatar fallback
  const userInitials = userName
    ? userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : null;

  // Filter themes (journeys) based on search query
  const filteredThemes = useMemo(() => {
    if (!searchQuery.trim()) {
      return journeys;
    }
    const query = searchQuery.toLowerCase();
    return journeys.filter(
      (pack) =>
        pack.title.toLowerCase().includes(query) ||
        pack.description.toLowerCase().includes(query)
    );
  }, [journeys, searchQuery]);

  // Filter paths based on search query
  const filteredPaths = useMemo(() => {
    if (!searchQuery.trim()) {
      return quickPaths;
    }
    const query = searchQuery.toLowerCase();
    return quickPaths.filter(
      (pack) =>
        pack.title.toLowerCase().includes(query) ||
        pack.description.toLowerCase().includes(query)
    );
  }, [quickPaths, searchQuery]);

  const styles = createStyles(colors, isDark);

  const handleThemePress = (themeId: string) => {
    router.push(`/theme-pack-detail?id=${themeId}` as Href);
  };

  const handlePathPress = (pathId: string) => {
    // Navigate to the specific path detail
    router.push(`/theme-pack-detail?id=${pathId}` as Href);
  };

  const handlePracticePress = (practiceId: string, duration: 'short' | 'medium' | 'long' = 'short') => {
    // Navigate to practice session with the practice ID and duration
    router.push(`/practice-session?id=${practiceId}&duration=${duration}` as Href);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      router.push(`/ask?prompt=${encodeURIComponent(searchQuery)}` as Href);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        variant="main"
        showProfile={false}
        showBorder={false}
        testID="explore-header"
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Search Bar */}
        <View style={styles.searchContainer} testID="search-themes-container">
          <View style={styles.searchBar}>
            <Ionicons
              name="search-outline"
              size={20}
              color={colors.textMuted}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search themes"
              placeholderTextColor={colors.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearchSubmit}
              returnKeyType="search"
              testID="search-themes-input"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity
                onPress={() => setSearchQuery('')}
                style={styles.clearButton}
                testID="search-clear-button"
              >
                <Ionicons name="close-circle" size={18} color={colors.textMuted} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* 7-Day Journeys - Horizontal Scrollable Cards */}
        <View style={styles.section} testID="theme-grid-section">
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>7-Day Journeys</Text>
            <TouchableOpacity onPress={() => router.push('/theme-packs' as Href)}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.journeysCarousel}
            contentContainerStyle={styles.journeysCarouselContent}
          >
            {filteredThemes.map((pack) => {
              const progress = themePackProgress[pack.id];
              const progressPercent = getProgressPercentage(progress ?? null, pack.dayCount);
              const isStarted = !!progress;
              const isComplete = progress?.isComplete ?? false;

              return (
                <TouchableOpacity
                  key={pack.id}
                  style={styles.journeyCard}
                  onPress={() => handleThemePress(pack.id)}
                  testID={`theme-card-${pack.id}`}
                >
                  <View
                    style={[
                      styles.journeyImageContainer,
                      { backgroundColor: withAlpha(pack.color, 0.2) },
                    ]}
                  >
                    {getThemeImage(pack.image) ? (
                      <Image
                        source={getThemeImage(pack.image)!}
                        style={styles.journeyImage}
                        resizeMode="contain"
                      />
                    ) : (
                      <Text style={styles.journeyEmoji}>{pack.icon}</Text>
                    )}
                    <View style={styles.daysBadge}>
                      <Text style={styles.daysBadgeText}>{pack.dayCount} days</Text>
                    </View>
                    {isComplete && (
                      <View style={styles.completeBadge}>
                        <Text style={styles.completeBadgeText}>Done</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.journeyTitle} numberOfLines={1}>
                    {pack.title}
                  </Text>
                  <Text style={styles.journeySubtitle} numberOfLines={2}>
                    {pack.description}
                  </Text>
                  {isStarted && !isComplete && (
                    <View style={styles.progressContainer}>
                      <View
                        style={[
                          styles.progressBar,
                          { backgroundColor: withAlpha(pack.color, 0.3) },
                        ]}
                      >
                        <View
                          style={[
                            styles.progressFill,
                            { width: `${progressPercent}%`, backgroundColor: pack.color },
                          ]}
                        />
                      </View>
                      <Text style={styles.progressText}>{progressPercent}%</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {filteredThemes.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No journeys found</Text>
              <Text style={styles.emptyStateSubtext}>
                Try a different search term
              </Text>
            </View>
          )}
        </View>

        {/* Quick Paths Section - Short beginner-friendly paths */}
        <View style={styles.section} testID="paths-section">
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick Paths</Text>
            <TouchableOpacity onPress={() => router.push('/theme-packs' as Href)}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.pathsCarousel}
            contentContainerStyle={styles.pathsCarouselContent}
          >
            {filteredPaths.map((path) => {
              const progress = themePackProgress[path.id];
              const progressPercent = getProgressPercentage(progress ?? null, path.dayCount);
              const isStarted = !!progress;
              const isComplete = progress?.isComplete ?? false;

              return (
                <TouchableOpacity
                  key={path.id}
                  style={styles.pathCard}
                  onPress={() => handlePathPress(path.id)}
                  testID={`path-card-${path.id}`}
                >
                  <View
                    style={[
                      styles.pathIconContainer,
                      { backgroundColor: withAlpha(path.color, 0.2) },
                    ]}
                  >
                    <Text style={styles.pathEmoji}>{path.icon}</Text>
                    {isComplete && (
                      <View style={styles.pathCompleteBadge}>
                        <Text style={styles.pathCompleteBadgeText}>✓</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.pathTitle} numberOfLines={1}>
                    {path.title}
                  </Text>
                  <Text style={styles.pathDescription} numberOfLines={2}>
                    {path.description}
                  </Text>
                  <View style={styles.pathMeta}>
                    <Text style={styles.pathDays}>{path.dayCount} days</Text>
                    {isStarted && !isComplete && (
                      <Text style={styles.pathProgress}>{progressPercent}%</Text>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {filteredPaths.length === 0 && searchQuery.trim() && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No paths found</Text>
            </View>
          )}
        </View>

        {/* Breathe Section - Breathing exercises */}
        <View style={styles.section} testID="breathe-section">
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Breathe</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.practiceCarousel}
            contentContainerStyle={styles.practiceCarouselContent}
          >
            {breathPractices.map((practice) => (
              <TouchableOpacity
                key={practice.id}
                style={styles.practiceCard}
                onPress={() => handlePracticePress(practice.id, 'short')}
                testID={`breathe-card-${practice.id}`}
              >
                <View style={styles.practiceIconContainer}>
                  <Text style={styles.practiceEmoji}>{practice.icon}</Text>
                </View>
                <Text style={styles.practiceTitle} numberOfLines={1}>
                  {practice.variants.short.title}
                </Text>
                <Text style={styles.practiceDescription} numberOfLines={2}>
                  {practice.variants.short.description}
                </Text>
                <View style={styles.practiceMeta}>
                  <Text style={styles.practiceDuration}>
                    {practice.variants.short.estimatedMinutes} min
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Practice Section - Mindfulness practices */}
        <View style={styles.section} testID="practice-section">
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Practice</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.practiceCarousel}
            contentContainerStyle={styles.practiceCarouselContent}
          >
            {allPractices.map((practice) => (
              <TouchableOpacity
                key={practice.id}
                style={styles.practiceCard}
                onPress={() => handlePracticePress(practice.id, 'short')}
                testID={`practice-card-${practice.id}`}
              >
                <View style={styles.practiceIconContainer}>
                  <Text style={styles.practiceEmoji}>{practice.icon}</Text>
                </View>
                <Text style={styles.practiceTitle} numberOfLines={1}>
                  {practice.variants.short.title}
                </Text>
                <Text style={styles.practiceDescription} numberOfLines={2}>
                  {practice.variants.short.description}
                </Text>
                <View style={styles.practiceMeta}>
                  <Text style={styles.practiceDuration}>
                    {practice.variants.short.estimatedMinutes} min
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <AskSageFAB testID="explore-ask-sage-fab" />
    </SafeAreaView>
  );
}

const createStyles = (colors: ReturnType<typeof getThemedColors>, isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContainer: {
      paddingBottom: 100,
    },
    // Search Bar Styles
    searchContainer: {
      paddingHorizontal: SPACING.xl,
      paddingTop: SPACING.md,
      paddingBottom: SPACING.lg,
    },
    searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: RADII.lg,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: SPACING.md,
      height: 48,
    },
    searchIcon: {
      marginRight: SPACING.sm,
    },
    searchInput: {
      flex: 1,
      ...TYPOGRAPHY.styles.body,
      color: colors.text,
      padding: 0,
    },
    clearButton: {
      padding: SPACING.xs,
    },
    // Section Styles
    section: {
      marginTop: SPACING.lg,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: SPACING.xl,
      marginBottom: SPACING.lg,
    },
    sectionTitle: {
      ...TYPOGRAPHY.styles.h4,
      color: colors.text,
    },
    seeAllText: {
      fontSize: 14,
      color: COLORS.primary,
      fontWeight: '600',
    },
    // Journey Carousel Styles (7-Day Journeys)
    journeysCarousel: {
      marginLeft: 0,
    },
    journeysCarouselContent: {
      paddingLeft: SPACING.xl,
      paddingRight: SPACING.lg,
    },
    journeyCard: {
      width: 180,
      backgroundColor: colors.surface,
      borderRadius: RADII.lg,
      padding: SPACING.md,
      marginRight: SPACING.md,
      borderWidth: 1,
      borderColor: colors.border,
      ...SHADOWS.sm,
    },
    journeyImageContainer: {
      width: '100%',
      height: 120,
      borderRadius: RADII.md,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: SPACING.sm,
      position: 'relative',
    },
    journeyImage: {
      width: 70,
      height: 70,
    },
    journeyEmoji: {
      fontSize: 48,
    },
    journeyTitle: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.text,
      marginBottom: SPACING.xs,
    },
    journeySubtitle: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textSecondary,
      lineHeight: 16,
      marginBottom: SPACING.sm,
    },
    daysBadge: {
      position: 'absolute',
      top: 8,
      left: 8,
      backgroundColor: withAlpha(COLORS.primary, 0.9),
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: RADII.sm,
    },
    daysBadgeText: {
      color: COLORS.white,
      fontSize: 10,
      fontWeight: '700',
    },
    completeBadge: {
      position: 'absolute',
      top: 8,
      right: 8,
      backgroundColor: COLORS.success,
      paddingHorizontal: 6,
      paddingVertical: 3,
      borderRadius: RADII.sm,
    },
    completeBadgeText: {
      color: COLORS.primaryText,
      fontSize: 9,
      fontWeight: '700',
    },
    progressContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: SPACING.sm,
      gap: SPACING.xs,
    },
    progressBar: {
      flex: 1,
      height: 4,
      borderRadius: 2,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      borderRadius: 2,
    },
    progressText: {
      fontSize: 10,
      fontWeight: '600',
      color: colors.textMuted,
    },
    // Empty State Styles
    emptyState: {
      paddingHorizontal: SPACING.xl,
      paddingVertical: SPACING.xxxl,
      alignItems: 'center',
    },
    emptyStateText: {
      ...TYPOGRAPHY.styles.h4,
      color: colors.textSecondary,
      marginBottom: SPACING.xs,
    },
    emptyStateSubtext: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textMuted,
    },
    // Paths Carousel Styles
    pathsCarousel: {
      marginLeft: 0,
    },
    pathsCarouselContent: {
      paddingLeft: SPACING.xl,
      paddingRight: SPACING.lg,
    },
    pathCard: {
      width: 160,
      backgroundColor: colors.surface,
      borderRadius: RADII.lg,
      padding: SPACING.md,
      marginRight: SPACING.md,
      borderWidth: 1,
      borderColor: colors.border,
      ...SHADOWS.sm,
    },
    pathIconContainer: {
      width: 56,
      height: 56,
      borderRadius: RADII.md,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: SPACING.sm,
      position: 'relative',
    },
    pathEmoji: {
      fontSize: 28,
    },
    pathTitle: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.text,
      marginBottom: SPACING.xs,
    },
    pathDescription: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textSecondary,
      lineHeight: 16,
      marginBottom: SPACING.sm,
    },
    pathMeta: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: SPACING.sm,
    },
    pathDays: {
      fontSize: 11,
      fontWeight: '600',
      color: colors.textMuted,
      backgroundColor: colors.surfaceAlt,
      paddingHorizontal: SPACING.sm,
      paddingVertical: 2,
      borderRadius: RADII.sm,
    },
    pathProgress: {
      fontSize: 11,
      fontWeight: '600',
      color: COLORS.primary,
    },
    pathCompleteBadge: {
      position: 'absolute',
      top: -4,
      right: -4,
      backgroundColor: COLORS.success,
      width: 18,
      height: 18,
      borderRadius: 9,
      justifyContent: 'center',
      alignItems: 'center',
    },
    pathCompleteBadgeText: {
      color: COLORS.white,
      fontSize: 10,
      fontWeight: '700',
    },
    // Practice Carousel Styles (Breathe and Practice sections)
    practiceCarousel: {
      marginLeft: 0,
    },
    practiceCarouselContent: {
      paddingLeft: SPACING.xl,
      paddingRight: SPACING.lg,
    },
    practiceCard: {
      width: 140,
      backgroundColor: colors.surface,
      borderRadius: RADII.lg,
      padding: SPACING.md,
      marginRight: SPACING.md,
      borderWidth: 1,
      borderColor: colors.border,
      ...SHADOWS.sm,
    },
    practiceIconContainer: {
      width: 48,
      height: 48,
      borderRadius: RADII.md,
      backgroundColor: withAlpha(COLORS.primary, 0.1),
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: SPACING.sm,
    },
    practiceEmoji: {
      fontSize: 24,
    },
    practiceTitle: {
      fontSize: 13,
      fontWeight: '700',
      color: colors.text,
      marginBottom: SPACING.xs,
    },
    practiceDescription: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textSecondary,
      lineHeight: 14,
      fontSize: 11,
      marginBottom: SPACING.sm,
    },
    practiceMeta: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    practiceDuration: {
      fontSize: 10,
      fontWeight: '600',
      color: COLORS.primary,
      backgroundColor: withAlpha(COLORS.primary, 0.1),
      paddingHorizontal: SPACING.sm,
      paddingVertical: 2,
      borderRadius: RADII.sm,
    },
    // Bottom Spacer
    bottomSpacer: {
      height: 40,
    },
  });
