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
import { F_PROJECT } from "../types/projects.types";
import { ImageInput } from "@/components/imgInput";
import { TipTapEditor } from "@/components/ui/TipTapEditor";

interface FAddProjectPopupProps {
    children: React.ReactNode;
    onAdd: (service: F_PROJECT) => void;
}
export function FAddProjectPopup({ children, onAdd }: FAddProjectPopupProps) {
    const [project, setProject] = useState<F_PROJECT>({
        title: "",
        description: "",
        category: "",
        imgUrl: "",
        projectUrl: "",
    });
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent
                className="sm:max-w-[600px] font-Poppins"
                style={{ overflow: "visible" }}
                onInteractOutside={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle className="sm:text-2xl">Add Project</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-3">
                    <div className="space-y-2">
                        <Label className="font-semibold">Project Image</Label>
                        <ImageInput
                            initialImgUrl={project.imgUrl}
                            className="w-full"
                            onImageUpload={(imgUrl) => {
                                setProject({ ...project, imgUrl: imgUrl });
                            }}
                            onImageRemove={() => setProject({ ...project, imgUrl: "" })}
                        />
                    </div>
                    <ReqInput
                        type="text"
                        label="Title"
                        placeholder="Enter your project title"
                        value={project.title}
                        onChange={(e) => setProject({ ...project, title: e.target.value })}
                    />

                    <div className="space-y-2">
                        <Label>Description</Label>
                        <TipTapEditor
                            value={project.description}
                            onChange={(value) =>
                                setProject({ ...project, description: value })
                            }
                            placeholder="Enter service description"
                            height="h-36"
                            showToolbar={true}
                        />
                    </div>

                    <ReqInput
                        type="text"
                        label="Category"
                        placeholder="Enter your project category"
                        value={project.category}
                        onChange={(e) =>
                            setProject({ ...project, category: e.target.value })
                        }
                    />
                    <ReqInput
                        type="text"
                        label="Project URL"
                        placeholder="Enter your project url"
                        value={project.projectUrl}
                        onChange={(e) =>
                            setProject({ ...project, projectUrl: e.target.value })
                        }
                    />
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            onClick={() => {
                                onAdd(project);
                                setProject({
                                    title: "",
                                    description: "",
                                    category: "",
                                    imgUrl: "",
                                    projectUrl: "",
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

interface FEditProjectPopupProps {
    project: F_PROJECT;
    projectIdx?: number;
    onSave: (updated: F_PROJECT) => void;
    children: React.ReactNode;
}

export const FEditProjectPopup = ({
    project,
    projectIdx,
    onSave,
    children,
}: FEditProjectPopupProps) => {
    const [formData, setFormData] = useState<F_PROJECT>(project);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (open) setFormData(project); // reset on open
    }, [open, project]);

    const handleChange = (key: keyof F_PROJECT, val: string) => {
        setFormData((prev) => ({ ...prev, [key]: val }));
    };

    const handleSave = () => {
        onSave(formData);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="space-y-4 z-[100] font-Poppins">
                <DialogHeader>
                    <DialogTitle>
                        Edit Project {projectIdx !== undefined && `#${projectIdx + 1}`}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-3">
                    <div className="space-y-2">
                        <Label className="font-semibold">Project Image</Label>
                        <ImageInput
                            initialImgUrl={formData.imgUrl}
                            className="w-full"
                            onImageUpload={(imgUrl) => {
                                handleChange("imgUrl", imgUrl);
                            }}
                            onImageRemove={() => handleChange("imgUrl", "")}
                        />
                    </div>
                    <ReqInput
                        type="text"
                        label="Title"
                        value={formData.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                    />

                    <div className="space-y-2">
                        <Label>Description</Label>
                        <TipTapEditor
                            value={project.description}
                            onChange={(value) => handleChange("description", value)}
                            placeholder="Enter service description"
                            height="h-36"
                            showToolbar={true}
                        />
                    </div>
                    <ReqInput
                        type="text"
                        label="Category"
                        value={formData.category}
                        onChange={(e) => handleChange("category", e.target.value)}
                    />
                    <ReqInput
                        type="text"
                        label="Project URL"
                        value={formData.projectUrl}
                        onChange={(e) => handleChange("projectUrl", e.target.value)}
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
