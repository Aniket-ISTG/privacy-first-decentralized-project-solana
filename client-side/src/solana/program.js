import {
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";

// 🔴 Your deployed program ID
export const PROGRAM_ID = new PublicKey("HDQ8cAj8LyKD4KgveWrokYyBi76XQJgvMD1BoCy9YHc8");

// Solana devnet connection
export const connection = new Connection(
  "https://api.devnet.solana.com",
  "confirmed"
);

/**
 * Send a transaction to your Solana program (NO IDL)
 */
export async function callInitialize(wallet, s1, s2) {
  if (!wallet?.publicKey) {
    throw new Error("Wallet not connected");
  }

  // ---- Encode instruction data (Anchor-style) ----
  const data = encodeInitializeInstruction(s1, s2);

  const instruction = new TransactionInstruction({
    programId: PROGRAM_ID,
    keys: [
      {
        pubkey: wallet.publicKey,
        isSigner: true,
        isWritable: true,
      },
      // add PDA / system program later if needed
    ],
    data,
  });

  const tx = new Transaction().add(instruction);

  const signature = await wallet.sendTransaction(tx, connection);
  await connection.confirmTransaction(signature, "confirmed");

  console.log("Tx signature:", signature);
}

/**
 * Anchor instruction = 8-byte discriminator + Borsh data
 * initialize(s1: String, s2: String)
 */
function encodeInitializeInstruction(s1, s2) {
  const discriminator = Buffer.from([0, 0, 0, 0, 0, 0, 0, 0]); 
  // ↑ initialize = first instruction → discriminator index 0 (simplified)

  const s1Buf = encodeString(s1);
  const s2Buf = encodeString(s2);

  return Buffer.concat([discriminator, s1Buf, s2Buf]);
}

/**
 * Borsh string encoding
 * <u32 length><utf8 bytes>
 */
function encodeString(str) {
  const buf = Buffer.from(str, "utf8");
  const len = Buffer.alloc(4);
  len.writeUInt32LE(buf.length, 0);
  return Buffer.concat([len, buf]);
}
