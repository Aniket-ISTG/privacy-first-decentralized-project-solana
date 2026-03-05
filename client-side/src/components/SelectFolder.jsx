import React, { useState } from "react";
import { handleFolderSelect } from "../lib/handleFolderSelect";
import { useWallet } from "@solana/wallet-adapter-react";

const SelectFolder = ({ setIsSelected, encryptedBlob, setEncryptedBlob, setIsUploading, setCurrentStep, setUploadComplete, isUploading }) => {
  const [status, setStatus] = useState("");
  const [isDragActive, setIsDragActive] = useState(false);
  const wallet = useWallet();
  const [selectedFileCount, setSelectedFileCount] = useState(0);

  const handleFileChange = (e) => {
    setSelectedFileCount(e.target.files.length);
    setIsUploading(true);
    setCurrentStep(0);
    handleFolderSelect(wallet, e, setStatus, setEncryptedBlob, setIsSelected, (step) => {
      setCurrentStep(step);
    }).then(() => {
      setUploadComplete(true);
    }).catch(() => {
      // Handle error if needed
    }).finally(() => {
      setIsUploading(false);
    });
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (e.dataTransfer.items) {
      // Use DataTransferItemList interface (recommended way)
      const files = [];
      for (let i = 0; i < e.dataTransfer.items.length; i++) {
        if (e.dataTransfer.items[i].kind === "file") {
          files.push(e.dataTransfer.items[i].getAsFile());
        }
      }
      // Create a synthetic event with files
      const event = { target: { files: files } };
      setSelectedFileCount(files.length);
      setIsUploading(true);
      setCurrentStep(0);
      handleFolderSelect(wallet, event, setStatus, setEncryptedBlob, setIsSelected, (step) => {
        setCurrentStep(step);
      }).then(() => {
        setUploadComplete(true);
      }).catch(() => {
        // Handle error if needed
      }).finally(() => {
        setIsUploading(false);
      });
    }
  };

  return (
    <div className="w-full">
      <div
        className={`relative w-full border-2 border-dashed rounded-lg p-12 transition-all duration-300 text-center ${
          isDragActive
            ? "border-[var(--accent-primary)] bg-[rgba(100,255,218,0.05)]"
            : "border-[var(--accent-primary)] bg-transparent hover:bg-[rgba(100,255,218,0.02)]"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="folder-input"
          webkitdirectory="true"
          directory="true"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />

        <label htmlFor="folder-input" className="cursor-pointer block">
          <div className="mb-4">
            <span className="text-5xl block mb-2 animate-float">📁</span>
          </div>

          <p className="font-mono text-[var(--accent-primary)] text-sm font-bold mb-2">
            {isDragActive ? "Drop your folder here" : "Select Folder to Encrypt"}
          </p>

          <p className="text-[var(--accent-secondary)] text-sm mb-4">
            Drag and drop your folder here, or click to browse
          </p>

          <p className="font-mono text-xs text-[var(--accent-secondary)] opacity-75">
            Files will be encrypted locally before upload
          </p>
        </label>

        {selectedFileCount > 0 && !encryptedBlob && (
          <div className="mt-4 pt-4 border-t border-[var(--bg-border)]">
            <p className="font-mono text-sm text-[var(--accent-primary)]">
              ✓ {selectedFileCount} file(s) selected
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectFolder;

