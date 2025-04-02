// import { toast } from "sonner";
import { api } from "../axios.config";
import { getToken } from "@/lib/isAuthenticated";

export const fetchAllTemplates = async () => {
  const token = getToken();
  const response = await api.get("/v1/template/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
