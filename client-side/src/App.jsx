import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import SelectFolder from "./components/SelectFolder";
import { UploadButton } from "./components/UploadButton";
import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { initializeStorage } from "./solana/initializeStorage";
import RetrieveUploadedFiles from "./components/RetriveUploadedFiles";

function App() {
  const [isSelected, setIsSelected] = useState(false);
  const [encryptedBlob, setEncryptedBlob] = useState(null);
  const [activeTab, setActiveTab] = useState("upload"); // "upload" | "retrieve"
  const wallet = useWallet();

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔒</span>
          <h1 className="text-xl font-bold tracking-tight">PrivacyVault</h1>
        </div>
        <WalletMultiButton style={{ backgroundColor: "#6366f1" }} />
      </nav>

      {/* Hero */}
      <div className="text-center py-12 px-4">
        <h2 className="text-4xl font-extrabold mb-3">
          Decentralized Private Storage
        </h2>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Encrypt your files locally, store on IPFS, and keep your keys on Solana. Only you can access your data.
        </p>

        {wallet.connected && (
          <button
            onClick={() => initializeStorage(wallet)}
            className="mt-6 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm font-medium transition"
          >
            ⚡ Initialize Storage Account
          </button>
        )}
      </div>

      {/* Tabs */}
      {wallet.connected && (
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex gap-2 mb-6 border-b border-gray-800">
            <button
              onClick={() => setActiveTab("upload")}
              className={`pb-2 px-4 text-sm font-medium transition border-b-2 ${
                activeTab === "upload"
                  ? "border-indigo-500 text-indigo-400"
                  : "border-transparent text-gray-500 hover:text-gray-300"
              }`}
            >
              📤 Upload
            </button>
            <button
              onClick={() => setActiveTab("retrieve")}
              className={`pb-2 px-4 text-sm font-medium transition border-b-2 ${
                activeTab === "retrieve"
                  ? "border-indigo-500 text-indigo-400"
                  : "border-transparent text-gray-500 hover:text-gray-300"
              }`}
            >
              📥 My Files
            </button>
          </div>

          {/* Upload Tab */}
          {activeTab === "upload" && (
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <h3 className="text-lg font-semibold mb-4">Upload Encrypted Folder</h3>
              <SelectFolder
                setIsSelected={setIsSelected}
                encryptedBlob={encryptedBlob}
                setEncryptedBlob={setEncryptedBlob}
              />
              {isSelected && (
                <div className="mt-4">
                  <UploadButton encryptedBlob={encryptedBlob} />
                </div>
              )}
            </div>
          )}

          {/* Retrieve Tab */}
          {activeTab === "retrieve" && (
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <h3 className="text-lg font-semibold mb-4">My Encrypted Files</h3>
              <RetrieveUploadedFiles wallet={wallet} />
            </div>
          )}
        </div>
      )}

      {/* Not connected */}
      {!wallet.connected && (
        <div className="text-center mt-8 text-gray-500">
          <p>Connect your wallet to get started</p>
        </div>
      )}

      {/* Footer */}
      <footer className="text-center text-gray-700 text-sm py-10 mt-16">
        Built on Solana + IPFS · End-to-end encrypted · You own your data
      </footer>
    </div>
  );
}

export default App;