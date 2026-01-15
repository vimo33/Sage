import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { router, Href } from 'expo-router';
import {
  SPACING,
  TYPOGRAPHY,
  getThemedColors,
} from '../../lib/ui/theme';
import { getAllExploreThemes } from '../../lib/explore-themes';
import { ThemeCard } from './ThemeCard';

interface ThemeGridProps {
  /** Optional test ID */
  testID?: string;
}

/**
 * ThemeGrid - A 2x3 grid of theme cards for the Explore screen
 *
 * Features:
 * - 2 columns x 3 rows layout
 * - Section header
 * - Responsive card sizing
 * - Navigates to theme-specific content on tap
 */
export function ThemeGrid({ testID = 'theme-grid' }: ThemeGridProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);
  const styles = createStyles(colors);

  const themes = getAllExploreThemes();

  const handleThemePress = (route: string) => {
    router.push(route as Href);
  };

  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore Themes</Text>
      </View>
      <View style={styles.grid}>
        {themes.map((theme, index) => (
          <View
            key={theme.id}
            style={[
              styles.cardWrapper,
              // Add right margin for left column cards (odd indices 0, 2, 4)
              index % 2 === 0 && styles.cardWrapperLeft,
            ]}
          >
            <ThemeCard
              theme={theme}
              onPress={() => handleThemePress(theme.route)}
              testID={`${testID}-card-${theme.id}`}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const createStyles = (colors: ReturnType<typeof getThemedColors>) =>
  StyleSheet.create({
    container: {
      marginTop: SPACING.xxxl,
    },
    header: {
      paddingHorizontal: SPACING.xl,
      marginBottom: SPACING.lg,
    },
    title: {
      ...TYPOGRAPHY.styles.h4,
      color: colors.text,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: SPACING.xl,
    },
    cardWrapper: {
      marginBottom: SPACING.md,
    },
    cardWrapperLeft: {
      marginRight: SPACING.md,
    },
  });

export default ThemeGrid;
