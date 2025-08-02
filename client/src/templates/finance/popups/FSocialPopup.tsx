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
import { F_SOCIAL } from "../types/social.types";

interface FAddSocialPopupProps {
    children: React.ReactNode;
    onAdd: (social: F_SOCIAL) => void;
}
export function FAddSocialPopup({ children, onAdd }: FAddSocialPopupProps) {
    const [social, setSocial] = useState<F_SOCIAL>({
        title: "",
        btnLink: "",
        followerCounts: 0,
    });
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent
                className="sm:max-w-[50vw] max-h-[90vh] overflow-y-scroll font-Poppins"
                onInteractOutside={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle className="sm:text-2xl">Add Social Media</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-3">
                    <ReqInput
                        type="text"
                        label="Platform Name"
                        placeholder="e.g., Instagram, LinkedIn, Twitter"
                        value={social.title}
                        onChange={(e) => setSocial({ ...social, title: e.target.value })}
                    />
                    <ReqInput
                        type="text"
                        label="Profile URL"
                        placeholder="https://instagram.com/yourusername"
                        value={social.btnLink}
                        onChange={(e) => setSocial({ ...social, btnLink: e.target.value })}
                    />
                    <ReqInput
                        type="number"
                        label="Follower Count"
                        placeholder="1000"
                        value={social.followerCounts?.toString() || ""}
                        onChange={(e) => setSocial({ ...social, followerCounts: parseInt(e.target.value) || 0 })}
                    />
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            onClick={() => {
                                onAdd(social);
                                setSocial({
                                    title: "",
                                    btnLink: "",
                                    followerCounts: 0,
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

interface FEditSocialPopupProps {
    social: F_SOCIAL;
    socialIdx?: number;
    onSave: (updated: F_SOCIAL) => void;
    children: React.ReactNode;
}

export const FEditSocialPopup = ({
    social,
    socialIdx,
    onSave,
    children,
}: FEditSocialPopupProps) => {
    const [formData, setFormData] = useState<F_SOCIAL>(social);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (open) setFormData(social); // reset on open
    }, [open, social]);

    const handleChange = (key: keyof F_SOCIAL, val: string | number) => {
        setFormData((prev) => ({ ...prev, [key]: val }));
    };

    const handleSave = () => {
        onSave(formData);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent
                className="sm:max-w-[50vw] max-h-[90vh] overflow-y-scroll font-Poppins"
                onInteractOutside={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle className="sm:text-2xl">
                        Edit Social Media {socialIdx !== undefined && `#${socialIdx + 1}`}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-3">
                    <ReqInput
                        type="text"
                        label="Platform Name"
                        value={formData.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                    />
                    <ReqInput
                        type="text"
                        label="Profile URL"
                        value={formData.btnLink}
                        onChange={(e) => handleChange("btnLink", e.target.value)}
                    />
                    <ReqInput
                        type="number"
                        label="Follower Count"
                        value={formData.followerCounts?.toString() || ""}
                        onChange={(e) => handleChange("followerCounts", parseInt(e.target.value) || 0)}
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