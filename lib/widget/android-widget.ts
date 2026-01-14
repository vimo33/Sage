/**
 * Android Widget Service
 *
 * Provides integration between the React Native app and the Android home screen widget.
 * Handles syncing daily wisdom data to the widget and triggering updates.
 */

import { Platform, NativeModules } from 'react-native';
import { getRandomWisdom, initWisdomDB, WisdomChunk } from '../retrieval/search';

// Native module interface
interface SageWidgetModule {
  updateWidget(data: {
    content: string;
    sourceRef: string;
    book: string;
    id: string;
  }): Promise<boolean>;
  refreshWidgets(): Promise<boolean>;
  shouldRefresh(): Promise<boolean>;
}

// Get native module (only available on Android)
const WidgetModule: SageWidgetModule | null =
  Platform.OS === 'android' ? NativeModules.SageWidgetModule : null;

/**
 * Check if widget functionality is available
 */
export function isWidgetAvailable(): boolean {
  return Platform.OS === 'android' && WidgetModule !== null;
}

/**
 * Update the Android widget with new wisdom data
 */
export async function updateWidgetData(wisdom: WisdomChunk): Promise<boolean> {
  if (!isWidgetAvailable()) {
    console.log('[Widget] Widget not available on this platform');
    return false;
  }

  try {
    const result = await WidgetModule!.updateWidget({
      content: wisdom.content,
      sourceRef: wisdom.sourceRef,
      book: wisdom.book,
      id: wisdom.id,
    });
    console.log('[Widget] Widget data updated successfully');
    return result;
  } catch (error) {
    console.error('[Widget] Failed to update widget data:', error);
    return false;
  }
}

/**
 * Refresh the widget with a new random wisdom quote
 */
export async function refreshWidgetWisdom(options?: {
  themes?: string[];
  books?: string[];
}): Promise<WisdomChunk | null> {
  if (!isWidgetAvailable()) {
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
      await updateWidgetData(wisdom);
      return wisdom;
    }

    return null;
  } catch (error) {
    console.error('[Widget] Failed to refresh widget wisdom:', error);
    return null;
  }
}

/**
 * Force refresh all widget instances
 */
export async function forceRefreshWidgets(): Promise<boolean> {
  if (!isWidgetAvailable()) {
    return false;
  }

  try {
    const result = await WidgetModule!.refreshWidgets();
    console.log('[Widget] Widgets refreshed');
    return result;
  } catch (error) {
    console.error('[Widget] Failed to refresh widgets:', error);
    return false;
  }
}

/**
 * Check if widget data should be refreshed (daily check)
 */
export async function shouldRefreshWidget(): Promise<boolean> {
  if (!isWidgetAvailable()) {
    return false;
  }

  try {
    return await WidgetModule!.shouldRefresh();
  } catch (error) {
    console.error('[Widget] Failed to check refresh status:', error);
    return false;
  }
}

/**
 * Sync widget with current daily wisdom (call this on app startup)
 */
export async function syncWidgetOnStartup(dailyWisdom?: WisdomChunk | null): Promise<void> {
  if (!isWidgetAvailable()) {
    return;
  }

  try {
    const needsRefresh = await shouldRefreshWidget();

    if (needsRefresh || dailyWisdom) {
      if (dailyWisdom) {
        // Use provided wisdom
        await updateWidgetData(dailyWisdom);
      } else {
        // Fetch new wisdom
        await refreshWidgetWisdom();
      }
    }
  } catch (error) {
    console.error('[Widget] Failed to sync widget on startup:', error);
  }
}

/**
 * Initialize widget service (call once during app initialization)
 */
export async function initWidgetService(): Promise<void> {
  if (!isWidgetAvailable()) {
    console.log('[Widget] Widget service not available (non-Android platform)');
    return;
  }

  try {
    console.log('[Widget] Initializing widget service...');

    // Check if widget needs refresh
    const needsRefresh = await shouldRefreshWidget();
    if (needsRefresh) {
      console.log('[Widget] Widget needs refresh, updating...');
      await refreshWidgetWisdom();
    }

    console.log('[Widget] Widget service initialized');
  } catch (error) {
    console.error('[Widget] Failed to initialize widget service:', error);
  }
}

export default {
  isWidgetAvailable,
  updateWidgetData,
  refreshWidgetWisdom,
  forceRefreshWidgets,
  shouldRefreshWidget,
  syncWidgetOnStartup,
  initWidgetService,
};
