"use client";

import { getUserTemplateData } from "@/api/user-template";
import { TEMPLATE_REGISTRY } from "@/lib/templateRegistry";
import { GenericTemplateSchema } from "@/schemas/templates.schema";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import Loader from "@/components/Loader"; // adjust import path as needed
import { PageLoader } from "@/components/editor-components/pageLoader";

const UserPreview = () => {
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
                if (!fetchedData) return router.push(`/`);
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

    if (!template) return <p>Template not found</p>;
    if (isLoading || !data) return <PageLoader />;

    return (
        <div style={data.theme as React.CSSProperties} className="theme-wrapper">
            <template.component data={data} />
        </div>
    );
};

export default UserPreview;
