import multer from "multer";
// import { getFileExtension } from "../utils/hashFile";
import path from "path";
import os from "os";

// Create temporary storage for initial upload
const tempStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, os.tmpdir());
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Temporary upload middleware
export const tempUpload = multer({ storage: tempStorage });