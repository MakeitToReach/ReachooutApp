import { Request, Response } from "express";
import prisma from "../config/prisma";
import { isProjectTemplateExpired } from "../utils/expiry";

export const createProject = async (
  req: Request<{}, {}, { name: string; description: string }>,
  res: Response,
) => {
  const { name, description } = req.body;
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
    .toLowerCase()
    .replace(/[^a-z0-9]/g, ""); // Remove special characters

  const generateSubdomain = () => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `${parsedUsername}-${timestamp}-${random}`;
  };

  const project = await prisma.project.create({
    data: {
      name,
      description,
      subDomain: generateSubdomain(),
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
    include: {
      templates: true,
    },
  });

  if (!projects) {
    return res.status(404).json({ error: "Projects not found" });
  }

  // Find projects that have no templates
  const projectsToDelete = projects.filter(
    (project) => project.templates.length === 0,
  );

  if (projectsToDelete.length > 0) {
    await Promise.all(
      projectsToDelete.map((project) =>
        prisma.project
          .delete({
            where: { id: project.id },
          })
          .catch((err) => {
            console.error(
              `Failed to delete project with id ${project.id}:`,
              err,
            );
          }),
      ),
    );
  }

  // Filter out projects that have no templates
  const projectsWithTemplates = projects.filter(
    (project) => project.templates.length > 0,
  );

  res.status(200).json(projectsWithTemplates);
};

export const getTemplatesInProject = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const { id } = req.params;
  const templates = await prisma.projectTemplate.findMany({
    where: {
      projectId: id,
    },
    include: {
      template: true,
      project: true,
    },
    orderBy: {
      order: "asc",
    },
  });

  // Filter out expired templates
  // const activeTemplates = templates.filter((template) => !isProjectTemplateExpired(template.expiresAt));
  //
  // if (!activeTemplates || activeTemplates.length === 0) {
  //   return res.status(404).json({ error: "Templates not found" });
  // }
  if (!templates) {
    return res.status(404).json({ error: "Templates not found" });
  }
  res.status(200).json(templates);
};

export const deleteProjectById = async (req: Request, res: Response) => {
  const { id: projectId } = req.params;
  try {
    await prisma.project.delete({
      where: { id: projectId },
    });
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project", error);
    res.status(500).json({ error: "Error Deleting Project" });
  }
};

export const getProjectBySubdomain = async (req: Request, res: Response) => {
  try {
    const { subdomain } = req.params;

    if (!subdomain) {
      return res.status(400).json({ error: "Subdomain is required" });
    }

    const project = await prisma.project.findUnique({
      where: {
        subDomain: subdomain,
      },
      include: {
        templates: {
          include: {
            template: true,
          },
          orderBy: {
            order: "asc",
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Transform the data to match the expected format and filter out expired templates
    const transformedProject = {
      id: project.id,
      name: project.name,
      subDomain: project.subDomain,
      customDomain: project.customDomain,
      faviconUrl: project.faviconUrl,
      user: project.user,
      templates: project.templates
        .filter((pt) => !isProjectTemplateExpired(pt.expiresAt))
        .map((pt) => ({
          templateId: pt.templateId,
          data: pt.data as any,
          order: pt.order,
          template: {
            id: pt.template.id,
            name: pt.template.name,
            thumbnailUrl: pt.template.thumbnailUrl,
          },
        })),
    };

    res.status(200).json(transformedProject);
  } catch (error) {
    console.error("Error fetching project by subdomain:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProjectByCustomDomain = async (req: Request, res: Response) => {
  try {
    const { customDomain } = req.params;
    console.log("Custom domain request", customDomain);

    if (!customDomain) {
      return res.status(400).json({ error: "Custom domain is required" });
    }

    // Fetch the project (without templates)
    const project = await prisma.project.findFirst({
      where: { customDomain },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Fetch templates separately with order applied
    const templates = await prisma.projectTemplate.findMany({
      where: { projectId: project.id },
      include: { template: true },
      orderBy: { order: "asc" },
    });

    // Transform the data to match your expected format and filter out expired templates
    const transformedProject = {
      id: project.id,
      name: project.name,
      subDomain: project.subDomain,
      description: project.description,
      customDomain: project.customDomain,
      faviconUrl: project.faviconUrl,
      user: project.user,
      templates: templates
        .filter((pt) => !isProjectTemplateExpired(pt.expiresAt))
        .map((pt) => ({
          templateId: pt.templateId,
          data: pt.data as any,
          order: pt.order,
          template: {
            id: pt.template.id,
            name: pt.template.name,
            thumbnailUrl: pt.template.thumbnailUrl,
          },
        })),
    };

    res.status(200).json(transformedProject);
  } catch (error) {
    console.error("Error fetching project by custom domain:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const checkSubdomainAvailability = async (
  req: Request,
  res: Response,
) => {
  try {
    const { subdomain } = req.params;

    const unavailableSubdomains = ["www", "admin", "api", "assets", "app"];

    if (!subdomain) {
      return res.status(400).json({ error: "Subdomain is required" });
    }

    if (unavailableSubdomains.includes(subdomain)) {
      return res.status(400).json({ error: "Subdomain is not available" });
    }

    // Check if subdomain is valid (alphanumeric and hyphens only)
    const subdomainRegex = /^[a-z0-9-]+$/;
    if (!subdomainRegex.test(subdomain)) {
      return res.status(400).json({
        error:
          "Subdomain can only contain lowercase letters, numbers, and hyphens",
      });
    }

    // Check if subdomain is too short or too long
    if (subdomain.length < 2 || subdomain.length > 63) {
      return res.status(400).json({
        error: "Subdomain must be between 2 and 63 characters long",
      });
    }

    // Check if subdomain starts or ends with hyphen
    if (subdomain.startsWith("-") || subdomain.endsWith("-")) {
      return res.status(400).json({
        error: "Subdomain cannot start or end with a hyphen",
      });
    }

    // Check if subdomain is already taken
    const existingProject = await prisma.project.findUnique({
      where: {
        subDomain: subdomain,
      },
    });

    if (existingProject) {
      return res.status(409).json({
        available: false,
        error: "Subdomain is already taken",
      });
    }

    return res.status(200).json({
      available: true,
      message: "Subdomain is available",
    });
  } catch (error) {
    console.error("Error checking subdomain availability:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateProjectSubdomain = async (
  req: Request<{}, {}, { projectId: string; newSubdomain: string }>,
  res: Response,
) => {
  try {
    const { projectId, newSubdomain } = req.body;
    const userId = req.user?.id;

    if (!projectId || !newSubdomain) {
      return res
        .status(400)
        .json({ error: "Project ID and new subdomain are required" });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if project exists and belongs to user
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId: userId,
      },
    });

    if (!project) {
      return res
        .status(404)
        .json({ error: "Project not found or access denied" });
    }

    // Validate subdomain format
    const subdomainRegex = /^[a-z0-9-]+$/;
    if (!subdomainRegex.test(newSubdomain)) {
      return res.status(400).json({
        error:
          "Subdomain can only contain lowercase letters, numbers, and hyphens",
      });
    }

    // Check if subdomain is too short or too long
    if (newSubdomain.length < 2 || newSubdomain.length > 63) {
      return res.status(400).json({
        error: "Subdomain must be between 2 and 63 characters long",
      });
    }

    // Check if subdomain starts or ends with hyphen
    if (newSubdomain.startsWith("-") || newSubdomain.endsWith("-")) {
      return res.status(400).json({
        error: "Subdomain cannot start or end with a hyphen",
      });
    }

    // Check if new subdomain is already taken by another project
    const existingProject = await prisma.project.findFirst({
      where: {
        subDomain: newSubdomain,
        id: { not: projectId }, // Exclude current project
      },
    });

    if (existingProject) {
      return res.status(409).json({
        error: "Subdomain is already taken by another project",
      });
    }

    // Update the project subdomain
    const updatedProject = await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        subDomain: newSubdomain,
      },
    });

    return res.status(200).json({
      project: updatedProject,
      message: "Project subdomain updated successfully",
    });
  } catch (error) {
    console.error("Error updating project subdomain:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      templates: {
        include: {
          template: true,
        },
        orderBy: {
          order: "asc",
        },
      },
    },
  });

  if (!project) {
    return res.status(404).json({ error: "Project not found" });
  }

  // Transform the data to include SEO fields and filter out expired templates
  const transformedProject = {
    id: project.id,
    name: project.name,
    subDomain: project.subDomain,
    customDomain: project.customDomain,
    faviconUrl: project.faviconUrl,
    description: project.description,
    templates: project.templates
      .filter((pt) => !isProjectTemplateExpired(pt.expiresAt))
      .map((pt) => ({
        projectId: pt.projectId,
        templateId: pt.templateId,
        order: pt.order,
        slug: pt.slug,
        seoTitle: pt.seoTitle,
        seoDescription: pt.seoDescription,
        template: {
          id: pt.template.id,
          name: pt.template.name,
          thumbnailUrl: pt.template.thumbnailUrl,
        },
        createdAt: pt.createdAt,
      })),
  };

  res.status(200).json(transformedProject);
};

export const updateProjectFavicon = async (
  req: Request<{}, {}, { projectId: string; faviconUrl: string }>,
  res: Response,
) => {
  try {
    const { projectId, faviconUrl } = req.body;
    const userId = req.user?.id;

    if (!projectId || !faviconUrl) {
      return res
        .status(400)
        .json({ error: "Project ID and favicon URL are required" });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if project exists and belongs to user
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId: userId,
      },
    });

    if (!project) {
      return res
        .status(404)
        .json({ error: "Project not found or access denied" });
    }

    // Update the project favicon
    const updatedProject = await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        faviconUrl: faviconUrl,
      },
    });

    return res.status(200).json({
      project: updatedProject,
      message: "Project favicon updated successfully",
    });
  } catch (error) {
    console.error("Error updating project favicon:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateProjectMetaData = async (
  req: Request<
    {},
    {},
    { projectId: string; name: string; description: string }
  >,
  res: Response,
) => {
  const { projectId, name, description } = req.body;
  const userId = req.user?.id;

  if (!projectId || !name || !description) {
    return res
      .status(400)
      .json({ error: "Project ID, name, and description are required" });
  }

  const project = await prisma.project.findUnique({
    where: { id: projectId },
  });

  if (!project) {
    return res.status(404).json({ error: "Project not found" });
  }

  const updatedProject = await prisma.project.update({
    where: { id: projectId },
    data: { name, description },
  });

  return res.status(200).json({
    project: updatedProject,
    message: "Project meta data updated successfully",
  });
};

export const getProjectBySubdomainAndSlug = async (
  req: Request,
  res: Response,
) => {
  const { subdomain, slug } = req.params;
  const project = await prisma.project.findUnique({
    where: { subDomain: subdomain },
    include: {
      templates: {
        where: { slug: slug },
      },
    },
  });

  if (!project) {
    return res.status(404).json({ error: "Project not found" });
  }

  // Check if the template is expired
  if (project.templates.length > 0) {
    const template = project.templates[0];
    if (isProjectTemplateExpired(template.expiresAt)) {
      return res.status(410).json({
        error: "Project expired",
        message: "project expired",
        project: null,
      });
    }
  }

  res.status(200).json(project);
};

export const updateTemplateSEO = async (
  req: Request<
    {},
    {},
    {
      projectId: string;
      templateId: string;
      createdAt: string;
      slug: string;
      seoTitle: string;
      seoDescription: string;
    }
  >,
  res: Response,
) => {
  try {
    const { projectId, templateId, createdAt, slug, seoTitle, seoDescription } =
      req.body;
    const userId = req.user?.id;

    if (
      !projectId ||
      !templateId ||
      !createdAt ||
      !slug ||
      !seoTitle ||
      !seoDescription
    ) {
      return res.status(400).json({
        error:
          "Project ID, template ID, createdAt, slug, SEO title, and SEO description are required",
      });
    }

    // 1. Check if user exists
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // 2. Check if project belongs to user
    const project = await prisma.project.findFirst({
      where: { id: projectId, userId },
    });
    if (!project) {
      return res
        .status(404)
        .json({ error: "Project not found or access denied" });
    }

    // 3. Ensure slug is unique across project (excluding this exact record)
    const existingTemplate = await prisma.projectTemplate.findFirst({
      where: {
        projectId,
        slug,
        NOT: {
          projectId,
          templateId,
          createdAt: new Date(createdAt),
        },
      },
    });

    if (existingTemplate) {
      return res.status(409).json({
        error:
          "Slug is already taken by another template in this project. Please choose a different slug.",
      });
    }

    // 4. Update the template
    const updatedTemplate = await prisma.projectTemplate.update({
      where: {
        projectId_templateId_createdAt: {
          projectId,
          templateId,
          createdAt: new Date(createdAt),
        },
      },
      data: {
        slug,
        seoTitle,
        seoDescription,
      },
    });

    return res.status(200).json({
      template: updatedTemplate,
      message: "Template SEO settings updated successfully",
    });
  } catch (error) {
    console.error("Error updating template SEO:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
