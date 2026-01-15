/**
 * Explore Theme Types
 *
 * Defines the data structure for theme cards displayed in the
 * 2x3 grid on the Explore screen.
 */

import type { ImageSourcePropType } from 'react-native';

/**
 * An explore theme for the grid display
 */
export interface ExploreTheme {
  /** Unique identifier */
  id: string;
  /** Display title */
  title: string;
  /** Short description */
  description: string;
  /** Emoji icon displayed on the card */
  icon: string;
  /** Image identifier for background */
  image: string;
  /** Accent color for the theme */
  color: string;
  /** Navigation route when tapped */
  route: string;
}
