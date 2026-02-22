import CryptoJS from 'crypto-js';

// Convert ZIP-Array-Buffer to WorddArray (for CryptoJS encryption)
export const convertZipArrayBufferToWordArray = (zipArrayBuffer) => {
  return CryptoJS.lib.WordArray.create(new Uint8Array(zipArrayBuffer));
};