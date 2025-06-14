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

projectRouter.post(
  "/add/template",
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
  "/add/custom-domain",
  isAuthenticated,
  (req: Request, res: Response) => {
    addCustomDomain(req, res);
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
  (req: Request<{ id: string }, {}, {}>, res: Response) => {
    getTemplatesInProject(req, res);
  },
);


export default projectRouter;
