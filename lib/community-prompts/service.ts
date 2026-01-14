import type {
  CommunityPrompt,
  CommunityPromptSubmission,
  CommunityPromptCategory,
} from './types';
import { CURATED_PROMPTS } from './templates';

/**
 * Validates that a prompt text meets the requirements
 */
export function validatePromptText(text: string): { valid: boolean; error?: string } {
  const trimmed = text.trim();

  if (trimmed.length < 10) {
    return { valid: false, error: 'Prompt must be at least 10 characters' };
  }

  if (trimmed.length > 500) {
    return { valid: false, error: 'Prompt must be less than 500 characters' };
  }

  if (!trimmed.includes('?')) {
    return { valid: false, error: 'Prompt should be a question (include a ?)' };
  }

  // Check for potentially sensitive content patterns
  const sensitivePatterns = [
    /\b(email|phone|address|password|ssn|social\s*security)\b/i,
    /\b(suicide|self[- ]?harm|kill\s*(myself|yourself))\b/i,
  ];

  for (const pattern of sensitivePatterns) {
    if (pattern.test(trimmed)) {
      return { valid: false, error: 'Prompt contains content that cannot be shared' };
    }
  }

  return { valid: true };
}

/**
 * Anonymizes prompt text by removing potentially identifying information
 * This ensures privacy when submitting to the community
 */
export function anonymizePromptText(text: string): string {
  let anonymized = text.trim();

  // Remove email addresses
  anonymized = anonymized.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[email]');

  // Remove phone numbers (various formats)
  anonymized = anonymized.replace(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g, '[phone]');

  // Remove URLs
  anonymized = anonymized.replace(/https?:\/\/[^\s]+/g, '[link]');

  // Remove @mentions
  anonymized = anonymized.replace(/@[\w]+/g, '[mention]');

  // Remove dates that might be specific (e.g., "January 5, 2024")
  anonymized = anonymized.replace(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}\b/gi, '[date]');

  // Remove specific years that might be identifying
  anonymized = anonymized.replace(/\b(19|20)\d{2}\b/g, '[year]');

  // Normalize whitespace
  anonymized = anonymized.replace(/\s+/g, ' ').trim();

  return anonymized;
}

/**
 * Creates a submission object from user input
 */
export function createSubmission(
  promptText: string,
  category: CommunityPromptCategory
): CommunityPromptSubmission | null {
  const validation = validatePromptText(promptText);
  if (!validation.valid) {
    return null;
  }

  const anonymized = anonymizePromptText(promptText);

  return {
    id: `sub_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    promptText: anonymized,
    category,
    submittedAt: Date.now(),
    status: 'pending',
  };
}

/**
 * Converts an approved submission to a community prompt
 */
export function submissionToPrompt(submission: CommunityPromptSubmission): CommunityPrompt {
  return {
    id: `prompt_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    promptText: submission.promptText,
    category: submission.category,
    upvotes: 0,
    submittedAt: submission.submittedAt,
    isCurated: false,
    isApproved: true,
  };
}

/**
 * Gets all available community prompts (curated + approved user submissions)
 */
export function getAllCommunityPrompts(
  userSubmissions: CommunityPrompt[] = []
): CommunityPrompt[] {
  const approvedUserPrompts = userSubmissions.filter(p => p.isApproved);
  return [...CURATED_PROMPTS, ...approvedUserPrompts];
}

/**
 * Gets community prompts filtered by category
 */
export function getPromptsByCategory(
  category: CommunityPromptCategory,
  userSubmissions: CommunityPrompt[] = []
): CommunityPrompt[] {
  return getAllCommunityPrompts(userSubmissions).filter(p => p.category === category);
}

/**
 * Gets featured/popular prompts (curated or high upvotes)
 */
export function getFeaturedPrompts(
  userSubmissions: CommunityPrompt[] = [],
  limit = 5
): CommunityPrompt[] {
  const all = getAllCommunityPrompts(userSubmissions);

  // Sort by: curated first, then by upvotes
  return all
    .sort((a, b) => {
      if (a.isCurated && !b.isCurated) return -1;
      if (!a.isCurated && b.isCurated) return 1;
      return b.upvotes - a.upvotes;
    })
    .slice(0, limit);
}

/**
 * Gets a random prompt for daily inspiration
 */
export function getRandomPrompt(
  userSubmissions: CommunityPrompt[] = [],
  excludeIds: string[] = []
): CommunityPrompt | null {
  const available = getAllCommunityPrompts(userSubmissions).filter(
    p => !excludeIds.includes(p.id)
  );

  if (available.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * available.length);
  return available[randomIndex];
}

/**
 * Gets prompts suitable for a given time of day
 */
export function getPromptsForTimeOfDay(
  userSubmissions: CommunityPrompt[] = []
): CommunityPrompt[] {
  const hour = new Date().getHours();

  let preferredCategories: CommunityPromptCategory[];

  if (hour >= 5 && hour < 12) {
    // Morning
    preferredCategories = ['morning', 'gratitude', 'mindfulness'];
  } else if (hour >= 12 && hour < 17) {
    // Afternoon
    preferredCategories = ['growth', 'creativity', 'general'];
  } else if (hour >= 17 && hour < 21) {
    // Evening
    preferredCategories = ['evening', 'gratitude', 'relationship'];
  } else {
    // Night
    preferredCategories = ['evening', 'mindfulness', 'general'];
  }

  const all = getAllCommunityPrompts(userSubmissions);

  return all.filter(p => preferredCategories.includes(p.category));
}

/**
 * Searches prompts by text query
 */
export function searchPrompts(
  query: string,
  userSubmissions: CommunityPrompt[] = []
): CommunityPrompt[] {
  const lowerQuery = query.toLowerCase().trim();

  if (lowerQuery.length < 2) {
    return [];
  }

  const all = getAllCommunityPrompts(userSubmissions);

  return all.filter(p =>
    p.promptText.toLowerCase().includes(lowerQuery)
  );
}
