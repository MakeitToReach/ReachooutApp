import { getToken } from "@/lib/isAuthenticated";
import api from "../axios.config";

export const createOrder = async (amount: number) => {
    const token = getToken();
    const response = await api.post("/v1/payment/create-order", { amount },{
        headers: {
            Authorization: `Bearer ${token}`,
            withCredentials: true
        },
    });
    return response.data;
};
