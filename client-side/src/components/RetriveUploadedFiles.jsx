import { useState } from "react";
import { getEntries } from "../solana/getEntries";
import { getEncryptedDataFromIPFS } from "../utils/getEncryptedDataFromIPFS";
import { getDecryptedUnzippedData } from "../utils/getDecryptedUnzippedData";
import { downloadFolderAsZip } from "../utils/downloadFolderAsZip";
import { decryptAESKeyWithSecret } from "../lib/AESKeyDecryption";
import { getSecret } from "../lib/getSecret";

export default function RetrieveUploadedFiles({ wallet }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(null); // index of file being downloaded
  const [status, setStatus] = useState("");

  // Step 1: Fetch all entries from Solana
  const handleFetchFromBlockchain = async () => {
    try {
      setLoading(true);
      setStatus("Fetching from blockchain...");
      const entries = await getEntries(wallet);
      setFiles(entries);
      setStatus(`✅ Found ${entries.length} file(s)`);
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to fetch: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: On click, download that specific file
  const handleDownload = async (index) => {
    try {
      setDownloading(index);
      setStatus(`Downloading file ${index + 1}...`);

      const { cid, encryptedAesKey } = files[index];
      console.log("EncryptedAESKey from download", encryptedAesKey);
      

      const encryptedBlob = await getEncryptedDataFromIPFS(cid);
      const aesKey = await decryptAESKeyWithSecret(wallet, encryptedAesKey);
      console.log("CID from download", cid);
      console.log("aesKey from download", aesKey);
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

  return (
    <div>
      <button onClick={handleFetchFromBlockchain} disabled={loading}>
        {loading ? "Fetching..." : "Retrieve from Blockchain"}
      </button>

      <p>{status}</p>

      {files.length > 0 && (
        <ul>
          {files.map((file, index) => (
            <li key={index}>
              <span>📁 File {index + 1} — CID: {file.cid.slice(0, 20)}...</span>
              <button
                onClick={() => handleDownload(index)}
                disabled={downloading === index}
              >
                {downloading === index ? "Downloading..." : "⬇ Download"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}