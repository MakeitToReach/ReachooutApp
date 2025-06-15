// TODO:Add an admin table in the database
import { Request, Response } from "express";
import { ADMIN_PASSWORD, ADMIN_USERNAME } from "../config/dotenv";
import prisma from "../config/prisma";

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

export const createTemplate = async (
  req: Request<
    {},
    {},
    {
      name: string;
      thumbnailUrl: string;
      tags: string[];
      categories: { category: string; data: any }[];
    }
  >,
  res: Response,
) => {
  try {
    const { name, thumbnailUrl = "", tags, categories } = req.body;

    // Validate required fields
    if (!name || !tags || !categories) {
      return res.status(400).json({
        error: "Missing required fields",
        requiredFields: ["name", "tags", "categories"],
      });
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
        tags,
        categories: {
          create: categories,
        },
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
    const { name, tags, thumbnailUrl } = req.body;

    // Validate that there's something to update
    if (!name && !tags && thumbnailUrl === undefined) {
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
    if (tags) updateData.tags = tags;
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

export const addTemplateCategoryData = async (
  req: Request<{ templateId: string }, {}, { category: string; data: any }>,
  res: Response,
) => {
  try {
    const { templateId } = req.params,
      { category, data } = req.body;

    // Validate required fields
    if (!templateId || !data || !category) {
      return res.status(400).json({
        error: "Missing required fields",
        requiredFields: ["id(params)", "category", "data"],
      });
    }

    // Check if template with this name already exists
    const existingTemplate = await prisma.template.findUnique({
      where: { id: templateId },
    });

    if (!existingTemplate) {
      return res.status(404).json({ error: "Template not found" });
    }

    const updatedTemplate = await prisma.template.update({
      where: { id: templateId },
      data: {
        categories: {
          create: {
            category,
            data,
          },
        },
      },
    });

    if (!updatedTemplate) {
      return res.status(404).json({ error: "Template not found" });
    }

    return res.status(200).json({
      message: "Category data added successfully",
      template: updatedTemplate,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    return res.status(500).json({ error: "Failed to process request" });
  }
};

export const createTemplateCategory = async (req: Request, res: Response) => {
  try {
    const { templateId } = req.params;
    const { category, data } = req.body;

    // Validate required fields
    if (!category) {
      return res.status(400).json({
        error: "Category name is required",
      });
    }

    if (!data) {
      return res.status(400).json({
        error: "Category data is required",
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

    // Check if category already exists for this template
    const existingCategory = await prisma.templateCategory.findUnique({
      where: {
        templateId_category: {
          templateId,
          category,
        },
      },
    });

    if (existingCategory) {
      return res.status(409).json({
        error: "Category already exists for this template",
      });
    }

    let parsedData;

    try {
      parsedData = JSON.parse(data);
    } catch (err: any) {
      return res.status(400).json({
        error: "Invalid JSON format",
      });
    }

    // Create the category
    const templateCategory = await prisma.templateCategory.create({
      data: {
        templateId,
        category,
        data: parsedData,
      },
      include: {
        template: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    res.status(201).json({
      message: "Template category created successfully",
      category: templateCategory,
    });
  } catch (error) {
    console.error("Error creating template category:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
