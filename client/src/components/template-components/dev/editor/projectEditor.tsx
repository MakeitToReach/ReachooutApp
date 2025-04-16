import React from "react";
// import { EditProjectPopup } from "../popups/editProjectPopup";
// import { AddProjectPopup } from "../popups/addProjectPopup";
import { Button } from "@/components/ui/button";
import { AddDevProjectModal } from "../addprojectPopup";
import { DEV_PROJECT } from "@/templates/dev/types/projectSection.types";
import { EditDevProjectPopup } from "./editDevProjectPopup";

interface DevProjectEditorFieldProps {
  value: DEV_PROJECT[];
  onChange: (val: DEV_PROJECT[]) => void;
}
export const DevProjectEditorField = ({ value , onChange}: DevProjectEditorFieldProps) => {

    const handleAdd = (newProject: DEV_PROJECT) => {
        onChange([...value, newProject])
    }

    const handleEdit = (index: number, newProject: DEV_PROJECT) => {
        const updated = [...value];
        updated[index] = newProject;
        onChange(updated);
    }

  return (
    <div className="space-y-3">
      <div className="flex justify-between mb-4">
        <h1 className="font-semibold">Carousel</h1>
        <AddDevProjectModal onAdd={handleAdd}>
          <Button>Add Project</Button>
        </AddDevProjectModal>
      </div>
      {value.map((project, index) => (
        <div key={index} className="space-y-4 flex justify-between">
          <h3>Project {index + 1}</h3>
          <EditDevProjectPopup onSave={(newProject)=>handleEdit(index, newProject)} project={project} projectIdx={index}>
            <Button>Edit</Button>
          </EditDevProjectPopup>
        </div>
      ))}
    </div>
  );
};
