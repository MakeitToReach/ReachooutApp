import { Request, Response, Router } from "express";
// import { isAuthenticated } from "../middlewares/isAuthenticated";
import {
  // addTemplateCategoryData,
  createTemplate,
  createTemplateCategory,
  getTemplateCategoriesByTemplateId,
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

adminRouter.post("/create/template", (req: Request, res: Response) => {
  createTemplate(req, res);
});

adminRouter.post("/update/:id", (req: Request, res: Response) => {
  updateTemplate(req, res);
});

// adminRouter.post(
//   "/update/category/:templateId",
//   (
//     req: Request<{ templateId: string }, {}, { category: string; data: any }>,
//     res: Response,
//   ) => {
//     addTemplateCategoryData(req, res);
//   },
// );

adminRouter.post(
  "/create/category/:templateId/:categoryName",
  (req: Request, res: Response) => {
    createTemplateCategory(req, res);
  },
);

adminRouter.get(
  "/categories/:templateId",
  (req: Request<{ templateId: string }>, res: Response) => {
    getTemplateCategoriesByTemplateId(req, res);
  },
);

// /v1/admin/analytics

adminRouter.get("/analytics/users", (req: Request, res: Response) => {
  getTotalUserCount(req, res);
});

adminRouter.get("/analytics/projects", (req: Request, res: Response) => {
  getTotalProjectCount(req, res);
});

export default adminRouter;
