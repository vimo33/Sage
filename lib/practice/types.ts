import type { ThemeTag } from '../retrieval/search';

/**
 * Practice duration variants
 * - short: 1-minute micro-actions for quick grounding
 * - medium: 5-minute guided practices for deeper engagement
 * - long: Daily practices for sustained integration
 */
export type PracticeDuration = 'short' | 'medium' | 'long';

/**
 * Practice categories based on the type of action
 */
export type PracticeCategory =
  | 'breath'
  | 'inquiry'
  | 'movement'
  | 'writing'
  | 'stillness'
  | 'gratitude'
  | 'compassion';

/**
 * A single practice option with duration variants
 */
export interface PracticeTemplate {
  id: string;
  category: PracticeCategory;
  themes: ThemeTag[];
  icon: string;
  variants: {
    short: PracticeVariant;   // 1 minute
    medium: PracticeVariant;  // 5 minutes
    long: PracticeVariant;    // Daily ritual
  };
}

/**
 * A specific variant of a practice for a given duration
 */
export interface PracticeVariant {
  title: string;
  description: string;
  estimatedMinutes: number;
  steps: PracticeStep[];
  closingPrompt: string;
}

/**
 * A single step within a practice
 */
export interface PracticeStep {
  instruction: string;
  durationSeconds?: number;
  isOptional?: boolean;
}

/**
 * A practice option generated based on conversation context
 */
export interface PracticeOption {
  templateId: string;
  duration: PracticeDuration;
  title: string;
  description: string;
  estimatedMinutes: number;
  icon: string;
  category: PracticeCategory;
  contextualNote?: string;  // Why this practice is relevant to the conversation
}

/**
 * Active practice session state
 */
export interface PracticeSession {
  id: string;
  templateId: string;
  duration: PracticeDuration;
  conversationContext?: string;
  currentStepIndex: number;
  startedAt: number;
  completedAt: number | null;
  userReflection?: string;
}

/**
 * Result of completing a practice
 */
export interface PracticeCompletion {
  sessionId: string;
  templateId: string;
  duration: PracticeDuration;
  durationMs: number;
  userReflection?: string;
  completedAt: number;
}
