import { useWallet } from "@solana/wallet-adapter-react";
import { useAccount } from "../context/AccountContext";
import { useAccountInitialization } from "../hooks";

/**
 * HomePage Component
 * Landing page that shows storage initialization for new users
 * Shows Initialize Storage button only when wallet is connected and account not initialized
 */
export default function HomePage() {
  const wallet = useWallet();
  const { hasAccount, setHasAccount } = useAccount();
  const { isInitializing, handleInitializeStorage } = useAccountInitialization();

  const handleInitialize = () => {
    handleInitializeStorage(wallet, setHasAccount);
  };

  return (
    <div className="min-h-screen flex justify-center py-20">
      <div className="text-center w-full max-w-6xl mx-auto px-6">
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
          {!wallet.connected ? (
            <p className="text-[var(--accent-secondary)] font-mono">
              Connect wallet to get started →
            </p>
          ) : !hasAccount ? (
            <div>
               <p className="text-lg text-[var(--accent-secondary)] max-w-lg mx-auto mb-12 animate-fadeInUp delay-200">
                Click the button below to initialize your encrypted storage account on Solana. This is a one-time setup that creates a secure vault for your files.
              </p>
              <button
              onClick={handleInitialize}
              disabled={isInitializing}
              className="btn-primary"
              >
              {isInitializing ? "⚡ Initializing..." : "⚡ Initialize Storage"}
              </button>
            </div>
            
          ) : (
            <p>
              Your encrypted storage account is ready! Use the navigation above to upload and manage your files securely.
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
