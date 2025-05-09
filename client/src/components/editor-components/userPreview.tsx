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
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [templateKey, setTemplateKey] = useState<string | null>(null);
    const [data, setData] = useState<GenericTemplateSchema | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Extract templateKey only on client
    useEffect(() => {
        const key = searchParams.get("template");
        if (key) setTemplateKey(key);
    }, [searchParams]);

    const template = templateKey
        ? TEMPLATE_REGISTRY[templateKey as keyof typeof TEMPLATE_REGISTRY]
        : null;

    // Fetch data
    useEffect(() => {
        if (!templateKey || !template) return;

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
                toast.error("Failed to load data");
                router.push(`/`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [templateKey, template, router]);

    // Apply theme styles
    useEffect(() => {
        if (!data?.theme || !wrapperRef.current) return;

        const wrapper = wrapperRef.current;

        const toCSSVars = (theme: Record<string, string>) =>
            Object.entries(theme).reduce(
                (acc, [key, value]) => {
                    const cssKey = key.startsWith("--")
                        ? key
                        : `--${key.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase())}`;
                    acc[cssKey] = value;
                    return acc;
                },
                {} as Record<string, string>,
            );

        const cssVars = toCSSVars(data.theme);

        Object.entries(cssVars).forEach(([key, value]) => {
            wrapper.style.setProperty(key, value);
        });
    }, [data?.theme]);

    if (isLoading || !templateKey || !data || !data.theme) return <PageLoader />;
    if (!template) return <p>Template not found</p>;

    return (
        <div ref={wrapperRef} className="theme-wrapper w-full">
            <template.component data={data} />
        </div>
    );
};

export default UserPreview;
