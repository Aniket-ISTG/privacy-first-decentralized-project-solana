import CryptoJS from 'crypto-js';

// 🔐 Generate random AES key (32 bytes)
export const generateRandomAesKey = () => {
  return CryptoJS.lib.WordArray.random(32).toString();
};