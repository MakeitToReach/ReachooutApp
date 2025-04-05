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
    if (template && isNew) {
      resetData(template.schema); // Load default content
    }
    console.log(slug);
  }, [slug]);

  if (!template) return <p>Template not found</p>;

  return (
    <div className="w-full flex">
      {/* Editor Panel */}
      <div className="md:w-[40%] w-full">
        {isEditing ? <EditorPanel isEditing /> : <EditorPanel />}
      </div>

      {/* Live Preview */}
      <div className="md:w-[60%] hidden md:block">
        <LivePreview templateComponent={template.component} />
      </div>
    </div>
  );
};

export default EditorPage;
