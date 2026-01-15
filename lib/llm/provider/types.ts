/**
 * LLM Provider Abstraction Layer
 *
 * This module defines the interfaces for LLM providers, enabling easy switching
 * between local models (llama.rn), cloud providers (OpenAI, Anthropic), or hybrid approaches.
 *
 * Design Goals:
 * - Provider-agnostic message format
 * - Consistent API for all LLM operations
 * - Support for streaming tokens
 * - Graceful error handling and fallbacks
 * - Easy A/B testing between providers
 */

/**
 * Standard message format used across all providers.
 * This is inspired by OpenAI's format but provider-agnostic.
 */
export interface LLMMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

/**
 * Configuration for initializing an LLM provider.
 * Different providers may use different subsets of these options.
 */
export interface ProviderConfig {
  /** Path to local model file (for local providers) */
  modelPath?: string;
  /** Whether the model is bundled as an asset */
  isModelAsset?: boolean;
  /** Context window size in tokens */
  contextSize?: number;
  /** Number of GPU layers to use (for local inference) */
  gpuLayers?: number;
  /** Number of CPU threads to use */
  threads?: number;
  /** Use memory locking */
  useMlock?: boolean;
  /** Enable context shifting */
  contextShift?: boolean;
  /** Specific devices to use */
  devices?: string[];
  /** API key (for cloud providers) */
  apiKey?: string;
  /** API endpoint (for cloud providers or custom endpoints) */
  apiEndpoint?: string;
  /** Model name/identifier (for cloud providers) */
  modelName?: string;
  /** Request timeout in milliseconds */
  timeout?: number;
}

/**
 * Options for text generation/completion.
 */
export interface GenerationOptions {
  /** Maximum number of tokens to generate */
  maxTokens?: number;
  /** Temperature for randomness (0.0 to 2.0) */
  temperature?: number;
  /** Top-K sampling */
  topK?: number;
  /** Top-P (nucleus) sampling */
  topP?: number;
  /** Repeat/presence penalty */
  repeatPenalty?: number;
  /** Stop sequences to end generation */
  stopSequences?: string[];
}

/**
 * Token data emitted during streaming generation.
 */
export interface TokenChunk {
  /** The generated token/text chunk */
  token: string;
  /** Whether this is the final chunk */
  isLast?: boolean;
}

/**
 * Result of a completion/generation request.
 */
export interface CompletionResult {
  /** The main generated text */
  text: string;
  /** Alternative content field (for compatibility) */
  content: string;
  /** Reasoning/chain-of-thought content if available */
  reasoningContent?: string;
  /** Tool calls if applicable */
  toolCalls?: unknown[];
  /** Number of tokens generated */
  tokensGenerated: number;
  /** Number of tokens in the prompt */
  tokensEvaluated: number;
  /** Timing information */
  timings?: {
    /** Time to first token in ms */
    timeToFirstToken?: number;
    /** Total generation time in ms */
    totalTime?: number;
    /** Tokens per second */
    tokensPerSecond?: number;
  };
  /** Provider-specific metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Status of the LLM provider.
 */
export interface ProviderStatus {
  /** Whether the provider is fully initialized and ready */
  isReady: boolean;
  /** Whether the provider context/connection exists */
  isConnected: boolean;
  /** Whether the provider has been verified to work */
  isVerified: boolean;
  /** Human-readable status message */
  statusMessage?: string;
  /** Provider name/identifier */
  providerName: string;
  /** Model name/path being used */
  modelIdentifier?: string;
  /** Additional status info */
  details?: Record<string, unknown>;
}

/**
 * Error types for LLM operations.
 */
export type LLMErrorType =
  | 'not_initialized'
  | 'initialization_failed'
  | 'generation_failed'
  | 'timeout'
  | 'context_busy'
  | 'model_not_found'
  | 'api_error'
  | 'rate_limited'
  | 'unknown';

/**
 * Structured error for LLM operations.
 */
export interface LLMError extends Error {
  type: LLMErrorType;
  isRetryable: boolean;
  originalError?: unknown;
}

/**
 * Creates an LLMError with proper typing.
 */
export function createLLMError(
  message: string,
  type: LLMErrorType,
  isRetryable: boolean = false,
  originalError?: unknown
): LLMError {
  const error = new Error(message) as LLMError;
  error.type = type;
  error.isRetryable = isRetryable;
  error.originalError = originalError;
  error.name = 'LLMError';
  return error;
}

/**
 * Callback for receiving token chunks during streaming.
 */
export type OnTokenCallback = (chunk: TokenChunk) => void;

/**
 * Callback for tracking initialization progress.
 */
export type OnProgressCallback = (progress: number) => void;

/**
 * Main interface for LLM providers.
 *
 * All providers must implement this interface to be used with the abstraction layer.
 * This enables switching between local models, cloud APIs, or hybrid approaches
 * without changing business logic.
 */
export interface LLMProvider {
  /** Unique identifier for this provider type */
  readonly providerType: string;

  /** Human-readable name for this provider */
  readonly displayName: string;

  /**
   * Initialize the provider with the given configuration.
   * @param config Provider-specific configuration
   * @param onProgress Optional callback for initialization progress (0-1)
   */
  initialize(config: ProviderConfig, onProgress?: OnProgressCallback): Promise<void>;

  /**
   * Release all resources held by the provider.
   * Should be called when the provider is no longer needed.
   */
  release(): Promise<void>;

  /**
   * Generate a chat completion.
   * @param messages Array of messages in the conversation
   * @param options Generation options
   * @param onToken Optional callback for streaming tokens
   */
  generateCompletion(
    messages: LLMMessage[],
    options?: GenerationOptions,
    onToken?: OnTokenCallback
  ): Promise<CompletionResult>;

  /**
   * Stop any ongoing generation.
   */
  stopGeneration(): Promise<void>;

  /**
   * Check if the provider is ready to generate completions.
   */
  isReady(): boolean;

  /**
   * Get detailed status information about the provider.
   */
  getStatus(): ProviderStatus;
}

/**
 * Provider type identifiers for factory registration.
 */
export type ProviderType = 'llama-rn' | 'mock' | 'openai' | 'anthropic';
