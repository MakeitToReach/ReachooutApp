import React from "react";
import { Button } from "@/components/ui/button";
import { LucideEdit, LucidePlus, LucideTrash } from "lucide-react";
import { F_TEAM_MEMBER } from "../types/team.types";
import { FAddTeamMemberPopup, FEditTeamMemberPopup } from "../popups/FTeamPopup";

interface FTeamEditorFieldProps {
    value: F_TEAM_MEMBER[];
    onChange: (val: F_TEAM_MEMBER[]) => void;
}

export const FTeamEditorField = ({
    value,
    onChange,
}: FTeamEditorFieldProps) => {
    const handleAdd = (newMember: F_TEAM_MEMBER) => {
        onChange([...value, newMember]);
    };

    const handleRemove = (index: number) => {
        const updated = [...value];
        updated.splice(index, 1);
        onChange(updated);
    };

    const handleEdit = (index: number, newMember: F_TEAM_MEMBER) => {
        const updated = [...value];
        updated[index] = newMember;
        onChange(updated);
    };

    return (
        <div className="space-y-3">
            <div className="flex justify-between mb-4">
                <h1 className="font-semibold">Team Members</h1>
                <FAddTeamMemberPopup onAdd={handleAdd}>
                    <Button variant={"outline"}>
                        Add
                        <span>
                            <LucidePlus />
                        </span>
                    </Button>
                </FAddTeamMemberPopup>
            </div>
            {value.map((member, index) => (
                <div
                    key={index}
                    className="space-y-4 flex justify-between items-center"
                >
                    <h3>Team Member {index + 1}</h3>
                    <div className="flex items-center gap-2">
                        <FEditTeamMemberPopup
                            onSave={(newMember) => handleEdit(index, newMember)}
                            member={member}
                            memberIdx={index}
                        >
                            <Button variant={"ghost"}>
                                <LucideEdit />
                            </Button>
                        </FEditTeamMemberPopup>
                        <Button onClick={() => handleRemove(index)} variant={"ghost"}>
                            <LucideTrash className="text-destructive" />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};
