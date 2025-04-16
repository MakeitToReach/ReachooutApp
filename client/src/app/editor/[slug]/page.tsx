"use client";
import { useEffect } from "react";
import { EditorPanel } from "@/components/editor-components/editorPanel";
import { TEMPLATE_REGISTRY } from "@/lib/templateRegistry";
import { usePortfolioStore } from "@/store/portfolio.store";
import { LivePreview } from "@/components/editor-components/LivePreview";
import { useParams, useSearchParams } from "next/navigation";

const EditorPage = () => {
    const { slug } = useParams();
    const searchParams = useSearchParams();

    const isNew = searchParams.has("new");
    const { resetData } = usePortfolioStore();
    const isEditing = searchParams.has("edit");

    const templateKey = slug as keyof typeof TEMPLATE_REGISTRY;
    const template = TEMPLATE_REGISTRY[templateKey];

    useEffect(() => {
        
        const data = usePortfolioStore.getState().data;
        console.log("current data in store for editing:", data);
        if (template && isNew) {
            resetData(template.data); // Load default content
        }

        return () => {
            if (isNew) {
                resetData(null);
            }
        };
    }, [slug, isNew]);

    if (!template) return <p>Template not found</p>;

    return (
        <div className="w-full flex overflow-x-hidden">
            {/* Editor Panel */}
            <div className="md:w-[30%] w-full">
                {isEditing ? (
                    <EditorPanel isEditing templateSchema={template.editorSchema} />
                ) : (
                    <EditorPanel templateSchema={template.editorSchema} />
                )}
            </div>

            {/* Live Preview */}
            <div className="md:w-[70%] hidden md:block">
                <LivePreview templateComponent={template.component} />
            </div>
        </div>
    );
};

export default EditorPage;
