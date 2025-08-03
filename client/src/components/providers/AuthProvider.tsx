"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/store/user.store";
import { getUserFromToken } from "@/api/auth";
import { getToken } from "@/lib/isAuthenticated";
import { useRouter, usePathname } from "next/navigation";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { user, updateUserFromServer } = useUserStore();
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const initializeAuth = async () => {
      if (isInitialized) return;

      const token = getToken();
      if (token && !user) {
        try {
          const response = await getUserFromToken();
          if (response?.user) {
            updateUserFromServer(response.user);
          } else {
            // Token is invalid, clear it
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          }
        } catch (error) {
          console.error("Error fetching user:", error);
          // Token is invalid, clear it
          document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }
      }
      setIsInitialized(true);
    };

    initializeAuth();
  }, [user, updateUserFromServer, isInitialized]);

  // Check for token changes more frequently
  useEffect(() => {
    const checkToken = async () => {
      const token = getToken();
      if (token && !user) {
        try {
          const response = await getUserFromToken();
          if (response?.user) {
            updateUserFromServer(response.user);
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };

    // Check immediately
    checkToken();

    // Also check periodically for a short time after initialization
    if (isInitialized) {
      const interval = setInterval(checkToken, 500); // Check every 500ms
      setTimeout(() => clearInterval(interval), 3000); // Stop after 3 seconds
    }
  }, [user, isInitialized, updateUserFromServer]);

  // Redirect from /dashboard to /user if user is authenticated
  useEffect(() => {
    if (isInitialized && user && pathname === "/dashboard") {
      router.replace("/user");
    }
  }, [isInitialized, user, pathname, router]);

  return <>{children}</>;
}; 