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
import { Label } from "@/components/ui/label";
import { PF_EXPERIENCE_ITEM } from "../types/experience.types";
import { TipTapEditor } from "@/components/ui/TipTapEditor";

interface PFAddExperiencePopupProps {
    children: React.ReactNode;
    onAdd: (exp: PF_EXPERIENCE_ITEM) => void;
}
export function PFAddExperiencePopup({
    children,
    onAdd,
}: PFAddExperiencePopupProps) {
    const [item, setItem] = useState<PF_EXPERIENCE_ITEM>({
        title: "",
        subtitle: "",
        timePeriod: "",
        description: "",
    });
    return (
        <Dialog >
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent
                className="sm:max-w-[40vw] font-Poppins max-h-[90vh] overflow-y-auto"
            >
                <DialogHeader>
                    <DialogTitle className="md:text-2xl">Add Experience</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-3">
                    <ReqInput
                        type="text"
                        label="Title"
                        placeholder="Enter your experience title"
                        value={item.title}
                        onChange={(e) => setItem({ ...item, title: e.target.value })}
                    />
                    <ReqInput
                        type="text"
                        label="Subtitle"
                        placeholder="Enter your experience subtitle"
                        value={item.subtitle}
                        onChange={(e) => setItem({ ...item, subtitle: e.target.value })}
                    />

                    <ReqInput
                        type="text"
                        label="Time Period"
                        placeholder="Enter your experience time period"
                        value={item.timePeriod}
                        onChange={(e) => setItem({ ...item, timePeriod: e.target.value })}
                    />

                    <div className="space-y-2">
                        <Label>Description</Label>
                        <TipTapEditor
                            value={item.description}
                            onChange={(value) => setItem({ ...item, description: value })}
                            placeholder="Description"
                            height="h-36"
                            showToolbar={true}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            onClick={() => {
                                onAdd(item);
                                setItem({
                                    title: "",
                                    subtitle: "",
                                    timePeriod: "",
                                    description: "",
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

interface PFEditExperiencePopupProps {
    exp: PF_EXPERIENCE_ITEM;
    expIdx?: number;
    onSave: (updated: PF_EXPERIENCE_ITEM) => void;
    children: React.ReactNode;
}

export const PFEditExperiencePopup = ({
    exp,
    expIdx,
    onSave,
    children,
}: PFEditExperiencePopupProps) => {
    const [formData, setFormData] = useState<PF_EXPERIENCE_ITEM>(exp);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (open) setFormData(exp); // reset on open
    }, [open, exp]);

    const handleChange = (key: keyof PF_EXPERIENCE_ITEM, val: string) => {
        setFormData((prev) => ({ ...prev, [key]: val }));
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
                        Edit Experience {expIdx !== undefined && `#${expIdx + 1}`}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-3">
                    <ReqInput
                        type="text"
                        label="Title"
                        value={formData.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                    />
                    <ReqInput
                        type="text"
                        label="Subtitle"
                        value={formData.subtitle}
                        onChange={(e) => handleChange("subtitle", e.target.value)}
                    />
                    <ReqInput
                        type="text"
                        label="Time Period"
                        value={formData.timePeriod}
                        onChange={(e) => handleChange("timePeriod", e.target.value)}
                    />

                    <div className="space-y-2">
                        <Label>Description</Label>
                        <TipTapEditor
                            value={formData.description}
                            onChange={(value) => handleChange("description", value)}
                            placeholder="Description"
                            height="h-36"
                            showToolbar={true}
                        />
                    </div>
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
