"use client";
import { ThemeSelectDropdown } from "@/components/editor-components/themeSelectDropdown";
import { TEMPLATE_REGISTRY } from "@/lib/templateRegistry";
import { usePortfolioStore } from "@/store/portfolio.store";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const PreviewPage = () => {
    const params = useParams<{ slug: string }>();
    const slug = params?.slug;

    const searchParams = useSearchParams();
    const { data, resetData } = usePortfolioStore();

    const [loading, setLoading] = useState(true);

    const templateKey = slug as keyof typeof TEMPLATE_REGISTRY;
    const SelectedTemplate = TEMPLATE_REGISTRY[templateKey];
    const isNew = searchParams?.has("new");

    useEffect(() => {
        if (SelectedTemplate && isNew) {
            resetData(SelectedTemplate.data);
            setLoading(false);
        }
    }, []);

    if (!slug || typeof slug != "string" || loading) {
        return <div>Loading</div>;
    }
    if (!SelectedTemplate) {
        return <div>Template not found</div>;
    }

    return (
        <div
            className="theme-wrapper relative"
            style={(data?.theme as Record<string, string>) || {}}
        >
            <div className="fixed hidden bottom-4 right-0 -translate-x-1/2 md:translate-x-0 md:top-4 md:right-4 w-[200px] z-[149]">
                <ThemeSelectDropdown />
            </div>
            <SelectedTemplate.component data={data!} />
        </div>
    );
};

export default PreviewPage;
