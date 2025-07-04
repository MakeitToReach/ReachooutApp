import React from "react";
import { Button } from "@/components/ui/button";
import { LucideEdit, LucidePlus, LucideTrash } from "lucide-react";
import { PF_CATALOG } from "../types/serviceCatalog.types";
import {
    PFAddCatalogPopup,
    PFEditCatalogPopup,
} from "../popups/PFCatalogPopup";

interface PFCatalogEditorFieldProps {
    value: PF_CATALOG[];
    onChange: (val: PF_CATALOG[]) => void;
}
export const PFCatalogEditorField = ({
    value,
    onChange,
}: PFCatalogEditorFieldProps) => {
    const handleAdd = (newItem: PF_CATALOG) => {
        onChange([...value, newItem]);
    };

    const handleRemove = (index: number) => {
        const updated = [...value];
        updated.splice(index, 1);
        onChange(updated);
    };

    const handleEdit = (index: number, newItem: PF_CATALOG) => {
        const updated = [...value];
        updated[index] = newItem;
        onChange(updated);
    };

    return (
        <div className="space-y-3">
            <div className="flex justify-between mb-4">
                <h1 className="font-semibold">Experience</h1>
                <PFAddCatalogPopup onAdd={handleAdd}>
                    <Button variant={"outline"}>
                        Add{" "}
                        <span>
                            <LucidePlus />
                        </span>
                    </Button>
                </PFAddCatalogPopup>
            </div>
            {value.map((faq, index) => (
                <div
                    key={index}
                    className="space-y-4 flex justify-between items-center"
                >
                    <h3>Catalog {index + 1}</h3>
                    <div className="flex items-center gap-2">
                        <PFEditCatalogPopup
                            onSave={(newItem) => handleEdit(index, newItem)}
                            item={faq}
                            itemIdx={index}
                        >
                            <Button variant={"ghost"}>
                                <LucideEdit />
                            </Button>
                        </PFEditCatalogPopup>
                        <Button onClick={() => handleRemove(index)} variant={"ghost"}>
                            <LucideTrash className="text-destructive" />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};
