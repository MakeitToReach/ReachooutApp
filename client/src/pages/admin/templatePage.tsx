"use client";

import { createTemplateCategory } from "@/api/admin";
import { getCategoriesByTemplateId } from "@/api/templates";
import { ReqInput } from "@/components/editor-components/inputs/reqInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CategoryItem } from "@/types/category.types";
import { Copy } from "lucide-react";
import { useSearchParams } from "next/dist/client/components/navigation";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";

// Dynamically load react-json-view for Next.js compatibility
const ReactJson = dynamic(() => import("react-json-view"), { ssr: false });

const TemplatePage = () => {
    const params = useParams<{ id: string }>();
    const id = params?.id;

    const searchParams = useSearchParams();
    const name = searchParams?.get("name");

    const [formData, setFormData] = useState({
        category: "",
        data: "",
    });
    const [categories, setCategories] = useState<CategoryItem[]>([]);
    const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);
    const [editMode, setEditMode] = useState<"paste" | "visual">("paste");
    const [isJsonValid, setIsJsonValid] = useState(true);

    //eslint-disable-next-line
    const handleCopy = (data: any) => {
        navigator.clipboard.writeText(JSON.stringify(data, null, 2));
        toast.success("JSON copied to clipboard");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!id || formData.category === "" || formData.data === "") {
                toast.error("All fields are required");
                return;
            }

            try {
                JSON.parse(formData.data);
                //eslint-disable-next-line
            } catch (err: any) {
                toast.error("Invalid JSON format");
                return;
            }

            await createTemplateCategory(id, formData.category, formData.data);
        } catch (error) {
            console.error("Error creating template:", error);
        }
    };

    const toggleCategory = (categoryId: string) => {
        setOpenCategoryId(openCategoryId === categoryId ? null : categoryId);
    };

    useEffect(() => {
        const fetchCategories = async () => {
            if (!id) return;
            const response = await getCategoriesByTemplateId(id);
            setCategories(response.categories);
        };

        fetchCategories();
    }, [id]);

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <h1 className="capitalize text-3xl">{name} Template Settings</h1>

            {/* All categories list */}
            <Card>
                <CardHeader className="text-xl">All Categories</CardHeader>
                <CardContent className="space-y-4">
                    {categories.length > 0 ? (
                        categories.map((category: CategoryItem) => (
                            <div
                                key={category.id}
                                className="border p-4 rounded-md shadow-sm hover:shadow transition relative"
                            >
                                <div
                                    className="flex justify-between items-start mb-2 cursor-pointer"
                                    onClick={() => toggleCategory(category.id)}
                                >
                                    <h2 className="font-semibold">{category.category}</h2>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleCopy(category.data);
                                        }}
                                    >
                                        <Copy className="w-4 h-4" />
                                    </Button>
                                </div>

                                {openCategoryId === category.id && (
                                    <SyntaxHighlighter
                                        language="json"
                                        style={oneLight}
                                        wrapLongLines={true}
                                        customStyle={{ borderRadius: "0.375rem", padding: "1rem" }}
                                    >
                                        {JSON.stringify(category.data, null, 2)}
                                    </SyntaxHighlighter>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No categories found</p>
                    )}
                </CardContent>
            </Card>

            {/* Create template category form */}
            <Card>
                <CardHeader className="text-xl">Create Template Category</CardHeader>
                <CardContent>
                    <form method="post" className="space-y-4" onSubmit={handleSubmit}>
                        <ReqInput
                            label="Category Name"
                            name="category"
                            placeholder="Enter category name"
                            value={formData.category}
                            onChange={(e) =>
                                setFormData({ ...formData, category: e.target.value })
                            }
                        />

                        <div className="flex items-center justify-between mb-2">
                            <Label className="text-lg">Category Data</Label>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() =>
                                    setEditMode(editMode === "paste" ? "visual" : "paste")
                                }
                            >
                                {editMode === "paste"
                                    ? "Switch to Visual Editor"
                                    : "Switch to Paste Mode"}
                            </Button>
                        </div>

                        {editMode === "paste" && (
                            <div className="space-y-2">
                                <Textarea
                                    name="data"
                                    required
                                    placeholder="Paste JSON here"
                                    className={`min-h-[200px] text-sm ${!isJsonValid ? "border-red-500" : ""}`}
                                    value={formData.data}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setFormData({ ...formData, data: value });
                                        try {
                                            JSON.parse(value);
                                            setIsJsonValid(true);
                                            //eslint-disable-next-line
                                        } catch (err) {
                                            setIsJsonValid(false);
                                        }
                                    }}
                                />
                                {!isJsonValid && <p className="text-red-500">Invalid JSON</p>}
                            </div>
                        )}

                        {editMode === "visual" && (
                            <div className="border rounded p-2">
                                {(() => {
                                    try {
                                        const parsed = JSON.parse(formData.data || "{}");
                                        return (
                                            <ReactJson
                                                src={parsed}
                                                onEdit={(edit) =>
                                                    setFormData({
                                                        ...formData,
                                                        data: JSON.stringify(edit.updated_src),
                                                    })
                                                }
                                                onAdd={(add) =>
                                                    setFormData({
                                                        ...formData,
                                                        data: JSON.stringify(add.updated_src),
                                                    })
                                                }
                                                onDelete={(del) =>
                                                    setFormData({
                                                        ...formData,
                                                        data: JSON.stringify(del.updated_src),
                                                    })
                                                }
                                                name={false}
                                                collapsed={false}
                                                enableClipboard={false}
                                                displayDataTypes={false}
                                                theme="rjv-default"
                                            />
                                        );
                                        //eslint-disable-next-line
                                    } catch (err) {
                                        return (
                                            <p className="text-red-500">
                                                Invalid JSON, cannot display
                                            </p>
                                        );
                                    }
                                })()}
                            </div>
                        )}

                        <Button type="submit">Submit</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default TemplatePage;
