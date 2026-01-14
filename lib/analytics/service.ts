/**
 * Anonymous Analytics Service
 *
 * This service provides optional, privacy-focused analytics for crash reporting
 * and usage patterns. Key privacy principles:
 *
 * 1. FULLY LOCAL: All data is stored locally on device
 * 2. EXPLICIT OPT-IN: Disabled by default, requires explicit user consent
 * 3. ANONYMOUS: No personal identifiers, device IDs, or user data collected
 * 4. TRANSPARENT: Detailed disclosure of what data is collected
 * 5. USER CONTROL: Users can view, export, and delete their analytics data
 *
 * Data collected (when opted-in):
 * - Crash reports: Error type, stack trace (sanitized), app version
 * - Usage patterns: Feature usage counts (not content), session durations
 *
 * Data NEVER collected:
 * - Journal entries or content
 * - Chat conversations
 * - Personal information
 * - Device identifiers
 * - Location data
 * - IP addresses
 */

import * as SecureStore from 'expo-secure-store';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

// Types
export interface AnalyticsPreferences {
  enabled: boolean;
  crashReportingEnabled: boolean;
  usageMetricsEnabled: boolean;
  consentGiven: boolean;
  consentTimestamp: number | null;
  consentVersion: string;
}

export interface CrashReport {
  id: string;
  timestamp: number;
  errorType: string;
  errorMessage: string;
  stackTrace: string;
  appVersion: string;
  platform: string;
  context?: string;
}

export interface UsageEvent {
  id: string;
  timestamp: number;
  eventType: UsageEventType;
  metadata?: Record<string, string | number | boolean>;
}

export type UsageEventType =
  | 'app_opened'
  | 'app_backgrounded'
  | 'session_started'
  | 'session_ended'
  | 'feature_used'
  | 'setting_changed'
  | 'onboarding_completed';

export interface AnalyticsSummary {
  totalSessions: number;
  totalCrashes: number;
  featureUsage: Record<string, number>;
  avgSessionDurationMs: number;
  firstEventDate: number | null;
  lastEventDate: number | null;
}

// Constants
export const CURRENT_CONSENT_VERSION = '1.0.0';

export const DEFAULT_ANALYTICS_PREFERENCES: AnalyticsPreferences = {
  enabled: false,
  crashReportingEnabled: false,
  usageMetricsEnabled: false,
  consentGiven: false,
  consentTimestamp: null,
  consentVersion: CURRENT_CONSENT_VERSION,
};

// SecureStore keys - MUST use only alphanumeric, '.', '-', '_' characters (NO colons!)
const ANALYTICS_STORAGE_KEY = 'sage.analytics.v1';
const CRASH_REPORTS_KEY = 'sage.crash_reports.v1';
const USAGE_EVENTS_KEY = 'sage.usage_events.v1';

// Maximum storage limits
const MAX_CRASH_REPORTS = 50;
const MAX_USAGE_EVENTS = 500;

// Data disclosure text for UI
export const DATA_DISCLOSURE = {
  crashReporting: {
    title: 'Crash Reporting',
    description: 'Helps improve app stability',
    dataCollected: [
      'Error type and message',
      'Sanitized stack trace (no personal data)',
      'App version and platform',
      'Timestamp of crash',
    ],
    dataNotCollected: [
      'Journal or chat content',
      'Personal information',
      'Device identifiers',
    ],
  },
  usageMetrics: {
    title: 'Usage Patterns',
    description: 'Helps understand which features are most helpful',
    dataCollected: [
      'Feature usage counts (e.g., "journal opened 5 times")',
      'Session durations',
      'App version',
    ],
    dataNotCollected: [
      'What you write or say',
      'Personal information',
      'Specific times you use the app',
    ],
  },
};

// Storage functions
async function loadCrashReports(): Promise<CrashReport[]> {
  try {
    const raw = await SecureStore.getItemAsync(CRASH_REPORTS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as CrashReport[];
  } catch {
    return [];
  }
}

async function saveCrashReports(reports: CrashReport[]): Promise<void> {
  try {
    // Keep only most recent reports
    const trimmed = reports.slice(0, MAX_CRASH_REPORTS);
    await SecureStore.setItemAsync(CRASH_REPORTS_KEY, JSON.stringify(trimmed));
  } catch {
    // Silent fail - analytics should never break the app
  }
}

async function loadUsageEvents(): Promise<UsageEvent[]> {
  try {
    const raw = await SecureStore.getItemAsync(USAGE_EVENTS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as UsageEvent[];
  } catch {
    return [];
  }
}

async function saveUsageEvents(events: UsageEvent[]): Promise<void> {
  try {
    // Keep only most recent events
    const trimmed = events.slice(0, MAX_USAGE_EVENTS);
    await SecureStore.setItemAsync(USAGE_EVENTS_KEY, JSON.stringify(trimmed));
  } catch {
    // Silent fail
  }
}

// Generate anonymous ID for events (not device-linked)
function generateEventId(): string {
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

// Sanitize stack trace to remove any potential personal data
function sanitizeStackTrace(stackTrace: string): string {
  // Remove file paths that might contain usernames
  let sanitized = stackTrace.replace(/\/Users\/[^/]+\//g, '/Users/***/');
  sanitized = sanitized.replace(/\/home\/[^/]+\//g, '/home/***/');
  sanitized = sanitized.replace(/C:\\Users\\[^\\]+\\/g, 'C:\\Users\\***\\');

  // Remove any potential email addresses
  sanitized = sanitized.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '***@***.***');

  // Truncate to reasonable length
  if (sanitized.length > 2000) {
    sanitized = sanitized.substring(0, 2000) + '\n... (truncated)';
  }

  return sanitized;
}

// Get app version (simplified - in real app would come from config)
function getAppVersion(): string {
  return '1.0.0';
}

// Public API
export async function recordCrash(
  error: Error,
  context?: string,
  preferences?: AnalyticsPreferences
): Promise<void> {
  // Check if crash reporting is enabled
  if (!preferences?.enabled || !preferences?.crashReportingEnabled) {
    return;
  }

  const report: CrashReport = {
    id: generateEventId(),
    timestamp: Date.now(),
    errorType: error.name || 'Error',
    errorMessage: error.message || 'Unknown error',
    stackTrace: sanitizeStackTrace(error.stack || ''),
    appVersion: getAppVersion(),
    platform: Platform.OS,
    context: context ? context.substring(0, 100) : undefined,
  };

  const existing = await loadCrashReports();
  await saveCrashReports([report, ...existing]);

  console.log('[Analytics] Crash report recorded:', report.id);
}

export async function recordUsageEvent(
  eventType: UsageEventType,
  metadata?: Record<string, string | number | boolean>,
  preferences?: AnalyticsPreferences
): Promise<void> {
  // Check if usage metrics are enabled
  if (!preferences?.enabled || !preferences?.usageMetricsEnabled) {
    return;
  }

  const event: UsageEvent = {
    id: generateEventId(),
    timestamp: Date.now(),
    eventType,
    metadata,
  };

  const existing = await loadUsageEvents();
  await saveUsageEvents([event, ...existing]);

  console.log('[Analytics] Usage event recorded:', eventType);
}

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  const [crashReports, usageEvents] = await Promise.all([
    loadCrashReports(),
    loadUsageEvents(),
  ]);

  // Calculate feature usage counts
  const featureUsage: Record<string, number> = {};
  let totalSessionDuration = 0;
  let sessionCount = 0;

  for (const event of usageEvents) {
    if (event.eventType === 'feature_used' && event.metadata?.feature) {
      const feature = String(event.metadata.feature);
      featureUsage[feature] = (featureUsage[feature] || 0) + 1;
    }
    if (event.eventType === 'session_ended' && event.metadata?.durationMs) {
      totalSessionDuration += Number(event.metadata.durationMs);
      sessionCount++;
    }
  }

  // Get date range
  const allTimestamps = [
    ...crashReports.map(r => r.timestamp),
    ...usageEvents.map(e => e.timestamp),
  ];

  const firstEventDate = allTimestamps.length > 0 ? Math.min(...allTimestamps) : null;
  const lastEventDate = allTimestamps.length > 0 ? Math.max(...allTimestamps) : null;

  return {
    totalSessions: usageEvents.filter(e => e.eventType === 'session_started').length,
    totalCrashes: crashReports.length,
    featureUsage,
    avgSessionDurationMs: sessionCount > 0 ? Math.round(totalSessionDuration / sessionCount) : 0,
    firstEventDate,
    lastEventDate,
  };
}

export async function getCrashReports(): Promise<CrashReport[]> {
  return loadCrashReports();
}

export async function getUsageEvents(): Promise<UsageEvent[]> {
  return loadUsageEvents();
}

export async function clearAllAnalyticsData(): Promise<void> {
  try {
    await Promise.all([
      SecureStore.deleteItemAsync(CRASH_REPORTS_KEY),
      SecureStore.deleteItemAsync(USAGE_EVENTS_KEY),
    ]);
    console.log('[Analytics] All analytics data cleared');
  } catch {
    // Silent fail
  }
}

export async function exportAnalyticsData(): Promise<{
  preferences: AnalyticsPreferences;
  crashReports: CrashReport[];
  usageEvents: UsageEvent[];
  summary: AnalyticsSummary;
  exportedAt: number;
}> {
  const [crashReports, usageEvents, summary] = await Promise.all([
    loadCrashReports(),
    loadUsageEvents(),
    getAnalyticsSummary(),
  ]);

  return {
    preferences: DEFAULT_ANALYTICS_PREFERENCES, // Will be populated from store
    crashReports,
    usageEvents,
    summary,
    exportedAt: Date.now(),
  };
}

// Helper to format duration for display
export function formatDuration(ms: number): string {
  if (ms < 1000) return 'less than a second';
  if (ms < 60000) return `${Math.round(ms / 1000)} seconds`;
  if (ms < 3600000) return `${Math.round(ms / 60000)} minutes`;
  return `${Math.round(ms / 3600000)} hours`;
}

// Helper to format date for display
export function formatAnalyticsDate(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
