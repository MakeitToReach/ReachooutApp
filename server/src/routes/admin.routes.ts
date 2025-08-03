import { Request, Response, Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import {
  // addTemplateCategoryData,
  createTemplate,
  createTemplateCategory,
  deleteTemplateByTemplateId,
  deleteTemplateCategoryByCategoryId,
  getTemplateCategoriesByTemplateId,
  getAllUsersWithProjects,
  loginAdmin,
  updateTemplate,
} from "../controllers/admin.controller";
import {
  getTotalProjectCount,
  getTotalUserCount,
} from "../controllers/adminAnalytics.controller";

const adminRouter = Router();

// /v1/admin
adminRouter.post("/login", (req: Request, res: Response) => {
  loginAdmin(req, res);
});

// All routes below require admin authentication
adminRouter.post("/create/template", isAuthenticated, (req: Request, res: Response) => {
  createTemplate(req, res);
});

adminRouter.post("/update/:id", isAuthenticated, (req: Request, res: Response) => {
  updateTemplate(req, res);
});

adminRouter.delete("/template/:templateId", isAuthenticated, (req: Request, res: Response) => {
  deleteTemplateByTemplateId(req, res);
})


adminRouter.post(
  "/create/category/:templateId/:categoryName",
  isAuthenticated,
  (req: Request, res: Response) => {
    createTemplateCategory(req, res);
  },
);

adminRouter.get(
  "/categories/:templateId",
  isAuthenticated,
  (req: Request<{ templateId: string }>, res: Response) => {
    getTemplateCategoriesByTemplateId(req, res);
  },
);

adminRouter.delete("/category/:categoryId", isAuthenticated, (req: Request, res: Response) => {
  deleteTemplateCategoryByCategoryId(req, res);
})




// /v1/admin/analytics

adminRouter.get("/analytics/users", isAuthenticated, (req: Request, res: Response) => {
  getTotalUserCount(req, res);
});

adminRouter.get("/analytics/projects", isAuthenticated, (req: Request, res: Response) => {
  getTotalProjectCount(req, res);
});

adminRouter.get("/users", isAuthenticated, (req: Request, res: Response) => {
  getAllUsersWithProjects(req, res);
});

export default adminRouter;
