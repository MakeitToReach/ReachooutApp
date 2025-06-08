import { Request, Response, Router } from "express";
import {
    addUserTemplate,
    createTemplate,
    getAllTemplates,
    getUserTemplateData,
    getUserTemplates,
    updateTemplate,
    updateUserTemplateData,
} from "../controllers/template.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const templateRouter = Router();

//v1/template
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

//for admin only
templateRouter.post("/update/:id", (req: Request, res: Response) => {
    updateTemplate(req, res);
});

templateRouter.get(
    "/user/:templateName",
    isAuthenticated,
    (req: Request, res: Response) => {
        getUserTemplateData(req, res);
    },
);

templateRouter.get("/all", (req: Request, res: Response) => {
    getAllTemplates(req, res);
});

templateRouter.get(
    "/all/user",
    isAuthenticated,
    (req: Request, res: Response) => {
        getUserTemplates(req, res);
    },
);

templateRouter.put(
    "/update/user/:template_id",
    isAuthenticated,
    (req: Request, res: Response) => {
        updateUserTemplateData(req, res);
    },
);

export default templateRouter;
