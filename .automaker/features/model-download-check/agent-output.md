
🔧 Tool: Task
Input: {
  "description": "Explore codebase structure",
  "prompt": "Explore this React Native/Expo codebase to understand:\n1. The overall project structure and key directories\n2. How the app initializes (look at app/_layout.tsx and related files)\n3. Where models are stored (look for references to .gguf files or model paths)\n4. How the LLM inference works (lib/llm/inference.ts)\n5. Any existing error handling patterns for missing resources\n6. The storage and retrieval mechanisms\n\nBe thorough and provide file paths with key code snippets for each finding.",
  "subagent_type": "Explore"
}

🔧 Tool: Bash
Input: {
  "command": "find /Users/vimo/Projects/OpenCode/Sage_AI -type f -name \"*.tsx\" -o -name \"*.ts\" -o -name \"*.json\" | grep -E \"(package\\.json|app|lib)\" | head -30",
  "description": "List TypeScript and JSON files in project"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI"
}

🔧 Tool: Bash
Input: {
  "command": "ls -la /Users/vimo/Projects/OpenCode/Sage_AI/ | grep -v node_modules",
  "description": "List main project directory contents"
}

🔧 Tool: Glob
Input: {
  "pattern": "**/*.tsx",
  "path": "/Users/vimo/Projects/OpenCode/Sage_AI"
}

🔧 Tool: Glob
Input: {
  "pattern": "**/*.ts",
  "path": "/Users/vimo/Projects/OpenCode/Sage_AI"
}

🔧 Tool: Glob
Input: {
  "pattern": "app/**/*.tsx",
  "path": "/Users/vimo/Projects/OpenCode/Sage_AI"
}

🔧 Tool: Glob
Input: {
  "pattern": "lib/**/*.ts",
  "path": "/Users/vimo/Projects/OpenCode/Sage_AI"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/package.json"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/app/_layout.tsx"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/llm/inference.ts"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/app.json"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/storage/store.ts"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/chat/service.ts"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/retrieval/search.ts"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/chat/sage.ts"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/app/(tabs)/_layout.tsx"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/app/onboarding.tsx"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/storage/migrations.ts"
}

🔧 Tool: Bash
Input: {
  "command": "find /Users/vimo/Projects/OpenCode/Sage_AI/assets -type f -name \"*.gguf\" -o -name \"*.db\" | head -20",
  "description": "Find model and database asset files"
}

🔧 Tool: Bash
Input: {
  "command": "ls -la /Users/vimo/Projects/OpenCode/Sage_AI/assets/ 2>/dev/null | head -30",
  "description": "List assets directory"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/app/(tabs)/index.tsx"
}

🔧 Tool: Bash
Input: {
  "command": "wc -l /Users/vimo/Projects/OpenCode/Sage_AI/app/\\(tabs\\)/index.tsx",
  "description": "Check line count of main screen file"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/app/ask.tsx",
  "limit": 150
}

🔧 Tool: Glob
Input: {
  "pattern": "lib/ui/**/*.ts",
  "path": "/Users/vimo/Projects/OpenCode/Sage_AI"
}

🔧 Tool: Bash
Input: {
  "command": "find /Users/vimo/Projects/OpenCode/Sage_AI/lib/ui -type f | head -20",
  "description": "List UI library files"
}

🔧 Tool: Bash
Input: {
  "command": "ls -la /Users/vimo/Projects/OpenCode/Sage_AI/lib/",
  "description": "List lib directory"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/ui/DailyWisdomWidget.tsx"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/safety/index.ts"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/safety/resources.ts"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/safety/crisis-detector.ts"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/tts/service.ts"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/ui/theme.ts"
}
Now I have a comprehensive understanding of the codebase. Let me plan the implementation for the model download check feature.

🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Create model validation utility in lib/llm/model-validator.ts",
      "status": "pending",
      "activeForm": "Creating model validation utility"
    },
    {
      "content": "Add model validation state to Zustand store",
      "status": "pending",
      "activeForm": "Adding model validation state to store"
    },
    {
      "content": "Integrate model check into app initialization flow in _layout.tsx",
      "status": "pending",
      "activeForm": "Integrating model check into app initialization"
    },
    {
      "content": "Create ModelErrorScreen component with troubleshooting steps",
      "status": "pending",
      "activeForm": "Creating ModelErrorScreen component"
    },
    {
      "content": "Test implementation with Playwright verification",
      "status": "pending",
      "activeForm": "Testing implementation with Playwright"
    }
  ]
}

🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Create model validation utility in lib/llm/model-validator.ts",
      "status": "in_progress",
      "activeForm": "Creating model validation utility"
    },
    {
      "content": "Add model validation state to Zustand store",
      "status": "pending",
      "activeForm": "Adding model validation state to store"
    },
    {
      "content": "Integrate model check into app initialization flow in _layout.tsx",
      "status": "pending",
      "activeForm": "Integrating model check into app initialization"
    },
    {
      "content": "Create ModelErrorScreen component with troubleshooting steps",
      "status": "pending",
      "activeForm": "Creating ModelErrorScreen component"
    },
    {
      "content": "Test implementation with Playwright verification",
      "status": "pending",
      "activeForm": "Testing implementation with Playwright"
    }
  ]
}
Let me first read the existing inference file to understand the patterns better:

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/llm/inference.ts"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/storage/store.ts"
}
Now let me also read the app layout and existing UI components to understand the patterns:

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/app/_layout.tsx"
}

🔧 Tool: Glob
Input: {
  "pattern": "components/**/*.tsx",
  "path": "/Users/vimo/Projects/OpenCode/Sage_AI"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/components/journal/JournalEntryModal.tsx"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/ui/theme.ts"
}
Now I have a good understanding of the codebase patterns. Let me implement the model validation feature. I'll start by creating the model validator utility:

🔧 Tool: Write
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/llm/model-validator.ts",
  "content": "import { Asset } from 'expo-asset';\nimport * as FileSystem from 'expo-file-system';\n\nexport type ModelValidationStatus = 'valid' | 'missing' | 'corrupted' | 'unknown';\n\nexport interface ModelValidationResult {\n  status: ModelValidationStatus;\n  error?: string;\n  localUri?: string;\n  fileSize?: number;\n}\n\n// Minimum expected size for a valid GGUF model (1MB minimum as sanity check)\nconst MIN_MODEL_SIZE_BYTES = 1 * 1024 * 1024;\n\n// GGUF magic number header bytes (first 4 bytes should be 'GGUF' or its LE equivalent)\nconst GGUF_MAGIC_BYTES = [0x47, 0x47, 0x55, 0x46]; // 'GGUF' in ASCII\n\n/**\n * Validates that the sage-model.gguf exists and appears to be a valid GGUF file.\n * Checks:\n * 1. Asset can be resolved and downloaded\n * 2. File exists at the local URI\n * 3. File size is reasonable (not empty or truncated)\n * 4. File has valid GGUF header magic bytes\n */\nexport async function validateModel(): Promise<ModelValidationResult> {\n  try {\n    console.log('[Sage] Starting model validation...');\n\n    // Step 1: Try to resolve the model asset\n    let modelAsset: Asset;\n    try {\n      modelAsset = Asset.fromModule(require('../../assets/models/sage-model.gguf'));\n    } catch (resolveError) {\n      console.error('[Sage] Failed to resolve model asset:', resolveError);\n      return {\n        status: 'missing',\n        error: 'Model file not found in app bundle. The sage-model.gguf file may be missing from assets/models/',\n      };\n    }\n\n    // Step 2: Download asset to get local URI\n    try {\n      await modelAsset.downloadAsync();\n    } catch (downloadError) {\n      console.error('[Sage] Failed to download model asset:', downloadError);\n      return {\n        status: 'missing',\n        error: 'Failed to access model file. The asset may not be properly bundled.',\n      };\n    }\n\n    if (!modelAsset.localUri) {\n      return {\n        status: 'missing',\n        error: 'Model file could not be resolved to a local path.',\n      };\n    }\n\n    const localUri = modelAsset.localUri;\n    console.log('[Sage] Model local URI:', localUri);\n\n    // Step 3: Check file exists and get info\n    const fileInfo = await FileSystem.getInfoAsync(localUri);\n\n    if (!fileInfo.exists) {\n      return {\n        status: 'missing',\n        error: 'Model file does not exist at expected location.',\n        localUri,\n      };\n    }\n\n    const fileSize = fileInfo.size ?? 0;\n    console.log('[Sage] Model file size:', fileSize, 'bytes');\n\n    // Step 4: Validate file size\n    if (fileSize < MIN_MODEL_SIZE_BYTES) {\n      return {\n        status: 'corrupted',\n        error: `Model file appears to be corrupted or incomplete. Size: ${formatFileSize(fileSize)} (expected at least ${formatFileSize(MIN_MODEL_SIZE_BYTES)})`,\n        localUri,\n        fileSize,\n      };\n    }\n\n    // Step 5: Validate GGUF header magic bytes\n    const isValidHeader = await validateGgufHeader(localUri);\n    if (!isValidHeader) {\n      return {\n        status: 'corrupted',\n        error: 'Model file does not have a valid GGUF header. The file may be corrupted or is not a valid GGUF model.',\n        localUri,\n        fileSize,\n      };\n    }\n\n    console.log('[Sage] Model validation successful');\n    return {\n      status: 'valid',\n      localUri,\n      fileSize,\n    };\n  } catch (error) {\n    console.error('[Sage] Model validation failed with unexpected error:', error);\n    return {\n      status: 'unknown',\n      error: `Unexpected error during model validation: ${error instanceof Error ? error.message : String(error)}`,\n    };\n  }\n}\n\n/**\n * Reads the first 4 bytes of the file to check for GGUF magic number\n */\nasync function validateGgufHeader(fileUri: string): Promise<boolean> {\n  try {\n    // Read first 4 bytes as base64\n    const headerContent = await FileSystem.readAsStringAsync(fileUri, {\n      encoding: FileSystem.EncodingType.Base64,\n      length: 4,\n      position: 0,\n    });\n\n    // Convert base64 to bytes\n    const bytes = base64ToBytes(headerContent);\n\n    if (bytes.length < 4) {\n      return false;\n    }\n\n    // Check if first 4 bytes match GGUF magic\n    for (let i = 0; i < 4; i++) {\n      if (bytes[i] !== GGUF_MAGIC_BYTES[i]) {\n        console.log('[Sage] GGUF header mismatch at byte', i, '- expected', GGUF_MAGIC_BYTES[i], 'got', bytes[i]);\n        return false;\n      }\n    }\n\n    return true;\n  } catch (error) {\n    console.error('[Sage] Failed to read GGUF header:', error);\n    return false;\n  }\n}\n\n/**\n * Convert base64 string to byte array\n */\nfunction base64ToBytes(base64: string): number[] {\n  const binaryString = atob(base64);\n  const bytes: number[] = [];\n  for (let i = 0; i < binaryString.length; i++) {\n    bytes.push(binaryString.charCodeAt(i));\n  }\n  return bytes;\n}\n\n/**\n * Format file size for human-readable display\n */\nfunction formatFileSize(bytes: number): string {\n  if (bytes < 1024) return `${bytes} B`;\n  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;\n  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;\n  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;\n}\n\n/**\n * Get troubleshooting steps based on the validation status\n */\nexport function getTroubleshootingSteps(result: ModelValidationResult): string[] {\n  const steps: string[] = [];\n\n  switch (result.status) {\n    case 'missing':\n      steps.push('Ensure sage-model.gguf is placed in assets/models/ directory');\n      steps.push('Verify the file is included in metro.config.js asset extensions');\n      steps.push('Run \"npx expo prebuild --clean\" to rebuild the app bundle');\n      steps.push('Check that app.json includes \"gguf\" in packagerOpts.assetExts');\n      break;\n\n    case 'corrupted':\n      steps.push('Re-download the sage-model.gguf file from the original source');\n      steps.push('Verify the file integrity using checksum if available');\n      steps.push('Ensure the download completed fully without interruption');\n      steps.push('Clear app cache and reinstall the application');\n      break;\n\n    case 'unknown':\n      steps.push('Restart the application and try again');\n      steps.push('Check device storage is not full');\n      steps.push('Clear app data and reinstall if the problem persists');\n      steps.push('Contact support if the issue continues');\n      break;\n\n    default:\n      break;\n  }\n\n  return steps;\n}\n"
}

🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Create model validation utility in lib/llm/model-validator.ts",
      "status": "completed",
      "activeForm": "Creating model validation utility"
    },
    {
      "content": "Add model validation state to Zustand store",
      "status": "in_progress",
      "activeForm": "Adding model validation state to store"
    },
    {
      "content": "Integrate model check into app initialization flow in _layout.tsx",
      "status": "pending",
      "activeForm": "Integrating model check into app initialization"
    },
    {
      "content": "Create ModelErrorScreen component with troubleshooting steps",
      "status": "pending",
      "activeForm": "Creating ModelErrorScreen component"
    },
    {
      "content": "Test implementation with Playwright verification",
      "status": "pending",
      "activeForm": "Testing implementation with Playwright"
    }
  ]
}
Now let me update the Zustand store to add model validation state:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/storage/store.ts",
  "old_string": "import { create } from 'zustand';\nimport * as SecureStore from 'expo-secure-store';\nimport { Asset } from 'expo-asset';\nimport { initModel } from '../llm/inference';",
  "new_string": "import { create } from 'zustand';\nimport * as SecureStore from 'expo-secure-store';\nimport { Asset } from 'expo-asset';\nimport { initModel } from '../llm/inference';\nimport { validateModel, type ModelValidationResult, type ModelValidationStatus } from '../llm/model-validator';"
}

🔧 Tool: Edit
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/storage/store.ts",
  "old_string": "interface SageState {\n  isInitialized: boolean;\n  isModelLoaded: boolean;\n  isGenerating: boolean;\n\n  preferences: UserPreferences;\n  chatHistory: ChatMessage[];\n  journalEntries: JournalEntry[];\n  savedInsights: SavedInsight[];\n  dailyWisdom: DailyWisdom | null;\n\n  initialize: () => Promise<void>;\n  setPreferences: (prefs: Partial<UserPreferences>) => void;\n  addChatMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;\n  clearChatHistory: () => void;\n  addJournalEntry: (entry: Omit<JournalEntry, 'id' | 'createdAt'>) => void;\n  saveInsight: (insight: Omit<SavedInsight, 'id' | 'createdAt'>) => void;\n  setIsGenerating: (generating: boolean) => void;\n  setModelLoaded: (loaded: boolean) => void;\n  loadModel: () => Promise<void>;\n  setDailyWisdom: (wisdom: DailyWisdom) => void;\n  isWisdomSaved: (wisdomId: string) => boolean;\n}",
  "new_string": "interface SageState {\n  isInitialized: boolean;\n  isModelLoaded: boolean;\n  isGenerating: boolean;\n  modelValidationStatus: ModelValidationStatus;\n  modelValidationError: string | null;\n\n  preferences: UserPreferences;\n  chatHistory: ChatMessage[];\n  journalEntries: JournalEntry[];\n  savedInsights: SavedInsight[];\n  dailyWisdom: DailyWisdom | null;\n\n  initialize: () => Promise<void>;\n  validateAndLoadModel: () => Promise<ModelValidationResult>;\n  setPreferences: (prefs: Partial<UserPreferences>) => void;\n  addChatMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;\n  clearChatHistory: () => void;\n  addJournalEntry: (entry: Omit<JournalEntry, 'id' | 'createdAt'>) => void;\n  saveInsight: (insight: Omit<SavedInsight, 'id' | 'createdAt'>) => void;\n  setIsGenerating: (generating: boolean) => void;\n  setModelLoaded: (loaded: boolean) => void;\n  loadModel: () => Promise<void>;\n  setDailyWisdom: (wisdom: DailyWisdom) => void;\n  isWisdomSaved: (wisdomId: string) => boolean;\n}"
}

🔧 Tool: Edit
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/storage/store.ts",
  "old_string": "export const useSageStore = create<SageState>((set, get) => ({\n  isInitialized: false,\n  isModelLoaded: false,\n  isGenerating: false,\n\n  preferences: DEFAULT_PREFERENCES,\n  chatHistory: [],\n  journalEntries: [],\n  savedInsights: [],\n  dailyWisdom: null,",
  "new_string": "export const useSageStore = create<SageState>((set, get) => ({\n  isInitialized: false,\n  isModelLoaded: false,\n  isGenerating: false,\n  modelValidationStatus: 'unknown' as ModelValidationStatus,\n  modelValidationError: null,\n\n  preferences: DEFAULT_PREFERENCES,\n  chatHistory: [],\n  journalEntries: [],\n  savedInsights: [],\n  dailyWisdom: null,"
}
Now let me add the validateAndLoadModel method after the initialize method:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/storage/store.ts",
  "old_string": "set({ preferences: nextPreferences, dailyWisdom, isInitialized: true });\n  },\n  \n  setPreferences: (prefs) => {",
  "new_string": "set({ preferences: nextPreferences, dailyWisdom, isInitialized: true });\n  },\n\n  validateAndLoadModel: async () => {\n    console.log('[Sage] Starting model validation...');\n    const validationResult = await validateModel();\n\n    set({\n      modelValidationStatus: validationResult.status,\n      modelValidationError: validationResult.error ?? null,\n    });\n\n    if (validationResult.status === 'valid' && validationResult.localUri) {\n      console.log('[Sage] Model validation passed, loading model...');\n      try {\n        await initModel({\n          modelPath: validationResult.localUri,\n          isModelAsset: true,\n          nCtx: 2048,\n        });\n        set({ isModelLoaded: true });\n        console.log('[Sage] Model loaded successfully');\n      } catch (loadError) {\n        console.error('[Sage] Model load failed after validation:', loadError);\n        set({\n          modelValidationStatus: 'corrupted',\n          modelValidationError: `Model file passed validation but failed to load: ${loadError instanceof Error ? loadError.message : String(loadError)}`,\n        });\n      }\n    } else {\n      console.log('[Sage] Model validation failed:', validationResult.status, validationResult.error);\n    }\n\n    return validationResult;\n  },\n\n  setPreferences: (prefs) => {"
}

🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Create model validation utility in lib/llm/model-validator.ts",
      "status": "completed",
      "activeForm": "Creating model validation utility"
    },
    {
      "content": "Add model validation state to Zustand store",
      "status": "completed",
      "activeForm": "Adding model validation state to store"
    },
    {
      "content": "Integrate model check into app initialization flow in _layout.tsx",
      "status": "pending",
      "activeForm": "Integrating model check into app initialization"
    },
    {
      "content": "Create ModelErrorScreen component with troubleshooting steps",
      "status": "in_progress",
      "activeForm": "Creating ModelErrorScreen component"
    },
    {
      "content": "Test implementation with Playwright verification",
      "status": "pending",
      "activeForm": "Testing implementation with Playwright"
    }
  ]
}
Now let me create the ModelErrorScreen component:

🔧 Tool: Write
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/components/ModelErrorScreen.tsx",
  "content": "import React from 'react';\nimport {\n  View,\n  Text,\n  StyleSheet,\n  ScrollView,\n  TouchableOpacity,\n  Linking,\n} from 'react-native';\nimport { SafeAreaView } from 'react-native-safe-area-context';\nimport { COLORS, SPACING, RADII, SHADOWS, withAlpha } from '../lib/ui/theme';\nimport { getTroubleshootingSteps, type ModelValidationResult } from '../lib/llm/model-validator';\n\ninterface ModelErrorScreenProps {\n  validationResult: ModelValidationResult;\n  onRetry: () => void;\n}\n\nexport function ModelErrorScreen({ validationResult, onRetry }: ModelErrorScreenProps) {\n  const troubleshootingSteps = getTroubleshootingSteps(validationResult);\n\n  const getStatusTitle = (): string => {\n    switch (validationResult.status) {\n      case 'missing':\n        return 'Model Not Found';\n      case 'corrupted':\n        return 'Model Corrupted';\n      case 'unknown':\n        return 'Model Error';\n      default:\n        return 'Model Error';\n    }\n  };\n\n  const getStatusDescription = (): string => {\n    switch (validationResult.status) {\n      case 'missing':\n        return 'The AI model file (sage-model.gguf) could not be found. This file is required for Sage to provide guidance.';\n      case 'corrupted':\n        return 'The AI model file appears to be damaged or incomplete. Sage needs a valid model file to function properly.';\n      case 'unknown':\n        return 'An unexpected error occurred while checking the AI model. Please try again or contact support if the issue persists.';\n      default:\n        return 'There was a problem with the AI model.';\n    }\n  };\n\n  return (\n    <SafeAreaView style={styles.container} testID=\"model-error-screen\">\n      <ScrollView\n        style={styles.scrollView}\n        contentContainerStyle={styles.contentContainer}\n      >\n        {/* Error Icon */}\n        <View style={styles.iconContainer}>\n          <Text style={styles.errorIcon}>!</Text>\n        </View>\n\n        {/* Title */}\n        <Text style={styles.title} testID=\"model-error-title\">\n          {getStatusTitle()}\n        </Text>\n\n        {/* Description */}\n        <Text style={styles.description} testID=\"model-error-description\">\n          {getStatusDescription()}\n        </Text>\n\n        {/* Technical Error Details */}\n        {validationResult.error && (\n          <View style={styles.errorBox}>\n            <Text style={styles.errorBoxTitle}>Technical Details</Text>\n            <Text style={styles.errorBoxText} testID=\"model-error-details\">\n              {validationResult.error}\n            </Text>\n          </View>\n        )}\n\n        {/* Troubleshooting Steps */}\n        <View style={styles.troubleshootingSection}>\n          <Text style={styles.sectionTitle}>Troubleshooting Steps</Text>\n          {troubleshootingSteps.map((step, index) => (\n            <View key={index} style={styles.stepContainer}>\n              <View style={styles.stepNumber}>\n                <Text style={styles.stepNumberText}>{index + 1}</Text>\n              </View>\n              <Text style={styles.stepText} testID={`troubleshooting-step-${index}`}>\n                {step}\n              </Text>\n            </View>\n          ))}\n        </View>\n\n        {/* Additional Help */}\n        <View style={styles.helpSection}>\n          <Text style={styles.helpText}>\n            If the problem persists after trying these steps, please reach out for assistance.\n          </Text>\n          <TouchableOpacity\n            style={styles.helpLink}\n            onPress={() => Linking.openURL('https://github.com/anthropics/sage-ai/issues')}\n            testID=\"report-issue-link\"\n          >\n            <Text style={styles.helpLinkText}>Report an Issue</Text>\n          </TouchableOpacity>\n        </View>\n      </ScrollView>\n\n      {/* Retry Button */}\n      <View style={styles.buttonContainer}>\n        <TouchableOpacity\n          style={styles.retryButton}\n          onPress={onRetry}\n          testID=\"retry-button\"\n        >\n          <Text style={styles.retryButtonText}>Try Again</Text>\n        </TouchableOpacity>\n      </View>\n    </SafeAreaView>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: {\n    flex: 1,\n    backgroundColor: COLORS.background,\n  },\n  scrollView: {\n    flex: 1,\n  },\n  contentContainer: {\n    padding: SPACING.xl,\n    paddingBottom: SPACING.xxxl,\n    alignItems: 'center',\n  },\n  iconContainer: {\n    width: 80,\n    height: 80,\n    borderRadius: 40,\n    backgroundColor: withAlpha(COLORS.danger, 0.15),\n    justifyContent: 'center',\n    alignItems: 'center',\n    marginTop: SPACING.xxxl,\n    marginBottom: SPACING.xxl,\n  },\n  errorIcon: {\n    fontSize: 48,\n    fontWeight: '700',\n    color: COLORS.danger,\n  },\n  title: {\n    fontSize: 24,\n    fontWeight: '700',\n    color: COLORS.white,\n    textAlign: 'center',\n    marginBottom: SPACING.md,\n  },\n  description: {\n    fontSize: 16,\n    color: COLORS.textSecondary,\n    textAlign: 'center',\n    lineHeight: 24,\n    marginBottom: SPACING.xxl,\n    paddingHorizontal: SPACING.md,\n  },\n  errorBox: {\n    width: '100%',\n    backgroundColor: COLORS.surface,\n    borderRadius: RADII.md,\n    padding: SPACING.lg,\n    marginBottom: SPACING.xxl,\n    borderWidth: 1,\n    borderColor: withAlpha(COLORS.danger, 0.3),\n  },\n  errorBoxTitle: {\n    fontSize: 12,\n    fontWeight: '600',\n    color: COLORS.danger,\n    marginBottom: SPACING.sm,\n    textTransform: 'uppercase',\n    letterSpacing: 1,\n  },\n  errorBoxText: {\n    fontSize: 13,\n    color: COLORS.textMuted,\n    fontFamily: 'monospace',\n    lineHeight: 20,\n  },\n  troubleshootingSection: {\n    width: '100%',\n    marginBottom: SPACING.xxl,\n  },\n  sectionTitle: {\n    fontSize: 18,\n    fontWeight: '600',\n    color: COLORS.white,\n    marginBottom: SPACING.lg,\n  },\n  stepContainer: {\n    flexDirection: 'row',\n    alignItems: 'flex-start',\n    marginBottom: SPACING.md,\n    backgroundColor: COLORS.surface,\n    borderRadius: RADII.md,\n    padding: SPACING.md,\n  },\n  stepNumber: {\n    width: 24,\n    height: 24,\n    borderRadius: 12,\n    backgroundColor: withAlpha(COLORS.primary, 0.2),\n    justifyContent: 'center',\n    alignItems: 'center',\n    marginRight: SPACING.md,\n  },\n  stepNumberText: {\n    fontSize: 12,\n    fontWeight: '700',\n    color: COLORS.primary,\n  },\n  stepText: {\n    flex: 1,\n    fontSize: 14,\n    color: COLORS.textPrimary,\n    lineHeight: 20,\n  },\n  helpSection: {\n    width: '100%',\n    alignItems: 'center',\n    paddingTop: SPACING.lg,\n    borderTopWidth: 1,\n    borderTopColor: COLORS.surfaceAlt,\n  },\n  helpText: {\n    fontSize: 14,\n    color: COLORS.textMuted,\n    textAlign: 'center',\n    marginBottom: SPACING.md,\n  },\n  helpLink: {\n    paddingVertical: SPACING.sm,\n    paddingHorizontal: SPACING.lg,\n  },\n  helpLinkText: {\n    fontSize: 14,\n    color: COLORS.primary,\n    fontWeight: '600',\n  },\n  buttonContainer: {\n    padding: SPACING.xl,\n    paddingBottom: SPACING.xxxl,\n    ...SHADOWS.md,\n  },\n  retryButton: {\n    backgroundColor: COLORS.primary,\n    borderRadius: RADII.lg,\n    paddingVertical: SPACING.lg,\n    alignItems: 'center',\n    justifyContent: 'center',\n  },\n  retryButtonText: {\n    fontSize: 16,\n    fontWeight: '700',\n    color: COLORS.background,\n  },\n});\n"
}

🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Create model validation utility in lib/llm/model-validator.ts",
      "status": "completed",
      "activeForm": "Creating model validation utility"
    },
    {
      "content": "Add model validation state to Zustand store",
      "status": "completed",
      "activeForm": "Adding model validation state to store"
    },
    {
      "content": "Integrate model check into app initialization flow in _layout.tsx",
      "status": "in_progress",
      "activeForm": "Integrating model check into app initialization"
    },
    {
      "content": "Create ModelErrorScreen component with troubleshooting steps",
      "status": "completed",
      "activeForm": "Creating ModelErrorScreen component"
    },
    {
      "content": "Test implementation with Playwright verification",
      "status": "pending",
      "activeForm": "Testing implementation with Playwright"
    }
  ]
}
Now let me integrate the model check into the app initialization flow in _layout.tsx:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/app/_layout.tsx",
  "old_string": "import { Stack, useRouter, useSegments } from 'expo-router';\nimport { StatusBar } from 'expo-status-bar';\nimport { useEffect } from 'react';\nimport { SafeAreaProvider } from 'react-native-safe-area-context';\nimport { useSageStore } from '../lib/storage/store';",
  "new_string": "import { Stack, useRouter, useSegments } from 'expo-router';\nimport { StatusBar } from 'expo-status-bar';\nimport { useEffect, useState, useCallback } from 'react';\nimport { SafeAreaProvider } from 'react-native-safe-area-context';\nimport { useSageStore } from '../lib/storage/store';\nimport { ModelErrorScreen } from '../components/ModelErrorScreen';\nimport type { ModelValidationResult } from '../lib/llm/model-validator';"
}

🔧 Tool: Edit
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/app/_layout.tsx",
  "old_string": "export default function RootLayout() {\n  const router = useRouter();\n  const segments = useSegments();\n\n  const initializeApp = useSageStore((state) => state.initialize);\n  const loadModel = useSageStore((state) => state.loadModel);\n  const isInitialized = useSageStore((state) => state.isInitialized);\n  const hasCompletedOnboarding = useSageStore(\n    (state) => state.preferences.hasCompletedOnboarding\n  );\n\n  useEffect(() => {\n    const runInit = async () => {\n      try {\n        console.log('[Sage] Initializing store...');\n        await initializeApp();\n        console.log('[Sage] Store initialized.');\n      } catch (e) {\n        console.error('Initialization failed', e);\n      }\n    };\n    void runInit();\n  }, [initializeApp]);",
  "new_string": "export default function RootLayout() {\n  const router = useRouter();\n  const segments = useSegments();\n\n  const initializeApp = useSageStore((state) => state.initialize);\n  const validateAndLoadModel = useSageStore((state) => state.validateAndLoadModel);\n  const isInitialized = useSageStore((state) => state.isInitialized);\n  const modelValidationStatus = useSageStore((state) => state.modelValidationStatus);\n  const modelValidationError = useSageStore((state) => state.modelValidationError);\n  const hasCompletedOnboarding = useSageStore(\n    (state) => state.preferences.hasCompletedOnboarding\n  );\n\n  const [isValidatingModel, setIsValidatingModel] = useState(true);\n  const [validationResult, setValidationResult] = useState<ModelValidationResult | null>(null);\n\n  const runModelValidation = useCallback(async () => {\n    setIsValidatingModel(true);\n    try {\n      console.log('[Sage] Running model validation...');\n      const result = await validateAndLoadModel();\n      setValidationResult(result);\n    } catch (e) {\n      console.error('[Sage] Model validation error:', e);\n      setValidationResult({\n        status: 'unknown',\n        error: `Validation error: ${e instanceof Error ? e.message : String(e)}`,\n      });\n    } finally {\n      setIsValidatingModel(false);\n    }\n  }, [validateAndLoadModel]);\n\n  useEffect(() => {\n    const runInit = async () => {\n      try {\n        console.log('[Sage] Initializing store...');\n        await initializeApp();\n        console.log('[Sage] Store initialized.');\n        // After store is initialized, validate the model\n        await runModelValidation();\n      } catch (e) {\n        console.error('Initialization failed', e);\n        setIsValidatingModel(false);\n      }\n    };\n    void runInit();\n  }, [initializeApp, runModelValidation]);"
}
Now let me update the return statement to show the ModelErrorScreen when validation fails:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/app/_layout.tsx",
  "old_string": "useEffect(() => {\n    if (!isInitialized) return;\n\n    const inOnboarding = segments[0] === 'onboarding';\n\n    if (!hasCompletedOnboarding && !inOnboarding) {\n      setTimeout(() => router.replace('/onboarding'), 0);\n      return;\n    }\n\n    if (hasCompletedOnboarding && inOnboarding) {\n      setTimeout(() => router.replace('/(tabs)'), 0);\n    }\n  }, [hasCompletedOnboarding, isInitialized, router, segments]);\n\n  return (\n    <SafeAreaProvider>\n      <StatusBar style=\"light\" />\n      <Stack\n        screenOptions={{\n          headerShown: false,\n          contentStyle: { backgroundColor: '#1a1a2e' },\n          animation: 'slide_from_right',\n        }}\n      >\n        <Stack.Screen name=\"(tabs)\" options={{ headerShown: false }} />\n        <Stack.Screen\n          name=\"onboarding\"\n          options={{ headerShown: false, presentation: 'fullScreenModal' }}\n        />\n      </Stack>\n    </SafeAreaProvider>\n  );\n}",
  "new_string": "useEffect(() => {\n    // Don't navigate until model validation is complete and successful\n    if (!isInitialized || isValidatingModel) return;\n    if (modelValidationStatus !== 'valid') return;\n\n    const inOnboarding = segments[0] === 'onboarding';\n\n    if (!hasCompletedOnboarding && !inOnboarding) {\n      setTimeout(() => router.replace('/onboarding'), 0);\n      return;\n    }\n\n    if (hasCompletedOnboarding && inOnboarding) {\n      setTimeout(() => router.replace('/(tabs)'), 0);\n    }\n  }, [hasCompletedOnboarding, isInitialized, isValidatingModel, modelValidationStatus, router, segments]);\n\n  // Show model error screen if validation failed\n  if (!isValidatingModel && validationResult && validationResult.status !== 'valid') {\n    return (\n      <SafeAreaProvider>\n        <StatusBar style=\"light\" />\n        <ModelErrorScreen\n          validationResult={validationResult}\n          onRetry={runModelValidation}\n        />\n      </SafeAreaProvider>\n    );\n  }\n\n  return (\n    <SafeAreaProvider>\n      <StatusBar style=\"light\" />\n      <Stack\n        screenOptions={{\n          headerShown: false,\n          contentStyle: { backgroundColor: '#1a1a2e' },\n          animation: 'slide_from_right',\n        }}\n      >\n        <Stack.Screen name=\"(tabs)\" options={{ headerShown: false }} />\n        <Stack.Screen\n          name=\"onboarding\"\n          options={{ headerShown: false, presentation: 'fullScreenModal' }}\n        />\n      </Stack>\n    </SafeAreaProvider>\n  );\n}"
}
Now let me read the updated file to make sure everything looks correct:

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/app/_layout.tsx"
}
There's an issue - the `modelValidationError` variable is declared but never used. Let me fix that by removing the unused variable since the error is accessed through the `validationResult`:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/app/_layout.tsx",
  "old_string": "const initializeApp = useSageStore((state) => state.initialize);\n  const validateAndLoadModel = useSageStore((state) => state.validateAndLoadModel);\n  const isInitialized = useSageStore((state) => state.isInitialized);\n  const modelValidationStatus = useSageStore((state) => state.modelValidationStatus);\n  const modelValidationError = useSageStore((state) => state.modelValidationError);\n  const hasCompletedOnboarding = useSageStore(",
  "new_string": "const initializeApp = useSageStore((state) => state.initialize);\n  const validateAndLoadModel = useSageStore((state) => state.validateAndLoadModel);\n  const isInitialized = useSageStore((state) => state.isInitialized);\n  const modelValidationStatus = useSageStore((state) => state.modelValidationStatus);\n  const hasCompletedOnboarding = useSageStore("
}

🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Create model validation utility in lib/llm/model-validator.ts",
      "status": "completed",
      "activeForm": "Creating model validation utility"
    },
    {
      "content": "Add model validation state to Zustand store",
      "status": "completed",
      "activeForm": "Adding model validation state to store"
    },
    {
      "content": "Integrate model check into app initialization flow in _layout.tsx",
      "status": "completed",
      "activeForm": "Integrating model check into app initialization"
    },
    {
      "content": "Create ModelErrorScreen component with troubleshooting steps",
      "status": "completed",
      "activeForm": "Creating ModelErrorScreen component"
    },
    {
      "content": "Test implementation with Playwright verification",
      "status": "in_progress",
      "activeForm": "Testing implementation with Playwright"
    }
  ]
}
Now let me check if Playwright is installed and create a verification test. First, let me check the package.json and any existing test setup:

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/package.json"
}
I see this is a React Native/Expo project that uses Jest for testing (not Playwright). Playwright is primarily for web testing, but this is a mobile app. The project uses `@testing-library/react-native` and `jest-expo`. Let me check the existing test setup to understand the patterns:

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/jest.config.js"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/components/journal/JournalEntryModal.test.tsx"
}
Let me look for any existing tests:

🔧 Tool: Glob
Input: {
  "pattern": "**/*.test.{ts,tsx}",
  "path": "/Users/vimo/Projects/OpenCode/Sage_AI"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/safety/crisis-detector.test.ts"
}
Since this is a React Native/Expo project (not a web project), Playwright won't work here. The project uses Jest with `@testing-library/react-native`. Let me create a proper Jest test file to verify the implementation:

🔧 Tool: Write
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/llm/model-validator.test.ts",
  "content": "/**\n * Model Validator Tests\n * Verification tests for the model validation feature\n */\n\nimport { getTroubleshootingSteps, type ModelValidationResult, type ModelValidationStatus } from './model-validator';\n\ndescribe('Model Validator', () => {\n  describe('getTroubleshootingSteps', () => {\n    it('should return appropriate steps for missing model', () => {\n      const result: ModelValidationResult = {\n        status: 'missing',\n        error: 'Model file not found',\n      };\n\n      const steps = getTroubleshootingSteps(result);\n\n      expect(steps.length).toBeGreaterThan(0);\n      expect(steps.some(step => step.includes('sage-model.gguf'))).toBe(true);\n      expect(steps.some(step => step.includes('assets/models'))).toBe(true);\n    });\n\n    it('should return appropriate steps for corrupted model', () => {\n      const result: ModelValidationResult = {\n        status: 'corrupted',\n        error: 'Invalid GGUF header',\n        fileSize: 1024,\n      };\n\n      const steps = getTroubleshootingSteps(result);\n\n      expect(steps.length).toBeGreaterThan(0);\n      expect(steps.some(step => step.toLowerCase().includes('download'))).toBe(true);\n      expect(steps.some(step => step.toLowerCase().includes('integrity') || step.toLowerCase().includes('checksum'))).toBe(true);\n    });\n\n    it('should return appropriate steps for unknown error', () => {\n      const result: ModelValidationResult = {\n        status: 'unknown',\n        error: 'Unexpected error occurred',\n      };\n\n      const steps = getTroubleshootingSteps(result);\n\n      expect(steps.length).toBeGreaterThan(0);\n      expect(steps.some(step => step.toLowerCase().includes('restart'))).toBe(true);\n    });\n\n    it('should return empty array for valid model', () => {\n      const result: ModelValidationResult = {\n        status: 'valid',\n        localUri: '/path/to/model',\n        fileSize: 1000000000,\n      };\n\n      const steps = getTroubleshootingSteps(result);\n\n      expect(steps).toEqual([]);\n    });\n  });\n\n  describe('ModelValidationStatus types', () => {\n    it('should have all expected status values', () => {\n      const statuses: ModelValidationStatus[] = ['valid', 'missing', 'corrupted', 'unknown'];\n\n      statuses.forEach(status => {\n        expect(['valid', 'missing', 'corrupted', 'unknown']).toContain(status);\n      });\n    });\n  });\n\n  describe('ModelValidationResult structure', () => {\n    it('should accept valid result with all optional fields', () => {\n      const result: ModelValidationResult = {\n        status: 'valid',\n        error: undefined,\n        localUri: '/path/to/model.gguf',\n        fileSize: 5000000000,\n      };\n\n      expect(result.status).toBe('valid');\n      expect(result.localUri).toBeDefined();\n      expect(result.fileSize).toBeGreaterThan(0);\n    });\n\n    it('should accept missing result with error', () => {\n      const result: ModelValidationResult = {\n        status: 'missing',\n        error: 'Model not found in bundle',\n      };\n\n      expect(result.status).toBe('missing');\n      expect(result.error).toBeDefined();\n    });\n\n    it('should accept corrupted result with size info', () => {\n      const result: ModelValidationResult = {\n        status: 'corrupted',\n        error: 'File too small',\n        localUri: '/path/to/corrupt.gguf',\n        fileSize: 100,\n      };\n\n      expect(result.status).toBe('corrupted');\n      expect(result.error).toBeDefined();\n      expect(result.fileSize).toBeLessThan(1024 * 1024);\n    });\n  });\n});\n"
}
Now let me also create a test for the ModelErrorScreen component:

🔧 Tool: Write
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/components/ModelErrorScreen.test.tsx",
  "content": "/**\n * ModelErrorScreen Tests\n * Verification tests for the model error screen component\n */\n\nimport React from 'react';\nimport { render, fireEvent } from '@testing-library/react-native';\nimport { ModelErrorScreen } from './ModelErrorScreen';\nimport type { ModelValidationResult } from '../lib/llm/model-validator';\n\n// Mock Linking\njest.mock('react-native', () => {\n  const RN = jest.requireActual('react-native');\n  return {\n    ...RN,\n    Linking: {\n      openURL: jest.fn(),\n    },\n  };\n});\n\ndescribe('ModelErrorScreen', () => {\n  const mockOnRetry = jest.fn();\n\n  beforeEach(() => {\n    mockOnRetry.mockClear();\n  });\n\n  describe('Missing Model State', () => {\n    const missingResult: ModelValidationResult = {\n      status: 'missing',\n      error: 'Model file not found in app bundle',\n    };\n\n    it('should render the error screen with missing model title', () => {\n      const { getByTestId, getByText } = render(\n        <ModelErrorScreen validationResult={missingResult} onRetry={mockOnRetry} />\n      );\n\n      expect(getByTestId('model-error-screen')).toBeTruthy();\n      expect(getByTestId('model-error-title').props.children).toBe('Model Not Found');\n    });\n\n    it('should display technical error details', () => {\n      const { getByTestId } = render(\n        <ModelErrorScreen validationResult={missingResult} onRetry={mockOnRetry} />\n      );\n\n      expect(getByTestId('model-error-details').props.children).toBe('Model file not found in app bundle');\n    });\n\n    it('should display troubleshooting steps', () => {\n      const { getByTestId } = render(\n        <ModelErrorScreen validationResult={missingResult} onRetry={mockOnRetry} />\n      );\n\n      // Should have at least one troubleshooting step\n      expect(getByTestId('troubleshooting-step-0')).toBeTruthy();\n    });\n\n    it('should call onRetry when retry button is pressed', () => {\n      const { getByTestId } = render(\n        <ModelErrorScreen validationResult={missingResult} onRetry={mockOnRetry} />\n      );\n\n      fireEvent.press(getByTestId('retry-button'));\n      expect(mockOnRetry).toHaveBeenCalledTimes(1);\n    });\n  });\n\n  describe('Corrupted Model State', () => {\n    const corruptedResult: ModelValidationResult = {\n      status: 'corrupted',\n      error: 'Invalid GGUF header signature',\n      localUri: '/path/to/model.gguf',\n      fileSize: 500,\n    };\n\n    it('should render with corrupted model title', () => {\n      const { getByTestId } = render(\n        <ModelErrorScreen validationResult={corruptedResult} onRetry={mockOnRetry} />\n      );\n\n      expect(getByTestId('model-error-title').props.children).toBe('Model Corrupted');\n    });\n\n    it('should display corruption-specific error message', () => {\n      const { getByTestId } = render(\n        <ModelErrorScreen validationResult={corruptedResult} onRetry={mockOnRetry} />\n      );\n\n      const description = getByTestId('model-error-description');\n      expect(description.props.children).toContain('damaged');\n    });\n  });\n\n  describe('Unknown Error State', () => {\n    const unknownResult: ModelValidationResult = {\n      status: 'unknown',\n      error: 'Unexpected filesystem error',\n    };\n\n    it('should render with generic error title', () => {\n      const { getByTestId } = render(\n        <ModelErrorScreen validationResult={unknownResult} onRetry={mockOnRetry} />\n      );\n\n      expect(getByTestId('model-error-title').props.children).toBe('Model Error');\n    });\n  });\n\n  describe('Retry Functionality', () => {\n    const missingResult: ModelValidationResult = {\n      status: 'missing',\n      error: 'Model not found',\n    };\n\n    it('should have a visible retry button', () => {\n      const { getByTestId } = render(\n        <ModelErrorScreen validationResult={missingResult} onRetry={mockOnRetry} />\n      );\n\n      const retryButton = getByTestId('retry-button');\n      expect(retryButton).toBeTruthy();\n    });\n\n    it('should have a report issue link', () => {\n      const { getByTestId } = render(\n        <ModelErrorScreen validationResult={missingResult} onRetry={mockOnRetry} />\n      );\n\n      const reportLink = getByTestId('report-issue-link');\n      expect(reportLink).toBeTruthy();\n    });\n  });\n});\n"
}
Now let me run the tests to verify the implementation:

🔧 Tool: Bash
Input: {
  "command": "npm test -- --testPathPattern=\"model-validator|ModelErrorScreen\" 2>&1",
  "description": "Run model validation tests",
  "timeout": 120000
}
The model validator tests passed. The ModelErrorScreen test has a mocking issue with React Native. Let me fix the component test:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/components/ModelErrorScreen.test.tsx",
  "old_string": "/**\n * ModelErrorScreen Tests\n * Verification tests for the model error screen component\n */\n\nimport React from 'react';\nimport { render, fireEvent } from '@testing-library/react-native';\nimport { ModelErrorScreen } from './ModelErrorScreen';\nimport type { ModelValidationResult } from '../lib/llm/model-validator';\n\n// Mock Linking\njest.mock('react-native', () => {\n  const RN = jest.requireActual('react-native');\n  return {\n    ...RN,\n    Linking: {\n      openURL: jest.fn(),\n    },\n  };\n});",
  "new_string": "/**\n * ModelErrorScreen Tests\n * Verification tests for the model error screen component\n */\n\nimport React from 'react';\nimport { render, fireEvent } from '@testing-library/react-native';\nimport { Linking } from 'react-native';\nimport { ModelErrorScreen } from './ModelErrorScreen';\nimport type { ModelValidationResult } from '../lib/llm/model-validator';\n\n// Mock Linking.openURL\njest.spyOn(Linking, 'openURL').mockImplementation(() => Promise.resolve(true));"
}

🔧 Tool: Bash
Input: {
  "command": "npm test -- --testPathPattern=\"model-validator|ModelErrorScreen\" 2>&1",
  "description": "Re-run model validation tests",
  "timeout": 120000
}
All tests pass. Now let me also run the type checker to ensure there are no TypeScript errors:

🔧 Tool: Bash
Input: {
  "command": "npm run typecheck 2>&1",
  "description": "Run TypeScript type checker",
  "timeout": 120000
}
There are some pre-existing TypeScript errors in other files (`app/ask.tsx` and scripts). These are not related to my changes. Let me verify that only my new files compile correctly:

🔧 Tool: Bash
Input: {
  "command": "npx tsc --noEmit lib/llm/model-validator.ts components/ModelErrorScreen.tsx 2>&1 || echo \"Trying with specific paths...\"",
  "description": "Check TypeScript for new files",
  "timeout": 60000
}
The errors are from the node_modules type conflicts (a common React Native issue), not from my code. Let me verify my changes compile correctly by running the full typecheck:

🔧 Tool: Bash
Input: {
  "command": "npm run typecheck 2>&1 | grep -E \"(lib/llm/model-validator|components/ModelErrorScreen|app/_layout)\" || echo \"No errors in our files\"",
  "description": "Check TypeScript errors only in new files",
  "timeout": 120000
}
My code has no TypeScript errors. The existing errors in `app/ask.tsx` are pre-existing issues in the codebase. 

Now let me clean up the test files as requested (since these were verification tests):

🔧 Tool: Bash
Input: {
  "command": "rm /Users/vimo/Projects/OpenCode/Sage_AI/lib/llm/model-validator.test.ts /Users/vimo/Projects/OpenCode/Sage_AI/components/ModelErrorScreen.test.tsx 2>&1 && echo \"Test files removed successfully\"",
  "description": "Remove temporary verification test files"
}

🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Create model validation utility in lib/llm/model-validator.ts",
      "status": "completed",
      "activeForm": "Creating model validation utility"
    },
    {
      "content": "Add model validation state to Zustand store",
      "status": "completed",
      "activeForm": "Adding model validation state to store"
    },
    {
      "content": "Integrate model check into app initialization flow in _layout.tsx",
      "status": "completed",
      "activeForm": "Integrating model check into app initialization"
    },
    {
      "content": "Create ModelErrorScreen component with troubleshooting steps",
      "status": "completed",
      "activeForm": "Creating ModelErrorScreen component"
    },
    {
      "content": "Test implementation with Jest verification",
      "status": "completed",
      "activeForm": "Testing implementation with Jest"
    }
  ]
}
Let me verify all files are in place and read them to ensure they're correct:

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/llm/model-validator.ts"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/storage/store.ts"
}
I notice a new method `isVerseSaved` was added by a linter or another process. That's fine - it's unrelated to my changes.

Let me read the final _layout.tsx to verify everything is correct:

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/app/_layout.tsx"
}
All files look correct. Let me also read the ModelErrorScreen to confirm it's properly implemented:

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/components/ModelErrorScreen.tsx"
}
All the implementation is complete. Let me run a final verification to ensure everything compiles and tests pass:

🔧 Tool: Bash
Input: {
  "command": "npm run test -- --testPathIgnorePatterns='node_modules' --passWithNoTests 2>&1 | tail -20",
  "description": "Run all tests",
  "timeout": 120000
}
All existing tests pass. The implementation is complete and verified.

<summary>
## Summary: Check if sage-model.gguf exists and is valid on app startup

### Changes Implemented
- Created a comprehensive model validation system that checks for the existence and validity of the sage-model.gguf file on app startup
- Implemented GGUF header magic byte validation to detect corrupted files
- Added file size validation to catch truncated or incomplete downloads
- Created a user-friendly error screen with troubleshooting steps when the model is missing or corrupted
- Added a "Try Again" retry button for users to re-attempt model validation

### Files Modified
- **lib/llm/model-validator.ts** (NEW) - Model validation utility that:
  - Validates model asset can be resolved from the bundle
  - Checks file exists at local URI
  - Validates file size (minimum 1MB)
  - Validates GGUF magic header bytes
  - Provides context-specific troubleshooting steps

- **lib/storage/store.ts** (MODIFIED) - Added to Zustand store:
  - `modelValidationStatus`: Tracks validation state ('valid', 'missing', 'corrupted', 'unknown')
  - `modelValidationError`: Stores error message for display
  - `validateAndLoadModel()`: New method that validates then loads the model

- **app/_layout.tsx** (MODIFIED) - Updated initialization flow:
  - Runs model validation after store initialization
  - Blocks navigation until model validation completes
  - Displays ModelErrorScreen if validation fails
  - Provides retry functionality

- **components/ModelErrorScreen.tsx** (NEW) - Error display component featuring:
  - Status-specific titles and descriptions
  - Technical error details in a styled box
  - Numbered troubleshooting steps
  - "Report an Issue" link
  - "Try Again" button with retry callback

### Verification Status
- All unit tests for model-validator.ts passed (8 tests for getTroubleshootingSteps and type validation)
- All component tests for ModelErrorScreen.tsx passed (9 tests for rendering, user interactions, and different error states)
- No TypeScript errors in new files (existing errors in app/ask.tsx are pre-existing)
- Test files were deleted after verification as requested

### Notes for Developer
- The minimum model size is set to 1MB as a sanity check - adjust `MIN_MODEL_SIZE_BYTES` if your model has a known expected size
- GGUF magic bytes validation checks for the standard 'GGUF' header (0x47, 0x47, 0x55, 0x46)
- The error screen matches the app's existing dark theme design system
- The retry button allows users to re-attempt validation without restarting the app
- The implementation preserves the existing `loadModel()` method for backward compatibility
</summary>