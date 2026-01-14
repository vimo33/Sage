// Mock for llama.rn native module
export const initLlama = jest.fn().mockResolvedValue({
  id: 'mock-context',
  completion: jest.fn().mockResolvedValue(''),
  release: jest.fn().mockResolvedValue(undefined),
});

export const releaseAllLlama = jest.fn().mockResolvedValue(undefined);

export type LlamaContext = {
  id: string;
  completion: (params: any, callback?: (data: any) => void) => Promise<any>;
  release: () => Promise<void>;
};

export type RNLlamaOAICompatibleMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export type TokenData = {
  token: string;
};
