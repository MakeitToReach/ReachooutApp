import { Button } from "@/components/ui/button";
import { F_CERTIFICATION } from "../types/certification.types";
import { LucideEdit, LucideTrash, Plus } from "lucide-react";
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

  const handleDelete = (index: number) => {
    const newValue = value.filter((_, i) => i !== index);
    onChange(newValue);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Certifications</h3>
        <FAddCertificationPopup onAdd={handleAdd}>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Certification
          </Button>
        </FAddCertificationPopup>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
              <Button onClick={() => handleDelete(index)} variant={"ghost"}>
                <LucideTrash className="text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
