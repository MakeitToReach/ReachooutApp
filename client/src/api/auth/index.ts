import { toast } from "sonner";
import { api } from "../axios.config";
import { getToken } from "@/lib/isAuthenticated";

export const setCookie = (name: string, value: string, days = 1) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000); // default: 1 day

    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; Secure; SameSite=Strict`;
};

export const loginUser = async (name: string, password: string) => {
    const response = await api.post(
        "/v1/auth/login",
        { name, password },
        { withCredentials: true },
    );

    if (response.data.token) {
        setCookie("token", response.data.token);
    }
    return response;
};

export const registerUser = async (
    email: string,
    name: string,
    password: string,
) => {
    const response = await api.post("/v1/auth/register", {
        email,
        name,
        password,
    });

    if (response.data.token) {
        setCookie("token", response.data.token);
    }
    return response;
};

export const logoutUser = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    toast.success("Logged out successfully");
};

export const getUserFromToken = async (token?: string) => {
    try {
        // Use provided token or get from cookies
        const authToken = token || getToken();
        
        if (!authToken) {
            console.error("No token available for getUserFromToken");
            return null;
        }

        const response = await api.get("/v1/auth/me", {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error in getUserFromToken:", error);
        return null;
    }
};
