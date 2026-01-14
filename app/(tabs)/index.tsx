import { router, Href } from 'expo-router';
import { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { COLORS, SPACING, RADII, TYPOGRAPHY, SHADOWS, getThemedColors, withAlpha } from '../../lib/ui/theme';
import { DailyWisdomWidget } from '../../lib/ui/DailyWisdomWidget';
import { getFeaturedReflections } from '../../lib/reflection';
import { getAllThemePacks, getProgressPercentage, getNextAvailableDay } from '../../lib/theme-packs';
import { getFeaturedPrompts } from '../../lib/community-prompts';
import { useSageStore, type SearchHistoryItem } from '../../lib/storage/store';

// Helper to format minutes as readable string
function formatTimeDisplay(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${remainingMinutes}m`;
}

// Helper to format relative time
function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diffMs = now - timestamp;
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  return new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function ExploreScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);
  const [timePeriod, setTimePeriod] = useState<'weekly' | 'monthly'>('weekly');

  // Get time tracking stats from store
  const getTimeTrackingStats = useSageStore((s) => s.getTimeTrackingStats);
  const stats = getTimeTrackingStats();
  const displayMinutes = timePeriod === 'weekly' ? stats.weeklyMinutes : stats.monthlyMinutes;

  // Get streak info from store
  const getStreakInfo = useSageStore((s) => s.getStreakInfo);
  const streakInfo = useMemo(() => getStreakInfo(), [getStreakInfo]);
  const { streak, motivationalMessage } = streakInfo;

  // Get featured reflections from the reflection templates
  const featuredReflections = getFeaturedReflections();

  // Get theme packs and progress
  const themePackProgress = useSageStore((s) => s.themePackProgress);
  const themePacks = getAllThemePacks();

  // Get featured community prompts
  const featuredCommunityPrompts = getFeaturedPrompts([], 3);

  // Get recent search history
  const getRecentSearchHistory = useSageStore((s) => s.getRecentSearchHistory);
  const recentQuestions = useMemo(() => getRecentSearchHistory(5), [getRecentSearchHistory]);

  // Handler for quick re-ask
  const handleReask = (question: string) => {
    router.push(`/ask?prompt=${encodeURIComponent(question)}` as Href);
  };

  const styles = createStyles(colors, isDark);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <View>
            <Text style={styles.dateText}>Monday, Jan 05</Text>
            <Text style={styles.greetingText}>Good afternoon, Alex</Text>
          </View>
          <TouchableOpacity style={styles.profileCircle}>
            <Text style={styles.profileEmoji}>👤</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.wisdomWidgetContainer}>
          <DailyWisdomWidget onPress={() => router.push('/ask')} />
        </View>

        <View style={styles.statsRow}>
          <View style={[styles.statBox, streak.isInGracePeriod && styles.statBoxGracePeriod]}>
            <Text style={styles.statIcon}>{streak.isInGracePeriod ? '⏳' : '🔥'}</Text>
            <Text style={styles.statValue} testID="streak-value">{streak.currentStreak}</Text>
            <Text style={styles.statLabel}>
              {streak.isInGracePeriod ? 'GRACE PERIOD' : 'DAY STREAK'}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.statBox}
            onPress={() => setTimePeriod(p => p === 'weekly' ? 'monthly' : 'weekly')}
            testID="mindful-time-stat"
          >
            <Text style={styles.statIcon}>🕒</Text>
            <Text style={styles.statValue} testID="mindful-time-value">
              {formatTimeDisplay(displayMinutes)}
            </Text>
            <Text style={styles.statLabel}>
              {timePeriod === 'weekly' ? 'THIS WEEK' : 'THIS MONTH'}
            </Text>
          </TouchableOpacity>
        </View>

        {streak.currentStreak > 0 && (
          <View style={styles.motivationalContainer}>
            <Text style={styles.motivationalText}>{motivationalMessage}</Text>
            {streak.longestStreak > streak.currentStreak && (
              <Text style={styles.longestStreakText}>
                Personal best: {streak.longestStreak} days
              </Text>
            )}
          </View>
        )}

        {streak.isInGracePeriod && (
          <View style={styles.gracePeriodBanner}>
            <Text style={styles.gracePeriodIcon}>⚡</Text>
            <View style={styles.gracePeriodTextContainer}>
              <Text style={styles.gracePeriodTitle}>Keep your streak alive!</Text>
              <Text style={styles.gracePeriodSubtitle}>
                Complete any activity today to preserve your {streak.currentStreak}-day streak
              </Text>
            </View>
          </View>
        )}

        {/* Recent Questions Section */}
        {recentQuestions.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Questions</Text>
            </View>
            <View style={styles.recentQuestionsContainer}>
              {recentQuestions.map((item: SearchHistoryItem) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.recentQuestionCard}
                  onPress={() => handleReask(item.question)}
                  testID={`recent-question-${item.id}`}
                >
                  <View style={styles.recentQuestionContent}>
                    <Text style={styles.recentQuestionText} numberOfLines={2}>
                      {item.question}
                    </Text>
                    <Text style={styles.recentQuestionPreview} numberOfLines={1}>
                      {item.responsePreview}
                    </Text>
                  </View>
                  <View style={styles.recentQuestionMeta}>
                    <Text style={styles.recentQuestionTime}>
                      {formatRelativeTime(item.timestamp)}
                    </Text>
                    <View style={styles.reaskButton}>
                      <Text style={styles.reaskButtonText}>Re-ask</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Guided Reflections</Text>
            <TouchableOpacity onPress={() => router.push('/reflections' as Href)}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
            {featuredReflections.map((reflection) => (
              <TouchableOpacity
                key={reflection.id}
                style={styles.carouselCard}
                onPress={() => router.push(`/guided-reflection?id=${reflection.id}` as Href)}
                testID={`reflection-card-${reflection.id}`}
              >
                <View style={styles.carouselImagePlaceholder}>
                  <Text style={styles.carouselEmoji}>{reflection.icon}</Text>
                  <View style={styles.timeBadge}>
                    <Text style={styles.timeBadgeText}>{reflection.estimatedMinutes} min</Text>
                  </View>
                </View>
                <Text style={styles.carouselCardTitle}>{reflection.title}</Text>
                <Text style={styles.carouselCardSubtitle}>{reflection.description}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* 7-Day Journeys Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>7-Day Journeys</Text>
            <TouchableOpacity onPress={() => router.push('/theme-packs' as Href)}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
            {themePacks.map((pack) => {
              const progress = themePackProgress[pack.id];
              const progressPercent = getProgressPercentage(progress ?? null);
              const isStarted = !!progress;
              const isComplete = progress?.isComplete ?? false;
              const nextDay = getNextAvailableDay(pack, progress ?? null);

              return (
                <TouchableOpacity
                  key={pack.id}
                  style={styles.journeyCard}
                  onPress={() => router.push(`/theme-pack-detail?id=${pack.id}` as Href)}
                  testID={`journey-card-${pack.id}`}
                >
                  <View style={[styles.journeyImagePlaceholder, { backgroundColor: withAlpha(pack.color, 0.2) }]}>
                    <Text style={styles.journeyEmoji}>{pack.icon}</Text>
                    <View style={styles.daysBadge}>
                      <Text style={styles.daysBadgeText}>{pack.dayCount} days</Text>
                    </View>
                    {isComplete && (
                      <View style={styles.completeBadge}>
                        <Text style={styles.completeBadgeText}>Done</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.journeyCardTitle}>{pack.title}</Text>
                  {isStarted && !isComplete && (
                    <View style={styles.journeyProgress}>
                      <View style={[styles.journeyProgressBar, { backgroundColor: withAlpha(pack.color, 0.3) }]}>
                        <View style={[styles.journeyProgressFill, { width: `${progressPercent}%`, backgroundColor: pack.color }]} />
                      </View>
                      <Text style={styles.journeyProgressText}>
                        Day {nextDay ?? progress?.completedDays.length ?? 0} of {pack.dayCount}
                      </Text>
                    </View>
                  )}
                  {!isStarted && (
                    <Text style={styles.journeyCardSubtitle}>{pack.description}</Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Wisdom Library Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Wisdom Library</Text>
          </View>
          <TouchableOpacity
            style={styles.wisdomLibraryCard}
            onPress={() => router.push('/wisdom-browser' as Href)}
            testID="wisdom-library-card"
          >
            <View style={styles.wisdomLibraryContent}>
              <Text style={styles.wisdomLibraryIcon}>📚</Text>
              <View style={styles.wisdomLibraryText}>
                <Text style={styles.wisdomLibraryTitle}>Browse the Corpus</Text>
                <Text style={styles.wisdomLibrarySubtitle}>
                  Explore 13,955+ passages from ancient texts
                </Text>
              </View>
            </View>
            <Text style={styles.wisdomLibraryArrow}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Community Prompts Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Community Prompts</Text>
            <TouchableOpacity onPress={() => router.push('/community-prompts' as Href)}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.communityPromptsContainer}>
            {featuredCommunityPrompts.map((prompt) => (
              <TouchableOpacity
                key={prompt.id}
                style={styles.communityPromptCard}
                onPress={() => router.push(`/ask?prompt=${encodeURIComponent(prompt.promptText)}` as Href)}
                testID={`community-prompt-${prompt.id}`}
              >
                <Text style={styles.communityPromptText} numberOfLines={2}>
                  {prompt.promptText}
                </Text>
                <View style={styles.communityPromptMeta}>
                  <Text style={styles.communityPromptUpvotes}>❤️ {prompt.upvotes}</Text>
                  {prompt.isCurated && (
                    <View style={styles.curatedBadge}>
                      <Text style={styles.curatedBadgeText}>Curated</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/ask')}
      >
        <Text style={styles.fabIcon}>✨</Text>
        <Text style={styles.fabText}>Ask Sage</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const createStyles = (colors: ReturnType<typeof getThemedColors>, isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  dateText: {
    ...TYPOGRAPHY.styles.label,
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  greetingText: {
    ...TYPOGRAPHY.styles.h2,
    color: colors.text,
    marginTop: 4,
  },
  profileCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  profileEmoji: {
    fontSize: 20,
  },
  wisdomWidgetContainer: {
    marginHorizontal: SPACING.xl,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.xl,
    marginTop: SPACING.xl,
    gap: SPACING.md,
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: SPACING.lg,
    borderRadius: RADII.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statBoxGracePeriod: {
    borderColor: COLORS.warning,
    borderWidth: 2,
  },
  statIcon: {
    fontSize: 20,
    marginBottom: 8,
  },
  statValue: {
    ...TYPOGRAPHY.styles.h2,
    color: colors.text,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textMuted,
    marginTop: 2,
  },
  section: {
    marginTop: SPACING.xxxl,
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
  carousel: {
    paddingLeft: SPACING.xl,
  },
  carouselCard: {
    width: 240,
    marginRight: SPACING.md,
  },
  carouselImagePlaceholder: {
    width: '100%',
    height: 160,
    backgroundColor: colors.surfaceAlt,
    borderRadius: RADII.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  carouselEmoji: {
    fontSize: 40,
  },
  timeBadge: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADII.sm,
  },
  timeBadgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '700',
  },
  carouselCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  carouselCardSubtitle: {
    ...TYPOGRAPHY.styles.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  journeyCard: {
    width: 200,
    marginRight: SPACING.md,
  },
  journeyImagePlaceholder: {
    width: '100%',
    height: 120,
    borderRadius: RADII.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    position: 'relative',
  },
  journeyEmoji: {
    fontSize: 36,
  },
  daysBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: RADII.sm,
  },
  daysBadgeText: {
    color: COLORS.white,
    fontSize: 9,
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
  journeyCardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  journeyCardSubtitle: {
    ...TYPOGRAPHY.styles.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  journeyProgress: {
    marginTop: SPACING.xs,
  },
  journeyProgressBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  journeyProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  journeyProgressText: {
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 2,
  },
  bottomSpacer: {
    height: 40,
  },
  motivationalContainer: {
    marginHorizontal: SPACING.xl,
    marginTop: SPACING.md,
    padding: SPACING.md,
    backgroundColor: colors.surfaceAlt,
    borderRadius: RADII.md,
    alignItems: 'center',
  },
  motivationalText: {
    ...TYPOGRAPHY.styles.body,
    color: colors.textSecondary,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  longestStreakText: {
    ...TYPOGRAPHY.styles.caption,
    color: colors.textMuted,
    marginTop: SPACING.xs,
  },
  gracePeriodBanner: {
    marginHorizontal: SPACING.xl,
    marginTop: SPACING.md,
    padding: SPACING.md,
    backgroundColor: isDark ? 'rgba(245, 158, 11, 0.15)' : 'rgba(245, 158, 11, 0.1)',
    borderRadius: RADII.md,
    borderWidth: 1,
    borderColor: COLORS.warning,
    flexDirection: 'row',
    alignItems: 'center',
  },
  gracePeriodIcon: {
    fontSize: 24,
    marginRight: SPACING.md,
  },
  gracePeriodTextContainer: {
    flex: 1,
  },
  gracePeriodTitle: {
    ...TYPOGRAPHY.styles.bodyBold,
    color: colors.text,
  },
  gracePeriodSubtitle: {
    ...TYPOGRAPHY.styles.caption,
    color: colors.textSecondary,
    marginTop: 2,
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
    fontSize: 20,
    marginRight: 8,
  },
  fabText: {
    color: COLORS.primaryText,
    fontWeight: '800',
    fontSize: 16,
  },
  communityPromptsContainer: {
    paddingHorizontal: SPACING.xl,
  },
  communityPromptCard: {
    backgroundColor: colors.surface,
    borderRadius: RADII.md,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: SPACING.md,
  },
  communityPromptText: {
    ...TYPOGRAPHY.styles.body,
    color: colors.text,
    lineHeight: 22,
    marginBottom: SPACING.sm,
  },
  communityPromptMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  communityPromptUpvotes: {
    ...TYPOGRAPHY.styles.caption,
    color: colors.textSecondary,
  },
  curatedBadge: {
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
  // Recent Questions styles
  recentQuestionsContainer: {
    paddingHorizontal: SPACING.xl,
  },
  recentQuestionCard: {
    backgroundColor: colors.surface,
    borderRadius: RADII.md,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: SPACING.md,
  },
  recentQuestionContent: {
    marginBottom: SPACING.sm,
  },
  recentQuestionText: {
    ...TYPOGRAPHY.styles.body,
    color: colors.text,
    fontWeight: '600',
    lineHeight: 22,
    marginBottom: SPACING.xs,
  },
  recentQuestionPreview: {
    ...TYPOGRAPHY.styles.caption,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  recentQuestionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recentQuestionTime: {
    ...TYPOGRAPHY.styles.caption,
    color: colors.textMuted,
  },
  reaskButton: {
    backgroundColor: isDark ? 'rgba(55, 236, 19, 0.15)' : 'rgba(55, 236, 19, 0.1)',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADII.full,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  reaskButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
  },
  // Wisdom Library styles
  wisdomLibraryCard: {
    marginHorizontal: SPACING.xl,
    backgroundColor: colors.surface,
    borderRadius: RADII.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...SHADOWS.sm,
  },
  wisdomLibraryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  wisdomLibraryIcon: {
    fontSize: 32,
    marginRight: SPACING.md,
  },
  wisdomLibraryText: {
    flex: 1,
  },
  wisdomLibraryTitle: {
    ...TYPOGRAPHY.styles.h4,
    color: colors.text,
    marginBottom: 2,
  },
  wisdomLibrarySubtitle: {
    ...TYPOGRAPHY.styles.caption,
    color: colors.textSecondary,
  },
  wisdomLibraryArrow: {
    fontSize: 24,
    color: COLORS.primary,
    fontWeight: '300',
  },
});
