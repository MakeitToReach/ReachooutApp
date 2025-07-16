import api from "@/api/axios.config";
import { getAdminToken } from "@/lib/isAuthenticated";
import { toast } from "sonner";

export const getTotalUserCount = async () => {
  const adminToken = getAdminToken();
  try {
    const response = await api.get("/v1/admin/analytics/users", {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    });
    return response.data;
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

export const getTotalProjectCount = async () => {
  const adminToken = getAdminToken();
  try {
    const response = await api.get("/v1/admin/analytics/projects", {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    });
    return response.data;

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
