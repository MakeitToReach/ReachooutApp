"use client";

import React, { useState } from "react";
import { Tabs, TabsContent } from "../ui/tabs";
import { ReqInput } from "./inputs/reqInput";
import { CldUploadButton } from "next-cloudinary";
import { usePortfolioStore } from "@/store/portfolio.store";
import { GenericEditorFieldSchema } from "@/schemas/editor.schema";
import ImageSelectButton from "./inputs/imageInputBtn";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { motion as m } from "framer-motion"; // fixed from "motion/react" to "framer-motion"
import { cn } from "@/lib/utils";

interface EditorTabsProps {
    sections: string[];
    templateEditorSchema: GenericEditorFieldSchema;
    className?: string;
}

export const EditorTabs = ({
    sections,
    className,
    templateEditorSchema,
}: EditorTabsProps) => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const { data, setSectionField } = usePortfolioStore();

    const currentSection = sections[activeTabIndex];
    const sectionData = data?.sections.find((s) => s.type === currentSection);

    const goToPrev = () => {
        if (activeTabIndex > 0) setActiveTabIndex((prev) => prev - 1);
    };

    const goToNext = () => {
        if (activeTabIndex < sections.length - 1)
            setActiveTabIndex((prev) => prev + 1);
    };

    return (
        <Tabs
            value={`tab-${activeTabIndex + 1}`}
            className={cn("w-full", className)}
        >
            {sections.map((section, idx) => (
                <TabsContent key={section} value={`tab-${idx + 1}`}>
                    {idx === activeTabIndex && (
                        <m.div
                            className="space-y-6 overflow-y-scroll h-full"
                            initial={{ opacity: 0, filter: "blur(5px)" }}
                            animate={{ opacity: 1, filter: "blur(0px)" }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            <h2 className="text-3xl md:text-5xl font-bold capitalize mb-10">
                                {section} Section
                            </h2>

                            {templateEditorSchema[section]?.map((field, i) => (
                                <div key={i} className="flex flex-col gap-2">
                                    {field.type === "textarea" && (
                                        <div className="space-y-2">
                                            <Label htmlFor={field.name} className="text-lg">
                                                {field.label}
                                            </Label>
                                            <textarea
                                                className="border p-2 w-full h-36 rounded-md"
                                                value={sectionData?.data[field.fieldPath] ?? ""}
                                                onChange={(e) =>
                                                    setSectionField(
                                                        section,
                                                        field.fieldPath,
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                    )}

                                    {field.type === "text" && (
                                        <ReqInput
                                            label={field.label}
                                            type="text"
                                            placeholder={field.label}
                                            value={sectionData?.data[field.fieldPath] ?? ""}
                                            onChange={(e) =>
                                                setSectionField(
                                                    section,
                                                    field.fieldPath,
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    )}

                                    {field.type === "image" && (
                                        <CldUploadButton
                                            uploadPreset="you-view"
                                            options={{ sources: ["local", "url", "unsplash"] }}
                                            className="cursor-pointer p-2 rounded-lg w-fit"
                                            //eslint-disable-next-line
                                            onSuccess={(result: any) => {
                                                setSectionField(
                                                    section,
                                                    field.fieldPath,
                                                    result.info.secure_url,
                                                );
                                            }}
                                        >
                                            <ImageSelectButton
                                                selectedImgUrl={sectionData?.data[field.fieldPath]}
                                            />
                                            <span className="capitalize">dimensions 500x500</span>
                                        </CldUploadButton>
                                    )}

                                    {field.type === "component" &&
                                        field.component?.({
                                            value: sectionData?.data[field.fieldPath],
                                            //eslint-disable-next-line
                                            onChange: (val: any) =>
                                                setSectionField(section, field.fieldPath, val),
                                        })}
                                </div>
                            )) || (
                                    <p className="text-muted-foreground">
                                        No form defined for <strong>{section}</strong>.
                                    </p>
                                )}

                            <div className="flex justify-between pt-8">
                                <Button
                                    variant="outline"
                                    onClick={goToPrev}
                                    disabled={activeTabIndex === 0}
                                >
                                    ← Prev Section
                                </Button>
                                <Button
                                    onClick={goToNext}
                                    disabled={activeTabIndex === sections.length - 1}
                                >
                                    Next Section →
                                </Button>
                            </div>
                        </m.div>
                    )}
                </TabsContent>
            ))}
        </Tabs>
    );
};
