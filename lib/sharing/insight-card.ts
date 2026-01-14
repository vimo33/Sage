/**
 * Insight Card Sharing Utilities
 *
 * Provides functionality to capture insight cards as images and share them
 * to social media or save to camera roll.
 */

import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { Share, Platform } from 'react-native';
import type { SavedInsight } from '../storage/store';

export interface ShareResult {
  success: boolean;
  action?: 'shared' | 'saved' | 'dismissed';
  error?: string;
}

/**
 * Generate a unique filename for the insight card image
 */
export function generateImageFilename(insightId: string): string {
  const timestamp = Date.now();
  return `wisdom-${insightId.slice(0, 8)}-${timestamp}.png`;
}

/**
 * Get the cache path for saving temporary images
 */
export function getImageCachePath(filename: string): string {
  return `${FileSystem.cacheDirectory}${filename}`;
}

/**
 * Save an image to the camera roll
 */
export async function saveToMediaLibrary(imageUri: string): Promise<ShareResult> {
  try {
    // Request permissions
    const { status } = await MediaLibrary.requestPermissionsAsync();

    if (status !== 'granted') {
      return {
        success: false,
        error: 'Permission to access media library was denied',
      };
    }

    // Save to camera roll
    const asset = await MediaLibrary.createAssetAsync(imageUri);

    if (asset) {
      return {
        success: true,
        action: 'saved',
      };
    }

    return {
      success: false,
      error: 'Failed to save image to camera roll',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to save to camera roll',
    };
  }
}

/**
 * Share an image via the system share sheet
 */
export async function shareImage(imageUri: string): Promise<ShareResult> {
  try {
    const shareOptions = Platform.OS === 'ios'
      ? { url: imageUri }
      : { url: `file://${imageUri}` };

    const result = await Share.share(shareOptions);

    if (result.action === Share.sharedAction) {
      return {
        success: true,
        action: 'shared',
      };
    } else if (result.action === Share.dismissedAction) {
      return {
        success: true,
        action: 'dismissed',
      };
    }

    return {
      success: true,
      action: 'dismissed',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to share image',
    };
  }
}

/**
 * Clean up temporary image files
 */
export async function cleanupTempImage(imageUri: string): Promise<void> {
  try {
    const fileInfo = await FileSystem.getInfoAsync(imageUri);
    if (fileInfo.exists) {
      await FileSystem.deleteAsync(imageUri, { idempotent: true });
    }
  } catch {
    // Silently ignore cleanup errors
  }
}

/**
 * Share insight as text (fallback when image sharing is not available)
 */
export async function shareInsightAsText(insight: SavedInsight): Promise<ShareResult> {
  try {
    const message = `"${insight.verseContent}"\n\n— ${insight.sourceRef}`;

    const result = await Share.share({
      message,
    });

    if (result.action === Share.sharedAction) {
      return {
        success: true,
        action: 'shared',
      };
    }

    return {
      success: true,
      action: 'dismissed',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to share insight',
    };
  }
}
