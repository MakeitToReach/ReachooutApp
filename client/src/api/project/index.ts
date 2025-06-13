import { toast } from "sonner";
import { api } from "../axios.config";
import { getToken } from "@/lib/isAuthenticated";
// import { PF_TMP_SCHEMA } from "@/templates/professional/schema/PFTemplateSchema";

//TODO:make it server safe and remove client side usage by using getToken and toast
// export const getUserTemplateData = async (templateName: string) => {
//   const token = getToken();
//   const response = await api.get(`/v1/template/user/${templateName}`, {
//     headers: { Authorization: `Bearer ${token}` },
//     withCredentials: true,
//   });

//   if (response.status === 200) {
//     toast.success("Template fetched successfully");
//   }

//   return response.data;
// };

export const getUserProjects = async () => {
    const token = getToken();
    const response = await api.get(`/v1/project/user/all`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
    });

    if (response.status == 200) {
        toast.success("Projects fetched successfully");
    }
    return response.data;
};

export const createUserProject = async (name: string) => {
    const token = getToken();
    const response = await api.post(
        `/v1/project/create`,
        { name },
        {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        },
    );

    if (response.status == 201) {
        toast.success("Project created successfully");
    }
    return response;
};
