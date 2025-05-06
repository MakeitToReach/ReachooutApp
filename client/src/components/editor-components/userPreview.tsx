"use client";

import { getUserTemplateData } from "@/api/user-template";
import { TEMPLATE_REGISTRY } from "@/lib/templateRegistry";
import { GenericTemplateSchema } from "@/schemas/templates.schema";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import Loader from "@/components/Loader"; // adjust import path as needed
import { PageLoader } from "@/components/editor-components/pageLoader";
import { toast } from "sonner";

export const UserPreview = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [data, setData] = useState<GenericTemplateSchema | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const templateKey = searchParams.get(
        "template",
    ) as keyof typeof TEMPLATE_REGISTRY;
    const template = TEMPLATE_REGISTRY[templateKey];

    useEffect(() => {
        if (!template) return;

        const fetchData = async () => {
            try {
                const fetchedData = await getUserTemplateData(templateKey);
                if (!fetchedData) {
                    router.push(`/`);
                    toast.error("something went wrong");
                }
                setData(fetchedData.userTemplateData);
            } catch (err) {
                console.error("Failed to load template data:", err);
                router.push(`/`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [templateKey]);

    if (isLoading || !data || !data.theme) return <PageLoader />;
    if (!template) return <p>Template not found</p>;

    return (
        <div
            className="theme-wrapper"
            style={(data.theme as Record<string, string>) || {}}
        >
            <template.component data={data} />
        </div>
    );
};
