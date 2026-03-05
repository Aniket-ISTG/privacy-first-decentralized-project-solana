import { useWallet } from "@solana/wallet-adapter-react";
import { initializeStorage } from "../solana/initializeStorage";
import { useState } from "react";
import { toast } from "react-toastify";

export default function HomePage() {
  const wallet = useWallet();
  const [isInitializing, setIsInitializing] = useState(false);

  const handleInitializeStorage = async () => {
    if (!wallet.connected) {
      toast.error("Please connect your wallet first");
      return;
    }

    setIsInitializing(true);
    try {
      await initializeStorage(wallet);
      toast.success("Storage account initialized successfully!");
    } catch (error) {
      console.error("Initialization error:", error);
      toast.error("Storage already initialized");
    } finally {
      setIsInitializing(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <div className="text-center max-w-4xl mx-auto px-6">
        <p className="font-mono text-[var(--accent-primary)] text-lg mb-4 animate-fadeInUp">
          Build encrypted privacy
        </p>
        <h1 className="text-6xl sm:text-7xl font-bold text-[var(--accent-text)] mb-6 animate-fadeInUp delay-100">
          Store files.{" "}
          <span className="block text-[var(--accent-primary)]">Privately.</span>
        </h1>
        <p className="text-lg text-[var(--accent-secondary)] max-w-lg mx-auto mb-12 animate-fadeInUp delay-200">
          End-to-end encrypted file storage on Solana + IPFS. Only you hold the keys. Your data truly belongs to you.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fadeInUp delay-300">
          {wallet.connected ? (
            <>
              <button
                onClick={handleInitializeStorage}
                disabled={isInitializing}
                className="btn-primary"
              >
                {isInitializing ? "⚡ Initializing..." : "⚡ Initialize Storage"}
              </button>
            </>
          ) : (
            <p className="text-[var(--accent-secondary)] font-mono">
              Connect wallet to get started →
            </p>
          )}
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fadeInUp delay-400">
          <div className="card text-center">
            <div className="text-4xl mb-4">🔐</div>
            <h3 className="font-bold text-[var(--accent-text)] mb-2">Local Encryption</h3>
            <p className="text-[var(--accent-secondary)] text-sm">
              Files are encrypted on your device before upload
            </p>
          </div>
          <div className="card text-center">
            <div className="text-4xl mb-4">🌐</div>
            <h3 className="font-bold text-[var(--accent-text)] mb-2">IPFS Storage</h3>
            <p className="text-[var(--accent-secondary)] text-sm">
              Decentralized file storage on the InterPlanetary File System
            </p>
          </div>
          <div className="card text-center">
            <div className="text-4xl mb-4">🔑</div>
            <h3 className="font-bold text-[var(--accent-text)] mb-2">Your Keys Only</h3>
            <p className="text-[var(--accent-secondary)] text-sm">
              Encryption keys are stored securely on Solana blockchain
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}