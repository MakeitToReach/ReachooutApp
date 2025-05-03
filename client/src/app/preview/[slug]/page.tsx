"use client";
import { TEMPLATE_REGISTRY } from "@/lib/templateRegistry";
import { useParams } from "next/navigation";
import React from "react";

const Preview = () => {
  const { slug } = useParams();

  if (!slug || typeof slug != "string") {
    return <div>Loading</div>;
  }

  const templateKey = slug as keyof typeof TEMPLATE_REGISTRY;
  const SelectedTemplate = TEMPLATE_REGISTRY[templateKey];

  if (!SelectedTemplate) {
    return <div>Template not found</div>;
  }

  return (
    <div className="theme-wrapper" style={(SelectedTemplate.data.theme as Record<string, string>) || {}}>
      <SelectedTemplate.component data={SelectedTemplate.data} />
    </div>
  );
};

export default Preview;
