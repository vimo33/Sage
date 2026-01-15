/**
 * LLM Provider Abstraction Layer
 *
 * This module exports all the components needed to work with LLM providers
 * in a provider-agnostic way. It enables easy switching between:
 * - Local models (llama.rn for on-device inference)
 * - Cloud providers (OpenAI, Anthropic, etc.)
 * - Hybrid approaches
 * - Mock providers for testing
 *
 * Usage:
 * ```typescript
 * import {
 *   initializeDefaultProvider,
 *   getDefaultProvider,
 *   isDefaultProviderReady,
 * } from '@/lib/llm/provider';
 *
 * // Initialize the provider
 * await initializeDefaultProvider({
 *   modelPath: '/path/to/model.gguf',
 *   contextSize: 2048,
 * });
 *
 * // Use the provider
 * if (isDefaultProviderReady()) {
 *   const provider = getDefaultProvider();
 *   const result = await provider.generateCompletion(messages);
 * }
 * ```
 */

// Types
export type {
  LLMMessage,
  LLMProvider,
  ProviderConfig,
  ProviderStatus,
  ProviderType,
  GenerationOptions,
  CompletionResult,
  TokenChunk,
  OnTokenCallback,
  OnProgressCallback,
  LLMError,
  LLMErrorType,
} from './types';

export { createLLMError } from './types';

// Provider implementations
export { LlamaRNProvider } from './llama-rn.provider';
export { MockProvider, createMockProvider as createMockProviderInstance } from './mock.provider';
export type { MockProviderOptions } from './mock.provider';

// Factory and registry
export {
  createProvider,
  registerProvider,
  getOrCreateProvider,
  getProvider,
  releaseProvider,
  releaseAllProviders,
  setDefaultProviderType,
  getDefaultProviderType,
  initializeDefaultProvider,
  getDefaultProvider,
  isDefaultProviderReady,
  getDefaultProviderStatus,
  createMockProvider,
  getRegisteredProviderTypes,
  getActiveProviderNames,
} from './factory';
