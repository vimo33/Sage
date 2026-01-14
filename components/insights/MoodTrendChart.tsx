import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  Dimensions,
} from 'react-native';
import { useSageStore, type JournalEntry } from '../../lib/storage/store';
import { COLORS, SPACING, RADII, TYPOGRAPHY, SHADOWS, withAlpha, getThemedColors } from '../../lib/ui/theme';

// Mood options with numeric values for charting (higher = more positive)
const MOOD_VALUES: Record<string, { value: number; label: string; color: string }> = {
  '😊': { value: 8, label: 'Happy', color: '#4ade80' },      // green-400
  '💪': { value: 7, label: 'Strong', color: '#22c55e' },     // green-500
  '🙏': { value: 6, label: 'Grateful', color: '#34d399' },   // emerald-400
  '😌': { value: 5, label: 'Peaceful', color: '#60a5fa' },   // blue-400
  '🤔': { value: 4, label: 'Reflective', color: '#a78bfa' }, // violet-400
  '😴': { value: 3, label: 'Tired', color: '#fbbf24' },      // amber-400
  '😔': { value: 2, label: 'Sad', color: '#fb923c' },        // orange-400
  '😤': { value: 1, label: 'Frustrated', color: '#f87171' }, // red-400
};

type TimePeriod = '7' | '30' | '90';

interface MoodDataPoint {
  date: string;
  dateLabel: string;
  mood: string;
  moodValue: number;
  moodLabel: string;
  moodColor: string;
  entryCount: number;
}

interface MoodTrendChartProps {
  testID?: string;
}

export function MoodTrendChart({ testID }: MoodTrendChartProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);

  const journalEntries = useSageStore((s) => s.journalEntries);

  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('7');
  const [selectedPoint, setSelectedPoint] = useState<MoodDataPoint | null>(null);

  const styles = createStyles(colors, isDark);

  // Calculate mood trend data based on selected period
  const moodData = useMemo(() => {
    const days = parseInt(selectedPeriod, 10);
    const now = new Date();
    const startDate = new Date(now);
    startDate.setDate(startDate.getDate() - days + 1);
    startDate.setHours(0, 0, 0, 0);

    // Group entries by day and calculate average mood
    const dailyMoods: Map<string, { moods: string[]; values: number[] }> = new Map();

    journalEntries.forEach((entry) => {
      if (!entry.mood) return;

      const entryDate = new Date(entry.createdAt);
      if (entryDate < startDate) return;

      const dateKey = entryDate.toISOString().split('T')[0];
      const moodInfo = MOOD_VALUES[entry.mood];

      if (!moodInfo) return;

      const existing = dailyMoods.get(dateKey) || { moods: [], values: [] };
      existing.moods.push(entry.mood);
      existing.values.push(moodInfo.value);
      dailyMoods.set(dateKey, existing);
    });

    // Build data points for each day in the range
    const dataPoints: MoodDataPoint[] = [];
    const currentDate = new Date(startDate);

    while (currentDate <= now) {
      const dateKey = currentDate.toISOString().split('T')[0];
      const dayData = dailyMoods.get(dateKey);

      if (dayData && dayData.moods.length > 0) {
        // Calculate average mood value
        const avgValue = dayData.values.reduce((a, b) => a + b, 0) / dayData.values.length;
        const roundedValue = Math.round(avgValue);

        // Find the mood closest to the average
        const dominantMood = dayData.moods[dayData.moods.length - 1]; // Most recent mood of the day
        const moodInfo = MOOD_VALUES[dominantMood];

        dataPoints.push({
          date: dateKey,
          dateLabel: formatDateLabel(currentDate, selectedPeriod),
          mood: dominantMood,
          moodValue: avgValue,
          moodLabel: moodInfo?.label || 'Unknown',
          moodColor: moodInfo?.color || COLORS.primary,
          entryCount: dayData.moods.length,
        });
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dataPoints;
  }, [journalEntries, selectedPeriod]);

  // Calculate chart statistics
  const stats = useMemo((): {
    average: number;
    trend: 'up' | 'down' | 'neutral';
    mostCommon: { mood: string; label: string } | null;
  } => {
    if (moodData.length === 0) {
      return { average: 0, trend: 'neutral', mostCommon: null };
    }

    const average = moodData.reduce((sum, d) => sum + d.moodValue, 0) / moodData.length;

    // Calculate trend (compare first half to second half)
    let trend: 'up' | 'down' | 'neutral' = 'neutral';
    if (moodData.length >= 4) {
      const midpoint = Math.floor(moodData.length / 2);
      const firstHalf = moodData.slice(0, midpoint);
      const secondHalf = moodData.slice(midpoint);

      const firstAvg = firstHalf.reduce((sum, d) => sum + d.moodValue, 0) / firstHalf.length;
      const secondAvg = secondHalf.reduce((sum, d) => sum + d.moodValue, 0) / secondHalf.length;

      if (secondAvg - firstAvg > 0.5) trend = 'up';
      else if (firstAvg - secondAvg > 0.5) trend = 'down';
    }

    // Find most common mood
    const moodCounts = new Map<string, number>();
    moodData.forEach((d) => {
      moodCounts.set(d.mood, (moodCounts.get(d.mood) || 0) + 1);
    });

    let mostCommon: { mood: string; label: string } | null = null;
    let maxCount = 0;
    moodCounts.forEach((count, mood) => {
      if (count > maxCount) {
        maxCount = count;
        mostCommon = { mood, label: MOOD_VALUES[mood]?.label || 'Unknown' };
      }
    });

    return { average, trend, mostCommon };
  }, [moodData]);

  const handlePeriodChange = useCallback((period: TimePeriod) => {
    setSelectedPeriod(period);
    setSelectedPoint(null);
  }, []);

  const handlePointPress = useCallback((point: MoodDataPoint) => {
    setSelectedPoint(selectedPoint?.date === point.date ? null : point);
  }, [selectedPoint]);

  // No mood data available
  if (journalEntries.filter((e) => e.mood).length === 0) {
    return (
      <View style={styles.container} testID={testID}>
        <View style={styles.header}>
          <Text style={styles.title}>Mood Trends</Text>
        </View>
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>📊</Text>
          <Text style={styles.emptyTitle}>No mood data yet</Text>
          <Text style={styles.emptySubtitle}>
            Add moods to your journal entries to see your emotional patterns here.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container} testID={testID}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Mood Trends</Text>
        <Text style={styles.subtitle}>Your emotional patterns</Text>
      </View>

      {/* Period Selector */}
      <View style={styles.periodSelector}>
        {(['7', '30', '90'] as TimePeriod[]).map((period) => (
          <TouchableOpacity
            key={period}
            style={[
              styles.periodButton,
              selectedPeriod === period && styles.periodButtonActive,
            ]}
            onPress={() => handlePeriodChange(period)}
            testID={`mood-period-${period}`}
          >
            <Text
              style={[
                styles.periodText,
                selectedPeriod === period && styles.periodTextActive,
              ]}
            >
              {period}d
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Stats Summary */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statEmoji}>
            {stats.trend === 'up' ? '📈' : stats.trend === 'down' ? '📉' : '➡️'}
          </Text>
          <Text style={styles.statLabel}>
            {stats.trend === 'up' ? 'Improving' : stats.trend === 'down' ? 'Declining' : 'Stable'}
          </Text>
        </View>
        {stats.mostCommon && (
          <View style={styles.statItem}>
            <Text style={styles.statEmoji}>{stats.mostCommon.mood}</Text>
            <Text style={styles.statLabel}>Most Common</Text>
          </View>
        )}
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{moodData.length}</Text>
          <Text style={styles.statLabel}>Days Tracked</Text>
        </View>
      </View>

      {/* Chart Area */}
      {moodData.length === 0 ? (
        <View style={styles.noDataState}>
          <Text style={styles.noDataText}>
            No mood data for the selected period
          </Text>
        </View>
      ) : (
        <View style={styles.chartContainer}>
          <LineChart
            data={moodData}
            colors={colors}
            isDark={isDark}
            selectedPoint={selectedPoint}
            onPointPress={handlePointPress}
          />
        </View>
      )}

      {/* Selected Point Detail */}
      {selectedPoint && (
        <View style={styles.detailCard}>
          <View style={styles.detailHeader}>
            <Text style={styles.detailEmoji}>{selectedPoint.mood}</Text>
            <View style={styles.detailInfo}>
              <Text style={styles.detailMood}>{selectedPoint.moodLabel}</Text>
              <Text style={styles.detailDate}>
                {new Date(selectedPoint.date).toLocaleDateString(undefined, {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                })}
              </Text>
            </View>
          </View>
          {selectedPoint.entryCount > 1 && (
            <Text style={styles.detailNote}>
              Based on {selectedPoint.entryCount} entries
            </Text>
          )}
        </View>
      )}

      {/* Mood Legend */}
      <View style={styles.legend}>
        <Text style={styles.legendTitle}>MOOD SCALE</Text>
        <View style={styles.legendItems}>
          {Object.entries(MOOD_VALUES)
            .sort((a, b) => b[1].value - a[1].value)
            .slice(0, 4)
            .map(([emoji, info]) => (
              <View key={emoji} style={styles.legendItem}>
                <Text style={styles.legendEmoji}>{emoji}</Text>
                <Text style={styles.legendLabel}>{info.label}</Text>
              </View>
            ))}
        </View>
      </View>
    </View>
  );
}

// Helper function to format date labels based on period
function formatDateLabel(date: Date, period: TimePeriod): string {
  if (period === '7') {
    return date.toLocaleDateString(undefined, { weekday: 'short' });
  } else if (period === '30') {
    return date.toLocaleDateString(undefined, { day: 'numeric' });
  } else {
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  }
}

// Custom Line Chart Component
interface LineChartProps {
  data: MoodDataPoint[];
  colors: ReturnType<typeof getThemedColors>;
  isDark: boolean;
  selectedPoint: MoodDataPoint | null;
  onPointPress: (point: MoodDataPoint) => void;
}

function LineChart({ data, colors, isDark, selectedPoint, onPointPress }: LineChartProps) {
  const chartWidth = Dimensions.get('window').width - SPACING.xl * 2 - SPACING.lg * 2;
  const chartHeight = 160;
  const paddingLeft = 8;
  const paddingRight = 8;
  const paddingTop = 16;
  const paddingBottom = 24;

  const effectiveWidth = chartWidth - paddingLeft - paddingRight;
  const effectiveHeight = chartHeight - paddingTop - paddingBottom;

  // Calculate point positions
  const points = useMemo(() => {
    if (data.length === 0) return [];

    const minValue = 1;
    const maxValue = 8;
    const valueRange = maxValue - minValue;

    return data.map((d, index) => {
      const x = paddingLeft + (data.length === 1
        ? effectiveWidth / 2
        : (index / (data.length - 1)) * effectiveWidth);
      const y = paddingTop + effectiveHeight - ((d.moodValue - minValue) / valueRange) * effectiveHeight;

      return { ...d, x, y };
    });
  }, [data, effectiveWidth, effectiveHeight]);

  // Build SVG-like path using views
  const renderLines = () => {
    if (points.length < 2) return null;

    return points.slice(0, -1).map((point, index) => {
      const nextPoint = points[index + 1];
      const dx = nextPoint.x - point.x;
      const dy = nextPoint.y - point.y;
      const length = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      return (
        <View
          key={`line-${index}`}
          style={[
            {
              position: 'absolute',
              left: point.x,
              top: point.y,
              width: length,
              height: 2,
              backgroundColor: withAlpha(COLORS.primary, 0.6),
              transform: [{ rotate: `${angle}deg` }],
              transformOrigin: 'left center',
            },
          ]}
        />
      );
    });
  };

  // Render horizontal grid lines
  const renderGridLines = () => {
    const lines = [];
    const numLines = 4;

    for (let i = 0; i <= numLines; i++) {
      const y = paddingTop + (i / numLines) * effectiveHeight;
      lines.push(
        <View
          key={`grid-${i}`}
          style={{
            position: 'absolute',
            left: paddingLeft,
            top: y,
            width: effectiveWidth,
            height: 1,
            backgroundColor: withAlpha(colors.border, 0.3),
          }}
        />
      );
    }

    return lines;
  };

  return (
    <View style={{ width: chartWidth, height: chartHeight, position: 'relative' }}>
      {/* Grid Lines */}
      {renderGridLines()}

      {/* Connection Lines */}
      {renderLines()}

      {/* Data Points */}
      {points.map((point, index) => {
        const isSelected = selectedPoint?.date === point.date;

        return (
          <TouchableOpacity
            key={`point-${point.date}`}
            style={[
              {
                position: 'absolute',
                left: point.x - 12,
                top: point.y - 12,
                width: 24,
                height: 24,
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}
            onPress={() => onPointPress(point)}
            testID={`mood-point-${index}`}
          >
            <View
              style={[
                {
                  width: isSelected ? 14 : 10,
                  height: isSelected ? 14 : 10,
                  borderRadius: isSelected ? 7 : 5,
                  backgroundColor: point.moodColor,
                  borderWidth: 2,
                  borderColor: isSelected ? colors.text : colors.background,
                },
              ]}
            />
          </TouchableOpacity>
        );
      })}

      {/* X-axis Labels */}
      {data.length <= 10 && points.map((point, index) => (
        <Text
          key={`label-${index}`}
          style={{
            position: 'absolute',
            left: point.x - 16,
            top: chartHeight - paddingBottom + 4,
            width: 32,
            fontSize: 9,
            color: colors.textMuted,
            textAlign: 'center',
          }}
        >
          {point.dateLabel}
        </Text>
      ))}
    </View>
  );
}

const createStyles = (colors: ReturnType<typeof getThemedColors>, isDark: boolean) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.surface,
      borderRadius: RADII.lg,
      padding: SPACING.lg,
      marginBottom: SPACING.lg,
      borderWidth: 1,
      borderColor: colors.border,
      ...SHADOWS.sm,
    },
    header: {
      marginBottom: SPACING.md,
    },
    title: {
      ...TYPOGRAPHY.styles.h4,
      color: colors.text,
    },
    subtitle: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textSecondary,
      marginTop: 2,
    },
    periodSelector: {
      flexDirection: 'row',
      backgroundColor: colors.background,
      borderRadius: RADII.md,
      padding: 4,
      marginBottom: SPACING.lg,
    },
    periodButton: {
      flex: 1,
      paddingVertical: SPACING.sm,
      alignItems: 'center',
      borderRadius: RADII.sm,
    },
    periodButtonActive: {
      backgroundColor: colors.surface,
      ...SHADOWS.sm,
    },
    periodText: {
      fontSize: 13,
      fontWeight: '600',
      color: colors.textMuted,
    },
    periodTextActive: {
      color: COLORS.primary,
    },
    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: SPACING.lg,
      paddingVertical: SPACING.sm,
    },
    statItem: {
      alignItems: 'center',
    },
    statEmoji: {
      fontSize: 20,
      marginBottom: 2,
    },
    statValue: {
      fontSize: 18,
      fontWeight: '700',
      color: COLORS.primary,
    },
    statLabel: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textMuted,
    },
    chartContainer: {
      alignItems: 'center',
      marginBottom: SPACING.md,
    },
    noDataState: {
      height: 120,
      justifyContent: 'center',
      alignItems: 'center',
    },
    noDataText: {
      ...TYPOGRAPHY.styles.body,
      color: colors.textMuted,
      fontStyle: 'italic',
    },
    detailCard: {
      backgroundColor: colors.background,
      borderRadius: RADII.md,
      padding: SPACING.md,
      marginBottom: SPACING.md,
    },
    detailHeader: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    detailEmoji: {
      fontSize: 32,
      marginRight: SPACING.md,
    },
    detailInfo: {
      flex: 1,
    },
    detailMood: {
      ...TYPOGRAPHY.styles.bodyBold,
      color: colors.text,
    },
    detailDate: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textSecondary,
    },
    detailNote: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textMuted,
      marginTop: SPACING.xs,
    },
    legend: {
      borderTopWidth: 1,
      borderTopColor: withAlpha(colors.border, 0.5),
      paddingTop: SPACING.md,
    },
    legendTitle: {
      ...TYPOGRAPHY.styles.label,
      color: colors.textMuted,
      marginBottom: SPACING.sm,
    },
    legendItems: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    legendItem: {
      alignItems: 'center',
    },
    legendEmoji: {
      fontSize: 16,
    },
    legendLabel: {
      fontSize: 10,
      color: colors.textMuted,
      marginTop: 2,
    },
    emptyState: {
      alignItems: 'center',
      paddingVertical: SPACING.xxl,
    },
    emptyEmoji: {
      fontSize: 36,
      marginBottom: SPACING.md,
      opacity: 0.5,
    },
    emptyTitle: {
      ...TYPOGRAPHY.styles.bodyBold,
      color: colors.text,
      marginBottom: SPACING.xs,
    },
    emptySubtitle: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textSecondary,
      textAlign: 'center',
      paddingHorizontal: SPACING.lg,
    },
  });
