import React from "react";
import { Button } from "@/components/ui/button";
import { LucideEdit, LucidePlus, LucideTrash } from "lucide-react";
import { F_FEATURE } from "../types/why-choose-us.types";
import { FAddFeaturePopup, FEditFeaturePopup } from "../popups/FWhyChooseUsPopup";

interface FWhyChooseUsEditorFieldProps {
    value: F_FEATURE[];
    onChange: (val: F_FEATURE[]) => void;
}

export const FWhyChooseUsEditorField = ({
    value,
    onChange,
}: FWhyChooseUsEditorFieldProps) => {
    const handleAdd = (newFeature: F_FEATURE) => {
        onChange([...value, newFeature]);
    };

    const handleRemove = (index: number) => {
        const updated = [...value];
        updated.splice(index, 1);
        onChange(updated);
    };

    const handleEdit = (index: number, newFeature: F_FEATURE) => {
        const updated = [...value];
        updated[index] = newFeature;
        onChange(updated);
    };

    return (
        <div className="space-y-3">
            <div className="flex justify-between mb-4">
                <h1 className="font-semibold">Features</h1>
                <FAddFeaturePopup onAdd={handleAdd}>
                    <Button variant={"outline"}>
                        Add
                        <span>
                            <LucidePlus />
                        </span>
                    </Button>
                </FAddFeaturePopup>
            </div>
            {value.map((feature, index) => (
                <div
                    key={index}
                    className="space-y-4 flex justify-between items-center"
                >
                    <h3>Feature {index + 1}</h3>
                    <div className="flex items-center gap-2">
                        <FEditFeaturePopup
                            onSave={(newFeature) => handleEdit(index, newFeature)}
                            feature={feature}
                            featureIdx={index}
                        >
                            <Button variant={"ghost"}>
                                <LucideEdit />
                            </Button>
                        </FEditFeaturePopup>
                        <Button onClick={() => handleRemove(index)} variant={"ghost"}>
                            <LucideTrash className="text-destructive" />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};
