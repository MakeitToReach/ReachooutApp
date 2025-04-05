import { JwtPayload as BaseJwtPayload } from "jsonwebtoken";

interface CustomJwtPayload extends BaseJwtPayload {
  id: string; // Or userId: string, or sub: string - MUST MATCH YOUR JWT PAYLOAD
  // Add other custom fields from your JWT payload if needed
  email?: string;
  name: string;
  // role?: string;
}

declare global {
  namespace Express {
    export interface Request {
      user?: CustomJwtPayload;
    }
  }
}

export { CustomJwtPayload };
