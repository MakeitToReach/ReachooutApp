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
import { CldUploadButton } from "next-cloudinary";
import { ReqInput } from "@/components/editor-components/inputs/reqInput";
import ImageSelectButton from "@/components/editor-components/inputs/imageInputBtn";
import { PF_BLOG } from "../types/blog.types";

interface PFAddBlogPopupProps {
    children: React.ReactNode;
    onAdd: (member: PF_BLOG) => void;
}
export function PFAddBlogPopup({ children, onAdd }: PFAddBlogPopupProps) {
    const [blog, setBlog] = useState<PF_BLOG>({
        title: "",
        imgUrl: "",
        description: "",
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
                        <textarea
                            placeholder="Chief Executive Officer"
                            className="border p-2 w-full rounded-md h-20"
                            value={blog.description}
                            onChange={(e) =>
                                setBlog({ ...blog, description: e.target.value })
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
                                setBlog({ ...blog, imgUrl: result.info.url });
                            }}
                        >
                            <ImageSelectButton selectedImgUrl={blog.imgUrl} />
                        </CldUploadButton>
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
                        <textarea
                            placeholder="Description"
                            className="border p-2 w-full rounded-md h-20"
                            value={formData.description}
                            onChange={(e) => handleChange("description", e.target.value)}
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
                            handleChange("imgUrl", result.info.url);
                        }}
                    >
                        <ImageSelectButton selectedImgUrl={formData.imgUrl} />
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
