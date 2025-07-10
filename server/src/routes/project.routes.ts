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
} from "../controllers/project.controller";

const projectRouter = Router();

// /v1/project
projectRouter.post(
  "/create",
  isAuthenticated,
  (req: Request, res: Response) => {
    createProject(req, res);
  }
);

projectRouter.get("/:id", isAuthenticated, (req: Request, res: Response) => {
  getProjectById(req, res);
});

projectRouter.get(
  "/user/all",
  isAuthenticated,
  (req: Request, res: Response) => {
    getUserProjects(req, res);
  }
);

projectRouter.get(
  "/templates/:id",
  isAuthenticated,
  (req: Request<{ id: string }>, res: Response) => {
    getTemplatesInProject(req, res);
  }
);

projectRouter.post(
  "/add-template",
  isAuthenticated,
  (req: Request, res: Response) => {
    addTemplateToProject(req, res);
  }
);

projectRouter.delete(
  "/delete/:id",
  isAuthenticated,
  (req: Request<{ id: string }>, res: Response) => {
    deleteProjectById(req, res);
  }
);

projectRouter.post(
  "/custom-domain",
  isAuthenticated,
  (req: Request, res: Response) => {
    addCustomDomain(req, res);
  }
);

projectRouter.get("/custom-domain/:customDomain", (req: Request, res: Response) => {
  getProjectByCustomDomain(req, res);
});

projectRouter.get("/subdomain/:subdomain", (req: Request, res: Response) => {
  getProjectBySubdomain(req, res);
});

projectRouter.get(
  "/check-subdomain/:subdomain",
  (req: Request, res: Response) => {
    checkSubdomainAvailability(req, res);
  }
);

// Update project subdomain (requires authentication)
projectRouter.put(
  "/update-subdomain",
  isAuthenticated,
  (req: Request, res: Response) => {
    updateProjectSubdomain(req, res);
  }
);

export default projectRouter;
