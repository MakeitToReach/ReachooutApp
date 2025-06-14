"use client";

import { fetchAllTemplates } from "@/api/explore";
import ExploreTabs from "@/components/editor-components/exploreTabs";
import { useTemplateStore } from "@/store/template.store";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

const ExplorePage = () => {
    const { templates, setTemplates } = useTemplateStore();
    const searchParams = useSearchParams();

    const projectId = searchParams?.get("pid");

    useEffect(() => {
        if (templates.length === 0) {
            const fetchTemplates = async () => {
                const response = await fetchAllTemplates();
                setTemplates(response.templates);
            };
            fetchTemplates();
        }
    }, [templates.length, setTemplates]);

    return (
        <div className="font-Poppins w-full  flex text-white dark">
            <Suspense>
                <ExploreTabs
                    templates={templates}
                    projectId={projectId ? projectId : undefined}
                />
            </Suspense>
        </div>
    );
};

export default ExplorePage;
