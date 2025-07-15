"use client";

import { getTemplatesInProject } from "@/api/project";
// import PreviewButton from "@/components/editor-components/previewBtn";
import { TemplateCard } from "@/components/editor-components/templateCard";
import AddSlugPopup from "@/components/editor-components/popups/addSlugPopup";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface TemplateItem {
  projectId: string;
  templateId: string;
  template: {
    id: string;
    name: string;
    thumbnailUrl: string;
    tags: string[];
  };
  project: {
    id: string;
    name: string;
    subDomain: string;
    customDomain: string | null;
  };
}

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

  const projectName = templates[0]?.project?.name ?? "Project Name";
  // const projectDomain =
  //   templates[0]?.project?.customDomain || templates[0]?.project?.subDomain;

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
                    previewUrl={`/preview/${item.template.name.toLowerCase()}`}
                    editorUrl={`/editor/${item.template.name.toLowerCase()}?edit&order=${idx}&pid=${id}&tid=${
                      item.template.id
                    }`}
                    // showPreview={true}
                    isPublished
                    index={idx}
                    projectId={id}
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
