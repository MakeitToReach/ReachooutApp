"use client";
import { ThemeSelectDropdown } from "@/components/editor-components/themeSelectDropdown";
import { TEMPLATE_REGISTRY } from "@/lib/templateRegistry";
import { usePortfolioStore } from "@/store/portfolio.store";
import { notFound, useParams, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { Loading } from "../editor-components/loading";
import { getCategoryByTemplateIdAndCategoryName } from "@/api/templates";

const PreviewPage = () => {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;

  const searchParams = useSearchParams();
  const { data, resetData } = usePortfolioStore();

  const templateKey = slug as keyof typeof TEMPLATE_REGISTRY;
  const SelectedTemplate = TEMPLATE_REGISTRY[templateKey];

  const isNew = searchParams?.has("new");
  const category = searchParams?.get("category");
  const templateId = searchParams?.get("tid");

  const fetchCategoryData = async () => {
    const response = await getCategoryByTemplateIdAndCategoryName(
      templateId as string,
      category as string,
    );
    if (response) {
      resetData(response.category);
    }
  };

  useEffect(() => {
    if (SelectedTemplate && isNew) {
      resetData(SelectedTemplate.data);
    }
    if (category) {
      fetchCategoryData();
    }
    return () => {
      resetData(null);
    };
  }, []);

  if (!slug || typeof slug != "string") {
    return <Loading />;
  }
  if (!data) {
    return <Loading />;
  }
  if (!SelectedTemplate) {
    notFound();
  }

  return (
    <div
      className="theme-wrapper relative"
      style={(data?.theme as Record<string, string>) || {}}
    >
      <div className="fixed bottom-4 right-0 -translate-x-1/2 md:translate-x-0 md:bottom-4 md:left-4 w-[200px] z-50">
        <ThemeSelectDropdown />
      </div>
      <SelectedTemplate.component data={data} />
    </div>
  );
};

export default PreviewPage;
