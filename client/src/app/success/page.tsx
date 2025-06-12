"use client";

import { setCookie } from "@/api/auth";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, Suspense } from "react";

const AuthSuccessPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      setCookie("token", token);
      router.push("/user");
    }
  }, [token, router]); // Added dependencies to avoid React warning

  return (
    <div>
      <h1>Redirecting to dashboard...</h1>
    </div>
  );
};

const AuthSuccessPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthSuccessPageContent />
    </Suspense>
  );
};

export default AuthSuccessPage;
