import prisma from "../config/prisma";
import type { Request, Response } from "express";

// Route to associate a user with an existing template
// export const addUserTemplate = async (req: Request, res: Response) => {
//     try {
//         const userId = req.user?.id;
//         const { templateName, data } = req.body;

//         if (!templateName || !data) {
//             return res.status(400).json({ error: "Missing required fields" });
//         }

//         // Find the user
//         const user = await prisma.user.findUnique({
//             where: { id: userId },
//         });

//         if (!user) {
//             return res.status(404).json({ error: "User not found" });
//         }

//         // Find the template
//         const template = await prisma.template.findUnique({
//             where: { name: templateName },
//         });

//         if (!template) {
//             return res.status(404).json({ error: "Template not found" });
//         }

//         // Check if the association already exists
//         const existingAssociation = await prisma.userTemplate.findUnique({
//             where: {
//                 user_id_template_id: {
//                     user_id: userId!,
//                     template_id: template.id,
//                 },
//             },
//         });

//         // If association already exists, return it
//         if (existingAssociation) {
//             return res.status(200).json({
//                 message: "Association already exists",
//                 association: existingAssociation,
//             });
//         }

//         // Create the association
//         const association = await prisma.userTemplate.create({
//             data: {
//                 user_id: userId!,
//                 template_id: template.id,
//                 data: data,
//             },
//         });

//         return res.status(201).json({
//             message: "User-template association created successfully",
//             association,
//             template: template,
//         });
//     } catch (error) {
//         console.error("Error associating user with template:", error);
//         return res.status(500).json({ error: "Failed to process request" });
//     }
// };

// export const getUserTemplateData = async (req: Request, res: Response) => {
//     try {
//         const userId = req.user?.id;
//         const { templateName } = req.params;

//         const userTemplate = await prisma.userTemplate.findFirst({
//             where: {
//                 user_id: userId,
//                 template: {
//                     name: templateName,
//                 },
//             },
//             include: { template: true },
//         });

//         const userTemplateData = userTemplate?.data;

//         res.setHeader("Cache-Control", "no-store");
//         return res.status(200).json({ userTemplateData });
//     } catch (error) {
//         console.error("Error fetching user template:", error);
//         return res.status(500).json({ error: "Failed to process request" });
//     }
// };

export const getAllTemplates = async (req: Request, res: Response) => {
    const templates = await prisma.template.findMany();

    if (!templates) {
        return res.status(404).json({ error: "Templates not found" });
    }
    return res.status(200).json({ templates });
};

export const getTemplateCategories = async (
    req: Request,
    res: Response,
) => {
    const { templateId } = req.params;
    const categories = await prisma.templateCategory.findMany({
        where: {
            templateId,
        },
    });
    if (!categories) {
        return res.status(404).json({ error: "Categories not found" });
    }
    return res.status(200).json({ categories });
};

// export const publishTemplate = async (req: Request, res: Response) => {
//     const { templateName, data } = req.body;
//     const template = await prisma.projectTemplate.create({
//         where: {
//             name: templateName,
//         },
//         data: {
//             name: templateName,
//             data,
//         },
//     });
//     return res.status(200).json({ template });
// };

// export const getUserTemplates = async (req: Request, res: Response) => {
//     try {
//         const userId = req.user?.id;

//         const userTemplates = await prisma.userTemplate.findMany({
//             where: {
//                 user_id: userId,
//             },
//             include: {
//                 template: true,
//             },
//         });

//         if (userTemplates.length === 0) {
//             return res.status(404).json({ message: "No templates found" });
//         }

//         const formattedTemplates = userTemplates.map((template) => {
//             return {
//                 id: template.template_id,
//                 name: template.template.name,
//                 thumbnailUrl: template.template.thumbnailUrl,
//             };
//         });

//         return res.status(200).json({ userTemplates: formattedTemplates });
//     } catch (error) {
//         console.error("Error fetching user templates:", error);
//         return res.status(500).json({
//             message: "Internal server error",
//             // error: process.env.NODE_ENV === "development" ? error.message : undefined,
//         });
//     }
// };

// export const updateUserTemplateData = async (req: Request, res: Response) => {
//     try {
//         const templateId = req.params.template_id;
//         const { data } = req.body;
//         const userId = req.user?.id;

//         if (!userId || !templateId) {
//             return res.status(400).json({ error: "Missing userId or templateId" });
//         }

//         const existingRecord = await prisma.userTemplate.findUnique({
//             where: {
//                 user_id_template_id: {
//                     user_id: userId,
//                     template_id: templateId,
//                 },
//             },
//         });

//         if (!existingRecord) {
//             return res.status(404).json({ error: "UserTemplate entry not found." });
//         }

//         const updatedUserTemplateData = await prisma.userTemplate.update({
//             where: {
//                 user_id_template_id: {
//                     user_id: userId,
//                     template_id: templateId,
//                 },
//             },
//             data: {
//                 data,
//             },
//         });

//         return res.status(200).json({ updatedUserTemplateData });
//     } catch (error: any) {
//         return res.status(500).json({ error: error.message || "Server error" });
//     }
// };
