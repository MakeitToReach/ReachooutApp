import React from "react";
import { Button } from "@/components/ui/button";
import { LucideEdit, LucidePlus, LucideTrash } from "lucide-react";
import { PF_BLOG } from "../types/blog.types";
import { PFAddBlogPopup, PFEditBlogPopup } from "../popups/PFBlogPopup";

interface PFBlogEditorFieldProps {
    value: PF_BLOG[];
    onChange: (val: PF_BLOG[]) => void;
}
export const PFBlogEditorField = ({
    value,
    onChange,
}: PFBlogEditorFieldProps) => {
    const handleAdd = (newBlog: PF_BLOG) => {
        onChange([...value, newBlog]);
    };

    const handleRemove = (index: number) => {
        const updated = [...value];
        updated.splice(index, 1);
        onChange(updated);
    };

    const handleEdit = (index: number, newBlog: PF_BLOG) => {
        const updated = [...value];
        updated[index] = newBlog;
        onChange(updated);
    };

    return (
        <div className="space-y-3">
            <div className="flex justify-between mb-4">
                <h1 className="font-semibold">Blogs</h1>
                <PFAddBlogPopup onAdd={handleAdd}>
                    <Button variant={"outline"}>
                        Add{" "}
                        <span>
                            <LucidePlus />
                        </span>
                    </Button>
                </PFAddBlogPopup>
            </div>
            {value.map((blog, index) => (
                <div
                    key={index}
                    className="space-y-4 flex justify-between items-center"
                >
                    <h3>Blog {index + 1}</h3>
                    <div className="flex items-center gap-2">
                        <PFEditBlogPopup
                            onSave={(newBlog) => handleEdit(index, newBlog)}
                            blog={blog}
                            blogIdx={index}
                        >
                            <Button variant={"ghost"}>
                                <LucideEdit />
                            </Button>
                        </PFEditBlogPopup>
                        <Button onClick={() => handleRemove(index)} variant={"ghost"}>
                            <LucideTrash className="text-destructive" />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};
