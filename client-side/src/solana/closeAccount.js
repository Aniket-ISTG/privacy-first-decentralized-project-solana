import {
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { getDiscriminator } from "../utils/discriminator";
import { getStoragePDA } from "./pda";
import { connection, PROGRAM_ID } from "./program";

export async function closeAccount(wallet) {
  if (!wallet.publicKey) throw new Error("Wallet not connected");

  const storagePDA = await getStoragePDA(wallet.publicKey, PROGRAM_ID);
  const discriminator = getDiscriminator("close_account");

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
        isWritable: true,  // must be writable to receive rent SOL back
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
  console.log("✅ Account closed:", signature);
  return signature;
}