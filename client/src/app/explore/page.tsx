"use client";
import { TemplateCard } from "@/components/editor-components/templateCard";
import { Button } from "@/components/ui/button";
import { Templates } from "@/static_data/templates";
import React from "react";

const page = () => {
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
                    {
                        Templates.map((template, index) => (
                            <TemplateCard
                                key={index}
                                imageUrl="https://github.com/shadcn.png"
                                previewUrl="/preview/professional"
                            />
                        ))
                        // add template card here
                        // these should be saved to backend and fetched from the backend
                    }
                </div>
            </div>
        </div>
    );
};

export default page;
