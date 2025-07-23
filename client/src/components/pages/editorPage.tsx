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
  ArrowUpDown,
  Home,
  LucideLoaderCircle,
  LucidePalette,
  LucideSidebarOpen,
  LucideUploadCloud,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { ReorderSectionsPopup } from "@/components/editor-components/popups/SectionsPopup";
import { ThemePickerDialog } from "@/components/editor-components/popups/colorThemeDialog";
import { publishTemplate, updateTemplateInstanceData } from "@/api/templates";
import { Loading } from "../editor-components/loading";
import { useEditorTabIdxStore } from "@/store/editorTabIdx.store";
import { toast } from "sonner";
import Link from "next/link";

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
        Number(order),
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
      await publishTemplate(data, projectId, templateId, pageSlug || "");
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
              slug={pageSlug || ""}
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
              <Link href={`/user/project/${projectId}`}>
                <Button className="cursor-pointer" variant="ghost">
                  <Home className="size-6" />
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
                <ThemePickerDialog
                  initialTheme={data?.theme}
                  onThemeChange={(newTheme) => setThemeObject(newTheme)}
                >
                  <span title="Customize Theme" role="button">
                    <LucidePalette className="size-6 cursor-pointer" />
                  </span>
                </ThemePickerDialog>
                <ReorderSectionsPopup
                  sections={sections}
                  onReorder={(newOrder) => handleReorder(newOrder)}
                  onEdit={(tabIdx) => {
                    setCurrentEditingSection(sections[tabIdx].id);
                    setEditorTabIndex(tabIdx);
                    setTimeout(() => toggleEditor(), 600);
                  }}
                  onHide={(sectionType: string) =>
                    toggleHideSection(sectionType)
                  }
                >
                  <Button
                    variant="ghost"
                    className="cursor-pointer"
                    title="Reorder Sections"
                  >
                    <ArrowUpDown className="size-6" />
                  </Button>
                </ReorderSectionsPopup>
                {!editorOpen && (
                  <Button variant="ghost" onClick={toggleEditor}>
                    <LucideSidebarOpen className="size-6" />
                  </Button>
                )}
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
