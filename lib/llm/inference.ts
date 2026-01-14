import { initLlama, releaseAllLlama, type LlamaContext, type RNLlamaOAICompatibleMessage, type TokenData } from 'llama.rn';

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

export type GenerateOptions = {
  nPredict?: number;
  temperature?: number;
  topK?: number;
  topP?: number;
  repeatPenalty?: number;
  stop?: string[];
};

const DEFAULT_STOP_WORDS = [
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

let context: LlamaContext | null = null;
let contextVerified = false; // Track if context has been verified to work

export async function initModel(
  options: ModelInitOptions,
  onProgress?: (progress: number) => void
): Promise<LlamaContext> {
  console.log('[Sage] initModel called with path:', options.modelPath);
  console.log('[Sage] Current context exists:', Boolean(context));
  console.log('[Sage] Context verified:', contextVerified);

  if (context && contextVerified) {
    console.log('[Sage] Context already exists and verified, returning existing context');
    return context;
  }

  // Reset verified flag if we're reinitializing
  contextVerified = false;

  if (!options.modelPath) {
    console.error('[Sage] initModel ERROR: modelPath is required but not provided');
    throw new Error('modelPath is required');
  }

  console.log('[Sage] Calling initLlama with options:', JSON.stringify({
    model: options.modelPath,
    nCtx: options.nCtx,
    nGpuLayers: options.nGpuLayers,
    nThreads: options.nThreads,
  }));

  // Release any existing context first
  if (context) {
    try {
      console.log('[Sage] Releasing existing context before reinitializing...');
      await context.release();
      context = null;
    } catch (e) {
      console.warn('[Sage] Failed to release existing context:', e);
    }
  }

  context = await initLlama(
    {
      model: options.modelPath,
      is_model_asset: options.isModelAsset,
      n_ctx: options.nCtx ?? 2048,
      n_gpu_layers: options.nGpuLayers ?? 1,
      n_threads: options.nThreads ?? 4,
      use_mlock: options.useMlock ?? false,
      ctx_shift: options.ctxShift ?? true,
      devices: options.devices,
    },
    onProgress
  );

  console.log('[Sage] initLlama completed successfully!');
  console.log('[Sage] Context is now:', context ? 'SET ✅' : 'NULL ❌');

  // Verify the context actually works by doing a minimal test completion
  if (context) {
    try {
      console.log('[Sage] 🧪 Verifying context with test completion...');
      // Create mutable arrays to avoid "Cannot assign to read-only property 'length'" error
      const testMessages = [{ role: 'user' as const, content: 'Say "OK"' }];
      const testStop = ['</s>', '<|end|>', '<|eot_id|>', '<|im_end|>'];
      const testResult = await context.completion(
        {
          messages: testMessages,
          n_predict: 5, // Minimal prediction
          temperature: 0.1,
          stop: testStop,
        }
      );

      console.log('[Sage] 🧪 Test completion result:', JSON.stringify({
        hasText: Boolean(testResult?.text),
        hasContent: Boolean(testResult?.content),
        tokensPredicted: testResult?.tokens_predicted,
        textPreview: (testResult?.text || testResult?.content || '').substring(0, 50),
      }));

      // Check if we got any output
      if (testResult && (testResult.tokens_predicted > 0 || testResult.text || testResult.content)) {
        contextVerified = true;
        console.log('[Sage] ✅ Context VERIFIED - LLM is working!');
      } else {
        console.error('[Sage] ❌ Context verification FAILED - no output generated');
        contextVerified = false;
      }
    } catch (verifyError) {
      console.error('[Sage] ❌ Context verification FAILED with error:', verifyError);
      console.error('[Sage] Error details:', verifyError instanceof Error ? verifyError.message : String(verifyError));
      contextVerified = false;
      // Don't throw - let the app continue with fallback responses
    }
  }

  console.log('[Sage] isModelReady() now returns:', isModelReady());

  return context;
}

export async function releaseModel(): Promise<void> {
  if (context) {
    await context.release();
    context = null;
  }
  contextVerified = false;
  await releaseAllLlama();
}

export async function generateChat(
  messages: RNLlamaOAICompatibleMessage[],
  options: GenerateOptions = {},
  onToken?: (data: TokenData) => void
): Promise<{
  text: string;
  content: string;
  reasoningContent: string;
  toolCalls: unknown[];
  tokensPredicted: number;
  tokensEvaluated: number;
  timings: unknown;
}> {
  if (!context) {
    throw new Error('Model not initialized');
  }

  console.log('[Sage] Starting chat completion...');
  console.log('[Sage] Messages count:', messages.length);
  console.log('[Sage] First message role:', messages[0]?.role);
  console.log('[Sage] Options:', JSON.stringify(options));

  try {
    console.log('[Sage] 🚀 Calling context.completion...');

    // IMPORTANT: Create deep mutable copies of messages and stop arrays
    // llama.rn's context.completion() mutates these arrays internally (e.g., push())
    // and Hermes engine can make spread/mapped arrays read-only, causing
    // "Cannot assign to read-only property 'length'" errors
    const mutableMessages = messages.map(m => ({ ...m }));
    const mutableStop = [...(options.stop ?? DEFAULT_STOP_WORDS)];

    const result = await context.completion(
      {
        messages: mutableMessages,
        n_predict: options.nPredict ?? 512,
        temperature: options.temperature ?? 0.8,
        top_k: options.topK ?? 40,
        top_p: options.topP ?? 0.9,
        penalty_repeat: options.repeatPenalty ?? 1.2,
        stop: mutableStop,
      },
      onToken
    );

    console.log('[Sage] ✅ Chat completion finished!');
    console.log('[Sage] Result keys:', result ? Object.keys(result) : 'null');
    console.log('[Sage] Tokens predicted:', result?.tokens_predicted);
    console.log('[Sage] Tokens evaluated:', result?.tokens_evaluated);
    console.log('[Sage] Raw text length:', result?.text?.length ?? 0);
    console.log('[Sage] Raw content length:', result?.content?.length ?? 0);
    console.log('[Sage] Text preview:', (result?.text ?? '').substring(0, 200));
    console.log('[Sage] Content preview:', (result?.content ?? '').substring(0, 200));

    // Safely extract properties with fallbacks
    const text = result?.text ?? '';
    const content = result?.content ?? result?.text ?? '';

    console.log('[Sage] Final text length:', text.length);
    console.log('[Sage] Final content length:', content.length);

    return {
      text,
      content,
      reasoningContent: result?.reasoning_content ?? '',
      toolCalls: result?.tool_calls ?? [],
      tokensPredicted: result?.tokens_predicted ?? 0,
      tokensEvaluated: result?.tokens_evaluated ?? 0,
      timings: result?.timings ?? null,
    };
  } catch (error) {
    console.error('[Sage] ❌ Chat completion error:', error);
    console.error('[Sage] Error type:', error?.constructor?.name);
    console.error('[Sage] Error message:', error instanceof Error ? error.message : String(error));
    throw error;
  }
}

export async function stopGeneration(): Promise<void> {
  if (!context) return;
  await context.stopCompletion();
}

export function isModelReady(): boolean {
  const ready = Boolean(context) && contextVerified;
  console.log('[Sage] isModelReady() called, context:', context ? 'EXISTS' : 'NULL', ', verified:', contextVerified, ', returning:', ready);
  return ready;
}

/**
 * Returns detailed model status for debugging
 */
export function getModelStatus(): { contextExists: boolean; verified: boolean; ready: boolean } {
  return {
    contextExists: Boolean(context),
    verified: contextVerified,
    ready: Boolean(context) && contextVerified,
  };
}
