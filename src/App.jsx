import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import SelectFolder from "./components/SelectFolder";
import { UploadButton } from "./components/UploadButton";
import { useState } from "react";
import { getSecret } from "./lib/getSecret";
import { useWallet } from "@solana/wallet-adapter-react";
import { getDecryptedUnzippedData } from "./utils/getDecryptedUnzippedData";
import { getEncryptedDataFromIPFS } from "./utils/getEncryptedDataFromIPFS";
import { downloadFolderAsZip } from "./utils/downloadFolderAsZip";

function App() {
  const [isSelected, setIsSelected] = useState(false);
  const [encryptedBlob, setEncryptedBlob] = useState(null);
  const wallet = useWallet();
    return (
        <div className="min-h-screen bg-gray-50">
            <div style={{ padding: "40px" }}>
                <h1 className="text-3xl font-bold mb-4">Solana Wallet Connect</h1>
                <WalletMultiButton />
            </div>
            <div className="flex flex-col items-center justify-center px-4">
                <SelectFolder setIsSelected={setIsSelected} encryptedBlob={encryptedBlob} setEncryptedBlob={setEncryptedBlob} />
                {isSelected && <UploadButton encryptedBlob={encryptedBlob} />}
            </div>

            <button onClick={() => {
                console.log("hi there")
                getSecret(wallet);
            }}>Derive Secret
            </button>

            <br/>
            <br/>
            <br/>
            <br/>
            <button onClick={async () => {
                console.log("decrypt + download folder");

                const cid = "QmX3M3rbhNyFVW2TBQB4JEJUsxhXtBGQ5gYCbBqi24wKTx";
                const encryptedBlob = await getEncryptedDataFromIPFS(cid);

                const aesKey =
                    "17543dca8e2655ccc63f93406fd2630d064fc5f072db2b3157180197fbea9219";

                const files = await getDecryptedUnzippedData(encryptedBlob, aesKey);

                await downloadFolderAsZip(files, "my-folder.zip");
                }}>
                Download Full Folder
            </button>

        </div>
    );
}

export default App;



/*
API Key : 604f9de7f470463dbc1c
API Secret : 34d6668776074b3741dceacc17e414c835a043451637b9b34496087d1bcc08db
JWT (secret access token) : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0NDA2NGI1Ni1mNmE3LTQ1ZTEtYWRmNy0wNjcyMjY1Njc3OGMiLCJlbWFpbCI6ImFuaWtldHNlbjEzMDEyMDA2QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI2MDRmOWRlN2Y0NzA0NjNkYmMxYyIsInNjb3BlZEtleVNlY3JldCI6IjM0ZDY2Njg3NzYwNzRiMzc0MWRjZWFjYzE3ZTQxNGM4MzVhMDQzNDUxNjM3YjliMzQ0OTYwODdkMWJjYzA4ZGIiLCJleHAiOjE4MDI4NDM2OTJ9.a09pI8YYBlwS-nNMSNUMIPr4eCkUCxZcIMxlRnJqdhE

*/