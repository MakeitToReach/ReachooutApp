//eslint-disable
import { usePortfolioStore } from "@/store/portfolio.store";
import { Button } from "../ui/button";
import {
  EllipsisVertical,
  LucideSettings,
  LucideUploadCloud,
} from "lucide-react";
import { publishTemplate } from "@/api/publish-template";
import { EditorTabs } from "./editorTabs";
import { ReorderSectionsPopup } from "./popups/SectionsPopup";
import { PF_EDITOR_SCHEMA } from "@/templates/professional/schema/PFEditorSchema";
import { GenericEditorFieldSchema } from "@/schemas/editor.schema";

interface EditorPanelProps {
  isEditing?: boolean;
  templateSchema?: GenericEditorFieldSchema;
}
export const EditorPanel = ({
  isEditing,
  templateSchema = PF_EDITOR_SCHEMA,
}: EditorPanelProps) => {
  const { data, reorderSections } = usePortfolioStore();

  if (!data) return <div>No data found</div>;

  const sections = data.sections.map((section) => ({
    id: section.type,
    name: section.type.replace("Section", ""),
    isFixed: section.isFixed,
  }));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("new data", data);
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    await publishTemplate(data.name, data);
  };

  const handleReorder = (newOrder: string[]) => {
    reorderSections(newOrder);
  };

  const editorSections = data.sections
    .filter((section) => section.isEditable)
    .map((s) => s.type);

  return (
    <div className="flex flex-col gap-4 p-4 md:px-10 md:py-2 md:fixed top-0 left-0 md:w-[30%] h-screen overflow-y-scroll">
      <div className="w-full flex justify-between items-center">
        <ReorderSectionsPopup
          sections={sections}
          onReorder={(newOrder) => handleReorder(newOrder)}
        >
          <button className="cursor-pointer">
            <EllipsisVertical className="size-6" />
          </button>
        </ReorderSectionsPopup>

        <div className="flex items-center">
          {isEditing ? (
            <Button onClick={handleSave} className="cursor-pointer text-blue-600">
              Save
            </Button>
          ) : (
            <Button onClick={handlePublish} variant={'ghost'} className="cursor-pointer text-blue-600">
              Publish{" "}
              <span>
                <LucideUploadCloud />
              </span>
            </Button>
          )}

          <Button
            variant={"ghost"}
            onClick={() => alert("Settings under development")}
          >
            <LucideSettings className="size-6" />
          </Button>
        </div>
      </div>

      <EditorTabs
        className="md:mt-4"
        sections={editorSections}
        templateEditorSchema={templateSchema}
      />
    </div>
  );
};
