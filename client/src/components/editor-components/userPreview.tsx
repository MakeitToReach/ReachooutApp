"use client";

import { getUserTemplateData } from "@/api/user-template";
import { TEMPLATE_REGISTRY } from "@/lib/templateRegistry";
import { GenericTemplateSchema } from "@/schemas/templates.schema";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PageLoader } from "@/components/editor-components/pageLoader";
import { toast } from "sonner";

export const UserPreview = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [data, setData] = useState<GenericTemplateSchema | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const wrapperRef = useRef<HTMLDivElement>(null); 

    const templateKey = searchParams.get(
        "template",
    ) as keyof typeof TEMPLATE_REGISTRY;
    const template = TEMPLATE_REGISTRY[templateKey];

    // Fetch template data
    useEffect(() => {
        if (!template) return;

        const fetchData = async () => {
            try {
                const fetchedData = await getUserTemplateData(templateKey);
                if (!fetchedData) {
                    toast.error("Something went wrong");
                    router.push(`/`);
                    return;
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

    useEffect(() => {
        if (data?.theme && wrapperRef.current) {
            const wrapper = wrapperRef.current;
            for (const [key, value] of Object.entries(data.theme)) {
                wrapper.style.setProperty(key, value);
            }
        }
    }, [data?.theme]);

    if (isLoading || !data || !data.theme) return <PageLoader />;
    if (!template) return <p>Template not found</p>;

    return (
        <div ref={wrapperRef} className="theme-wrapper w-full">
            <template.component data={data} />
        </div>
    );
};

export default UserPreview;
