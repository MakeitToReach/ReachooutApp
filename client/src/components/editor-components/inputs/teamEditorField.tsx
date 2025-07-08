import React from "react";
import { Button } from "@/components/ui/button";
import { LucideEdit, LucidePlus, LucideTrash } from "lucide-react";
import { PF_TEAM_MEMBER } from "@/templates/professional/types/teamMember.types";
import { AddTeamMemberPopup, EditTeamMemberPopup } from "@/templates/professional/popups/PFTeamPopup";

interface TeamMemberEditorFieldProps {
    value: PF_TEAM_MEMBER[];
    onChange: (val: PF_TEAM_MEMBER[]) => void;
}
export const TeamMemberEditorField = ({
    value,
    onChange,
}: TeamMemberEditorFieldProps) => {
    const handleAdd = (newMember: PF_TEAM_MEMBER) => {
        onChange([...value, newMember]);
    };

    const handleRemove = (index: number) => {
        const updated = [...value];
        updated.splice(index, 1);
        onChange(updated);
    };

    const handleEdit = (index: number, newMember: PF_TEAM_MEMBER) => {
        const updated = [...value];
        updated[index] = newMember;
        onChange(updated);
    };

    return (
        <div className="space-y-3">
            <div className="flex justify-between mb-4">
                <h1 className="font-semibold">Team Members</h1>
                <AddTeamMemberPopup onAdd={handleAdd}>
                    <Button variant={"outline"}>
                        Add{" "}
                        <span>
                            <LucidePlus />
                        </span>
                    </Button>
                </AddTeamMemberPopup>
            </div>
            {value.map((member, index) => (
                <div
                    key={index}
                    className="space-y-4 flex justify-between items-center"
                >
                    <h3>Member {index + 1}</h3>
                    <div className="flex items-center gap-2">
                        <EditTeamMemberPopup
                            onSave={(newMember) => handleEdit(index, newMember)}
                            member={member}
                            memberIdx={index}
                        >
                            <Button variant={"ghost"} title="Edit">
                                <LucideEdit />
                            </Button>
                        </EditTeamMemberPopup>
                        <Button onClick={() => handleRemove(index)} variant={"ghost"} title="Delete">
                            <LucideTrash className="text-destructive" />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};
