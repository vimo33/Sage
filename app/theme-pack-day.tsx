import { router, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { COLORS, SPACING, RADII, TYPOGRAPHY, getThemedColors, withAlpha } from '../lib/ui/theme';
import { useSageStore } from '../lib/storage/store';
import { getThemePackById, getThemePackDay, isDayUnlocked } from '../lib/theme-packs';
import { AppHeader } from '../components/navigation';

type ContentSection = 'opening' | 'teaching' | 'practice' | 'closing' | 'complete';

export default function ThemePackDayScreen() {
  const { packId, day } = useLocalSearchParams<{ packId: string; day: string }>();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);

  const getThemePackProgress = useSageStore((s) => s.getThemePackProgress);
  const startThemePackDay = useSageStore((s) => s.startThemePackDay);
  const completeThemePackDay = useSageStore((s) => s.completeThemePackDay);
  const cancelThemePackSession = useSageStore((s) => s.cancelThemePackSession);

  const [currentSection, setCurrentSection] = useState<ContentSection>('opening');
  const [userReflection, setUserReflection] = useState('');
  const [hasStarted, setHasStarted] = useState(false);

  const pack = packId ? getThemePackById(packId) : null;
  const dayNumber = day ? parseInt(day, 10) : 0;
  const dayContent = packId && dayNumber ? getThemePackDay(packId, dayNumber) : null;
  const progress = packId ? getThemePackProgress(packId) : null;

  const isUnlocked = pack && progress ? isDayUnlocked(dayNumber, progress) : dayNumber === 1;
  const isAlreadyCompleted = progress?.completedDays.includes(dayNumber) ?? false;

  useEffect(() => {
    if (packId && dayNumber && isUnlocked && !hasStarted) {
      startThemePackDay(packId, dayNumber);
      setHasStarted(true);
    }
  }, [packId, dayNumber, isUnlocked, hasStarted, startThemePackDay]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (hasStarted && currentSection !== 'complete') {
        cancelThemePackSession();
      }
    };
  }, [hasStarted, currentSection, cancelThemePackSession]);

  if (!pack || !dayContent) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: colors.text }]}>
            Day not found
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

  if (!isUnlocked) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.errorContainer}>
          <Text style={styles.lockIconLarge}>🔒</Text>
          <Text style={[styles.errorText, { color: colors.text }]}>
            Day {dayNumber} is locked
          </Text>
          <Text style={[styles.lockMessage, { color: colors.textSecondary }]}>
            Complete previous days to unlock this content.
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

  const handleNext = () => {
    const sections: ContentSection[] = ['opening', 'teaching', 'practice', 'closing', 'complete'];
    const currentIndex = sections.indexOf(currentSection);
    if (currentIndex < sections.length - 1) {
      setCurrentSection(sections[currentIndex + 1]);
    }
  };

  const handleComplete = () => {
    if (packId && dayNumber) {
      completeThemePackDay(packId, dayNumber, userReflection || undefined);
      setCurrentSection('complete');
    }
  };

  const handleClose = () => {
    router.back();
  };

  const renderSectionIndicator = () => {
    const sections: ContentSection[] = ['opening', 'teaching', 'practice', 'closing'];
    const currentIndex = sections.indexOf(currentSection);

    return (
      <View style={styles.sectionIndicator}>
        {sections.map((section, index) => (
          <View
            key={section}
            style={[
              styles.indicatorDot,
              {
                backgroundColor:
                  index <= currentIndex ? pack.color : withAlpha(pack.color, 0.3),
              },
            ]}
          />
        ))}
      </View>
    );
  };

  const renderContent = () => {
    switch (currentSection) {
      case 'opening':
        return (
          <>
            <Text style={[styles.sectionLabel, { color: pack.color }]}>
              Opening Reflection
            </Text>
            <Text style={[styles.contentText, { color: colors.text }]}>
              {dayContent.openingReflection}
            </Text>
          </>
        );
      case 'teaching':
        return (
          <>
            <Text style={[styles.sectionLabel, { color: pack.color }]}>
              Core Teaching
            </Text>
            <Text style={[styles.contentText, { color: colors.text }]}>
              {dayContent.coreTeaching}
            </Text>
          </>
        );
      case 'practice':
        return (
          <>
            <Text style={[styles.sectionLabel, { color: pack.color }]}>
              Today's Practice
            </Text>
            <Text style={[styles.contentText, { color: colors.text }]}>
              {dayContent.practicePrompt}
            </Text>
          </>
        );
      case 'closing':
        return (
          <>
            <Text style={[styles.sectionLabel, { color: pack.color }]}>
              Closing Thought
            </Text>
            <Text style={[styles.contentText, { color: colors.text }]}>
              {dayContent.closingThought}
            </Text>
            <View style={styles.reflectionSection}>
              <Text style={[styles.reflectionLabel, { color: colors.textSecondary }]}>
                Your reflection (optional)
              </Text>
              <TextInput
                style={[
                  styles.reflectionInput,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
                multiline
                placeholder="What insights arose for you today?"
                placeholderTextColor={colors.textMuted}
                value={userReflection}
                onChangeText={setUserReflection}
                testID="reflection-input"
              />
            </View>
          </>
        );
      case 'complete':
        return (
          <View style={styles.completeSection}>
            <Text style={styles.completeIcon}>✨</Text>
            <Text style={[styles.completeTitle, { color: colors.text }]}>
              Day {dayNumber} Complete
            </Text>
            <Text style={[styles.completeSubtitle, { color: colors.textSecondary }]}>
              {dayNumber < 7
                ? `Day ${dayNumber + 1} will be available tomorrow.`
                : 'Congratulations on completing this journey!'}
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <AppHeader
          variant="close"
          title={`Day ${dayNumber}: ${dayContent.title}`}
          onBack={handleClose}
          showProfile={false}
          testID="theme-pack-day-header"
        />

        {currentSection !== 'complete' && renderSectionIndicator()}

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.contentContainer}>{renderContent()}</View>
        </ScrollView>

        {currentSection !== 'complete' && (
          <View style={[styles.footer, { borderTopColor: colors.border }]}>
            {currentSection === 'closing' ? (
              <TouchableOpacity
                style={[styles.primaryButton, { backgroundColor: pack.color }]}
                onPress={handleComplete}
                testID="complete-day-button"
              >
                <Text style={[styles.primaryButtonText, { color: COLORS.primaryText }]}>
                  {isAlreadyCompleted ? 'Review Complete' : 'Complete Day'}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.primaryButton, { backgroundColor: pack.color }]}
                onPress={handleNext}
                testID="continue-button"
              >
                <Text style={[styles.primaryButtonText, { color: COLORS.primaryText }]}>
                  Continue
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {currentSection === 'complete' && (
          <View style={[styles.footer, { borderTopColor: colors.border }]}>
            <TouchableOpacity
              style={[styles.primaryButton, { backgroundColor: pack.color }]}
              onPress={handleClose}
              testID="finish-button"
            >
              <Text style={[styles.primaryButtonText, { color: COLORS.primaryText }]}>
                Return to Journey
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  sectionIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    gap: SPACING.sm,
  },
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xxl,
  },
  contentContainer: {
    flex: 1,
  },
  sectionLabel: {
    ...TYPOGRAPHY.styles.label,
    textTransform: 'uppercase',
    marginBottom: SPACING.md,
  },
  contentText: {
    ...TYPOGRAPHY.styles.body,
    fontSize: 17,
    lineHeight: 28,
  },
  reflectionSection: {
    marginTop: SPACING.xxl,
  },
  reflectionLabel: {
    ...TYPOGRAPHY.styles.caption,
    marginBottom: SPACING.sm,
  },
  reflectionInput: {
    borderWidth: 1,
    borderRadius: RADII.md,
    padding: SPACING.md,
    minHeight: 120,
    textAlignVertical: 'top',
    fontSize: 15,
    lineHeight: 22,
  },
  completeSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.xxxl,
  },
  completeIcon: {
    fontSize: 64,
    marginBottom: SPACING.xl,
  },
  completeTitle: {
    ...TYPOGRAPHY.styles.h2,
    marginBottom: SPACING.sm,
  },
  completeSubtitle: {
    ...TYPOGRAPHY.styles.body,
    textAlign: 'center',
    paddingHorizontal: SPACING.xl,
  },
  footer: {
    padding: SPACING.lg,
    borderTopWidth: 1,
  },
  primaryButton: {
    paddingVertical: SPACING.lg,
    borderRadius: RADII.lg,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontWeight: '700',
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  lockIconLarge: {
    fontSize: 48,
    marginBottom: SPACING.lg,
  },
  errorText: {
    ...TYPOGRAPHY.styles.h3,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  lockMessage: {
    ...TYPOGRAPHY.styles.body,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  errorLink: {
    ...TYPOGRAPHY.styles.body,
    fontWeight: '600',
  },
});
