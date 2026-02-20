import CryptoJS from "crypto-js";
import { getSecret } from "./getSecret";

/**
 * Decrypt AES key using wallet-derived secret
 */
export async function decryptAESKeyWithSecret(wallet, encryptedAESKey) {
  const secret = await getSecret(wallet);

  const secretString = CryptoJS.enc.Hex.stringify(
    CryptoJS.lib.WordArray.create(secret)
  );

  const decrypted = CryptoJS.AES.decrypt(
    encryptedAESKey,
    secretString
  );

  return decrypted.toString(CryptoJS.enc.Utf8); // original AES key
}
