import type { Request, Response } from "express";
import { Router } from "express";
// import { loginAdmin } from "../controllers/admin.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { generateContent } from "../controllers/genai.controller";

const genaiRouter = Router();

// /v1/genai
genaiRouter.post(
  "/generate",
  isAuthenticated,
  (req: Request, res: Response) => {
    generateContent(req, res);
  },
);


export default genaiRouter;
