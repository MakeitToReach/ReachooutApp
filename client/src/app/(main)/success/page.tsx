"use client";

import { setCookie } from "@/api/auth";
import { Loading } from "@/components/editor-components/loading";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, Suspense } from "react";

const AuthSuccessPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // const { setUser } = useUserStore();

  const token = searchParams?.get("token");

  useEffect(() => {
    if (token) {
      setCookie("token", token);
      router.push("/user");
    }
  }, [token, router]);

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
