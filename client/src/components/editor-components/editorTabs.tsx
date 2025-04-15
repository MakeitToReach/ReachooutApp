import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { ReqInput } from "./inputs/reqInput";
import { CldUploadButton } from "next-cloudinary";
import { usePortfolioStore } from "@/store/portfolio.store";
import { GenericEditorFieldSchema } from "@/schemas/editor.schema";
import ImageSelectButton from "./inputs/imageInputBtn";
import { Label } from "../ui/label";
import { motion as m } from "motion/react";

interface EditorTabsProps {
    sections: string[];
    templateEditorSchema: GenericEditorFieldSchema;
}

export const EditorTabs = ({
    sections,
    templateEditorSchema,
}: EditorTabsProps) => {
    const { data, setSectionField } = usePortfolioStore();

    return (
        <Tabs defaultValue="tab-1" className="w-full">
            <ScrollArea>
                <TabsList className="text-foreground flex justify-start mb-3 h-auto gap-2 rounded-none border-b bg-transparent px-0 py-1 w-full">
                    {sections.map((section, idx) => (
                        <TabsTrigger
                            key={section}
                            value={`tab-${idx + 1}`}
                            className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-xl"
                        >
                            <span className="capitalize">{section}</span>
                        </TabsTrigger>
                    ))}
                </TabsList>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>

            {sections.map((section, idx) => {
                const sectionData = data?.sections.find((s) => s.type === section);

                return (
                    <TabsContent key={section} value={`tab-${idx + 1}`}>
                        <m.div
                            className="space-y-4 py-6 overflow-y-scroll h-full"
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
                        </m.div>
                    </TabsContent>
                );
            })}
        </Tabs>
    );
};
