import { toast } from "sonner";
import api from "../axios.config";

export const loginAdmin = async (username: string, password: string) => {
    try {
        const response = await api.post("/v1/admin/login", { username, password });
        toast.success("Admin logged in successfully");
        return response;

    } catch (error: any) { //eslint-disable-line
        console.log(error);
        if (error.status === 401) {
            toast.error("Invalid credentials");
        }
        if (error.status === 500) {
            toast.error("Internal server error");
        }
    }
};

export const createTemplate = async (name: string, data: string, thumbnailUrl: string) => {
    try {
        const response = await api.post("/v1/template/create", { name, data, thumbnailUrl });
        toast.success("Template created successfully");
        return response;
    } catch (error: any) { //eslint-disable-line
        console.log(error);
        if (error.status === 401) {
            toast.error("Invalid credentials");
        }
        if (error.status === 500) {
            toast.error("Internal server error");
        }
    }
};
