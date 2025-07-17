import type { Request, Response } from "express";
import { Router } from "express";
// import { loginAdmin } from "../controllers/admin.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import {
  addCustomDomain,
  addTemplateToProject,
  createProject,
  deleteProjectById,
  getTemplatesInProject,
  getUserProjects,
  getProjectBySubdomain,
  getProjectByCustomDomain,
  checkSubdomainAvailability,
  updateProjectSubdomain,
  getProjectById,
  updateProjectFavicon,
  updateProjectMetaData,
  getProjectBySubdomainAndSlug,
  updateTemplateSEO,
  // checkSlugAvailability,
  checkSlug,
} from "../controllers/project.controller";

const projectRouter = Router();

// /v1/project
// Create project
projectRouter.post(
  "/create",
  isAuthenticated,
  (req: Request, res: Response) => {
    createProject(req, res);
  }
);

// Check slug availability
projectRouter.get(
  "/check/validate",
  (req: Request, res: Response) => {
    checkSlug(req, res);
  }
);

// Get all projects for the user
projectRouter.get(
  "/user/all",
  isAuthenticated,
  (req: Request, res: Response) => {
    getUserProjects(req, res);
  }
);

// Get templates in project by project id
projectRouter.get(
  "/templates/:id",
  isAuthenticated,
  (req: Request<{ id: string }>, res: Response) => {
    getTemplatesInProject(req, res);
  }
);

// Add template to project
projectRouter.post(
  "/add-template",
  isAuthenticated,
  (req: Request, res: Response) => {
    addTemplateToProject(req, res);
  }
);

// Delete project by id
projectRouter.delete(
  "/delete/:id",
  isAuthenticated,
  (req: Request<{ id: string }>, res: Response) => {
    deleteProjectById(req, res);
  }
);

// Add custom domain
projectRouter.post(
  "/custom-domain",
  isAuthenticated,
  (req: Request, res: Response) => {
    addCustomDomain(req, res);
  }
);

// Get project by custom domain
projectRouter.get(
  "/custom-domain/:customDomain",
  (req: Request, res: Response) => {
    getProjectByCustomDomain(req, res);
  }
);

// Get project by subdomain
projectRouter.get("/subdomain/:subdomain", (req: Request, res: Response) => {
  getProjectBySubdomain(req, res);
});

// Get project by subdomain and slug
projectRouter.get(
  "/subdomain/:subdomain/slug/:slug",
  (req: Request, res: Response) => {
    getProjectBySubdomainAndSlug(req, res);
  }
);

// Check subdomain availability
projectRouter.get(
  "/check-subdomain/:subdomain",
  (req: Request, res: Response) => {
    checkSubdomainAvailability(req, res);
  }
);

// Update project subdomain
projectRouter.put(
  "/update-subdomain",
  isAuthenticated,
  (req: Request, res: Response) => {
    updateProjectSubdomain(req, res);
  }
);

// Update project favicon
projectRouter.put(
  "/update-favicon",
  isAuthenticated,
  (req: Request, res: Response) => {
    updateProjectFavicon(req, res);
  }
);

// Update project meta data
projectRouter.put("/update", isAuthenticated, (req: Request, res: Response) => {
  updateProjectMetaData(req, res);
});

// Update template SEO settings
projectRouter.put(
  "/update-template-seo",
  isAuthenticated,
  (req: Request, res: Response) => {
    updateTemplateSEO(req, res);
  }
);

// Get project by project id
projectRouter.get("/:id", isAuthenticated, (req: Request, res: Response) => {
  getProjectById(req, res);
});


export default projectRouter;
