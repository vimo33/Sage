/**
 * Breath Timer Types
 *
 * Defines breathing patterns for guided breathing exercises
 * including 4-7-8 breathing and box breathing techniques.
 */

/**
 * A single phase in a breathing cycle
 */
export interface BreathPhase {
  name: 'inhale' | 'hold' | 'exhale' | 'holdEmpty';
  displayName: string;
  durationSeconds: number;
  instruction: string;
}

/**
 * A complete breathing pattern with all phases
 */
export interface BreathingPattern {
  id: string;
  name: string;
  description: string;
  icon: string;
  phases: BreathPhase[];
  /** Number of cycles to complete (default recommendation) */
  defaultCycles: number;
  /** Benefits of this breathing technique */
  benefits: string[];
}

/**
 * State of the breath timer during a session
 */
export interface BreathTimerState {
  isActive: boolean;
  currentPhaseIndex: number;
  currentCycle: number;
  totalCycles: number;
  phaseProgress: number; // 0-1 for animation
  isPaused: boolean;
}

/**
 * Built-in breathing patterns
 */
export const BREATHING_PATTERNS: Record<string, BreathingPattern> = {
  '4-7-8': {
    id: '4-7-8',
    name: '4-7-8 Breathing',
    description: 'A calming technique that promotes relaxation and sleep',
    icon: '🌙',
    phases: [
      {
        name: 'inhale',
        displayName: 'Breathe In',
        durationSeconds: 4,
        instruction: 'Inhale quietly through your nose',
      },
      {
        name: 'hold',
        displayName: 'Hold',
        durationSeconds: 7,
        instruction: 'Hold your breath gently',
      },
      {
        name: 'exhale',
        displayName: 'Breathe Out',
        durationSeconds: 8,
        instruction: 'Exhale slowly through your mouth',
      },
    ],
    defaultCycles: 4,
    benefits: [
      'Reduces anxiety and stress',
      'Promotes better sleep',
      'Calms the nervous system',
    ],
  },
  'box': {
    id: 'box',
    name: 'Box Breathing',
    description: 'A balanced technique used by Navy SEALs for focus and calm',
    icon: '📦',
    phases: [
      {
        name: 'inhale',
        displayName: 'Breathe In',
        durationSeconds: 4,
        instruction: 'Inhale slowly and steadily',
      },
      {
        name: 'hold',
        displayName: 'Hold Full',
        durationSeconds: 4,
        instruction: 'Hold with lungs full',
      },
      {
        name: 'exhale',
        displayName: 'Breathe Out',
        durationSeconds: 4,
        instruction: 'Exhale slowly and completely',
      },
      {
        name: 'holdEmpty',
        displayName: 'Hold Empty',
        durationSeconds: 4,
        instruction: 'Hold with lungs empty',
      },
    ],
    defaultCycles: 4,
    benefits: [
      'Improves focus and concentration',
      'Reduces stress response',
      'Increases mental clarity',
    ],
  },
  'relaxing': {
    id: 'relaxing',
    name: 'Relaxing Breath',
    description: 'Simple extended exhale for quick stress relief',
    icon: '🍃',
    phases: [
      {
        name: 'inhale',
        displayName: 'Breathe In',
        durationSeconds: 4,
        instruction: 'Inhale gently through your nose',
      },
      {
        name: 'exhale',
        displayName: 'Breathe Out',
        durationSeconds: 6,
        instruction: 'Exhale slowly, twice as long',
      },
    ],
    defaultCycles: 6,
    benefits: [
      'Quick stress relief',
      'Activates relaxation response',
      'Easy to practice anywhere',
    ],
  },
};

/**
 * Get a breathing pattern by ID
 */
export function getBreathingPattern(id: string): BreathingPattern | undefined {
  return BREATHING_PATTERNS[id];
}

/**
 * Get all available breathing patterns
 */
export function getAllBreathingPatterns(): BreathingPattern[] {
  return Object.values(BREATHING_PATTERNS);
}

/**
 * Calculate total duration of one complete cycle in seconds
 */
export function getCycleDuration(pattern: BreathingPattern): number {
  return pattern.phases.reduce((sum, phase) => sum + phase.durationSeconds, 0);
}

/**
 * Calculate total session duration in seconds
 */
export function getSessionDuration(pattern: BreathingPattern, cycles: number): number {
  return getCycleDuration(pattern) * cycles;
}

/**
 * Format duration as minutes:seconds string
 */
export function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (minutes === 0) {
    return `${seconds}s`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
