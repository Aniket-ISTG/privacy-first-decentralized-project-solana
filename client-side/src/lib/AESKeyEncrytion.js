import CryptoJS from "crypto-js";
import { getSecret } from "./getSecret";

/**
 * Encrypt AES key using wallet-derived secret (CryptoJS style)
 */
export async function encryptAESKeyWithSecret(wallet, aesKey) {

  // Encrypt AES key (as string)
  const secret = await getSecret(wallet);
  const secretString = CryptoJS.enc.Hex.stringify(
      CryptoJS.lib.WordArray.create(secret)
    );
  console.log("secret from download", secret);
  console.log("aesKey from download", aesKey);

  const encryptedAESKey = CryptoJS.AES.encrypt(
    aesKey,
    secretString
  ).toString();

  console.log("encryptedAESKey from download", encryptedAESKey);

  return encryptedAESKey; // string (safe to store)
}
