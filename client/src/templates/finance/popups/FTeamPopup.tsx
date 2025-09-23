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
import { ImageInput } from "@/components/imgInput";
import { Label } from "@/components/ui/label";
import { TipTapEditor } from "@/components/ui/TipTapEditor";

interface FAddTeamMemberPopupProps {
  children: React.ReactNode;
  onAdd: (member: F_TEAM_MEMBER) => void;
}

export function FAddTeamMemberPopup({
  children,
  onAdd,
}: FAddTeamMemberPopupProps) {
  const [member, setMember] = useState<F_TEAM_MEMBER>({
    imgUrl: "",
    name: "",
    designation: "",
    description: "",
    socials: [
      {
        name: "X",
        url: "",
      },
      {
        name: "Linkedin",
        url: "",
      },
      {
        name: "Instagram",
        url: "",
      },
      {
        name: "Github",
        url: "",
      },
      {
        name: "Youtube",
        url: "",
      },
      {
        name: "Facebook",
        url: "",
      },
    ],
  });

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[40vw] font-Poppins max-h-[90vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="md:text-2xl">Add Team Member</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <div className="space-y-2">
            <Label>Team Member Image</Label>
            <ImageInput
              className="w-full"
              onImageUpload={(imgUrl) => {
                setMember({ ...member, imgUrl: imgUrl });
              }}
              onImageRemove={() => setMember({ ...member, imgUrl: "" })}
            />
            <p className="text-xs text-gray-700">
              Best fit: 4:5 ratio (700x875 px)
            </p>
          </div>
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

          <div className="space-y-2">
            <Label>Description</Label>
            <TipTapEditor
              value={member.description}
              onChange={(value) => setMember({ ...member, description: value })}
              placeholder="Enter service description"
              height="h-36"
              showToolbar={true}
            />
          </div>

          <div className="flex flex-col gap-2 mt-2">
            {member.socials.map((social, index) => (
              <ReqInput
                key={index}
                label={social.name}
                value={social.url || ""}
                onChange={(e) => {
                  const updated = [...member.socials];
                  updated[index].url = e.target.value;
                  setMember({ ...member, socials: updated });
                }}
              />
            ))}
          </div>
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
                  description: "",
                  socials: [
                    {
                      name: "X",
                      url: "",
                    },
                    {
                      name: "Linkedin",
                      url: "",
                    },
                    {
                      name: "Instagram",
                      url: "",
                    },
                    {
                      name: "Github",
                      url: "",
                    },
                    {
                      name: "Youtube",
                      url: "",
                    },
                    {
                      name: "Facebook",
                      url: "",
                    },
                  ],
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

  const initialSocials = [
    {
      name: "X",
      url: "",
    },
    {
      name: "Linkedin",
      url: "",
    },
    {
      name: "Instagram",
      url: "",
    },
    {
      name: "Github",
      url: "",
    },
    {
      name: "Youtube",
      url: "",
    },
    {
      name: "Facebook",
      url: "",
    },
  ];

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) setFormData(member); // reset on open
  }, [open, member]);

  const handleChange = (key: keyof F_TEAM_MEMBER, val: string) => {
    setFormData((prev) => ({ ...prev, [key]: val }));
  };

  const handleSocialChange = (index: number, newUrl: string) => {
    setFormData((prev) => {
      const updatedSocials = [...prev.socials];
      updatedSocials[index] = { ...updatedSocials[index], url: newUrl };
      return { ...prev, socials: updatedSocials };
    });
  };

  const handleSave = () => {
    onSave(formData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="space-y-4 sm:max-w-[40vw] font-Poppins max-h-[90vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="sm:text-2xl">
            Edit Team Member {memberIdx !== undefined && `#${memberIdx + 1}`}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div className="space-y-2">
            <label className="font-semibold">Team Member Image</label>
            <ImageInput
              initialImgUrl={formData.imgUrl}
              className="w-full"
              onImageUpload={(imgUrl) => {
                handleChange("imgUrl", imgUrl);
              }}
              onImageRemove={() => handleChange("imgUrl", "")}
            />
            <p className="text-xs text-gray-700">
              Best fit: 4:5 ratio (700x875 px)
            </p>
          </div>
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
          <div className="space-y-2">
            <Label>Description</Label>
            <TipTapEditor
              value={member.description}
              onChange={(value) => handleChange("description", value)}
              placeholder="Enter service description"
              height="h-36"
              showToolbar={true}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {initialSocials.map((social, index) => (
            <ReqInput
              placeholder={`https://${social.name.toLowerCase()}.com`}
              key={index}
              label={social.name}
              value={formData.socials[index]?.url || ""}
              onChange={(e) => handleSocialChange(index, e.target.value)}
            />
          ))}
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
