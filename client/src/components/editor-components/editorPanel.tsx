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
export const EditorPanel = ({ isEditing, templateSchema = PF_EDITOR_SCHEMA }: EditorPanelProps) => {
    const { data, reorderSections } = usePortfolioStore();

    const { user } = useUserStore();
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
        <div className="p-4 md:p-10 space-y-10 md:fixed top-0 left-0 md:w-[30%]">
            <EditorTabs
                // sections={data.sections.map((s) => s.type)}
                sections={editorSections}
                templateEditorSchema={templateSchema}
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
                <ReorderSectionsPopup
                    sections={sections}
                    onReorder={(newOrder) => handleReorder(newOrder)}
                />
            </div>
        </div>
    );
};
