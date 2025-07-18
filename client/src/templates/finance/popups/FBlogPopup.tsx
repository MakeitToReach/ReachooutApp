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
import { F_BLOG } from "../types/blogs.types";
import { ImageInput } from "@/components/imgInput";
import { Label } from "@/components/ui/label";
import { TipTapEditor } from "@/components/ui/TipTapEditor";

interface FAddBlogPopupProps {
    children: React.ReactNode;
    onAdd: (blog: F_BLOG) => void;
}
export function FAddBlogPopup({ children, onAdd }: FAddBlogPopupProps) {
    const [blog, setBlog] = useState<F_BLOG>({
        category: "",
        title: "",
        description: "",
        imgUrl: "",
        author: "",
        authorImgUrl: "",
    });
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[600px] font-Poppins max-h-[90vh] overflow-y-scroll">
                <DialogHeader>
                    <DialogTitle className="md:text-2xl">Add Blog</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-3">
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
                    <ReqInput
                        type="text"
                        label="Category"
                        placeholder="Enter category"
                        value={blog.category}
                        onChange={(e) => setBlog({ ...blog, category: e.target.value })}
                    />

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
                            placeholder="Enter service description"
                            height="h-36"
                            showToolbar={true}
                        />
                    </div>

                    <ReqInput
                        type="text"
                        label="Author"
                        placeholder="Enter author name"
                        value={blog.author}
                        onChange={(e) => setBlog({ ...blog, author: e.target.value })}
                    />

                    <div className="space-y-2">
                        <Label className="font-semibold">Author Image</Label>
                        <ImageInput
                            initialImgUrl={blog.authorImgUrl}
                            className="w-full"
                            onImageUpload={(imgUrl) => {
                                setBlog({ ...blog, authorImgUrl: imgUrl });
                            }}
                            onImageRemove={() => setBlog({ ...blog, authorImgUrl: "" })}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            onClick={() => {
                                onAdd(blog);
                                setBlog({
                                    category: "",
                                    title: "",
                                    description: "",
                                    imgUrl: "",
                                    author: "",
                                    authorImgUrl: "",
                                });
                            }}
                        >
                            Add Blog
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

interface FEditBlogPopupProps {
    blog: F_BLOG;
    blogIdx?: number;
    onSave: (updated: F_BLOG) => void;
    children: React.ReactNode;
}

export const FEditBlogPopup = ({
    blog,
    blogIdx,
    onSave,
    children,
}: FEditBlogPopupProps) => {
    const [formData, setFormData] = useState<F_BLOG>(blog);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (open) setFormData(blog); // reset on open
    }, [open, blog]);

    const handleChange = (key: keyof F_BLOG, val: string) => {
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

                <div className="space-y-3">
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
                    <ReqInput
                        type="text"
                        label="Category"
                        value={formData.category}
                        onChange={(e) => handleChange("category", e.target.value)}
                    />

                    <ReqInput
                        type="text"
                        label="Title"
                        value={formData.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                    />

                    <div>
                        <label className="font-semibold">Description</label>
                        <TipTapEditor
                            value={blog.description}
                            onChange={(value) => handleChange("description", value)}
                            placeholder="Enter service description"
                            height="h-36"
                            showToolbar={true}
                        />
                    </div>

                    <ReqInput
                        type="text"
                        label="Author"
                        value={formData.author}
                        onChange={(e) => handleChange("author", e.target.value)}
                    />
                    <div className="space-y-2">
                        <Label className="font-semibold">Author Image</Label>
                        <ImageInput
                            initialImgUrl={formData.authorImgUrl}
                            className="w-full"
                            onImageUpload={(imgUrl) => {
                                handleChange("authorImgUrl", imgUrl);
                            }}
                            onImageRemove={() => handleChange("authorImgUrl", "")}
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
