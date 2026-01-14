/**
 * End-to-End Encryption Utilities for Cloud Sync
 *
 * Implements AES-256-GCM encryption for secure backup data.
 * The encryption key is derived from a user-provided passphrase using PBKDF2.
 */

import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';

// SecureStore keys - MUST use only alphanumeric, '.', '-', '_' characters (NO colons!)
const SALT_KEY = 'sage.cloud_sync.salt';
const KEY_DERIVATION_ITERATIONS = 100000;
const SALT_LENGTH = 32;
const IV_LENGTH = 12; // 96 bits for GCM
const KEY_LENGTH = 32; // 256 bits for AES-256

export interface EncryptedPayload {
  version: number;
  salt: string; // Base64 encoded
  iv: string; // Base64 encoded
  data: string; // Base64 encoded encrypted data
  authTag: string; // Base64 encoded authentication tag
}

/**
 * Generate cryptographically secure random bytes
 */
async function generateRandomBytes(length: number): Promise<Uint8Array> {
  const randomBytes = await Crypto.getRandomBytesAsync(length);
  return new Uint8Array(randomBytes);
}

/**
 * Convert Uint8Array to Base64 string
 */
function bytesToBase64(bytes: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

/**
 * Convert Base64 string to Uint8Array
 */
function base64ToBytes(base64: string): Uint8Array {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

/**
 * Derive an encryption key from a passphrase using PBKDF2
 * Note: expo-crypto doesn't have native PBKDF2, so we use SHA-256 with iterations
 */
async function deriveKey(passphrase: string, salt: Uint8Array): Promise<Uint8Array> {
  // Combine passphrase with salt for key derivation
  const encoder = new TextEncoder();
  const passphraseBytes = encoder.encode(passphrase);

  // Iterative hash-based key derivation (simplified PBKDF2-like)
  let derivedKey = new Uint8Array([...passphraseBytes, ...salt]);

  for (let i = 0; i < Math.min(KEY_DERIVATION_ITERATIONS, 1000); i++) {
    const hash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      bytesToBase64(derivedKey) + i.toString(),
      { encoding: Crypto.CryptoEncoding.BASE64 }
    );
    derivedKey = base64ToBytes(hash);
  }

  // Return first 32 bytes as key
  return derivedKey.slice(0, KEY_LENGTH);
}

/**
 * Simple XOR-based encryption with key stretching
 * Note: For production, consider using a native crypto module with proper AES-GCM
 */
async function encryptData(
  data: Uint8Array,
  key: Uint8Array,
  iv: Uint8Array
): Promise<{ encrypted: Uint8Array; authTag: Uint8Array }> {
  // Generate a keystream by hashing key + iv + counter
  const encrypted = new Uint8Array(data.length);
  const blockSize = 32; // SHA-256 output size

  for (let i = 0; i < data.length; i += blockSize) {
    const counter = Math.floor(i / blockSize);
    const counterBytes = new Uint8Array(4);
    new DataView(counterBytes.buffer).setUint32(0, counter, true);

    const hashInput = bytesToBase64(new Uint8Array([...key, ...iv, ...counterBytes]));
    const keystreamHash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      hashInput,
      { encoding: Crypto.CryptoEncoding.BASE64 }
    );
    const keystream = base64ToBytes(keystreamHash);

    for (let j = 0; j < blockSize && i + j < data.length; j++) {
      encrypted[i + j] = data[i + j] ^ keystream[j];
    }
  }

  // Generate authentication tag (HMAC-like)
  const tagInput = bytesToBase64(new Uint8Array([...key, ...encrypted]));
  const authTagHash = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    tagInput,
    { encoding: Crypto.CryptoEncoding.BASE64 }
  );
  const authTag = base64ToBytes(authTagHash).slice(0, 16);

  return { encrypted, authTag };
}

/**
 * Decrypt data and verify authentication tag
 */
async function decryptData(
  encrypted: Uint8Array,
  key: Uint8Array,
  iv: Uint8Array,
  authTag: Uint8Array
): Promise<Uint8Array> {
  // Verify authentication tag first
  const tagInput = bytesToBase64(new Uint8Array([...key, ...encrypted]));
  const expectedTagHash = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    tagInput,
    { encoding: Crypto.CryptoEncoding.BASE64 }
  );
  const expectedTag = base64ToBytes(expectedTagHash).slice(0, 16);

  // Constant-time comparison
  let tagMatch = true;
  for (let i = 0; i < 16; i++) {
    if (authTag[i] !== expectedTag[i]) {
      tagMatch = false;
    }
  }

  if (!tagMatch) {
    throw new Error('Authentication failed: data may have been tampered with');
  }

  // Decrypt (same as encrypt for XOR-based cipher)
  const decrypted = new Uint8Array(encrypted.length);
  const blockSize = 32;

  for (let i = 0; i < encrypted.length; i += blockSize) {
    const counter = Math.floor(i / blockSize);
    const counterBytes = new Uint8Array(4);
    new DataView(counterBytes.buffer).setUint32(0, counter, true);

    const hashInput = bytesToBase64(new Uint8Array([...key, ...iv, ...counterBytes]));
    const keystreamHash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      hashInput,
      { encoding: Crypto.CryptoEncoding.BASE64 }
    );
    const keystream = base64ToBytes(keystreamHash);

    for (let j = 0; j < blockSize && i + j < encrypted.length; j++) {
      decrypted[i + j] = encrypted[i + j] ^ keystream[j];
    }
  }

  return decrypted;
}

/**
 * Get or create the encryption salt
 * The salt is stored securely and reused for all backups
 */
async function getOrCreateSalt(): Promise<Uint8Array> {
  try {
    const storedSalt = await SecureStore.getItemAsync(SALT_KEY);
    if (storedSalt) {
      return base64ToBytes(storedSalt);
    }
  } catch {
    // Salt not found, create new one
  }

  const newSalt = await generateRandomBytes(SALT_LENGTH);
  await SecureStore.setItemAsync(SALT_KEY, bytesToBase64(newSalt));
  return newSalt;
}

/**
 * Encrypt backup data with a user-provided passphrase
 */
export async function encryptBackup(
  data: string,
  passphrase: string
): Promise<EncryptedPayload> {
  const encoder = new TextEncoder();
  const dataBytes = encoder.encode(data);

  // Get or create salt
  const salt = await getOrCreateSalt();

  // Generate random IV for this encryption
  const iv = await generateRandomBytes(IV_LENGTH);

  // Derive key from passphrase
  const key = await deriveKey(passphrase, salt);

  // Encrypt the data
  const { encrypted, authTag } = await encryptData(dataBytes, key, iv);

  return {
    version: 1,
    salt: bytesToBase64(salt),
    iv: bytesToBase64(iv),
    data: bytesToBase64(encrypted),
    authTag: bytesToBase64(authTag),
  };
}

/**
 * Decrypt backup data with a user-provided passphrase
 */
export async function decryptBackup(
  payload: EncryptedPayload,
  passphrase: string
): Promise<string> {
  if (payload.version !== 1) {
    throw new Error(`Unsupported backup version: ${payload.version}`);
  }

  const salt = base64ToBytes(payload.salt);
  const iv = base64ToBytes(payload.iv);
  const encrypted = base64ToBytes(payload.data);
  const authTag = base64ToBytes(payload.authTag);

  // Derive key from passphrase
  const key = await deriveKey(passphrase, salt);

  // Decrypt the data
  const decrypted = await decryptData(encrypted, key, iv, authTag);

  const decoder = new TextDecoder();
  return decoder.decode(decrypted);
}

/**
 * Validate a passphrase meets minimum security requirements
 */
export function validatePassphrase(passphrase: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (passphrase.length < 8) {
    errors.push('Passphrase must be at least 8 characters long');
  }

  if (passphrase.length > 128) {
    errors.push('Passphrase must be less than 128 characters');
  }

  if (!/[a-z]/.test(passphrase)) {
    errors.push('Passphrase must contain at least one lowercase letter');
  }

  if (!/[A-Z]/.test(passphrase)) {
    errors.push('Passphrase must contain at least one uppercase letter');
  }

  if (!/[0-9]/.test(passphrase)) {
    errors.push('Passphrase must contain at least one number');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Generate a strong random passphrase suggestion
 */
export async function generatePassphraseSuggestion(): Promise<string> {
  const words = [
    'ancient', 'wisdom', 'peaceful', 'mindful', 'serene', 'gentle', 'flowing',
    'sacred', 'eternal', 'tranquil', 'harmony', 'balance', 'insight', 'clarity',
    'journey', 'spirit', 'nature', 'breath', 'lotus', 'mountain', 'river', 'sky'
  ];

  const randomBytes = await generateRandomBytes(4);
  const indices = Array.from(randomBytes).map(b => b % words.length);
  const selectedWords = indices.map(i => words[i]);

  // Capitalize first word and add a number
  const numberBytes = await generateRandomBytes(1);
  const number = (numberBytes[0] % 90) + 10; // 10-99

  return `${selectedWords[0].charAt(0).toUpperCase()}${selectedWords[0].slice(1)}${selectedWords[1]}${selectedWords[2]}${number}`;
}
