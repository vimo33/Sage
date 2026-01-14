# iOS App Crash Analysis

**Date**: 2026-01-13
**Issue**: App launches but crashes after 5-15 seconds

---

## Symptoms

1. App builds successfully ✅
2. App installs on simulator ✅
3. App launches and shows either:
   - Expo Dev Client screen (white, loads properly)
   - Black screen (attempting to load JS bundle)
4. App crashes after a few seconds ❌
5. Returns to iOS home screen ❌

---

## What We Know

### Build Status
- ✅ Compiles without errors
- ✅ All native modules compile (llama.rn, React Native, Expo modules)
- ✅ CocoaPods dependencies installed correctly
- ✅ Metro bundler runs successfully on port 8081

### Runtime Behavior
From system logs, the app successfully:
1. Launches process
2. Connects to Metro bundler
3. Loads React Native bridge
4. Registers Expo modules:
   - ExpoFetchModule
   - ExpoApplication
   - ExpoAsset
   - ExponentConstants
5. Then crashes (no crash report generated)

### No Crash Reports
- No SIGABRT, SIGKILL, or SIGTERM signals detected
- No crash files in ~/Library/Logs/DiagnosticReports/
- Process simply terminates without explicit error

---

## Likely Causes

Based on the app code structure (`app/_layout.tsx`), the crash is likely happening during **app initialization**:

### 1. Model Validation Issue (Most Likely)
The app's root layout calls:
```typescript
await validateAndLoadModel();
```

This function likely tries to:
- Load a machine learning model file (.gguf file for llama.rn)
- Validate the model exists and is accessible
- Initialize the llama.rn native module

**Possible issues**:
- Model file doesn't exist in app bundle
- Model file path is incorrect
- llama.rn module failing to initialize on iOS
- Memory issues loading large model file

### 2. Storage/Database Initialization
The app calls:
```typescript
await initializeApp(); // Initializes store
```

This likely:
- Initializes SQLite database
- Loads app preferences
- Sets up storage

**Possible issues**:
- Database file access issues
- SQLite initialization problems
- File system permission errors

### 3. Widget Service Initialization
```typescript
await initWidgetService();
```

**Possible issues**:
- iOS widget plugin failing
- Native module communication error

---

## Debug Approach Needed

To diagnose the exact crash, we need to:

### Option 1: Add Error Boundaries & Logging
Add a try-catch in _layout.tsx to catch initialization errors:

```typescript
try {
  await initializeApp();
  await runModelValidation();
  await initializeQuickActions();
  await initWidgetService();
} catch (e) {
  console.error('[CRASH DEBUG]', e);
  // Show error screen instead of crashing
  Alert.alert('Initialization Error', String(e));
}
```

### Option 2: Simplify Entry Point
Temporarily comment out complex initialization to isolate the issue:

1. Comment out model validation
2. Comment out widget initialization
3. See if app loads with minimal setup

### Option 3: Check Model Files
Verify the .gguf model file exists and is included in the app bundle:

```bash
# Check if model is in assets
ls -lh assets/models/

# Check Xcode build settings for bundled files
# File should be included in "Copy Bundle Resources" build phase
```

### Option 4: Enable JavaScript Debugging
Connect React Native debugger or enable remote debugging to see JavaScript console errors.

---

## Immediate Next Steps

1. **Check if model file exists**:
   ```bash
   ls -lh /Users/vimo/Projects/OpenCode/Sage_AI/assets/models/
   ```

2. **Simplify _layout.tsx temporarily**:
   - Comment out `validateAndLoadModel()`
   - Comment out `initWidgetService()`
   - See if app loads with just basic navigation

3. **Add explicit error handling**:
   - Wrap all async initialization in try-catch
   - Display errors to screen instead of crashing
   - Log errors to console

4. **Check Metro bundler terminal**:
   - Look for JavaScript errors when bundle loads
   - Check for "ReferenceError", "TypeError", etc.

---

## Files to Investigate

1. `/Users/vimo/Projects/OpenCode/Sage_AI/lib/storage/store.ts`
   - Check `initialize()` function
   - Check `validateAndLoadModel()` function

2. `/Users/vimo/Projects/OpenCode/Sage_AI/lib/llm/model-validator.ts`
   - Check model file path
   - Check validation logic

3. `/Users/vimo/Projects/OpenCode/Sage_AI/lib/widget/index.ts`
   - Check `initWidgetService()` function

4. `/Users/vimo/Projects/OpenCode/Sage_AI/assets/models/`
   - Verify model files exist
   - Check file sizes (should be bundled correctly)

---

## Workaround

To get the app running for testing, create a simplified version of `_layout.tsx`:

```typescript
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#1a1a2e' },
        }}
      >
        <Stack.Screen name="(tabs)" />
      </Stack>
    </SafeAreaProvider>
  );
}
```

This removes all async initialization and should at least show the UI.

---

## Summary

**The build works perfectly** - the issue is a **runtime JavaScript error** during app initialization, most likely related to:
1. Model file loading/validation
2. Native module initialization (llama.rn)
3. Storage/database initialization

**Next action**: Need to check model files and add error logging to identify the exact failure point.
