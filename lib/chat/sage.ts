import { generateChat, isModelReady } from '../llm/inference';
import {
  detectIntentThemes,
  searchWisdom,
  type ThemeTag,
  type WisdomChunk,
} from '../retrieval/search';

export type ChatTone = 'practical' | 'poetic' | 'minimal' | 'deep';

export type SageCitation = {
  content: string;
  sourceRef: string;
};

export type SageReply = {
  content: string;
  citedVerses: SageCitation[];
};

export type SageReplyOptions = {
  tone?: ChatTone;
  preferredThemes?: ThemeTag[];
  preferredTraditions?: string[];
};

type RetrievedPassage = {
  content: string;
  sourceRef: string;
  book: string;
  theme: ThemeTag;
  tone: string;
};

function normalizeTone(tone: unknown): ChatTone {
  if (tone === 'practical' || tone === 'poetic' || tone === 'minimal' || tone === 'deep') {
    return tone;
  }
  return 'practical';
}

function buildSystemPrompt(tone: ChatTone): string {
  const style =
    tone === 'minimal'
      ? 'Be concise. 4-8 sentences total.'
      : tone === 'poetic'
        ? 'Use gentle poetic language without being flowery.'
        : tone === 'deep'
          ? 'Go deeper: one clarifying lens + one practice.'
          : 'Be grounded and practical.';

  return [
    'You are Sage, a privacy-first on-device guide that offers non-dogmatic wisdom and reflection.',
    style,
    'Use ONLY the retrieved passages for factual claims. If passages are insufficient, ask one clarifying question.',
    'Do not name specific scriptures, authors, or websites. Do not include citations in the response text.',
    'Output format:',
    'Guidance: <1 short paragraph>',
    'Reflection: <2 bullet questions>',
    'Practice: <1 short actionable step>',
  ].join('\n');
}

function formatRetrievedContext(passages: RetrievedPassage[]): string {
  if (passages.length === 0) return 'No passages retrieved.';

  const lines = passages.map((p, idx) => {
    const text = p.content.replace(/\s+/g, ' ').trim();
    const clipped = text.length > 700 ? `${text.slice(0, 700)}…` : text;
    return `[${idx + 1}] ${clipped}\nref: ${p.sourceRef}\nbook: ${p.book}\ntheme: ${p.theme}\n`;
  });

  return ['Retrieved passages:', ...lines].join('\n');
}

function pickCitations(chunks: WisdomChunk[], limit: number): SageCitation[] {
  return chunks.slice(0, limit).map((c) => ({
    content: c.content,
    sourceRef: c.sourceRef,
  }));
}

function buildFallbackReply(userText: string, chunks: WisdomChunk[], tone: ChatTone): SageReply {
  const citations = pickCitations(chunks, 2);

  if (chunks.length === 0) {
    const content =
      tone === 'minimal'
        ? `Guidance: Tell me a little more about what feels hardest right now.\n\nReflection:\n- What are you hoping will change?\n- What is one small thing you can do today?\n\nPractice: Take 3 slow breaths and name one next step.`
        : `Guidance: I can help, but I need one detail to anchor this. What feels most urgent or painful about it right now?\n\nReflection:\n- What are you afraid will happen if nothing changes?\n- What would a kind, realistic next step look like today?\n\nPractice: Breathe in for 4, out for 6, three times. Then write one sentence: “Today I will…”`;

    return { content, citedVerses: [] };
  }

  const primary = chunks[0];
  const guidanceLead =
    tone === 'poetic'
      ? 'Let this land softly: '
      : tone === 'deep'
        ? 'A useful lens here: '
        : '';

  const guidance = `${guidanceLead}${primary.content.replace(/\s+/g, ' ').trim()}`;

  const reflection =
    tone === 'minimal'
      ? ['Reflection:', '- What in this speaks to you?', '- What is one small action you can take?'].join('\n')
      : ['Reflection:', '- What part of this feels difficult to accept?', '- What would “right action” look like in the next 24 hours?'].join('\n');

  const practice =
    tone === 'deep'
      ? 'Practice: For 60 seconds, notice one sensation in the body, then choose one tiny action that matches your values.'
      : 'Practice: Take 60 seconds to breathe slowly, then write one sentence about your next step.';

  return {
    content: `Guidance: ${guidance}\n\n${reflection}\n\n${practice}`,
    citedVerses: citations,
  };
}

export async function generateSageReply(userText: string, options: SageReplyOptions = {}): Promise<SageReply> {
  const text = userText.trim();
  if (!text) {
    return { content: '', citedVerses: [] };
  }

  const tone = normalizeTone(options.tone);
  const intentThemes = detectIntentThemes(text);
  const themeFilter = (options.preferredThemes && options.preferredThemes.length > 0)
    ? options.preferredThemes
    : intentThemes;

  // Use preferred traditions if specified
  const traditionFilter = options.preferredTraditions && options.preferredTraditions.length > 0
    ? options.preferredTraditions
    : undefined;

  let chunks = await searchWisdom(text, {
    themes: themeFilter.length > 0 ? themeFilter : undefined,
    books: traditionFilter,
    limit: 5,
  });

  if (chunks.length === 0 && (themeFilter.length > 0 || traditionFilter)) {
    // Fall back to broader search without filters
    chunks = await searchWisdom(text, { limit: 5 });
  }

  const citations = pickCitations(chunks, 3);

  console.log('[Sage] generateSageReply - Model ready:', isModelReady());
  if (!isModelReady()) {
    console.log('[Sage] generateSageReply - Using fallback (model not ready)');
    return buildFallbackReply(text, chunks, tone);
  }

  const retrievedContext = formatRetrievedContext(
    chunks.map((c) => ({
      content: c.content,
      sourceRef: c.sourceRef,
      book: c.book,
      theme: c.theme,
      tone: c.tone,
    }))
  );

  const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
    { role: 'system', content: buildSystemPrompt(tone) },
    { role: 'user', content: retrievedContext },
    { role: 'user', content: `User message: ${text}` },
  ];

  try {
    console.log('[Sage] generateSageReply - Calling generateChat...');
    const result = await generateChat(messages, { nPredict: 320, temperature: 0.7 });
    const content = (result.content || result.text || '').trim();
    console.log('[Sage] generateSageReply - Got response, length:', content.length);

    if (!content) {
      console.log('[Sage] generateSageReply - Empty response, using fallback');
      return buildFallbackReply(text, chunks, tone);
    }

    return {
      content,
      citedVerses: citations,
    };
  } catch (error) {
    console.error('[Sage] generateSageReply - Error:', error);
    return buildFallbackReply(text, chunks, tone);
  }
}
