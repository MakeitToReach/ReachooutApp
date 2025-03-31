import { toast } from "sonner";
import { api } from "../axios.config";

export const loginUser = async (name: string, password: string) => {
    const response = await api.post("/v1/auth/login", { name, password });
    switch (response.status) {
        case 200:
            toast.success("Logged In successfully");
            break;
        case 401:
            toast.error("Invalid email or password");
            break;
        default:
            toast.warning("An unexpected error occured");
    }
    return response.data;
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
    switch (response.status) {
        case 201:
            toast.success("Account created successfully");
            break;
        case 400:
            toast.error("User already exist");
            break;
        default:
            toast.warning("An unexpected error occured");
    }

    return response.data;
};

export const logoutUser = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    toast.success("Logged out successfully");
};
