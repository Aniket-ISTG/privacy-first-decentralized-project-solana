import { uploadToIPFS } from "../utils/uploadToIpfs";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

export const UploadButton = ({ encryptedBlob }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async () => {
    setIsLoading(true);
    try {
      const CID = await uploadToIPFS(encryptedBlob);   
      console.log("Uploaded to IPFS with CID:", CID);
      toast.success(`File uploaded!`);
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error(`Upload failed:`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover /> 
      <button 
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"  
        onClick={handleUpload}
        disabled={isLoading}
      >
        {isLoading && (
          <span className="animate-spin">⚙️</span>
        )}
        {isLoading ? "Uploading..." : "Upload to IPFS"}
      </button>
    </div>
  );
} 