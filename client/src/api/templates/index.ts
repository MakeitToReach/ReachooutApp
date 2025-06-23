import { toast } from "sonner";
import { api } from "../axios.config";
import { getToken } from "@/lib/isAuthenticated";
import { GenericTemplateSchema } from "@/schemas/templates.schema";

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

export const publishTemplate = async (
    projectId: string,
    templateId: string,
    data: GenericTemplateSchema,
) => {
    const token = getToken();
    try {
        const response = await api.post(
            `/v1/template/publish/${projectId}`,
            {
                templateId,
                data,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        return response.data;
    } catch (error) {
        toast.error("Failed to publish template");
        console.error("Failed to publish template", error);
    }
};
