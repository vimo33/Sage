import { router, Href } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { COLORS, SPACING, RADII, TYPOGRAPHY, SHADOWS, withAlpha, getThemedColors } from '../lib/ui/theme';
import { getAllGuidedReflections } from '../lib/reflection';

export default function ReflectionsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);

  const allReflections = getAllGuidedReflections();

  const styles = createStyles(colors, isDark);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Guided Reflections</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.introText}>
          Choose a reflection to begin a structured journey through thoughtful prompts.
        </Text>

        <View style={styles.grid}>
          {allReflections.map((reflection) => (
            <TouchableOpacity
              key={reflection.id}
              style={styles.reflectionCard}
              onPress={() => router.push(`/guided-reflection?id=${reflection.id}` as Href)}
              testID={`reflection-card-${reflection.id}`}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.cardIcon}>{reflection.icon}</Text>
                <View style={styles.cardMeta}>
                  <Text style={styles.cardDuration}>{reflection.estimatedMinutes} min</Text>
                  <Text style={styles.cardPrompts}>{reflection.prompts.length} prompts</Text>
                </View>
              </View>
              <Text style={styles.cardTitle}>{reflection.title}</Text>
              <Text style={styles.cardDescription}>{reflection.description}</Text>
              <View style={styles.cardTheme}>
                <Text style={styles.cardThemeText}>{reflection.themeId}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: SPACING.lg,
      height: 60,
      borderBottomWidth: 1,
      borderBottomColor: withAlpha(COLORS.white, 0.05),
    },
    backBtn: {
      width: 40,
      height: 40,
      justifyContent: 'center',
    },
    backIcon: {
      color: colors.text,
      fontSize: 24,
    },
    headerTitle: {
      color: colors.text,
      fontSize: 18,
      fontWeight: '700',
    },
    placeholder: {
      width: 40,
    },
    scrollContainer: {
      padding: SPACING.xl,
      paddingBottom: 40,
    },
    introText: {
      ...TYPOGRAPHY.styles.body,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: SPACING.xxl,
      lineHeight: 22,
    },
    grid: {
      gap: SPACING.lg,
    },
    reflectionCard: {
      backgroundColor: colors.surface,
      borderRadius: RADII.lg,
      padding: SPACING.lg,
      borderWidth: 1,
      borderColor: colors.border,
      ...SHADOWS.sm,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: SPACING.md,
    },
    cardIcon: {
      fontSize: 32,
    },
    cardMeta: {
      alignItems: 'flex-end',
    },
    cardDuration: {
      ...TYPOGRAPHY.styles.caption,
      color: COLORS.primary,
      fontWeight: '600',
    },
    cardPrompts: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textMuted,
    },
    cardTitle: {
      ...TYPOGRAPHY.styles.h4,
      color: colors.text,
      marginBottom: SPACING.xs,
    },
    cardDescription: {
      ...TYPOGRAPHY.styles.body,
      color: colors.textSecondary,
      marginBottom: SPACING.md,
    },
    cardTheme: {
      alignSelf: 'flex-start',
      backgroundColor: withAlpha(COLORS.primary, 0.1),
      paddingHorizontal: SPACING.sm,
      paddingVertical: SPACING.xs,
      borderRadius: RADII.full,
    },
    cardThemeText: {
      ...TYPOGRAPHY.styles.caption,
      color: COLORS.primary,
      textTransform: 'capitalize',
    },
  });
