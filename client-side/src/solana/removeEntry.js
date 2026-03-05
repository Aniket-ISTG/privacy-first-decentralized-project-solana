import {
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { getDiscriminator } from "../utils/discriminator";
import { getStoragePDA } from "./pda";
import { connection, PROGRAM_ID } from "./program";

export async function removeEntry(wallet, index) {
  if (!wallet.publicKey) throw new Error("Wallet not connected");

  const storagePDA = await getStoragePDA(wallet.publicKey, PROGRAM_ID);
  const discriminator = getDiscriminator("remove_entry");

  // Serialize index as u64 (8 bytes little-endian)
  const indexBuffer = Buffer.alloc(8);
  indexBuffer.writeBigUInt64LE(BigInt(index), 0);

  const data = Buffer.concat([discriminator, indexBuffer]);

  const instruction = new TransactionInstruction({
    programId: PROGRAM_ID,
    keys: [
      {
        pubkey: storagePDA,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: wallet.publicKey,
        isSigner: true,
        isWritable: false,
      },
    ],
    data,
  });

  const tx = new Transaction().add(instruction);
  const latestBlockhash = await connection.getLatestBlockhash();
  tx.feePayer = wallet.publicKey;
  tx.recentBlockhash = latestBlockhash.blockhash;

  const signature = await wallet.sendTransaction(tx, connection);
  await connection.confirmTransaction(signature, "confirmed");
  console.log("✅ Entry removed:", signature);
  return signature;
}