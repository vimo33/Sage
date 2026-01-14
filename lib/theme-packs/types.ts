import type { ThemeTag } from '../retrieval/search';

/**
 * Theme Pack System Types
 *
 * Theme packs are curated 7-day journeys focused on specific themes
 * like acceptance, purpose, and stillness. Each day unlocks one prompt
 * with progress tracking.
 */

/**
 * A single day within a theme pack
 */
export interface ThemePackDay {
  dayNumber: number; // 1-7
  title: string;
  subtitle: string;
  theme: ThemeTag;
  openingReflection: string; // Contemplative prompt to start the day
  coreTeaching: string; // Main teaching or insight for the day
  practicePrompt: string; // Actionable practice for integration
  closingThought: string; // Brief closing reflection
  wisdomKeywords: string[]; // Keywords for searching related wisdom
}

/**
 * A complete 7-day theme pack
 */
export interface ThemePack {
  id: string;
  title: string;
  description: string;
  icon: string;
  theme: ThemeTag;
  color: string; // Accent color for the pack
  dayCount: 7; // Always 7 days
  estimatedMinutesPerDay: number;
  days: ThemePackDay[];
}

/**
 * User's progress on a theme pack
 */
export interface ThemePackProgress {
  packId: string;
  startedAt: number; // Timestamp when pack was started
  currentDay: number; // 1-7, which day they're on
  completedDays: number[]; // Array of completed day numbers
  lastActivityAt: number; // Last time user engaged with the pack
  isComplete: boolean;
  completedAt: number | null;
}

/**
 * A day's completion record
 */
export interface ThemePackDayCompletion {
  packId: string;
  dayNumber: number;
  userReflection?: string; // Optional user notes
  completedAt: number;
}

/**
 * Active theme pack session state
 */
export interface ThemePackSession {
  packId: string;
  dayNumber: number;
  startedAt: number;
}

/**
 * Check if a day is unlocked based on progress
 * Days unlock sequentially: day N is unlocked when day N-1 is completed
 * OR if it's the next day after starting the pack
 */
export function isDayUnlocked(
  dayNumber: number,
  progress: ThemePackProgress | null
): boolean {
  // No progress means only day 1 is available (but pack must be started first)
  if (!progress) {
    return dayNumber === 1;
  }

  // Day 1 is always unlocked once pack is started
  if (dayNumber === 1) {
    return true;
  }

  // Day is unlocked if the previous day was completed
  // OR if enough calendar days have passed since starting
  const daysSinceStart = Math.floor(
    (Date.now() - progress.startedAt) / (24 * 60 * 60 * 1000)
  );

  // Can unlock next day if previous day is complete
  const previousDayComplete = progress.completedDays.includes(dayNumber - 1);

  // Also unlock based on calendar days (one day per calendar day since start)
  const unlockedByTime = dayNumber <= daysSinceStart + 1;

  return previousDayComplete || unlockedByTime;
}

/**
 * Get the next available day for a pack
 */
export function getNextAvailableDay(
  pack: ThemePack,
  progress: ThemePackProgress | null
): number | null {
  if (!progress) {
    return 1; // Start with day 1
  }

  if (progress.isComplete) {
    return null; // Pack is complete
  }

  // Find the first incomplete day that's unlocked
  for (let day = 1; day <= pack.dayCount; day++) {
    if (!progress.completedDays.includes(day) && isDayUnlocked(day, progress)) {
      return day;
    }
  }

  return null;
}

/**
 * Calculate progress percentage
 */
export function getProgressPercentage(progress: ThemePackProgress | null): number {
  if (!progress) {
    return 0;
  }
  return Math.round((progress.completedDays.length / 7) * 100);
}
