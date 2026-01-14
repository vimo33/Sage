/**
 * Speech-to-Text module exports
 */

export {
  checkSpeechRecognitionAvailability,
  requestSpeechRecognitionPermission,
  getSpeechRecognitionPermission,
  startSpeechRecognition,
  stopSpeechRecognition,
  abortSpeechRecognition,
  useSpeechRecognitionEvent,
  type STTEventCallbacks,
  type STTOptions,
} from './service';
