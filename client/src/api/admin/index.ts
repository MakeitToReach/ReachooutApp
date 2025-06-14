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
