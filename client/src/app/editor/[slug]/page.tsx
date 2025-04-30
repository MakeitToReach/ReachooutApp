"use client";
import { useEffect, useState } from "react";
import { EditorPanel } from "@/components/editor-components/editorPanel";
import { TEMPLATE_REGISTRY } from "@/lib/templateRegistry";
import { usePortfolioStore } from "@/store/portfolio.store";
import { LivePreview } from "@/components/editor-components/LivePreview";
import { useParams, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LucideSidebarOpen } from "lucide-react";

const EditorPage = () => {
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const [editorOpen, setEditorOpen] = useState(true);

  const isNew = searchParams.has("new");
  const { resetData, data } = usePortfolioStore();
  const isEditing = searchParams.has("edit");

  const templateKey = slug as keyof typeof TEMPLATE_REGISTRY;
  const template = TEMPLATE_REGISTRY[templateKey];

  useEffect(() => {
    // const data = usePortfolioStore.getState().data;
    // console.log("current data in store for editing:", data);
    if (template && isNew) {
      resetData(template.data); // Load default content
    }

    return () => {
      if (isNew) {
        resetData(null);
      }
    };
  }, [slug, isNew]);

  const toggleEditor = () => {
    setEditorOpen((prev) => !prev);
  };

  if (!template) return <p>Template not found</p>;

  return (
    <div className="relative w-full flex overflow-x-hidden">
      {/* Editor Panel */}
      {editorOpen ? (
        <>
          <div className="w-full md:w-[30%]" />
          <div
            className={cn("w-full md:w-[30%] fixed top-0 left-0 z-[100]", {
              hidden: !editorOpen,
            })}
          >
            {isEditing ? (
              <EditorPanel
                toggleEditor={toggleEditor}
                isEditing
                templateSchema={template.editorSchema}
              />
            ) : (
              <EditorPanel
                templateSchema={template.editorSchema}
                toggleEditor={toggleEditor}
              />
            )}
          </div>
        </>
      ) : (
        <Button
          variant={"default"}
          className="fixed bottom-4 left-4 z-[100]"
          onClick={toggleEditor}
        >
          <LucideSidebarOpen className="w-6 h-6" />
        </Button>
      )}

      {/* Live Preview */}
      <div
        className={cn("md:w-[70%] hidden md:block flex-grow", {
          "w-full block": !editorOpen,
        })}
      >
        <LivePreview
          templateComponent={template.component}
          theme={data?.theme}
        />
      </div>
    </div>
  );
};

export default EditorPage;
