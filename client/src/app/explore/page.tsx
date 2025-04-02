"use client";
import { fetchAllTemplates } from "@/api/explore";
import { TemplateCard } from "@/components/editor-components/templateCard";
import { Button } from "@/components/ui/button";
import { getToken } from "@/lib/isAuthenticated";
import { TEMPLATES_SCHEMA } from "@/types/templates.types";
import { useRouter } from "next/navigation";
// import { TEMPLATES_STATIC } from "@/static_data/templates";
import React, { useEffect, useState } from "react";

const ExplorePage = () => {
    const [templates, setTemplates] = useState<TEMPLATES_SCHEMA[]>();
    const router = useRouter();

    const fetchTemplates = async () => {
        const response = await fetchAllTemplates();
        setTemplates(response.templates);
        // console.log(response);
    };
    useEffect(() => {
        const token = getToken();
        if (!token) {
            router.push("/");
        }
        fetchTemplates();
    });
    return (
        <div className=" font-Poppins w-full flex text-white">
            {/* content */}
            <div className="flex flex-col w-full py-10 gap-10">
                {/* header tabs*/}
                <div className="w-full flex justify-between">
                    <div className="flex gap-2">
                        <Button variant={"ghost"} className="md:text-md">
                            Featured
                        </Button>
                        <Button variant={"ghost"} className="md:text-md">
                            Professional
                        </Button>
                        <Button variant={"ghost"} className="md:text-md">
                            Software Developer
                        </Button>
                        <Button variant={"ghost"} className="md:text-md">
                            UI/UX Designer
                        </Button>
                        <Button variant={"ghost"} className="md:text-md">
                            Frontend Developer
                        </Button>
                    </div>
                    <Button>Filters</Button>
                </div>
                <hr />
                <div className="grid md:grid-cols-4 gap-4 space-y-4 px-4">
                    {templates &&
                        templates.map((template: TEMPLATES_SCHEMA, idx: number) => (
                            <TemplateCard
                                key={idx}
                                imageUrl={template.thumbnailUrl}
                                previewUrl={`/preview/${template.name.toLowerCase()}`}
                                editorUrl={`/editor/${template.name.toLowerCase()}`}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default ExplorePage;
