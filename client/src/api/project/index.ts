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

export const deleteProjectById = async (projectId: string) => {
  const token = getToken();
  const response = await api.delete(`/v1/project/delete/${projectId}`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });

  if (response.status == 200) {
    toast.success("Project deleted successfully");
  }
  return response;
};

export const addTemplateToProject = async (
  templateId: string,
  projectId: string,
) => {
  const token = getToken();
  const response = await api.post(
    `/v1/project/add/template`,
    {
      templateId,
      projectId,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    },
  );
  if (response.status === 200) {
    toast.success("Template added to project");
  }
  return response;
};

export const getTemplatesInProject = async (projectId: string) => {
  const token = getToken();
  const response = await api.get(`/v1/project/templates/${projectId}`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  return response.data;
};


export const getProjectBySubdomain = async (subdomain: string) => {
  console.log('🔍 getProjectBySubdomain called with subdomain:', subdomain);
  console.log('🔍 API base URL:', process.env.NEXT_PUBLIC_BACKEND_URL);
  console.log('🔍 Full API URL:', `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/project/subdomain/${subdomain}`);
  
  try {
    console.log('📡 Making API request...');
    const response = await api.get(`/v1/project/subdomain/${subdomain}`, {
      withCredentials: false, // Public access, no authentication required
    });

    console.log('✅ API response received:');
    console.log('  - Status:', response.status);
    console.log('  - Status text:', response.statusText);
    console.log('  - Data:', response.data);

    if (response.status !== 200) {
      console.log('❌ Non-200 status code, returning null');
      return null;
    }

    console.log('✅ Successfully returning project data');
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching project:', error);
    console.error('❌ Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      name: error instanceof Error ? error.name : 'Unknown',
      stack: error instanceof Error ? error.stack : undefined
    });
    
    // Log axios specific error details if available
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { status?: number; statusText?: string; data?: unknown; headers?: unknown } };
      console.error('❌ Axios error details:', {
        status: axiosError.response?.status,
        statusText: axiosError.response?.statusText,
        data: axiosError.response?.data,
        headers: axiosError.response?.headers
      });
    }
    
    return null;
  }
}
