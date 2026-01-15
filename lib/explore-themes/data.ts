/**
 * Explore Themes Data
 *
 * The 6 core themes displayed in a 2x3 grid on the Explore screen.
 * Each theme provides a focused entry point for reflection and discovery.
 */

import type { ExploreTheme } from './types';

/**
 * The 6 core explore themes
 */
export const EXPLORE_THEMES: ExploreTheme[] = [
  {
    id: 'calm',
    title: 'Calm',
    description: 'Find peace and tranquility',
    icon: '🧘',
    image: 'calm',
    color: '#5F9EA0', // Teal - calming
    route: '/ask?theme=calm',
  },
  {
    id: 'action',
    title: 'Action',
    description: 'Move forward with purpose',
    icon: '⚡',
    image: 'courage',
    color: '#F97316', // Orange - energetic
    route: '/ask?theme=action',
  },
  {
    id: 'self',
    title: 'Self',
    description: 'Discover your true nature',
    icon: '🪞',
    image: 'clarity',
    color: '#A855F7', // Purple - introspective
    route: '/ask?theme=self',
  },
  {
    id: 'relationships',
    title: 'Relationships',
    description: 'Connect with others deeply',
    icon: '💞',
    image: 'acceptance',
    color: '#EC4899', // Pink - connection
    route: '/ask?theme=relationships',
  },
  {
    id: 'change',
    title: 'Change',
    description: 'Embrace transformation',
    icon: '🦋',
    image: 'purpose',
    color: '#3B82F6', // Blue - flow
    route: '/ask?theme=change',
  },
  {
    id: 'meaning',
    title: 'Meaning',
    description: 'Find your deeper purpose',
    icon: '✨',
    image: 'stillness',
    color: '#EAB308', // Gold - wisdom
    route: '/ask?theme=meaning',
  },
];

/**
 * Get an explore theme by ID
 */
export function getExploreThemeById(id: string): ExploreTheme | undefined {
  return EXPLORE_THEMES.find((theme) => theme.id === id);
}

/**
 * Get all explore themes
 */
export function getAllExploreThemes(): ExploreTheme[] {
  return EXPLORE_THEMES;
}
