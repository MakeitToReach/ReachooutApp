import { toast } from "sonner";
import api from "../axios.config";
import { setCookie } from "../auth";
import { getAdminToken } from "@/lib/isAuthenticated";


export const logoutAdmin = () => {
    document.cookie = "admin-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    toast.success("Admin Logged out successfully");
};

export const loginAdmin = async (username: string, password: string) => {
  try {
    const response = await api.post("/v1/admin/login", { username, password });
    setCookie("admin-token", response.data.token);
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
  const adminToken = getAdminToken();
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
    },{
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
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
  const adminToken = getAdminToken();
  try {
    const response = await api.post(
      `/v1/admin/create/category/${templateId}/${category}`,
      {
        templateId,
        category,
        data,
      },
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
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
  const adminToken = getAdminToken();
  const response = await api.get(`/v1/admin/categories/${templateId}`, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });

  if (response.status === 200) {
    return response.data;
  } else {
    toast.error("Failed to fetch categories");
  }

  return null;
};

export const deleteCategoryByCategoryId = async (categoryId: string) => {
  const adminToken = getAdminToken();
  const response = await api.delete(`/v1/admin/category/${categoryId}`, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });

  if (response.status === 200) {
    toast.success("Category deleted successfully");
    return response.data;
  } else {
    toast.error("Failed to delete category");
  }

  return null;
};

export const deleteTemplateByTemplateId = async (templateId: string) => {
  const adminToken = getAdminToken();
  const response = await api.delete(`/v1/admin/template/${templateId}`, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });

    if (response.status === 200) {
      toast.success("Template deleted successfully");
      return response.data;
    } else {
      toast.error("Failed to delete template");
    }
  
    return null;

}

export const getAllUsers = async () => {
  const adminToken = getAdminToken();
  try {
    const response = await api.get("/v1/admin/users", {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.log(error);
    if (error.status === 401) {
      toast.error("Unauthorized access");
    }
    if (error.status === 500) {
      toast.error("Internal server error");
    }
  }
};
