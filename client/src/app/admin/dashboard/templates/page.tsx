"use client";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
import { fetchAllTemplates } from "@/api/explore";
import { AdminStats } from "@/components/adminDashboard-components/statsCard";
import { TemplateCard } from "@/components/editor-components/templateCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { GenericTemplateSchema } from "@/schemas/templates.schema";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AnalyticsData } from "../page";

const TemplatesDashboardPage = () => {
  const [templates, setTemplates] = useState<GenericTemplateSchema[]>([]);
  const [data, setData] = useState<AnalyticsData[]>([]);
  useEffect(() => {
    const fetchTemplates = async () => {
      const response = await fetchAllTemplates();
      setTemplates(response.templates);
      setData([
        {
          name: "Total Templates",
          stat: response.templates.length,
        },
      ]);
    };

    fetchTemplates();
  }, []);
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <h1 className="text-3xl">Templates</h1>
      <AdminStats data={data} />

      <div className="grid md:grid-cols-4 gap-4">
        {templates.length > 0 ? (
          templates.map((template, idx) => (
            <TemplateCard
              key={idx}
              imageUrl={template.thumbnailUrl || "/placeholder.png"}
              previewUrl={`/preview/${template.name.toLowerCase()}`}
              editorUrl={`/editor/${template.name.toLowerCase()}?new`}
            >
              <Link href={`/admin/dashboard/template/${template.id}?name=${template.name.toLowerCase()}`}>
                <Button>Settings</Button>
              </Link>
            </TemplateCard>
          ))
        ) : (
          <>
            {Array.from({ length: 4 }).map((_, idx) => (
              <Skeleton key={idx} className="h-[400px] w-full animate-pulse" />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default TemplatesDashboardPage;
