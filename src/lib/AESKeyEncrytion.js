import CryptoJS from "crypto-js";
import { getSecret } from "./getSecret";

/**
 * Encrypt AES key using wallet-derived secret (CryptoJS style)
 */
export async function encryptAESKeyWithSecret(wallet, aesKey) {
  const secret = await getSecret(wallet);

  // Convert secret to string (CryptoJS expects string/passphrase)
  const secretString = CryptoJS.enc.Hex.stringify(
    CryptoJS.lib.WordArray.create(secret)
  );

  // Encrypt AES key (as string)
  const encryptedAESKey = CryptoJS.AES.encrypt(
    aesKey,
    secretString
  ).toString();

  return encryptedAESKey; // string (safe to store)
}
