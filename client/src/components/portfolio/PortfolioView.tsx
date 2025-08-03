"use client";

import { useEffect, useRef, useState } from "react";
import { TEMPLATE_REGISTRY } from "@/lib/templateRegistry";
import { GenericTemplateSchema } from "@/schemas/templates.schema";
import { notFound } from "next/navigation";
import { Loading } from "../editor-components/loading";

interface Project {
  id: string;
  name: string;
  subDomain: string;
  customDomain?: string;
  logo?: string; // Optional logo/favicon URL
  templates: Array<{
    templateId: string;
    data: GenericTemplateSchema;
    order: number;
  }>;
}

interface PortfolioViewProps {
  project: Project;
}

export default function PortfolioView({ project }: PortfolioViewProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set loading to false after component mounts
    setIsLoading(false);
  }, []);

  // Apply theme styles to the wrapper
  useEffect(() => {
    if (!project.templates.length || !wrapperRef.current) return;

    // Use the first template's theme as the base theme
    const firstTemplate = project.templates[0];
    if (!firstTemplate.data?.theme) return;

    const wrapper = wrapperRef.current;

    const toCSSVars = (theme: Record<string, string>) =>
      Object.entries(theme).reduce((acc, [key, value]) => {
        const cssKey = key.startsWith("--")
          ? key
          : `--${key.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase())}`;
        acc[cssKey] = value;
        return acc;
      }, {} as Record<string, string>);

    const cssVars = toCSSVars(firstTemplate.data.theme);

    Object.entries(cssVars).forEach(([key, value]) => {
      wrapper.style.setProperty(key, value);
    });
  }, [project.templates]);

  if (isLoading) return <Loading />;

  if (!project.templates.length) {
    notFound();
  }

  // Sort templates by order and get the first template
  const sortedTemplates = [...project.templates].sort(
    (a, b) => a.order - b.order
  );
  const firstTemplate = sortedTemplates[0];

  if (!firstTemplate) {
    notFound();
  }

  const template =
    TEMPLATE_REGISTRY[
      firstTemplate.data.name as keyof typeof TEMPLATE_REGISTRY
    ];

  if (!template) {
    console.warn(`Template ${firstTemplate.templateId} not found in registry`);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Template Not Found</h1>
          <p className="text-gray-600">
            The template for this portfolio is not available.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div ref={wrapperRef} className="theme-wrapper w-full relative">
      <template.component data={firstTemplate.data} />
    </div>
  );
}
