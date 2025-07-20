import { toast } from "sonner";
import { api } from "../axios.config";
import { getToken } from "@/lib/isAuthenticated";

export const getProjectById = async (id: string) => {
  const token = getToken();
  const response = await api.get(`/v1/project/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  return response.data;
};
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

export const createUserProject = async (name: string, description: string) => {
  const token = getToken();
  const response = await api.post(
    `/v1/project/create`,
    { name, description },
    {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    }
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
  projectId: string
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
    }
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
  console.log("🔍 getProjectBySubdomain called with subdomain:", subdomain);
  console.log("🔍 API base URL:", process.env.NEXT_PUBLIC_BACKEND_URL);
  console.log(
    "🔍 Full API URL:",
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/project/subdomain/${subdomain}`
  );

  try {
    const response = await api.get(`/v1/project/subdomain/${subdomain}`, {
      withCredentials: false, // Public access, no authentication required
    });

    if (response.status === 200 || response.status === 304) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error("❌ Error fetching project:", error);

    return null;
  }
};

export const getProjectByCustomDomain = async (customDomain: string) => {
  console.log(
    "🔍 getProjectByCustomDomain called with customDomain:",
    customDomain
  );
  // console.log("🔍 API base URL:", process.env.NEXT_PUBLIC_BACKEND_URL);
  // console.log(
  //   "🔍 Full API URL:",
  //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/project/custom-domain/${customDomain}`
  // );

  try {
    const response = await api.get(
      `/v1/project/custom-domain/${customDomain}`,
      {
        withCredentials: false,
      }
    );

    if (response.status === 200 || response.status === 304) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error("❌ Error fetching project:", error);
    console.error("❌ Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      name: error instanceof Error ? error.name : "Unknown",
      stack: error instanceof Error ? error.stack : undefined,
    });

    // Log axios specific error details if available
    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as {
        response?: {
          status?: number;
          statusText?: string;
          data?: unknown;
          headers?: unknown;
        };
      };
      console.error("❌ Axios error details:", {
        status: axiosError.response?.status,
        statusText: axiosError.response?.statusText,
        data: axiosError.response?.data,
        headers: axiosError.response?.headers,
      });
    }

    return null;
  }
};

export const updateProjectFavicon = async (
  projectId: string,
  faviconUrl: string
) => {
  const token = getToken();
  const response = await api.put(
    `/v1/project/update-favicon`,
    {
      projectId: projectId,
      faviconUrl: faviconUrl,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  if (response.status === 200) {
    toast.success("Favicon updated successfully");
    return response.data;
  }
  toast.error(`Failed to update favicon: ${response.data.error}`);
  return null;
};

export const updateProjectMetaData = async (
  projectId: string,
  name: string,
  description: string
) => {
  const token = getToken();
  const response = await api.put(
    `/v1/project/update`,
    {
      projectId: projectId,
      name: name,
      description: description,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  if (response.status === 200) {
    toast.success("Project meta data updated successfully");
    return response.data;
  }
  toast.error(`Failed to update project meta data: ${response.data.error}`);
  return null;
};

export const updateTemplateSEO = async (
  projectId: string,
  templateId: string,
  slug: string,
  seoTitle: string,
  seoDescription: string
) => {
  const token = getToken();
  const response = await api.put(
    `/v1/project/update-template-seo`,
    {
      projectId: projectId,
      templateId: templateId,
      slug: slug,
      seoTitle: seoTitle,
      seoDescription: seoDescription,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  if (response.status === 200) {
    toast.success("Template SEO settings updated successfully");
    return response.data;
  }
  toast.error(`Failed to update template SEO: ${response.data.error}`);
  return null;
};

export const getProjectBySubdomainAndSlug = async (
  subdomain: string,
  slug: string
) => {
  const response = await api.get(
    `/v1/project/subdomain/${subdomain}/slug/${slug}`
  );
  return response.data;
};

export const getProjectByCustomDomainAndSlug = async (
  customDomain: string,
  slug: string
) => {
  const response = await api.get(
    `/v1/project/custom-domain/${customDomain}/slug/${slug}`
  );
  return response.data;
};


export const checkSlugAvailability = async (
  pid: string,
  slug: string
): Promise<boolean> => {
  try {
    const token = getToken();
    const response = await api.get(
      `/v1/project/validate-slug/${pid}/${slug}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      return response.data.available;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error while checking slug", error);
    return false;
  }
};