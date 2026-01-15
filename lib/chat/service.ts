import { generateChat, isModelReady, getModelStatus, type GenerateOptions, type ChatMessage as LLMChatMessage } from '../llm/inference';
import { detectIntentThemes, searchWisdom, type SearchOptions, type ToneTag, type WisdomChunk, type ThemeTag } from '../retrieval/search';
import type { TonePreference, UserPreferences, ChatMessage, SessionSummary, DeveloperSettings } from '../storage/store';

export type CitedVerse = { content: string; sourceRef: string };

export type AssistantResult = {
  content: string;
  citedVerses: CitedVerse[];
};

export type ToneVariantType = 'practical' | 'poetic' | 'deep';

export type ToneVariants = {
  practical: AssistantResult;
  poetic: AssistantResult;
  deep: AssistantResult;
};

export type RegenerateTemperature = 'low' | 'medium' | 'high';

export interface RegenerateOptions {
  temperature: RegenerateTemperature;
  useDifferentWisdom: boolean;
}

const TEMPERATURE_VALUES: Record<RegenerateTemperature, number> = {
  low: 0.5,    // More focused, deterministic
  medium: 0.8, // Balanced (default)
  high: 1.1,   // More creative, varied
};

/**
 * Builds generate options from developer settings if enabled,
 * otherwise uses provided defaults.
 */
function buildGenerateOptions(
  developerSettings: DeveloperSettings | undefined,
  defaults: Partial<GenerateOptions> = {}
): GenerateOptions {
  // If developer settings are enabled, use them
  if (developerSettings?.enabled) {
    return {
      nPredict: defaults.nPredict ?? 512,
      temperature: developerSettings.temperature,
      topK: developerSettings.topK,
      topP: developerSettings.topP,
      repeatPenalty: developerSettings.repeatPenalty,
      stop: defaults.stop,
    };
  }

  // Otherwise use defaults
  return {
    nPredict: defaults.nPredict ?? 512,
    temperature: defaults.temperature ?? 0.8,
    topK: defaults.topK,
    topP: defaults.topP,
    repeatPenalty: defaults.repeatPenalty ?? 1.2,
    stop: defaults.stop,
  };
}

// Context window configuration (exported for testing)
export const CONTEXT_WINDOW_SIZE = 20; // Number of recent messages to include
export const SUMMARIZATION_THRESHOLD = 10; // Summarize older messages when history exceeds this
export const SUMMARY_MESSAGE_COUNT = 10; // Number of older messages to summarize into one

/**
 * Summarizes a batch of older messages into a concise context summary.
 * This helps maintain coherence across longer conversations while staying within token limits.
 */
export function summarizeOlderMessages(
  messages: Array<{ role: 'user' | 'assistant'; content: string }>
): string {
  // Extract key topics and themes from older messages
  const userMessages = messages.filter(m => m.role === 'user').map(m => m.content);
  const assistantMessages = messages.filter(m => m.role === 'assistant').map(m => m.content);

  // Create a condensed summary of the conversation context
  const userTopics = userMessages
    .map(content => {
      // Extract first sentence or up to 100 chars as topic indicator
      const firstSentence = content.split(/[.!?]/)[0];
      return firstSentence.length > 100 ? firstSentence.slice(0, 100) + '...' : firstSentence;
    })
    .filter(topic => topic.trim().length > 0);

  // Extract guidance themes from assistant responses
  const guidanceThemes = assistantMessages
    .map(content => {
      // Look for the Guidance section
      const guidanceMatch = content.match(/Guidance:([^]*?)(?=Reflection:|Practice:|$)/i);
      if (guidanceMatch) {
        const guidance = guidanceMatch[1].trim();
        return guidance.length > 150 ? guidance.slice(0, 150) + '...' : guidance;
      }
      return null;
    })
    .filter((theme): theme is string => theme !== null);

  // Build summary
  const summaryParts: string[] = [];

  if (userTopics.length > 0) {
    summaryParts.push(`Earlier topics discussed: ${userTopics.slice(0, 3).join('; ')}`);
  }

  if (guidanceThemes.length > 0) {
    summaryParts.push(`Previous guidance themes: ${guidanceThemes.slice(0, 2).join('; ')}`);
  }

  return summaryParts.length > 0
    ? `[Context from earlier in conversation: ${summaryParts.join('. ')}]`
    : '';
}

/**
 * Prepares messages for the LLM context with smart summarization.
 * - For conversations <= SUMMARIZATION_THRESHOLD: includes all recent messages
 * - For longer conversations: summarizes older messages and includes recent ones
 */
export function prepareContextMessages(
  previousMessages: Array<{ role: 'user' | 'assistant'; content: string }>
): Array<{ role: 'user' | 'assistant' | 'system'; content: string }> {
  // Get the most recent messages up to CONTEXT_WINDOW_SIZE
  const recentMessages = previousMessages.slice(-CONTEXT_WINDOW_SIZE);

  // If we have more messages than the threshold, create a summary of older messages
  if (previousMessages.length > SUMMARIZATION_THRESHOLD) {
    const olderMessages = previousMessages.slice(
      Math.max(0, previousMessages.length - CONTEXT_WINDOW_SIZE - SUMMARY_MESSAGE_COUNT),
      previousMessages.length - SUMMARIZATION_THRESHOLD
    );

    if (olderMessages.length > 0) {
      const summary = summarizeOlderMessages(olderMessages);
      if (summary) {
        // Prepend summary as a system-style context marker within user message
        // We return it separately to be inserted appropriately
        return [
          { role: 'system' as const, content: summary },
          ...recentMessages.map(m => ({ role: m.role, content: m.content }))
        ];
      }
    }
  }

  return recentMessages.map(m => ({ role: m.role, content: m.content }));
}

const TONE_TO_TONES: Record<TonePreference, ToneTag[]> = {
  practical: ['direct'],
  minimal: ['direct'],
  deep: ['philosophical'],
  poetic: ['poetic'],
};

function formatPassageList(chunks: WisdomChunk[]): string {
  return chunks
    .map((chunk, idx) => {
      const header = `Passage ${idx + 1}:`;
      return `${header}\n${chunk.content}`;
    })
    .join('\n\n');
}

function buildSystemPrompt(preferences: UserPreferences, passages: WisdomChunk[]): string {
  const tone = preferences.tone;
  const voiceGuidance: Record<TonePreference, string> = {
    practical: 'Be clear, grounded, and concrete. Give specific, non-vague advice.',
    minimal: 'Be extremely brief. Use max 2 sentences per section.',
    deep: 'Be philosophical and probing. Use Socratic questioning to help the user find their own truth.',
    poetic: 'Use metaphors and beautiful language. Be gentle and inspiring.',
  };

  return [
    'You are Sage, a wise and empathetic companion. Engage in a natural conversation.',
    `Your current tone is: ${tone}. ${voiceGuidance[tone]}`,
    "ALWAYS address the user's specific situation directly. Do not just quote text.",
    'Use the provided passages only as inspiration for your wisdom. Do not name the sources.',
    'Structure your response with these exact headers:',
    'Guidance: (Your empathetic response)',
    'Reflection: (2 thoughtful questions)',
    'Practice: (1 tiny micro-action)',
    '',
    'Wisdom for context:',
    formatPassageList(passages),
  ].join('\n');
}

// Voice guidance for tone variants feature
const TONE_VARIANT_GUIDANCE: Record<ToneVariantType, string> = {
  practical: 'Be clear, grounded, and concrete. Give specific, actionable advice with real-world steps.',
  poetic: 'Use metaphors, imagery, and beautiful language. Be gentle, evocative, and inspiring like a poem.',
  deep: 'Be philosophical and probing. Use Socratic questioning to help the user explore deeper truths within themselves.',
};

function buildToneVariantSystemPrompt(tone: ToneVariantType, passages: WisdomChunk[]): string {
  return [
    'You are Sage, a wise and empathetic companion. Engage in a natural conversation.',
    `Your current tone is: ${tone}. ${TONE_VARIANT_GUIDANCE[tone]}`,
    "ALWAYS address the user's specific situation directly. Do not just quote text.",
    'Use the provided passages only as inspiration for your wisdom. Do not name the sources.',
    'Structure your response with these exact headers:',
    'Guidance: (Your empathetic response)',
    'Reflection: (2 thoughtful questions)',
    'Practice: (1 tiny micro-action)',
    '',
    'Wisdom for context:',
    formatPassageList(passages),
  ].join('\n');
}

function buildFallback(preferences: UserPreferences, passages: WisdomChunk[], query: string): AssistantResult {
  const citedVerses: CitedVerse[] = passages.slice(0, 2).map((p) => ({
    content: p.content,
    sourceRef: p.sourceRef,
  }));

  const first = passages[0];
  const opening = preferences.tone === 'minimal'
    ? 'Guidance:\nPause. Notice what you are carrying right now.'
    : 'Guidance:\nPause for a breath. Name the feeling without defending it.';

  const middle = first
    ? `\n\nA passage to reflect on:\n${first.content}`
    : '';

  const reflection =
    '\n\nReflection:\n- What outcome am I clinging to?\n- What is the smallest honest next step?\n- If I acted without fear, what would change today?';

  const practice =
    "\n\nPractice:\n- 3 breaths.\n- On each exhale, repeat: 'Let the next step be small and real.'\n- Then write one sentence answering: 'Right now I can…'";

  return {
    content: `${opening}${middle}${reflection}${practice}`.trim(),
    citedVerses,
  };
}

export async function generateAssistantResult(
  userText: string,
  preferences: UserPreferences,
  previousMessages: Array<{ role: 'user' | 'assistant'; content: string }> = []
): Promise<AssistantResult> {
  // Debug logging to trace chat flow
  console.log('[Sage] ========== generateAssistantResult called ==========');
  console.log('[Sage] Model ready check:', isModelReady());
  console.log('[Sage] User text:', userText.substring(0, 100));

  const themes = detectIntentThemes(userText);
  const tones = TONE_TO_TONES[preferences.tone];

  // Use preferred traditions if specified and not in cross-tradition blending mode
  const traditionFilter = preferences.preferredTraditions && preferences.preferredTraditions.length > 0
    ? preferences.preferredTraditions
    : undefined;

  const searchOptions: SearchOptions = {
    limit: 6,
    themes: themes.length > 0 ? themes : undefined,
    tones,
    books: traditionFilter,
  };

  let passages = await searchWisdom(userText, searchOptions);

  // Fall back to broader search if no results with tradition filter
  if (passages.length === 0 && traditionFilter) {
    passages = await searchWisdom(userText, { limit: 6, themes: themes.length > 0 ? themes : undefined, tones });
  }

  if (passages.length === 0) {
    return {
      content:
        "Guidance:\nI couldn't find a close match in the local wisdom library yet. Try rephrasing in simpler words.\n\nReflection:\n- What exactly is the knot?\n- What would relief look like in 1% smaller form?\n\nPractice:\n- Write a single sentence starting with: 'Right now, I feel…'",
      citedVerses: [],
    };
  }

  const modelStatus = getModelStatus();
  const modelReady = isModelReady();
  console.log('[Sage] 🔍 Model status:', JSON.stringify(modelStatus));
  console.log('[Sage] 🔍 isModelReady() result:', modelReady);
  if (!modelReady) {
    console.log('[Sage] ⚠️ Model NOT ready - returning fallback response');
    console.log('[Sage] ⚠️ Context exists:', modelStatus.contextExists, ', Verified:', modelStatus.verified);
    // Return a clearly marked fallback so user can identify it
    const fallback = buildFallback(preferences, passages, userText);
    fallback.content = `[FALLBACK - Model not ready: ctx=${modelStatus.contextExists}, verified=${modelStatus.verified}]\n\n${fallback.content}`;
    return fallback;
  }
  console.log('[Sage] ✅ Model IS ready - proceeding with LLM generation');

  const system = buildSystemPrompt(preferences, passages.slice(0, 5));

  // Prepare context with smart summarization for longer conversations
  const contextMessages = prepareContextMessages(previousMessages);

  // Build the full message array
  const messages: LLMChatMessage[] = [
    { role: 'system', content: system },
  ];

  // Add context summary if present (it will be the first element with role 'system')
  const contextSummary = contextMessages.find(m => m.role === 'system');
  if (contextSummary) {
    // Append context summary to the system prompt for seamless integration
    messages[0] = {
      role: 'system',
      content: `${system}\n\n${contextSummary.content}`,
    };
  }

  // Add the conversation history (excluding any system summary)
  const conversationHistory = contextMessages.filter(m => m.role !== 'system');
  messages.push(
    ...conversationHistory.map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content })),
    { role: 'user', content: userText },
  );

  const generateOptions = buildGenerateOptions(preferences.developerSettings, {
    nPredict: 512,
    temperature: 0.8,
    repeatPenalty: 1.2,
  });

  console.log('[Sage] Generating with context:', messages.length, 'messages (window:', CONTEXT_WINDOW_SIZE, ', with summarization:', contextSummary ? 'yes' : 'no', ', devSettings:', preferences.developerSettings?.enabled ? 'ON' : 'off', ')');

  try {
    console.log('[Sage] 🚀 About to call generateChat...');
    const completion = await generateChat(messages, generateOptions);
    console.log('[Sage] ✅ generateChat returned successfully');
    console.log('[Sage] Completion content length:', completion?.content?.length || 0);
    console.log('[Sage] Completion text length:', completion?.text?.length || 0);
    console.log('[Sage] Tokens predicted:', completion?.tokensPredicted || 0);

    const resultContent = completion.content || completion.text || 'I apologize, but I was unable to generate a response. Please try again.';
    console.log('[Sage] Final content preview:', resultContent.substring(0, 150));

    return {
      content: resultContent,
      citedVerses: passages.slice(0, 3).map((p) => ({ content: p.content, sourceRef: p.sourceRef })),
    };
  } catch (error) {
    console.error('[Sage] ❌ generateAssistantResult error:', error);
    console.error('[Sage] Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    console.log('[Sage] ⚠️ Falling back to template response');
    // Fall back to template response on error - mark it clearly
    const fallback = buildFallback(preferences, passages, userText);
    const errorMsg = error instanceof Error ? error.message : String(error);
    fallback.content = `[FALLBACK - Error: ${errorMsg.substring(0, 100)}]\n\n${fallback.content}`;
    return fallback;
  }
}

/**
 * Regenerates an assistant response with different temperature/parameters.
 * Uses the original user message that preceded the assistant response.
 */
export async function regenerateAssistantResult(
  originalUserText: string,
  preferences: UserPreferences,
  previousMessages: Array<{ role: 'user' | 'assistant'; content: string }> = [],
  options: RegenerateOptions
): Promise<AssistantResult> {
  const themes = detectIntentThemes(originalUserText);
  const tones = TONE_TO_TONES[preferences.tone];

  // Use preferred traditions if specified
  const traditionFilter = preferences.preferredTraditions && preferences.preferredTraditions.length > 0
    ? preferences.preferredTraditions
    : undefined;

  const searchOptions: SearchOptions = {
    limit: 6,
    themes: themes.length > 0 ? themes : undefined,
    tones,
    books: traditionFilter,
  };

  // If user wants different wisdom, add a random offset to get different passages
  let passages = await searchWisdom(originalUserText, searchOptions);

  // Fall back to broader search if no results with tradition filter
  if (passages.length === 0 && traditionFilter) {
    passages = await searchWisdom(originalUserText, { limit: 6, themes: themes.length > 0 ? themes : undefined, tones });
  }

  // If useDifferentWisdom is true, shuffle the passages to prioritize different ones
  const sortedPassages = options.useDifferentWisdom
    ? shuffleArray([...passages])
    : passages;

  if (sortedPassages.length === 0) {
    return {
      content:
        "Guidance:\nI couldn't find a close match in the local wisdom library yet. Try rephrasing in simpler words.\n\nReflection:\n- What exactly is the knot?\n- What would relief look like in 1% smaller form?\n\nPractice:\n- Write a single sentence starting with: 'Right now, I feel…'",
      citedVerses: [],
    };
  }

  console.log('[Sage] regenerateAssistantResult - Model ready:', isModelReady());
  if (!isModelReady()) {
    console.log('[Sage] regenerateAssistantResult - Using fallback (model not ready)');
    return buildFallback(preferences, sortedPassages, originalUserText);
  }

  const system = buildSystemPrompt(preferences, sortedPassages.slice(0, 5));

  // Prepare context with smart summarization for longer conversations
  const contextMessages = prepareContextMessages(previousMessages);

  // Build the full message array
  const messages: LLMChatMessage[] = [
    { role: 'system', content: system },
  ];

  // Add context summary if present (it will be the first element with role 'system')
  const contextSummary = contextMessages.find(m => m.role === 'system');
  if (contextSummary) {
    messages[0] = {
      role: 'system',
      content: `${system}\n\n${contextSummary.content}`,
    };
  }

  // Add the conversation history (excluding any system summary)
  const conversationHistory = contextMessages.filter(m => m.role !== 'system');
  messages.push(
    ...conversationHistory.map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content })),
    { role: 'user', content: originalUserText },
  );

  // Use the temperature from options, with a random seed-like variation
  // Developer settings override temperature if enabled
  const baseTemperature = TEMPERATURE_VALUES[options.temperature];
  const generateOptions = buildGenerateOptions(preferences.developerSettings, {
    nPredict: 512,
    temperature: baseTemperature,
    repeatPenalty: 1.2,
    // Add slight variation to topP based on temperature to increase diversity
    topP: options.temperature === 'high' ? 0.95 : 0.9,
  });

  console.log('[Sage] regenerateAssistantResult - Regenerating with temperature:', generateOptions.temperature, ', different wisdom:', options.useDifferentWisdom, ', devSettings:', preferences.developerSettings?.enabled ? 'ON' : 'off');

  try {
    const completion = await generateChat(messages, generateOptions);
    console.log('[Sage] regenerateAssistantResult - Got response, length:', (completion.content || completion.text).length);

    return {
      content: completion.content || completion.text,
      citedVerses: sortedPassages.slice(0, 3).map((p) => ({ content: p.content, sourceRef: p.sourceRef })),
    };
  } catch (error) {
    console.error('[Sage] regenerateAssistantResult - Error:', error);
    return buildFallback(preferences, sortedPassages, originalUserText);
  }
}

/**
 * Fisher-Yates shuffle for array randomization
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Generates the same guidance in three different tones: Practical, Poetic, and Deep.
 * Uses the same wisdom passages for all three variants to ensure consistency.
 * Returns all three variants so users can swipe between them.
 */
export async function generateToneVariants(
  userText: string,
  previousMessages: Array<{ role: 'user' | 'assistant'; content: string }> = []
): Promise<ToneVariants> {
  const themes = detectIntentThemes(userText);

  // Search for wisdom passages - use a blend of tone tags for variety
  const searchOptions: SearchOptions = {
    limit: 6,
    themes: themes.length > 0 ? themes : undefined,
    tones: ['direct', 'philosophical', 'poetic'], // Get a mix of tone types
  };

  const passages = await searchWisdom(userText, searchOptions);

  if (passages.length === 0) {
    const emptyResult: AssistantResult = {
      content:
        "Guidance:\nI couldn't find a close match in the local wisdom library yet. Try rephrasing in simpler words.\n\nReflection:\n- What exactly is the knot?\n- What would relief look like in 1% smaller form?\n\nPractice:\n- Write a single sentence starting with: 'Right now, I feel…'",
      citedVerses: [],
    };
    return {
      practical: emptyResult,
      poetic: emptyResult,
      deep: emptyResult,
    };
  }

  // Prepare context with smart summarization for longer conversations
  const contextMessages = prepareContextMessages(previousMessages);
  const contextSummary = contextMessages.find(m => m.role === 'system');
  const conversationHistory = contextMessages.filter(m => m.role !== 'system');

  const citedVerses = passages.slice(0, 3).map((p) => ({ content: p.content, sourceRef: p.sourceRef }));

  // If model is not ready, return fallback responses for each tone
  console.log('[Sage] generateToneVariants - Model ready:', isModelReady());
  if (!isModelReady()) {
    console.log('[Sage] generateToneVariants - Using fallback (model not ready)');
    const fallbackContent = (tone: ToneVariantType): string => {
      const first = passages[0];
      const toneOpening: Record<ToneVariantType, string> = {
        practical: 'Guidance:\nTake one specific step today. Focus on what you can control right now.',
        poetic: 'Guidance:\nLike water finding its way through stone, your path reveals itself in stillness.',
        deep: 'Guidance:\nConsider: what is the question beneath your question?',
      };

      const opening = toneOpening[tone];
      const middle = first ? `\n\nA passage to reflect on:\n${first.content}` : '';
      const reflection = '\n\nReflection:\n- What outcome am I clinging to?\n- What is the smallest honest next step?';
      const practice = "\n\nPractice:\n- Take 3 breaths. On each exhale, release one expectation.";

      return `${opening}${middle}${reflection}${practice}`.trim();
    };

    return {
      practical: { content: fallbackContent('practical'), citedVerses },
      poetic: { content: fallbackContent('poetic'), citedVerses },
      deep: { content: fallbackContent('deep'), citedVerses },
    };
  }

  // Generate all three tone variants
  const toneTypes: ToneVariantType[] = ['practical', 'poetic', 'deep'];

  const generateVariant = async (tone: ToneVariantType): Promise<AssistantResult> => {
    const system = buildToneVariantSystemPrompt(tone, passages.slice(0, 5));

    const messages: LLMChatMessage[] = [
      { role: 'system', content: contextSummary ? `${system}\n\n${contextSummary.content}` : system },
    ];

    messages.push(
      ...conversationHistory.map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content })),
      { role: 'user', content: userText },
    );

    try {
      console.log(`[Sage] generateToneVariants - Generating ${tone} variant...`);
      const completion = await generateChat(messages, {
        nPredict: 512,
        temperature: 0.85, // Slightly higher for more varied responses between tones
        repeatPenalty: 1.2,
      });
      console.log(`[Sage] generateToneVariants - ${tone} variant complete, length:`, (completion.content || completion.text).length);

      return {
        content: completion.content || completion.text,
        citedVerses,
      };
    } catch (error) {
      console.error(`[Sage] generateToneVariants - Error generating ${tone} variant:`, error);
      // Return fallback for this tone
      const fallbackMap = {
        practical: 'Guidance:\nTake one specific step today. Focus on what you can control right now.',
        poetic: 'Guidance:\nLike water finding its way through stone, your path reveals itself in stillness.',
        deep: 'Guidance:\nConsider: what is the question beneath your question?',
      };
      return {
        content: fallbackMap[tone] + '\n\nReflection:\n- What outcome am I clinging to?\n- What is the smallest honest next step?\n\nPractice:\n- Take 3 breaths. On each exhale, release one expectation.',
        citedVerses,
      };
    }
  };

  console.log('[Sage] generateToneVariants - Starting to generate 3 tone variants...');

  // Generate all three variants SEQUENTIALLY (not in parallel!)
  // llama.rn only allows one completion at a time - parallel calls cause "context is busy" error
  console.log('[Sage] generateToneVariants - Generating practical variant...');
  const practical = await generateVariant('practical');

  console.log('[Sage] generateToneVariants - Generating poetic variant...');
  const poetic = await generateVariant('poetic');

  console.log('[Sage] generateToneVariants - Generating deep variant...');
  const deep = await generateVariant('deep');

  console.log('[Sage] All 3 tone variants generated successfully');

  return { practical, poetic, deep };
}

// Minimum session requirements for generating a summary
const MIN_MESSAGES_FOR_SUMMARY = 2; // At least 1 exchange (user + assistant)
const MIN_DURATION_MS_FOR_SUMMARY = 30000; // At least 30 seconds

/**
 * Extracts dominant themes from all chat messages
 */
function extractSessionThemes(chatHistory: ChatMessage[]): ThemeTag[] {
  const themeCounts = new Map<ThemeTag, number>();

  // Analyze user messages to detect intent themes
  for (const msg of chatHistory) {
    if (msg.role === 'user') {
      const themes = detectIntentThemes(msg.content);
      for (const theme of themes) {
        themeCounts.set(theme, (themeCounts.get(theme) || 0) + 1);
      }
    }
  }

  // Sort by frequency and return top 3
  const sortedThemes = Array.from(themeCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([theme]) => theme);

  return sortedThemes.slice(0, 3);
}

/**
 * Collects key insights (cited verses) from the session
 */
function collectKeyInsights(chatHistory: ChatMessage[]): Array<{ content: string; sourceRef: string }> {
  const insights: Array<{ content: string; sourceRef: string }> = [];
  const seenRefs = new Set<string>();

  for (const msg of chatHistory) {
    if (msg.role === 'assistant' && msg.citedVerses) {
      for (const verse of msg.citedVerses) {
        if (!seenRefs.has(verse.sourceRef)) {
          seenRefs.add(verse.sourceRef);
          insights.push({ content: verse.content, sourceRef: verse.sourceRef });
        }
      }
    }
  }

  // Return top 3 unique citations
  return insights.slice(0, 3);
}

/**
 * Builds a prompt for the LLM to summarize the session
 */
function buildSummaryPrompt(chatHistory: ChatMessage[], preferences: UserPreferences): string {
  const conversationText = chatHistory
    .map((msg) => {
      const role = msg.role === 'user' ? 'User' : 'Sage';
      // Truncate long messages for the summary context
      const content = msg.content.length > 300
        ? msg.content.slice(0, 300) + '...'
        : msg.content;
      return `${role}: ${content}`;
    })
    .join('\n\n');

  const toneGuidance: Record<TonePreference, string> = {
    practical: 'Be direct and concrete.',
    minimal: 'Be extremely brief - 1-2 sentences only.',
    deep: 'Capture the philosophical essence.',
    poetic: 'Use beautiful, evocative language.',
  };

  return `You are summarizing a wisdom-seeking conversation. ${toneGuidance[preferences.tone]}

Conversation:
${conversationText}

Write a brief summary (2-3 sentences) capturing:
1. What the person was seeking guidance about
2. The key insight or wisdom that emerged

Summary:`;
}

/**
 * Generates a fallback summary without LLM
 */
function generateFallbackSummary(
  chatHistory: ChatMessage[],
  themes: ThemeTag[],
  keyInsights: Array<{ content: string; sourceRef: string }>
): string {
  // Extract user topics
  const userMessages = chatHistory.filter(m => m.role === 'user');
  const firstUserMessage = userMessages[0]?.content || '';
  const topic = firstUserMessage.length > 100
    ? firstUserMessage.slice(0, 100) + '...'
    : firstUserMessage;

  // Build summary from available information
  const parts: string[] = [];

  if (topic) {
    parts.push(`You explored: "${topic}"`);
  }

  if (themes.length > 0) {
    const themeLabels = themes.map(t => t.charAt(0).toUpperCase() + t.slice(1));
    parts.push(`Key themes: ${themeLabels.join(', ')}.`);
  }

  if (keyInsights.length > 0) {
    parts.push(`Wisdom sources cited: ${keyInsights.map(i => i.sourceRef).join(', ')}.`);
  }

  return parts.join(' ') || 'A brief conversation with Sage.';
}

/**
 * Checks if a chat session qualifies for summary generation
 */
export function shouldGenerateSessionSummary(
  chatHistory: ChatMessage[],
  durationMs: number
): boolean {
  return (
    chatHistory.length >= MIN_MESSAGES_FOR_SUMMARY &&
    durationMs >= MIN_DURATION_MS_FOR_SUMMARY
  );
}

/**
 * Generates a summary of the chat session including key themes and insights.
 * Shows the summary when the user exits with an option to save to journal.
 */
export async function generateSessionSummary(
  chatHistory: ChatMessage[],
  preferences: UserPreferences,
  sessionId: string,
  durationMs: number
): Promise<SessionSummary> {
  const themes = extractSessionThemes(chatHistory);
  const keyInsights = collectKeyInsights(chatHistory);

  let summaryText: string;

  console.log('[Sage] generateSessionSummary - Model ready:', isModelReady());
  if (isModelReady() && chatHistory.length >= 2) {
    try {
      const prompt = buildSummaryPrompt(chatHistory, preferences);
      const messages: LLMChatMessage[] = [
        { role: 'user', content: prompt },
      ];

      console.log('[Sage] generateSessionSummary - Generating session summary...');
      const completion = await generateChat(messages, {
        nPredict: 150,
        temperature: 0.6,
        repeatPenalty: 1.2,
      });
      console.log('[Sage] generateSessionSummary - Got response, length:', (completion.content || completion.text).length);

      summaryText = (completion.content || completion.text).trim();

      // Clean up the summary if it starts with "Summary:" or similar
      summaryText = summaryText
        .replace(/^(Summary|Here's|Here is)[:\s]*/i, '')
        .trim();

    } catch (error) {
      console.error('[Sage] generateSessionSummary - Error:', error);
      summaryText = generateFallbackSummary(chatHistory, themes, keyInsights);
    }
  } else {
    console.log('[Sage] generateSessionSummary - Using fallback (model not ready or insufficient messages)');
    summaryText = generateFallbackSummary(chatHistory, themes, keyInsights);
  }

  const summary: SessionSummary = {
    id: `summary_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    sessionId,
    messageCount: chatHistory.length,
    durationMs,
    themes,
    summaryText,
    keyInsights,
    createdAt: Date.now(),
    savedToJournal: false,
  };

  return summary;
}
