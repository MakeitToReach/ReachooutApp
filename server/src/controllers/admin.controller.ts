// TODO:Add an admin table in the database
import { Request, Response } from "express";
import { ADMIN_PASSWORD, ADMIN_USERNAME } from "../config/dotenv";

export const loginAdmin = (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Unauthorized, Invalid credentials" });
    }
  } catch (error) {
    console.error("Error logging in admin:", error);
    res.status(500).json({ error: "Server error, Failed to process request" });
  }
};
