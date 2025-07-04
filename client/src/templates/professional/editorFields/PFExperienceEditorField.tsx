import React from "react";
import { Button } from "@/components/ui/button";
import { LucideEdit, LucidePlus, LucideTrash } from "lucide-react";
import { PF_EXPERIENCE_ITEM } from "../types/experience.types";
import {
    PFAddExperiencePopup,
    PFEditExperiencePopup,
} from "../popups/PFExperiencePopup";

interface PFExperienceEditorFieldProps {
    value: PF_EXPERIENCE_ITEM[];
    onChange: (val: PF_EXPERIENCE_ITEM[]) => void;
}
export const PFExperienceEditorField = ({
    value,
    onChange,
}: PFExperienceEditorFieldProps) => {
    const handleAdd = (newItem: PF_EXPERIENCE_ITEM) => {
        onChange([...value, newItem]);
    };

    const handleRemove = (index: number) => {
        const updated = [...value];
        updated.splice(index, 1);
        onChange(updated);
    };

    const handleEdit = (index: number, newItem: PF_EXPERIENCE_ITEM) => {
        const updated = [...value];
        updated[index] = newItem;
        onChange(updated);
    };

    return (
        <div className="space-y-3">
            <div className="flex justify-between mb-4">
                <h1 className="font-semibold">Experience</h1>
                <PFAddExperiencePopup onAdd={handleAdd}>
                    <Button variant={"outline"}>
                        Add{" "}
                        <span>
                            <LucidePlus />
                        </span>
                    </Button>
                </PFAddExperiencePopup>
            </div>
            {value.map((faq, index) => (
                <div
                    key={index}
                    className="space-y-4 flex justify-between items-center"
                >
                    <h3>Experience {index + 1}</h3>
                    <div className="flex items-center gap-2">
                        <PFEditExperiencePopup
                            onSave={(newItem) => handleEdit(index, newItem)}
                            exp={faq}
                            expIdx={index}
                        >
                            <Button variant={"ghost"}>
                                <LucideEdit />
                            </Button>
                        </PFEditExperiencePopup>
                        <Button onClick={() => handleRemove(index)} variant={"ghost"}>
                            <LucideTrash className="text-destructive" />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};
