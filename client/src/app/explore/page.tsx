"use client";

import { fetchAllTemplates } from "@/api/explore";
import { TemplateCard } from "@/components/editor-components/templateCard";
import { Button } from "@/components/ui/button";
import { getToken } from "@/lib/isAuthenticated";
import { TEMPLATES_SCHEMA } from "@/types/templates.types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ExplorePage = () => {
    const [templates, setTemplates] = useState<TEMPLATES_SCHEMA[]>([]);
    const router = useRouter();

    useEffect(() => {
        const token = getToken();
        if (!token) {
            router.push("/");
            return;
        }

        const fetchTemplates = async () => {
            const response = await fetchAllTemplates();
            setTemplates(response.templates || []);
        };

        fetchTemplates();
    }, [router]);

    return (
        <div className="font-Poppins w-full flex text-white">
            <div className="flex flex-col w-full py-10 gap-10">
                {/* Header Tabs */}
                <div className="w-full flex justify-between">
                    <div className="flex gap-2">
                        {["Featured", "Professional", "Software Developer", "UI/UX Designer", "Frontend Developer"].map(
                            (category) => (
                                <Button key={category} variant="ghost" className="md:text-md">
                                    {category}
                                </Button>
                            )
                        )}
                    </div>
                    <Button>Filters</Button>
                </div>

                <hr />

                {/* Templates Grid */}
                <div className="grid md:grid-cols-4 gap-4 px-4">
                    {templates.length > 0 ? (
                        templates.map((template, idx) => (
                            <TemplateCard
                                key={idx}
                                imageUrl={template.thumbnailUrl}
                                previewUrl={`/preview/${template.name.toLowerCase()}`}
                                editorUrl={`/editor/${template.name.toLowerCase()}`}
                            />
                        ))
                    ) : (
                        <p className="text-center col-span-4">No templates found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExplorePage;
