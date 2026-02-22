import * as x25519 from "@stablelib/x25519";

/**
 * MAIN ENTRY: derive deterministic shared secret
 */
export async function getSecret(wallet) {
  const seed64 = await deriveDeterministicSeed(wallet);
  const { privateKey, publicKey } = deriveX25519Keypair(seed64);
  const secret = generateSharedSecret(privateKey, publicKey);
  return secret; // Uint8Array(32)
}

/**
 * Step 1: deterministic seed from wallet signature
 */
async function deriveDeterministicSeed(wallet) {

  const message = new TextEncoder().encode(
    `Derive encryption key for decentralized storage v1 ${wallet.publicKey.toString()}`
  );

  const signature = await wallet.signMessage(message); // Uint8Array

  const hashBuffer = await crypto.subtle.digest(
    "SHA-512",
    signature
  );

  return new Uint8Array(hashBuffer); // 64 bytes
}

/**
 * Step 2: derive deterministic X25519 keypair
 */
function deriveX25519Keypair(seed64) {
  if (!(seed64 instanceof Uint8Array) || seed64.length !== 64) {
    throw new Error("Seed must be 64 bytes");
  }

  const privateKey = seed64.slice(0, 32); // Uint8Array(32)
  const publicKey = x25519.scalarMultBase(privateKey);

  return { privateKey, publicKey };
}

/**
 * Step 3: ECDH shared secret
 */
function generateSharedSecret(privateKey, publicKey) {
  return x25519.scalarMult(privateKey, publicKey); // Uint8Array(32)
}
