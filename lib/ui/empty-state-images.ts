/**
 * Empty State Images
 *
 * Maps empty state image identifiers to their image sources.
 * React Native requires static imports for images, so we maintain
 * this mapping for use in components.
 *
 * Available empty states:
 * - noInsights: Sage leaf in circle with glow (for insights screen)
 * - journalEmpty: Open book illustration (for journal screen)
 * - connectionError: Broken chain/link icon (for connection errors)
 * - offlineMode: Cloud with slash icon (for offline state)
 */
import { ImageSourcePropType } from 'react-native';

// Static imports for empty state images (SVG)
// Note: For React Native, you may need to convert these to PNG
// or use react-native-svg for SVG support
const noInsightsImage = require('../../assets/images/empty-states/no-insights.svg');
const journalEmptyImage = require('../../assets/images/empty-states/journal-empty.svg');
const connectionErrorImage = require('../../assets/images/empty-states/connection-error.svg');
const offlineModeImage = require('../../assets/images/empty-states/offline-mode.svg');

/**
 * Empty state image identifiers
 */
export type EmptyStateImageId =
  | 'noInsights'
  | 'journalEmpty'
  | 'connectionError'
  | 'offlineMode';

/**
 * Map of empty state image identifiers to their image sources
 */
export const EMPTY_STATE_IMAGES: Record<EmptyStateImageId, ImageSourcePropType> = {
  noInsights: noInsightsImage,
  journalEmpty: journalEmptyImage,
  connectionError: connectionErrorImage,
  offlineMode: offlineModeImage,
};

/**
 * Get the image source for an empty state
 * @param imageId - The empty state image identifier
 * @returns The image source for use in React Native Image component
 */
export function getEmptyStateImage(imageId: EmptyStateImageId): ImageSourcePropType | null {
  return EMPTY_STATE_IMAGES[imageId] ?? null;
}

/**
 * Empty state metadata for display purposes
 */
export interface EmptyStateConfig {
  id: EmptyStateImageId;
  title: string;
  description: string;
  image: ImageSourcePropType;
}

/**
 * Predefined empty state configurations
 */
export const EMPTY_STATE_CONFIGS: Record<EmptyStateImageId, Omit<EmptyStateConfig, 'image'>> = {
  noInsights: {
    id: 'noInsights',
    title: 'No insights yet',
    description: 'Start journaling to discover patterns in your mindfulness journey',
  },
  journalEmpty: {
    id: 'journalEmpty',
    title: 'Your journal is empty',
    description: 'Begin your first entry and start your path to self-discovery',
  },
  connectionError: {
    id: 'connectionError',
    title: 'Connection error',
    description: 'Unable to connect. Please check your internet connection and try again',
  },
  offlineMode: {
    id: 'offlineMode',
    title: 'You\'re offline',
    description: 'Some features require an internet connection. Your data will sync when you\'re back online',
  },
};

/**
 * Get full empty state configuration including image
 * @param imageId - The empty state image identifier
 * @returns Full configuration with image, title, and description
 */
export function getEmptyStateConfig(imageId: EmptyStateImageId): EmptyStateConfig {
  return {
    ...EMPTY_STATE_CONFIGS[imageId],
    image: EMPTY_STATE_IMAGES[imageId],
  };
}
