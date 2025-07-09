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
  checkSubdomainAvailability,
} from "../controllers/project.controller";

const projectRouter = Router();

// /v1/project
projectRouter.post(
  "/create",
  isAuthenticated,
  (req: Request, res: Response) => {
    createProject(req, res);
  },
);

projectRouter.get(
  "/user/all",
  isAuthenticated,
  (req: Request, res: Response) => {
    getUserProjects(req, res);
  },
);

projectRouter.get(
  "/templates/:id",
  isAuthenticated,
  (req: Request<{ id: string }>, res: Response) => {
    getTemplatesInProject(req, res);
  },
);

projectRouter.post(
  "/add-template",
  isAuthenticated,
  (req: Request, res: Response) => {
    addTemplateToProject(req, res);
  },
);

projectRouter.delete(
  "/delete/:id",
  isAuthenticated,
  (req: Request<{ id: string }>, res: Response) => {
    deleteProjectById(req, res);
  },
);

projectRouter.post(
  "/custom-domain",
  isAuthenticated,
  (req: Request, res: Response) => {
    addCustomDomain(req, res);
  },
);

// Public route for subdomain access (no authentication required)
projectRouter.get(
  "/subdomain/:subdomain",
  (req: Request, res: Response) => {
    getProjectBySubdomain(req, res);
  },
);

// Public route to check subdomain availability
projectRouter.get(
  "/check-subdomain/:subdomain",
  (req: Request, res: Response) => {
    checkSubdomainAvailability(req, res);
  },
);

export default projectRouter;
