/**
 * Text Metrics Utilities
 *
 * Utilities for calculating reading time estimates and other text metrics.
 * Designed for wisdom/meditation content where users read more thoughtfully.
 */

// Average reading speed in words per minute
// Using 180 WPM for contemplative content (slower than typical 200-250 WPM)
const WORDS_PER_MINUTE = 180;

// Minimum threshold in seconds to show a reading time
const MIN_READING_TIME_SECONDS = 10;

export interface ReadingTimeResult {
  /** Total estimated reading time in milliseconds */
  durationMs: number;
  /** Total estimated reading time in seconds */
  durationSeconds: number;
  /** Total estimated reading time in minutes (rounded up) */
  durationMinutes: number;
  /** Word count of the text */
  wordCount: number;
  /** Human-readable formatted string (e.g., "2 min read") */
  formatted: string;
  /** Whether this is considered a quick read (< 1 minute) */
  isQuickRead: boolean;
}

/**
 * Count words in a text string.
 * Handles various whitespace and punctuation cases.
 */
export function countWords(text: string): number {
  if (!text || typeof text !== 'string') {
    return 0;
  }

  // Trim and normalize whitespace, then split on whitespace
  const trimmed = text.trim();
  if (trimmed.length === 0) {
    return 0;
  }

  // Split on whitespace and filter out empty strings
  const words = trimmed.split(/\s+/).filter(word => word.length > 0);
  return words.length;
}

/**
 * Calculate estimated reading time for a given text.
 *
 * @param text - The text content to analyze
 * @param wordsPerMinute - Optional custom reading speed (default: 180 WPM for contemplative reading)
 * @returns ReadingTimeResult with various time formats and metadata
 */
export function calculateReadingTime(
  text: string,
  wordsPerMinute: number = WORDS_PER_MINUTE
): ReadingTimeResult {
  const wordCount = countWords(text);

  // Calculate duration in minutes (as a decimal)
  const minutesDecimal = wordCount / wordsPerMinute;

  // Convert to different units
  const durationMs = Math.round(minutesDecimal * 60 * 1000);
  const durationSeconds = Math.round(minutesDecimal * 60);
  const durationMinutes = Math.ceil(minutesDecimal);

  // Determine if it's a quick read (less than 1 minute)
  const isQuickRead = durationSeconds < 60;

  // Format the reading time string
  const formatted = formatReadingTime(durationSeconds);

  return {
    durationMs,
    durationSeconds,
    durationMinutes,
    wordCount,
    formatted,
    isQuickRead,
  };
}

/**
 * Format reading time in seconds to a human-readable string.
 *
 * @param seconds - Reading time in seconds
 * @returns Formatted string (e.g., "Quick read", "2 min read", "5+ min read")
 */
export function formatReadingTime(seconds: number): string {
  if (seconds < MIN_READING_TIME_SECONDS) {
    return 'Quick read';
  }

  if (seconds < 60) {
    return '<1 min read';
  }

  const minutes = Math.ceil(seconds / 60);

  if (minutes === 1) {
    return '1 min read';
  }

  // For longer content (target is 3-5 minutes)
  if (minutes >= 5) {
    return `${minutes} min read`;
  }

  return `${minutes} min read`;
}

/**
 * Calculate cumulative reading time for multiple texts.
 * Useful for session-level statistics.
 *
 * @param texts - Array of text strings
 * @returns ReadingTimeResult for the combined texts
 */
export function calculateCumulativeReadingTime(texts: string[]): ReadingTimeResult {
  const combinedText = texts.join(' ');
  return calculateReadingTime(combinedText);
}

/**
 * Format duration in milliseconds to a human-readable string.
 * Consistent with the existing formatDuration function in SessionSummaryModal.
 *
 * @param ms - Duration in milliseconds
 * @returns Formatted string (e.g., "30s", "2m 15s")
 */
export function formatDuration(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (minutes === 0) {
    return `${seconds}s`;
  }
  return `${minutes}m ${seconds}s`;
}
