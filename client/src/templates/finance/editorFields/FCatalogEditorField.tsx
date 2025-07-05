import React from "react";
import { Button } from "@/components/ui/button";
import { LucideEdit, LucidePlus, LucideTrash } from "lucide-react";
import { F_CATLOG_SERVICES } from "../types/service-catalog.types";
import {
    FAddCatalogPopup,
    FEditCatalogPopup,
} from "../popups/FCatalogPopup";

interface FCatalogEditorFieldProps {
    value: F_CATLOG_SERVICES[];
    onChange: (val: F_CATLOG_SERVICES[]) => void;
}
export const FCatalogEditorField = ({
    value,
    onChange,
}: FCatalogEditorFieldProps) => {
    const handleAdd = (newItem: F_CATLOG_SERVICES) => {
        onChange([...value, newItem]);
    };

    const handleRemove = (index: number) => {
        const updated = [...value];
        updated.splice(index, 1);
        onChange(updated);
    };

    const handleEdit = (index: number, newItem: F_CATLOG_SERVICES) => {
        const updated = [...value];
        updated[index] = newItem;
        onChange(updated);
    };

    return (
        <div className="space-y-3">
            <div className="flex justify-between mb-4">
                <h1 className="font-semibold">Catalog Services</h1>
                <FAddCatalogPopup onAdd={handleAdd}>
                    <Button variant={"outline"}>
                        Add{" "}
                        <span>
                            <LucidePlus />
                        </span>
                    </Button>
                </FAddCatalogPopup>
            </div>
            {value.map((service, index) => (
                <div
                    key={index}
                    className="space-y-4 flex justify-between items-center"
                >
                    <h3>Service {index + 1}</h3>
                    <div className="flex items-center gap-2">
                        <FEditCatalogPopup
                            onSave={(newItem) => handleEdit(index, newItem)}
                            item={service}
                            itemIdx={index}
                        >
                            <Button variant={"ghost"}>
                                <LucideEdit />
                            </Button>
                        </FEditCatalogPopup>
                        <Button onClick={() => handleRemove(index)} variant={"ghost"}>
                            <LucideTrash className="text-destructive" />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
}; 