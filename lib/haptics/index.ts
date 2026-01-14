/**
 * Haptic Feedback Utility Module
 *
 * Provides consistent haptic feedback patterns across the app for key interactions:
 * - Save insight, complete journal entry, start TTS
 * - Enhances mobile-native feel with tactile feedback
 *
 * Uses expo-haptics for cross-platform haptic support.
 */

import * as Haptics from 'expo-haptics';

/**
 * Haptic feedback types for different interaction contexts
 */
export type HapticFeedbackType =
  | 'light'    // Light tap - button presses, selections
  | 'medium'   // Medium impact - confirmations, state changes
  | 'heavy'    // Heavy impact - significant actions
  | 'success'  // Success notification - save complete, action successful
  | 'warning'  // Warning notification - caution state
  | 'error';   // Error notification - action failed

/**
 * Triggers haptic feedback based on the specified type.
 * Silently handles cases where haptics are not available (e.g., simulator, unsupported devices).
 *
 * @param type - The type of haptic feedback to trigger
 */
export async function triggerHaptic(type: HapticFeedbackType = 'light'): Promise<void> {
  try {
    switch (type) {
      case 'success':
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        break;
      case 'warning':
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        break;
      case 'error':
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        break;
      case 'heavy':
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        break;
      case 'medium':
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        break;
      case 'light':
      default:
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        break;
    }
  } catch {
    // Haptics not available on this device - fail silently
  }
}

/**
 * Pre-defined haptic patterns for common app interactions
 */
export const HapticPatterns = {
  /**
   * Triggers when an insight/verse is saved
   * Uses success feedback to confirm the save action
   */
  saveInsight: () => triggerHaptic('success'),

  /**
   * Triggers when a journal entry is saved/completed
   * Uses success feedback to confirm entry completion
   */
  saveJournalEntry: () => triggerHaptic('success'),

  /**
   * Triggers when TTS playback starts
   * Uses medium feedback to indicate playback initiation
   */
  startTTS: () => triggerHaptic('medium'),

  /**
   * Triggers when TTS playback stops
   * Uses light feedback for stop action
   */
  stopTTS: () => triggerHaptic('light'),

  /**
   * Triggers on button press for tactile confirmation
   * Uses light feedback for subtle interaction
   */
  buttonPress: () => triggerHaptic('light'),

  /**
   * Triggers when a practice session is completed
   * Uses success feedback to celebrate completion
   */
  practiceComplete: () => triggerHaptic('success'),

  /**
   * Triggers when session summary is saved to journal
   * Uses success feedback to confirm save
   */
  saveSummaryToJournal: () => triggerHaptic('success'),

  /**
   * Triggers on selection change (e.g., mood selection, options)
   * Uses light feedback for selection feedback
   */
  selection: () => triggerHaptic('light'),

  /**
   * Triggers for delete/destructive actions
   * Uses warning feedback to indicate caution
   */
  deleteAction: () => triggerHaptic('warning'),

  /**
   * Triggers when voice recording starts
   * Uses medium feedback to indicate recording initiation
   */
  startVoiceRecording: () => triggerHaptic('medium'),

  /**
   * Triggers when voice recording stops
   * Uses light feedback for stop action
   */
  stopVoiceRecording: () => triggerHaptic('light'),

  /**
   * Triggers when voice transcription is received successfully
   * Uses success feedback to confirm transcription
   */
  voiceTranscriptionComplete: () => triggerHaptic('success'),
} as const;
