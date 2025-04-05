import { Request, Response, Router } from "express";
import {
  getUserFromToken,
  login,
  register,
} from "../controllers/auth.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const authRouter = Router();

authRouter.post("/register", (req: Request, res: Response) => {
  register(req, res);
});

authRouter.post("/login", (req: Request, res: Response) => {
  login(req, res);
});

authRouter.get("/me", isAuthenticated, (req: Request, res: Response) => {
  getUserFromToken(req, res);
});

export default authRouter;
