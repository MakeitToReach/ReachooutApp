import { usePortfolioStore } from "@/store/portfolio.store";
import { Button } from "../ui/button";
import {
    ArrowUpDown,
    Home,
    LucideEye,
    LucideLoaderCircle,
    LucidePalette,
    LucideUploadCloud,
    SidebarClose,
} from "lucide-react";
import { publishTemplate, updateTemplateInstanceData } from "@/api/templates";
import { EditorTabs } from "./editorTabs";
import { ReorderSectionsPopup } from "./popups/SectionsPopup";
import { PF_EDITOR_SCHEMA } from "@/templates/professional/schema/PFEditorSchema";
import { GenericEditorFieldSchema } from "@/schemas/editor.schema";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { ThemePickerDialog } from "./popups/colorThemeDialog";
import { useRouter } from "next/navigation";
import { useEditorTabIdxStore } from "@/store/editorTabIdx.store";
import Link from "next/link";

interface EditorPanelProps {
    isEditing?: boolean;
    templateSchema?: GenericEditorFieldSchema;
    toggleEditor: () => void;
    TabIndex?: number;
    projectId: string;
    templateId: string;
    order?: number;
    slug?: string;
    handlePublish?: () => void;
    handleSave?: () => void;
}
export const EditorPanel = ({
    isEditing,
    templateSchema = PF_EDITOR_SCHEMA,
    toggleEditor,
    TabIndex,
    projectId,
    templateId,
    order,
    slug,
}: EditorPanelProps) => {
    const {
        data,
        reorderSections,
        setThemeObject,
        toggleHideSection,
        setCurrentEditingSection,
    } = usePortfolioStore();
    const router = useRouter();

    const { editorTabIndex, setEditorTabIndex } = useEditorTabIdxStore();

    const [loading, setLoading] = useState(false);

    //Sets the editorTabIndex when TabIndex changes
    useEffect(() => {
        setEditorTabIndex(TabIndex!);
    }, [TabIndex]);

    if (!data) return <div>No data found</div>;

    //refactors the data.sections to reorderPopup usable format
    const sections = data.sections.map((section) => ({
        id: section.type,
        name: section.type.replace("Section", ""),
        isFixed: section.isFixed,
        isHidden: section.isHidden,
    }));

    //refactors the data.sections to editorTabs usable format
    const editorSections = data.sections
        .filter((section) => section.isEditable && !section.isHidden)
        .map((s) => s.type);

    const handleSave = async () => {
        setLoading(true);
        try {
            await updateTemplateInstanceData(
                data,
                projectId,
                templateId,
                order as number,
            );
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handlePublish = async (expiryDays?: number) => {
        setLoading(true);
        try {
            await publishTemplate(data, projectId, templateId, slug || "", expiryDays || 7);
            router.push(`/user/project/${projectId}`);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleReorder = (newOrder: string[]) => {
        reorderSections(newOrder);
    };

    return (
        <div
            className={cn(
                "flex flex-col gap-4 p-4 md:px-6 md:py-2 h-screen overflow-y-scroll overflow-x-hidden w-full font-Poppins",
            )}
        >
            {/* TODO: Add this to a component ( EditorHeader ) */}
            <div className="w-full flex justify-between items-center border-border border rounded-md p-2 shadow-xs shadow-gray-300 transition-all">
                <Link href="/user">
                    <Button variant={"ghost"} className="cursor-pointer">
                        <Home className="size-6" role="button" />
                    </Button>
                </Link>

                <div className="flex items-center gap-2">
                    {isEditing ? (
                        <Button
                            onClick={handleSave}
                            className="cursor-pointer text-black"
                            variant={"ghost"}
                        >
                            {loading ? (
                                <LucideLoaderCircle className="size-6 animate-spin" />
                            ) : (
                                <span className="text-lg">Save</span>
                            )}
                        </Button>
                    ) : (
                        <>
                            <Button
                                onClick={() => handlePublish()}
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

                    <ThemePickerDialog
                        initialTheme={data?.theme}
                        onThemeChange={(newTheme) => setThemeObject(newTheme)}
                    >
                        <Button variant={"ghost"} className="cursor-pointer">
                            <LucidePalette className="size-6" />
                        </Button>
                    </ThemePickerDialog>

                    <ReorderSectionsPopup
                        sections={sections}
                        onReorder={(newOrder) => handleReorder(newOrder)}
                        onEdit={(tabIdx) => {
                            setCurrentEditingSection(sections[tabIdx].id);
                            setEditorTabIndex(tabIdx);
                        }}
                        onHide={(sectionType: string) => toggleHideSection(sectionType)}
                    >
                        <Button variant={"ghost"} className="cursor-pointer">
                            <ArrowUpDown className="size-6" />
                        </Button>
                    </ReorderSectionsPopup>

                    <Button
                        variant={"default"}
                        onClick={() => toggleEditor()}
                        className="cursor-pointer bg-orange-400 text-white hover:bg-orange-500"
                    >
                        <SidebarClose className="size-6 hidden md:block" />
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
