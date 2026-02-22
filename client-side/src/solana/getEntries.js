import { connection, PROGRAM_ID } from "./program";
import { getStoragePDA } from "./pda";

export async function getEntries(wallet) {
  if (!wallet.publicKey) throw new Error("Wallet not connected");

  const storagePDA = await getStoragePDA(wallet.publicKey, PROGRAM_ID);

  const accountInfo = await connection.getAccountInfo(storagePDA);
  if (!accountInfo) {
    console.log("❌ No account found, initialize first");
    return [];
  }

  const data = accountInfo.data;

  // Parse the account data manually (Borsh layout):
  // 8 bytes discriminator
  // 32 bytes owner pubkey
  // 4 bytes vec length
  // then each FileEntry: 4+len bytes cid, 4+len bytes encrypted_aes_key

  let offset = 8 + 32; // skip discriminator + owner

  const fileCount = data.readUInt32LE(offset);
  offset += 4;

  const files = [];

  for (let i = 0; i < fileCount; i++) {
    // Read CID
    const cidLen = data.readUInt32LE(offset);
    offset += 4;
    const cid = data.slice(offset, offset + cidLen).toString("utf8");
    offset += cidLen;

    // Read encrypted AES key
    const aesLen = data.readUInt32LE(offset);
    offset += 4;
    const encryptedAesKey = data.slice(offset, offset + aesLen).toString("utf8");
    offset += aesLen;

    files.push({ cid, encryptedAesKey });
  }

  console.log("✅ Retrieved entries:", files);
  return files;
}