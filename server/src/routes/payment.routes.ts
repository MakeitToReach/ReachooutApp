import type { Request, Response } from "express";
import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { createOrder } from "../controllers/payment.controller";

const paymentRouter = Router();

// /v1/payment
paymentRouter.post(
    "/create-order",
    isAuthenticated,
    (req: Request, res: Response) => {
        createOrder(req, res);
    },
);

export default paymentRouter;
