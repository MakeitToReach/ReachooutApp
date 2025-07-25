import React from "react";
import { Button } from "@/components/ui/button";
import { LucideEdit, LucidePlus, LucideTrash } from "lucide-react";
import { PF_CERTIFICATION } from "../types/certification.types";
import { PFAddCertificationPopup, PFEditCertificationPopup } from "../popups/PFCertificationsPopup";

interface PFCertificationEditorFieldProps {
    value: PF_CERTIFICATION[];
    onChange: (val: PF_CERTIFICATION[]) => void;
}
export const PFCertificationEditorField = ({
    value,
    onChange,
}: PFCertificationEditorFieldProps) => {
    const handleAdd = (newCert: PF_CERTIFICATION) => {
        onChange([...value, newCert]);
    };

    const handleRemove = (index: number) => {
        const updated = [...value];
        updated.splice(index, 1);
        onChange(updated);
    };

    const handleEdit = (index: number, newCert: PF_CERTIFICATION) => {
        const updated = [...value];
        updated[index] = newCert;
        onChange(updated);
    };

    return (
        <div className="space-y-3">
            <div className="flex justify-between mb-4">
                <h1 className="font-semibold">Certifications</h1>
                <PFAddCertificationPopup onAdd={handleAdd}>
                    <Button variant={"outline"}>
                        Add{" "}
                        <span>
                            <LucidePlus />
                        </span>
                    </Button>
                </PFAddCertificationPopup>
            </div>
            {value.map((cert, index) => (
                <div
                    key={index}
                    className="space-y-4 flex justify-between items-center"
                >
                    <h3>Certification {index + 1}</h3>
                    <div className="flex items-center gap-2">
                        <PFEditCertificationPopup
                            onSave={(newCert) => handleEdit(index, newCert)}
                            cert={cert}
                            certIdx={index}
                        >
                            <Button variant={"ghost"}>
                                <LucideEdit />
                            </Button>
                        </PFEditCertificationPopup>
                        <Button onClick={() => handleRemove(index)} variant={"ghost"}>
                            <LucideTrash className="text-destructive" />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
}; 