"use client";

import { getTemplatesInProject } from "@/api/project";
import PreviewButton from "@/components/editor-components/previewBtn";
import { TemplateCard } from "@/components/editor-components/templateCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
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
    const projectDomain =
        templates[0]?.project?.customDomain || templates[0]?.project?.subDomain;

    return (
        <div className="p-2 md:p-4 space-y-6">
            {/* Header */}
            <header className="flex gap-1">
                <SidebarTrigger />
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                        <h1 className="text-2xl font-bold mb-2">{projectName}</h1>
                        {projectDomain && (
                            <PreviewButton previewUrl={`https://${projectDomain}`} />
                        )}
                    </div>
                </div>
            </header>

            <Separator />

            {/* Templates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                                    templateId={item.template.id}
                                    key={idx}
                                    imageUrl={item.template.thumbnailUrl || "/placeholder.png"}
                                    previewUrl={`/preview/${item.template.name.toLowerCase()}`}
                                    editorUrl={`/editor/${item.template.name.toLowerCase()}?edit&order=${idx}&pid=${id}&tid=${item.template.id}`}
                                    showPreview={false}
                                    isPublished
                                    index={idx}
                                    projectId={id}
                                />
                            ))
                            : null}
                        <Link href={`/explore?pid=${id}`}>
                            <Card className="border bg-transparent h-full border-dashed border-gray-400 bg-none rounded-lg flex items-center justify-center cursor-pointer hover:border-primary hover:bg-card transition-colors">
                                <CardContent className="p-4">
                                    <Button variant="outline">Create New website</Button>
                                </CardContent>
                            </Card>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProjectPage;
