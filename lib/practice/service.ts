import type { PracticeDuration, PracticeOption, PracticeTemplate, PracticeVariant } from './types';
import { PRACTICE_TEMPLATES, getPracticeTemplateById, getPracticeTemplatesByTheme } from './templates';
import { detectIntentThemes, type ThemeTag } from '../retrieval/search';
import type { TonePreference } from '../storage/store';

/**
 * Generate practice options based on conversation context
 * Returns 3 options: one for each duration (short, medium, long)
 */
export function generatePracticeOptions(
  conversationContext: string,
  userTone: TonePreference
): PracticeOption[] {
  // Detect themes from the conversation context
  const themes = detectIntentThemes(conversationContext);

  // Find templates that match the detected themes
  let matchingTemplates = findMatchingTemplates(themes);

  // If no theme matches, use a fallback selection based on common needs
  if (matchingTemplates.length === 0) {
    matchingTemplates = getFallbackTemplates();
  }

  // Select the best template based on themes and variety
  const selectedTemplate = selectBestTemplate(matchingTemplates, themes);

  // Generate contextual notes based on conversation
  const contextNotes = generateContextualNotes(conversationContext, selectedTemplate, userTone);

  // Create the three practice options
  const options: PracticeOption[] = [
    createPracticeOption(selectedTemplate, 'short', contextNotes.short),
    createPracticeOption(selectedTemplate, 'medium', contextNotes.medium),
    createPracticeOption(selectedTemplate, 'long', contextNotes.long),
  ];

  return options;
}

/**
 * Generate a single practice option for a specific duration
 */
export function generateSinglePracticeOption(
  templateId: string,
  duration: PracticeDuration,
  conversationContext?: string
): PracticeOption | null {
  const template = getPracticeTemplateById(templateId);
  if (!template) return null;

  const contextNote = conversationContext
    ? generateSingleContextNote(conversationContext, template, duration)
    : undefined;

  return createPracticeOption(template, duration, contextNote);
}

/**
 * Get recommended practices based on themes
 */
export function getRecommendedPractices(
  themes: ThemeTag[],
  duration?: PracticeDuration
): PracticeOption[] {
  const templates = findMatchingTemplates(themes);

  if (templates.length === 0) {
    return [];
  }

  if (duration) {
    // Return one option per matching template for the specified duration
    return templates.slice(0, 3).map(t => createPracticeOption(t, duration));
  }

  // Return short options for variety
  return templates.slice(0, 3).map(t => createPracticeOption(t, 'short'));
}

/**
 * Get practice variant details for display
 */
export function getPracticeVariantDetails(
  templateId: string,
  duration: PracticeDuration
): PracticeVariant | null {
  const template = getPracticeTemplateById(templateId);
  if (!template) return null;

  return template.variants[duration];
}

/**
 * Get all available practice durations with descriptions
 */
export function getPracticeDurations(): Array<{
  duration: PracticeDuration;
  label: string;
  description: string;
  estimatedMinutes: string;
}> {
  return [
    {
      duration: 'short',
      label: 'Quick Reset',
      description: 'A micro-moment of presence',
      estimatedMinutes: '1 min',
    },
    {
      duration: 'medium',
      label: 'Guided Practice',
      description: 'A deeper dive into stillness',
      estimatedMinutes: '5 min',
    },
    {
      duration: 'long',
      label: 'Daily Ritual',
      description: 'A sustained practice for integration',
      estimatedMinutes: '10-20 min',
    },
  ];
}

// --- Helper Functions ---

function findMatchingTemplates(themes: ThemeTag[]): PracticeTemplate[] {
  if (themes.length === 0) {
    return [];
  }

  // Score templates by how many matching themes they have
  const scored = PRACTICE_TEMPLATES.map(template => {
    const matchCount = template.themes.filter(t => themes.includes(t)).length;
    return { template, score: matchCount };
  });

  // Filter to only those with at least one match and sort by score
  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(s => s.template);
}

function getFallbackTemplates(): PracticeTemplate[] {
  // Return universally applicable practices
  return PRACTICE_TEMPLATES.filter(t =>
    t.category === 'breath' || t.category === 'stillness'
  );
}

function selectBestTemplate(
  templates: PracticeTemplate[],
  themes: ThemeTag[]
): PracticeTemplate {
  // If we have templates, return the highest-scoring one
  if (templates.length > 0) {
    return templates[0];
  }

  // Ultimate fallback: grounding breath
  return PRACTICE_TEMPLATES.find(t => t.id === 'grounding_breath') || PRACTICE_TEMPLATES[0];
}

function createPracticeOption(
  template: PracticeTemplate,
  duration: PracticeDuration,
  contextualNote?: string
): PracticeOption {
  const variant = template.variants[duration];

  return {
    templateId: template.id,
    duration,
    title: variant.title,
    description: variant.description,
    estimatedMinutes: variant.estimatedMinutes,
    icon: template.icon,
    category: template.category,
    contextualNote,
  };
}

function generateContextualNotes(
  context: string,
  template: PracticeTemplate,
  tone: TonePreference
): { short: string; medium: string; long: string } {
  const contextLower = context.toLowerCase();

  // Detect common emotional states and situations
  const isAnxious = /anxious|worried|stress|overwhelm|panic|nervous/i.test(contextLower);
  const isSad = /sad|grief|loss|lonely|depressed|empty/i.test(contextLower);
  const isAngry = /angry|frustrated|annoyed|rage|irritat/i.test(contextLower);
  const isStuck = /stuck|confused|lost|uncertain|unsure|don't know/i.test(contextLower);
  const isSeekingClarity = /clarity|decision|choice|direction|purpose/i.test(contextLower);

  // Generate notes based on detected state and template category
  let shortNote = '';
  let mediumNote = '';
  let longNote = '';

  if (template.category === 'breath') {
    if (isAnxious) {
      shortNote = 'A moment to calm the nervous system';
      mediumNote = 'Creating space between you and the worry';
      longNote = 'Building a daily anchor for peace';
    } else if (isSad) {
      shortNote = 'Gentle presence with what is';
      mediumNote = 'Making room for grief';
      longNote = 'Learning to hold sadness with care';
    } else {
      shortNote = 'Returning to the present moment';
      mediumNote = 'Deepening your connection to now';
      longNote = 'Establishing a foundation of presence';
    }
  } else if (template.category === 'inquiry') {
    if (isStuck) {
      shortNote = 'A question to cut through confusion';
      mediumNote = 'Meeting yourself with fresh eyes';
      longNote = 'A daily practice of honest looking';
    } else if (isSeekingClarity) {
      shortNote = 'One honest question';
      mediumNote = 'Discovering what you already know';
      longNote = 'Cultivating clarity through inquiry';
    } else {
      shortNote = 'A moment of self-meeting';
      mediumNote = 'Deepening self-understanding';
      longNote = 'A daily practice of self-knowledge';
    }
  } else if (template.category === 'compassion') {
    if (isSad || isAnxious) {
      shortNote = 'A gentle touch of kindness';
      mediumNote = 'Offering yourself what you need';
      longNote = 'Building a reservoir of self-compassion';
    } else {
      shortNote = 'A moment of self-kindness';
      mediumNote = 'Expanding your circle of care';
      longNote = 'Cultivating unconditional compassion';
    }
  } else if (template.category === 'movement') {
    shortNote = 'Reconnecting with your body';
    mediumNote = 'Releasing what you are holding';
    longNote = 'A daily practice of embodiment';
  } else if (template.category === 'stillness') {
    shortNote = 'A pause in the flow';
    mediumNote = 'Resting in pure being';
    longNote = 'Deepening into stillness';
  } else if (template.category === 'gratitude') {
    shortNote = 'Noticing what is already good';
    mediumNote = 'Expanding your sense of abundance';
    longNote = 'Training the heart to see blessings';
  } else if (template.category === 'writing') {
    if (isStuck) {
      shortNote = 'Getting it out of your head';
      mediumNote = 'Letting words reveal what you know';
      longNote = 'A daily practice of clearing';
    } else {
      shortNote = 'Naming your experience';
      mediumNote = 'Writing without censor';
      longNote = 'Daily pages for clarity';
    }
  }

  // Adjust tone if needed
  if (tone === 'minimal') {
    // Shorten notes for minimal tone
    shortNote = shortNote.split(' ').slice(0, 3).join(' ');
    mediumNote = mediumNote.split(' ').slice(0, 4).join(' ');
    longNote = longNote.split(' ').slice(0, 4).join(' ');
  }

  return { short: shortNote, medium: mediumNote, long: longNote };
}

function generateSingleContextNote(
  context: string,
  template: PracticeTemplate,
  duration: PracticeDuration
): string {
  const notes = generateContextualNotes(context, template, 'practical');
  return notes[duration];
}
