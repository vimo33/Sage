import type { ThemeTag } from '../retrieval/search';

/**
 * Categories for community prompts
 */
export type CommunityPromptCategory =
  | 'morning'
  | 'evening'
  | 'gratitude'
  | 'challenge'
  | 'growth'
  | 'relationship'
  | 'creativity'
  | 'mindfulness'
  | 'general';

/**
 * A community-contributed reflection question
 */
export interface CommunityPrompt {
  id: string;
  promptText: string;
  category: CommunityPromptCategory;
  theme?: ThemeTag;
  upvotes: number;
  submittedAt: number;
  isCurated: boolean; // True if from curated collection, false if user-submitted
  isApproved: boolean; // True if approved for display
}

/**
 * User's submission of a community prompt (before approval)
 */
export interface CommunityPromptSubmission {
  id: string;
  promptText: string;
  category: CommunityPromptCategory;
  submittedAt: number;
  status: 'pending' | 'approved' | 'rejected';
}

/**
 * User preferences for community features
 */
export interface CommunityPreferences {
  allowPromptSubmission: boolean;
  showCommunityPrompts: boolean;
  hasAcceptedPrivacyPolicy: boolean;
}

/**
 * Category display information
 */
export const CATEGORY_INFO: Record<CommunityPromptCategory, { label: string; icon: string; description: string }> = {
  morning: {
    label: 'Morning',
    icon: '☀️',
    description: 'Start your day with intention',
  },
  evening: {
    label: 'Evening',
    icon: '🌙',
    description: 'Reflect on your day',
  },
  gratitude: {
    label: 'Gratitude',
    icon: '🙏',
    description: 'Cultivate thankfulness',
  },
  challenge: {
    label: 'Challenge',
    icon: '🌊',
    description: 'Navigate difficulties',
  },
  growth: {
    label: 'Growth',
    icon: '🌱',
    description: 'Personal development',
  },
  relationship: {
    label: 'Relationship',
    icon: '💝',
    description: 'Connect with others',
  },
  creativity: {
    label: 'Creativity',
    icon: '🎨',
    description: 'Spark imagination',
  },
  mindfulness: {
    label: 'Mindfulness',
    icon: '🧘',
    description: 'Present moment awareness',
  },
  general: {
    label: 'General',
    icon: '💭',
    description: 'Open reflection',
  },
};

/**
 * Default community preferences
 */
export const DEFAULT_COMMUNITY_PREFERENCES: CommunityPreferences = {
  allowPromptSubmission: false,
  showCommunityPrompts: true,
  hasAcceptedPrivacyPolicy: false,
};
