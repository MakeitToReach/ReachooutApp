import React from "react";
import { Button } from "@/components/ui/button";
import { LucideEdit, LucidePlus, LucideTrash } from "lucide-react";
import { F_TIMELINE_STEP } from "../types/timeline.types";
import { FAddTimelinePopup, FEditTimelinePopup } from "../popups/FTimelinePopup";

interface FTimelineEditorFieldProps {
    value: F_TIMELINE_STEP[];
    onChange: (val: F_TIMELINE_STEP[]) => void;
}
export const FTimelineEditorField = ({
    value,
    onChange,
}: FTimelineEditorFieldProps) => {
    const handleAdd = (newStep: F_TIMELINE_STEP) => {
        onChange([...value, newStep]);
    };

    const handleRemove = (index: number) => {
        const updated = [...value];
        updated.splice(index, 1);
        onChange(updated);
    };

    const handleEdit = (index: number, newStep: F_TIMELINE_STEP) => {
        const updated = [...value];
        updated[index] = newStep;
        onChange(updated);
    };

    return (
        <div className="space-y-3">
            <div className="flex justify-between mb-4">
                <h1 className="font-semibold">Timeline Steps</h1>
                <FAddTimelinePopup onAdd={handleAdd}>
                    <Button variant={"outline"}>
                        Add{" "}
                        <span>
                            <LucidePlus />
                        </span>
                    </Button>
                </FAddTimelinePopup>
            </div>
            {value.map((step, index) => (
                <div
                    key={index}
                    className="space-y-4 flex justify-between items-center"
                >
                    <h3>Step {index + 1}</h3>
                    <div className="flex items-center gap-2">
                        <FEditTimelinePopup
                            onSave={(newStep) => handleEdit(index, newStep)}
                            step={step}
                            stepIdx={index}
                        >
                            <Button variant={"ghost"}>
                                <LucideEdit />
                            </Button>
                        </FEditTimelinePopup>
                        <Button onClick={() => handleRemove(index)} variant={"ghost"}>
                            <LucideTrash className="text-destructive" />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
}; 