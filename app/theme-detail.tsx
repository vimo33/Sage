import { router, useLocalSearchParams, Href } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  Dimensions,
} from 'react-native';
import { useState } from 'react';
import { COLORS, SPACING, RADII, TYPOGRAPHY, getThemedColors, withAlpha, SHADOWS } from '../lib/ui/theme';
import { getExploreThemeById } from '../lib/explore-themes';
import { AppHeader } from '../components/navigation';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const GRID_GAP = SPACING.md;
const CARD_WIDTH = (SCREEN_WIDTH - SPACING.xl * 2 - GRID_GAP) / 2;

// Mock data for guided exercises
const GUIDED_EXERCISES = [
  {
    id: '1',
    title: 'Morning Reflection',
    subtitle: 'Start your day with intention',
    duration: '5 min',
    icon: '🌅',
  },
  {
    id: '2',
    title: 'Mindful Breathing',
    subtitle: 'Center yourself with breath',
    duration: '10 min',
    icon: '🌬️',
  },
  {
    id: '3',
    title: 'Body Scan',
    subtitle: 'Release tension and relax',
    duration: '15 min',
    icon: '🧘',
  },
  {
    id: '4',
    title: 'Evening Gratitude',
    subtitle: 'Reflect on your blessings',
    duration: '5 min',
    icon: '🌙',
  },
];

// Mock data for contrasts
const CONTRASTS = [
  {
    id: '1',
    concept1: 'Acceptance',
    concept2: 'Resistance',
    description: 'Understanding when to accept and when to push back',
  },
  {
    id: '2',
    concept1: 'Stillness',
    concept2: 'Movement',
    description: 'Finding balance between rest and action',
  },
];

// Mock data for FAQs
const FAQS = [
  {
    id: '1',
    question: 'How often should I practice?',
    answer: 'We recommend daily practice, even if just for 5 minutes. Consistency is more important than duration. Start small and build up gradually as the practice becomes part of your routine.',
  },
  {
    id: '2',
    question: 'What if I miss a day?',
    answer: 'Missing a day is completely normal. Simply resume your practice when you can. There\'s no need to make up for missed sessions - each moment is a fresh start.',
  },
  {
    id: '3',
    question: 'Can I combine themes?',
    answer: 'Absolutely! While focusing on one theme can deepen your understanding, exploring connections between themes often leads to richer insights and personal growth.',
  },
];

// Exercise Card Component
function ExerciseCard({
  exercise,
  themeColor,
  colors,
  onPress,
}: {
  exercise: typeof GUIDED_EXERCISES[0];
  themeColor: string;
  colors: ReturnType<typeof getThemedColors>;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[
        styles.exerciseCard,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      testID={`exercise-card-${exercise.id}`}
    >
      <View style={styles.exerciseCardContent}>
        <View style={[styles.exerciseIconContainer, { backgroundColor: withAlpha(themeColor, 0.15) }]}>
          <Text style={styles.exerciseIcon}>{exercise.icon}</Text>
        </View>
        <View style={styles.exerciseTextContent}>
          <Text style={[styles.exerciseTitle, { color: colors.text }]} numberOfLines={1}>
            {exercise.title}
          </Text>
          <Text style={[styles.exerciseSubtitle, { color: colors.textSecondary }]} numberOfLines={1}>
            {exercise.subtitle}
          </Text>
          <Text style={[styles.exerciseDuration, { color: themeColor }]}>
            {exercise.duration}
          </Text>
        </View>
        <Text style={[styles.exerciseArrow, { color: colors.textMuted }]}>›</Text>
      </View>
    </TouchableOpacity>
  );
}

// Contrast Card Component
function ContrastCard({
  contrast,
  themeColor,
  colors,
  onPress,
}: {
  contrast: typeof CONTRASTS[0];
  themeColor: string;
  colors: ReturnType<typeof getThemedColors>;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[
        styles.contrastCard,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      testID={`contrast-card-${contrast.id}`}
    >
      <View style={styles.contrastHeader}>
        <Text style={[styles.contrastConcept, { color: themeColor }]}>
          {contrast.concept1}
        </Text>
        <Text style={[styles.contrastVs, { color: colors.textMuted }]}>vs</Text>
        <Text style={[styles.contrastConcept, { color: themeColor }]}>
          {contrast.concept2}
        </Text>
      </View>
      <Text style={[styles.contrastDescription, { color: colors.textSecondary }]}>
        {contrast.description}
      </Text>
    </TouchableOpacity>
  );
}

// FAQ Accordion Component
function FAQAccordion({
  faq,
  isExpanded,
  onToggle,
  colors,
}: {
  faq: typeof FAQS[0];
  isExpanded: boolean;
  onToggle: () => void;
  colors: ReturnType<typeof getThemedColors>;
}) {
  return (
    <TouchableOpacity
      style={[
        styles.faqItem,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}
      onPress={onToggle}
      activeOpacity={0.7}
      testID={`faq-item-${faq.id}`}
    >
      <View style={styles.faqHeader}>
        <Text style={[styles.faqQuestion, { color: colors.text }]} numberOfLines={isExpanded ? undefined : 2}>
          {faq.question}
        </Text>
        <Text style={[styles.faqChevron, { color: colors.textMuted }]}>
          {isExpanded ? '▼' : '▶'}
        </Text>
      </View>
      {isExpanded && (
        <Text style={[styles.faqAnswer, { color: colors.textSecondary }]}>
          {faq.answer}
        </Text>
      )}
    </TouchableOpacity>
  );
}

export default function ThemeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);

  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  // Get theme data
  const theme = id ? getExploreThemeById(id) : null;

  // Mock progress data (could be from store in real implementation)
  const [progress] = useState({
    sessionsCompleted: 3,
    totalSessions: 10,
    currentStreak: 5,
  });

  const progressPercent = (progress.sessionsCompleted / progress.totalSessions) * 100;

  if (!theme) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <AppHeader
          variant="back"
          title="Theme"
          showProfile={false}
          testID="theme-detail-header"
        />
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: colors.text }]}>
            Theme not found
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

  const themeColor = theme.color;

  const handleStartSession = () => {
    // Navigate to the ask screen with this theme
    router.push(theme.route as Href);
  };

  const handleExercisePress = (exerciseId: string) => {
    // Navigate to exercise detail
    router.push(`/ask?theme=${theme.id}&exercise=${exerciseId}` as Href);
  };

  const handleContrastPress = (contrastId: string) => {
    // Navigate to contrast detail
    router.push(`/ask?theme=${theme.id}&contrast=${contrastId}` as Href);
  };

  const toggleFAQ = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader
        variant="back"
        title=""
        showProfile={false}
        testID="theme-detail-header"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View
          style={[
            styles.heroSection,
            { backgroundColor: withAlpha(themeColor, 0.15) },
          ]}
        >
          {/* Current Focus Label */}
          <View style={[styles.focusLabel, { backgroundColor: withAlpha(themeColor, 0.2) }]}>
            <Text style={[styles.focusLabelText, { color: themeColor }]} testID="current-focus-label">
              CURRENT FOCUS
            </Text>
          </View>

          {/* Theme Icon */}
          <Text style={styles.heroIcon}>{theme.icon}</Text>

          {/* Theme Name - Large Italic Serif */}
          <Text style={[styles.themeName, { color: colors.text }]} testID="theme-name">
            {theme.title}
          </Text>

          {/* Description */}
          <Text style={[styles.themeDescription, { color: colors.textSecondary }]} testID="theme-description">
            {theme.description}
          </Text>
        </View>

        {/* Start a Session CTA */}
        <TouchableOpacity
          style={[styles.ctaButton, { backgroundColor: themeColor }]}
          onPress={handleStartSession}
          activeOpacity={0.8}
          testID="start-session-button"
        >
          <Text style={[styles.ctaButtonText, { color: COLORS.primaryText }]}>
            Start a session
          </Text>
        </TouchableOpacity>

        {/* Progress Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]} testID="progress-section-title">
            Your Progress
          </Text>
          <View style={[styles.progressCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={styles.progressStats}>
              <View style={styles.progressStat}>
                <Text style={[styles.progressStatValue, { color: themeColor }]}>
                  {progress.sessionsCompleted}
                </Text>
                <Text style={[styles.progressStatLabel, { color: colors.textSecondary }]}>
                  Sessions
                </Text>
              </View>
              <View style={[styles.progressDivider, { backgroundColor: colors.border }]} />
              <View style={styles.progressStat}>
                <Text style={[styles.progressStatValue, { color: themeColor }]}>
                  {progress.currentStreak}
                </Text>
                <Text style={[styles.progressStatLabel, { color: colors.textSecondary }]}>
                  Day Streak
                </Text>
              </View>
            </View>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBarBg, { backgroundColor: withAlpha(themeColor, 0.2) }]}>
                <View
                  style={[
                    styles.progressBarFill,
                    {
                      width: `${progressPercent}%`,
                      backgroundColor: themeColor,
                    },
                  ]}
                />
              </View>
              <Text style={[styles.progressText, { color: colors.textSecondary }]}>
                {progress.sessionsCompleted} of {progress.totalSessions} sessions completed
              </Text>
            </View>
          </View>
        </View>

        {/* Guided Exercises Grid */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitleUppercase, { color: colors.text }]} testID="exercises-section-title">
              GUIDED EXERCISES
            </Text>
            <TouchableOpacity
              onPress={() => router.push(`/exercises?theme=${theme.id}` as Href)}
              testID="view-all-exercises-link"
            >
              <Text style={[styles.viewAllLink, { color: themeColor }]}>
                View all
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.exercisesGrid} testID="exercises-grid">
            {GUIDED_EXERCISES.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                themeColor={themeColor}
                colors={colors}
                onPress={() => handleExercisePress(exercise.id)}
              />
            ))}
          </View>
        </View>

        {/* Contrasts Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]} testID="contrasts-section-title">
            Explore Contrasts
          </Text>
          <View style={styles.contrastsList} testID="contrasts-section">
            {CONTRASTS.map((contrast) => (
              <ContrastCard
                key={contrast.id}
                contrast={contrast}
                themeColor={themeColor}
                colors={colors}
                onPress={() => handleContrastPress(contrast.id)}
              />
            ))}
          </View>
        </View>

        {/* FAQ Accordions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]} testID="faq-section-title">
            Frequently Asked Questions
          </Text>
          <View style={styles.faqList} testID="faq-section">
            {FAQS.map((faq) => (
              <FAQAccordion
                key={faq.id}
                faq={faq}
                isExpanded={expandedFAQ === faq.id}
                onToggle={() => toggleFAQ(faq.id)}
                colors={colors}
              />
            ))}
          </View>
        </View>

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
  // Hero Section
  heroSection: {
    padding: SPACING.xxl,
    alignItems: 'center',
  },
  focusLabel: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADII.full,
    marginBottom: SPACING.lg,
  },
  focusLabelText: {
    ...TYPOGRAPHY.styles.label,
    letterSpacing: 1.5,
  },
  heroIcon: {
    fontSize: 64,
    marginBottom: SPACING.lg,
  },
  themeName: {
    fontSize: 36,
    fontWeight: '700',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: SPACING.sm,
    // Note: React Native doesn't support custom serif fonts without loading them
    // Using italic style to indicate emphasis as per design intent
  },
  themeDescription: {
    ...TYPOGRAPHY.styles.body,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: SPACING.lg,
  },
  // CTA Button
  ctaButton: {
    marginHorizontal: SPACING.xl,
    marginTop: SPACING.xl,
    paddingVertical: SPACING.lg,
    borderRadius: RADII.lg,
    alignItems: 'center',
    ...SHADOWS.md,
  },
  ctaButtonText: {
    fontWeight: '700',
    fontSize: 16,
  },
  // Section styles
  section: {
    paddingHorizontal: SPACING.xl,
    marginTop: SPACING.xxxl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    ...TYPOGRAPHY.styles.h4,
    marginBottom: SPACING.lg,
  },
  sectionTitleUppercase: {
    ...TYPOGRAPHY.styles.label,
    letterSpacing: 1.5,
  },
  viewAllLink: {
    ...TYPOGRAPHY.styles.bodyBold,
    fontSize: 14,
  },
  // Progress Card
  progressCard: {
    borderRadius: RADII.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    ...SHADOWS.sm,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  progressStat: {
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  progressStatValue: {
    fontSize: 32,
    fontWeight: '700',
  },
  progressStatLabel: {
    ...TYPOGRAPHY.styles.caption,
    marginTop: SPACING.xs,
  },
  progressDivider: {
    width: 1,
    height: 40,
  },
  progressBarContainer: {
    marginTop: SPACING.sm,
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
  // Exercises Grid
  exercisesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GRID_GAP,
  },
  exerciseCard: {
    width: CARD_WIDTH,
    padding: SPACING.md,
    borderRadius: RADII.lg,
    borderWidth: 1,
    ...SHADOWS.sm,
  },
  exerciseCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exerciseIconContainer: {
    width: 44,
    height: 44,
    borderRadius: RADII.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  exerciseIcon: {
    fontSize: 22,
  },
  exerciseTextContent: {
    flex: 1,
    marginRight: SPACING.xs,
  },
  exerciseTitle: {
    ...TYPOGRAPHY.styles.bodyBold,
    fontSize: 13,
    marginBottom: 2,
  },
  exerciseSubtitle: {
    ...TYPOGRAPHY.styles.caption,
    fontSize: 11,
    marginBottom: 2,
  },
  exerciseDuration: {
    ...TYPOGRAPHY.styles.caption,
    fontSize: 10,
    fontWeight: '600',
  },
  exerciseArrow: {
    fontSize: 20,
    fontWeight: '300',
  },
  // Contrasts Section
  contrastsList: {
    gap: SPACING.md,
  },
  contrastCard: {
    borderRadius: RADII.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    ...SHADOWS.sm,
  },
  contrastHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
    gap: SPACING.sm,
  },
  contrastConcept: {
    ...TYPOGRAPHY.styles.bodyBold,
    fontWeight: '700',
  },
  contrastVs: {
    ...TYPOGRAPHY.styles.caption,
    fontStyle: 'italic',
  },
  contrastDescription: {
    ...TYPOGRAPHY.styles.body,
    textAlign: 'center',
  },
  // FAQ Accordions
  faqList: {
    gap: SPACING.sm,
  },
  faqItem: {
    borderRadius: RADII.lg,
    padding: SPACING.lg,
    borderWidth: 1,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  faqQuestion: {
    ...TYPOGRAPHY.styles.bodyBold,
    flex: 1,
    marginRight: SPACING.md,
  },
  faqChevron: {
    fontSize: 12,
    marginTop: 4,
  },
  faqAnswer: {
    ...TYPOGRAPHY.styles.body,
    marginTop: SPACING.md,
    lineHeight: 22,
  },
  bottomSpacer: {
    height: 40,
  },
});
