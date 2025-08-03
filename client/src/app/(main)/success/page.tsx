"use client";

import { setCookie } from "@/api/auth";
import { getUserFromToken } from "@/api/auth";
import { useUserStore } from "@/store/user.store";
import { Loading } from "@/components/editor-components/loading";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, Suspense } from "react";

const AuthSuccessPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { updateUserFromServer, user } = useUserStore();

  const token = searchParams?.get("token");

  useEffect(() => {
    const handleAuthSuccess = async () => {
      if (token) {
        try {
          // Set the token cookie
          setCookie("token", token);
          
          // Fetch user data using the token
          const response = await getUserFromToken(token);
          if (response?.user) {
            // Update the user store with the fetched data
            updateUserFromServer(response.user);
            
            // Wait a moment for the store to update, then redirect
            setTimeout(() => {
              router.push("/user");
            }, 100);
          } else {
            console.error("Failed to fetch user data");
            router.push("/");
          }
        } catch (error) {
          console.error("Error handling auth success:", error);
          router.push("/");
        }
      } else {
        // No token found, redirect to home
        router.push("/");
      }
    };

    handleAuthSuccess();
  }, [token, router, updateUserFromServer]);

  // If user is already loaded, redirect immediately
  useEffect(() => {
    if (user) {
      router.push("/user");
    }
  }, [user, router]);

  return <Loading />;
};

const AuthSuccessPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <AuthSuccessPageContent />
    </Suspense>
  );
};

export default AuthSuccessPage;
