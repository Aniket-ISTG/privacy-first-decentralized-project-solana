import { useState } from "react";
import { getEntries } from "../solana/getEntries";
import { getEncryptedDataFromIPFS } from "../utils/getEncryptedDataFromIPFS";
import { getDecryptedUnzippedData } from "../utils/getDecryptedUnzippedData";
import { downloadFolderAsZip } from "../utils/downloadFolderAsZip";
import { decryptAESKeyWithSecret } from "../lib/AESKeyDecryption";
import { removeEntry } from "../solana/removeEntry";
import FileCard from "./FileCard";

export default function RetrieveUploadedFiles({ wallet }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(null);
  const [status, setStatus] = useState("");
  const [hasInitialized, setHasInitialized] = useState(false);

  const handleFetchFromBlockchain = async () => {
    try {
      setLoading(true);
      setStatus("Fetching files from blockchain...");
      const entries = await getEntries(wallet);
      setFiles(entries);
      setHasInitialized(true);
      setStatus(entries.length > 0 ? "" : "No files uploaded yet");
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to fetch: " + err.message);
      setHasInitialized(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (index) => {
    try {
      setDownloading(index);
      setStatus(`Downloading file ${index + 1}...`);
      const { cid, encryptedAesKey } = files[index];
      const encryptedBlob = await getEncryptedDataFromIPFS(cid);
      const aesKey = await decryptAESKeyWithSecret(wallet, encryptedAesKey);
      const decryptedZippedFile = await getDecryptedUnzippedData(encryptedBlob, aesKey);
      downloadFolderAsZip(decryptedZippedFile, `folder-${index + 1}.zip`);
      setStatus(`✅ File ${index + 1} downloaded!`);
    } catch (err) {
      console.error(err);
      setStatus("❌ Download failed: " + err.message);
    } finally {
      setDownloading(null);
    }
  };

  const handleDelete = async (index) => {
    try {
      setStatus(`Deleting file ${index + 1}...`);
      await removeEntry(wallet, index);

      // Wait for fade animation then remove from state
      setTimeout(() => {
        setFiles(prev => prev.filter((_, i) => i !== index));
        setStatus("✅ File deleted successfully");
      }, 400);

    } catch (err) {
      console.error(err);
      setStatus("❌ Delete failed: " + err.message);
    }
  };

  return (
    <div className="w-full">
      {!hasInitialized && (
        <div className="flex justify-center">
          <button
            onClick={handleFetchFromBlockchain}
            disabled={loading}
            className="btn-primary font-mono font-semibold py-3 px-6"
          >
            {loading ? (
              <>
                <span className="inline-block animate-spin mr-2">⚙️</span>
                Fetching...
              </>
            ) : (
              <>
                <span className="mr-2">🔗</span>
                Fetch Files from Blockchain
              </>
            )}
          </button>
        </div>
      )}

      {status && (
        <div
          className={`mt-6 p-4 bg-[var(--bg-surface)] border rounded-lg font-mono text-sm ${
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

      {files.length > 0 && (
        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {files.map((file, index) => (
              <FileCard
                key={file.cid}    
                index={index}
                file={file}
                isDownloading={downloading === index}
                onDownload={() => handleDownload(index)}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}

      {hasInitialized && files.length === 0 && !loading && (
        <div className="mt-8 py-12 text-center border border-dashed border-[var(--bg-border)] rounded-lg">
          <p className="text-5xl mb-4">📭</p>
          <p className="text-[var(--accent-secondary)] mb-2">No encrypted files yet</p>
          <p className="font-mono text-xs text-[var(--accent-secondary)] opacity-75">
            Upload your first folder to get started
          </p>
        </div>
      )}
    </div>
  );
}