import React from "react";
import { Button } from "@/components/ui/button";
import { LucideEdit, LucidePlus, LucideTrash } from "lucide-react";
import { FAddFeaturedServicePopup, FEditFeaturedServicePopup } from "../popups/FFeaturedServicePopup";
import { F_FEATURED_SERVICE } from "../types/featured-services.types";
interface FFeaturedServiceEditorFieldProps {
    value: F_FEATURED_SERVICE[];
    onChange: (val: F_FEATURED_SERVICE[]) => void;
}
export const FFeaturedServiceEditorField = ({
    value,
    onChange,
}: FFeaturedServiceEditorFieldProps) => {
    const handleAdd = (newService: F_FEATURED_SERVICE) => {
        onChange([...value, newService]);
    };

    const handleRemove = (index: number) => {
        const updated = [...value];
        updated.splice(index, 1);
        onChange(updated);
    };

    const handleEdit = (index: number, newService: F_FEATURED_SERVICE) => {
        const updated = [...value];
        updated[index] = newService;
        onChange(updated);
    };

    return (
        <div className="space-y-3">
            <div className="flex justify-between mb-4">
                <h1 className="font-semibold">Featured Services</h1>
                <FAddFeaturedServicePopup onAdd={handleAdd}>
                    <Button variant={"outline"}>
                        Add 
                        <span>
                            <LucidePlus />
                        </span>
                    </Button>
                </FAddFeaturedServicePopup>
            </div>
            {value.map((service, index) => (
                <div
                    key={index}
                    className="space-y-4 flex justify-between items-center"
                >
                    <h3>Featured Service {index + 1}</h3>
                    <div className="flex items-center gap-2">
                        <FEditFeaturedServicePopup
                            onSave={(newService) => handleEdit(index, newService)}
                            service={service}
                            serviceIdx={index}
                        >
                            <Button variant={"ghost"}>
                                <LucideEdit />
                            </Button>
                        </FEditFeaturedServicePopup>
                        <Button onClick={() => handleRemove(index)} variant={"ghost"}>
                            <LucideTrash className="text-destructive" />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};
