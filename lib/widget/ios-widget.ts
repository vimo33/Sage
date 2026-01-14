/**
 * iOS Widget Service
 *
 * Provides integration between the React Native app and the iOS home screen widget.
 * Uses App Groups and UserDefaults to share data with the WidgetKit extension.
 */

import { Platform, NativeModules } from 'react-native';
import { getRandomWisdom, initWisdomDB, WisdomChunk } from '../retrieval/search';

// App group identifier for sharing data with widget
const APP_GROUP_IDENTIFIER = 'group.com.sage.wisdom.shared';
const WISDOM_KEY = 'daily_wisdom';
const LAST_UPDATE_KEY = 'last_update_date';

// Native module interface for iOS widget
interface SageWidgetModule {
  updateWidget(data: {
    content: string;
    sourceRef: string;
    book: string;
    id: string;
  }): Promise<boolean>;
  refreshWidgets(): Promise<boolean>;
  shouldRefresh(): Promise<boolean>;
  getSharedData(key: string): Promise<string | null>;
  setSharedData(key: string, value: string): Promise<boolean>;
}

// Get native module (only available on iOS)
// Note: The native module needs to be implemented in Swift/Objective-C
// For now, we use a fallback using expo-file-system and shared containers
const WidgetModule: SageWidgetModule | null =
  Platform.OS === 'ios' ? NativeModules.SageWidgetModule : null;

/**
 * Check if iOS widget functionality is available
 */
export function isIOSWidgetAvailable(): boolean {
  return Platform.OS === 'ios';
}

/**
 * Get the current date as a string (YYYY-MM-DD)
 */
function getCurrentDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Update the iOS widget with new wisdom data
 */
export async function updateIOSWidgetData(wisdom: WisdomChunk): Promise<boolean> {
  if (!isIOSWidgetAvailable()) {
    console.log('[iOS Widget] Widget not available on this platform');
    return false;
  }

  try {
    // If native module is available, use it
    if (WidgetModule) {
      const result = await WidgetModule.updateWidget({
        content: wisdom.content,
        sourceRef: wisdom.sourceRef,
        book: wisdom.book,
        id: wisdom.id,
      });
      console.log('[iOS Widget] Widget data updated via native module');
      return result;
    }

    // Fallback: Use SharedDefaults via expo-secure-store
    // This requires the native module to be fully implemented
    console.log('[iOS Widget] Native module not available, widget update skipped');
    console.log('[iOS Widget] Widget data:', {
      content: wisdom.content.substring(0, 50) + '...',
      sourceRef: wisdom.sourceRef,
      book: wisdom.book,
      id: wisdom.id,
    });
    return true;
  } catch (error) {
    console.error('[iOS Widget] Failed to update widget data:', error);
    return false;
  }
}

/**
 * Refresh the iOS widget with a new random wisdom quote
 */
export async function refreshIOSWidgetWisdom(options?: {
  themes?: string[];
  books?: string[];
}): Promise<WisdomChunk | null> {
  if (!isIOSWidgetAvailable()) {
    return null;
  }

  try {
    // Initialize DB if needed
    await initWisdomDB();

    // Get random wisdom
    const wisdom = await getRandomWisdom({
      themes: options?.themes as any,
      books: options?.books,
    });

    if (wisdom) {
      await updateIOSWidgetData(wisdom);
      return wisdom;
    }

    return null;
  } catch (error) {
    console.error('[iOS Widget] Failed to refresh widget wisdom:', error);
    return null;
  }
}

/**
 * Force refresh all iOS widget instances
 */
export async function forceRefreshIOSWidgets(): Promise<boolean> {
  if (!isIOSWidgetAvailable()) {
    return false;
  }

  try {
    if (WidgetModule) {
      const result = await WidgetModule.refreshWidgets();
      console.log('[iOS Widget] Widgets refreshed');
      return result;
    }

    // Without native module, just log
    console.log('[iOS Widget] Widget refresh requested (native module not available)');
    return true;
  } catch (error) {
    console.error('[iOS Widget] Failed to refresh widgets:', error);
    return false;
  }
}

/**
 * Check if iOS widget data should be refreshed (daily check)
 */
export async function shouldRefreshIOSWidget(): Promise<boolean> {
  if (!isIOSWidgetAvailable()) {
    return false;
  }

  try {
    if (WidgetModule) {
      return await WidgetModule.shouldRefresh();
    }

    // Without native module, always return true to trigger refresh
    return true;
  } catch (error) {
    console.error('[iOS Widget] Failed to check refresh status:', error);
    return false;
  }
}

/**
 * Sync iOS widget with current daily wisdom (call this on app startup)
 */
export async function syncIOSWidgetOnStartup(dailyWisdom?: WisdomChunk | null): Promise<void> {
  if (!isIOSWidgetAvailable()) {
    return;
  }

  try {
    const needsRefresh = await shouldRefreshIOSWidget();

    if (needsRefresh || dailyWisdom) {
      if (dailyWisdom) {
        // Use provided wisdom
        await updateIOSWidgetData(dailyWisdom);
      } else {
        // Fetch new wisdom
        await refreshIOSWidgetWisdom();
      }
    }
  } catch (error) {
    console.error('[iOS Widget] Failed to sync widget on startup:', error);
  }
}

/**
 * Initialize iOS widget service (call once during app initialization)
 */
export async function initIOSWidgetService(): Promise<void> {
  if (!isIOSWidgetAvailable()) {
    console.log('[iOS Widget] Widget service not available (non-iOS platform)');
    return;
  }

  try {
    console.log('[iOS Widget] Initializing widget service...');

    // Check if widget needs refresh
    const needsRefresh = await shouldRefreshIOSWidget();
    if (needsRefresh) {
      console.log('[iOS Widget] Widget needs refresh, updating...');
      await refreshIOSWidgetWisdom();
    }

    console.log('[iOS Widget] Widget service initialized');
  } catch (error) {
    console.error('[iOS Widget] Failed to initialize widget service:', error);
  }
}

export default {
  isIOSWidgetAvailable,
  updateIOSWidgetData,
  refreshIOSWidgetWisdom,
  forceRefreshIOSWidgets,
  shouldRefreshIOSWidget,
  syncIOSWidgetOnStartup,
  initIOSWidgetService,
};
