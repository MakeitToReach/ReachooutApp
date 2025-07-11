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
  data: GenericTemplateSchema,
  projectId: string,
  templateId: string
) => {
  const token = getToken();
  const response = await api.post(
    `/v1/template/publish`,
    { data, projectId, templateId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.status === 200 || response.status === 201) {
    toast.success("Template published successfully");
  } else if (response.status === 500) {
    toast.error("Failed to publish template, Server Error");
  } else {
    toast.error("Failed to publish template");
  }

  return response;
};

export const updateTemplateInstanceData = async (data: GenericTemplateSchema, projectId: string, templateId: string, order: number) => {
  try {
    const token = getToken();
    const response = await api.put("/v1/template/update", { data, projectId, templateId, order }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
