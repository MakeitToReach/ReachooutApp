"use client";

import { getTemplatesInProject } from "@/api/project";
import { TemplateCard } from "@/components/editor-components/templateCard";
import AddSlugPopup from "@/components/editor-components/popups/addSlugPopup";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { TemplateItem } from "@/types/projectTemplate.types";

const ProjectPage = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const [templates, setTemplates] = useState<TemplateItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchTemplatesInProject = async () => {
      try {
        const response = await getTemplatesInProject(id as string);
        setTemplates(response || []);
      } catch (error) {
        console.error("Error fetching templates:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTemplatesInProject();
  }, [id]);

  const projectName = templates[0]?.project?.name ?? "Your project";

  return (
    <div>
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="data-[orientation=vertical]:h-4"
          />
        </div>
        <div className="flex justify-between w-full">
          <h1 className="text-xl text-black dark:text-white">{projectName}</h1>
        </div>
      </header>

      <Separator />

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, idx) => (
            <Skeleton
              key={idx}
              className="h-[400px] w-full rounded-lg bg-neutral-900 animate-pulse"
            />
          ))
        ) : (
          <>
            {templates.length > 0
              ? templates.map((item, idx) => (
                  <TemplateCard
                    templateName={`Website ${idx + 1}`}
                    templateId={item.template.id}
                    key={idx}
                    imageUrl={item.template.thumbnailUrl || "/placeholder.png"}
                    previewUrl={
                      item && item.order > 0
                        ? `http://${item.project.subDomain}.${
                            process.env.NODE_ENV === "development"
                              ? "localhost:3000"
                              : "reachoout.com"
                          }/${item.slug}`
                        : `http://${item.project.subDomain}.${
                            process.env.NODE_ENV === "development"
                              ? "localhost:3000"
                              : "reachoout.com"
                          }/`
                    }
                    editorUrl={`/editor/${item.template.name.toLowerCase()}?edit&order=${idx}&pid=${id}&tid=${
                      item.template.id
                    }`}
                    isPublished
                    index={idx}
                    projectId={id}
                    slug={item.slug}
                    onDelete={(newTemplates: TemplateItem[]) => {
                      setTemplates(newTemplates);
                    }}
                  />
                ))
              : null}
            <AddSlugPopup pid={id as string}>
              <Card className="border bg-transparent h-full border-dashed border-gray-400 bg-none rounded-lg flex items-center justify-center cursor-pointer hover:border-primary hover:bg-card transition-colors">
                <CardContent className="p-4">
                  <Button variant="outline">Create New website</Button>
                </CardContent>
              </Card>
            </AddSlugPopup>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectPage;
