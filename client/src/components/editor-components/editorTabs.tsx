"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent } from "../ui/tabs";
import { ReqInput } from "./inputs/reqInput";
import { CldUploadButton } from "next-cloudinary";
import { usePortfolioStore } from "@/store/portfolio.store";
import { GenericEditorFieldSchema } from "@/schemas/editor.schema";
import ImageSelectButton from "./inputs/imageInputBtn";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { motion as m } from "motion/react";
import { cn } from "@/lib/utils";
import { LucideArrowLeft, LucideArrowRight } from "lucide-react";

interface EditorTabsProps {
    sections: string[];
    templateEditorSchema: GenericEditorFieldSchema;
    TabIndex?: number;
    className?: string;
}

export const EditorTabs = ({
    sections,
    TabIndex = 0,
    className,
    templateEditorSchema,
}: EditorTabsProps) => {
    const [activeTabIndex, setActiveTabIndex] = useState(TabIndex);
    const { data, setSectionField, setCurrentEditingSection } =
        usePortfolioStore();

    const currentSection = sections[activeTabIndex];
    const sectionData = data?.sections.find((s) => s.type === currentSection);

    const goToPrev = () => {
        if (activeTabIndex > 0) setActiveTabIndex((prev) => prev - 1);
    };

    const goToNext = () => {
        if (activeTabIndex < sections.length - 1)
            setActiveTabIndex((prev) => prev + 1);
    };

    //sets the activeTabIndex when TabIndex changes
    useEffect(() => {
        setActiveTabIndex(TabIndex);
    }, [TabIndex]);

    useEffect(() => {
        setCurrentEditingSection(sections[activeTabIndex]);
    }, [activeTabIndex]);

    return (
        <Tabs
            value={`tab-${activeTabIndex + 1}`}
            className={cn("w-full h-full flex flex-col", className)} // Full viewport height
        >
            {sections.map((section, idx) => (
                <>
                    <TabsContent
                        key={section}
                        value={`tab-${idx + 1}`}
                        className="flex-1 flex flex-col"
                    >
                        {idx === activeTabIndex && (
                            <m.div
                                className="flex-1 flex flex-col"
                                initial={{ opacity: 0, filter: "blur(5px)" }}
                                animate={{ opacity: 1, filter: "blur(0px)" }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                <h2 className="text-3xl md:text-4xl font-bold capitalize mb-6">
                                    {section} Section
                                </h2>

                                {/* Scrollable form content */}
                                <div className="flex-1 overflow-y-auto space-y-6 pr-4 mb-10">
                                    {templateEditorSchema[section]?.map((field, i) => (
                                        <div key={i} className="flex flex-col gap-2">
                                            {field.type === "textarea" && (
                                                <div className="space-y-1">
                                                    <Label htmlFor={field.label} className="text-lg">
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
                                                    <p className="text-xs text-gray-700">
                                                        {field.subtitle}
                                                    </p>
                                                </div>
                                            )}

                                            {field.type === "text" && (
                                                <ReqInput
                                                    label={field.label}
                                                    type="text"
                                                    subtitle={field.subtitle}
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

                                            {field.type === "image-video" && (
                                                <div className="flex items-center md:gap-10 gap-6 w-full">
                                                    <CldUploadButton
                                                        uploadPreset="you-view"
                                                        options={{ sources: ["local", "url", "unsplash"] }}
                                                        className="cursor-pointer p-2 rounded-lg w-fit"
                                                        //eslint-disable-next-line
                                                        onSuccess={(result: any) => {
                                                            // console.log("result", result);
                                                            setSectionField(
                                                                section,
                                                                field.fieldPathImg ?? "",
                                                                result.info.secure_url,
                                                            );
                                                        }}
                                                    >
                                                        <ImageSelectButton
                                                            selectedImgUrl={
                                                                sectionData?.data[
                                                                field.fieldPathImg ??
                                                                "https://res.cloudinary.com/do0wlwyez/image/upload/v1741188160/qnxm2kk9nhiujmsnyqlm.jpg"
                                                                ]
                                                            }
                                                        />
                                                        <span className="capitalize">
                                                            {field.imgSubtitle}
                                                        </span>
                                                    </CldUploadButton>

                                                    <h1 className="text-xs md:text-lg">OR</h1>

                                                    <ReqInput
                                                        label={field.label}
                                                        type="text"
                                                        subtitle={field.subtitle}
                                                        placeholder={field.label}
                                                        value={sectionData?.data[field.fieldPathVid ?? ""]}
                                                        onChange={(e) =>
                                                            setSectionField(
                                                                section,
                                                                field.fieldPathVid ?? "",
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                </div>
                                            )}

                                            {field.type === "image" && (
                                                <div className="flex items-center md:gap-10 gap-6 w-full">
                                                    <CldUploadButton
                                                        uploadPreset="you-view"
                                                        options={{ sources: ["local", "url", "unsplash"] }}
                                                        className="cursor-pointer p-2 rounded-lg w-fit"
                                                        //eslint-disable-next-line
                                                        onSuccess={(result: any) => {
                                                            setSectionField(
                                                                section,
                                                                field.fieldPathImg ?? "",
                                                                result.info.secure_url,
                                                            );
                                                        }}
                                                    >
                                                        <ImageSelectButton
                                                            selectedImgUrl={
                                                                sectionData?.data[
                                                                field.fieldPathImg ??
                                                                "https://res.cloudinary.com/do0wlwyez/image/upload/v1741188160/qnxm2kk9nhiujmsnyqlm.jpg"
                                                                ]
                                                            }
                                                        />
                                                        <span className="capitalize">
                                                            {field.imgSubtitle}
                                                        </span>
                                                    </CldUploadButton>
                                                </div>
                                            )}

                                            {field.type === "component" &&
                                                field.component?.({
                                                    value: sectionData?.data[field.fieldPath],
                                                    //eslint-disable-next-line
                                                    onChange: (val: any) =>
                                                        setSectionField(section, field.fieldPath, val),
                                                })}

                                            {field.type === "group" && (
                                                <div className="flex gap-2 w-full">
                                                    {field.fields?.map((groupField, idx) => (
                                                        <ReqInput
                                                            key={idx}
                                                            label={groupField.label}
                                                            subtitle={field.subtitle}
                                                            type="text"
                                                            placeholder={groupField.label}
                                                            value={
                                                                sectionData?.data[groupField.fieldPath] ?? ""
                                                            }
                                                            onChange={(e) =>
                                                                setSectionField(
                                                                    section,
                                                                    groupField.fieldPath,
                                                                    e.target.value,
                                                                )
                                                            }
                                                            className="w-full"
                                                        />
                                                    ))}
                                                </div>
                                            )}

                                            {field.type === "phone" && (
                                                <ReqInput
                                                    label={field.label}
                                                    type="tel"
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
                                        </div>
                                    )) || (
                                            <p className="text-muted-foreground">
                                                No form defined for <strong>{section}</strong>.
                                            </p>
                                        )}
                                </div>

                                {/* Navigation buttons */}
                                <div className="sticky bottom-0 shadow-xs shadow-gray-300 right-0 w-full bg-white border border-border rounded-md flex justify-between p-3">
                                    <Button
                                        variant="outline"
                                        onClick={goToPrev}
                                        disabled={activeTabIndex === 0}
                                    >
                                        <span>
                                            <LucideArrowLeft />
                                        </span>{" "}
                                        <span className="hidden md:block">Prev Section</span>
                                    </Button>
                                    <Button
                                        onClick={goToNext}
                                        disabled={activeTabIndex === sections.length - 1}
                                    >
                                        <span className="hidden md:block">Next Section</span>
                                        <span>
                                            <LucideArrowRight />
                                        </span>{" "}
                                    </Button>
                                </div>
                            </m.div>
                        )}
                    </TabsContent>
                </>
            ))}
        </Tabs>
    );
};
