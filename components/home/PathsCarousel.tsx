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
import type { ThemePack } from '../../lib/theme-packs/types';
import { PathCard } from './PathCard';

interface PathsCarouselProps {
  /** Array of theme packs to display as paths */
  paths: ThemePack[];
  /** Callback when a path card is pressed */
  onPathPress: (pathId: string) => void;
  /** Callback when "View all" is pressed */
  onViewAllPress?: () => void;
  /** Optional section title override */
  sectionTitle?: string;
  /** Optional test ID prefix */
  testID?: string;
}

/**
 * PathsCarousel - A horizontal scrollable section of path cards
 *
 * Features:
 * - Section header with title and "View all" link
 * - Horizontal scrolling list of PathCard components
 * - Cards show thumbnail image, '7 DAYS' badge, title, description, and chevron
 */
export function PathsCarousel({
  paths,
  onPathPress,
  onViewAllPress,
  sectionTitle = 'Paths',
  testID = 'paths-carousel',
}: PathsCarouselProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);
  const styles = createStyles(colors, isDark);

  // Don't render if no paths
  if (paths.length === 0) {
    return null;
  }

  return (
    <View style={styles.section} testID={testID}>
      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle} testID={`${testID}-title`}>
          {sectionTitle}
        </Text>
        {onViewAllPress && (
          <TouchableOpacity
            onPress={onViewAllPress}
            testID={`${testID}-view-all`}
          >
            <Text style={styles.viewAllText}>View all</Text>
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
        {paths.map((pack) => (
          <PathCard
            key={pack.id}
            pack={pack}
            onPress={() => onPathPress(pack.id)}
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
    viewAllText: {
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

export default PathsCarousel;
