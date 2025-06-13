import { Request, Response } from "express";
import prisma from "../config/prisma";

export const createProject = async (
    req: Request<{}, {}, { name: string }>,
    res: Response,
) => {
    const { name } = req.body;
    const userId = req.user?.id;

    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    const existingProject = await prisma.project.findFirst({
        where: { name, userId },
    });

    if (existingProject) {
        return res
            .status(409)
            .json({ error: "Project with this name already exists" });
    }

    const parsedUsername = (user.name ?? "user")
        .split(" ")
        .join("")
        .toLowerCase();

    const uuidv4 = () => {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
            const r = (Math.random() * 16) | 0,
                v = c == "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    };

    const project = await prisma.project.create({
        data: {
            name,
            subDomain: `${parsedUsername}-${uuidv4()}.reachoout.com`,
            user: {
                connect: {
                    id: userId,
                },
            },
        },
    });

    if (!project) {
        return res.status(500).json({ error: "Failed to create project" });
    }

    return res.status(201).json({
        project,
        message: "Project created successfully",
    });
};

export const addCustomDomain = async (
    req: Request<{}, {}, { customDomain: string; projectId: string }>,
    res: Response,
) => {
    const { customDomain, projectId } = req.body;
    const userId = req.user?.id;

    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    const project = await prisma.project.findUnique({
        where: {
            id: projectId,
        },
    });

    if (!project) {
        return res.status(404).json({ error: "Project not found" });
    }

    const updatedProject = await prisma.project.update({
        where: {
            id: projectId,
        },
        data: {
            customDomain: customDomain,
        },
    });

    if (!updatedProject) {
        return res.status(500).json({ error: "Failed to update project" });
    }

    return res.status(200).json({
        project: updatedProject,
        message: "Project updated successfully",
    });
};

export const addTemplateToProject = async (
    req: Request<{}, {}, { templateId: string; projectId: string }>,
    res: Response,
) => {
    const { templateId, projectId } = req.body;
    const userId = req.user?.id;

    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });

    if (!user) {
        res.status(404).json({ error: "User not found" });
    }

    const template = await prisma.template.findUnique({
        where: {
            id: templateId,
        },
    });

    const project = await prisma.project.findUnique({
        where: {
            id: projectId,
        },
    });

    if (!template || !project) {
        return res.status(404).json({ error: "Template or Project not found" });
    }

    const addedTemplate = await prisma.projectTemplate.create({
        data: {
            project: {
                connect: {
                    id: projectId,
                },
            },
            template: {
                connect: {
                    id: templateId,
                },
            },
        },
    });

    if (!addedTemplate) {
        return res.status(500).json({ error: "Failed to add template to project" });
    }

    return res.status(200).json({
        project: addedTemplate,
        message: "Template added to project successfully",
    });
};

export const getUserProjects = async (req: Request, res: Response) => {
    const userId = req.user?.id;

    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    const projects = await prisma.project.findMany({
        where: {
            userId: userId,
        },
    });
    if (!projects) {
        return res.status(404).json({ error: "Projects not found" });
    }

    res.status(200).json(projects);
};

export const getTemplatesInProject = async (
    req: Request<{ projectId: string }>,
    res: Response,
) => {
    const { projectId } = req.params;
    const templates = await prisma.projectTemplate.findMany({
        where: {
            projectId: projectId,
        },
        include: {
            template: true,
        },
    });
    if (!templates || templates.length === 0) {
        return res.status(404).json({ error: "Templates not found" });
    }
    res.status(200).json(templates);
};
