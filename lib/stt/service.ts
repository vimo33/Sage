/**
 * Speech-to-Text Service Module
 *
 * Provides privacy-preserving on-device speech recognition for hands-free
 * question input. Transcribes voice to text for RAG processing.
 *
 * Uses expo-speech-recognition for cross-platform speech recognition support.
 */

import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from 'expo-speech-recognition';

/**
 * Callback types for speech recognition lifecycle events
 */
export type STTEventCallbacks = {
  onStart?: () => void;
  onEnd?: () => void;
  onResult?: (transcript: string, isFinal: boolean) => void;
  onError?: (error: string) => void;
};

/**
 * Speech recognition configuration options
 */
export type STTOptions = {
  /** Language code for recognition (default: 'en-US') */
  language?: string;
  /** Whether to show partial results as user speaks */
  interimResults?: boolean;
  /** Maximum number of alternative transcriptions */
  maxAlternatives?: number;
  /** Require on-device recognition for privacy (default: true) */
  requiresOnDeviceRecognition?: boolean;
  /** Add punctuation to transcription (if supported) */
  addsPunctuation?: boolean;
};

const DEFAULT_OPTIONS: STTOptions = {
  language: 'en-US',
  interimResults: true,
  maxAlternatives: 1,
  requiresOnDeviceRecognition: true,
  addsPunctuation: true,
};

/**
 * Checks if speech recognition is available on the device
 */
export function checkSpeechRecognitionAvailability(): {
  available: boolean;
  onDeviceAvailable: boolean;
} {
  try {
    const isAvailable = ExpoSpeechRecognitionModule.isRecognitionAvailable();
    return {
      available: isAvailable,
      // On-device availability is platform-specific, assume available if recognition is available
      onDeviceAvailable: isAvailable,
    };
  } catch {
    return {
      available: false,
      onDeviceAvailable: false,
    };
  }
}

/**
 * Requests microphone permission for speech recognition
 */
export async function requestSpeechRecognitionPermission(): Promise<boolean> {
  try {
    const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    return result.granted;
  } catch {
    return false;
  }
}

/**
 * Checks if microphone permission is granted
 */
export async function getSpeechRecognitionPermission(): Promise<boolean> {
  try {
    const result = await ExpoSpeechRecognitionModule.getPermissionsAsync();
    return result.granted;
  } catch {
    return false;
  }
}

/**
 * Starts speech recognition with the given options
 */
export async function startSpeechRecognition(
  options: STTOptions = {}
): Promise<void> {
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

  await ExpoSpeechRecognitionModule.start({
    lang: mergedOptions.language,
    interimResults: mergedOptions.interimResults,
    maxAlternatives: mergedOptions.maxAlternatives,
    requiresOnDeviceRecognition: mergedOptions.requiresOnDeviceRecognition,
    addsPunctuation: mergedOptions.addsPunctuation,
  });
}

/**
 * Stops ongoing speech recognition
 */
export async function stopSpeechRecognition(): Promise<void> {
  await ExpoSpeechRecognitionModule.stop();
}

/**
 * Aborts ongoing speech recognition (discards results)
 */
export async function abortSpeechRecognition(): Promise<void> {
  await ExpoSpeechRecognitionModule.abort();
}

/**
 * Re-export the hook for use in components
 */
export { useSpeechRecognitionEvent };
