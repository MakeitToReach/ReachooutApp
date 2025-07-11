import dotenv from "dotenv";

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";
export const SESSION_SECRET_KEY = process.env.SESSION_SECRET_KEY;
export const PORT = process.env.PORT || 5000;

export const DATABASE_URL = process.env.DATABASE_URL;
export const CLIENT_URL = process.env.CLIENT_URL;
export const DEV_URL = process.env.DEV_URL || "http://app.localhost:3000";
export const BACKEND_URL = process.env.BACKEND_URL;

export const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
export const AWS_REGION = process.env.AWS_REGION;
export const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
