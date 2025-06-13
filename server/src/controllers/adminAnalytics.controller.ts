import type {Request, Response} from "express";
import prisma from "../config/prisma";

export const getTotalUserCount = async (req: Request, res: Response) => {
    try {
        const userCount = await prisma.user.count();
        res.status(200).json({ userCount });
    } catch (error) {
        console.error("Error fetching user count:", error);
        res.status(500).json({ error: "Failed to process request" });
    }
};

export const getTotalProjectCount = async (req: Request, res: Response) => {
    try {
        const projectCount = await prisma.project.count();
        res.status(200).json({ projectCount });
    } catch (error) {
        console.error("Error fetching project count:", error);
        res.status(500).json({ error: "Failed to process request" });
    }
};

