/**
 * Crisis Detection Module
 * Scans user input for self-harm, suicide, or crisis keywords
 * All processing is done locally on-device
 */

import type { CrisisAnalysisResult, CrisisSeverity } from './types';

/**
 * Crisis keyword mapping with severity levels
 * These are patterns that indicate potential crisis situations
 */
const CRISIS_KEYWORDS: Record<string, CrisisSeverity> = {
  // Critical severity - immediate crisis indicators
  'kill myself': 'critical',
  'end my life': 'critical',
  'take my life': 'critical',
  'want to die': 'critical',
  'wish i was dead': 'critical',
  'wish i were dead': 'critical',
  'better off dead': 'critical',
  'no reason to live': 'critical',
  'suicide': 'critical',
  'suicidal': 'critical',
  'ending it all': 'critical',
  'end it all': 'critical',

  // High severity - self-harm and serious distress
  'self harm': 'high',
  'self-harm': 'high',
  'hurt myself': 'high',
  'hurting myself': 'high',
  'cut myself': 'high',
  'cutting myself': 'high',
  'harm myself': 'high',
  'harming myself': 'high',
  'dont want to be here': 'high',
  "don't want to be here": 'high',
  'dont want to exist': 'high',
  "don't want to exist": 'high',
  'want to disappear': 'high',

  // Medium severity - expressions of severe hopelessness
  'no point in living': 'medium',
  'cant go on': 'medium',
  "can't go on": 'medium',
  'cant take it anymore': 'medium',
  "can't take it anymore": 'medium',
  'give up on life': 'medium',
  'giving up on life': 'medium',
  'life is meaningless': 'medium',
  'nothing matters anymore': 'medium',

  // Low severity - concerning but may need context
  'hopeless': 'low',
  'worthless': 'low',
  'i hate myself': 'low',
  'hate being alive': 'medium',
};

/**
 * Severity threshold for showing crisis resources
 * Any severity at or above this level triggers resource display
 */
const RESOURCE_DISPLAY_THRESHOLD: CrisisSeverity = 'low';

/**
 * Get numeric value for severity comparison
 */
function severityToNumber(severity: CrisisSeverity): number {
  const mapping: Record<CrisisSeverity, number> = {
    none: 0,
    low: 1,
    medium: 2,
    high: 3,
    critical: 4,
  };
  return mapping[severity];
}

/**
 * Compare two severity levels
 * Returns positive if a > b, negative if a < b, 0 if equal
 */
function compareSeverity(a: CrisisSeverity, b: CrisisSeverity): number {
  return severityToNumber(a) - severityToNumber(b);
}

/**
 * Analyze user input for crisis signals
 * This function scans the input text for keywords that may indicate
 * the user is experiencing a mental health crisis
 *
 * @param userText - The user's input text to analyze
 * @returns CrisisAnalysisResult with detection results
 */
export function analyzeCrisisSignals(userText: string): CrisisAnalysisResult {
  const lowerText = userText.toLowerCase();
  const matchedSignals: string[] = [];
  let highestSeverity: CrisisSeverity = 'none';

  // Check each crisis keyword against the user input
  for (const [keyword, severity] of Object.entries(CRISIS_KEYWORDS)) {
    if (lowerText.includes(keyword)) {
      matchedSignals.push(keyword);
      if (compareSeverity(severity, highestSeverity) > 0) {
        highestSeverity = severity;
      }
    }
  }

  const isCrisis = highestSeverity !== 'none';
  const shouldShowResources = compareSeverity(highestSeverity, RESOURCE_DISPLAY_THRESHOLD) >= 0;

  return {
    isCrisis,
    severity: highestSeverity,
    matchedSignals,
    shouldShowResources,
  };
}

/**
 * Check if the input contains any crisis signals
 * Quick boolean check without full analysis details
 *
 * @param userText - The user's input text to check
 * @returns boolean indicating if crisis signals were detected
 */
export function hasCrisisSignals(userText: string): boolean {
  const lowerText = userText.toLowerCase();

  for (const keyword of Object.keys(CRISIS_KEYWORDS)) {
    if (lowerText.includes(keyword)) {
      return true;
    }
  }

  return false;
}

/**
 * Get a supportive message based on severity level
 * These messages are designed to be compassionate and non-judgmental
 */
export function getSupportMessage(severity: CrisisSeverity): string {
  switch (severity) {
    case 'critical':
      return "I hear that you're going through something incredibly painful right now. Your life matters, and there are people who want to help. Please reach out to one of these resources - they're available 24/7 and ready to listen.";
    case 'high':
      return "It sounds like you're carrying a lot right now. You don't have to face this alone. These resources are here to support you, whenever you're ready.";
    case 'medium':
      return "I'm concerned about what you're sharing. It's okay to ask for help, and these resources are available if you need someone to talk to.";
    case 'low':
      return "I notice you might be struggling. Remember, it's okay to reach out for support. Here are some resources that might help.";
    default:
      return '';
  }
}
