/**
 * Downloads encrypted file from IPFS using CID
 */
export async function getEncryptedDataFromIPFS(cid) {
  const ipfsGateway = "https://ipfs.io/ipfs/";
  const url = ipfsGateway + cid;

  // 1️⃣ Fetch encrypted data
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch file from IPFS");
  }

  const blob = await response.blob();
  return blob;
}
