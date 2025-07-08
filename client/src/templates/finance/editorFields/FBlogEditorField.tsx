import React from "react";
import { Button } from "@/components/ui/button";
import { LucideEdit, LucidePlus, LucideTrash } from "lucide-react";
import { F_BLOG } from "../types/blogs.types";
import { FAddBlogPopup, FEditBlogPopup } from "../popups/FBlogPopup";

interface FBlogEditorFieldProps {
    value: F_BLOG[];
    onChange: (val: F_BLOG[]) => void;
}
export const FBlogEditorField = ({
    value,
    onChange,
}: FBlogEditorFieldProps) => {
    const handleAdd = (newBlog: F_BLOG) => {
        onChange([...value, newBlog]);
    };

    const handleRemove = (index: number) => {
        const updated = [...value];
        updated.splice(index, 1);
        onChange(updated);
    };

    const handleEdit = (index: number, newBlog: F_BLOG) => {
        const updated = [...value];
        updated[index] = newBlog;
        onChange(updated);
    };

    return (
        <div className="space-y-3">
            <div className="flex justify-between mb-4">
                <h1 className="font-semibold">Blogs</h1>
                <FAddBlogPopup onAdd={handleAdd}>
                    <Button variant={"outline"}>
                        Add{" "}
                        <span>
                            <LucidePlus />
                        </span>
                    </Button>
                </FAddBlogPopup>
            </div>
            {value.map((blog, index) => (
                <div
                    key={index}
                    className="space-y-4 flex justify-between items-center"
                >
                    <h3>Blog {index + 1}</h3>
                    <div className="flex items-center gap-2">
                        <FEditBlogPopup
                            onSave={(newBlog) => handleEdit(index, newBlog)}
                            blog={blog}
                            blogIdx={index}
                        >
                            <Button variant={"ghost"}>
                                <LucideEdit />
                            </Button>
                        </FEditBlogPopup>
                        <Button onClick={() => handleRemove(index)} variant={"ghost"}>
                            <LucideTrash className="text-destructive" />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};
