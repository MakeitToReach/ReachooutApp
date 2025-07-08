import { S3Client, HeadObjectCommand } from "@aws-sdk/client-s3";
import { AWS_ACCESS_KEY_ID, AWS_REGION, AWS_SECRET_ACCESS_KEY, AWS_S3_BUCKET_NAME } from "./dotenv";

export const s3 = new S3Client({
  region: AWS_REGION!,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID!,
    secretAccessKey: AWS_SECRET_ACCESS_KEY!,
  },
});

export const checkFileExists = async (key: string): Promise<boolean> => {
  try {
    await s3.send(new HeadObjectCommand({
      Bucket: AWS_S3_BUCKET_NAME!,
      Key: key,
    }));
    return true;
  } catch (error) {
    return false;
  }
};

export const getFileUrl = (key: string): string => {
  return `https://${AWS_S3_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${key}`;
};



