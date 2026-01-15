import { router, Href } from 'expo-router';
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
import { COLORS, SPACING, RADII, TYPOGRAPHY, SHADOWS, getThemedColors, withAlpha } from '../lib/ui/theme';
import { useSageStore } from '../lib/storage/store';
import { getAllThemePacks, getProgressPercentage, isDayUnlocked, getThemeImage } from '../lib/theme-packs';
import type { ThemePack, ThemePackProgress } from '../lib/theme-packs';
import { AppHeader } from '../components/navigation';

function PackCard({
  pack,
  progress,
  colors,
  isDark,
  onPress,
}: {
  pack: ThemePack;
  progress: ThemePackProgress | null;
  colors: ReturnType<typeof getThemedColors>;
  isDark: boolean;
  onPress: () => void;
}) {
  const progressPercent = getProgressPercentage(progress);
  const isStarted = progress !== null;
  const isComplete = progress?.isComplete ?? false;

  return (
    <TouchableOpacity
      style={[
        styles.packCard,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}
      onPress={onPress}
      testID={`theme-pack-${pack.id}`}
    >
      <View
        style={[
          styles.packHeader,
          { backgroundColor: withAlpha(pack.color, 0.15) },
        ]}
      >
        {getThemeImage(pack.image) ? (
          <Image
            source={getThemeImage(pack.image)!}
            style={styles.packImage}
            resizeMode="contain"
          />
        ) : (
          <Text style={styles.packIcon}>{pack.icon}</Text>
        )}
        {isComplete && (
          <View style={styles.completeBadge}>
            <Text style={styles.completeBadgeText}>Complete</Text>
          </View>
        )}
      </View>
      <View style={styles.packContent}>
        <Text style={[styles.packTitle, { color: colors.text }]}>
          {pack.title}
        </Text>
        <Text style={[styles.packDescription, { color: colors.textSecondary }]}>
          {pack.description}
        </Text>
        <View style={styles.packMeta}>
          <View style={styles.metaItem}>
            <Text style={[styles.metaText, { color: colors.textMuted }]}>
              {pack.dayCount} days
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={[styles.metaText, { color: colors.textMuted }]}>
              ~{pack.estimatedMinutesPerDay} min/day
            </Text>
          </View>
        </View>
        {isStarted && (
          <View style={styles.progressContainer}>
            <View style={[styles.progressBarBg, { backgroundColor: colors.borderLight }]}>
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
            <Text style={[styles.progressText, { color: colors.textMuted }]}>
              {progress?.completedDays.length ?? 0} of {pack.dayCount} days
            </Text>
          </View>
        )}
        <TouchableOpacity
          style={[
            styles.packButton,
            {
              backgroundColor: isStarted ? withAlpha(pack.color, 0.15) : pack.color,
            },
          ]}
          onPress={onPress}
        >
          <Text
            style={[
              styles.packButtonText,
              {
                color: isStarted ? pack.color : COLORS.primaryText,
              },
            ]}
          >
            {isComplete ? 'Review Journey' : isStarted ? 'Continue' : 'Begin Journey'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

export default function ThemePacksScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);

  const themePackProgress = useSageStore((s) => s.themePackProgress);
  const packs = getAllThemePacks();

  const handlePackPress = (pack: ThemePack) => {
    router.push(`/theme-pack-detail?id=${pack.id}` as Href);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader
        variant="back"
        title="7-Day Journeys"
        showProfile={false}
        testID="theme-packs-header"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.introText, { color: colors.textSecondary }]}>
          Embark on a curated 7-day journey into a specific theme. Each day unlocks
          new prompts and practices for deep exploration.
        </Text>

        {packs.map((pack) => (
          <PackCard
            key={pack.id}
            pack={pack}
            progress={themePackProgress[pack.id] ?? null}
            colors={colors}
            isDark={isDark}
            onPress={() => handlePackPress(pack)}
          />
        ))}

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
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.lg,
  },
  introText: {
    ...TYPOGRAPHY.styles.body,
    marginBottom: SPACING.xl,
    lineHeight: 22,
  },
  packCard: {
    borderRadius: RADII.lg,
    borderWidth: 1,
    marginBottom: SPACING.lg,
    overflow: 'hidden',
  },
  packHeader: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  packIcon: {
    fontSize: 48,
  },
  packImage: {
    width: 80,
    height: 80,
  },
  completeBadge: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    backgroundColor: COLORS.success,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADII.sm,
  },
  completeBadgeText: {
    color: COLORS.primaryText,
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  packContent: {
    padding: SPACING.lg,
  },
  packTitle: {
    ...TYPOGRAPHY.styles.h3,
    marginBottom: SPACING.xs,
  },
  packDescription: {
    ...TYPOGRAPHY.styles.body,
    marginBottom: SPACING.md,
    lineHeight: 20,
  },
  packMeta: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
    gap: SPACING.lg,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    ...TYPOGRAPHY.styles.caption,
  },
  progressContainer: {
    marginBottom: SPACING.md,
  },
  progressBarBg: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: SPACING.xs,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    ...TYPOGRAPHY.styles.caption,
  },
  packButton: {
    paddingVertical: SPACING.md,
    borderRadius: RADII.md,
    alignItems: 'center',
  },
  packButtonText: {
    fontWeight: '700',
    fontSize: 14,
  },
  bottomSpacer: {
    height: 40,
  },
});
