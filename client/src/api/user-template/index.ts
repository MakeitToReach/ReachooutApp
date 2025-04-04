import { toast } from "sonner";
import { api } from "../axios.config";
import { getToken } from "@/lib/isAuthenticated";
// import { PF_TMP_SCHEMA } from "@/templates/professional/schema/PFTemplateSchema";

export const getUserTemplateData = async (templateName: string) => {
    const token = getToken();
    const response = await api.get(`/v1/template/user/${templateName}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
    });

    if (response.status === 200) {
        toast.success("Template fetched successfully");
    }

    return response.data;
};

export const getUserTemplates = async () => {
    const token = getToken();
    const response = await api.get(`/v1/template/all/user`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
    });

    if (response.status == 200) {
        toast.success("Templates fetched successfully");
    }
    return response.data;
};
