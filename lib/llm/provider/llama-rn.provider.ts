/**
 * LlamaRN Provider Implementation
 *
 * This provider wraps the llama.rn library for on-device LLM inference.
 * It provides a provider-agnostic interface for the local GGUF model.
 */

import {
  initLlama,
  releaseAllLlama,
  type LlamaContext,
  type RNLlamaOAICompatibleMessage,
  type TokenData,
} from 'llama.rn';

import type {
  LLMProvider,
  LLMMessage,
  ProviderConfig,
  GenerationOptions,
  CompletionResult,
  ProviderStatus,
  OnTokenCallback,
  OnProgressCallback,
  TokenChunk,
} from './types';
import { createLLMError } from './types';

/**
 * Default stop sequences for Llama-family models.
 */
const DEFAULT_STOP_SEQUENCES = [
  '</s>',
  '<|end|>',
  '<|eot_id|>',
  '<|end_of_text|>',
  '<|im_end|>',
  '<|EOT|>',
  '<|END_OF_TURN_TOKEN|>',
  '<|end_of_turn|>',
  '<|endoftext|>',
];

/**
 * LlamaRN Provider for on-device inference using llama.rn
 */
export class LlamaRNProvider implements LLMProvider {
  readonly providerType = 'llama-rn';
  readonly displayName = 'LlamaRN (On-Device)';

  private context: LlamaContext | null = null;
  private contextVerified = false;
  private modelPath: string | null = null;

  /**
   * Initialize the LlamaRN provider with the given configuration.
   */
  async initialize(
    config: ProviderConfig,
    onProgress?: OnProgressCallback
  ): Promise<void> {
    console.log('[LlamaRNProvider] initialize called with config:', JSON.stringify({
      modelPath: config.modelPath,
      contextSize: config.contextSize,
      gpuLayers: config.gpuLayers,
      threads: config.threads,
    }));

    // If already initialized and verified, return
    if (this.context && this.contextVerified) {
      console.log('[LlamaRNProvider] Already initialized and verified');
      return;
    }

    // Reset verified flag if reinitializing
    this.contextVerified = false;

    if (!config.modelPath) {
      throw createLLMError(
        'modelPath is required for LlamaRN provider',
        'initialization_failed',
        false
      );
    }

    this.modelPath = config.modelPath;

    // Release any existing context first
    if (this.context) {
      try {
        console.log('[LlamaRNProvider] Releasing existing context before reinitializing...');
        await this.context.release();
        this.context = null;
      } catch (e) {
        console.warn('[LlamaRNProvider] Failed to release existing context:', e);
      }
    }

    try {
      console.log('[LlamaRNProvider] Calling initLlama...');

      this.context = await initLlama(
        {
          model: config.modelPath,
          is_model_asset: config.isModelAsset,
          n_ctx: config.contextSize ?? 2048,
          n_gpu_layers: config.gpuLayers ?? 1,
          n_threads: config.threads ?? 4,
          use_mlock: config.useMlock ?? false,
          ctx_shift: config.contextShift ?? true,
          devices: config.devices,
        },
        onProgress
      );

      console.log('[LlamaRNProvider] initLlama completed successfully');

      // Verify the context works with a minimal test completion
      await this.verifyContext();

      console.log('[LlamaRNProvider] isReady() now returns:', this.isReady());
    } catch (error) {
      console.error('[LlamaRNProvider] Initialization failed:', error);
      throw createLLMError(
        `Failed to initialize LlamaRN: ${error instanceof Error ? error.message : String(error)}`,
        'initialization_failed',
        true,
        error
      );
    }
  }

  /**
   * Verify the context works by doing a minimal test completion.
   */
  private async verifyContext(): Promise<void> {
    if (!this.context) {
      return;
    }

    try {
      console.log('[LlamaRNProvider] Verifying context with test completion...');

      const testMessages = [{ role: 'user' as const, content: 'Say "OK"' }];
      const testStop = ['</s>', '<|end|>', '<|eot_id|>', '<|im_end|>'];

      const testResult = await this.context.completion({
        messages: testMessages,
        n_predict: 5,
        temperature: 0.1,
        stop: testStop,
      });

      console.log('[LlamaRNProvider] Test completion result:', JSON.stringify({
        hasText: Boolean(testResult?.text),
        hasContent: Boolean(testResult?.content),
        tokensPredicted: testResult?.tokens_predicted,
        textPreview: (testResult?.text || testResult?.content || '').substring(0, 50),
      }));

      if (testResult && (testResult.tokens_predicted > 0 || testResult.text || testResult.content)) {
        this.contextVerified = true;
        console.log('[LlamaRNProvider] Context VERIFIED - LLM is working!');
      } else {
        console.error('[LlamaRNProvider] Context verification FAILED - no output generated');
        this.contextVerified = false;
      }
    } catch (verifyError) {
      console.error('[LlamaRNProvider] Context verification FAILED with error:', verifyError);
      this.contextVerified = false;
      // Don't throw - let the app continue with fallback responses
    }
  }

  /**
   * Release all resources held by the provider.
   */
  async release(): Promise<void> {
    if (this.context) {
      await this.context.release();
      this.context = null;
    }
    this.contextVerified = false;
    this.modelPath = null;
    await releaseAllLlama();
    console.log('[LlamaRNProvider] Released all resources');
  }

  /**
   * Generate a chat completion using the local model.
   */
  async generateCompletion(
    messages: LLMMessage[],
    options: GenerationOptions = {},
    onToken?: OnTokenCallback
  ): Promise<CompletionResult> {
    if (!this.context) {
      throw createLLMError('Model not initialized', 'not_initialized', false);
    }

    console.log('[LlamaRNProvider] Starting chat completion...');
    console.log('[LlamaRNProvider] Messages count:', messages.length);
    console.log('[LlamaRNProvider] Options:', JSON.stringify(options));

    try {
      // Convert to llama.rn message format
      // IMPORTANT: Create deep mutable copies to avoid "Cannot assign to read-only property" errors
      const llamaMessages: RNLlamaOAICompatibleMessage[] = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const stopSequences = [...(options.stopSequences ?? DEFAULT_STOP_SEQUENCES)];

      // Wrap the onToken callback to convert TokenData to TokenChunk
      const tokenCallback = onToken
        ? (data: TokenData) => {
            const chunk: TokenChunk = {
              token: data.token || '',
              isLast: false,
            };
            onToken(chunk);
          }
        : undefined;

      console.log('[LlamaRNProvider] Calling context.completion...');

      const result = await this.context.completion(
        {
          messages: llamaMessages,
          n_predict: options.maxTokens ?? 512,
          temperature: options.temperature ?? 0.8,
          top_k: options.topK ?? 40,
          top_p: options.topP ?? 0.9,
          penalty_repeat: options.repeatPenalty ?? 1.2,
          stop: stopSequences,
        },
        tokenCallback
      );

      console.log('[LlamaRNProvider] Chat completion finished!');
      console.log('[LlamaRNProvider] Tokens predicted:', result?.tokens_predicted);

      // Extract and return normalized result
      const text = result?.text ?? '';
      const content = result?.content ?? result?.text ?? '';

      return {
        text,
        content,
        reasoningContent: result?.reasoning_content ?? '',
        toolCalls: result?.tool_calls ?? [],
        tokensGenerated: result?.tokens_predicted ?? 0,
        tokensEvaluated: result?.tokens_evaluated ?? 0,
        timings: result?.timings
          ? {
              totalTime: result.timings.predicted_ms,
              tokensPerSecond: result.timings.predicted_per_second,
            }
          : undefined,
      };
    } catch (error) {
      console.error('[LlamaRNProvider] Chat completion error:', error);
      throw createLLMError(
        `Generation failed: ${error instanceof Error ? error.message : String(error)}`,
        'generation_failed',
        true,
        error
      );
    }
  }

  /**
   * Stop any ongoing generation.
   */
  async stopGeneration(): Promise<void> {
    if (!this.context) return;
    await this.context.stopCompletion();
    console.log('[LlamaRNProvider] Stopped generation');
  }

  /**
   * Check if the provider is ready to generate completions.
   */
  isReady(): boolean {
    return Boolean(this.context) && this.contextVerified;
  }

  /**
   * Get detailed status information about the provider.
   */
  getStatus(): ProviderStatus {
    return {
      isReady: this.isReady(),
      isConnected: Boolean(this.context),
      isVerified: this.contextVerified,
      providerName: this.displayName,
      modelIdentifier: this.modelPath ?? undefined,
      statusMessage: this.isReady()
        ? 'Model loaded and verified'
        : this.context
          ? 'Model loaded but not verified'
          : 'Model not loaded',
      details: {
        providerType: this.providerType,
      },
    };
  }
}
