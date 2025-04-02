import jwt, { JwtPayload } from "jsonwebtoken";
// import { CustomJwtPayload } from "../types/express"; // Adjust path if needed
import { JWT_SECRET } from "../config/dotenv";
import { CustomJwtPayload } from "../types/express";

export const authenticateJWT = (token: string): CustomJwtPayload | null => {
  const jwtSecret = JWT_SECRET;
  if (!jwtSecret) {
    console.error(
      "FATAL ERROR: JWT_SECRET is not defined in environment variables.",
    );
    return null;
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return { error: "Unauthorized: Token expired" };
      }
      console.error("JWT Verification Error:", err.message);
      return { error: "Unauthorized: Invalid token" };
    }
    return decoded as CustomJwtPayload;
  });

  return null;
};
