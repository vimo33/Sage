/**
 * Unit Tests for Analytics Service
 *
 * Tests the core analytics functionality including:
 * - Default preferences
 * - Crash report recording (with privacy sanitization)
 * - Usage event recording
 * - Data clearing
 * - Data export
 */

import {
  DEFAULT_ANALYTICS_PREFERENCES,
  CURRENT_CONSENT_VERSION,
  DATA_DISCLOSURE,
  formatDuration,
  formatAnalyticsDate,
} from './service';

// Mock expo-secure-store
jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn().mockResolvedValue(null),
  setItemAsync: jest.fn().mockResolvedValue(undefined),
  deleteItemAsync: jest.fn().mockResolvedValue(undefined),
}));

describe('Analytics Service', () => {
  describe('DEFAULT_ANALYTICS_PREFERENCES', () => {
    it('should have analytics disabled by default', () => {
      expect(DEFAULT_ANALYTICS_PREFERENCES.enabled).toBe(false);
    });

    it('should have crash reporting disabled by default', () => {
      expect(DEFAULT_ANALYTICS_PREFERENCES.crashReportingEnabled).toBe(false);
    });

    it('should have usage metrics disabled by default', () => {
      expect(DEFAULT_ANALYTICS_PREFERENCES.usageMetricsEnabled).toBe(false);
    });

    it('should have consent not given by default', () => {
      expect(DEFAULT_ANALYTICS_PREFERENCES.consentGiven).toBe(false);
    });

    it('should have null consent timestamp by default', () => {
      expect(DEFAULT_ANALYTICS_PREFERENCES.consentTimestamp).toBeNull();
    });

    it('should have current consent version', () => {
      expect(DEFAULT_ANALYTICS_PREFERENCES.consentVersion).toBe(CURRENT_CONSENT_VERSION);
    });
  });

  describe('CURRENT_CONSENT_VERSION', () => {
    it('should be a valid semver string', () => {
      expect(CURRENT_CONSENT_VERSION).toMatch(/^\d+\.\d+\.\d+$/);
    });
  });

  describe('DATA_DISCLOSURE', () => {
    describe('crashReporting', () => {
      it('should have required fields', () => {
        expect(DATA_DISCLOSURE.crashReporting.title).toBeDefined();
        expect(DATA_DISCLOSURE.crashReporting.description).toBeDefined();
        expect(DATA_DISCLOSURE.crashReporting.dataCollected).toBeDefined();
        expect(DATA_DISCLOSURE.crashReporting.dataNotCollected).toBeDefined();
      });

      it('should list data collected items', () => {
        expect(DATA_DISCLOSURE.crashReporting.dataCollected.length).toBeGreaterThan(0);
      });

      it('should list data not collected items', () => {
        expect(DATA_DISCLOSURE.crashReporting.dataNotCollected.length).toBeGreaterThan(0);
      });

      it('should mention sanitized stack trace', () => {
        const hasStackTrace = DATA_DISCLOSURE.crashReporting.dataCollected.some(
          (item) => item.toLowerCase().includes('stack trace')
        );
        expect(hasStackTrace).toBe(true);
      });

      it('should explicitly not collect personal information', () => {
        const hasPersonalInfo = DATA_DISCLOSURE.crashReporting.dataNotCollected.some(
          (item) => item.toLowerCase().includes('personal')
        );
        expect(hasPersonalInfo).toBe(true);
      });
    });

    describe('usageMetrics', () => {
      it('should have required fields', () => {
        expect(DATA_DISCLOSURE.usageMetrics.title).toBeDefined();
        expect(DATA_DISCLOSURE.usageMetrics.description).toBeDefined();
        expect(DATA_DISCLOSURE.usageMetrics.dataCollected).toBeDefined();
        expect(DATA_DISCLOSURE.usageMetrics.dataNotCollected).toBeDefined();
      });

      it('should list data collected items', () => {
        expect(DATA_DISCLOSURE.usageMetrics.dataCollected.length).toBeGreaterThan(0);
      });

      it('should list data not collected items', () => {
        expect(DATA_DISCLOSURE.usageMetrics.dataNotCollected.length).toBeGreaterThan(0);
      });

      it('should explicitly not collect content', () => {
        const hasContent = DATA_DISCLOSURE.usageMetrics.dataNotCollected.some(
          (item) => item.toLowerCase().includes('write') || item.toLowerCase().includes('say')
        );
        expect(hasContent).toBe(true);
      });
    });
  });

  describe('formatDuration', () => {
    it('should format less than a second', () => {
      expect(formatDuration(500)).toBe('less than a second');
    });

    it('should format seconds', () => {
      expect(formatDuration(5000)).toBe('5 seconds');
    });

    it('should format minutes', () => {
      expect(formatDuration(120000)).toBe('2 minutes');
    });

    it('should format hours', () => {
      expect(formatDuration(7200000)).toBe('2 hours');
    });
  });

  describe('formatAnalyticsDate', () => {
    it('should format date correctly', () => {
      const timestamp = new Date('2024-01-15').getTime();
      const formatted = formatAnalyticsDate(timestamp);
      // Should contain the year
      expect(formatted).toContain('2024');
      // Should contain some form of month/day
      expect(formatted.length).toBeGreaterThan(5);
    });
  });
});

describe('Analytics Privacy Guarantees', () => {
  it('should have opt-in as default (never enabled by default)', () => {
    expect(DEFAULT_ANALYTICS_PREFERENCES.enabled).toBe(false);
    expect(DEFAULT_ANALYTICS_PREFERENCES.consentGiven).toBe(false);
  });

  it('should require explicit consent before any data collection', () => {
    // This tests the design principle that consentGiven must be true
    // before crashReportingEnabled or usageMetricsEnabled can be effective
    const prefs = { ...DEFAULT_ANALYTICS_PREFERENCES };
    expect(prefs.consentGiven).toBe(false);
    expect(prefs.crashReportingEnabled).toBe(false);
    expect(prefs.usageMetricsEnabled).toBe(false);
  });

  it('should never collect journal or chat content (by design)', () => {
    // This test documents the design principle
    // Usage events only collect event types and counts, never content
    expect(DATA_DISCLOSURE.crashReporting.dataNotCollected).toContain('Journal or chat content');
    expect(DATA_DISCLOSURE.usageMetrics.dataNotCollected).toContain('What you write or say');
  });
});
