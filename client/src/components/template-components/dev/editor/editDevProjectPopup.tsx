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
import { DEV_PROJECT } from "@/templates/dev/types/projectSection.types";
import { CldUploadButton } from "next-cloudinary";
import ImageSelectButton from "@/components/editor-components/inputs/imageInputBtn";

interface EditDevProjectPopupProps {
    project: DEV_PROJECT;
    projectIdx?: number; // optional, for display/debug
    onSave: (updated: DEV_PROJECT) => void;
    children: React.ReactNode;
}

export const EditDevProjectPopup = ({
    project,
    projectIdx,
    onSave,
    children,
}: EditDevProjectPopupProps) => {
    const [formData, setFormData] = useState<DEV_PROJECT>(project);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (open) setFormData(project); // reset on open
    }, [open, project]);

    const handleChange = (key: keyof DEV_PROJECT, val: string) => {
        setFormData((prev) => ({ ...prev, [key]: val }));
    };

    const handleSave = () => {
        onSave(formData);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen} modal={false}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="space-y-4">
                <DialogHeader>
                    <DialogTitle>
                        Edit Project {projectIdx !== undefined && `#${projectIdx + 1}`}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                        value={formData.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                    />

                    <Label>Description</Label>
                    <Input
                        value={formData.desc}
                        onChange={(e) => handleChange("desc", e.target.value)}
                    />

                    <Label>Technologies</Label>
                    <Input
                        value={formData.tech}
                        onChange={(e) => handleChange("tech", e.target.value)}
                    />

                    <CldUploadButton
                        uploadPreset="you-view"
                        options={{ sources: ["local", "url", "unsplash"] }}
                        className="cursor-pointer p-1 bg-neutral-800 rounded-lg z-[100]"
                        //eslint-disable-next-line
                        onSuccess={(result: any) => {
                            handleChange("projectImg", result.info.secure_url);
                        }}
                    >
                        <ImageSelectButton selectedImgUrl={project.projectImg} />
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
