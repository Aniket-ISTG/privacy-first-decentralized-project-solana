import JSZip from "jszip";
import CryptoJS from "crypto-js";

export async function getDecryptedUnzippedData(encryptedBlob, aesKey) {
  // 1️⃣ Read encrypted blob as text (Base64)
  const encryptedBase64 = await encryptedBlob.text();

  // 2️⃣ Decrypt → WordArray
  const decryptedWordArray = CryptoJS.AES.decrypt(
    encryptedBase64,
    aesKey
  );

  if (decryptedWordArray.sigBytes <= 0) {
    throw new Error("Decryption failed (wrong AES key)");
  }

  // 3️⃣ Convert WordArray → Uint8Array (ZIP binary)
  const decryptedBytes = new Uint8Array(decryptedWordArray.sigBytes);
  for (let i = 0; i < decryptedWordArray.sigBytes; i++) {
    decryptedBytes[i] =
      (decryptedWordArray.words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
  }

  // 4️⃣ Load ZIP
  const zip = await JSZip.loadAsync(decryptedBytes);

  // 5️⃣ Extract files
  const files = {};
  for (const name of Object.keys(zip.files)) {
    files[name] = await zip.files[name].async("blob");
  }

  return files; // { "folder/file.txt": Blob }
}