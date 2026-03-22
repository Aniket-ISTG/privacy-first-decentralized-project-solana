import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAccount } from "../context/AccountContext";
import { closeAccount } from "../solana/closeAccount";

export default function DeleteAccountPage() {
  const [isClosing, setIsClosing] = useState(false);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const wallet = useWallet();
  const { setHasAccount } = useAccount();

  if (!wallet.connected) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20">
        <div className="text-center">
          <p className="text-xl text-[var(--accent-secondary)] mb-4">
            Please connect your wallet to delete your account
          </p>
          <Link to="/" className="btn-primary">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const handleCloseAccount = async () => {
    const confirmed = window.confirm(
      "⚠️ Are you sure you want to delete your storage account?\n\nThis will permanently delete ALL your file references and you will get your SOL rent back.\n\nThis cannot be undone."
    );
    if (!confirmed) return;

    try {
      setIsClosing(true);
      setStatus("Closing account...");
      await closeAccount(wallet);
      setHasAccount(false); // Account no longer exists
      setStatus("✅ Account closed. Your SOL rent has been refunded.");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to close account: " + err.message);
    } finally {
      setIsClosing(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-5xl mb-4">🗑️</p>
          <h1 className="text-2xl font-bold text-red-400 mb-2">Delete Account</h1>
          <p className="text-[var(--accent-secondary)] text-sm">
            Permanently delete your storage account and reclaim your SOL rent
          </p>
        </div>

        {/* Warning Box */}
        <div className="mb-8 p-4 border border-red-500 border-opacity-30 rounded-lg bg-red-950 bg-opacity-10">
          <p className="font-mono text-xs text-red-400 opacity-75 mb-3">
            ⚠️ WARNING - THIS ACTION IS IRREVERSIBLE
          </p>
          <ul className="text-sm text-[var(--accent-secondary)] space-y-2">
            <li>✗ All file references will be permanently deleted</li>
            <li>✗ You cannot recover file metadata after deletion</li>
            <li>✓ Encrypted files on IPFS remain (but become inaccessible)</li>
            <li>✓ Your SOL rent deposit will be refunded</li>
          </ul>
        </div>

        {/* Status Messages */}
        {status && (
          <div
            className={`mb-6 p-4 bg-[var(--bg-surface)] border rounded-lg font-mono text-sm ${
              status.includes("✅")
                ? "border-[var(--accent-primary)] text-[var(--accent-primary)]"
                : status.includes("❌")
                  ? "border-red-500 text-red-400"
                  : "border-[var(--bg-border)] text-[var(--accent-secondary)]"
            }`}
          >
            {status}
          </div>
        )}

        {/* Delete Button */}
        <button
          onClick={handleCloseAccount}
          disabled={isClosing}
          className="w-full font-mono text-sm px-6 py-3 rounded border-2 border-red-500 text-red-400 bg-transparent hover:bg-red-500 hover:bg-opacity-20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
        >
          {isClosing ? (
            <>
              <span className="inline-block animate-spin mr-2">⚙️</span>
              Closing Account...
            </>
          ) : (
            "🗑️ Delete Account Permanently"
          )}
        </button>

        {/* Cancel Button */}
        <button
          onClick={() => navigate("/retrieve")}
          disabled={isClosing}
          className="w-full mt-4 font-mono text-sm px-6 py-3 rounded border border-[var(--bg-border)] text-[var(--accent-secondary)] bg-transparent hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-all duration-200 disabled:opacity-50"
        >
          Cancel & Go Back
        </button>
      </div>
    </div>
  );
}
