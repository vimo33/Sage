/**
 * Contrasts Module - Find complementary or contrasting passages from different traditions
 *
 * This module helps users see multiple perspectives on their questions by finding
 * passages that offer different viewpoints on the same topic.
 */

import { searchWisdom, searchByTheme, type ThemeTag, type ToneTag, type WisdomChunk } from './search';

export interface ContrastPair {
  id: string;
  theme: ThemeTag;
  passages: [WisdomChunk, WisdomChunk];
  contrastType: 'complementary' | 'contrasting';
  createdAt: number;
}

export interface ContrastSet {
  id: string;
  query: string;
  pairs: ContrastPair[];
  createdAt: number;
}

/**
 * Complementary theme pairs - themes that work together to provide balance
 */
export const COMPLEMENTARY_THEMES: Array<[ThemeTag, ThemeTag]> = [
  ['action', 'meditation'],      // Active vs contemplative
  ['knowledge', 'devotion'],     // Intellectual vs emotional path
  ['discipline', 'compassion'],  // Structure vs softness
  ['self', 'duty'],              // Individual vs collective
  ['truth', 'peace'],            // Seeking vs acceptance
];

/**
 * Contrasting theme pairs - themes that offer opposing perspectives
 */
export const CONTRASTING_THEMES: Array<[ThemeTag, ThemeTag]> = [
  ['action', 'detachment'],      // Engagement vs letting go
  ['desire', 'peace'],           // Wanting vs contentment
  ['self', 'compassion'],        // Individual focus vs others focus
  ['knowledge', 'devotion'],        // Intellectual vs experiential understanding (using devotion as proxy)
  ['discipline', 'detachment'],  // Control vs surrender
];

/**
 * Theme descriptions for UI display
 */
export const THEME_DESCRIPTIONS: Record<ThemeTag, string> = {
  action: 'Taking action and engaging with the world',
  detachment: 'Letting go and non-attachment',
  suffering: 'Understanding and transcending pain',
  purpose: 'Finding meaning and direction',
  discipline: 'Self-control and spiritual practice',
  compassion: 'Love and care for others',
  self: 'Understanding the true self',
  impermanence: 'The changing nature of existence',
  devotion: 'Surrender and faith',
  knowledge: 'Wisdom and understanding',
  meditation: 'Inner stillness and contemplation',
  desire: 'Wants, cravings, and attachments',
  peace: 'Inner calm and contentment',
  duty: 'Responsibility and dharma',
  truth: 'Reality and ultimate truth',
};

/**
 * Find a contrasting or complementary theme for a given theme
 */
export function findRelatedTheme(theme: ThemeTag, type: 'complementary' | 'contrasting'): ThemeTag | null {
  const pairs = type === 'complementary' ? COMPLEMENTARY_THEMES : CONTRASTING_THEMES;

  for (const [theme1, theme2] of pairs) {
    if (theme1 === theme) return theme2;
    if (theme2 === theme) return theme1;
  }

  return null;
}

/**
 * Generate a unique ID for contrast sets and pairs
 */
function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Find contrasting passages on a topic from different books/traditions
 *
 * @param query - The user's question or topic
 * @param options - Search options
 * @returns ContrastSet with pairs of contrasting passages
 */
export async function findContrastingPassages(
  query: string,
  options: {
    maxPairs?: number;
    includeComplementary?: boolean;
    includeContrasting?: boolean;
  } = {}
): Promise<ContrastSet> {
  const {
    maxPairs = 3,
    includeComplementary = true,
    includeContrasting = true,
  } = options;

  const pairs: ContrastPair[] = [];

  // Search for passages matching the query
  const initialResults = await searchWisdom(query, { limit: 10 });

  if (initialResults.length === 0) {
    return {
      id: generateId('contrast_set'),
      query,
      pairs: [],
      createdAt: Date.now(),
    };
  }

  // Group results by book to get diverse sources
  const byBook = new Map<string, WisdomChunk[]>();
  for (const chunk of initialResults) {
    const existing = byBook.get(chunk.book) || [];
    existing.push(chunk);
    byBook.set(chunk.book, existing);
  }

  // Try to find pairs from different books
  const books = Array.from(byBook.keys());

  if (books.length >= 2) {
    // We have passages from multiple books - create pairs
    for (let i = 0; i < books.length - 1 && pairs.length < maxPairs; i++) {
      for (let j = i + 1; j < books.length && pairs.length < maxPairs; j++) {
        const passage1 = byBook.get(books[i])![0];
        const passage2 = byBook.get(books[j])![0];

        // Determine if this is complementary or contrasting based on themes
        const isContrasting = CONTRASTING_THEMES.some(
          ([t1, t2]) =>
            (passage1.theme === t1 && passage2.theme === t2) ||
            (passage1.theme === t2 && passage2.theme === t1)
        );

        const contrastType = isContrasting ? 'contrasting' : 'complementary';

        // Only add if we want this type
        if ((contrastType === 'complementary' && includeComplementary) ||
            (contrastType === 'contrasting' && includeContrasting)) {
          pairs.push({
            id: generateId('contrast_pair'),
            theme: passage1.theme,
            passages: [passage1, passage2],
            contrastType,
            createdAt: Date.now(),
          });
        }
      }
    }
  }

  // If we don't have enough pairs from different books, try theme-based contrasts
  if (pairs.length < maxPairs && initialResults.length > 0) {
    const primaryTheme = initialResults[0].theme;

    // Try complementary theme
    if (includeComplementary && pairs.length < maxPairs) {
      const complementaryTheme = findRelatedTheme(primaryTheme, 'complementary');
      if (complementaryTheme) {
        const complementaryResults = await searchByTheme(complementaryTheme, { limit: 3 });
        if (complementaryResults.length > 0) {
          // Find a passage from a different book if possible
          const differentBookPassage = complementaryResults.find(
            p => p.book !== initialResults[0].book
          ) || complementaryResults[0];

          pairs.push({
            id: generateId('contrast_pair'),
            theme: primaryTheme,
            passages: [initialResults[0], differentBookPassage],
            contrastType: 'complementary',
            createdAt: Date.now(),
          });
        }
      }
    }

    // Try contrasting theme
    if (includeContrasting && pairs.length < maxPairs) {
      const contrastingTheme = findRelatedTheme(primaryTheme, 'contrasting');
      if (contrastingTheme) {
        const contrastingResults = await searchByTheme(contrastingTheme, { limit: 3 });
        if (contrastingResults.length > 0) {
          // Find a passage from a different book if possible
          const differentBookPassage = contrastingResults.find(
            p => p.book !== initialResults[0].book
          ) || contrastingResults[0];

          pairs.push({
            id: generateId('contrast_pair'),
            theme: primaryTheme,
            passages: [initialResults[0], differentBookPassage],
            contrastType: 'contrasting',
            createdAt: Date.now(),
          });
        }
      }
    }
  }

  return {
    id: generateId('contrast_set'),
    query,
    pairs,
    createdAt: Date.now(),
  };
}

/**
 * Find passages with contrasting tones on the same theme
 *
 * @param theme - The theme to search for
 * @param tones - Two contrasting tones to compare
 * @returns ContrastPair or null if not found
 */
export async function findToneContrasts(
  theme: ThemeTag,
  tones: [ToneTag, ToneTag] = ['poetic', 'direct']
): Promise<ContrastPair | null> {
  const [tone1Results, tone2Results] = await Promise.all([
    searchByTheme(theme, { tones: [tones[0]], limit: 3 }),
    searchByTheme(theme, { tones: [tones[1]], limit: 3 }),
  ]);

  if (tone1Results.length === 0 || tone2Results.length === 0) {
    return null;
  }

  // Try to get passages from different books
  const passage1 = tone1Results[0];
  const passage2 = tone2Results.find(p => p.book !== passage1.book) || tone2Results[0];

  return {
    id: generateId('contrast_pair'),
    theme,
    passages: [passage1, passage2],
    contrastType: 'complementary', // Tone contrasts are complementary by nature
    createdAt: Date.now(),
  };
}

/**
 * Get pre-defined contrast pairs for a "daily contrasts" feature
 */
export async function getDailyContrasts(): Promise<ContrastPair[]> {
  const pairs: ContrastPair[] = [];

  // Pick a random pair of contrasting themes
  const randomIndex = Math.floor(Math.random() * CONTRASTING_THEMES.length);
  const [theme1, theme2] = CONTRASTING_THEMES[randomIndex];

  const [results1, results2] = await Promise.all([
    searchByTheme(theme1, { limit: 3 }),
    searchByTheme(theme2, { limit: 3 }),
  ]);

  if (results1.length > 0 && results2.length > 0) {
    // Try to pick from different books
    const passage1 = results1[Math.floor(Math.random() * results1.length)];
    const passage2 = results2.find(p => p.book !== passage1.book)
      || results2[Math.floor(Math.random() * results2.length)];

    pairs.push({
      id: generateId('contrast_pair'),
      theme: theme1,
      passages: [passage1, passage2],
      contrastType: 'contrasting',
      createdAt: Date.now(),
    });
  }

  return pairs;
}

/**
 * Suggested topics for exploring contrasts
 */
export const SUGGESTED_CONTRAST_TOPICS = [
  'How should I approach difficult decisions?',
  'What is the path to inner peace?',
  'How do I find my purpose?',
  'How should I deal with suffering?',
  'What is the nature of the self?',
  'How do I balance action and stillness?',
  'What role does discipline play in growth?',
  'How do I let go of attachment?',
];
