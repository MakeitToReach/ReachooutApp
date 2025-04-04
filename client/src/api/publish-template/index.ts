import { toast } from "sonner";
import { api } from "../axios.config";
import { getToken } from "@/lib/isAuthenticated";
import { PF_TMP_SCHEMA } from "@/templates/professional/schema/PFTemplateSchema";

export const fetchAllTemplates = async () => {
  const token = getToken();
  const response = await api.get("/v1/template/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const publishTemplate = async (templateName: string, data: PF_TMP_SCHEMA) => {
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

  if (response.status === 200) {
    toast.success("Template published successfully");
  }

  return response.data;
};
