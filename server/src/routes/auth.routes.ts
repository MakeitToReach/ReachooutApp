import { Router } from "express";
import { login, register } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/register", (req, res) => {
    register(req, res);
});

authRouter.post("/login", (req, res) => {
    login(req, res);
});

export default authRouter;
