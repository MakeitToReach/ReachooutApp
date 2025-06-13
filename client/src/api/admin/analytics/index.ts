import api from "@/api/axios.config";
import { toast } from "sonner";

export const getTotalUserCount = async () => {
  try {
    const response = await api.get("/v1/admin/analytics/users");
    // if (response.status === 200) {
    //   toast.success("User count fetched successfully");
    // }
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
  try {
    const response = await api.get("/v1/admin/analytics/projects");
    // if (response.status === 200) {
    //   toast.success("Project count fetched successfully");
    // }
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
