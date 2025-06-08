"use client";
import { ThemeSelectDropdown } from "@/components/editor-components/themeSelectDropdown";
import { TEMPLATE_REGISTRY } from "@/lib/templateRegistry";
import { usePortfolioStore } from "@/store/portfolio.store";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const Preview = () => {
    const { slug } = useParams();
    const { data, resetData } = usePortfolioStore();

    const templateKey = slug as keyof typeof TEMPLATE_REGISTRY;
    const SelectedTemplate = TEMPLATE_REGISTRY[templateKey];

    useEffect(() => {
        if (SelectedTemplate) {
            resetData(SelectedTemplate.data);
        }
    }, []);

    if (!slug || typeof slug != "string") {
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
            <div className="absolute top-4 right-4 w-[200px] z-[149]">
                <ThemeSelectDropdown />
            </div>
            <SelectedTemplate.component data={data!} />
        </div>
    );
};

export default Preview;
