import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
// import { CustomJwtPayload } from "../types/express"; // Adjust path if needed
import { JWT_SECRET } from "../config/dotenv";

export const isAuthenticated = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    // 1. Get the token from the Authorization header
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1]; // Extract token after "Bearer "

        // 2. Get the JWT Secret (NEVER hardcode this in production!)
        const jwtSecret = JWT_SECRET;
        if (!jwtSecret) {
            console.error(
                "FATAL ERROR: JWT_SECRET is not defined in environment variables.",
            );
            return;
            // Or throw new Error('JWT_SECRET must be defined'); // To stop the server startup
        }

        // 3. Verify the token
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    return res.status(401).json({ error: "Unauthorized: Token expired" });
                }
                console.error("JWT Verification Error:", err.message);
                return res.status(401).json({ error: "Unauthorized: Invalid token" });
            }

            // 4. Attach decoded payload (user info) to the request object
            // We cast 'decoded' to our custom payload type for type safety
            req.user = decoded as Express.User;
            // 5. Check if the essential user ID exists on the decoded payload
            // For admin, check isAdmin flag
            if (!req.user || (!req.user.id && !req.user.isAdmin)) {
                console.log("JWT PAYLOAD: ", req.user);
                // Ensure 'id' or 'isAdmin' matches your payload field
                console.error("JWT payload missing required user identifier field or isAdmin flag.");
                return res
                    .status(401)
                    .json({ error: "Unauthorized: Invalid token payload" });
            }
            // If this is an admin route, require isAdmin: true
            if (req.baseUrl.includes('/admin') && !req.user.isAdmin) {
                return res.status(403).json({ error: "Forbidden: Admin access required" });
            }

            // 6. Proceed to the next middleware or route handler
            next();
        });
    } else {
        // No token provided or header malformed
        res.status(401).json({ error: "Unauthorized: No token provided" });
    }
};
