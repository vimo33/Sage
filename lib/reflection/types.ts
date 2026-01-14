import type { ThemeTag } from '../retrieval/search';

export type ReflectionDepth = 'opening' | 'exploring' | 'deepening' | 'integrating' | 'closing';

export interface ReflectionPrompt {
  id: string;
  order: number;
  depth: ReflectionDepth;
  promptText: string;
  guidance: string; // Help text shown before user responds
  questionVariations?: string[]; // 3-5 alternative questions for deeper inquiry
}

export interface GuidedReflection {
  id: string;
  themeId: ThemeTag;
  title: string;
  description: string;
  icon: string;
  estimatedMinutes: number;
  prompts: ReflectionPrompt[];
}

export interface GuidedReflectionSession {
  reflectionId: string;
  currentStep: number;
  responses: Array<{
    promptId: string;
    userResponse: string;
    sageResponse: string;
    timestamp: number;
  }>;
  startedAt: number;
  completedAt: number | null;
}

export interface GuidedReflectionProgress {
  totalSteps: number;
  currentStep: number;
  isComplete: boolean;
  percentComplete: number;
}

export const REFLECTION_DEPTH_LABELS: Record<ReflectionDepth, string> = {
  opening: 'Opening',
  exploring: 'Exploring',
  deepening: 'Deepening',
  integrating: 'Integrating',
  closing: 'Closing',
};

export const REFLECTION_DEPTH_DESCRIPTIONS: Record<ReflectionDepth, string> = {
  opening: 'Settling in and noticing what is present',
  exploring: 'Looking more closely at thoughts and feelings',
  deepening: 'Connecting with deeper patterns and insights',
  integrating: 'Finding meaning and understanding',
  closing: 'Setting intentions and completing the reflection',
};
