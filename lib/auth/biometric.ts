import * as LocalAuthentication from 'expo-local-authentication';

export type BiometricType = 'fingerprint' | 'facial' | 'iris' | 'none';

export interface BiometricSupportResult {
  isSupported: boolean;
  biometricType: BiometricType;
  isEnrolled: boolean;
}

/**
 * Check if biometric authentication is available and what type
 */
export async function checkBiometricSupport(): Promise<BiometricSupportResult> {
  try {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
      return { isSupported: false, biometricType: 'none', isEnrolled: false };
    }

    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();

    let biometricType: BiometricType = 'none';
    if (supportedTypes.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
      biometricType = 'facial';
    } else if (supportedTypes.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
      biometricType = 'fingerprint';
    } else if (supportedTypes.includes(LocalAuthentication.AuthenticationType.IRIS)) {
      biometricType = 'iris';
    }

    return {
      isSupported: true,
      biometricType,
      isEnrolled,
    };
  } catch {
    return { isSupported: false, biometricType: 'none', isEnrolled: false };
  }
}

/**
 * Get human-readable name for biometric type
 */
export function getBiometricTypeName(type: BiometricType): string {
  switch (type) {
    case 'facial':
      return 'Face ID';
    case 'fingerprint':
      return 'Touch ID';
    case 'iris':
      return 'Iris';
    default:
      return 'Biometric';
  }
}

/**
 * Get icon for biometric type
 */
export function getBiometricIcon(type: BiometricType): string {
  switch (type) {
    case 'facial':
      return '(face)'; // Face scan icon placeholder
    case 'fingerprint':
      return '(touch)'; // Fingerprint icon placeholder
    case 'iris':
      return '(eye)'; // Eye icon placeholder
    default:
      return '(lock)';
  }
}

export interface AuthenticateOptions {
  promptMessage?: string;
  cancelLabel?: string;
  fallbackLabel?: string;
  disableDeviceFallback?: boolean;
}

export interface AuthenticateResult {
  success: boolean;
  error?: string;
  warning?: string;
}

/**
 * Authenticate the user using biometrics
 */
export async function authenticateWithBiometric(
  options: AuthenticateOptions = {}
): Promise<AuthenticateResult> {
  const {
    promptMessage = 'Authenticate to access your private content',
    cancelLabel = 'Cancel',
    fallbackLabel = 'Use Passcode',
    disableDeviceFallback = false,
  } = options;

  try {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage,
      cancelLabel,
      fallbackLabel,
      disableDeviceFallback,
    });

    if (result.success) {
      return { success: true };
    }

    // Handle different error cases
    if (result.error === 'user_cancel') {
      return { success: false, error: 'Authentication cancelled' };
    }
    if (result.error === 'user_fallback') {
      return { success: false, warning: 'User chose fallback authentication' };
    }
    if (result.error === 'lockout') {
      return { success: false, error: 'Too many failed attempts. Try again later.' };
    }
    if (result.error === 'not_enrolled') {
      return { success: false, error: 'No biometric enrolled on this device' };
    }

    return { success: false, error: result.error || 'Authentication failed' };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Authentication error',
    };
  }
}

/**
 * Check the security level of the authentication
 */
export async function getSecurityLevel(): Promise<LocalAuthentication.SecurityLevel> {
  return LocalAuthentication.getEnrolledLevelAsync();
}
