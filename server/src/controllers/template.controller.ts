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
    const { projectId, templateId, slug } = req.body;
    const { data } = req.body;

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

    let finalSlug =
      typeof slug === "string" && slug !== "undefined" ? slug : "";
    if (finalSlug !== "") {
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
          order: nextOrder,
          slug: finalSlug,
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
      if (err.code === "P2002" && err.meta?.target?.includes("slug")) {
        return res.status(409).json({
          error:
            "Slug already exists in this project. Please choose a different slug.",
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
        error: "Project ID, Template ID, and Created At timestamp are required",
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

    // Delete the old instance and create a new one with updated data
    // (This is necessary due to the composite key constraint)
    await prisma.projectTemplate.deleteMany({
      where: {
        projectId,
        templateId,
      },
    });

    const updatedProjectTemplate = await prisma.projectTemplate.create({
      data: {
        projectId,
        templateId,
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

    return res.status(200).json({ template: templateInstance });
  } catch (error) {
    console.error("Error fetching template instance:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
