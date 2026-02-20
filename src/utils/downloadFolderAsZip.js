import JSZip from "jszip";

/**
 * Takes decrypted files and downloads as ZIP
 */
export async function downloadFolderAsZip(files, zipName = "decrypted-folder.zip") {
  const zip = new JSZip();

  for (const [path, blob] of Object.entries(files)) {
    zip.file(path, blob);
  }

  const zipBlob = await zip.generateAsync({ type: "blob" });

  const url = URL.createObjectURL(zipBlob);
  const a = document.createElement("a");
  a.href = url;
  a.download = zipName;
  a.click();
  URL.revokeObjectURL(url);
}
