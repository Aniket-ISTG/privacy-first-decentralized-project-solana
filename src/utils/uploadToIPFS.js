import axios from "axios";
import { getPinataUrl } from "./ipfsServiceURl";

const PINATA_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0NDA2NGI1Ni1mNmE3LTQ1ZTEtYWRmNy0wNjcyMjY1Njc3OGMiLCJlbWFpbCI6ImFuaWtldHNlbjEzMDEyMDA2QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI2MDRmOWRlN2Y0NzA0NjNkYmMxYyIsInNjb3BlZEtleVNlY3JldCI6IjM0ZDY2Njg3NzYwNzRiMzc0MWRjZWFjYzE3ZTQxNGM4MzVhMDQzNDUxNjM3YjliMzQ0OTYwODdkMWJjYzA4ZGIiLCJleHAiOjE4MDI4NDM2OTJ9.a09pI8YYBlwS-nNMSNUMIPr4eCkUCxZcIMxlRnJqdhE";


export async function uploadToIPFS(encryptedBlob) {
  //console.log("JWT exists:", !!process.env.NEXT_PUBLIC_PINATA_JWT);

  if (!PINATA_JWT) {
    throw new Error("Pinata JWT not found. Restart dev server.");
  }

  const url = getPinataUrl();
  const formData = new FormData();

  const file = new File([encryptedBlob], "encrypted.zip", {
    type: "application/octet-stream",
  });

  formData.append("file", file);

  const response = await axios.post(url, formData, {
    maxBodyLength: Infinity,
    headers: {
      Authorization: `Bearer ${PINATA_JWT}`,
    },
  });

  return response.data.IpfsHash;
}

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0NDA2NGI1Ni1mNmE3LTQ1ZTEtYWRmNy0wNjcyMjY1Njc3OGMiLCJlbWFpbCI6ImFuaWtldHNlbjEzMDEyMDA2QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJiYTZhOGI0NDRmZGJkYTY1ODgxMCIsInNjb3BlZEtleVNlY3JldCI6IjdiZTg2ODdmMTNlOTBmNTg0N2YyZmJjMjdlYzI4MTNiOTUyYzY3NjYyMmY0MDY3MjY2YWNiYzk2YWQ4YWU1MGQiLCJleHAiOjE4MDI4NDMxOTJ9.jG76iJtzo3J7pyqtC5beTW8uH813-K_xnZoL5A8H8AE