import { useState, useEffect } from 'react';
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
import { BiometricGate } from '../../components/auth/BiometricGate';

const DAILY_PROMPT = "What energy are you bringing into your space today?";

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

  const handleEntryPress = (entry: JournalEntry) => {
    setSelectedEntry(entry);
    setIsDetailModalVisible(true);
  };

  const renderEntry = ({ item }: { item: JournalEntry }) => (
    <TouchableOpacity
      style={styles.entryCard}
      key={item.id}
      onPress={() => handleEntryPress(item)}
      testID={`journal-entry-${item.id}`}
    >
      <View style={styles.entryIconContainer}>
        <Text style={styles.entryIcon}>📝</Text>
      </View>
      <View style={styles.entryContent}>
        <View style={styles.entryHeader}>
          <Text style={styles.entryDate}>
            {new Date(item.createdAt).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric'
            })}
          </Text>
          <Text style={styles.entryTime}>
            {new Date(item.createdAt).toLocaleTimeString(undefined, {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Text>
        </View>
        <Text style={styles.entryText} numberOfLines={2}>{item.content}</Text>
        {item.mood && (
          <View style={styles.moodBadge}>
            <Text style={styles.moodText}>{item.mood}</Text>
          </View>
        )}
      </View>
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );

  return (
    <BiometricGate>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Journal</Text>
          <Text style={styles.subtitle}>Your private sanctuary</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
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

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Entries</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {journalEntries.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>📔</Text>
              <Text style={styles.emptyText}>No entries yet. Start capturing your thoughts.</Text>
            </View>
          ) : (
            journalEntries.map((entry) => renderEntry({ item: entry }))
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
      </SafeAreaView>
    </BiometricGate>
  );
}

const createStyles = (colors: ReturnType<typeof getThemedColors>, isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  title: {
    ...TYPOGRAPHY.styles.h1,
    color: colors.text,
  },
  subtitle: {
    ...TYPOGRAPHY.styles.body,
    color: colors.textSecondary,
    marginTop: 2,
  },
  scrollContainer: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: 100,
  },
  promptCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: RADII.lg,
    padding: SPACING.xl,
    marginTop: SPACING.md,
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
  seeAllText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  entryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: SPACING.lg,
    borderRadius: RADII.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  entryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: RADII.sm,
    backgroundColor: colors.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  entryIcon: {
    fontSize: 24,
  },
  entryContent: {
    flex: 1,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  entryDate: {
    ...TYPOGRAPHY.styles.bodyBold,
    color: colors.text,
  },
  entryTime: {
    ...TYPOGRAPHY.styles.caption,
    color: colors.textMuted,
  },
  entryText: {
    ...TYPOGRAPHY.styles.body,
    color: colors.textSecondary,
  },
  moodBadge: {
    alignSelf: 'flex-start',
    marginTop: SPACING.sm,
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADII.sm,
  },
  moodText: {
    fontSize: 11,
    color: colors.textMuted,
  },
  chevron: {
    fontSize: 24,
    color: colors.textMuted,
    marginLeft: SPACING.sm,
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
    color: COLORS.primaryText,
    fontSize: 32,
    fontWeight: '300',
  },
});
