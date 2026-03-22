import { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { doesPdaAlreadyExist } from "../solana/doesPdaAlreadyExists";

/**
 * Custom hook to check if user has an initialized storage account
 * @param {Function} setHasAccount - Callback to set account state
 */
export function useAccountCheck(setHasAccount) {
  const wallet = useWallet();

  useEffect(() => {
    if (wallet.publicKey) {
      checkAccountExists();
    } else {
      setHasAccount(false);
    }
  }, [wallet.publicKey, setHasAccount]);

  const checkAccountExists = async () => {
    try {
      const exists = await doesPdaAlreadyExist(wallet.publicKey);
      setHasAccount(exists);
    } catch (err) {
      console.error("Error checking PDA existence:", err);
      setHasAccount(false);
    }
  };
}
