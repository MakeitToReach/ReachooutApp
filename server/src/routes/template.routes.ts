import { Request, Response, Router } from "express";
import {
  addUserTemplate,
  createTemplate,
  getAllTemplates,
  getUserTemplates,
  updateTemplate,
} from "../controllers/template.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const templateRouter = Router();

// /portfolio
templateRouter.post(
  "/publish",
  isAuthenticated,
  (req: Request, res: Response) => {
    addUserTemplate(req, res);
  },
);

//for admin only
templateRouter.post("/create", (req: Request, res: Response) => {
  createTemplate(req, res);
});

templateRouter.post("/update/:id", (req: Request, res: Response) => {
  updateTemplate(req, res);
});

templateRouter.get("/user", isAuthenticated, (req: Request, res: Response) => {
  getUserTemplates(req, res);
});

templateRouter.get("/all", isAuthenticated, (req: Request, res: Response) => {
  getAllTemplates(req, res);
});

export default templateRouter;
