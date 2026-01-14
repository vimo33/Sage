import * as Speech from 'expo-speech';
import type { UserPreferences } from '../storage/store';

export type TTSEventCallbacks = {
  onStart?: () => void;
  onDone?: () => void;
  onStopped?: () => void;
  onError?: (error: unknown) => void;
};

export async function speakAssistantReply(
  text: string,
  preferences: UserPreferences,
  callbacks?: TTSEventCallbacks
) {
  if (!preferences.narrateResponses) return;

  const isSpeaking = await Speech.isSpeakingAsync();
  if (isSpeaking) {
    await Speech.stop();
  }

  const cleanText = text
    .replace(/[#*`_]/g, '')
    .replace(/\n\n/g, '. ')
    .trim();

  Speech.speak(cleanText, {
    rate: preferences.voiceSpeed,
    pitch: 1.0,
    onStart: () => callbacks?.onStart?.(),
    onDone: () => callbacks?.onDone?.(),
    onStopped: () => callbacks?.onStopped?.(),
    onError: (error) => callbacks?.onError?.(error),
  });
}

export function stopSpeaking() {
  void Speech.stop();
}

export async function isSpeakingAsync(): Promise<boolean> {
  return Speech.isSpeakingAsync();
}
