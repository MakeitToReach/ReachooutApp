import prisma from "../config/prisma";
import type { Request, Response } from "express";

// Route to associate a user with an existing template
export const addUserTemplate = async (req: Request, res: Response) => {
    try {
        //fetch the userId from the headers instead of body

        const userId = req.user?.userId;
        const { templateId, data } = req.body;

        // Validate required fields
        if (!templateId || !data) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Find the user
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Find the template
        const template = await prisma.template.update({
            where: { id: templateId },
            data: { data },
        });

        if (!template) {
            return res.status(404).json({ error: "Template not found" });
        }

        // Check if the association already exists
        const existingAssociation = await prisma.userTemplate.findUnique({
            where: {
                user_id_template_id: {
                    user_id: userId,
                    template_id: templateId,
                },
            },
        });

        // If association already exists, return it
        if (existingAssociation) {
            return res.status(200).json({
                message: "Association already exists",
                association: existingAssociation,
            });
        }

        // Create the association
        const association = await prisma.userTemplate.create({
            data: {
                user_id: userId,
                template_id: templateId,
            },
        });

        return res.status(201).json({
            message: "User-template association created successfully",
            association,
            template: template,
        });
    } catch (error) {
        console.error("Error associating user with template:", error);
        return res.status(500).json({ error: "Failed to process request" });
    }
};

export const createTemplate = async (req: Request, res: Response) => {
    try {
        const { name, data, thumbnailUrl = "" } = req.body;

        // Validate required fields
        if (!name || !data) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Check if template with this name already exists
        const existingTemplate = await prisma.template.findUnique({
            where: { name },
        });

        if (existingTemplate) {
            return res.status(409).json({
                error: "Template with this name already exists",
                template: existingTemplate,
            });
        }

        // Create new template
        const newTemplate = await prisma.template.create({
            data: {
                name,
                thumbnailUrl,
                data,
            },
        });

        return res.status(201).json({
            message: "Template created successfully",
            template: newTemplate,
        });
    } catch (error) {
        console.error("Error creating template:", error);
        return res.status(500).json({ error: "Failed to process request" });
    }
};

export const updateTemplate = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, data, thumbnailUrl } = req.body;

        // Validate that there's something to update
        if (!name && !data && thumbnailUrl === undefined) {
            return res.status(400).json({ error: "No update data provided" });
        }

        // Check if template exists
        const existingTemplate = await prisma.template.findUnique({
            where: { id },
        });

        if (!existingTemplate) {
            return res.status(404).json({ error: "Template not found" });
        }

        // Build update data
        const updateData: any = {};
        if (name) updateData.name = name;
        if (data) updateData.data = data;
        if (thumbnailUrl !== undefined) updateData.thumbnailUrl = thumbnailUrl;

        // Update template
        const updatedTemplate = await prisma.template.update({
            where: { id },
            data: updateData,
        });

        return res.status(200).json({
            message: "Template updated successfully",
            template: updatedTemplate,
        });
    } catch (error) {
        console.error("Error updating template:", error);
        return res.status(500).json({ error: "Failed to process request" });
    }
};

export const getUserTemplates = async (req: Request, res: Response) => {
    try {
        //fetch the userId from the headers instead of body
        // const { userId } = req.body;
        const userId = req.user?.userId;

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                templates: true,
            },
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const template = await prisma.template.findMany({
            where: {
                id: {
                    in: user.templates.map((template) => template.template_id),
                },
            },
        });

        return res.status(200).json({ templates: template });
    } catch (error) {
        console.error("Error fetching user templates:", error);
        return res.status(500).json({ error: "Failed to process request" });
    }
};

export const getAllTemplates = async (req: Request, res: Response) => {
    const templates = await prisma.template.findMany();

    if (!templates) {
        return res.status(404).json({ error: "Templates not found" });
    }
    return res.status(200).json({ templates });
};
