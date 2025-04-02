import { Router } from "express";
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
templateRouter.post("/publish", isAuthenticated, (req, res) => {
  addUserTemplate(req, res);
});

//for admin only
templateRouter.post("/create", (req, res) => {
  createTemplate(req, res);
});

templateRouter.post("/update/:id", (req, res) => {
  updateTemplate(req, res);
});

templateRouter.get("/user", isAuthenticated, (req, res) => {
  getUserTemplates(req, res);
});

templateRouter.get("/all", isAuthenticated, (req, res) => {
  getAllTemplates(req, res);
});

export default templateRouter;
