import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSageStore, type JournalEntry } from '../../lib/storage/store';
import { COLORS, SPACING, RADII, TYPOGRAPHY, SHADOWS, withAlpha, getThemedColors } from '../../lib/ui/theme';
import { JournalEntryModal } from '../../components/journal/JournalEntryModal';
import { JournalEntryDetailModal } from '../../components/journal/JournalEntryDetailModal';
import { JournalCalendarHeader } from '../../components/journal/JournalCalendarHeader';
import { JournalWeekStrip } from '../../components/journal/JournalWeekStrip';
import { JournalCalendarModal } from '../../components/journal/JournalCalendarModal';
import { JournalEmptyState } from '../../components/journal/JournalEmptyState';
import { BiometricGate } from '../../components/auth/BiometricGate';
import { TagChip } from '../../components/insights/TagChip';

const DAILY_PROMPT = "What energy are you bringing into your space today?";

/**
 * Check if two dates are the same day
 */
function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * Filter entries by selected date
 */
function filterEntriesByDate(entries: JournalEntry[], selectedDate: Date): JournalEntry[] {
  return entries.filter((entry) => {
    const entryDate = new Date(entry.createdAt);
    return isSameDay(entryDate, selectedDate);
  });
}

export default function JournalScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);
  const router = useRouter();
  const { openModal } = useLocalSearchParams<{ openModal?: string }>();

  const journalEntries = useSageStore((s) => s.journalEntries);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [usePrompt, setUsePrompt] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);

  // Calendar navigation state
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCalendarModalVisible, setIsCalendarModalVisible] = useState(false);

  // Handle quick action: open modal when navigated with openModal param
  useEffect(() => {
    if (openModal === 'true') {
      setUsePrompt(false);
      setIsModalVisible(true);
      // Clear the param to prevent reopening on re-render
      router.setParams({ openModal: undefined });
    }
  }, [openModal, router]);

  const styles = createStyles(colors, isDark);

  // Get entry timestamps for dot indicators
  const entryDates = useMemo(() => {
    return journalEntries.map((entry) => entry.createdAt);
  }, [journalEntries]);

  // Filter entries by selected date
  const filteredEntries = useMemo(() => {
    return filterEntriesByDate(journalEntries, selectedDate);
  }, [journalEntries, selectedDate]);

  // Check if selected date is today
  const isToday = useMemo(() => {
    return isSameDay(selectedDate, new Date());
  }, [selectedDate]);

  const handleEntryPress = (entry: JournalEntry) => {
    setSelectedEntry(entry);
    setIsDetailModalVisible(true);
  };

  const handleDaySelect = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  const handleMonthYearSelect = useCallback((date: Date) => {
    setSelectedDate(date);
    setIsCalendarModalVisible(false);
  }, []);

  const handleMenuPress = useCallback(() => {
    // Hamburger menu functionality - can be expanded later
    // For now, could navigate to settings or show a drawer
    router.push('/settings');
  }, [router]);

  const handleCalendarPress = useCallback(() => {
    setIsCalendarModalVisible(true);
  }, []);

  // Format selected date for display
  const formattedSelectedDate = useMemo(() => {
    if (isToday) {
      return 'Today';
    }
    return selectedDate.toLocaleDateString(undefined, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  }, [selectedDate, isToday]);

  // Get icon and color based on mood or default
  const getEntryIconConfig = (mood?: string) => {
    const moodConfigs: Record<string, { icon: string; color: string }> = {
      'grateful': { icon: '🙏', color: '#37ec13' },
      'peaceful': { icon: '🕊️', color: '#3b82f6' },
      'reflective': { icon: '🪷', color: '#a855f7' },
      'inspired': { icon: '✨', color: '#f97316' },
      'hopeful': { icon: '🌅', color: '#ec4899' },
      'calm': { icon: '🌊', color: '#14b8a6' },
      'joyful': { icon: '☀️', color: '#fbbf24' },
      'anxious': { icon: '🌀', color: '#6366f1' },
      'sad': { icon: '🌧️', color: '#64748b' },
      'tired': { icon: '🌙', color: '#8b5cf6' },
    };
    return moodConfigs[mood?.toLowerCase() ?? ''] ?? { icon: '📝', color: COLORS.primary };
  };

  // Generate a title from content if not provided
  const getEntryTitle = (entry: JournalEntry) => {
    if (entry.title) return entry.title;
    // Generate title from first line or first few words
    const firstLine = entry.content.split('\n')[0];
    const words = firstLine.split(' ').slice(0, 5).join(' ');
    return words.length < firstLine.length ? `${words}...` : words;
  };

  const renderEntry = ({ item }: { item: JournalEntry }) => {
    const iconConfig = getEntryIconConfig(item.mood);
    const entryTitle = getEntryTitle(item);

    return (
      <TouchableOpacity
        style={styles.entryCard}
        key={item.id}
        onPress={() => handleEntryPress(item)}
        testID={`journal-entry-${item.id}`}
      >
        {/* Colored Icon Circle */}
        <View style={[styles.entryIconContainer, { backgroundColor: withAlpha(iconConfig.color, 0.15) }]}>
          <Text style={styles.entryIcon}>{iconConfig.icon}</Text>
        </View>

        <View style={styles.entryContent}>
          {/* Header with Title and Right-Aligned Date/Time */}
          <View style={styles.entryHeader}>
            <Text style={styles.entryTitle} numberOfLines={1}>{entryTitle}</Text>
            <View style={styles.entryDateTime}>
              <Text style={styles.entryDate}>
                {new Date(item.createdAt).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric'
                })}
              </Text>
              <Text style={styles.entryTimeSeparator}>·</Text>
              <Text style={styles.entryTime}>
                {new Date(item.createdAt).toLocaleTimeString(undefined, {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </Text>
            </View>
          </View>

          {/* 2-line Preview Text */}
          <Text style={styles.entryText} numberOfLines={2}>{item.content}</Text>

          {/* Tag Chips at Bottom */}
          {(item.tags && item.tags.length > 0 || item.mood) && (
            <View style={styles.entryTagsContainer}>
              {item.mood && (
                <TagChip tag={item.mood} size="small" testID={`entry-mood-${item.id}`} />
              )}
              {item.tags?.map((tag, index) => (
                <TagChip key={`${item.id}-tag-${index}`} tag={tag} size="small" testID={`entry-tag-${item.id}-${index}`} />
              ))}
            </View>
          )}
        </View>

        <Text style={styles.chevron}>›</Text>
      </TouchableOpacity>
    );
  };

  return (
    <BiometricGate>
      <SafeAreaView style={styles.container}>
        {/* Calendar Header with hamburger menu, title, and calendar icon */}
        <JournalCalendarHeader
          onMenuPress={handleMenuPress}
          onCalendarPress={handleCalendarPress}
          testID="journal-calendar-header"
        />

        {/* Week Strip with month/year selector and day dots */}
        <JournalWeekStrip
          selectedDate={selectedDate}
          onDaySelect={handleDaySelect}
          onMonthYearPress={() => setIsCalendarModalVisible(true)}
          entryDates={entryDates}
          testID="journal-week-strip"
        />

        {/* Selected Date Label */}
        <View style={styles.selectedDateContainer}>
          <Text style={styles.selectedDateText}>{formattedSelectedDate}</Text>
          {!isToday && (
            <TouchableOpacity
              style={styles.todayButton}
              onPress={() => setSelectedDate(new Date())}
              testID="journal-go-to-today"
            >
              <Text style={styles.todayButtonText}>Go to Today</Text>
            </TouchableOpacity>
          )}
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Daily Prompt Card - only show for today */}
          {isToday && (
            <TouchableOpacity
              style={styles.promptCard}
              onPress={() => {
                setUsePrompt(true);
                setIsModalVisible(true);
              }}
              testID="daily-prompt-card"
            >
              <View style={styles.promptBadge}>
                <Text style={styles.promptBadgeText}>DAILY PROMPT</Text>
              </View>
              <Text style={styles.promptTitle}>
                {DAILY_PROMPT}
              </Text>
              <Text style={styles.promptSubtitle}>Take a moment to center yourself.</Text>
              <View style={styles.promptFooter}>
                <View style={styles.promptIconCircle}>
                  <Text style={styles.promptIcon}>→</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {isToday ? 'Today\'s Entries' : 'Entries'}
            </Text>
            <Text style={styles.entryCountText}>
              {filteredEntries.length} {filteredEntries.length === 1 ? 'entry' : 'entries'}
            </Text>
          </View>

          {filteredEntries.length === 0 ? (
            // Show rich empty state when journal is completely empty, simple state otherwise
            journalEntries.length === 0 ? (
              <JournalEmptyState isDark={isDark} />
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyEmoji}>📔</Text>
                <Text style={styles.emptyText}>
                  No entries for this day.
                </Text>
              </View>
            )
          ) : (
            filteredEntries.map((entry) => renderEntry({ item: entry }))
          )}
        </ScrollView>

        <TouchableOpacity
          style={styles.fab}
          onPress={() => {
            setUsePrompt(false);
            setIsModalVisible(true);
          }}
          testID="journal-fab"
        >
          <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>

        <JournalEntryModal
          visible={isModalVisible}
          onClose={() => {
            setIsModalVisible(false);
            setUsePrompt(false);
          }}
          dailyPrompt={usePrompt ? DAILY_PROMPT : undefined}
        />

        <JournalEntryDetailModal
          visible={isDetailModalVisible}
          entry={selectedEntry}
          onClose={() => {
            setIsDetailModalVisible(false);
            setSelectedEntry(null);
          }}
        />

        {/* Calendar Modal for month/year selection */}
        <JournalCalendarModal
          visible={isCalendarModalVisible}
          selectedDate={selectedDate}
          onSelect={handleMonthYearSelect}
          onClose={() => setIsCalendarModalVisible(false)}
          testID="journal-calendar-modal"
        />
      </SafeAreaView>
    </BiometricGate>
  );
}

const createStyles = (colors: ReturnType<typeof getThemedColors>, isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  selectedDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  selectedDateText: {
    ...TYPOGRAPHY.styles.h4,
    color: colors.text,
  },
  todayButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    backgroundColor: withAlpha(COLORS.primary, 0.15),
    borderRadius: RADII.full,
  },
  todayButtonText: {
    ...TYPOGRAPHY.styles.caption,
    color: COLORS.primary,
    fontWeight: '600',
  },
  scrollContainer: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: 100,
    paddingTop: SPACING.md,
  },
  promptCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: RADII.lg,
    padding: SPACING.xl,
    marginBottom: SPACING.xxl,
    borderWidth: 1,
    borderColor: withAlpha(COLORS.primary, 0.2),
    ...SHADOWS.md,
  },
  promptBadge: {
    backgroundColor: COLORS.primaryLight,
    alignSelf: 'flex-start',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADII.sm,
    marginBottom: SPACING.md,
  },
  promptBadgeText: {
    color: COLORS.primary,
    ...TYPOGRAPHY.styles.label,
  },
  promptTitle: {
    ...TYPOGRAPHY.styles.h3,
    color: colors.text,
    marginBottom: SPACING.sm,
  },
  promptSubtitle: {
    ...TYPOGRAPHY.styles.body,
    color: colors.textSecondary,
  },
  promptFooter: {
    alignItems: 'flex-end',
    marginTop: SPACING.md,
  },
  promptIconCircle: {
    width: 40,
    height: 40,
    borderRadius: RADII.full,
    backgroundColor: isDark ? colors.surface : COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  promptIcon: {
    color: isDark ? colors.text : COLORS.black,
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    ...TYPOGRAPHY.styles.h4,
    color: colors.text,
  },
  entryCountText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  entryCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.surface,
    padding: SPACING.lg,
    borderRadius: RADII.lg,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...SHADOWS.sm,
  },
  entryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: RADII.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  entryIcon: {
    fontSize: 22,
  },
  entryContent: {
    flex: 1,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  entryTitle: {
    ...TYPOGRAPHY.styles.bodyBold,
    color: colors.text,
    flex: 1,
    marginRight: SPACING.sm,
  },
  entryDateTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  entryDate: {
    ...TYPOGRAPHY.styles.caption,
    color: colors.textMuted,
  },
  entryTimeSeparator: {
    ...TYPOGRAPHY.styles.caption,
    color: colors.textMuted,
    marginHorizontal: 4,
  },
  entryTime: {
    ...TYPOGRAPHY.styles.caption,
    color: colors.textMuted,
  },
  entryText: {
    ...TYPOGRAPHY.styles.body,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: SPACING.sm,
  },
  entryTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
    marginTop: SPACING.xs,
  },
  chevron: {
    fontSize: 24,
    color: colors.textMuted,
    marginLeft: SPACING.sm,
    marginTop: SPACING.md,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyEmoji: {
    fontSize: 40,
    marginBottom: SPACING.md,
    opacity: 0.5,
  },
  emptyText: {
    color: colors.textMuted,
    ...TYPOGRAPHY.styles.body,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 64,
    height: 64,
    borderRadius: RADII.full,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.primary,
  },
  fabIcon: {
    color: COLORS.white,
    fontSize: 32,
    fontWeight: '300',
  },
});
