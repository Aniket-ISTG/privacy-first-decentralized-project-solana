import { PublicKey } from "@solana/web3.js";

export async function getStoragePDA(walletPubkey, programId) {
  const [pda] = await PublicKey.findProgramAddress(
    [
      Buffer.from("storage"),
      walletPubkey.toBuffer(),
    ],
    programId
  );
  return pda;
}
