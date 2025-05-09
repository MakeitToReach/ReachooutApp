import prisma from "../config/prisma";
import type { Request, Response } from "express";

// Route to associate a user with an existing template
export const addUserTemplate = async (req: Request, res: Response) => {
    try {
        //fetch the userId from the headers instead of body
        const userId = req.user?.userId;
        const { templateName, data } = req.body;

        // Validate required fields
        if (!templateName || !data) {
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
        const template = await prisma.template.findUnique({
            where: { name: templateName },
        });

        if (!template) {
            return res.status(404).json({ error: "Template not found" });
        }

        // Check if the association already exists
        const existingAssociation = await prisma.userTemplate.findUnique({
            where: {
                user_id_template_id: {
                    user_id: userId,
                    template_id: template.id,
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
                template_id: template.id,
                data: data,
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

export const getUserTemplateData = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId;
        const { templateName } = req.params;

        const userTemplate = await prisma.userTemplate.findFirst({
            where: {
                user_id: userId,
                template: {
                    name: templateName,
                },
            },
            include: { template: true },
        });

        const userTemplateData = userTemplate?.data;

        res.setHeader("Cache-Control", "no-store");
        return res.status(200).json({ userTemplateData });
    } catch (error) {
        console.error("Error fetching user template:", error);
        return res.status(500).json({ error: "Failed to process request" });
    }
};

//ADMIN
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

//ADMIN
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

export const getAllTemplates = async (req: Request, res: Response) => {
    const templates = await prisma.template.findMany();

    if (!templates) {
        return res.status(404).json({ error: "Templates not found" });
    }
    return res.status(200).json({ templates });
};

export const getUserTemplates = async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    const userTemplates = await prisma.userTemplate.findMany({
        where: {
            user_id: userId,
        },
        include: {
            template: true,
        },
    });

    if (userTemplates.length === 0) {
        res.status(404).json({ error: "No templates found" });
    }

    const formattedTemplates = userTemplates.map((template) => {
        return {
            id: template.template_id,
            name: template.template.name,
            thumbnailUrl: template.template.thumbnailUrl,
        };
    });
    return res.status(200).json({ userTemplates: formattedTemplates });
};

export const updateUserTemplateData = async (req: Request, res: Response) => {
    const templateId = req.params.id;
    const { data } = req.body;
    const userId = req.user?.userId;

    const updatedUserTemplateData = await prisma.userTemplate.update({
        where: {
            user_id_template_id: {
                user_id: userId,
                template_id: templateId,
            },
        },
        data: {
            data,
        },
    });
    return res.status(200).json({ updatedUserTemplateData });
};
