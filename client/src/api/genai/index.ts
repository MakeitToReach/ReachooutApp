import { toast } from "sonner";
import { api } from "../axios.config";
import { getToken } from "@/lib/isAuthenticated";
import { GenericTemplateSchema } from "@/schemas/templates.schema";

export const generateContent = async (
  userInput: string,
  templateData: GenericTemplateSchema
) => {
  try {
    const token = getToken();
    const response = await api.post(
      `/v1/genai/generate`,
      { userInput, templateData },
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );

    if (response.status == 200) {
      toast.success("Content generated successfully");
    }
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    toast.error("Failed to generate content");
    console.error("Error generating content:", error);
    throw error;
  }
};
