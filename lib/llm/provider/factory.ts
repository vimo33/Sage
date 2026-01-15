/**
 * Provider Factory and Registry
 *
 * This module provides a factory for creating LLM providers and a registry
 * for managing provider instances. It enables easy switching between providers
 * and supports A/B testing different models.
 */

import type {
  LLMProvider,
  ProviderType,
  ProviderConfig,
  OnProgressCallback,
} from './types';
import { LlamaRNProvider } from './llama-rn.provider';
import { MockProvider, type MockProviderOptions } from './mock.provider';

/**
 * Factory function type for creating providers.
 */
type ProviderFactory = (config?: ProviderConfig) => LLMProvider;

/**
 * Registry of provider factories.
 */
const providerFactories = new Map<ProviderType, ProviderFactory>();

// Register built-in providers
providerFactories.set('llama-rn', () => new LlamaRNProvider());
providerFactories.set('mock', () => new MockProvider());

/**
 * Registry of active provider instances.
 * Allows for singleton pattern and lifecycle management.
 */
const activeProviders: Map<string, LLMProvider> = new Map();

/**
 * The default/current provider instance.
 */
let defaultProvider: LLMProvider | null = null;
let defaultProviderType: ProviderType = 'llama-rn';

/**
 * Create a new provider instance of the specified type.
 *
 * @param type The type of provider to create
 * @param config Optional configuration for the provider
 * @returns A new provider instance
 */
export function createProvider(
  type: ProviderType,
  config?: ProviderConfig
): LLMProvider {
  const factory = providerFactories.get(type);

  if (!factory) {
    throw new Error(`Unknown provider type: ${type}. Available types: ${Array.from(providerFactories.keys()).join(', ')}`);
  }

  console.log(`[ProviderFactory] Creating provider of type: ${type}`);
  return factory(config);
}

/**
 * Register a custom provider factory.
 * This allows extending the system with new provider implementations.
 *
 * @param type Unique identifier for the provider type
 * @param factory Factory function to create the provider
 */
export function registerProvider(
  type: string,
  factory: ProviderFactory
): void {
  console.log(`[ProviderFactory] Registering provider type: ${type}`);
  providerFactories.set(type as ProviderType, factory);
}

/**
 * Get or create a named provider instance.
 * Uses singleton pattern - returns existing instance if available.
 *
 * @param name Unique name for this provider instance
 * @param type Type of provider to create if not exists
 * @param config Configuration for the provider
 * @returns The provider instance
 */
export function getOrCreateProvider(
  name: string,
  type: ProviderType,
  config?: ProviderConfig
): LLMProvider {
  let provider = activeProviders.get(name);

  if (!provider) {
    provider = createProvider(type, config);
    activeProviders.set(name, provider);
    console.log(`[ProviderFactory] Created and registered provider: ${name} (${type})`);
  }

  return provider;
}

/**
 * Get a named provider instance if it exists.
 *
 * @param name Name of the provider instance
 * @returns The provider instance or undefined
 */
export function getProvider(name: string): LLMProvider | undefined {
  return activeProviders.get(name);
}

/**
 * Release a named provider instance.
 *
 * @param name Name of the provider instance to release
 */
export async function releaseProvider(name: string): Promise<void> {
  const provider = activeProviders.get(name);
  if (provider) {
    await provider.release();
    activeProviders.delete(name);
    console.log(`[ProviderFactory] Released provider: ${name}`);
  }
}

/**
 * Release all registered provider instances.
 */
export async function releaseAllProviders(): Promise<void> {
  console.log(`[ProviderFactory] Releasing all providers (${activeProviders.size} active)`);

  const releases = Array.from(activeProviders.entries()).map(
    async ([name, provider]) => {
      try {
        await provider.release();
        console.log(`[ProviderFactory] Released: ${name}`);
      } catch (e) {
        console.error(`[ProviderFactory] Failed to release ${name}:`, e);
      }
    }
  );

  await Promise.all(releases);
  activeProviders.clear();
  defaultProvider = null;
}

/**
 * Set the default provider type to use.
 *
 * @param type The provider type to use as default
 */
export function setDefaultProviderType(type: ProviderType): void {
  defaultProviderType = type;
  console.log(`[ProviderFactory] Default provider type set to: ${type}`);
}

/**
 * Get the current default provider type.
 */
export function getDefaultProviderType(): ProviderType {
  return defaultProviderType;
}

/**
 * Initialize and set the default provider.
 *
 * @param config Configuration for the provider
 * @param onProgress Progress callback for initialization
 * @returns The initialized provider
 */
export async function initializeDefaultProvider(
  config: ProviderConfig,
  onProgress?: OnProgressCallback
): Promise<LLMProvider> {
  // Release existing default provider if different type
  if (defaultProvider) {
    await defaultProvider.release();
    defaultProvider = null;
  }

  defaultProvider = createProvider(defaultProviderType, config);
  await defaultProvider.initialize(config, onProgress);

  // Also register as named provider for easy access
  activeProviders.set('default', defaultProvider);

  console.log(`[ProviderFactory] Default provider initialized: ${defaultProviderType}`);
  return defaultProvider;
}

/**
 * Get the default provider instance.
 * Returns null if not initialized.
 */
export function getDefaultProvider(): LLMProvider | null {
  return defaultProvider;
}

/**
 * Check if the default provider is ready.
 */
export function isDefaultProviderReady(): boolean {
  return defaultProvider?.isReady() ?? false;
}

/**
 * Get the status of the default provider.
 */
export function getDefaultProviderStatus() {
  if (!defaultProvider) {
    return {
      isReady: false,
      isConnected: false,
      isVerified: false,
      providerName: 'None',
      statusMessage: 'No provider initialized',
    };
  }
  return defaultProvider.getStatus();
}

/**
 * Create a mock provider with custom options.
 * Convenience function for testing.
 */
export function createMockProvider(options?: MockProviderOptions): MockProvider {
  return new MockProvider(options);
}

/**
 * List all registered provider types.
 */
export function getRegisteredProviderTypes(): ProviderType[] {
  return Array.from(providerFactories.keys());
}

/**
 * List all active provider instances.
 */
export function getActiveProviderNames(): string[] {
  return Array.from(activeProviders.keys());
}

// Re-export types for convenience
export type { ProviderType, ProviderConfig, LLMProvider };
