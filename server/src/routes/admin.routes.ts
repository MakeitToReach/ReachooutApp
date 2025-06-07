import { Request, Response, Router } from "express";
// import { isAuthenticated } from "../middlewares/isAuthenticated";
import { loginAdmin } from "../controllers/admin.controller";

const adminRouter = Router();

adminRouter.post("/login", (req: Request, res: Response) => {
  loginAdmin(req, res);
});


export default adminRouter;
