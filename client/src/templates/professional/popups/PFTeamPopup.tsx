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
import { PF_TEAM_MEMBER } from "@/templates/professional/types/teamMember.types";
import { ReqInput } from "@/components/editor-components/inputs/reqInput";
import { ImageInput } from "@/components/imgInput";
import { TipTapEditor } from "@/components/ui/TipTapEditor";

interface AddTeamMemberPopupProps {
    children: React.ReactNode;
    onAdd: (member: PF_TEAM_MEMBER) => void;
}
export function AddTeamMemberPopup({
    children,
    onAdd,
}: AddTeamMemberPopupProps) {
    const [member, setMember] = useState<PF_TEAM_MEMBER>({
        name: "",
        imgUrl: "",
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
            <DialogContent
                className="sm:max-w-[40vw] font-Poppins max-h-[90vh] overflow-y-scroll"
            >
                <DialogHeader>
                    <DialogTitle className="md:text-2xl">Add Team Member</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-3">
                    <ReqInput
                        type="text"
                        label="Member Name"
                        placeholder="Enter name of the member"
                        onChange={(e) => setMember({ ...member, name: e.target.value })}
                    />

                    <ReqInput
                        type="text"
                        label="Designation"
                        placeholder="Enter designation of the member"
                        onChange={(e) =>
                            setMember({ ...member, designation: e.target.value })
                        }
                    />

                    <div>
                        <label className="font-semibold">Description</label>
                        <TipTapEditor
                            value={member.description}
                            onChange={(value) => setMember({ ...member, description: value })}
                            placeholder="Chief Executive Officer"
                            height="h-36"
                            showToolbar={true}
                        />
                    </div>

                    <div className="space-x-2">
                        <ImageInput
                            className="w-full"
                            onImageUpload={(imgUrl) => {
                                setMember({ ...member, imgUrl: imgUrl });
                            }}
                            onImageRemove={() => setMember({ ...member, imgUrl: "" })}
                        />

                        <div className="flex flex-col gap-2 mt-2">
                            {member.socials.map((social, index) => (
                                <ReqInput
                                    key={index}
                                    label={social.name}
                                    onChange={(e) => {
                                        const updated = [...member.socials];
                                        updated[index].url = e.target.value;
                                        setMember({ ...member, socials: updated });
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            onClick={() => {
                                onAdd(member);
                                setMember({
                                    name: "",
                                    imgUrl: "",
                                    designation: "",
                                    description: "",
                                    socials: [],
                                });
                            }}
                        >
                            Add member
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

interface EditTeamMemberPopupProps {
    member: PF_TEAM_MEMBER;
    memberIdx?: number;
    onSave: (updated: PF_TEAM_MEMBER) => void;
    children: React.ReactNode;
}

export const EditTeamMemberPopup = ({
    member,
    memberIdx,
    onSave,
    children,
}: EditTeamMemberPopupProps) => {
    const [formData, setFormData] = useState<PF_TEAM_MEMBER>(member);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (open) setFormData(member); // reset on open
    }, [open, member]);

    const handleChange = (key: keyof PF_TEAM_MEMBER, val: string) => {
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
                    <DialogTitle className="md:text-2xl">
                        Edit Team Member {memberIdx !== undefined && `#${memberIdx + 1}`}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-2">
                    <ReqInput
                        title="Name"
                        label="Name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                    />

                    <ReqInput
                        title="Designation"
                        label="Designation"
                        value={formData.designation}
                        onChange={(e) => handleChange("designation", e.target.value)}
                    />

                    <div>
                        <label className="font-semibold">Description</label>
                        <TipTapEditor
                            value={formData.description}
                            onChange={(value) => handleChange("description", value)}
                            placeholder="Description"
                            height="h-36"
                            showToolbar={true}
                        />
                    </div>
                </div>

                <div className="space-x-2">
                    <ImageInput
                        initialImgUrl={formData.imgUrl}
                        className="w-full"
                        onImageUpload={(imgUrl) => {
                            handleChange("imgUrl", imgUrl);
                        }}
                        onImageRemove={() => handleChange("imgUrl", "")}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    {formData.socials.map((social, index) => (
                        <ReqInput
                            placeholder={`https://${social.name.toLowerCase()}.com`}
                            key={index}
                            label={social.name}
                            value={social.url}
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
