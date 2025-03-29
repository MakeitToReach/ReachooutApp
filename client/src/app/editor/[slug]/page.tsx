"use client";
import { useEffect } from "react";
import { EditorPanel } from "@/components/editor-components/editorPanel";
import { TEMPLATE_REGISTRY } from "@/lib/templateRegistry";
import { usePortfolioStore } from "@/store/portfolio.store";
import { LivePreview } from "@/components/editor-components/LivePreview";
import { useParams } from "next/navigation";

const EditorPage = () => {
    const { slug } = useParams();
    const { resetData } = usePortfolioStore();

    const templateKey = slug as keyof typeof TEMPLATE_REGISTRY;
    const template = TEMPLATE_REGISTRY[templateKey];

    useEffect(() => {
        if (template) {
            resetData(template.schema); // Load default content
        }
    }, [slug]);

    if (!template) return <p>Template not found</p>;

    return (
        <div className="w-full flex">
            {/* Editor Panel */}
            <div className="w-[40%]">
                <EditorPanel />
            </div>

            {/* Live Preview */}
            <div className="w-[60%]">
                <LivePreview templateComponent={template.component} />
            </div>
        </div>
    );
};

export default EditorPage;
