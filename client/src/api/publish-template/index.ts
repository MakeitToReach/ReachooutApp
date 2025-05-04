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

export const publishTemplate = async (
    templateName: string,
    data: GenericTemplateSchema,
) => {
    const token = getToken();
    const response = await api.post(
        `/v1/template/publish`,
        { templateName, data },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );

    if (response.status === 200 || response.status === 201) {
        toast.success("Template published successfully");
    } else if (response.status === 500) {
        toast.error("Failed to publish template, Server Error");
    } else {
        toast.error("Failed to publish template");
    }

    return response.data;
};
