import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import authRouter from "./routes/auth.routes";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Express + TypeScript Server is running!");
});

app.use(cors());
app.use("/v1/auth", authRouter);

// Get all users
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
