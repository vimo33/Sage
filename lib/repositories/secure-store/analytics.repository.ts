/**
 * SecureStore Analytics Repository
 *
 * Provides a SecureStore-backed implementation of IAnalyticsRepository for production use.
 * Data is persisted to expo-secure-store for encrypted storage on device.
 */

import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import type {
  IAnalyticsRepository,
  AnalyticsEvent,
  AnalyticsEventType,
  AnalyticsEventFilter,
  CrashReport,
  AnalyticsSummary,
} from '../types';

/**
 * SecureStore keys for analytics data
 */
const ANALYTICS_EVENTS_KEY = 'sage.analytics_events.v1';
const CRASH_REPORTS_KEY = 'sage.crash_reports.v1';

/**
 * Maximum storage limits
 */
const MAX_CRASH_REPORTS = 50;
const MAX_USAGE_EVENTS = 500;

/**
 * Generate a unique event ID
 */
function generateEventId(): string {
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Sanitize stack trace to remove personal data
 */
function sanitizeStackTrace(stackTrace: string): string {
  let sanitized = stackTrace.replace(/\/Users\/[^/]+\//g, '/Users/***/');
  sanitized = sanitized.replace(/\/home\/[^/]+\//g, '/home/***/');
  sanitized = sanitized.replace(/C:\\Users\\[^\\]+\\/g, 'C:\\Users\\***\\');
  sanitized = sanitized.replace(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    '***@***.***'
  );

  if (sanitized.length > 2000) {
    sanitized = sanitized.substring(0, 2000) + '\n... (truncated)';
  }

  return sanitized;
}

/**
 * Get app version (simplified)
 */
function getAppVersion(): string {
  return '1.0.0';
}

/**
 * SecureStore implementation of the Analytics Repository
 */
export class SecureStoreAnalyticsRepository implements IAnalyticsRepository {
  private events: AnalyticsEvent[] = [];
  private crashReports: CrashReport[] = [];
  private initialized: boolean = false;

  /**
   * Load analytics data from SecureStore
   */
  private async loadFromStorage(): Promise<void> {
    if (this.initialized) return;

    try {
      const [eventsRaw, crashesRaw] = await Promise.all([
        SecureStore.getItemAsync(ANALYTICS_EVENTS_KEY),
        SecureStore.getItemAsync(CRASH_REPORTS_KEY),
      ]);

      if (eventsRaw) {
        this.events = JSON.parse(eventsRaw) as AnalyticsEvent[];
      }

      if (crashesRaw) {
        this.crashReports = JSON.parse(crashesRaw) as CrashReport[];
      }

      this.initialized = true;
    } catch (error) {
      console.error('[AnalyticsRepository] Failed to load from storage:', error);
      this.initialized = true;
    }
  }

  /**
   * Persist events to SecureStore
   */
  private async persistEvents(): Promise<void> {
    try {
      const trimmed = this.events.slice(0, MAX_USAGE_EVENTS);
      await SecureStore.setItemAsync(ANALYTICS_EVENTS_KEY, JSON.stringify(trimmed));
    } catch (error) {
      console.error('[AnalyticsRepository] Failed to persist events:', error);
    }
  }

  /**
   * Persist crash reports to SecureStore
   */
  private async persistCrashReports(): Promise<void> {
    try {
      const trimmed = this.crashReports.slice(0, MAX_CRASH_REPORTS);
      await SecureStore.setItemAsync(CRASH_REPORTS_KEY, JSON.stringify(trimmed));
    } catch (error) {
      console.error('[AnalyticsRepository] Failed to persist crash reports:', error);
    }
  }

  /**
   * Ensure storage is initialized
   */
  private async ensureInitialized(): Promise<void> {
    if (!this.initialized) {
      await this.loadFromStorage();
    }
  }

  /**
   * Record a usage event
   */
  async recordEvent(
    eventType: AnalyticsEventType,
    metadata?: Record<string, string | number | boolean>
  ): Promise<AnalyticsEvent> {
    await this.ensureInitialized();

    const event: AnalyticsEvent = {
      id: generateEventId(),
      timestamp: Date.now(),
      eventType,
      metadata,
    };

    this.events.unshift(event);

    // Trim to max size
    if (this.events.length > MAX_USAGE_EVENTS) {
      this.events = this.events.slice(0, MAX_USAGE_EVENTS);
    }

    await this.persistEvents();
    return event;
  }

  /**
   * Record a crash report
   */
  async recordCrash(error: Error, context?: string): Promise<CrashReport> {
    await this.ensureInitialized();

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

    this.crashReports.unshift(report);

    // Trim to max size
    if (this.crashReports.length > MAX_CRASH_REPORTS) {
      this.crashReports = this.crashReports.slice(0, MAX_CRASH_REPORTS);
    }

    await this.persistCrashReports();
    return report;
  }

  /**
   * Get analytics events with optional filters
   */
  async getEvents(filter?: AnalyticsEventFilter): Promise<AnalyticsEvent[]> {
    await this.ensureInitialized();

    let results = [...this.events];

    if (filter?.eventTypes && filter.eventTypes.length > 0) {
      results = results.filter((event) =>
        filter.eventTypes!.includes(event.eventType)
      );
    }

    if (filter?.startDate) {
      results = results.filter((event) => event.timestamp >= filter.startDate!);
    }

    if (filter?.endDate) {
      results = results.filter((event) => event.timestamp <= filter.endDate!);
    }

    if (filter?.limit) {
      results = results.slice(0, filter.limit);
    }

    return results;
  }

  /**
   * Get crash reports
   */
  async getCrashReports(): Promise<CrashReport[]> {
    await this.ensureInitialized();
    return [...this.crashReports];
  }

  /**
   * Get analytics summary
   */
  async getSummary(): Promise<AnalyticsSummary> {
    await this.ensureInitialized();

    // Calculate feature usage counts
    const featureUsage: Record<string, number> = {};
    let totalSessionDuration = 0;
    let sessionCount = 0;

    for (const event of this.events) {
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
      ...this.crashReports.map((r) => r.timestamp),
      ...this.events.map((e) => e.timestamp),
    ];

    const firstEventDate =
      allTimestamps.length > 0 ? Math.min(...allTimestamps) : null;
    const lastEventDate =
      allTimestamps.length > 0 ? Math.max(...allTimestamps) : null;

    return {
      totalSessions: this.events.filter((e) => e.eventType === 'session_started')
        .length,
      totalCrashes: this.crashReports.length,
      featureUsage,
      avgSessionDurationMs:
        sessionCount > 0 ? Math.round(totalSessionDuration / sessionCount) : 0,
      firstEventDate,
      lastEventDate,
    };
  }

  /**
   * Delete events older than a timestamp
   */
  async deleteOlderThan(timestamp: number): Promise<number> {
    await this.ensureInitialized();

    const originalEventCount = this.events.length;
    const originalCrashCount = this.crashReports.length;

    this.events = this.events.filter((e) => e.timestamp >= timestamp);
    this.crashReports = this.crashReports.filter((r) => r.timestamp >= timestamp);

    const deletedEvents = originalEventCount - this.events.length;
    const deletedCrashes = originalCrashCount - this.crashReports.length;

    await Promise.all([this.persistEvents(), this.persistCrashReports()]);

    return deletedEvents + deletedCrashes;
  }

  /**
   * Clear all analytics data
   */
  async clearAll(): Promise<void> {
    this.events = [];
    this.crashReports = [];
    await Promise.all([
      SecureStore.deleteItemAsync(ANALYTICS_EVENTS_KEY),
      SecureStore.deleteItemAsync(CRASH_REPORTS_KEY),
    ]);
  }

  /**
   * Export all analytics data
   */
  async exportData(): Promise<{
    events: AnalyticsEvent[];
    crashReports: CrashReport[];
    summary: AnalyticsSummary;
    exportedAt: number;
  }> {
    await this.ensureInitialized();

    return {
      events: [...this.events],
      crashReports: [...this.crashReports],
      summary: await this.getSummary(),
      exportedAt: Date.now(),
    };
  }

  /**
   * Refresh from storage (useful for testing or syncing)
   */
  async refresh(): Promise<void> {
    this.initialized = false;
    this.events = [];
    this.crashReports = [];
    await this.loadFromStorage();
  }
}
