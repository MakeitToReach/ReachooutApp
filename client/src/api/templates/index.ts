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

export const getCategoryByTemplateIdAndCategoryName = async (
    templateId: string,
    categoryName: string,
) => {
    const response = await api.get(
        `/v1/template/category/${templateId}/${categoryName}`,
    );

    if (response.status === 200 || response.status === 304) {
        return response.data;
    } else {
        toast.error("Failed to fetch category");
    }

    return null;
};

export const publishTemplate = async (
    data: GenericTemplateSchema,
    projectId: string,
    templateId: string,
    slug?: string,
    expiryDays?: number,
) => {
    const token = getToken();
    const response = await api.post(
        `/v1/template/publish`,
        { data, projectId, templateId, slug, expiryDays },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                withCredentials: true,
            },
        },
    );

    if (response.status === 200 || response.status === 201) {
        toast.success("Template published successfully");
    } else if (response.status === 409) {
        toast.error("Failed to publish template, Slug Conflict");
    } else {
        toast.error("Failed to publish template, Server Error");
    }

    return response;
};

export const updateTemplateInstanceData = async (
    data: GenericTemplateSchema,
    projectId: string,
    templateId: string,
    order: number,
) => {
    try {
        const token = getToken();
        const response = await api.put(
            "/v1/template/update",
            { data, projectId, templateId, order },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        if (response.status === 200 || response.status === 201) {
            toast.success("Template updated successfully");
        } else {
            toast.error("Failed to update template");
        }

        return response;
    } catch (error) {
        console.error("Error updating template instance:", error);
        toast.error("Failed to update template");
        throw error;
    }
};

export const deleteTemplateInstanceByOrder = async (
    projectId: string,
    slug: string,
) => {
    const token = getToken();
    const response = await api.delete(
        `/v1/template/delete/instance/${projectId}/${slug}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );

    if (response.status === 200) {
        toast.success("Template instance deleted successfully");
        return response.data;
    } else {
        toast.error("Failed to delete template instance");
        return null;
    }
};

export const checkSlugAvailability = async (
    pid: string,
    slug: string,
): Promise<boolean> => {
    try {
        const token = getToken();
        const response = await api.get(`/v1/validate-slug/${pid}/${slug}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            return response.data.available;
        } else {
            return false;
        }
    } catch (error) {
        console.log("Error while checking slug", error);
        return false;
    }
};

export const updateTemplateExpiry = async (
    projectId: string,
    templateId: string,
    order: number,
    expiryDays: number,
) => {
    const token = getToken();
    const response = await api.put(
        `/v1/template/expiry`,
        { projectId, templateId, order, expiryDays },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        },
    );
    if (response.status === 200) {
        toast.success("Template expiry updated successfully");
        return response.data;
    } else {
        toast.error("Failed to update template expiry");
        return null;
    }
};
