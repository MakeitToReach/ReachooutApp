import React from "react";
import { Button } from "@/components/ui/button";
import { LucideEdit, LucidePlus, LucideTrash } from "lucide-react";
import { PF_FAQ_ITEM } from "../types/faq.types";
import { PFAddFaqPopup, PFEditFaqPopup } from "../popups/PFFaqPopup";

interface PFFaqEditorFieldProps {
    value: PF_FAQ_ITEM[];
    onChange: (val: PF_FAQ_ITEM[]) => void;
}
export const PFFaqEditorField = ({
    value,
    onChange,
}: PFFaqEditorFieldProps) => {
    const handleAdd = (newFaq: PF_FAQ_ITEM) => {
        onChange([...value, newFaq]);
    };

    const handleRemove = (index: number) => {
        const updated = [...value];
        updated.splice(index, 1);
        onChange(updated);
    };

    const handleEdit = (index: number, newFaq: PF_FAQ_ITEM) => {
        const updated = [...value];
        updated[index] = newFaq;
        onChange(updated);
    };

    return (
        <div className="space-y-3">
            <div className="flex justify-between mb-4">
                <h1 className="font-semibold">FAQs</h1>
                <PFAddFaqPopup onAdd={handleAdd}>
                    <Button variant={"outline"}>
                        Add{" "}
                        <span>
                            <LucidePlus />
                        </span>
                    </Button>
                </PFAddFaqPopup>
            </div>
            {value.map((faq, index) => (
                <div
                    key={index}
                    className="space-y-4 flex justify-between items-center"
                >
                    <h3>FAQ {index + 1}</h3>
                    <div className="flex items-center gap-2">
                        <PFEditFaqPopup
                            onSave={(newFaq) => handleEdit(index, newFaq)}
                            faq={faq}
                            faqIdx={index}
                        >
                            <Button variant={"ghost"}>
                                <LucideEdit />
                            </Button>
                        </PFEditFaqPopup>
                        <Button onClick={() => handleRemove(index)} variant={"ghost"}>
                            <LucideTrash className="text-destructive" />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};
