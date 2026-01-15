/**
 * Theme Pack Images
 *
 * Maps theme pack image identifiers to their image sources.
 * React Native requires static imports for images, so we maintain
 * this mapping for use in components.
 */
import { ImageSourcePropType } from 'react-native';

// Static imports for theme images
const acceptanceImage = require('../../assets/images/themes/acceptance.png');
const purposeImage = require('../../assets/images/themes/purpose.png');
const stillnessImage = require('../../assets/images/themes/stillness.png');

// Static imports for journey images
const calmImage = require('../../assets/images/journeys/calm.png');
const clarityImage = require('../../assets/images/journeys/clarity.png');
const courageImage = require('../../assets/images/journeys/courage.png');

/**
 * Map of theme image identifiers to their image sources
 */
export const THEME_IMAGES: Record<string, ImageSourcePropType> = {
  acceptance: acceptanceImage,
  purpose: purposeImage,
  stillness: stillnessImage,
  // Journey images
  calm: calmImage,
  clarity: clarityImage,
  courage: courageImage,
};

/**
 * Get the image source for a theme pack
 * @param imageId - The image identifier from the theme pack
 * @returns The image source for use in React Native Image component
 */
export function getThemeImage(imageId: string): ImageSourcePropType | null {
  return THEME_IMAGES[imageId] ?? null;
}
