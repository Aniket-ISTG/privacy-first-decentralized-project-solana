import { useWallet } from "@solana/wallet-adapter-react";
import RetrieveUploadedFiles from "../components/RetriveUploadedFiles";
import { Link } from "react-router-dom";

export default function RetrievePage() {
  const wallet = useWallet();

  if (!wallet.connected) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20">
        <div className="text-center">
          <p className="text-xl text-[var(--accent-secondary)] mb-4">
            Please connect your wallet to retrieve files
          </p>
          <Link to="/" className="btn-primary">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[var(--accent-text)] mb-4">
            My Encrypted Files
          </h1>
          <p className="text-[var(--accent-secondary)] max-w-2xl mx-auto">
            Retrieve and decrypt your files from the blockchain. Only you can access your encrypted data.
          </p>
        </div>

        {/* Files Section */}
        <div className="mb-12">
          <RetrieveUploadedFiles wallet={wallet} />
        </div>
      </div>
    </div>
  );
}