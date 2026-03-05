import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import SelectFolder from "../components/SelectFolder";
import { UploadButton } from "../components/UploadButton";
import { Link } from "react-router-dom";
import ProgressTracker from "../components/ProgressTracker";

export default function UploadPage() {
  const [isSelected, setIsSelected] = useState(false);
  const [encryptedBlob, setEncryptedBlob] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const wallet = useWallet();

  if (!wallet.connected) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20">
        <div className="text-center">
          <p className="text-xl text-[var(--accent-secondary)] mb-4">
            Please connect your wallet to upload files
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
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[var(--accent-text)] mb-4">
            Upload Encrypted Files
          </h1>
          <p className="text-[var(--accent-secondary)] max-w-2xl mx-auto">
            Select a folder to encrypt locally and upload to IPFS. Your encryption keys will be securely stored on Solana.
          </p>
        </div>

        {/* Upload Section */}
        <div className="card mb-8">
          <div className="flex items-center justify-center">
            <SelectFolder
              key={resetKey}
              setIsSelected={setIsSelected}
              encryptedBlob={encryptedBlob}
              setEncryptedBlob={setEncryptedBlob}
              setIsUploading={setIsUploading}
              setCurrentStep={setCurrentStep}
              setUploadComplete={setUploadComplete}
              isUploading={isUploading}
            />
          </div>

          {isUploading && (
            <div className="mt-8 text-center">
              <p className="font-mono text-sm text-[var(--accent-secondary)] mb-6">
                Flow of your upload is visible below as it happens. Please do not refresh or navigate away from the page until you see the success message.
              </p>
              <ProgressTracker currentStep={currentStep} isActive={isUploading} />
            </div>
          )}

          {uploadComplete && (
            <div className="mt-8 text-center">
              <div className="animate-pulse-glow bg-[var(--bg-surface)] border border-[var(--accent-primary)] rounded-lg p-8">
                <p className="font-mono text-lg text-[var(--accent-primary)] mb-4">
                  ✅ Upload Complete!
                </p>
                <p className="text-[var(--accent-secondary)] mb-6">
                  Click to upload more files
                </p>
                <button
                  onClick={() => {
                    setIsSelected(false);
                    setEncryptedBlob(null);
                    setUploadComplete(false);
                    setCurrentStep(-1);
                    setResetKey(prev => prev + 1);
                  }}
                  className="btn-primary"
                >
                  Upload More
                </button>
              </div>
            </div>
          )}

          {isSelected && !isUploading && !uploadComplete && (
            <div className="mt-8 pt-8 border-t border-[var(--bg-border)]">
              <UploadButton encryptedBlob={encryptedBlob} />
            </div>
          )}
        </div>

      </div>
    </div>
  );
}