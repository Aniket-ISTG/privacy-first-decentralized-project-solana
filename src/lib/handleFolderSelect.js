import JSZip from "jszip";
import { generateRandomAesKey } from "../lib/generateRandomAesKey";
import { encryptZipByAesKey } from "../lib/EncryptZipByAesKey";
import { convertZipArrayBufferToWordArray } from "../lib/convertZipArrayBufferToWordArray";   

export const handleFolderSelect = async (e, setStatus, setEncryptedBlob, setIsSelected) => {
    const files = e.target.files;
    if (!files.length) return;
    setStatus("Zipping files...");
    const zip = new JSZip();

    // Add files to zip (preserve folder structure)
    for (let file of files) {
      zip.file(file.webkitRelativePath, file);
    } 

    // Create ZIP as ArrayBuffer
    const zipArrayBuffer = await zip.generateAsync({
      type: "arraybuffer",
    });
    setStatus("Encrypting ZIP...");
    const aesKey = generateRandomAesKey(); 
    // Convert ArrayBuffer → WordArray
    const wordArray = convertZipArrayBufferToWordArray(zipArrayBuffer);

    // Encrypt ZIP
    const encryptedDataByAESKey = encryptZipByAesKey(wordArray, aesKey);  
    // Convert encrypted string → Blob (ready for IPFS)
    const encryptedZipBlobByAESKey = new Blob([encryptedDataByAESKey], {
      type: "application/octet-stream",
    });
    setEncryptedBlob(encryptedZipBlobByAESKey);
    setStatus("Folder encrypted successfully!");
    setIsSelected(true);
    console.log("AES Key (store encrypted later):", aesKey);
    console.log("Encrypted ZIP Blob:", encryptedZipBlobByAESKey);
}    