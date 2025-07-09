"use client";

import { useEffect, useRef, useState } from "react";
import { TEMPLATE_REGISTRY } from "@/lib/templateRegistry";
import { GenericTemplateSchema } from "@/schemas/templates.schema";
import { PageLoader } from "@/components/editor-components/pageLoader";

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

  if (isLoading) return <PageLoader />;

  if (!project.templates.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Portfolio Not Found</h1>
          <p className="text-gray-600">
            This portfolio hasn&apos;t been published yet.
          </p>
        </div>
      </div>
    );
  }

  // Sort templates by order
  const sortedTemplates = [...project.templates].sort(
    (a, b) => a.order - b.order
  );

  return (
    <div ref={wrapperRef} className="theme-wrapper w-full">
        {sortedTemplates.map((templateInstance, index) => {
          const template =
            TEMPLATE_REGISTRY[
              templateInstance.data.name as keyof typeof TEMPLATE_REGISTRY
            ];

          if (!template) {
            console.warn(
              `Template ${templateInstance.templateId} not found in registry`
            );
            return null;
          }

          return (
            <div key={`${templateInstance.templateId}-${index}`}>
              <template.component data={templateInstance.data} />
            </div>
          );
        })}
      </div>
  );
}
