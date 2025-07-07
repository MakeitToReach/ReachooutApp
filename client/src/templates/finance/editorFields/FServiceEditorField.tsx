import React from "react";
import { Button } from "@/components/ui/button";
import { LucideEdit, LucidePlus, LucideTrash } from "lucide-react";
import { F_SERVICE } from "../types/services.types";
import { FAddServicePopup, FEditServicePopup } from "../popups/FServicePopup";

interface FServiceEditorFieldProps {
    value: F_SERVICE[];
    onChange: (val: F_SERVICE[]) => void;
}
export const FServiceEditorField = ({
    value,
    onChange,
}: FServiceEditorFieldProps) => {
    const handleAdd = (newService: F_SERVICE) => {
        onChange([...value, newService]);
    };

    const handleRemove = (index: number) => {
        const updated = [...value];
        updated.splice(index, 1);
        onChange(updated);
    };

    const handleEdit = (index: number, newService: F_SERVICE) => {
        const updated = [...value];
        updated[index] = newService;
        onChange(updated);
    };

    return (
        <div className="space-y-3">
            <div className="flex justify-between mb-4">
                <h1 className="font-semibold">Services</h1>
                <FAddServicePopup onAdd={handleAdd}>
                    <Button variant={"outline"}>
                        Add{" "}
                        <span>
                            <LucidePlus />
                        </span>
                    </Button>
                </FAddServicePopup>
            </div>
            {value.map((service, index) => (
                <div
                    key={index}
                    className="space-y-4 flex justify-between items-center"
                >
                    <h3>Service {index + 1}</h3>
                    <div className="flex items-center gap-2">
                        <FEditServicePopup
                            onSave={(newService) => handleEdit(index, newService)}
                            service={service}
                            serviceIdx={index}
                        >
                            <Button variant={"ghost"}>
                                <LucideEdit />
                            </Button>
                        </FEditServicePopup>
                        <Button onClick={() => handleRemove(index)} variant={"ghost"}>
                            <LucideTrash className="text-destructive" />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};
