import { toast } from "sonner";
import { api } from "../axios.config";
import { getToken } from "@/lib/isAuthenticated";

export const fetchAllTemplates = async () => {
    const token = getToken();
    const response = await api.get("/v1/template/all", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.status === 200) {
        return response.data;
    } else {
        toast.error("Failed to fetch templates");
    }

    return null;
};

export const getCategoriesByTemplateId = async (templateId: string) => {
    const token = getToken();
    const response = await api.get(`/v1/template/categories/${templateId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.status === 200) {
        return response.data;
    } else {
        toast.error("Failed to fetch categories");
    }

    return null;
};
