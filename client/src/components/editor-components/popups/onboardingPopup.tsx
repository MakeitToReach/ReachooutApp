"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { CategorySelect } from "../categorySelect";
import { getCategoriesByTemplateId } from "@/api/templates";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { InfoIcon, Loader2, Sparkles } from "lucide-react";
import { usePortfolioStore } from "@/store/portfolio.store";
import { GenericTemplateSchema } from "@/schemas/templates.schema";
import { useRouter } from "next/navigation";
import { CategoryItem } from "@/types/category.types";
import { Textarea } from "@/components/ui/textarea";
import { generateContent } from "@/api/genai";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export const OnboardingPopup = ({
    children,
    templateId,
    previewUrl,
    isPreview,
}: {
    children: React.ReactNode;
    templateId: string;
    previewUrl: string;
    isPreview?: boolean;
}) => {
    const { resetData } = usePortfolioStore();
    const router = useRouter();

    const [categoryData, setCategoryData] = useState<CategoryItem[]>([]);
    const [defaultCategoryData, setDefaultCategoryData] =
        useState<GenericTemplateSchema>({} as GenericTemplateSchema);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isAiMode, setIsAiMode] = useState(false);

    const [aiForm, setAiForm] = useState({
        services: "",
        about: "",
        projects: "",
    });

    const handleDataChange = (data: GenericTemplateSchema) => {
        resetData(data);
        setIsOpen(false);
        router.push(previewUrl);
    };

    const fetchCategories = async () => {
        try {
            setIsLoading(true);
            const response = await getCategoriesByTemplateId(templateId);
            setCategoryData(response.categories);
            if (response.categories.length > 0) {
                const defaultCategory = response.categories.find(
                    (category: CategoryItem) => category.category === "Default",
                );
                // console.log("default category data", defaultCategory.data);
                setDefaultCategoryData(defaultCategory.data);
            }
        } catch (error) {
            console.error("Failed to fetch categories", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen && categoryData.length === 0) {
            fetchCategories();
        }
    }, [isOpen]);

    const handleAiInputChange = (field: string, value: string) => {
        setAiForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleAiSubmit = async () => {
        setIsLoading(true);
        const completeInput =
            "Services: " +
            aiForm.services +
            "About: " +
            aiForm.about +
            "Projects: " +
            aiForm.projects;
        // console.log("Complete Input:", completeInput);
        const response = await generateContent(completeInput, defaultCategoryData);

        if (response) {
            resetData(response.result);
            setIsLoading(false);
            setIsOpen(false);
            router.push(previewUrl);
        }
    };

    return (
        <Dialog onOpenChange={(open) => setIsOpen(open)} defaultOpen={false}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-h-[80vh] flex flex-col gap-4 overflow-y-auto">
                <DialogHeader className="text-left mb-2">
                    <DialogTitle className="md:text-2xl text-xl font-medium flex gap-1">
                        {isAiMode ? (
                            <div className="flex gap-1">
                                <h1>Generate Content</h1>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <InfoIcon size={14} />
                                    </TooltipTrigger>
                                    <TooltipContent className="text-sm w-[200px]">
                                        <p>
                                            The AI will fallback to default content if it cannot
                                            extract the required information from your answers
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        ) : (
                            "Choose your content Category"
                        )}
                    </DialogTitle>
                    {isAiMode && (
                        <DialogDescription className="text-xs">
                            The more detailed and specific you are, the better content will be
                            generated.
                        </DialogDescription>
                    )}
                </DialogHeader>

                {isAiMode && !isPreview ? (
                    <div className="space-y-10">
                        <div className="space-y-2">
                            <Label className="text-base">
                                Tell us about the services/products you offer. What do you
                                provide? Who is it for? What makes it valuable?
                            </Label>
                            <Textarea
                                placeholder="Write about your services here..."
                                value={aiForm.services}
                                onChange={(e) =>
                                    handleAiInputChange("services", e.target.value)
                                }
                                className="min-h-[100px]"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-base">
                                Why should someone trust or choose you? Share any results,
                                experience, or unique approach that sets you apart.
                            </Label>
                            <Textarea
                                placeholder="Write about yourself and your experiences here..."
                                value={aiForm.about}
                                onChange={(e) => handleAiInputChange("about", e.target.value)}
                                className="min-h-[100px]"
                            />
                            <p className="text-xs text-gray-500">
                                Include your name, role, and any relevant experience.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-base">
                                Can you share examples of your past work, projects or client
                                results that show what you do best?
                            </Label>
                            <Textarea
                                placeholder="Write about your projects here..."
                                value={aiForm.projects}
                                onChange={(e) =>
                                    handleAiInputChange("projects", e.target.value)
                                }
                                className="min-h-[100px]"
                            />
                        </div>

                        <Button
                            onClick={handleAiSubmit}
                            className="w-full"
                            disabled={isLoading}
                        >
                            {/* {isLoading ? "Generating..." : "Generate Content"} */}
                            {isLoading ? (
                                <p className="flex items-center gap-2">
                                    Generating..{" "}
                                    <span>
                                        <Loader2 className="animate-spin" />
                                    </span>
                                </p>
                            ) : (
                                "Generate Content"
                            )}
                        </Button>
                    </div>
                ) : (
                    <>
                        {isLoading ? (
                            <div className="flex justify-center items-center h-20">
                                Loading...
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <Label className="text-base">Category</Label>
                                <CategorySelect
                                    categoryItems={categoryData}
                                    placeholder="Select an option"
                                    onChange={(data) => handleDataChange(data)}
                                />
                            </div>
                        )}

                        {!isPreview && (
                            <>
                                <h1 className="self-center font-semibold text-xl">OR</h1>

                                <Button onClick={() => setIsAiMode(true)}>
                                    Generate Content with AI{" "}
                                    <span className="ml-2">
                                        <Sparkles />
                                    </span>
                                </Button>
                            </>
                        )}
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
};
