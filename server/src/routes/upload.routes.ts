import express from "express";
import { tempUpload } from "../middlewares/upload";
import { checkFileExists, getFileUrl, s3 } from "../config/s3";
import { hashFileFromPath, getFileExtension } from "../utils/hashFile";
import fs from "fs";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { AWS_S3_BUCKET_NAME } from "../config/dotenv";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { checkSlug } from "../controllers/template.controller";

const router = express.Router();

router.get("/validate-slug/:projectId/:pageSlug", (req, res) => {
  checkSlug(req, res);
});
// Route to check if a file exists before uploading
router.post(
  "/check-file",
  isAuthenticated,
  tempUpload.single("file"),
  async (req: any, res: any) => {
    try {
      const user = req.user;
      const file = req.file as Express.Multer.File;

      if (!file) {
        return res.status(400).json({ message: "No file provided" });
      }

      // Hash the temporary file
      const fileHash = await hashFileFromPath(file.path);
      const extension = getFileExtension(file.originalname);
      const key = `${user.id}/${fileHash}.${extension}`;

      // Clean up temporary file
      fs.unlinkSync(file.path);

      // Check if file already exists in S3
      const fileExists = await checkFileExists(key);

      if (fileExists) {
        const existingUrl = getFileUrl(key);
        return res.status(200).json({
          exists: true,
          imgUrl: existingUrl,
          key: key,
        });
      }

      res.status(200).json({
        exists: false,
        key: key,
      });
    } catch (error) {
      console.error("File check error:", error);
      // Clean up temporary file if it exists
      if (req.file?.path && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      res
        .status(500)
        .json({
          message: "File check failed",
          error: error instanceof Error ? error.message : "Unknown error",
        });
    }
  }
);

router.post(
  "/upload",
  isAuthenticated,
  tempUpload.single("file"),
  async (req: any, res: any) => {
    try {
      const user = req.user;
      const file = req.file as Express.Multer.File;

      if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Hash the temporary file
      const fileHash = await hashFileFromPath(file.path);
      const extension = getFileExtension(file.originalname);
      const key = `${user.id}/${fileHash}.${extension}`;

      // Check if file already exists in S3
      const fileExists = await checkFileExists(key);

      if (fileExists) {
        // File already exists, clean up temp file and return existing URL
        fs.unlinkSync(file.path);
        const existingUrl = getFileUrl(key);
        return res.status(200).json({
          message: "File already exists",
          imgUrl: existingUrl,
          isDuplicate: true,
        });
      }

      // File doesn't exist, proceed with direct S3 upload
      const fileBuffer = fs.readFileSync(file.path);

      const uploadParams = {
        Bucket: AWS_S3_BUCKET_NAME!,
        Key: key,
        Body: fileBuffer,
        ContentType: file.mimetype,
      };

      await s3.send(new PutObjectCommand(uploadParams));

      // Clean up temporary file
      fs.unlinkSync(file.path);

      const uploadedUrl = getFileUrl(key);
      res.status(200).json({
        message: "File uploaded successfully",
        imgUrl: uploadedUrl,
        isDuplicate: false,
      });
    } catch (error) {
      console.error("Upload error:", error);
      // Clean up temporary file if it exists
      if (req.file?.path && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      res
        .status(500)
        .json({
          message: "Upload failed",
          error: error instanceof Error ? error.message : "Unknown error",
        });
    }
  }
);


export default router;
