import { Request, Response, Router } from "express";
import {
    deleteTemplateCategory,
    // addUserTemplate,
    getAllTemplates,
    getTemplateCategories,
    publishTemplate,
    // getUserTemplateData,
    // getUserTemplates,
    // updateUserTemplateData,
} from "../controllers/template.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const templateRouter = Router();

//v1/template
templateRouter.post(
    "/publish/:projectId",
    isAuthenticated,
    (req: Request, res: Response) => {
        publishTemplate(req, res);
    },
);

// templateRouter.get(
//     "/user/:templateName",
//     isAuthenticated,
//     (req: Request, res: Response) => {
//         getUserTemplateData(req, res);
//     },
// );

templateRouter.get("/all", (req: Request, res: Response) => {
    getAllTemplates(req, res);
});

templateRouter.get(
    "/categories/:templateId",
    isAuthenticated,
    (req: Request<{ templateId: string }>, res: Response) => {
        getTemplateCategories(req, res);
    },
);


templateRouter.delete(
    "/delete/category/:templateId/:categoryName",
    isAuthenticated,
    (req: Request, res: Response) => {
        deleteTemplateCategory(req, res);
    }
)

// templateRouter.put(
//     "/update/user/:template_id",
//     isAuthenticated,
//     (req: Request, res: Response) => {
//         updateUserTemplateData(req, res);
//     },
// );

export default templateRouter;
