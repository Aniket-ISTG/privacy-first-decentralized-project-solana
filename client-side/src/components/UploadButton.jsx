import { uploadToIPFS } from "../utils/uploadToIpfs";
import { toast } from "react-toastify";
import { useState } from "react";

export const UploadButton = ({ encryptedBlob }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async () => {
    setIsLoading(true);
    try {
      const CID = await uploadToIPFS(encryptedBlob);
      console.log("Uploaded to IPFS with CID:", CID);
      toast.success("File successfully encrypted and uploaded to IPFS! CID saved to blockchain.");
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Upload failed: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={handleUpload}
        disabled={isLoading}
        className={`btn-primary w-full sm:w-auto font-mono font-semibold py-3 px-6 transition-all duration-300 flex items-center justify-center gap-2 ${
          isLoading ? "opacity-75 cursor-wait" : ""
        }`}
      >

      </button>

      {isLoading && (
        <div className="mt-4 space-y-2">
          <div className="w-full bg-[var(--bg-border)] rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-[var(--accent-primary)] to-[#00d4ff] h-full animate-pulse" />
          </div>
        </div>
      )}
    </div>
  );
}; 