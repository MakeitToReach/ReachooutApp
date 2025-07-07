import { getToken } from "@/lib/isAuthenticated";
import api from "../axios.config";

export interface UploadResponse {
  imgUrl: string;
  isDuplicate?: boolean;
  message?: string;
}

export interface CheckFileResponse {
  exists: boolean;
  imgUrl?: string;
  key?: string;
}

export async function checkFileExists(file: File): Promise<CheckFileResponse> {
  const token = getToken();
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/v1/check-file", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status !== 200) throw new Error("File check failed");

  return response.data;
}

export async function plainUploadImage(file: File): Promise<UploadResponse> {
  const token = getToken();
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/v1/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status !== 200) throw new Error("Upload failed");

  return response.data;
}

// Optimized upload function that checks for duplicates first
export async function uploadImage(file: File): Promise<UploadResponse> {
  try {
    // First check if file already exists
    const checkResult = await checkFileExists(file);

    if (checkResult.exists && checkResult.imgUrl) {
      // File already exists, return existing URL
      return {
        imgUrl: checkResult.imgUrl,
        isDuplicate: true,
        message: "File already exists",
      };
    }

    // File doesn't exist, proceed with upload
    return await plainUploadImage(file);
  } catch (error) {
    console.error("Upload error:", error);
    throw new Error("Upload failed");
  }
}

export async function deleteImage(imgUrl: string): Promise<UploadResponse> {
  const token = getToken();
  const response = await api.delete(`/v1/delete-image/${imgUrl}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  if (response.status !== 200) throw new Error("Delete failed");
  return response.data;
}