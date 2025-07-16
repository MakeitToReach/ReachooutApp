import { toast } from "sonner";
import { api } from "../axios.config";
import { getToken } from "@/lib/isAuthenticated";
// import { PF_TMP_SCHEMA } from "@/templates/professional/schema/PFTemplateSchema";

//TODO:make it server safe and remove client side usage by using getToken and toast
export const getProjectTemplateInstanceData = async (
  templateId: string,
  projectId: string,
  order: number
) => {
  const token = getToken();
  const response = await api.get(
    `/v1/template/user/${templateId}?pid=${projectId}&order=${order}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    }
  );

  if (response.status === 200 || response.status === 304) {
    toast.success("Template fetched successfully");
    return response.data;
  }
  return null;
};

export const submitContactForm = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any,
  receiverEmail: string
) => {
  const response = await api.post("/v1/submit-form/contact", {
    content,
    receiverEmail,
  });

  if (response.status === 200 || response.status === 304) {
    toast.success("Contact form submitted successfully");
    return response.data;
  }
  return null;
};

export const submitNewsletterForm = async (
  email: string,
  receiverEmail: string
) => {
  const response = await api.post("/v1/submit-form/newsletter", {
    email,
    receiverEmail,
  });

  if (response.status === 200 || response.status === 304) {
    toast.success("Newsletter form submitted successfully");
    return response.data;
  }
  return null;
};
