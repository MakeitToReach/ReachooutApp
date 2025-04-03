import { toast } from "sonner";
import { api } from "../axios.config";

export const loginUser = async (name: string, password: string) => {
  try {
    const response = await api.post(
      "/v1/auth/login",
      { name, password },
      { withCredentials: true },
    );

    if (response.status === 200) {
      toast.success("Logged in successfully");

      // If the token is sent in the response body, store it
      if (response.data.token) {
        document.cookie = `token=${response.data.token}; path=/; Secure; SameSite=Strict`;
      }

      return response.data;
    } else if (response.status === 401) {
      toast.error("Invalid email or password");
    } else {
      toast.warning("An unexpected error occurred");
    }
  } catch (error) {
    toast.error("Something went wrong. Please try again.");
    console.log(error);
  }
};

export const registerUser = async (
  email: string,
  name: string,
  password: string,
) => {
  const response = await api.post("/v1/auth/register", {
    email,
    name,
    password,
  });
  switch (response.status) {
    case 201:
      toast.success("Account created successfully");
      break;
    case 400:
      toast.error("User already exist");
      break;
    default:
      toast.warning("An unexpected error occured");
  }

  return response.data;
};

export const logoutUser = () => {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  toast.success("Logged out successfully");
};
