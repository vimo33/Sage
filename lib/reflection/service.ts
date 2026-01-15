import { generateChat, isModelReady, type ChatMessage as LLMChatMessage } from '../llm/inference';
import { searchByTheme, type WisdomChunk, type ThemeTag } from '../retrieval/search';
import type { UserPreferences, TonePreference } from '../storage/store';
import type { GuidedReflection, ReflectionPrompt, GuidedReflectionSession, ReflectionDepth } from './types';
import { getGuidedReflectionById } from './templates';

export interface ReflectionStepResult {
  sageResponse: string;
  citedVerse?: {
    content: string;
    sourceRef: string;
  };
}

const DEPTH_PROMPTING: Record<ReflectionDepth, string> = {
  opening: 'Be gentle and welcoming. Create a safe space for reflection.',
  exploring: 'Encourage curiosity. Help the user look more closely at their experience.',
  deepening: 'Guide toward deeper insight. Help uncover patterns and meaning.',
  integrating: 'Support understanding. Help connect insights to lived experience.',
  closing: 'Be affirming and grounding. Support integration and gentle closure.',
};

const TONE_VOICE: Record<TonePreference, string> = {
  practical: 'Be clear and grounded. Use concrete language.',
  minimal: 'Be brief and spacious. Use few words with intention.',
  deep: 'Be philosophical and probing. Invite deeper contemplation.',
  poetic: 'Use beautiful, evocative language. Be gentle and inspiring.',
};

function buildReflectionSystemPrompt(
  reflection: GuidedReflection,
  currentPrompt: ReflectionPrompt,
  preferences: UserPreferences,
  passage: WisdomChunk | null,
  previousResponses: Array<{ userResponse: string; sageResponse: string }>
): string {
  const tone = preferences.tone;
  const depthGuidance = DEPTH_PROMPTING[currentPrompt.depth];
  const voiceGuidance = TONE_VOICE[tone];

  const previousContext = previousResponses.length > 0
    ? `\n\nPrevious reflections in this session:\n${previousResponses
        .slice(-2)
        .map((r, i) => `User shared: "${r.userResponse.slice(0, 150)}..."\nSage responded: "${r.sageResponse.slice(0, 100)}..."`)
        .join('\n')}`
    : '';

  const wisdomContext = passage
    ? `\n\nDraw inspiration from this wisdom:\n"${passage.content}"\n- ${passage.sourceRef}`
    : '';

  return [
    `You are Sage, a wise and compassionate guide leading a "${reflection.title}" reflection session.`,
    `Theme: ${reflection.themeId}. ${depthGuidance}`,
    `Your voice: ${voiceGuidance}`,
    '',
    'IMPORTANT GUIDELINES:',
    '- Respond directly to what the user shares. Be personal, not generic.',
    '- Keep your response focused and concise (2-4 sentences of guidance).',
    '- End with ONE thoughtful follow-up question that deepens the reflection.',
    '- Do not lecture or give advice. Reflect back and gently inquire.',
    '- Honor whatever the user shares without judgment.',
    wisdomContext,
    previousContext,
  ].join('\n');
}

function buildFallbackResponse(
  currentPrompt: ReflectionPrompt,
  passage: WisdomChunk | null
): ReflectionStepResult {
  const fallbackResponses: Record<ReflectionDepth, string> = {
    opening: 'Thank you for pausing to reflect. What you share matters. Take your time.',
    exploring: 'I hear you. There is wisdom in looking closely at our experience. What else do you notice?',
    deepening: 'Something deeper may be arising. What would it mean to stay with this a little longer?',
    integrating: 'Insights are seeds. How might this understanding want to grow in your life?',
    closing: 'May what you have discovered today stay with you. What will you carry forward?',
  };

  return {
    sageResponse: fallbackResponses[currentPrompt.depth],
    citedVerse: passage
      ? { content: passage.content, sourceRef: passage.sourceRef }
      : undefined,
  };
}

/**
 * Generate Sage's response to a user's reflection
 */
export async function generateReflectionResponse(
  reflectionId: string,
  promptId: string,
  userResponse: string,
  preferences: UserPreferences,
  previousResponses: Array<{ userResponse: string; sageResponse: string }> = []
): Promise<ReflectionStepResult> {
  const reflection = getGuidedReflectionById(reflectionId);
  if (!reflection) {
    throw new Error(`Reflection not found: ${reflectionId}`);
  }

  const currentPrompt = reflection.prompts.find((p) => p.id === promptId);
  if (!currentPrompt) {
    throw new Error(`Prompt not found: ${promptId}`);
  }

  // Fetch a relevant wisdom passage for this theme
  const passages = await searchByTheme(reflection.themeId, { limit: 3 });
  const passage = passages.length > 0 ? passages[Math.floor(Math.random() * passages.length)] : null;

  console.log('[Sage] generateReflectionResponse - Model ready:', isModelReady());
  if (!isModelReady()) {
    console.log('[Sage] generateReflectionResponse - Using fallback (model not ready)');
    return buildFallbackResponse(currentPrompt, passage);
  }

  const systemPrompt = buildReflectionSystemPrompt(
    reflection,
    currentPrompt,
    preferences,
    passage,
    previousResponses
  );

  const messages: LLMChatMessage[] = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: `The reflection prompt was: "${currentPrompt.promptText}"\n\nUser's response: "${userResponse}"` },
  ];

  try {
    console.log('[Sage] generateReflectionResponse - Calling generateChat...');
    const completion = await generateChat(messages, {
      nPredict: 256,
      temperature: 0.85,
      repeatPenalty: 1.15,
    });
    console.log('[Sage] generateReflectionResponse - Got response, length:', (completion.content || completion.text).length);

    return {
      sageResponse: completion.content || completion.text,
      citedVerse: passage
        ? { content: passage.content, sourceRef: passage.sourceRef }
        : undefined,
    };
  } catch (error) {
    console.error('[Sage] generateReflectionResponse - Error:', error);
    return buildFallbackResponse(currentPrompt, passage);
  }
}

/**
 * Get the current prompt for a reflection session
 */
export function getCurrentPrompt(session: GuidedReflectionSession): ReflectionPrompt | null {
  const reflection = getGuidedReflectionById(session.reflectionId);
  if (!reflection) return null;

  if (session.currentStep >= reflection.prompts.length) {
    return null; // Session complete
  }

  return reflection.prompts[session.currentStep];
}

/**
 * Check if a reflection session is complete
 */
export function isSessionComplete(session: GuidedReflectionSession): boolean {
  const reflection = getGuidedReflectionById(session.reflectionId);
  if (!reflection) return true;

  return session.currentStep >= reflection.prompts.length;
}

/**
 * Get progress information for a reflection session
 */
export function getSessionProgress(session: GuidedReflectionSession): {
  currentStep: number;
  totalSteps: number;
  percentComplete: number;
  isComplete: boolean;
} {
  const reflection = getGuidedReflectionById(session.reflectionId);
  if (!reflection) {
    return { currentStep: 0, totalSteps: 0, percentComplete: 100, isComplete: true };
  }

  const totalSteps = reflection.prompts.length;
  const currentStep = session.currentStep;
  const percentComplete = Math.round((currentStep / totalSteps) * 100);

  return {
    currentStep,
    totalSteps,
    percentComplete,
    isComplete: currentStep >= totalSteps,
  };
}

/**
 * Generate a completion summary for a finished reflection session
 */
export async function generateSessionSummary(
  session: GuidedReflectionSession,
  preferences: UserPreferences
): Promise<string> {
  const reflection = getGuidedReflectionById(session.reflectionId);
  if (!reflection) {
    return 'Thank you for completing this reflection.';
  }

  console.log('[Sage] generateSessionSummary - Model ready:', isModelReady());
  if (!isModelReady()) {
    console.log('[Sage] generateSessionSummary - Using fallback (model not ready)');
    return `Thank you for completing the "${reflection.title}" reflection. May the insights you discovered stay with you.`;
  }

  const responseSummary = session.responses
    .map((r) => `- ${r.userResponse.slice(0, 100)}...`)
    .join('\n');

  const messages: LLMChatMessage[] = [
    {
      role: 'system',
      content: [
        `You are Sage, completing a "${reflection.title}" guided reflection session.`,
        'Write a brief, warm closing message (2-3 sentences) that:',
        '- Acknowledges the journey the user took',
        '- Highlights one key theme from their reflections',
        '- Offers an encouraging word for carrying this forward',
        'Be personal, not generic.',
      ].join('\n'),
    },
    {
      role: 'user',
      content: `The user completed a reflection on "${reflection.themeId}". Their responses touched on:\n${responseSummary}`,
    },
  ];

  try {
    console.log('[Sage] generateSessionSummary - Calling generateChat...');
    const completion = await generateChat(messages, {
      nPredict: 128,
      temperature: 0.8,
    });
    console.log('[Sage] generateSessionSummary - Got response, length:', (completion.content || completion.text).length);
    return completion.content || completion.text;
  } catch (error) {
    console.error('[Sage] generateSessionSummary - Error:', error);
    return `Thank you for completing the "${reflection.title}" reflection. May the insights you discovered stay with you.`;
  }
}
