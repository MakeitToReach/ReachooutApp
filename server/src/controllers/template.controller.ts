import prisma from "../config/prisma";
import type { Request, Response } from "express";

// Utility function to check if a project template is expired
const isProjectTemplateExpired = (expiresAt: Date | null): boolean => {
    if (!expiresAt) return false; // No expiry set
    return new Date() > expiresAt;
};

export const getAllTemplates = async (req: Request, res: Response) => {
    const templates = await prisma.template.findMany();

    if (!templates) {
        return res.status(404).json({ error: "Templates not found" });
    }
    return res.status(200).json({ templates });
};

export const getTemplateCategories = async (req: Request, res: Response) => {
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

// DELETE /v1/template/:templateId/categories/:categoryName
export const deleteTemplateCategory = async (req: Request, res: Response) => {
    try {
        const { templateId, categoryName } = req.params;

        // Decode category name in case it contains special characters
        const decodedCategoryName = decodeURIComponent(categoryName);

        const existingCategory = await prisma.templateCategory.findUnique({
            where: {
                templateId_category: {
                    templateId,
                    category: decodedCategoryName,
                },
            },
        });

        if (!existingCategory) {
            return res.status(404).json({
                error: "Template category not found",
            });
        }

        await prisma.templateCategory.delete({
            where: {
                templateId_category: {
                    templateId,
                    category: decodedCategoryName,
                },
            },
        });

        res.json({
            message: "Template category deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting template category:", error);
        res.status(500).json({
            error: "Internal server error",
        });
    }
};

export const publishTemplate = async (req: Request, res: Response) => {
    try {
        const { projectId, templateId, slug, expiryDays } = req.body;
        const { data } = req.body;

        if (![7, 31, 365].includes(expiryDays)) {
            return res.status(400).json({
                error: "Expiry days must be 7, 31, or 365",
            });
        }
        // Validate required fields
        if (!templateId || !projectId) {
            return res.status(400).json({
                error: "Project ID and Template ID are required",
            });
        }

        if (!data || typeof data !== "object") {
            return res.status(400).json({
                error: "Template data is required and must be an object",
            });
        }

        // Verify project exists and user has access
        const project = await prisma.project.findUnique({
            where: { id: projectId },
            include: { user: true },
        });

        if (!project) {
            return res.status(404).json({
                error: "Project not found",
            });
        }

        // Verify template exists
        const template = await prisma.template.findUnique({
            where: { id: templateId },
        });

        if (!template) {
            return res.status(404).json({
                error: "Template not found",
            });
        }

        // const expiresAtDate = new Date(Date.now() + expiryDays * 24 * 60 * 60 * 1000); 
        const expiresAtDate = new Date(Date.now() + 1 * 10 * 1000);//testing only

        // Normalize slug: treat empty or whitespace-only as null
        const finalSlug =
            typeof slug === "string" && slug.trim() !== "" ? slug.trim() : null;

        // Check for slug conflicts (including null slugs)
        const existingSlug = await prisma.projectTemplate.findFirst({
            where: {
                projectId,
                slug: finalSlug,
            },
        });
        if (existingSlug) {
            return res.status(409).json({
                error:
                    "Slug already exists in this project. Please choose a different slug.",
            });
        }

        // Get the highest order number for this project
        const maxOrderResult = await prisma.projectTemplate.findFirst({
            where: { projectId },
            orderBy: { order: "desc" },
            select: { order: true },
        });

        const nextOrder = (maxOrderResult?.order ?? -1) + 1;

        // Create new template instance (allows multiple instances of same template)
        let projectTemplate;
        try {
            projectTemplate = await prisma.projectTemplate.create({
                data: {
                    projectId,
                    templateId,
                    data: data,
                    expiresAt: expiresAtDate,
                    order: nextOrder,
                    slug: finalSlug, // will be null if not provided or empty
                },
                include: {
                    template: {
                        select: {
                            id: true,
                            name: true,
                            thumbnailUrl: true,
                            tags: true,
                        },
                    },
                },
            });
        } catch (err: any) {
            // Handle unique constraint error for slug
            console.error("Database error details:", {
                code: err.code,
                meta: err.meta,
                target: err.meta?.target,
                message: err.message,
            });

            if (
                err.code === "P2002" &&
                (err.meta?.target?.includes("ProjectTemplate_projectId_slug_key") ||
                    err.meta?.target?.includes("slug"))
            ) {
                return res.status(409).json({
                    error:
                        "DB:Slug already exists in this project. Please choose a different slug.",
                });
            }
            throw err;
        }

        res.status(201).json({
            message: "Template instance added to project successfully",
            projectTemplate,
        });
    } catch (error) {
        console.error("Error adding template instance:", error);
        res.status(500).json({
            error: "Internal server error",
        });
    }
};

export const updateTemplateInstance = async (req: Request, res: Response) => {
    try {
        const { projectId, templateId, data, order } = req.body;

        // Validate required fields
        if (!projectId || !templateId) {
            return res.status(400).json({
                error: "Project ID and Template ID are required",
            });
        }

        if (!data || typeof data !== "object") {
            return res.status(400).json({
                error: "Template data is required and must be an object",
            });
        }

        // Verify project exists and user has access
        const project = await prisma.project.findUnique({
            where: { id: projectId },
            include: { user: true },
        });

        if (!project) {
            return res.status(404).json({
                error: "Project not found",
            });
        }

        // Find the specific template instance
        const existingInstance = await prisma.projectTemplate.findFirst({
            where: {
                projectId,
                templateId,
            },
        });

        if (!existingInstance) {
            return res.status(404).json({
                error: "Template instance not found",
            });
        }

        // Update the existing instance without deleting it
        const updatedProjectTemplate = await prisma.projectTemplate.update({
            where: {
                projectId_templateId_order: {
                    projectId,
                    templateId,
                    order: order !== undefined ? order : existingInstance.order,
                },
            },
            data: {
                data: data,
                order: order !== undefined ? order : existingInstance.order,
            },
            include: {
                template: {
                    select: {
                        id: true,
                        name: true,
                        thumbnailUrl: true,
                        tags: true,
                    },
                },
            },
        });

        res.status(200).json({
            message: "Template instance updated successfully",
            projectTemplate: updatedProjectTemplate,
        });
    } catch (error) {
        console.error("Error updating template instance:", error);
        res.status(500).json({
            error: "Internal server error",
        });
    }
};

export const getProjectTemplateInstanceData = async (
    req: Request<{ templateId: string }>,
    res: Response,
) => {
    try {
        const { templateId } = req.params;
        const { order, pid } = req.query;

        if (!templateId) {
            return res.status(400).json({ error: "Missing templateId parameter" });
        }
        if (!pid) {
            return res
                .status(400)
                .json({ error: "Missing projectId (pid) query parameter" });
        }
        if (order === undefined || isNaN(Number(order))) {
            return res
                .status(400)
                .json({ error: "Invalid or missing order query parameter" });
        }

        const templateInstance = await prisma.projectTemplate.findFirst({
            where: {
                templateId,
                order: Number(order),
                projectId: pid as string,
            },
        });

        if (!templateInstance) {
            return res.status(404).json({ error: "Template instance not found" });
        }

        // Check if template is expired
        if (isProjectTemplateExpired(templateInstance.expiresAt)) {
            return res.status(410).json({
                error: "Project expired",
                message: "project expired",
                template: null,
            });
        }

        return res.status(200).json({ template: templateInstance });
    } catch (error) {
        console.error("Error fetching template instance:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteTemplateInstanceByOrder = async (
    req: Request,
    res: Response,
) => {
    try {
        const { projectId, slug } = req.params;

        // Delete using the composite unique constraint
        const deletedTemplate = await prisma.projectTemplate.deleteMany({
            where: {
                projectId,
                slug,
            },
        });

        if (deletedTemplate.count === 0) {
            return res.status(404).json({
                error: "Template instance not found",
            });
        }

        const newTemplates = await prisma.projectTemplate.findMany({
            where: {
                projectId,
            },
            include: {
                template: {
                    select: {
                        id: true,
                        name: true,
                        thumbnailUrl: true,
                        tags: true,
                    },
                },
                project: {
                    select: {
                        id: true,
                        name: true,
                        subDomain: true,
                        customDomain: true,
                    },
                },
            },
        });

        res.status(200).json({
            message: "Template instance deleted successfully",
            templates: newTemplates,
        });
    } catch (error) {
        console.error("Error deleting template instance:", error);
        res.status(500).json({
            error: "Internal server error",
        });
    }
};

export const checkSlug = async (req: Request, res: Response) => {
    const { projectId, pageSlug } = req.params;

    if (!projectId || !pageSlug) {
        return res.status(400).json({ error: "Missing projectId or pageSlug" });
    }

    const project = await prisma.project.findUnique({
        where: { id: projectId as string },
    });

    if (!project) {
        return res.status(404).json({ error: "HERE:Project not found" });
    }

    //TODO: move this to a config file
    const unavailableSlugs = [
        "pricing",
        "test",
        "explore",
        "admin",
        "user",
        "success",
        "preview",
        "editor",
        "dashboard",
    ];

    if (unavailableSlugs.includes(pageSlug as string)) {
        return res.status(409).json({
            available: false,
        });
    }

    if (pageSlug) {
        const existingSlug = await prisma.projectTemplate.findFirst({
            where: {
                projectId: projectId as string,
                slug: pageSlug as string,
            },
        });
        if (existingSlug) {
            return res.status(409).json({
                available: false,
            });
        }
    }

    return res.status(200).json({ available: true });
};

export const getCategoryByTemplateIdAndCategoryName = async (
    req: Request,
    res: Response,
) => {
    try {
        const { templateId, categoryName } = req.params;

        const decodedCategoryName = decodeURIComponent(categoryName);

        console.log(decodedCategoryName);

        const category = await prisma.templateCategory.findFirst({
            where: {
                templateId: templateId as string,
                category: decodedCategoryName,
            },
        });

        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }

        return res.status(200).json({ category: category.data });
    } catch (error) {
        console.error(
            "Error fetching category by templateId and categoryName:",
            error,
        );
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const setTemplateExpiry = async (req: Request, res: Response) => {
    try {
        const { projectId, templateId, order, expiryDays } = req.body;

        // Validate required fields
        if (!projectId || !templateId) {
            return res.status(400).json({
                error: "Project ID and Template ID are required",
            });
        }

        // Verify project exists and user has access
        const project = await prisma.project.findUnique({
            where: { id: projectId },
            include: { user: true },
        });

        if (!project) {
            return res.status(404).json({
                error: "Project not found",
            });
        }

        // Find the specific template instance
        const templateInstance = await prisma.projectTemplate.findFirst({
            where: {
                projectId,
                templateId,
                order: order || 0,
            },
        });

        if (!templateInstance) {
            return res.status(404).json({
                error: "Template instance not found",
            });
        }


        const newExpiryDate = new Date(Date.now() + expiryDays * 24 * 60 * 60 * 1000);
        // Update the template with expiry
        const updatedTemplate = await prisma.projectTemplate.update({
            where: {
                projectId_templateId_createdAt: {
                    projectId,
                    templateId,
                    createdAt: templateInstance.createdAt,
                },
            },
            data: {
                expiresAt: newExpiryDate,
            },
            include: {
                template: {
                    select: {
                        id: true,
                        name: true,
                        thumbnailUrl: true,
                        tags: true,
                    },
                },
            },
        });

        res.status(200).json({
            message: "Template expiry updated successfully",
            projectTemplate: updatedTemplate,
        });
    } catch (error) {
        console.error("Error updating template expiry:", error);
        res.status(500).json({
            error: "Internal server error",
        });
    }
};
