/**
 * Quick Actions Service
 *
 * Provides iOS 3D Touch and Android long-press shortcuts for common actions:
 * - New Entry: Opens journal entry modal
 * - Ask Sage: Opens chat interface
 * - Today's Wisdom: Opens chat with daily wisdom prompt
 */

import * as QuickActions from 'expo-quick-actions';
import { router, type Href } from 'expo-router';
import { Platform } from 'react-native';

export type QuickActionType = 'new_entry' | 'ask_sage' | 'todays_wisdom';

export interface QuickActionData {
  id: QuickActionType;
  title: string;
  subtitle?: string;
  icon?: string;
  params?: Record<string, string>;
}

/**
 * Static quick action definitions for the app
 * These appear when users long-press (Android) or 3D Touch (iOS) the app icon
 */
export const QUICK_ACTIONS: QuickActionData[] = [
  {
    id: 'ask_sage',
    title: 'Ask Sage',
    subtitle: 'Get wisdom guidance',
    icon: Platform.select({
      ios: 'symbol:sparkles',
      android: 'shortcut_ask_sage',
    }),
  },
  {
    id: 'new_entry',
    title: 'New Entry',
    subtitle: 'Write in your journal',
    icon: Platform.select({
      ios: 'symbol:square.and.pencil',
      android: 'shortcut_new_entry',
    }),
  },
  {
    id: 'todays_wisdom',
    title: "Today's Wisdom",
    subtitle: 'Daily inspiration',
    icon: Platform.select({
      ios: 'symbol:sun.max.fill',
      android: 'shortcut_wisdom',
    }),
  },
];

/**
 * Initialize quick actions on app startup
 * Sets up the static shortcuts that appear on app icon long-press
 */
export async function initializeQuickActions(): Promise<void> {
  try {
    // Set initial quick actions
    await QuickActions.setItems(
      QUICK_ACTIONS.map((action) => ({
        id: action.id,
        title: action.title,
        subtitle: action.subtitle,
        icon: action.icon,
        params: action.params,
      }))
    );
    console.log('[QuickActions] Initialized successfully');
  } catch (error) {
    console.error('[QuickActions] Failed to initialize:', error);
  }
}

/**
 * Handle a quick action selection
 * Routes to the appropriate screen based on the action type
 */
export function handleQuickAction(action: QuickActions.Action | null): void {
  if (!action) return;

  console.log('[QuickActions] Handling action:', action.id);

  switch (action.id as QuickActionType) {
    case 'ask_sage':
      // Navigate to the Ask Sage chat screen
      router.push('/ask' as Href);
      break;

    case 'new_entry':
      // Navigate to journal tab with modal trigger
      // The journal screen will handle opening the modal
      router.push('/(tabs)/journal?openModal=true' as Href);
      break;

    case 'todays_wisdom':
      // Navigate to Ask Sage with a pre-filled wisdom prompt
      router.push(('/ask?prompt=' + encodeURIComponent("Share today's wisdom with me. What message does the universe have for me right now?")) as Href);
      break;

    default:
      console.warn('[QuickActions] Unknown action:', action.id);
  }
}

/**
 * Get the initial quick action that launched the app (if any)
 * Returns the action stored at app launch time (synchronous read of the initial value)
 */
export function getInitialQuickAction(): QuickActions.Action | null {
  // eslint-disable-next-line import/namespace
  const action = (QuickActions as { initial?: QuickActions.Action }).initial ?? null;
  if (action) {
    console.log('[QuickActions] App launched from quick action:', action.id);
  }
  return action;
}

/**
 * Subscribe to quick action events while app is running
 * Returns an unsubscribe function
 */
export function subscribeToQuickActions(
  callback: (action: QuickActions.Action) => void
): () => void {
  const subscription = QuickActions.addListener(callback);
  return () => subscription.remove();
}
