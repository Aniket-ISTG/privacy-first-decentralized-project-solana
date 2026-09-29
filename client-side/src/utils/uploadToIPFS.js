import axios from "axios";
import { getPinataUrl } from "./ipfsServiceURl";

const PINATA_JWT = import.meta.env.VITE_PINATA_JWT;
export async function uploadToIPFS(encryptedBlob) {
  if (!PINATA_JWT) {
    throw new Error("Pinata JWT not found. Check .env file and restart dev server.");
  }
  console.log("PINATA JWT:", PINATA_JWT);
  console.log("JWT exists:", !!PINATA_JWT);
  console.log("JWT length:", PINATA_JWT?.length);

  console.log("Inside Upload to IPFS")

  const url = getPinataUrl();
  const formData = new FormData();

  const file = new File([encryptedBlob], "encrypted.zip", {
    type: "application/octet-stream",
  });

  formData.append("file", file);

  try {
  const response = await axios.post(url, formData, {
    maxBodyLength: Infinity,
    headers: {
      Authorization: `Bearer ${PINATA_JWT}`,
    },
  });

  console.log("Pinata success:", response.data);

  return response.data.IpfsHash;
} catch (error) {
  console.error("========== PINATA ERROR ==========");

  console.error("Status:", error.response?.status);
  console.error("Response:", error.response?.data);
  console.error("Message:", error.message);

  console.error("==================================");

  throw error;
}
}

