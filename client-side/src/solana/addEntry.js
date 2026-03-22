import {
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { getDiscriminator } from "../utils/discriminator";
import { getStoragePDA } from "./pda";
import { connection, PROGRAM_ID } from "./program";

export async function addEntry(wallet, cid, encryptedAesKey, nameField) {
  if (!wallet.publicKey) throw new Error("Wallet not connected");

  const storagePDA = await getStoragePDA(wallet.publicKey, PROGRAM_ID);
  const discriminator = getDiscriminator("add_entry");

  // Borsh encode strings (4 byte length + utf8 bytes)
  const data = Buffer.concat([
    discriminator,
    serializeString(cid),
    serializeString(encryptedAesKey),
    serializeString(nameField),
  ]);

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

  // Simulate first
  // const simulation = await connection.simulateTransaction(tx);

  // if (simulation.value.err) {
  //   console.error("❌ Simulation error:", simulation.value.err);
  //   return;
  // }

  const signature = await wallet.sendTransaction(tx, connection);
  await connection.confirmTransaction(signature, "confirmed");
  return signature;
}

function serializeString(str) {
  const strBytes = Buffer.from(str, "utf8");
  const lenBuffer = Buffer.alloc(4);
  lenBuffer.writeUInt32LE(strBytes.length, 0);
  return Buffer.concat([lenBuffer, strBytes]);
}