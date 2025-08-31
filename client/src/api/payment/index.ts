import { getToken } from "@/lib/isAuthenticated";
import api from "../axios.config";

export const createOrder = async (amount_id: string) => {
    const token = getToken();
    const response = await api.post("/v1/payment/create-order", { amount_id }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        withCredentials: true
    });
    return response.data;
};

export const verifyPayment = async (orderId: string, paymentSessionId: string) => {
    const token = getToken();
    const response = await api.post("/v1/payment/verify-payment", { orderId, paymentSessionId }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        withCredentials: true
    });
    return response.data;
};
