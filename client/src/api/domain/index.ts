import { toast } from "sonner";
import api from "../axios.config";
import { getToken } from "@/lib/isAuthenticated";

export const checkSubdomainAvailability = async (subdomain: string) => {
  const response = await api.get(`/v1/project/check-subdomain/${subdomain}`);
  if (response.status == 200) {
    return response.data;
  }
  return null;
};

export const updateSubdomain = async (
  newSubdomain: string,
  projectId: string
) => {
  const token = getToken();
  const response = await api.put(
    `/v1/project/update-subdomain`,
    {
      projectId: projectId,
      newSubdomain: newSubdomain,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  if (response.status == 200) {
    toast.success("Subdomain updated successfully");
    return response.data;
  }
  toast.error(`Failed to update subDomain: ${response.data.error}`);
  return null;
};
