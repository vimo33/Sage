import * as FileSystem from 'expo-file-system';
import { Platform, PermissionsAndroid } from 'react-native';

export type ModelValidationStatus = 'valid' | 'missing' | 'corrupted' | 'unknown';

export interface ModelValidationResult {
  status: ModelValidationStatus;
  error?: string;
  localUri?: string;
  fileSize?: number;
}

// Minimum expected size for a valid GGUF model (1MB minimum as sanity check)
const MIN_MODEL_SIZE_BYTES = 1 * 1024 * 1024;

// GGUF magic number header bytes (first 4 bytes should be 'GGUF' or its LE equivalent)
const GGUF_MAGIC_BYTES = [0x47, 0x47, 0x55, 0x46]; // 'GGUF' in ASCII

// Model file name
const MODEL_FILENAME = 'sage-model.gguf';

// External storage paths where user might place the model
const EXTERNAL_MODEL_PATHS = Platform.OS === 'android' ? [
  '/storage/emulated/0/Download/sage-model.gguf',
  '/sdcard/Download/sage-model.gguf',
] : [];

/**
 * Get the expected local path for the model file
 */
export function getModelLocalPath(): string {
  return `${FileSystem.documentDirectory}models/${MODEL_FILENAME}`;
}

/**
 * Request storage permission for Android
 */
async function requestStoragePermission(): Promise<boolean> {
  if (Platform.OS !== 'android') return true;

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'Sage needs access to your storage to load the AI model.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn('[Sage] Storage permission error:', err);
    return false;
  }
}

/**
 * Check if model exists in external storage and copy it to internal storage
 * Returns the internal storage path if successful
 */
async function findAndCopyModelFromExternalStorage(): Promise<string | null> {
  // Request permission first
  const hasPermission = await requestStoragePermission();
  if (!hasPermission) {
    console.log('[Sage] Storage permission denied');
  }

  for (const path of EXTERNAL_MODEL_PATHS) {
    try {
      const sourceUri = `file://${path}`;
      const info = await FileSystem.getInfoAsync(sourceUri);
      if (info.exists && (info.size ?? 0) > MIN_MODEL_SIZE_BYTES) {
        console.log('[Sage] Found model in external storage:', sourceUri);

        // Copy to internal storage so llama.rn can access it
        const targetDir = getModelsDirectory();
        const targetPath = getModelLocalPath();

        // Ensure directory exists
        const dirInfo = await FileSystem.getInfoAsync(targetDir);
        if (!dirInfo.exists) {
          await FileSystem.makeDirectoryAsync(targetDir, { intermediates: true });
        }

        // Check if already copied
        const existingFile = await FileSystem.getInfoAsync(targetPath);
        if (existingFile.exists && (existingFile.size ?? 0) > MIN_MODEL_SIZE_BYTES) {
          console.log('[Sage] Model already exists in internal storage');
          return targetPath;
        }

        console.log('[Sage] Copying model from external to internal storage...');
        console.log('[Sage] This may take a while for 869MB file...');

        await FileSystem.copyAsync({
          from: sourceUri,
          to: targetPath,
        });

        console.log('[Sage] Model copied successfully to:', targetPath);
        return targetPath;
      }
    } catch (e) {
      console.log('[Sage] Error accessing external storage path:', path, e);
      // Path not accessible, try next
    }
  }
  return null;
}

/**
 * Get the models directory path
 */
export function getModelsDirectory(): string {
  return `${FileSystem.documentDirectory}models`;
}

/**
 * Import a model file from a given URI (e.g., from file picker)
 */
export async function importModelFromUri(sourceUri: string): Promise<ModelValidationResult> {
  try {
    console.log('[Sage] Importing model from:', sourceUri);

    const modelsDir = getModelsDirectory();
    const targetPath = getModelLocalPath();

    // Ensure models directory exists
    const dirInfo = await FileSystem.getInfoAsync(modelsDir);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(modelsDir, { intermediates: true });
    }

    // Copy the file
    console.log('[Sage] Copying model to:', targetPath);
    await FileSystem.copyAsync({
      from: sourceUri,
      to: targetPath,
    });

    console.log('[Sage] Model copied, validating...');

    // Validate the imported model
    return await validateModel();
  } catch (error) {
    console.error('[Sage] Failed to import model:', error);
    return {
      status: 'unknown',
      error: `Failed to import model: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

/**
 * Validates that the sage-model.gguf exists and appears to be a valid GGUF file.
 * The model is NOT bundled with the app due to size (869MB).
 * It should be downloaded to the device's documents directory.
 */
export async function validateModel(): Promise<ModelValidationResult> {
  try {
    console.log('[Sage] Starting model validation...');

    // On web platform, skip model validation as native modules aren't available
    if (Platform.OS === 'web') {
      console.log('[Sage] Web platform detected - skipping model validation');
      return {
        status: 'valid',
        localUri: 'web-mock-path',
      };
    }

    // Check for model in documents directory (user-downloaded location)
    let localUri = getModelLocalPath();
    console.log('[Sage] Checking for model at:', localUri);

    // Step 3: Check file exists and get info
    let fileInfo = await FileSystem.getInfoAsync(localUri);

    // If not found in documents, check external storage (Downloads folder) and copy it
    if (!fileInfo.exists && Platform.OS === 'android') {
      console.log('[Sage] Model not in documents, checking external storage...');
      const copiedPath = await findAndCopyModelFromExternalStorage();
      if (copiedPath) {
        localUri = copiedPath;
        fileInfo = await FileSystem.getInfoAsync(localUri);
        console.log('[Sage] Using model from internal storage:', localUri);
      }
    }

    if (!fileInfo.exists) {
      return {
        status: 'missing',
        error: 'Model file does not exist at expected location.',
        localUri,
      };
    }

    const fileSize = fileInfo.size ?? 0;
    console.log('[Sage] Model file size:', fileSize, 'bytes');

    // Step 4: Validate file size
    if (fileSize < MIN_MODEL_SIZE_BYTES) {
      return {
        status: 'corrupted',
        error: `Model file appears to be corrupted or incomplete. Size: ${formatFileSize(fileSize)} (expected at least ${formatFileSize(MIN_MODEL_SIZE_BYTES)})`,
        localUri,
        fileSize,
      };
    }

    // Step 5: Validate GGUF header magic bytes
    const isValidHeader = await validateGgufHeader(localUri);
    if (!isValidHeader) {
      return {
        status: 'corrupted',
        error: 'Model file does not have a valid GGUF header. The file may be corrupted or is not a valid GGUF model.',
        localUri,
        fileSize,
      };
    }

    console.log('[Sage] Model validation successful');
    return {
      status: 'valid',
      localUri,
      fileSize,
    };
  } catch (error) {
    console.error('[Sage] Model validation failed with unexpected error:', error);
    return {
      status: 'unknown',
      error: `Unexpected error during model validation: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

/**
 * Reads the first 4 bytes of the file to check for GGUF magic number
 */
async function validateGgufHeader(fileUri: string): Promise<boolean> {
  try {
    // Read first 4 bytes as base64
    const headerContent = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
      length: 4,
      position: 0,
    });

    // Convert base64 to bytes
    const bytes = base64ToBytes(headerContent);

    if (bytes.length < 4) {
      return false;
    }

    // Check if first 4 bytes match GGUF magic
    for (let i = 0; i < 4; i++) {
      if (bytes[i] !== GGUF_MAGIC_BYTES[i]) {
        console.log('[Sage] GGUF header mismatch at byte', i, '- expected', GGUF_MAGIC_BYTES[i], 'got', bytes[i]);
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('[Sage] Failed to read GGUF header:', error);
    return false;
  }
}

/**
 * Convert base64 string to byte array
 */
function base64ToBytes(base64: string): number[] {
  const binaryString = atob(base64);
  const bytes: number[] = [];
  for (let i = 0; i < binaryString.length; i++) {
    bytes.push(binaryString.charCodeAt(i));
  }
  return bytes;
}

/**
 * Format file size for human-readable display
 */
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

/**
 * Get troubleshooting steps based on the validation status
 */
export function getTroubleshootingSteps(result: ModelValidationResult): string[] {
  const steps: string[] = [];

  switch (result.status) {
    case 'missing':
      steps.push('The AI model (869MB) needs to be downloaded separately');
      steps.push('A future update will add in-app model download');
      steps.push('For now, the app works without AI responses');
      steps.push('Other features like journaling are still available');
      break;

    case 'corrupted':
      steps.push('Re-download the sage-model.gguf file');
      steps.push('Verify the file integrity using checksum if available');
      steps.push('Ensure the download completed fully without interruption');
      steps.push('Clear app cache and try again');
      break;

    case 'unknown':
      steps.push('Restart the application and try again');
      steps.push('Check device storage is not full');
      steps.push('Clear app data and reinstall if the problem persists');
      steps.push('Contact support if the issue continues');
      break;

    default:
      break;
  }

  return steps;
}
