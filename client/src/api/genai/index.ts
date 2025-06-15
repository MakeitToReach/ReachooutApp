import { toast } from "sonner";
import { api } from "../axios.config";
import { getToken } from "@/lib/isAuthenticated";
import { GenericTemplateSchema } from "@/schemas/templates.schema";

export const generateContent = async (
  userInput: string,
  templateData: GenericTemplateSchema,
) => {
  const token = getToken();
  const response = await api.post(
    `/v1/genai/generate`,
    { userInput, templateData },
    {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    },
  );

  if (response.status == 200) {
    toast.success("Content generated successfully");
  }
  console.log(response.data);
  return response.data;
};
