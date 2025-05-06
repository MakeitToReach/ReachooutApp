import { usePortfolioStore } from "@/store/portfolio.store";
import { Button } from "../ui/button";
import {
    EllipsisVertical,
    LucideChevronLeft,
    LucideEye,
    LucideLoaderCircle,
    LucidePalette,
    LucideSettings,
    LucideUploadCloud,
} from "lucide-react";
import { publishTemplate } from "@/api/publish-template";
import { EditorTabs } from "./editorTabs";
import { ReorderSectionsPopup } from "./popups/SectionsPopup";
import { PF_EDITOR_SCHEMA } from "@/templates/professional/schema/PFEditorSchema";
import { GenericEditorFieldSchema } from "@/schemas/editor.schema";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { SettingsDropdown } from "./settingsDropdown";
import { ThemePickerDialog } from "./popups/colorThemeDialog";

interface EditorPanelProps {
    isEditing?: boolean;
    templateSchema?: GenericEditorFieldSchema;
    toggleEditor: () => void;
}
export const EditorPanel = ({
    isEditing,
    templateSchema = PF_EDITOR_SCHEMA,
    toggleEditor,
}: EditorPanelProps) => {
    const { data, reorderSections, setThemeObject } = usePortfolioStore();
    const [editorTabIndex, setEditorTabIndex] = useState(0);
    const [loading, setLoading] = useState(false);

    if (!data) return <div>No data found</div>;

    const sections = data.sections.map((section) => ({
        id: section.type,
        name: section.type.replace("Section", ""),
        isFixed: section.isFixed,
    }));

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Work in progress");
        console.log("new data", data);
    };

    const handlePublish = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await publishTemplate(data.name, data);
        setLoading(false);
    };

    const handleReorder = (newOrder: string[]) => {
        reorderSections(newOrder);
    };

    const editorSections = data.sections
        .filter((section) => section.isEditable)
        .map((s) => s.type);

    return (
        <div
            className={cn(
                "flex flex-col gap-4 p-4 md:px-10 md:py-2 h-screen overflow-y-scroll overflow-x-hidden w-full font-Poppins",
            )}
        >
            <div className="w-full flex justify-between items-center border-border border rounded-md p-2 shadow-xs shadow-gray-300 transition-all">
                <ReorderSectionsPopup
                    sections={sections}
                    onReorder={(newOrder) => handleReorder(newOrder)}
                    onEdit={(tabIdx) => setEditorTabIndex(tabIdx)}
                >
                    <button className="cursor-pointer">
                        <EllipsisVertical className="size-6" />
                    </button>
                </ReorderSectionsPopup>

                <div className="flex items-center gap-2">
                    <ThemePickerDialog
                        initialTheme={data?.theme}
                        onThemeChange={(newTheme) => setThemeObject(newTheme)}
                    >
                        <LucidePalette className="size-6 cursor-pointer" role="button" />
                    </ThemePickerDialog>
                    {isEditing ? (
                        <Button
                            onClick={handleSave}
                            className="cursor-pointer text-blue-600"
                            variant={"ghost"}
                        >
                            Save
                        </Button>
                    ) : (
                        <>
                            <Button
                                onClick={handlePublish}
                                variant={"ghost"}
                                className="cursor-pointer flex items-center"
                            >
                                {loading ? (
                                    <LucideLoaderCircle className="size-6 animate-spin" />
                                ) : (
                                    <>
                                        <span className="hidden md:block text-lg">Publish</span>
                                        <span>
                                            <LucideUploadCloud className="size-6" />
                                        </span>
                                    </>
                                )}
                            </Button>
                        </>
                    )}
                    <SettingsDropdown>
                        <LucideSettings className="size-6" role="button" />
                    </SettingsDropdown>

                    <Button
                        variant={"ghost"}
                        onClick={() => toggleEditor()}
                        className="cursor-pointer"
                    >
                        <LucideChevronLeft className="size-6 hidden md:block" />
                        <LucideEye className="size-6 md:hidden" />
                    </Button>
                </div>
            </div>
            <EditorTabs
                className="md:mt-2"
                sections={editorSections}
                templateEditorSchema={templateSchema}
                TabIndex={editorTabIndex}
            />
        </div>
    );
};
