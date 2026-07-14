/**
 * Downloads encrypted file from IPFS using CID
 */
export async function getEncryptedDataFromIPFS(cid) {
  const ipfsGateway = "https://gateway.pinata.cloud/ipfs/";
  const url = ipfsGateway + cid;

  // 1️⃣ Fetch encrypted data
  console.log("reached this page");
  const response = await fetch(url);
  if (!response.ok) {
    console.log("Error occured");
    throw new Error("Failed to fetch file from IPFS");
  }
  console.log("This call happend");

  const blob = await response.blob();
  return blob;
}
