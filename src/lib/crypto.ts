// Web Crypto API based AES-GCM encryption for user API Keys

const ALGORITHM = 'AES-GCM';
const PBKDF2_ITERATIONS = 100000;
const DEVICE_SALT_KEY = 'istiqomah_device_entropy';

function getOrCreateDeviceEntropy(): string {
  let entropy = localStorage.getItem(DEVICE_SALT_KEY);
  if (!entropy) {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    entropy = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    localStorage.setItem(DEVICE_SALT_KEY, entropy);
  }
  return entropy;
}

async function deriveKey(salt: Uint8Array): Promise<CryptoKey> {
  const deviceEntropy = getOrCreateDeviceEntropy();
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(deviceEntropy),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt as unknown as BufferSource,
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: ALGORITHM, length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

function arrayBufferToBase64(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function base64ToArrayBuffer(base64: string): Uint8Array {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

export async function encryptApiKey(plainText: string): Promise<{ encrypted: string; salt: string; iv: string }> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(salt);

  const encoder = new TextEncoder();
  const encoded = encoder.encode(plainText);

  const encryptedBuffer = await crypto.subtle.encrypt(
    {
      name: ALGORITHM,
      iv: iv as unknown as BufferSource,
    },
    key,
    encoded
  );

  return {
    encrypted: arrayBufferToBase64(encryptedBuffer),
    salt: arrayBufferToBase64(salt),
    iv: arrayBufferToBase64(iv),
  };
}

export async function decryptApiKey(encryptedBase64: string, saltBase64: string, ivBase64: string): Promise<string> {
  const salt = base64ToArrayBuffer(saltBase64);
  const iv = base64ToArrayBuffer(ivBase64);
  const encrypted = base64ToArrayBuffer(encryptedBase64);

  const key = await deriveKey(salt);

  const decryptedBuffer = await crypto.subtle.decrypt(
    {
      name: ALGORITHM,
      iv: iv as unknown as BufferSource,
    },
    key,
    encrypted as unknown as BufferSource
  );

  const decoder = new TextDecoder();
  return decoder.decode(decryptedBuffer);
}
