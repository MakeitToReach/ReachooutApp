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
import { deleteTemplateByTemplateId } from "@/api/admin";
import { LucideSettings, Trash2 } from "lucide-react";

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

    const handleDeleteTemplate = async (templateId: string) => {
        try {
            await deleteTemplateByTemplateId(templateId);
            const updatedTemplates = templates.filter(
                (template) => template.id !== templateId,
            );
            setTemplates(updatedTemplates);
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };
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
                            id={template.id}
                            templateName={template.name}
                            textClassName="text-black"
                        >
                            <div className="flex gap-2">
                                <Button variant={"link"} className="px-0">

                                <Link
                                    href={`/admin/dashboard/template/${template.id}?name=${template.name.toLowerCase()}`}
                                >
                                    <LucideSettings />
                                </Link>
                                </Button>

                                <Button
                                    variant={"link"}
                                    onClick={() => handleDeleteTemplate(template.id)}
                                    className="px-0 text-destructive"
                                >
                                    <Trash2 />
                                </Button>
                            </div>
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
