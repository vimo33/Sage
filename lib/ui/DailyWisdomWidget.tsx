import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share,
  Alert,
  ActivityIndicator,
  useColorScheme,
} from 'react-native';
import { COLORS, SPACING, RADII, SHADOWS, withAlpha, TYPOGRAPHY, getThemedColors } from './theme';
import { useSageStore, type DailyWisdom } from '../storage/store';
import { getRandomWisdom, initWisdomDB, type WisdomChunk } from '../retrieval/search';

interface DailyWisdomWidgetProps {
  onPress?: () => void;
}

export function DailyWisdomWidget({ onPress }: DailyWisdomWidgetProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const dailyWisdom = useSageStore((s) => s.dailyWisdom);
  const setDailyWisdom = useSageStore((s) => s.setDailyWisdom);
  const saveInsight = useSageStore((s) => s.saveInsight);
  const savedInsights = useSageStore((s) => s.savedInsights);
  const preferences = useSageStore((s) => s.preferences);

  // Check if current wisdom is already saved
  useEffect(() => {
    if (dailyWisdom) {
      const alreadySaved = savedInsights.some(
        (insight) =>
          insight.verseContent === dailyWisdom.content &&
          insight.sourceRef === dailyWisdom.sourceRef
      );
      setIsSaved(alreadySaved);
    }
  }, [dailyWisdom, savedInsights]);

  // Load daily wisdom on mount or when date changes
  const loadDailyWisdom = useCallback(async () => {
    const today = new Date().toISOString().split('T')[0];

    // If we already have today's wisdom, skip
    if (dailyWisdom?.date === today) {
      return;
    }

    setIsLoading(true);
    try {
      await initWisdomDB();

      // Use user's preferred themes if available
      const themes = preferences.preferredThemes.length > 0
        ? preferences.preferredThemes as any[]
        : undefined;

      // Use user's preferred traditions if available
      const traditions = preferences.preferredTraditions.length > 0
        ? preferences.preferredTraditions
        : undefined;

      const wisdom = await getRandomWisdom({ themes, books: traditions });

      if (wisdom) {
        const newDailyWisdom: DailyWisdom = {
          id: wisdom.id,
          content: wisdom.content,
          sourceRef: wisdom.sourceRef,
          book: wisdom.book,
          theme: wisdom.theme,
          date: today,
        };
        setDailyWisdom(newDailyWisdom);
      }
    } catch (error) {
      console.error('[DailyWisdom] Failed to load wisdom:', error);
    } finally {
      setIsLoading(false);
    }
  }, [dailyWisdom?.date, preferences.preferredThemes, preferences.preferredTraditions, setDailyWisdom]);

  useEffect(() => {
    loadDailyWisdom();
  }, [loadDailyWisdom]);

  const handleShare = async () => {
    if (!dailyWisdom) return;

    try {
      await Share.share({
        message: `"${dailyWisdom.content}"\n\n— ${dailyWisdom.sourceRef}\n\nShared from Sage AI`,
      });
    } catch (error) {
      console.error('[DailyWisdom] Share failed:', error);
    }
  };

  const handleSave = () => {
    if (!dailyWisdom || isSaved) return;

    saveInsight({
      verseContent: dailyWisdom.content,
      sourceRef: dailyWisdom.sourceRef,
    });

    setIsSaved(true);
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      await initWisdomDB();

      const themes = preferences.preferredThemes.length > 0
        ? preferences.preferredThemes as any[]
        : undefined;

      // Use user's preferred traditions if available
      const traditions = preferences.preferredTraditions.length > 0
        ? preferences.preferredTraditions
        : undefined;

      const wisdom = await getRandomWisdom({ themes, books: traditions });
      const today = new Date().toISOString().split('T')[0];

      if (wisdom) {
        const newDailyWisdom: DailyWisdom = {
          id: wisdom.id,
          content: wisdom.content,
          sourceRef: wisdom.sourceRef,
          book: wisdom.book,
          theme: wisdom.theme,
          date: today,
        };
        setDailyWisdom(newDailyWisdom);
      }
    } catch (error) {
      console.error('[DailyWisdom] Refresh failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const styles = createStyles(colors, isDark);

  if (isLoading && !dailyWisdom) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={COLORS.primary} size="small" />
          <Text style={styles.loadingText}>Loading today's wisdom...</Text>
        </View>
      </View>
    );
  }

  if (!dailyWisdom) {
    return (
      <TouchableOpacity style={styles.container} onPress={loadDailyWisdom}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>📜</Text>
          <Text style={styles.emptyText}>Tap to load today's wisdom</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.9}
      testID="daily-wisdom-widget"
    >
      <View style={styles.header}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>DAILY WISDOM</Text>
        </View>
        <TouchableOpacity
          onPress={handleRefresh}
          style={styles.refreshButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          disabled={isLoading}
          testID="daily-wisdom-refresh"
        >
          <Text style={[styles.refreshIcon, isLoading && styles.refreshingIcon]}>
            {isLoading ? '⏳' : '🔄'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.quoteContainer}>
        <Text style={styles.quoteIcon}>"</Text>
        <Text style={styles.wisdomContent} testID="daily-wisdom-content">
          {dailyWisdom.content}
        </Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.sourceContainer}>
          <Text style={styles.sourceRef} testID="daily-wisdom-source">
            — {dailyWisdom.sourceRef}
          </Text>
          <Text style={styles.bookName}>{dailyWisdom.book}</Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            onPress={handleSave}
            style={[styles.actionButton, isSaved && styles.actionButtonDisabled]}
            disabled={isSaved}
            testID="daily-wisdom-save"
          >
            <Text style={[styles.actionIcon, isSaved && styles.savedIcon]}>
              {isSaved ? '✓' : '💾'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleShare}
            style={styles.actionButton}
            testID="daily-wisdom-share"
          >
            <Text style={styles.actionIcon}>📤</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const createStyles = (colors: ReturnType<typeof getThemedColors>, isDark: boolean) => StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: RADII.lg,
    padding: SPACING.xl,
    borderWidth: 1,
    borderColor: colors.border,
    ...SHADOWS.sm,
  },
  loadingContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.md,
  },
  loadingText: {
    color: colors.textSecondary,
    ...TYPOGRAPHY.styles.body,
  },
  emptyContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyEmoji: {
    fontSize: 32,
    marginBottom: SPACING.md,
    opacity: 0.5,
  },
  emptyText: {
    color: colors.textSecondary,
    ...TYPOGRAPHY.styles.body,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  badge: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADII.full,
    borderWidth: 1,
    borderColor: withAlpha(COLORS.primary, 0.3),
  },
  badgeText: {
    color: COLORS.primary,
    ...TYPOGRAPHY.styles.label,
  },
  refreshButton: {
    padding: SPACING.xs,
  },
  refreshIcon: {
    fontSize: 18,
    color: colors.textSecondary,
  },
  refreshingIcon: {
    opacity: 0.5,
  },
  quoteContainer: {
    marginBottom: SPACING.lg,
  },
  quoteIcon: {
    fontSize: 48,
    color: withAlpha(COLORS.primary, 0.3),
    height: 36,
    lineHeight: 56,
    marginBottom: SPACING.sm,
  },
  wisdomContent: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    lineHeight: 28,
    fontStyle: 'italic',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: SPACING.md,
    paddingTop: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: withAlpha(colors.border, 0.5),
  },
  sourceContainer: {
    flex: 1,
  },
  sourceRef: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textMuted,
  },
  bookName: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
    opacity: 0.7,
  },
  actions: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: RADII.md,
    backgroundColor: colors.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionButtonDisabled: {
    backgroundColor: COLORS.primaryLight,
    borderColor: withAlpha(COLORS.primary, 0.2),
  },
  actionIcon: {
    fontSize: 18,
    color: colors.textSecondary,
  },
  savedIcon: {
    color: COLORS.primary,
  },
});

export default DailyWisdomWidget;
