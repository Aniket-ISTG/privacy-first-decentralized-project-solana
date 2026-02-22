import {
  PublicKey,
  Transaction,
  TransactionInstruction,
  SystemProgram,
} from "@solana/web3.js";
import { getDiscriminator } from "../utils/discriminator";
import { getStoragePDA } from "./pda";
import { connection, PROGRAM_ID } from "./program";

export async function initializeStorage(wallet) {
  if (!wallet.publicKey) throw new Error("Wallet not connected");

  const storagePDA = await getStoragePDA(wallet.publicKey, PROGRAM_ID);
  const existingAccount = await connection.getAccountInfo(storagePDA);
  if (existingAccount) {
    console.log("✅ Account already initialized, skipping...");
    return;
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
  console.log("🔍 Simulating transaction...");

  // ⬇️ REQUIRED FOR SIMULATION
  const latestBlockhash = await connection.getLatestBlockhash();
  tx.feePayer = wallet.publicKey;
  tx.recentBlockhash = latestBlockhash.blockhash;

  // 🧪 Simulate
  const simulation = await connection.simulateTransaction(tx);
  console.log("PROGRAM ID:", PROGRAM_ID.toBase58());
  console.log("Simulation result:", simulation);
  console.log("anchor Keys list : HDQ8cAj8LyKD4KgveWrokYyBi76XQJgvMD1BoCy9YHc8");

  if (simulation.value.err) {
    console.error("❌ Simulation error:", simulation.value.err);
    console.log("🪵 Program logs:", simulation.value.logs);
    return;
  }
  // HDQ8cAj8LyKD4KgveWrokYyBi76XQJgvMD1BoCy9YHc8

  // ✅ Only send if simulation passes
  const signature = await wallet.sendTransaction(tx, connection);
  await connection.confirmTransaction(signature, "confirmed");


  console.log("✅ Initialized successfully:", signature);

}
