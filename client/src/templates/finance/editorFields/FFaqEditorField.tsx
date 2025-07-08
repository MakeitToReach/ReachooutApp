import React from "react";
import { Button } from "@/components/ui/button";
import { LucideEdit, LucidePlus, LucideTrash } from "lucide-react";
import { FFAQ_ITEM } from "../types/faq.types";
import { FAddFaqPopup, FEditFaqPopup } from "../popups/FFaqPopup";

interface FFaqEditorFieldProps {
    value: FFAQ_ITEM[];
    onChange: (val: FFAQ_ITEM[]) => void;
}
export const FFaqEditorField = ({
    value,
    onChange,
}: FFaqEditorFieldProps) => {
    const handleAdd = (newFaq: FFAQ_ITEM) => {
        onChange([...value, newFaq]);
    };

    const handleRemove = (index: number) => {
        const updated = [...value];
        updated.splice(index, 1);
        onChange(updated);
    };

    const handleEdit = (index: number, newFaq: FFAQ_ITEM) => {
        const updated = [...value];
        updated[index] = newFaq;
        onChange(updated);
    };

    return (
        <div className="space-y-3">
            <div className="flex justify-between mb-4">
                <h1 className="font-semibold">FAQs</h1>
                <FAddFaqPopup onAdd={handleAdd}>
                    <Button variant={"outline"}>
                        Add{" "}
                        <span>
                            <LucidePlus />
                        </span>
                    </Button>
                </FAddFaqPopup>
            </div>
            {value.map((faq, index) => (
                <div
                    key={index}
                    className="space-y-4 flex justify-between items-center"
                >
                    <h3>FAQ {index + 1}</h3>
                    <div className="flex items-center gap-2">
                        <FEditFaqPopup
                            onSave={(newFaq) => handleEdit(index, newFaq)}
                            faq={faq}
                            faqIdx={index}
                        >
                            <Button variant={"ghost"}>
                                <LucideEdit />
                            </Button>
                        </FEditFaqPopup>
                        <Button onClick={() => handleRemove(index)} variant={"ghost"}>
                            <LucideTrash className="text-destructive" />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};
