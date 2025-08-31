import { Cashfree, CFEnvironment } from "cashfree-pg";
import { CASHFREE_APP_ID, CASHFREE_SECRET_KEY } from "../config/dotenv";
import type { Request, Response } from "express";

const cashfree = new Cashfree(
    process.env.NODE_ENV === "production" ? CFEnvironment.PRODUCTION : CFEnvironment.SANDBOX,
    CASHFREE_APP_ID,
    CASHFREE_SECRET_KEY
);

export const createOrder = async (req: Request, res: Response) => {
    try {
        const { amount_id } = req.body;
        const orderId = `order_${Date.now()}`;

        const paymentPlans = {
            rcfpp: 0,
            rcmpp: 349,
            rcypp: 2988
        }

        const amount = paymentPlans[amount_id];

        const request = {
            order_amount: amount,
            order_currency: "INR",
            order_id: orderId,
            customer_details: {
                customer_id: req.user?.id || "customer",
                customer_phone: "9999999999"
            },
            // order_meta: {
            //     return_url: `${process.env.CLIENT_URL}/payment/success?order_id=${orderId}`
            // }
        };

        const response = await cashfree.PGCreateOrder(request);
        res.json({
            id: response.data.order_id,
            amount: response.data.order_amount * 100, // Convert to paise for consistency
            currency: response.data.order_currency,
            paymentSessionId: response.data.payment_session_id,
            orderStatus: response.data.order_status
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create order" });
    }
};

export const verifyPayment = async (req: Request, res: Response) => {
    try {
        const { orderId, paymentSessionId } = req.body;

        const response = await cashfree.PGFetchOrder(orderId);

        if (response.data.order_status === "PAID") {
            res.json({ success: true, orderDetails: response.data, orderId: orderId });
        } else {
            res.status(400).json({ success: false, message: "Payment failed or pending" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to verify payment" });
    }
};
