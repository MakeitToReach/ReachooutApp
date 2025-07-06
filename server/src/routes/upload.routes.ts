import express from "express";
import { upload } from "../middlewares/upload";

const router = express.Router();

router.post("/upload", upload.single("file"), (req: any, res: any) => {
  const file = req.file as Express.MulterS3.File;

  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.status(200).json({ message: "File uploaded successfully", imgUrl: file.location });
});

export default router;
