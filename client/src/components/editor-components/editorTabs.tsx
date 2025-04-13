import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
// import { Input } from "../ui/input";
import { ReqInput } from "./inputs/reqInput";
import { CldUploadButton } from "next-cloudinary";
import { LucideUpload } from "lucide-react";
// import { Textarea } from "../ui/textarea";

interface EditorTabsProps {
    sections: string[];
}

const formFieldsMap: Record<
    string,
    { label: string; name?: string; type: string }[]
> = {
    hero: [
        { label: "Title", type: "text" },
        { label: "Animated Texts", type: "text" },
        { label: "Button Redirect Link", type: "text" },
        { label: "Button Text", type: "text" },
        { label: "Hero Image", type: "image" },
    ],
    contact: [
        { label: "Email", name: "email", type: "email" },
        { label: "Phone", name: "phone", type: "tel" },
    ],
    about: [
        { label: "Twitter", name: "twitter", type: "text" },
        { label: "LinkedIn", name: "linkedin", type: "text" },
    ],
};

export const EditorTabs = ({ sections }: EditorTabsProps) => {
    return (
        <Tabs defaultValue="tab-1" className="w-full">
            <ScrollArea>
                <TabsList className="text-foreground mb-3 h-auto gap-2 rounded-none border-b bg-transparent px-0 py-1 w-full">
                    {sections.map((section, idx) => (
                        <TabsTrigger
                            key={idx}
                            value={`tab-${idx + 1}`}
                            className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none md:text-xl"
                        >
                            <span className="capitalize">{section}</span>
                        </TabsTrigger>
                    ))}
                </TabsList>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>

            {sections.map((section, idx) => (
                <TabsContent key={idx} value={`tab-${idx + 1}`}>
                    <div className="space-y-4 py-6">
                        <h2 className="text-3xl md:text-5xl font-bold capitalize mb-10">
                            {section} Section
                        </h2>
                        {formFieldsMap[section]?.map((field, i) => (
                            <div key={i} className="flex flex-col gap-2">
                                {field.type === "textarea" && (
                                    <div>
                                        <label htmlFor={field.name}>{field.label}</label>
                                        <textarea
                                            id={field.name}
                                            name={field.name}
                                            className="border p-2 w-full rounded-md "
                                        />
                                    </div>
                                )}

                                {field.type === "text" && (
                                    <ReqInput
                                        label={field.label}
                                        type="text"
                                        placeholder={field.label}
                                        value={""}
                                    />
                                )}

                                {field.type === "image" && (
                                    <CldUploadButton
                                        uploadPreset="you-view"
                                        options={{ sources: ["local", "url", "unsplash"] }}
                                        className="cursor-pointer p-2 bg-neutral-800 rounded-lg"
                                    >
                                        <div className="text-white flex items-center gap-2">
                                            <h1 className="font-semibold">Upload Image</h1>
                                            <LucideUpload />
                                        </div>
                                    </CldUploadButton>
                                )}
                            </div>
                        )) || (
                                <p className="text-muted-foreground">
                                    No form defined for <strong>{section}</strong>.
                                </p>
                            )}
                    </div>
                </TabsContent>
            ))}
        </Tabs>
    );
};
