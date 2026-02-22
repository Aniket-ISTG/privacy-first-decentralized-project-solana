import React, { useState } from "react";
import { handleFolderSelect } from "../lib/handleFolderSelect";
import { useWallet } from "@solana/wallet-adapter-react";

const SelectFolder = ({setIsSelected, encryptedBlob, setEncryptedBlob}) => {
  const [status, setStatus] = useState("");
  const wallet = useWallet();

  const handleFileChange = (e) => {
    handleFolderSelect(wallet, e, setStatus, setEncryptedBlob, setIsSelected);
  }

  return (
    <div className="flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-6 border rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Select Private Folder
        </h2>

        <input
          type="file"
          webkitdirectory="true"
          directory="true"
          multiple
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-600
                     file:mr-4 file:py-2 file:px-4
                     file:rounded file:border-0
                     file:bg-black file:text-white
                     hover:file:bg-gray-800"
        />

        {status && (
          <p className="mt-4 text-sm text-gray-700">
            {status}
          </p>
        )}

        {encryptedBlob && (
          <p className="mt-2 text-sm text-green-600">
            Encrypted ZIP ready for IPFS upload ✅
          </p>
        )}
      </div>
    </div>
  );
};

export default SelectFolder;
