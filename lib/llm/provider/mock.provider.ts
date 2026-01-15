/**
 * Mock Provider Implementation
 *
 * This provider is used for testing and development purposes.
 * It simulates LLM responses without requiring an actual model.
 */

import type {
  LLMProvider,
  LLMMessage,
  ProviderConfig,
  GenerationOptions,
  CompletionResult,
  ProviderStatus,
  OnTokenCallback,
  OnProgressCallback,
} from './types';
import { createLLMError } from './types';

/**
 * Configuration options specific to the mock provider.
 */
export interface MockProviderOptions {
  /** Simulated response delay in milliseconds */
  responseDelayMs?: number;
  /** Default response to return */
  defaultResponse?: string;
  /** Whether to simulate failures */
  simulateFailures?: boolean;
  /** Failure rate (0-1) when simulateFailures is true */
  failureRate?: number;
  /** Custom response generator function */
  responseGenerator?: (messages: LLMMessage[]) => string;
}

/**
 * Default mock responses for different scenarios.
 */
const DEFAULT_MOCK_RESPONSES = {
  default: `Guidance: This is a mock response from the test provider. In a real scenario, the AI would provide thoughtful guidance based on your question.

Reflection:
- What aspects of your situation feel most challenging right now?
- What small step could you take today toward your goal?

Practice: Take three deep breaths, then write down one thing you're grateful for today.`,

  greeting: `Guidance: Hello! I'm Sage, your mindful companion. I'm here to help you reflect and find clarity.

Reflection:
- What brings you here today?
- What would feel like a meaningful conversation for you right now?

Practice: Take a moment to center yourself with a few slow, deep breaths.`,

  short: 'Guidance: Take a moment to breathe and reflect.\n\nReflection:\n- What matters most?\n\nPractice: One deep breath.',
};

/**
 * Mock Provider for testing without an actual LLM.
 */
export class MockProvider implements LLMProvider {
  readonly providerType = 'mock';
  readonly displayName = 'Mock Provider (Testing)';

  private initialized = false;
  private options: MockProviderOptions;

  constructor(options: MockProviderOptions = {}) {
    this.options = {
      responseDelayMs: 100,
      defaultResponse: DEFAULT_MOCK_RESPONSES.default,
      simulateFailures: false,
      failureRate: 0.1,
      ...options,
    };
  }

  /**
   * Initialize the mock provider.
   */
  async initialize(
    config: ProviderConfig,
    onProgress?: OnProgressCallback
  ): Promise<void> {
    console.log('[MockProvider] Initializing...');

    // Simulate initialization progress
    if (onProgress) {
      onProgress(0);
      await this.delay(50);
      onProgress(0.5);
      await this.delay(50);
      onProgress(1);
    }

    this.initialized = true;
    console.log('[MockProvider] Initialized successfully');
  }

  /**
   * Release resources (no-op for mock).
   */
  async release(): Promise<void> {
    this.initialized = false;
    console.log('[MockProvider] Released');
  }

  /**
   * Generate a mock completion.
   */
  async generateCompletion(
    messages: LLMMessage[],
    options: GenerationOptions = {},
    onToken?: OnTokenCallback
  ): Promise<CompletionResult> {
    if (!this.initialized) {
      throw createLLMError('Mock provider not initialized', 'not_initialized', false);
    }

    // Optionally simulate failures
    if (this.options.simulateFailures && Math.random() < (this.options.failureRate ?? 0.1)) {
      throw createLLMError('Simulated failure', 'generation_failed', true);
    }

    console.log('[MockProvider] Generating completion for', messages.length, 'messages');

    // Simulate processing delay
    await this.delay(this.options.responseDelayMs ?? 100);

    // Generate response
    let responseText: string;
    if (this.options.responseGenerator) {
      responseText = this.options.responseGenerator(messages);
    } else {
      responseText = this.selectResponse(messages);
    }

    // Simulate streaming if callback provided
    if (onToken) {
      const tokens = responseText.split(' ');
      for (let i = 0; i < tokens.length; i++) {
        await this.delay(10);
        onToken({
          token: (i > 0 ? ' ' : '') + tokens[i],
          isLast: i === tokens.length - 1,
        });
      }
    }

    return {
      text: responseText,
      content: responseText,
      tokensGenerated: responseText.split(' ').length,
      tokensEvaluated: messages.reduce((acc, m) => acc + m.content.split(' ').length, 0),
      timings: {
        totalTime: this.options.responseDelayMs,
        tokensPerSecond: 100,
      },
      metadata: {
        isMock: true,
      },
    };
  }

  /**
   * Stop generation (no-op for mock).
   */
  async stopGeneration(): Promise<void> {
    console.log('[MockProvider] Stop generation called');
  }

  /**
   * Check if the provider is ready.
   */
  isReady(): boolean {
    return this.initialized;
  }

  /**
   * Get provider status.
   */
  getStatus(): ProviderStatus {
    return {
      isReady: this.initialized,
      isConnected: this.initialized,
      isVerified: this.initialized,
      providerName: this.displayName,
      statusMessage: this.initialized ? 'Mock provider ready' : 'Not initialized',
      details: {
        providerType: this.providerType,
        isMock: true,
      },
    };
  }

  /**
   * Configure mock options at runtime.
   */
  configure(options: Partial<MockProviderOptions>): void {
    this.options = { ...this.options, ...options };
  }

  /**
   * Set a custom response generator.
   */
  setResponseGenerator(generator: (messages: LLMMessage[]) => string): void {
    this.options.responseGenerator = generator;
  }

  /**
   * Helper to select an appropriate mock response based on input.
   */
  private selectResponse(messages: LLMMessage[]): string {
    const lastUserMessage = messages
      .filter((m) => m.role === 'user')
      .pop()?.content.toLowerCase() ?? '';

    if (lastUserMessage.match(/^(hi|hello|hey|greetings)/)) {
      return DEFAULT_MOCK_RESPONSES.greeting;
    }

    if (lastUserMessage.length < 20) {
      return DEFAULT_MOCK_RESPONSES.short;
    }

    return this.options.defaultResponse ?? DEFAULT_MOCK_RESPONSES.default;
  }

  /**
   * Helper for simulating delays.
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

/**
 * Create a pre-configured mock provider for testing.
 */
export function createMockProvider(options?: MockProviderOptions): MockProvider {
  return new MockProvider(options);
}
