import {
  PublicKey,
  Transaction,
  TransactionInstruction,
  SystemProgram,
} from "@solana/web3.js";
import { getDiscriminator } from "../utils/discriminator";
import { connection, PROGRAM_ID } from "./program";
import { doesPdaAlreadyExist } from "./doesPdaAlreadyExists";

export async function initializeStorage(wallet) {
  if (!wallet.publicKey) throw new Error("Wallet not connected");

  const accountExists = await doesPdaAlreadyExist(wallet.publicKey);
  if (accountExists) {
    throw new Error("Storage account already initialized");
  }

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
    data: discriminator, // initialize has NO args
  });

  const tx = new Transaction().add(instruction);
  // ⬇️ REQUIRED FOR SIMULATION
  const latestBlockhash = await connection.getLatestBlockhash();
  tx.feePayer = wallet.publicKey;
  tx.recentBlockhash = latestBlockhash.blockhash;



  // ✅ SIMULATE FIRST
  
  console.log("PROGRAM ID:", PROGRAM_ID.toBase58());
  console.log("Simulation result:", simulation);
  console.log("anchor Keys list : HDQ8cAj8LyKD4KgveWrokYyBi76XQJgvMD1BoCy9YHc8");

  // HDQ8cAj8LyKD4KgveWrokYyBi76XQJgvMD1BoCy9YHc8

  // ✅ Only send if simulation passes
  const signature = await wallet.sendTransaction(tx, connection);
  await connection.confirmTransaction(signature, "confirmed");


  console.log("✅ Initialized successfully:", signature);

}
