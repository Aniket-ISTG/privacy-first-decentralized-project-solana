import JSZip from "jszip";
import { generateRandomAesKey } from "../lib/generateRandomAesKey";
import { encryptZipByAesKey } from "../lib/EncryptZipByAesKey";
import { convertZipArrayBufferToWordArray } from "../lib/convertZipArrayBufferToWordArray";   
import { encryptAESKeyWithSecret } from "../lib/AESKeyEncrytion";
import { addEntry } from "../solana/addEntry";
import { uploadToIPFS } from "../utils/uploadToIpfs";
import { getSecret } from "../lib/getSecret";

export const handleFolderSelect = async (wallet, e, setStatus, setEncryptedBlob, setIsSelected, onProgress) => {
  const files = e.target.files;
  if (!files.length) return;

  try {
    setStatus("Zipping files...");
    const zip = new JSZip();
    for (let file of files) {
      zip.file(file.webkitRelativePath, file);
    }

    const zipArrayBuffer = await zip.generateAsync({ type: "arraybuffer" });

    setStatus("Encrypting ZIP...");
    const aesKey = generateRandomAesKey();
    console.log("AES key from upload", aesKey);
    const wordArray = convertZipArrayBufferToWordArray(zipArrayBuffer);
    const encryptedDataByAESKey = encryptZipByAesKey(wordArray, aesKey);
    const encryptedZipBlobByAESKey = new Blob([encryptedDataByAESKey], {
      type: "application/octet-stream",
    });

    onProgress && onProgress(0); // Encrypting files

    setStatus("Uploading to IPFS...");
    const cid = await uploadToIPFS(encryptedZipBlobByAESKey);
    console.log("CID from upload", cid);
    if (!cid) throw new Error("IPFS upload failed");

    onProgress && onProgress(1); // Uploading to IPFS

    setStatus("Encrypting AES key...");
    const encryptedAES = await encryptAESKeyWithSecret(wallet, aesKey);
    console.log("EncryptedAESKey from upload", encryptedAES);

    onProgress && onProgress(2); // Encrypting AES key

    setStatus("Saving to Solana...");
    await addEntry(wallet, cid, encryptedAES);

    onProgress && onProgress(3); // Writing to blockchain

    setEncryptedBlob(encryptedZipBlobByAESKey);
    setStatus("✅ Folder uploaded successfully!");
    setIsSelected(true);

  } catch (err) {
    console.error("❌ Error:", err);
    setStatus("❌ Failed: " + err.message);
  }
};