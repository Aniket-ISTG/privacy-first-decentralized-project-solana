import JSZip from "jszip";
import CryptoJS from "crypto-js";

/**
 * Decrypt encrypted ZIP blob using AES key and unzip files
 */
export async function getDecryptedUnzippedData(encryptedBlob, aesKey) {
  // 1️⃣ Read encrypted blob as text
  const encryptedText = await encryptedBlob.text();

  // 2️⃣ Decrypt using AES key
  const decryptedWordArray = CryptoJS.AES.decrypt(
    encryptedText,
    aesKey
  );

  // 3️⃣ Convert WordArray → Uint8Array
  const decryptedUint8Array = new Uint8Array(
    decryptedWordArray.sigBytes
  );

  for (let i = 0; i < decryptedWordArray.sigBytes; i++) {
    decryptedUint8Array[i] =
      (decryptedWordArray.words[Math.floor(i / 4)] >>
        (24 - (i % 4) * 8)) &
      0xff;
  }

  // 4️⃣ Load ZIP
  const zip = await JSZip.loadAsync(decryptedUint8Array);

  // 5️⃣ Extract files
  const files = {};
  for (const name of Object.keys(zip.files)) {
    files[name] = await zip.files[name].async("blob");
  }

  return files; // { "folder/file.txt": Blob, ... }
}
