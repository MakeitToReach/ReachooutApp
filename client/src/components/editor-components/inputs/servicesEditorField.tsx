import React from "react";
import { PF_SERVICES } from "@/templates/professional/types/services";
import { AddServicesPopup, EditServicePopup } from "../popups/servicesPopup";
import { Button } from "@/components/ui/button";
import { LucideEdit, LucidePlus, LucideTrash } from "lucide-react";

interface ServiceEditorFieldProps {
    value: PF_SERVICES[];
    onChange: (val: PF_SERVICES[]) => void;
}
export const ServicesEditorField = ({
    value,
    onChange,
}: ServiceEditorFieldProps) => {
    const handleAdd = (newService: PF_SERVICES) => {
        onChange([...value, newService]);
    };

    const handleRemove = (index: number) => {
        const updated = [...value];
        updated.splice(index, 1);
        onChange(updated);
    };

    const handleEdit = (index: number, newService: PF_SERVICES) => {
        const updated = [...value];
        updated[index] = newService;
        onChange(updated);
    };

    return (
        <div className="space-y-3">
            <div className="flex justify-between mb-4">
                <h1 className="font-semibold">Services</h1>
                <AddServicesPopup onAdd={handleAdd}>
                    <Button variant={"outline"}>
                        Add {" "}
                        <span>
                            <LucidePlus />
                        </span>
                    </Button>
                </AddServicesPopup>
            </div>
            {value.map((service, index) => (
                <div
                    key={index}
                    className="space-y-4 flex justify-between items-center"
                >
                    <h3>Service {index + 1}</h3>
                    <div className="flex items-center gap-2">
                        <EditServicePopup
                            onSave={(newService) => handleEdit(index, newService)}
                            service={service}
                            serviceIdx={index}
                        >
                            <Button variant={"ghost"}>
                                <LucideEdit />
                            </Button>
                        </EditServicePopup>
                        <Button onClick={() => handleRemove(index)} variant={"ghost"}>
                            <LucideTrash className="text-destructive" />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};
