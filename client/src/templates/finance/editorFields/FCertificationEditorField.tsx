import React from "react";
import { Button } from "@/components/ui/button";
import { F_CERTIFICATION } from "../types/certification.types";
import { LucideEdit, LucidePlus, LucideTrash } from "lucide-react";
import {
  FAddCertificationPopup,
  FEditCertificationPopup,
} from "../popups/FCertificationPopup";

interface FCertificationEditorFieldProps {
  value: F_CERTIFICATION[];
  onChange: (value: F_CERTIFICATION[]) => void;
}

export const FCertificationEditorField = ({
  value,
  onChange,
}: FCertificationEditorFieldProps) => {
  const handleAdd = (certification: F_CERTIFICATION) => {
    onChange([...value, certification]);
  };

  const handleEdit = (index: number, updatedCertification: F_CERTIFICATION) => {
    const newValue = [...value];
    newValue[index] = updatedCertification;
    onChange(newValue);
  };

  const handleRemove = (index: number) => {
    const updated = [...value];
    updated.splice(index, 1);
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between mb-4">
        <h1 className="font-semibold">Certifications</h1>
        <FAddCertificationPopup onAdd={handleAdd}>
          <Button variant={"outline"}>
            Add{" "}
            <span>
              <LucidePlus />
            </span>
          </Button>
        </FAddCertificationPopup>
      </div>
      {value.map((cert, index) => (
        <div
          key={index}
          className="space-y-4 flex justify-between items-center"
        >
          <h3>Certification {index + 1}</h3>
          <div className="flex items-center gap-2">
            <FEditCertificationPopup
              onSave={(newCert) => handleEdit(index, newCert)}
              certification={cert}
              certificationIdx={index}
            >
              <Button variant={"ghost"}>
                <LucideEdit />
              </Button>
            </FEditCertificationPopup>
            <Button onClick={() => handleRemove(index)} variant={"ghost"}>
              <LucideTrash className="text-destructive" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
