import CryptoJS from 'crypto-js';

// Encrypt ZIP Blob using AES key
export const encryptZipByAesKey = (zipBlobWordArray, aesKey) => {
  return CryptoJS.AES.encrypt(zipBlobWordArray, aesKey).toString();
}