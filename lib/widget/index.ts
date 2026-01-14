/**
 * Widget Module
 *
 * Exports widget-related functionality for Android and iOS home screen widget integration.
 */

import { Platform } from 'react-native';

// Android widget exports
export {
  isWidgetAvailable as isAndroidWidgetAvailable,
  updateWidgetData as updateAndroidWidgetData,
  refreshWidgetWisdom as refreshAndroidWidgetWisdom,
  forceRefreshWidgets as forceRefreshAndroidWidgets,
  shouldRefreshWidget as shouldRefreshAndroidWidget,
  syncWidgetOnStartup as syncAndroidWidgetOnStartup,
  initWidgetService as initAndroidWidgetService,
} from './android-widget';

// iOS widget exports
export {
  isIOSWidgetAvailable,
  updateIOSWidgetData,
  refreshIOSWidgetWisdom,
  forceRefreshIOSWidgets,
  shouldRefreshIOSWidget,
  syncIOSWidgetOnStartup,
  initIOSWidgetService,
} from './ios-widget';

// Re-export Android widget functions for backward compatibility
export {
  isWidgetAvailable,
  updateWidgetData,
  refreshWidgetWisdom,
  forceRefreshWidgets,
  shouldRefreshWidget,
  syncWidgetOnStartup,
} from './android-widget';

// Import platform-specific implementations
import {
  initWidgetService as initAndroidWidgetServiceImpl,
  syncWidgetOnStartup as syncAndroidWidgetOnStartupImpl,
} from './android-widget';
import {
  initIOSWidgetService as initIOSWidgetServiceImpl,
  syncIOSWidgetOnStartup as syncIOSWidgetOnStartupImpl,
} from './ios-widget';
import type { WisdomChunk } from '../retrieval/search';

/**
 * Initialize the widget service for the current platform
 * Call this once during app initialization
 */
export async function initWidgetService(): Promise<void> {
  if (Platform.OS === 'android') {
    await initAndroidWidgetServiceImpl();
  } else if (Platform.OS === 'ios') {
    await initIOSWidgetServiceImpl();
  } else {
    console.log('[Widget] Widget service not available on this platform');
  }
}

/**
 * Sync widget with current daily wisdom on app startup
 * Works for both Android and iOS platforms
 */
export async function syncWidgetOnStartupCrossPlatform(
  dailyWisdom?: WisdomChunk | null
): Promise<void> {
  if (Platform.OS === 'android') {
    await syncAndroidWidgetOnStartupImpl(dailyWisdom);
  } else if (Platform.OS === 'ios') {
    await syncIOSWidgetOnStartupImpl(dailyWisdom);
  }
}
