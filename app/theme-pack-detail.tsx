import { router, useLocalSearchParams, Href } from 'expo-router';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { COLORS, SPACING, RADII, TYPOGRAPHY, getThemedColors, withAlpha } from '../lib/ui/theme';
import { useSageStore } from '../lib/storage/store';
import { getThemePackById, isDayUnlocked, getProgressPercentage, getNextAvailableDay, getThemeImage } from '../lib/theme-packs';
import type { ThemePackDay, ThemePackProgress } from '../lib/theme-packs';
import { AppHeader } from '../components/navigation';

function DayCard({
  day,
  progress,
  packId,
  packColor,
  colors,
  onPress,
}: {
  day: ThemePackDay;
  progress: ThemePackProgress | null;
  packId: string;
  packColor: string;
  colors: ReturnType<typeof getThemedColors>;
  onPress: () => void;
}) {
  const isUnlocked = isDayUnlocked(day.dayNumber, progress);
  const isCompleted = progress?.completedDays.includes(day.dayNumber) ?? false;
  const isCurrent = progress ? day.dayNumber === getNextAvailableDay({ id: packId, dayCount: 7 } as any, progress) : day.dayNumber === 1;

  return (
    <TouchableOpacity
      style={[
        styles.dayCard,
        {
          backgroundColor: colors.surface,
          borderColor: isCurrent ? packColor : colors.border,
          borderWidth: isCurrent ? 2 : 1,
          opacity: isUnlocked ? 1 : 0.5,
        },
      ]}
      onPress={onPress}
      disabled={!isUnlocked}
      testID={`day-card-${day.dayNumber}`}
    >
      <View style={styles.dayCardLeft}>
        <View
          style={[
            styles.dayNumber,
            {
              backgroundColor: isCompleted ? packColor : withAlpha(packColor, 0.15),
            },
          ]}
        >
          {isCompleted ? (
            <Text style={styles.dayNumberTextComplete}>✓</Text>
          ) : (
            <Text
              style={[
                styles.dayNumberText,
                { color: isCompleted ? COLORS.white : packColor },
              ]}
            >
              {day.dayNumber}
            </Text>
          )}
        </View>
        <View style={styles.dayCardContent}>
          <Text style={[styles.dayTitle, { color: colors.text }]}>
            {day.title}
          </Text>
          <Text style={[styles.daySubtitle, { color: colors.textSecondary }]}>
            {day.subtitle}
          </Text>
        </View>
      </View>
      {isUnlocked && (
        <Text style={[styles.dayArrow, { color: colors.textMuted }]}>
          {isCompleted ? '↺' : '→'}
        </Text>
      )}
      {!isUnlocked && (
        <Text style={[styles.lockIcon, { color: colors.textMuted }]}>🔒</Text>
      )}
    </TouchableOpacity>
  );
}

export default function ThemePackDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);

  const getThemePackProgress = useSageStore((s) => s.getThemePackProgress);
  const startThemePack = useSageStore((s) => s.startThemePack);

  const pack = id ? getThemePackById(id) : null;
  const progress = id ? getThemePackProgress(id) : null;

  if (!pack) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: colors.text }]}>
            Pack not found
          </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={[styles.errorLink, { color: COLORS.primary }]}>
              Go back
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const progressPercent = getProgressPercentage(progress);
  const isStarted = progress !== null;
  const isComplete = progress?.isComplete ?? false;

  const handleStartPack = () => {
    startThemePack(pack.id);
    // Navigate to the first day
    router.push(`/theme-pack-day?packId=${pack.id}&day=1` as Href);
  };

  const handleDayPress = (dayNumber: number) => {
    router.push(`/theme-pack-day?packId=${pack.id}&day=${dayNumber}` as Href);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader
        variant="back"
        title={pack.title}
        showProfile={false}
        testID="theme-pack-detail-header"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View
          style={[
            styles.heroSection,
            { backgroundColor: withAlpha(pack.color, 0.15) },
          ]}
        >
          {getThemeImage(pack.image) ? (
            <Image
              source={getThemeImage(pack.image)!}
              style={styles.heroImage}
              resizeMode="contain"
            />
          ) : (
            <Text style={styles.heroIcon}>{pack.icon}</Text>
          )}
          <Text style={[styles.heroTitle, { color: colors.text }]}>
            {pack.title}
          </Text>
          <Text style={[styles.heroDescription, { color: colors.textSecondary }]}>
            {pack.description}
          </Text>
          {isStarted && (
            <View style={styles.progressInfo}>
              <View style={[styles.progressBarBg, { backgroundColor: withAlpha(pack.color, 0.3) }]}>
                <View
                  style={[
                    styles.progressBarFill,
                    {
                      width: `${progressPercent}%`,
                      backgroundColor: pack.color,
                    },
                  ]}
                />
              </View>
              <Text style={[styles.progressText, { color: colors.textSecondary }]}>
                {progress?.completedDays.length ?? 0} of {pack.dayCount} days completed
              </Text>
            </View>
          )}
        </View>

        {/* Start Button (if not started) */}
        {!isStarted && (
          <TouchableOpacity
            style={[styles.startButton, { backgroundColor: pack.color }]}
            onPress={handleStartPack}
            testID="start-journey-button"
          >
            <Text style={[styles.startButtonText, { color: COLORS.primaryText }]}>
              Begin Your Journey
            </Text>
          </TouchableOpacity>
        )}

        {/* Days List */}
        <View style={styles.daysSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {isStarted ? 'Your Journey' : 'Preview the Journey'}
          </Text>
          {pack.days.map((day) => (
            <DayCard
              key={day.dayNumber}
              day={day}
              progress={progress}
              packId={pack.id}
              packColor={pack.color}
              colors={colors}
              onPress={() => handleDayPress(day.dayNumber)}
            />
          ))}
        </View>

        {/* Completion Message */}
        {isComplete && (
          <View style={[styles.completionCard, { backgroundColor: withAlpha(pack.color, 0.15) }]}>
            <Text style={styles.completionIcon}>🎉</Text>
            <Text style={[styles.completionTitle, { color: colors.text }]}>
              Journey Complete!
            </Text>
            <Text style={[styles.completionText, { color: colors.textSecondary }]}>
              You've completed all 7 days of this journey. Feel free to revisit any day for continued practice.
            </Text>
          </View>
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    ...TYPOGRAPHY.styles.h3,
    marginBottom: SPACING.md,
  },
  errorLink: {
    ...TYPOGRAPHY.styles.body,
    fontWeight: '600',
  },
  heroSection: {
    padding: SPACING.xxl,
    alignItems: 'center',
  },
  heroIcon: {
    fontSize: 64,
    marginBottom: SPACING.lg,
  },
  heroImage: {
    width: 100,
    height: 100,
    marginBottom: SPACING.lg,
  },
  heroTitle: {
    ...TYPOGRAPHY.styles.h2,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  heroDescription: {
    ...TYPOGRAPHY.styles.body,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: SPACING.lg,
  },
  progressInfo: {
    width: '100%',
    marginTop: SPACING.xl,
  },
  progressBarBg: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: SPACING.xs,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    ...TYPOGRAPHY.styles.caption,
    textAlign: 'center',
  },
  startButton: {
    marginHorizontal: SPACING.xl,
    marginTop: SPACING.xl,
    paddingVertical: SPACING.lg,
    borderRadius: RADII.lg,
    alignItems: 'center',
  },
  startButtonText: {
    fontWeight: '700',
    fontSize: 16,
  },
  daysSection: {
    paddingHorizontal: SPACING.xl,
    marginTop: SPACING.xxl,
  },
  sectionTitle: {
    ...TYPOGRAPHY.styles.h4,
    marginBottom: SPACING.lg,
  },
  dayCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.md,
    borderRadius: RADII.md,
    marginBottom: SPACING.sm,
  },
  dayCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dayNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  dayNumberText: {
    fontWeight: '700',
    fontSize: 14,
  },
  dayNumberTextComplete: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 16,
  },
  dayCardContent: {
    flex: 1,
  },
  dayTitle: {
    ...TYPOGRAPHY.styles.bodyBold,
    marginBottom: 2,
  },
  daySubtitle: {
    ...TYPOGRAPHY.styles.caption,
  },
  dayArrow: {
    fontSize: 18,
    marginLeft: SPACING.sm,
  },
  lockIcon: {
    fontSize: 14,
    marginLeft: SPACING.sm,
  },
  completionCard: {
    marginHorizontal: SPACING.xl,
    marginTop: SPACING.xl,
    padding: SPACING.xl,
    borderRadius: RADII.lg,
    alignItems: 'center',
  },
  completionIcon: {
    fontSize: 48,
    marginBottom: SPACING.md,
  },
  completionTitle: {
    ...TYPOGRAPHY.styles.h3,
    marginBottom: SPACING.sm,
  },
  completionText: {
    ...TYPOGRAPHY.styles.body,
    textAlign: 'center',
    lineHeight: 22,
  },
  bottomSpacer: {
    height: 40,
  },
});
