import React from "react";
import { Button } from "@/components/ui/button";
import { LucideEdit, LucidePlus, LucideTrash } from "lucide-react";
import { F_PROJECT } from "../types/projects.types";
import { FAddProjectPopup, FEditProjectPopup } from "../popups/FProjectPopup";

interface FProjectEditorFieldProps {
    value: F_PROJECT[];
    onChange: (val: F_PROJECT[]) => void;
}
export const FProjectEditorField = ({
    value,
    onChange,
}: FProjectEditorFieldProps) => {
    const handleAdd = (newProject: F_PROJECT) => {
        onChange([...value, newProject]);
    };

    const handleRemove = (index: number) => {
        const updated = [...value];
        updated.splice(index, 1);
        onChange(updated);
    };

    const handleEdit = (index: number, newProject: F_PROJECT) => {
        const updated = [...value];
        updated[index] = newProject;
        onChange(updated);
    };

    return (
        <div className="space-y-3">
            <div className="flex justify-between mb-4">
                <h1 className="font-semibold">Your Project</h1>
                <FAddProjectPopup onAdd={handleAdd}>
                    <Button variant={"outline"}>
                        Add Project{" "}
                        <span>
                            <LucidePlus />
                        </span>
                    </Button>
                </FAddProjectPopup>
            </div>
            {value.map((project, index) => (
                <div
                    key={index}
                    className="space-y-4 flex justify-between items-center"
                >
                    <h3>Project {index + 1}</h3>
                    <div className="flex items-center gap-2">
                        <FEditProjectPopup
                            onSave={(newProject) => handleEdit(index, newProject)}
                            project={project}
                            projectIdx={index}
                        >
                            <Button variant={"ghost"}>
                                <LucideEdit />
                            </Button>
                        </FEditProjectPopup>
                        <Button onClick={() => handleRemove(index)} variant={"ghost"}>
                            <LucideTrash className="text-destructive" />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};
