"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/store/user.store";
import { getUserFromToken } from "@/api/auth";
import { getToken } from "@/lib/isAuthenticated";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { user, updateUserFromServer } = useUserStore();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      if (isInitialized) return;

      const token = getToken();
      if (token && !user) {
        try {
          const response = await getUserFromToken(token);
          if (response?.user) {
            updateUserFromServer(response.user);
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
      setIsInitialized(true);
    };

    initializeAuth();
  }, [user, updateUserFromServer, isInitialized]);

  return <>{children}</>;
}; 