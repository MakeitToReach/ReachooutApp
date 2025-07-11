import { toast } from "sonner";
import api from "../axios.config";

export const loginAdmin = async (username: string, password: string) => {
  try {
    const response = await api.post("/v1/admin/login", { username, password });
    toast.success("Admin logged in successfully");
    return response;

    //eslint-disable-next-line
  } catch (error: any) {
    console.log(error);
    if (error.status === 401) {
      toast.error("Invalid credentials");
    }
    if (error.status === 500) {
      toast.error("Internal server error");
    }
  }
};

export const createTemplate = async (
  name: string,
  data: string,
  thumbnailUrl: string,
  category: string,
  tags: string[],
) => {
  const categories = [
    {
      category: category,
      data: data,
    },
  ];
  try {
    const response = await api.post("/v1/admin/create/template", {
      name,
      data,
      thumbnailUrl,
      tags,
      categories,
    });
    toast.success("Template created successfully");
    return response;

    //eslint-disable-next-line
  } catch (error: any) {
    console.log(error);
    if (error.status === 401) {
      toast.error("Invalid credentials");
    }
    if (error.status === 500) {
      toast.error("Internal server error");
    }
  }
};

export const createTemplateCategory = async (
  templateId: string,
  category: string,
  data: any, //eslint-disable-line
) => {
  try {
    const response = await api.post(
      `/v1/admin/create/category/${templateId}/${category}`,
      {
        templateId,
        category,
        data,
      },
    );
    toast.success("Template category created successfully");
    return response;

    //eslint-disable-next-line
  } catch (error: any) {
    console.log(error);
    if (error.status === 401) {
      toast.error("Invalid credentials");
    }
    if (error.status === 500) {
      toast.error("Internal server error");
    }
  }
};

export const getCategoriesByTemplateIdAdmin = async (templateId: string) => {
  const response = await api.get(`/v1/admin/categories/${templateId}`, {});

  if (response.status === 200) {
    return response.data;
  } else {
    toast.error("Failed to fetch categories");
  }

  return null;
};

export const deleteCategoryByCategoryId = async (categoryId: string) => {
  const response = await api.delete(`/v1/admin/category/${categoryId}`);

  if (response.status === 200) {
    toast.success("Category deleted successfully");
    return response.data;
  } else {
    toast.error("Failed to delete category");
  }

  return null;
};

export const deleteTemplateByTemplateId = async (templateId: string) => {
    const response  = await api.delete(`/v1/admin/template/${templateId}`);

    if (response.status === 200) {
      toast.success("Template deleted successfully");
      return response.data;
    } else {
      toast.error("Failed to delete template");
    }
  
    return null;

}
