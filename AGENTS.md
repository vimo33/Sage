# Sage AI - Agent Context

You are continuing work on **Sage**, a privacy-first, fully on-device AI companion for self-inquiry and wisdom.

## 🏗 Tech Stack & Architecture
- **Framework**: Expo 52 (SDK 52) + React Native 0.76.
- **Architecture**: **Old Architecture** (New Architecture / Fabric is currently disabled in `app.json` for library compatibility).
- **AI Engine**: `llama.rn` (native C++ LLM engine).
- **Database**: `expo-sqlite` for local wisdom retrieval (13,955 passages).
- **State**: Zustand (`lib/storage/store.ts`) with persistence via `expo-secure-store`.
- **Styling**: Standard React Native `StyleSheet` following a Swiss-inspired dark theme.

## 📍 Current Status
All core UI screens and orchestration logic are implemented based on `design_references/design_reference.md`.

### ✅ What's Done
- **Navigation**: Full Expo Router setup with Tab bar and Onboarding redirection.
- **UI Screens**:
  - `app/onboarding.tsx`: 3-step setup flow (Welcome -> Tone -> Narration).
  - `app/(tabs)/index.tsx`: Home screen with "Daily Focus" and FAB entry to chat.
  - `app/ask.tsx`: Full conversational AI interface with citations and fuzzy search fallback.
  - `app/(tabs)/journal.tsx`: List of private reflections + daily prompt.
  - `app/(tabs)/insights.tsx`: Collection of saved wisdom passages.
  - `app/(tabs)/settings.tsx`: Tone selection and TTS speed controls.
- **Native Stability**: 
  - Patched `node_modules/react-native-screens` and `react-native-reanimated` to fix C++20 `std::move` and `ShadowNode` errors.
  - Configured `metro.config.js` to handle `.gguf` and `.db` assets.
- **AI Logic**: 
  - Integrated **Qwen3-0.6B** model (`assets/models/sage-model.gguf`).
  - Implemented conversational memory (last 10 messages).
  - Added fuzzy search fallback in `lib/retrieval/search.ts` to prevent empty retrieval results.

## ⚠️ Critical Constraints
1. **On-Device Only**: No network calls during normal operation. 
2. **Native Build**: Must use `npx expo run:ios` (standard Expo Go will crash/fail AI logic).
3. **C++ Standard**: The project is forced to **gnu++20** in the Podfile to support the LLM engine.
4. **Model Loading**: The model is ~480MB. Loading is deferred until after onboarding to prevent startup timeouts.

## 🚀 Next Steps / Ideas
- **Save to Insights**: Implement a button on Sage's response bubbles to save specific citations to the Insights tab.
- **Journal Integration**: Allow users to "Convert Chat to Journal Entry" at the end of a session.
- **Search Polish**: Further refine `detectIntentThemes` to map more natural language emotions to SQLite themes.
- **TTS Interactivity**: Add a "Stop Speaking" button or visual waveform during narration.

## 🛠 Troubleshooting for Agents
- **RCTFatal / Bridge Crash**: Usually caused by `mlock` being true in `inference.ts` or safe-area context missing.
- **Broken Record Response**: Happens if `isModelReady()` returns false (check if the model file exists at the exact path and name).
- **C++ Compilation Errors**: Check if `newArchEnabled` was accidentally set to true in `app.json`.
