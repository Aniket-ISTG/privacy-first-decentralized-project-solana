import { useState } from "react";
import { toast } from "react-toastify";
import { initializeStorage } from "../solana/initializeStorage";

/**
 * Custom hook to handle storage account initialization
 * @returns {Object} - { isInitializing, handleInitializeStorage }
 */
export function useAccountInitialization() {
  const [isInitializing, setIsInitializing] = useState(false);

  const handleInitializeStorage = async (wallet, setHasAccount) => {
    if (!wallet.connected) {
      toast.error("Please connect your wallet first");
      return;
    }

    setIsInitializing(true);
    try {
      await initializeStorage(wallet);
      setHasAccount(true);
      toast.success("Storage account initialized successfully!");
    } catch (error) {
      console.error("Initialization error:", error);
      setHasAccount(false);
      toast.error("Storage already initialized");
    } finally {
      setIsInitializing(false);
    }
  };

  return {
    isInitializing,
    handleInitializeStorage,
  };
}
