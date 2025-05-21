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
import { ReqInput } from "../inputs/reqInput";
import { Button } from "@/components/ui/button";
import { CldUploadButton } from "next-cloudinary";
import ImageSelectButton from "../inputs/imageInputBtn";
import { PF_TEAM_MEMBER } from "@/templates/professional/types/teamMember.types";

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
        avatar: "",
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
                        label="Member Name"
                        placeholder="Enter name of the member"
                        value={member.name}
                        onChange={(e) =>
                            setMember({ ...member, name: e.target.value })
                        }
                    />

                    <div>
                        <label className="font-semibold">Designation</label>
                        <textarea
                            placeholder="Chief Executive Officer"
                            className="border p-2 w-full rounded-md h-20"
                            value={member.designation}
                            onChange={(e) =>
                                setMember({ ...member, designation: e.target.value })
                            }
                        />
                    </div>

                    <div className="space-x-2">
                        <CldUploadButton
                            uploadPreset="you-view"
                            options={{ sources: ["local", "url", "unsplash"] }}
                            className="cursor-pointer p-1 bg-neutral-800 rounded-lg z-[100]"
                            //eslint-disable-next-line
                            onSuccess={(result: any) => {
                                setMember({ ...member, avatar: result.info.url });
                            }}
                        >
                            <ImageSelectButton selectedImgUrl={member.avatar} />
                        </CldUploadButton>
                    </div>
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            onClick={() => {
                                onAdd(member);
                                setMember({
                                    name: "",
                                    avatar: "",
                                    designation: "",
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
                        Edit Team Member{" "}
                        {memberIdx !== undefined && `#${memberIdx + 1}`}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-2">
                    <ReqInput
                        title="Name"
                        label="Name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                    />

                    <div>
                        <label className="font-semibold">Designation</label>
                        <textarea
                            placeholder="Designation"
                            className="border p-2 w-full rounded-md h-20"
                            value={formData.designation}
                            onChange={(e) => handleChange("designation", e.target.value)}
                        />
                    </div>
                </div>

                <div className="space-x-2">
                    <CldUploadButton
                        uploadPreset="you-view"
                        options={{ sources: ["local", "url", "unsplash"] }}
                        className="cursor-pointer p-1 bg-neutral-800 rounded-lg z-[100]"
                        //eslint-disable-next-line
                        onSuccess={(result: any) => {
                            handleChange("avatar", result.info.url);
                        }}
                    >
                        <ImageSelectButton selectedImgUrl={member.avatar} />
                    </CldUploadButton>
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
