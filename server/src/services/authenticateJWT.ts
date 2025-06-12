import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/dotenv";

export const authenticateJWT = (token: string): Express.User | null => {
    const jwtSecret = JWT_SECRET;
    if (!jwtSecret) {
        console.error("FATAL ERROR: JWT_SECRET is not defined in environment variables.");
        return null;
    }

    try {
        const decoded = jwt.verify(token, jwtSecret) as Express.User;

        // Validate payload structure
        if (!decoded || !decoded.id) {
            console.error("JWT payload missing required user identifier field.");
            return null;
        }

        return decoded;
    } catch (err: any) {
        if (err.name === "TokenExpiredError") {
            console.error("Unauthorized: Token expired");
            return null;
        }
        console.error("JWT Verification Error:", err.message);
        return null;
    }
};
