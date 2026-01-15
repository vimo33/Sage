/**
 * LLM Inference Module
 *
 * This module provides the main interface for LLM operations.
 * It uses the provider abstraction layer to support multiple LLM backends.
 *
 * This file maintains backward compatibility with existing code while
 * internally using the new provider abstraction.
 */

import {
  initializeDefaultProvider,
  getDefaultProvider,
  isDefaultProviderReady,
  getDefaultProviderStatus,
  releaseAllProviders,
  type LLMMessage,
  type GenerationOptions as ProviderGenerationOptions,
  type OnTokenCallback,
  type OnProgressCallback,
  type ProviderConfig,
} from './provider';

/**
 * Model initialization options.
 * These are translated to ProviderConfig internally.
 */
export type ModelInitOptions = {
  modelPath: string;
  isModelAsset?: boolean;
  nCtx?: number;
  nGpuLayers?: number;
  nThreads?: number;
  useMlock?: boolean;
  ctxShift?: boolean;
  devices?: string[];
};

/**
 * Generation options for chat completion.
 * These are translated to the provider's GenerationOptions internally.
 */
export type GenerateOptions = {
  nPredict?: number;
  temperature?: number;
  topK?: number;
  topP?: number;
  repeatPenalty?: number;
  stop?: string[];
};

/**
 * Message type for backward compatibility with existing code.
 * @deprecated Use LLMMessage from provider/types instead
 */
export type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

/**
 * Token data for streaming callbacks.
 * This wraps the provider's TokenChunk for backward compatibility.
 */
export type TokenData = {
  token: string;
};

/**
 * Result type for chat completion.
 */
export type ChatCompletionResult = {
  text: string;
  content: string;
  reasoningContent: string;
  toolCalls: unknown[];
  tokensPredicted: number;
  tokensEvaluated: number;
  timings: unknown;
};

/**
 * Convert ModelInitOptions to ProviderConfig.
 */
function toProviderConfig(options: ModelInitOptions): ProviderConfig {
  return {
    modelPath: options.modelPath,
    isModelAsset: options.isModelAsset,
    contextSize: options.nCtx,
    gpuLayers: options.nGpuLayers,
    threads: options.nThreads,
    useMlock: options.useMlock,
    contextShift: options.ctxShift,
    devices: options.devices,
  };
}

/**
 * Convert GenerateOptions to provider GenerationOptions.
 */
function toProviderGenerationOptions(options: GenerateOptions): ProviderGenerationOptions {
  return {
    maxTokens: options.nPredict,
    temperature: options.temperature,
    topK: options.topK,
    topP: options.topP,
    repeatPenalty: options.repeatPenalty,
    stopSequences: options.stop,
  };
}

/**
 * Initialize the LLM model.
 *
 * This function initializes the default provider with the given configuration.
 * It maintains backward compatibility by returning a context-like object.
 *
 * @param options Model initialization options
 * @param onProgress Optional progress callback (0-1)
 * @returns A promise that resolves when initialization is complete
 */
export async function initModel(
  options: ModelInitOptions,
  onProgress?: (progress: number) => void
): Promise<unknown> {
  console.log('[Sage] initModel called with path:', options.modelPath);
  console.log('[Sage] Current provider ready:', isDefaultProviderReady());

  if (isDefaultProviderReady()) {
    console.log('[Sage] Provider already initialized and ready');
    return getDefaultProvider();
  }

  const config = toProviderConfig(options);

  try {
    const provider = await initializeDefaultProvider(config, onProgress as OnProgressCallback);
    console.log('[Sage] Provider initialized successfully');
    console.log('[Sage] isModelReady() now returns:', isModelReady());
    return provider;
  } catch (error) {
    console.error('[Sage] initModel ERROR:', error);
    throw error;
  }
}

/**
 * Release the LLM model and free resources.
 */
export async function releaseModel(): Promise<void> {
  await releaseAllProviders();
  console.log('[Sage] Model released');
}

/**
 * Generate a chat completion.
 *
 * @param messages Array of chat messages
 * @param options Generation options
 * @param onToken Optional callback for streaming tokens
 * @returns The completion result
 */
export async function generateChat(
  messages: ChatMessage[],
  options: GenerateOptions = {},
  onToken?: (data: TokenData) => void
): Promise<ChatCompletionResult> {
  const provider = getDefaultProvider();

  if (!provider) {
    throw new Error('Model not initialized');
  }

  console.log('[Sage] Starting chat completion...');
  console.log('[Sage] Messages count:', messages.length);
  console.log('[Sage] First message role:', messages[0]?.role);
  console.log('[Sage] Options:', JSON.stringify(options));

  try {
    // Convert messages to LLMMessage format
    const llmMessages: LLMMessage[] = messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    // Convert options
    const genOptions = toProviderGenerationOptions(options);

    // Wrap onToken callback if provided
    const tokenCallback: OnTokenCallback | undefined = onToken
      ? (chunk) => {
          onToken({ token: chunk.token });
        }
      : undefined;

    console.log('[Sage] Calling provider.generateCompletion...');
    const result = await provider.generateCompletion(llmMessages, genOptions, tokenCallback);

    console.log('[Sage] Chat completion finished!');
    console.log('[Sage] Tokens predicted:', result.tokensGenerated);
    console.log('[Sage] Text preview:', result.text.substring(0, 200));

    return {
      text: result.text,
      content: result.content,
      reasoningContent: result.reasoningContent ?? '',
      toolCalls: result.toolCalls ?? [],
      tokensPredicted: result.tokensGenerated,
      tokensEvaluated: result.tokensEvaluated,
      timings: result.timings ?? null,
    };
  } catch (error) {
    console.error('[Sage] Chat completion error:', error);
    throw error;
  }
}

/**
 * Stop any ongoing generation.
 */
export async function stopGeneration(): Promise<void> {
  const provider = getDefaultProvider();
  if (provider) {
    await provider.stopGeneration();
  }
}

/**
 * Check if the model is ready for generation.
 */
export function isModelReady(): boolean {
  const ready = isDefaultProviderReady();
  console.log('[Sage] isModelReady() called, returning:', ready);
  return ready;
}

/**
 * Get detailed model status for debugging.
 */
export function getModelStatus(): { contextExists: boolean; verified: boolean; ready: boolean } {
  const status = getDefaultProviderStatus();
  return {
    contextExists: status.isConnected,
    verified: status.isVerified,
    ready: status.isReady,
  };
}

// Re-export provider types for consumers who want to use them directly
export { LLMMessage, ProviderConfig } from './provider';
