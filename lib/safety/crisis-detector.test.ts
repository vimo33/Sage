/**
 * Crisis Detection Tests
 * Unit tests for the crisis detection module
 */

import { analyzeCrisisSignals, hasCrisisSignals, getSupportMessage } from './crisis-detector';

describe('Crisis Detection', () => {
  describe('analyzeCrisisSignals', () => {
    it('should detect critical severity keywords', () => {
      const result = analyzeCrisisSignals('I want to kill myself');
      expect(result.isCrisis).toBe(true);
      expect(result.severity).toBe('critical');
      expect(result.shouldShowResources).toBe(true);
      expect(result.matchedSignals).toContain('kill myself');
    });

    it('should detect suicide-related keywords', () => {
      const result = analyzeCrisisSignals('I have been thinking about suicide');
      expect(result.isCrisis).toBe(true);
      expect(result.severity).toBe('critical');
      expect(result.matchedSignals).toContain('suicide');
    });

    it('should detect self-harm keywords as high severity', () => {
      const result = analyzeCrisisSignals('I want to hurt myself');
      expect(result.isCrisis).toBe(true);
      expect(result.severity).toBe('high');
      expect(result.matchedSignals).toContain('hurt myself');
    });

    it('should detect medium severity expressions', () => {
      const result = analyzeCrisisSignals("I can't take it anymore");
      expect(result.isCrisis).toBe(true);
      expect(result.severity).toBe('medium');
    });

    it('should detect low severity keywords', () => {
      const result = analyzeCrisisSignals('I feel completely hopeless');
      expect(result.isCrisis).toBe(true);
      expect(result.severity).toBe('low');
      expect(result.matchedSignals).toContain('hopeless');
    });

    it('should return no crisis for normal messages', () => {
      const result = analyzeCrisisSignals('I am feeling stressed about work');
      expect(result.isCrisis).toBe(false);
      expect(result.severity).toBe('none');
      expect(result.matchedSignals).toHaveLength(0);
    });

    it('should be case insensitive', () => {
      const result = analyzeCrisisSignals('I WANT TO DIE');
      expect(result.isCrisis).toBe(true);
      expect(result.severity).toBe('critical');
    });

    it('should detect multiple keywords and return highest severity', () => {
      const result = analyzeCrisisSignals('I feel hopeless and want to kill myself');
      expect(result.isCrisis).toBe(true);
      expect(result.severity).toBe('critical');
      expect(result.matchedSignals.length).toBeGreaterThan(1);
    });

    it('should handle messages with crisis keywords in context', () => {
      const result = analyzeCrisisSignals('I have no reason to live anymore');
      expect(result.isCrisis).toBe(true);
      expect(result.severity).toBe('critical');
    });
  });

  describe('hasCrisisSignals', () => {
    it('should return true for crisis messages', () => {
      expect(hasCrisisSignals('I want to end my life')).toBe(true);
      expect(hasCrisisSignals('thinking about self harm')).toBe(true);
      expect(hasCrisisSignals('I feel worthless')).toBe(true);
    });

    it('should return false for normal messages', () => {
      expect(hasCrisisSignals('How can I find peace?')).toBe(false);
      expect(hasCrisisSignals('I am anxious about my job')).toBe(false);
      expect(hasCrisisSignals('What is the meaning of life?')).toBe(false);
    });
  });

  describe('getSupportMessage', () => {
    it('should return appropriate message for critical severity', () => {
      const message = getSupportMessage('critical');
      expect(message).toContain('painful');
      expect(message).toContain('life matters');
    });

    it('should return appropriate message for high severity', () => {
      const message = getSupportMessage('high');
      expect(message).toContain("don't have to face this alone");
    });

    it('should return appropriate message for medium severity', () => {
      const message = getSupportMessage('medium');
      expect(message).toContain('concerned');
    });

    it('should return appropriate message for low severity', () => {
      const message = getSupportMessage('low');
      expect(message).toContain('struggling');
    });

    it('should return empty string for none severity', () => {
      const message = getSupportMessage('none');
      expect(message).toBe('');
    });
  });
});
