"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Save, Eye, X } from "lucide-react";
import { createTemplate } from "@/api/admin";
import { ReqInput } from "@/components/editor-components/inputs/reqInput";

const CreateTemplatePage = () => {
    const [formData, setFormData] = useState({
        templateName: "",
        thumbnailUrl: "",
        category: "",
        data: "",
        tags: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const handleReset = () => {
        setFormData({
            templateName: "",
            thumbnailUrl: "",
            category: "",
            data: "",
            tags: "",
        });
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        const tags = formData.tags.split(",").map((tag) => tag.trim());
        try {
            await createTemplate(
                formData.templateName,
                formData.data,
                formData.thumbnailUrl,
                formData.category,
                tags
            );
            // handleReset();
        } catch (error) {
            console.error("Error creating template:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="border-b pb-4">
                <h1 className="text-3xl font-bold text-gray-900">Create Template</h1>
                <p className="text-gray-600 mt-2">
                    Design and configure a new template for your dashboard
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Form Section */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                Template Details
                            </CardTitle>
                            <CardDescription>
                                Fill in the information below to create your new template
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <ReqInput
                                    isRequired
                                    label="Template Name"
                                    id="templateName"
                                    placeholder="Enter template name"
                                    value={formData.templateName}
                                    onChange={(e) =>
                                        setFormData({ ...formData, templateName: e.target.value })
                                    }
                                />

                                <ReqInput
                                    label="Thumbnail URL"
                                    id="templateName"
                                    placeholder="Enter thumbnail URL"
                                    value={formData.thumbnailUrl}
                                    onChange={(e) =>
                                        setFormData({ ...formData, thumbnailUrl: e.target.value })
                                    }
                                />

                                <ReqInput
                                    label="Category"
                                    id="category"
                                    placeholder="Freelance"
                                    value={formData.category}
                                    onChange={(e) =>
                                        setFormData({ ...formData, category: e.target.value })
                                    }
                                />

                                <ReqInput
                                    subtitle="Comma separated"
                                    label="Template Tags"
                                    id="tags"
                                    placeholder="Featured, Professional, Developer"
                                    value={formData.tags}
                                    onChange={(e) =>
                                        setFormData({ ...formData, tags: e.target.value })
                                    }
                                />

                                {/* Template Data */}
                                <div className="space-y-2">
                                    <Label htmlFor="data" className="text-sm font-medium">
                                        Template Data *
                                    </Label>
                                    <Textarea
                                        id="data"
                                        placeholder="Enter template data (JSON only)"
                                        value={formData.data}
                                        onChange={(e) =>
                                            setFormData({ ...formData, data: e.target.value })
                                        }
                                        className={`min-h-[200px] font-mono text-sm`}
                                    />
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3 pt-4">
                                    <Button
                                        type="submit"
                                        onClick={handleSubmit}
                                        disabled={isLoading}
                                        className="flex-1 sm:flex-none"
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Creating...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-4 h-4 mr-2" />
                                                Create Template
                                            </>
                                        )}
                                    </Button>

                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setShowPreview(!showPreview)}
                                        className="flex-1 sm:flex-none"
                                    >
                                        <Eye className="w-4 h-4 mr-2" />
                                        {showPreview ? "Hide Preview" : "Preview"}
                                    </Button>

                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={handleReset}
                                        className="flex-1 sm:flex-none"
                                    >
                                        <X className="w-4 h-4 mr-2" />
                                        Reset
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Preview/Info Section */}
                <div className="space-y-6">
                    {/* Quick Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Template Info</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="text-sm">
                                <span className="font-medium text-gray-700">Status:</span>
                                <span className="ml-2 text-gray-600">Draft</span>
                            </div>
                            <div className="text-sm">
                                <span className="font-medium text-gray-700">Fields:</span>
                                <span className="ml-2 text-gray-600">
                                    {Object.values(formData).filter((v) => v.trim()).length}/3
                                    completed
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Preview */}
                    {showPreview && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Preview</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {formData.templateName && (
                                    <div>
                                        <Label className="text-xs text-gray-500">
                                            Template Name
                                        </Label>
                                        <p className="font-medium">{formData.templateName}</p>
                                    </div>
                                )}

                                {formData.thumbnailUrl && (
                                    <div>
                                        <Label className="text-xs text-gray-500">Thumbnail</Label>
                                        <div className="mt-1 border rounded-lg overflow-hidden">
                                            <img
                                                src={formData.thumbnailUrl}
                                                alt="Template thumbnail"
                                                className="w-full h-32 object-cover"
                                            />
                                        </div>
                                    </div>
                                )}

                                {formData.data && (
                                    <div>
                                        <Label className="text-xs text-gray-500">
                                            Data Preview
                                        </Label>
                                        <div className="mt-1 bg-gray-50 rounded border p-3 text-xs font-mono max-h-32 overflow-y-auto">
                                            {formData.data.substring(0, 200)}
                                            {formData.data.length > 200 && "..."}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {/* Tips */}
                    <Alert>
                        <AlertDescription className="text-sm">
                            <strong>Tips:</strong> Use the preview to verify your thumbnail
                            URL loads correctly. Template data can be JSON, HTML, or any
                            configuration format your system supports.
                        </AlertDescription>
                    </Alert>
                </div>
            </div>
        </div>
    );
};

export default CreateTemplatePage;
