import { Request, Response, Router } from "express";
import {
    deleteTemplateCategory,
    // addUserTemplate,
    getAllTemplates,
    getTemplateCategories,
    getProjectTemplateInstanceData,
    publishTemplate,
    updateTemplateInstance,
    deleteTemplateInstanceByOrder,
    checkSlug,
    getCategoryByTemplateIdAndCategoryName,
    setTemplateExpiry,
} from "../controllers/template.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const templateRouter = Router();

//v1/template
templateRouter.post(
    "/publish",
    isAuthenticated,
    (req: Request, res: Response) => {
        publishTemplate(req, res);
    },
);

templateRouter.get("/all", (req: Request, res: Response) => {
    getAllTemplates(req, res);
});

//v1/template/user/:templateId
templateRouter.get("/user/:templateId", (req: Request<{ templateId: string }>, res: Response) => {
    getProjectTemplateInstanceData(req, res);
});
//returns the template instance data for the given template from a project

templateRouter.put("/update", isAuthenticated, (req: Request, res: Response) => {
    updateTemplateInstance(req, res);
});

templateRouter.get(
    "/categories/:templateId",
    (req: Request<{ templateId: string }>, res: Response) => {
        getTemplateCategories(req, res);
    },
);

templateRouter.get(
    "/category/:templateId/:categoryName",
    (req: Request<{ templateId: string, categoryName: string }>, res: Response) => {
        getCategoryByTemplateIdAndCategoryName(req, res);
    },
);

templateRouter.delete(
    "/delete/category/:templateId/:categoryName",
    isAuthenticated,
    (req: Request, res: Response) => {
        deleteTemplateCategory(req, res);
    }
)

templateRouter.delete("/delete/instance/:projectId/:slug", isAuthenticated, (req: Request, res: Response) => {
    deleteTemplateInstanceByOrder(req, res);
})

templateRouter.get(
  "/validate-slug/:projectId/:pageSlug",
  (req: Request, res: Response) => {
    checkSlug(req, res);
  }
);

//v1/template/expiry
templateRouter.put("/expiry", isAuthenticated, (req: Request, res: Response) => {
    setTemplateExpiry(req, res);
});

export default templateRouter;
