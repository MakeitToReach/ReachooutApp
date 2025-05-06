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
import { AnimatePresence, motion } from "motion/react";

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
        if (template && isNew) {
            resetData(template.data);
        }

        return () => {
            if (isNew) {
                resetData(null);
            }
        };
    }, [slug, isNew]);

    const toggleEditor = () => setEditorOpen((prev) => !prev);

    if (!template) return <p>Template not found</p>;

    return (
        <div className="relative w-full flex overflow-x-hidden">
            {/* Animate Sidebar */}

            <div className={cn("hidden md:block", editorOpen ? "w-[30%]" : "w-0")} />
            <AnimatePresence>
                {editorOpen && (
                    <motion.div
                        key="sidebar"
                        initial={{ x: -300 }}
                        animate={{ x: 0 }}
                        exit={{ x: -700 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="w-full md:w-[30%] fixed top-0 left-0 z-[50] border border-border bg-white"
                    >
                        <EditorPanel
                            toggleEditor={toggleEditor}
                            isEditing={isEditing}
                            templateSchema={template.editorSchema}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {!editorOpen && (
                <Button
                    variant="outline"
                    className="fixed md:top-4 md:left-4 bottom-4 left-4 z-[100]"
                    onClick={toggleEditor}
                >
                    <LucideSidebarOpen className="w-6 h-6" />
                </Button>
            )}

            {/* Live Preview */}
            {/* <div */}
            {/*     className={cn("md:w-[70%] hidden md:block flex-grow", { */}
            {/*         "w-full block": !editorOpen, */}
            {/*     })} */}
            {/* > */}
            {/*     <LivePreview */}
            {/*         templateComponent={template.component} */}
            {/*         theme={data?.theme} */}
            {/*     /> */}
            {/* </div> */}
            <motion.div
                layout
                transition={{ type: "spring", duration: 0.5 }}
                className="md:block flex-grow"
                style={{ width: editorOpen ? "70%" : "100%" }}
            >
                <LivePreview
                    templateComponent={template.component}
                    theme={data?.theme}
                />
            </motion.div>
        </div>
    );
};

export default EditorPage;
