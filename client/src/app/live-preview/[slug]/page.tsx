"use client";
import { publishTemplate } from "@/api/publish-template";
import { LPrevDock } from "@/components/editor-components/livePreviewDock";
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

  const publishSite = async () => {
    await publishTemplate(templateKey, data);
  };

  return (
    <div className="w-full min-h-screen relative">
      <template.component data={data} />

      <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-[100]">
        <LPrevDock publishSite={publishSite} />
      </div>
    </div>
  );
};

export default UserPreview;
