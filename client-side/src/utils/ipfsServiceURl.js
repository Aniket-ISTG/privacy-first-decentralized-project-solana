import { create } from "ipfs-http-client";

// Example: Pinata / Infura / local node
export const ipfsServiceUrl = create({
  url: "https://ipfs.infura.io:5001/api/v0",
});

export const getPinataUrl = () => {
  return "https://api.pinata.cloud/pinning/pinFileToIPFS";
};
