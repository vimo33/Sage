import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
  getThemedColors,
} from '../../lib/ui/theme';
import type { ThemePack, ThemePackProgress } from '../../lib/theme-packs/types';
import { RecentJourneyCard } from './RecentJourneyCard';

interface RecentJourneyCarouselProps {
  /** Array of theme packs that have been started (in progress or recent) */
  journeys: ThemePack[];
  /** Progress records keyed by pack ID */
  progress: Record<string, ThemePackProgress>;
  /** Callback when a journey card is pressed */
  onJourneyPress: (journeyId: string) => void;
  /** Callback when "See All" is pressed */
  onSeeAllPress?: () => void;
  /** Optional section title override */
  sectionTitle?: string;
  /** Optional test ID prefix */
  testID?: string;
}

/**
 * RecentJourneyCarousel - A horizontal scrollable list of recent/active journeys
 *
 * Features:
 * - Section header with title and "See All" link
 * - Horizontal scrolling list of RecentJourneyCard components
 * - Shows only journeys that have been started (have progress)
 * - Cards show icon, title, duration, relative time, and navigation chevron
 */
export function RecentJourneyCarousel({
  journeys,
  progress,
  onJourneyPress,
  onSeeAllPress,
  sectionTitle = 'Continue Your Journey',
  testID = 'recent-journey-carousel',
}: RecentJourneyCarouselProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);
  const styles = createStyles(colors, isDark);

  // Filter to only journeys with progress (started journeys)
  const activeJourneys = journeys.filter((pack) => {
    const packProgress = progress[pack.id];
    return packProgress && !packProgress.isComplete;
  });

  // Sort by most recently active
  const sortedJourneys = [...activeJourneys].sort((a, b) => {
    const progressA = progress[a.id];
    const progressB = progress[b.id];
    return (progressB?.lastActivityAt ?? 0) - (progressA?.lastActivityAt ?? 0);
  });

  // Don't render if no active journeys
  if (sortedJourneys.length === 0) {
    return null;
  }

  return (
    <View style={styles.section} testID={testID}>
      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle} testID={`${testID}-title`}>
          {sectionTitle}
        </Text>
        {onSeeAllPress && (
          <TouchableOpacity
            onPress={onSeeAllPress}
            testID={`${testID}-see-all`}
          >
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Horizontal Scrolling Carousel */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.carousel}
        contentContainerStyle={styles.carouselContent}
        testID={`${testID}-scroll-view`}
      >
        {sortedJourneys.map((pack) => (
          <RecentJourneyCard
            key={pack.id}
            pack={pack}
            progress={progress[pack.id]!}
            onPress={() => onJourneyPress(pack.id)}
            testID={`${testID}-card-${pack.id}`}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const createStyles = (colors: ReturnType<typeof getThemedColors>, isDark: boolean) =>
  StyleSheet.create({
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
    carouselContent: {
      paddingRight: SPACING.xl,
    },
  });

export default RecentJourneyCarousel;
