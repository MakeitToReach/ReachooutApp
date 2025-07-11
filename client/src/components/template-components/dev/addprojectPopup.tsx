"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DEV_PROJECT } from "@/templates/dev/types/projectSection.types";
import { CldUploadButton } from "next-cloudinary";
import ImageSelectButton from "@/components/editor-components/inputs/imageInputBtn";

type Props = {
    children: React.ReactNode;
    onAdd: (project: DEV_PROJECT) => void;
};

export const AddDevProjectModal = ({ onAdd, children }: Props) => {
    const [project, setProject] = useState<DEV_PROJECT>({
        projectImg: "",
        title: "",
        desc: "",
        tech: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setProject((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (!project.title || !project.desc) return;
        onAdd(project);
        setProject({ projectImg: "", title: "", desc: "", tech: "" }); // reset
    };

    return (
        <Dialog modal={false}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Add New Project</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            name="title"
                            placeholder="Project title"
                            value={project.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="desc">Description</Label>
                        <textarea
                            className="border p-2 w-full h-36 rounded-md"
                            name="desc"
                            placeholder="Short description"
                            value={project.desc}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="tech">Tech Stack</Label>
                        <Input
                            name="tech"
                            placeholder="e.g. React, Express, MongoDB"
                            value={project.tech}
                            onChange={handleChange}
                        />
                    </div>

                    <CldUploadButton
                        uploadPreset="you-view"
                        options={{ sources: ["local", "url", "unsplash"] }}
                        className="cursor-pointer p-1 bg-neutral-800 w-fit rounded-lg z-[100]"
                        //eslint-disable-next-line
                        onSuccess={(result: any) => {
                            setProject((prev) => ({
                                ...prev,
                                projectImg: result.info.secure_url,
                            }));
                        }}
                        
                    >
                        <ImageSelectButton selectedImgUrl={project.projectImg} />
                    </CldUploadButton>
                </div>

                <div className="flex justify-end">
                    <Button onClick={handleSubmit}>Save Project</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
