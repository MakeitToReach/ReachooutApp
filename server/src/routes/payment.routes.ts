import type { Request, Response } from "express";
import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { createOrder, verifyPayment } from "../controllers/payment.controller";

const paymentRouter = Router();

// /v1/payment
paymentRouter.post(
    "/create-order",
    isAuthenticated,
    (req: Request, res: Response) => {
        createOrder(req, res);
    },
);

paymentRouter.post(
    "/verify-payment",
    isAuthenticated,
    (req: Request, res: Response) => {
        verifyPayment(req, res);
    },
);

export default paymentRouter;
