"use client";
import { TEMPLATE_REGISTRY } from "@/lib/templateRegistry";
import { usePortfolioStore } from "@/store/portfolio.store";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const UserPreview = () => {
  const router = useRouter();
  const { data } = usePortfolioStore();
  const searchParams = useSearchParams();

  const templateKey = searchParams.get(
    "template",
  ) as keyof typeof TEMPLATE_REGISTRY;

  useEffect(() => {
    if (!data) {
      router.push(`/editor/${templateKey}`);
    }
  }, [data, templateKey, router]);
  // Ensure the templateKey exists in TEMPLATE_REGISTRY
  if (!templateKey || !TEMPLATE_REGISTRY[templateKey]) {
    return <p>Template not found</p>;
  }

  const template = TEMPLATE_REGISTRY[templateKey];

  // Ensure `data` exists before rendering the template
  if (!data) {
    return <p>Loading...</p>;
  }

  return <template.component data={data} />;
};

export default UserPreview;
