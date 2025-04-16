import React from "react";
import { EditProjectPopup } from "../popups/editProjectPopup";
import { AddProjectPopup } from "../popups/addProjectPopup";
import { Button } from "@/components/ui/button";
import { PF_PROJECT } from "@/templates/professional/types/project";

interface ProjectEditorFieldProps {
  value: PF_PROJECT[];
  onChange: (val: PF_PROJECT[]) => void;
}
export const ProjectEditorField = ({ value , onChange}: ProjectEditorFieldProps) => {

    const handleAdd = (newProject: PF_PROJECT) => {
        onChange([...value, newProject])
    }

    const handleEdit = (index: number, newProject: PF_PROJECT) => {
        const updated = [...value];
        updated[index] = newProject;
        onChange(updated);
    }

  return (
    <div className="space-y-3">
      <div className="flex justify-between mb-4">
        <h1 className="font-semibold">Carousel</h1>
        <AddProjectPopup onAdd={handleAdd}>
          <Button>Add Project</Button>
        </AddProjectPopup>
      </div>
      {value.map((project, index) => (
        <div key={index} className="space-y-4 flex justify-between">
          <h3>Project {index + 1}</h3>
          <EditProjectPopup onSave={(newProject)=>handleEdit(index, newProject)} project={project} projectIdx={index}>
            <Button>Edit</Button>
          </EditProjectPopup>
        </div>
      ))}
    </div>
  );
};
