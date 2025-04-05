import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import type { Request, Response } from "express"; // Import Request & Response
import { JWT_SECRET } from "../config/dotenv";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

interface registerUserBody {
  name: string;
  email: string;
  password: string;
}
export const register = async (
  req: Request<{}, {}, registerUserBody>,
  res: Response,
) => {
  try {
    const { name, email, password } = req.body;

    const formattedName = name.toLowerCase();
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { name: formattedName },
    });
    if (existingUser) {
      return res.status(400).json({ error: "Username already taken" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: { name: formattedName, email, password: hashedPassword },
    });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "24h",
    });
    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.cookie("token", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none", // Needed for cross-site cookies
      domain: "reachoout.vercel.app", // Restrict to your frontend
      // path: "/",
    });
    res.status(201).json({ user: userWithoutPassword, token });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "User creation failed" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { name, password } = req.body;

    // Find user by email
    const formattedName = name.toLowerCase();
    const user = await prisma.user.findUnique({
      where: { name: formattedName },
    });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "24h",
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.cookie("token", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none", // Needed for cross-site cookies
      domain: "reachoout.vercel.app", // Restrict to your frontend
      // path: "/",
    });
    res.status(200).json({ user: userWithoutPassword, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
};

export const getUserFromToken = async (req: Request, res: Response) => {
  try {
    const id = req.user?.userId;

    const user = await prisma.user.findUnique({
      where: { id: id },
    });
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user from token:", error);
    res.status(500).json({ error: "Failed to process request" });
  }
};
