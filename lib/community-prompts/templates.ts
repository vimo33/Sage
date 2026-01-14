import type { CommunityPrompt, CommunityPromptCategory } from './types';

/**
 * Helper to create curated prompts with consistent IDs
 */
function createCuratedPrompt(
  id: string,
  promptText: string,
  category: CommunityPromptCategory,
  upvotes = 0
): CommunityPrompt {
  return {
    id: `curated_${id}`,
    promptText,
    category,
    upvotes,
    submittedAt: 0, // Curated prompts have no submission date
    isCurated: true,
    isApproved: true,
  };
}

/**
 * Curated collection of high-quality reflection questions
 */
export const CURATED_PROMPTS: CommunityPrompt[] = [
  // Morning prompts
  createCuratedPrompt(
    'morning_1',
    'What is one thing I can do today to honor my true self?',
    'morning',
    42
  ),
  createCuratedPrompt(
    'morning_2',
    'If I could wake up without any fear today, what would I do differently?',
    'morning',
    38
  ),
  createCuratedPrompt(
    'morning_3',
    'What quality of being do I want to bring into this day?',
    'morning',
    35
  ),
  createCuratedPrompt(
    'morning_4',
    'What is calling for my attention that I have been ignoring?',
    'morning',
    28
  ),
  createCuratedPrompt(
    'morning_5',
    'How can I be of service to someone today?',
    'morning',
    25
  ),

  // Evening prompts
  createCuratedPrompt(
    'evening_1',
    'What moment today made me feel most alive?',
    'evening',
    45
  ),
  createCuratedPrompt(
    'evening_2',
    'What did I learn about myself through today\'s challenges?',
    'evening',
    40
  ),
  createCuratedPrompt(
    'evening_3',
    'What would I tell my morning self about how this day unfolded?',
    'evening',
    36
  ),
  createCuratedPrompt(
    'evening_4',
    'What can I release from today before sleep?',
    'evening',
    32
  ),
  createCuratedPrompt(
    'evening_5',
    'Where did I find unexpected peace or joy today?',
    'evening',
    29
  ),

  // Gratitude prompts
  createCuratedPrompt(
    'gratitude_1',
    'What small blessing did I almost overlook today?',
    'gratitude',
    48
  ),
  createCuratedPrompt(
    'gratitude_2',
    'Who has silently supported me that I have not thanked?',
    'gratitude',
    44
  ),
  createCuratedPrompt(
    'gratitude_3',
    'What challenge in my past am I now grateful for?',
    'gratitude',
    39
  ),
  createCuratedPrompt(
    'gratitude_4',
    'What part of my body am I grateful for that I often forget?',
    'gratitude',
    33
  ),
  createCuratedPrompt(
    'gratitude_5',
    'What simple pleasure brought me comfort recently?',
    'gratitude',
    30
  ),

  // Challenge prompts
  createCuratedPrompt(
    'challenge_1',
    'What fear have I been avoiding that might hold wisdom for me?',
    'challenge',
    41
  ),
  createCuratedPrompt(
    'challenge_2',
    'Where am I playing small when life is asking me to expand?',
    'challenge',
    37
  ),
  createCuratedPrompt(
    'challenge_3',
    'What would happen if I stopped fighting this situation and accepted it?',
    'challenge',
    34
  ),
  createCuratedPrompt(
    'challenge_4',
    'What is my current struggle trying to teach me about love?',
    'challenge',
    31
  ),
  createCuratedPrompt(
    'challenge_5',
    'How might this difficulty be shaping me into who I need to become?',
    'challenge',
    27
  ),

  // Growth prompts
  createCuratedPrompt(
    'growth_1',
    'What belief about myself is it time to outgrow?',
    'growth',
    43
  ),
  createCuratedPrompt(
    'growth_2',
    'What version of myself am I being called to become?',
    'growth',
    38
  ),
  createCuratedPrompt(
    'growth_3',
    'What would I attempt if I knew I could not fail?',
    'growth',
    35
  ),
  createCuratedPrompt(
    'growth_4',
    'What habit is no longer serving my highest self?',
    'growth',
    32
  ),
  createCuratedPrompt(
    'growth_5',
    'Where am I seeking external validation when I could trust my own knowing?',
    'growth',
    28
  ),

  // Relationship prompts
  createCuratedPrompt(
    'relationship_1',
    'What conversation have I been avoiding that my heart knows I need to have?',
    'relationship',
    40
  ),
  createCuratedPrompt(
    'relationship_2',
    'How can I love someone in my life more fully today?',
    'relationship',
    36
  ),
  createCuratedPrompt(
    'relationship_3',
    'What boundary do I need to set to protect my peace?',
    'relationship',
    33
  ),
  createCuratedPrompt(
    'relationship_4',
    'Who in my life mirrors something I need to heal in myself?',
    'relationship',
    29
  ),
  createCuratedPrompt(
    'relationship_5',
    'How can I be a better listener to those I love?',
    'relationship',
    26
  ),

  // Creativity prompts
  createCuratedPrompt(
    'creativity_1',
    'What creative impulse have I been suppressing?',
    'creativity',
    37
  ),
  createCuratedPrompt(
    'creativity_2',
    'If my life were a story, what chapter am I writing now?',
    'creativity',
    34
  ),
  createCuratedPrompt(
    'creativity_3',
    'What would I create if no one would ever see it?',
    'creativity',
    31
  ),
  createCuratedPrompt(
    'creativity_4',
    'How can I bring more play into my daily life?',
    'creativity',
    28
  ),
  createCuratedPrompt(
    'creativity_5',
    'What childhood dream still whispers to me?',
    'creativity',
    25
  ),

  // Mindfulness prompts
  createCuratedPrompt(
    'mindfulness_1',
    'What is present in this moment that I usually rush past?',
    'mindfulness',
    46
  ),
  createCuratedPrompt(
    'mindfulness_2',
    'Where in my body am I holding tension right now?',
    'mindfulness',
    42
  ),
  createCuratedPrompt(
    'mindfulness_3',
    'What sound am I hearing that I was not aware of before?',
    'mindfulness',
    38
  ),
  createCuratedPrompt(
    'mindfulness_4',
    'What emotion is sitting beneath my busyness today?',
    'mindfulness',
    35
  ),
  createCuratedPrompt(
    'mindfulness_5',
    'How would I describe this exact moment to someone who cannot be here?',
    'mindfulness',
    31
  ),

  // General prompts
  createCuratedPrompt(
    'general_1',
    'What truth am I avoiding that would set me free?',
    'general',
    44
  ),
  createCuratedPrompt(
    'general_2',
    'If I had no obligations today, what would my soul choose to do?',
    'general',
    39
  ),
  createCuratedPrompt(
    'general_3',
    'What is the kindest thing I could do for myself right now?',
    'general',
    36
  ),
  createCuratedPrompt(
    'general_4',
    'What story do I keep telling about myself that may not be true?',
    'general',
    33
  ),
  createCuratedPrompt(
    'general_5',
    'What would my wisest self say to my worried self right now?',
    'general',
    30
  ),
];

/**
 * Get curated prompts by category
 */
export function getCuratedByCategory(category: CommunityPromptCategory): CommunityPrompt[] {
  return CURATED_PROMPTS.filter(p => p.category === category);
}

/**
 * Get all curated prompts
 */
export function getAllCurated(): CommunityPrompt[] {
  return CURATED_PROMPTS;
}

/**
 * Get top curated prompts by upvotes
 */
export function getTopCurated(limit = 10): CommunityPrompt[] {
  return [...CURATED_PROMPTS]
    .sort((a, b) => b.upvotes - a.upvotes)
    .slice(0, limit);
}

/**
 * Get a curated prompt by ID
 */
export function getCuratedById(id: string): CommunityPrompt | undefined {
  return CURATED_PROMPTS.find(p => p.id === id);
}
