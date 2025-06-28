"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ReqInput } from "@/components/editor-components/inputs/reqInput";
import { F_TEAM_MEMBER } from "../types/team.types";

interface FAddTeamMemberPopupProps {
  children: React.ReactNode;
  onAdd: (member: F_TEAM_MEMBER) => void;
}

export function FAddTeamMemberPopup({ children, onAdd }: FAddTeamMemberPopupProps) {
  const [member, setMember] = useState<F_TEAM_MEMBER>({
    imgUrl: "",
    name: "",
    designation: "",
  });

  return (
    <Dialog modal={false}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="sm:max-w-[600px] font-Poppins"
        style={{ overflow: "visible" }}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="md:text-2xl">Add Team Member</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <ReqInput
            type="text"
            label="Name"
            placeholder="Enter team member name"
            value={member.name}
            onChange={(e) => setMember({ ...member, name: e.target.value })}
          />

          <ReqInput
            type="text"
            label="Designation"
            placeholder="Enter team member designation"
            value={member.designation}
            onChange={(e) =>
              setMember({ ...member, designation: e.target.value })
            }
          />

          <ReqInput
            type="text"
            label="Image URL"
            placeholder="Enter team member image URL"
            value={member.imgUrl}
            onChange={(e) =>
              setMember({ ...member, imgUrl: e.target.value })
            }
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() => {
                onAdd(member);
                setMember({
                  imgUrl: "",
                  name: "",
                  designation: "",
                });
              }}
            >
              Add
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface FEditTeamMemberPopupProps {
  member: F_TEAM_MEMBER;
  memberIdx?: number;
  onSave: (updated: F_TEAM_MEMBER) => void;
  children: React.ReactNode;
}

export const FEditTeamMemberPopup = ({
  member,
  memberIdx,
  onSave,
  children,
}: FEditTeamMemberPopupProps) => {
  const [formData, setFormData] = useState<F_TEAM_MEMBER>(member);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) setFormData(member); // reset on open
  }, [open, member]);

  const handleChange = (key: keyof F_TEAM_MEMBER, val: string) => {
    setFormData((prev) => ({ ...prev, [key]: val }));
  };

  const handleSave = () => {
    onSave(formData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="space-y-4 z-[100] font-Poppins">
        <DialogHeader>
          <DialogTitle>
            Edit Team Member {memberIdx !== undefined && `#${memberIdx + 1}`}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <ReqInput
            type="text"
            label="Name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />

          <ReqInput
            type="text"
            label="Designation"
            value={formData.designation}
            onChange={(e) => handleChange("designation", e.target.value)}
          />

          <ReqInput
            type="text"
            label="Image URL"
            value={formData.imgUrl}
            onChange={(e) => handleChange("imgUrl", e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
