/**
 * Mock for expo-speech-recognition
 */

const mockListeners: Map<string, Function[]> = new Map();

export const ExpoSpeechRecognitionModule = {
  isRecognitionAvailable: jest.fn().mockReturnValue(true),
  getPermissionsAsync: jest.fn().mockResolvedValue({ granted: true }),
  requestPermissionsAsync: jest.fn().mockResolvedValue({ granted: true }),
  start: jest.fn().mockResolvedValue(undefined),
  stop: jest.fn().mockResolvedValue(undefined),
  abort: jest.fn().mockResolvedValue(undefined),
  getStateAsync: jest.fn().mockResolvedValue('inactive'),
  getSupportedLocales: jest.fn().mockResolvedValue({
    installedLocales: ['en-US'],
    supportedLocales: ['en-US'],
  }),
};

export function useSpeechRecognitionEvent(
  event: string,
  callback: Function
): void {
  // Store the callback for testing purposes
  if (!mockListeners.has(event)) {
    mockListeners.set(event, []);
  }
  mockListeners.get(event)?.push(callback);
}

// Helper function for tests to simulate events
export function __simulateEvent(event: string, data?: unknown): void {
  const listeners = mockListeners.get(event) || [];
  listeners.forEach((callback) => callback(data));
}

// Helper to clear listeners between tests
export function __clearListeners(): void {
  mockListeners.clear();
}

// Re-export types
export type ExpoSpeechRecognitionOptions = {
  lang?: string;
  interimResults?: boolean;
  maxAlternatives?: number;
  requiresOnDeviceRecognition?: boolean;
  addsPunctuation?: boolean;
};
