"use client";
import { useState, useEffect } from "react";
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
import { PF_CERTIFICATION } from "../types/certification.types";
import { ImageInput } from "@/components/imgInput";
import { Label } from "@/components/ui/label";

interface PFAddCertificationPopupProps {
    children: React.ReactNode;
    onAdd: (cert: PF_CERTIFICATION) => void;
}
export function PFAddCertificationPopup({ children, onAdd }: PFAddCertificationPopupProps) {
    const [cert, setCert] = useState<PF_CERTIFICATION>({
        imgUrl: "",
        subtitle: "",
    });
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[35vw] space-y-4 font-Poppins max-h-[90vh] overflow-y-scroll">
                <DialogHeader>
                    <DialogTitle className="md:text-2xl">Add Certification</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-3">
                    <ReqInput
                        type="text"
                        label="Subtitle"
                        placeholder="Enter certification subtitle"
                        value={cert.subtitle}
                        onChange={(e) => setCert({ ...cert, subtitle: e.target.value })}
                    />
                    <div className="space-y-2">
                        <Label>Certification Image</Label>
                        <ImageInput
                            initialImgUrl={cert.imgUrl}
                            className="w-full"
                            onImageUpload={(imgUrl) => {
                                setCert({ ...cert, imgUrl });
                            }}
                            onImageRemove={() => setCert({ ...cert, imgUrl: "" })}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            onClick={() => {
                                onAdd(cert);
                                setCert({ imgUrl: "", subtitle: "" });
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

interface PFEditCertificationPopupProps {
    cert: PF_CERTIFICATION;
    certIdx?: number;
    onSave: (updated: PF_CERTIFICATION) => void;
    children: React.ReactNode;
}

export const PFEditCertificationPopup = ({
    cert,
    certIdx,
    onSave,
    children,
}: PFEditCertificationPopupProps) => {
    const [formData, setFormData] = useState<PF_CERTIFICATION>(cert);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (open) setFormData(cert); // reset on open
    }, [open, cert]);

    const handleChange = (key: keyof PF_CERTIFICATION, val: string) => {
        setFormData((prev) => ({ ...prev, [key]: val }));
    };

    const handleSave = () => {
        onSave(formData);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="space-y-4 sm:max-w-[35vw] font-Poppins max-h-[90vh] overflow-y-scroll">
                <DialogHeader>
                    <DialogTitle className="sm:text-2xl">
                        Edit Certification {certIdx !== undefined && `#${certIdx + 1}`}
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-2">
                    <ReqInput
                        title="Subtitle"
                        label="Subtitle"
                        value={formData.subtitle}
                        onChange={(e) => handleChange("subtitle", e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label>Certification Image</Label>
                    <ImageInput
                        initialImgUrl={formData.imgUrl}
                        className="w-full"
                        onImageUpload={(imgUrl) => {
                            handleChange("imgUrl", imgUrl);
                        }}
                        onImageRemove={() => handleChange("imgUrl", "")}
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
