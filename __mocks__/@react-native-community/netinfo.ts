/**
 * Mock for @react-native-community/netinfo
 */

const mockState = {
  isConnected: false,
  type: 'none',
  isInternetReachable: false,
};

let listeners: Array<(state: typeof mockState) => void> = [];

const NetInfo = {
  fetch: jest.fn(() => Promise.resolve(mockState)),
  addEventListener: jest.fn((callback: (state: typeof mockState) => void) => {
    listeners.push(callback);
    // Return unsubscribe function
    return () => {
      listeners = listeners.filter((l) => l !== callback);
    };
  }),
  // Test helpers
  __setMockState: (state: Partial<typeof mockState>) => {
    Object.assign(mockState, state);
    listeners.forEach((listener) => listener({ ...mockState }));
  },
  __getMockState: () => ({ ...mockState }),
  __resetMock: () => {
    mockState.isConnected = false;
    mockState.type = 'none';
    mockState.isInternetReachable = false;
    listeners = [];
    NetInfo.fetch.mockClear();
    NetInfo.addEventListener.mockClear();
  },
};

export default NetInfo;
