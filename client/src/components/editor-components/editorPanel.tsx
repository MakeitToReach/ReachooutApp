//eslint-disable
import { usePortfolioStore } from "@/store/portfolio.store";
import { Button } from "../ui/button";
import { LucideUploadCloud } from "lucide-react";
import { useUserStore } from "@/store/user.store";
import { publishTemplate } from "@/api/publish-template";
import PreviewButton from "./previewBtn";
import { EditorTabs } from "./editorTabs";
import { ReorderSectionsPopup } from "./popups/SectionsPopup";
import { PF_EDITOR_SCHEMA } from "@/templates/professional/schema/PFEditorSchema";
import { GenericEditorFieldSchema } from "@/schemas/editor.schema";

interface EditorPanelProps {
  isEditing?: boolean;
  templateSchema?: GenericEditorFieldSchema;
}
export const EditorPanel = ({ isEditing }: EditorPanelProps) => {
  const { data } = usePortfolioStore();

  const { user } = useUserStore();
  if (!data) return <div>No data found</div>;

  // const heroSection = data.sections.find((s) => s.type === "hero");
  // const aboutSection = data.sections.find((s) => s.type === "about");
  // const workSection = data.sections.find((s) => s.type === "projects");
  // const socialSection = data.sections.find((s) => s.type === "social");
  // const servicesSection = data.sections.find((s) => s.type === "services");

  const sections = data.sections.map((section) => ({
    id: section.type,
    name: section.type.replace("Section", ""),
  }));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("new data", data);
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    await publishTemplate(data.name, data);
  };
  return (
    <div className="p-4 md:p-10 space-y-10 md:fixed top-0 left-0 md:w-[30%]">
      <EditorTabs
        sections={data.sections.map((s) => s.type)}
        templateEditorSchema={PF_EDITOR_SCHEMA}
      />
      <div className="space-x-2">
        <PreviewButton
          previewUrl={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/live-preview/${user?.name}?template=${data.name}`}
        />
        {isEditing ? (
          <Button onClick={handleSave} className="cursor-pointer">
            Save
          </Button>
        ) : (
          <Button onClick={handlePublish} className="cursor-pointer">
            Publish{" "}
            <span>
              <LucideUploadCloud />
            </span>
          </Button>
        )}
        <ReorderSectionsPopup sections={sections} onReorder={() => {}} />
      </div>
    </div>
  );
};
