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
import { PF_BLOG } from "../types/blog.types";
import { ImageInput } from "@/components/imgInput";
import { Label } from "@/components/ui/label";
import { TipTapEditor } from "@/components/ui/TipTapEditor";

interface PFAddBlogPopupProps {
    children: React.ReactNode;
    onAdd: (member: PF_BLOG) => void;
}
export function PFAddBlogPopup({ children, onAdd }: PFAddBlogPopupProps) {
    const [blog, setBlog] = useState<PF_BLOG>({
        title: "",
        imgUrl: "",
        description: "",
        btnText: "",
        btnLink: "",
    });
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[600px] font-Poppins max-h-[90vh] overflow-y-scroll">
                <DialogHeader>
                    <DialogTitle className="md:text-2xl">Add Blog</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-3">
                    <ReqInput
                        type="text"
                        label="Title"
                        placeholder="Enter title"
                        value={blog.title}
                        onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                    />

                    <div>
                        <label className="font-semibold">Description</label>
                        <TipTapEditor
                            value={blog.description}
                            onChange={(value) => setBlog({ ...blog, description: value })}
                            placeholder="Enter blog description"
                            height="h-36"
                            showToolbar={true}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="font-semibold">Blog Image</Label>
                        <ImageInput
                            initialImgUrl={blog.imgUrl}
                            className="w-full"
                            onImageUpload={(imgUrl) => {
                                setBlog({ ...blog, imgUrl: imgUrl });
                            }}
                            onImageRemove={() => setBlog({ ...blog, imgUrl: "" })}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            onClick={() => {
                                onAdd(blog);
                                setBlog({
                                    title: "",
                                    imgUrl: "",
                                    description: "",
                                    btnText: "",
                                    btnLink: "",
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

interface PFEditBlogPopupProps {
    blog: PF_BLOG;
    blogIdx?: number;
    onSave: (updated: PF_BLOG) => void;
    children: React.ReactNode;
}

export const PFEditBlogPopup = ({
    blog,
    blogIdx,
    onSave,
    children,
}: PFEditBlogPopupProps) => {
    const [formData, setFormData] = useState<PF_BLOG>(blog);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (open) setFormData(blog); // reset on open
    }, [open, blog]);

    const handleChange = (key: keyof PF_BLOG, val: string) => {
        setFormData((prev) => ({ ...prev, [key]: val }));
    };

    const handleSave = () => {
        onSave(formData);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="space-y-4 z-[100] font-Poppins max-h-[90vh] overflow-y-scroll">
                <DialogHeader>
                    <DialogTitle>
                        Edit Blog {blogIdx !== undefined && `#${blogIdx + 1}`}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-2">
                    <ReqInput
                        title="Title"
                        label="Title"
                        value={formData.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                    />

                    <div>
                        <label className="font-semibold">Description</label>
                        <TipTapEditor
                            value={formData.description}
                            onChange={(value) => handleChange("description", value)}
                            placeholder="Enter blog description"
                            height="h-36"
                            showToolbar={true}
                        />
                    </div>

                    <ReqInput
                        type="text"
                        label="Button Text"
                        placeholder="Enter button text"
                        value={formData.btnText}
                        onChange={(e) => handleChange("btnText", e.target.value)}
                    />

                    <ReqInput
                        type="text"
                        label="Button Link"
                        placeholder="Enter button link"
                        value={formData.btnLink}
                        onChange={(e) => handleChange("btnLink", e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <Label className="font-semibold">Blog Image</Label>
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
