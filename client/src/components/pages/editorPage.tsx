"use client";
import { useState } from "react";
import { EditorPanel } from "@/components/editor-components/editorPanel";
import { TEMPLATE_REGISTRY } from "@/lib/templateRegistry";
import { usePortfolioStore } from "@/store/portfolio.store";
import { LivePreview } from "@/components/editor-components/LivePreview";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  EllipsisVertical,
  LucideLoaderCircle,
  LucidePalette,
  LucideSettings,
  LucideSidebarOpen,
  LucideUploadCloud,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { ReorderSectionsPopup } from "@/components/editor-components/popups/SectionsPopup";
import { ThemePickerDialog } from "@/components/editor-components/popups/colorThemeDialog";
import { SettingsDropdown } from "@/components/editor-components/settingsDropdown";
import { publishTemplate, updateTemplateInstanceData } from "@/api/templates";
import { Loading } from "../editor-components/loading";
import { useEditorTabIdxStore } from "@/store/editorTabIdx.store";
import { toast } from "sonner";

const EditorPage = () => {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;
  const {
    // resetData,
    data,
    setThemeObject,
    toggleHideSection,
    reorderSections,
    setCurrentEditingSection,
  } = usePortfolioStore();

  const { editorTabIndex, setEditorTabIndex } = useEditorTabIdxStore();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [editorOpen, setEditorOpen] = useState(true);

  const isEditing = searchParams?.has("edit");
  const order = searchParams?.get("order");
  const templateId = searchParams?.get("tid");
  const projectId = searchParams?.get("pid");
  const pageSlug = searchParams?.get("slug");

  const templateKey = slug as keyof typeof TEMPLATE_REGISTRY;
  const template = TEMPLATE_REGISTRY[templateKey];

  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //     if (template && isNew) {
  //         // console.log("projectId", projectId);
  //         // console.log("templateId", templateId);
  //         // console.log("from editor", data);
  //     }
  // }, [slug, isNew]);

  if (!data) return <Loading />;
  if (!template) return <p>Template not found</p>;

  //refactors the data.sections to reorderPopup usable format
  const sections = data.sections.map((section) => ({
    id: section.type,
    name: section.type.replace("Section", ""),
    isFixed: section.isFixed,
    isHidden: section.isHidden,
  }));

  const handleSave = async () => {
    setLoading(true);
    try {
      if (!projectId || !templateId || !order) {
        toast.error("No project ID or template ID found");
        return;
      }
      await updateTemplateInstanceData(
        data,
        projectId,
        templateId,
        Number(order)
      );
      router.push(`/user/project/${projectId}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    setLoading(true);
    try {
      if (!projectId || !templateId) {
        toast.error("No project ID or template ID found");
        return;
      }
      await publishTemplate(data, projectId, templateId, pageSlug || undefined);
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

  const toggleEditor = () => setEditorOpen((prev) => !prev);

  return (
    <div className="relative w-full flex overflow-x-hidden">
      <div className={cn("hidden md:block", editorOpen ? "w-[30%]" : "w-0")} />
      <AnimatePresence mode="wait">
        {editorOpen && (
          <motion.div
            layout
            key="sidebar"
            initial={{ x: -100 }}
            animate={{ x: editorOpen ? 0 : "-100%" }}
            exit={{ x: -600 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="w-full md:w-[30%] fixed top-0 left-0 z-[60] border border-border bg-white"
          >
            <EditorPanel
              order={Number(order) || 0}
              toggleEditor={toggleEditor}
              isEditing={isEditing}
              templateSchema={template.editorSchema}
              TabIndex={editorTabIndex}
              projectId={projectId || ""}
              templateId={templateId || ""}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {!editorOpen && (
        <Button
          variant="outline"
          className="fixed md:top-4 md:left-4 bottom-4 left-4 z-[60]"
          onClick={toggleEditor}
        >
          <LucideSidebarOpen className="w-6 h-6" />
        </Button>
      )}

      {/* Live Preview */}
      <motion.div
        layout
        transition={{ type: "spring", duration: 0.5 }}
        className="md:block flex-grow relative"
        style={{ width: editorOpen ? "70%" : "100%" }}
      >
        {/* TODO: Add this to a component */}
        <AnimatePresence mode="wait">
          {!editorOpen && (
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              transition={{ type: "easeInOut", duration: 0.8 }}
              className="w-[30%] hidden md:flex fixed z-50 bottom-4 right-1/2 translate-x-1/2 bg-white justify-between backdrop-blur-3xl items-center border-border border rounded-md p-2 shadow-xs shadow-gray-300"
            >
              <ReorderSectionsPopup
                sections={sections}
                onReorder={(newOrder) => handleReorder(newOrder)}
                onEdit={(tabIdx) => {
                  setCurrentEditingSection(sections[tabIdx].id);
                  setEditorTabIndex(tabIdx);
                  setTimeout(() => toggleEditor(), 600);
                }}
                onHide={(sectionType: string) => toggleHideSection(sectionType)}
              >
                <button className="cursor-pointer" title="Reorder Sections">
                  <EllipsisVertical className="size-6" />
                </button>
              </ReorderSectionsPopup>

              <div className="flex items-center gap-2">
                <ThemePickerDialog
                  initialTheme={data?.theme}
                  onThemeChange={(newTheme) => setThemeObject(newTheme)}
                >
                  <span title="Customize Theme" role="button">
                    <LucidePalette className="size-6 cursor-pointer" />
                  </span>
                </ThemePickerDialog>
                {isEditing ? (
                  <Button
                    onClick={handleSave}
                    className="cursor-pointer text-black"
                    variant={"ghost"}
                  >
                    {loading ? (
                      <LucideLoaderCircle className="size-6 animate-spin" />
                    ) : (
                      <span className="hidden md:block text-lg">Save</span>
                    )}
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
                          <span className="hidden md:block text-lg">
                            Publish
                          </span>
                          <span>
                            <LucideUploadCloud className="size-6" />
                          </span>
                        </>
                      )}
                    </Button>
                  </>
                )}
                <SettingsDropdown>
                  <span title="Settings">
                    <LucideSettings className="size-6" role="button" />
                  </span>
                </SettingsDropdown>

                {/* <Button */}
                {/*     variant={"ghost"} */}
                {/*     onClick={() => toggleEditor()} */}
                {/*     className="cursor-pointer" */}
                {/* > */}
                {/*     <LucideChevronLeft className="size-6 hidden md:block" /> */}
                {/*     <LucideEye className="size-6 md:hidden" /> */}
                {/* </Button> */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <LivePreview
          templateComponent={template.component}
          theme={data?.theme}
        />
      </motion.div>
    </div>
  );
};

export default EditorPage;
