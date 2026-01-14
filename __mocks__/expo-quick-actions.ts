/**
 * Mock for expo-quick-actions
 * Used in Jest tests for the quick actions service
 */

export type Action = {
  id: string;
  title: string;
  icon?: string | null;
  subtitle?: string | null;
  params?: Record<string, number | string | boolean | null | undefined> | null;
};

// Store for test verification
let mockItems: Action[] = [];
let mockListeners: ((action: Action) => void)[] = [];

// Use a getter so initial can be set dynamically in tests
let _mockInitial: Action | undefined = undefined;

// Use Object.defineProperty to make initial a getter
Object.defineProperty(exports, 'initial', {
  get: () => _mockInitial,
  configurable: true,
});

export const maxCount = 4;

export const setItems = jest.fn(async (items: Action[]) => {
  mockItems = items;
});

export const isSupported = jest.fn(async () => true);

export const addListener = jest.fn((listener: (action: Action) => void) => {
  mockListeners.push(listener);
  return {
    remove: () => {
      mockListeners = mockListeners.filter((l) => l !== listener);
    },
  };
});

// Test utilities
export const __setInitial = (action: Action | undefined) => {
  _mockInitial = action;
};

export const __getItems = () => mockItems;

export const __triggerAction = (action: Action) => {
  mockListeners.forEach((listener) => listener(action));
};

export const __reset = () => {
  mockItems = [];
  mockListeners = [];
  _mockInitial = undefined;
  setItems.mockClear();
  isSupported.mockClear();
  addListener.mockClear();
};
