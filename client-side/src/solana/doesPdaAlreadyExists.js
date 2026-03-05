import { getStoragePDA } from "./pda";
import { connection, PROGRAM_ID } from "./program";

export async function doesPdaAlreadyExist(publicKey) {
  const storagePDA = await getStoragePDA(publicKey, PROGRAM_ID);
  const existingAccount = await connection.getAccountInfo(storagePDA);
  if (existingAccount) {
    console.log("✅ Account already initialized, skipping...");
    return;
  }
}