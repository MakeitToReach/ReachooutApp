import multer from "multer";
import multerS3 from "multer-s3";
import { s3 } from "../config/s3";
import { AWS_S3_BUCKET_NAME } from "../config/dotenv";


export const upload = multer({
    storage: multerS3({
        s3: s3 as any,
        bucket: AWS_S3_BUCKET_NAME!,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (_req: any, file: Express.Multer.File, callback: (error: any, filename?: string) => void){
            const filename = `${Date.now()}-${file.originalname}`;
            callback(null, filename);
        },
    }),
});