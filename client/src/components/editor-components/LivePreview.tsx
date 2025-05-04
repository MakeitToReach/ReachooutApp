"use client";
import { usePortfolioStore } from "@/store/portfolio.store";
import { useEffect } from "react";

export const LivePreview = ({
    templateComponent: TemplateComponent,
    theme,
}: {
    //eslint-disable-next-line
    templateComponent: React.FC<{ data: any }>;
    theme?: Record<string, string>;
}) => {
    const { data, currentEditingSection } = usePortfolioStore();

    useEffect(() => {
        if (currentEditingSection) {
            const sectionElement = document.getElementById(currentEditingSection);
            if (sectionElement) {
                sectionElement.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }
    }, [currentEditingSection]);

    if (!data) return null;
    return (
        <div className="w-full theme-wrapper" style={theme}>
            <TemplateComponent data={data} />
        </div>
    );
};
