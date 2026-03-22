import {
  Transaction,
  TransactionInstruction,
  SystemProgram,
} from "@solana/web3.js";
import { getDiscriminator } from "../utils/discriminator";
import { getStoragePDA } from "./pda";
import { connection, PROGRAM_ID } from "./program";
import { doesPdaAlreadyExist } from "./doesPdaAlreadyExists";

export async function initializeStorage(wallet) {
  if (!wallet.publicKey) throw new Error("Wallet not connected");

  const accountExists = await doesPdaAlreadyExist(wallet.publicKey);
  if (accountExists) {
    throw new Error("Storage already initialized");
  }

  const storagePDA = await getStoragePDA(wallet.publicKey, PROGRAM_ID);
  const discriminator = getDiscriminator("initialize");

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
        isWritable: true,
      },
      {
        pubkey: SystemProgram.programId,
        isSigner: false,
        isWritable: false,
      },
    ],
    data: discriminator,
  });

  const tx = new Transaction().add(instruction);
  const latestBlockhash = await connection.getLatestBlockhash();
  tx.feePayer = wallet.publicKey;
  tx.recentBlockhash = latestBlockhash.blockhash;

  const signature = await wallet.sendTransaction(tx, connection);
  await connection.confirmTransaction(signature, "confirmed");
  console.log("✅ Initialized successfully:", signature);
}