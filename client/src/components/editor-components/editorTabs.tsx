"use client";

import React, { useEffect } from "react";
import { Tabs, TabsContent } from "../ui/tabs";
import { ReqInput } from "./inputs/reqInput";
import { usePortfolioStore } from "@/store/portfolio.store";
import { GenericEditorFieldSchema } from "@/schemas/editor.schema";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { motion as m } from "motion/react";
import { cn } from "@/lib/utils";
import { LucideArrowLeft, LucideArrowRight } from "lucide-react";
import { useEditorTabIdxStore } from "@/store/editorTabIdx.store";
import { ImageInput } from "../imgInput";
import { MultipleImageInput } from "../multiImgInput";
import { TipTapEditor } from "../ui/TipTapEditor";

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
  const {
    editorTabIndex: activeTabIndex,
    setEditorTabIndex: setActiveTabIndex,
  } = useEditorTabIdxStore();
  const { data, setSectionField, setCurrentEditingSection } =
    usePortfolioStore();

  const currentSection = sections[activeTabIndex];
  const sectionData = data?.sections.find((s) => s.type === currentSection);

  const goToPrev = () => {
    if (activeTabIndex > 0) {
      const prev = activeTabIndex - 1;
      setActiveTabIndex(prev);
    }
  };

  const goToNext = () => {
    if (activeTabIndex < sections.length - 1) {
      const next = activeTabIndex + 1;
      setActiveTabIndex(next);
    }
  };

  //sets the activeTabIndex when TabIndex changes
  useEffect(() => {
    setActiveTabIndex(TabIndex);
  }, [TabIndex]);

  useEffect(() => {
    setCurrentEditingSection(currentSection);
  }, [activeTabIndex]);

  return (
    <Tabs
      value={`tab-${activeTabIndex + 1}`}
      className={cn("w-full h-screen flex flex-col", className)} // Full viewport height
    >
      {sections.map((section, idx) => (
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
              <h2 className="text-3xl md:text-3xl font-bold capitalize mb-6">
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
                              e.target.value
                            )
                          }
                        />
                        <p className="text-xs text-gray-700">
                          {field.subtitle}
                        </p>
                      </div>
                    )}

                    {field.type === "RTEditor" && (
                      <div className="space-y-1">
                        <Label htmlFor={field.label} className="text-lg">
                          {field.label}
                        </Label>
                        <TipTapEditor
                          value={sectionData?.data[field.fieldPath] ?? ""}
                          onChange={(value) =>
                            setSectionField(
                              section,
                              field.fieldPath,
                              value
                            )
                          }
                          placeholder={field.label}
                          height="h-36"
                          showToolbar={true}
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
                            e.target.value
                          )
                        }
                      />
                    )}

                    {field.type === "image-video" && (
                      <div className="flex flex-col items-center md:gap-10 gap-6">
                        <ImageInput
                          initialImgUrl={
                            sectionData?.data[field.fieldPathImg ?? ""]
                          }
                          className="w-full"
                          onImageUpload={(imgUrl) => {
                            setSectionField(
                              section,
                              field.fieldPathImg ?? "",
                              imgUrl
                            );
                          }}
                          onImageRemove={() =>
                            setSectionField(
                              section,
                              field.fieldPathImg ?? "",
                              ""
                            )
                          }
                        />

                        <h1 className="text-xs md:text-lg">OR</h1>

                        <ReqInput
                          className="w-full"
                          label={field.label}
                          type="text"
                          subtitle={field.subtitle}
                          placeholder={field.label}
                          value={sectionData?.data[field.fieldPathVid ?? ""]}
                          onChange={(e) =>
                            setSectionField(
                              section,
                              field.fieldPathVid ?? "",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    )}

                    {field.type === "image" && (
                      <ImageInput
                        onImageUpload={(imgUrl) => {
                          setSectionField(
                            section,
                            field.fieldPath ?? "",
                            imgUrl
                          );
                        }}
                        initialImgUrl={sectionData?.data[field.fieldPath ?? ""]}
                      />
                    )}

                    {field.type === "multiple-images" && (
                      <div className="space-y-2">
                        <Label>{field.label}</Label>
                      <MultipleImageInput
                        initialImages={sectionData?.data[field.fieldPath ?? ""]}
                        onImageAdd={(imgUrl) => {
                          const currentImages = Array.isArray(sectionData?.data[field.fieldPath ?? ""]) ? sectionData.data[field.fieldPath ?? ""] : [];
                          const updatedImages = [...currentImages, imgUrl];
                          setSectionField(section, field.fieldPath ?? "", updatedImages);
                        }}
                        onImageRemove={(index) => {
                          const currentImages = Array.isArray(sectionData?.data[field.fieldPath ?? ""]) ? sectionData.data[field.fieldPath ?? ""] : [];
                          const updatedImages = currentImages.filter((_: string, i: number) => i !== index);
                            setSectionField(section, field.fieldPath ?? "", updatedImages);
                          }}
                        />
                      </div>
                    )}

                    {field.type === "component" &&
                      field.component?.({
                        value: sectionData?.data[field.fieldPath],
                        //eslint-disable-next-line
                        onChange: (val: any) =>
                          setSectionField(section, field.fieldPath, val),
                      })}

                    {field.type === "customComponent" &&
                      field.customComponent?.()}
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
                                e.target.value
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
                            e.target.value
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
      ))}
    </Tabs>
  );
};
