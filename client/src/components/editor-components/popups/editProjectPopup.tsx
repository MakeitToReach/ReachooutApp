import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PF_PROJECT } from "@/templates/professional/types/project";
import { CldUploadButton } from "next-cloudinary";
import ImageSelectButton from "../inputs/imageInputBtn";

interface EditProjectPopupProps {
    project: PF_PROJECT;
    projectIdx?: number; // optional, for display/debug
    onSave: (updated: PF_PROJECT) => void;
    children: React.ReactNode;
}

export const EditProjectPopup = ({
    project,
    projectIdx,
    onSave,
    children,
}: EditProjectPopupProps) => {
    const [formData, setFormData] = useState<PF_PROJECT>(project);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (open) setFormData(project); // reset on open
    }, [open, project]);

    const handleChange = (key: keyof PF_PROJECT, val: string) => {
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
                        Edit Project {projectIdx !== undefined && `#${projectIdx + 1}`}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                        value={formData.heading}
                        onChange={(e) => handleChange("heading", e.target.value)}
                    />

                    <Label>Category Tag</Label>
                    <Input
                        value={formData.category}
                        onChange={(e) => handleChange("category", e.target.value)}
                    />

                    <Label>Description</Label>
                    <Input
                        value={formData.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                    />

                    <CldUploadButton
                        uploadPreset="you-view"
                        options={{ sources: ["local", "url", "unsplash"] }}
                        className="cursor-pointer p-1 bg-neutral-800 rounded-lg z-[100]"
                        //eslint-disable-next-line
                        onSuccess={(result: any) => {
                            handleChange("imgUrl", result.info.url);
                        }}
                    >
                        <ImageSelectButton selectedImgUrl={formData.imgUrl!} />
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
