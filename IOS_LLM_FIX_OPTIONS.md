# iOS LLM Fix Options

## Current Issue
The 462MB llama.rn model crashes on iOS when `initModel()` is called.

## Potential Solutions

### Option 1: Try Different Model Initialization Parameters ⚡
Test with more conservative settings:

```typescript
await initModel({
  modelPath: validationResult.localUri,
  isModelAsset: true,
  nCtx: 512,        // Reduced from 2048
  nGpuLayers: 0,    // Disable GPU (use CPU only)
  nThreads: 2,      // Reduced from 4
  useMlock: false,  // Disable memory locking
});
```

### Option 2: Use Smaller Model 🎯
The current model is 462MB which may be too large for iOS.

**Steps:**
1. Find a smaller quantized model (Q4_K_M or Q3_K_S)
2. Target size: 100-200MB
3. Replace `assets/models/sage-model.gguf`
4. Model sources:
   - Hugging Face: https://huggingface.co/models
   - Look for "GGUF" format models
   - Common small models: Phi-2, TinyLlama, SmolLM

### Option 3: Lazy Loading with Timeout ⏱️
Add timeout and retry logic:

```typescript
const initWithTimeout = (timeout = 30000) => {
  return Promise.race([
    initModel({ ... }),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Model load timeout')), timeout)
    )
  ]);
};

try {
  await initWithTimeout(30000);
} catch (error) {
  console.log('Model load failed, using fallback');
  // Continue without model
}
```

### Option 4: Update llama.rn Version 📦
Current version: `0.9.7`
Try updating to latest:

```bash
npm install llama.rn@latest
cd ios && pod install
```

### Option 5: Test on Physical iPhone 📱
Simulators have memory constraints. Try:

```bash
# Connect iPhone 12 via USB
npx expo run:ios --device

# Or build with Xcode
# Open ios/SageAI.xcworkspace
# Select your iPhone 12 as target
# Build and run
```

Physical devices often handle large models better than simulators.

## Recommended Testing Order

1. ✅ **Test on Android first** (confirmed working)
2. Try smaller model on iOS
3. Try physical iPhone 12 (not simulator)
4. Try conservative init parameters
5. Update llama.rn version

## Why Android Works Better

- Android allows larger memory allocations
- Better native module support for ML
- llama.rn tested more on Android
- No iOS-specific memory restrictions
