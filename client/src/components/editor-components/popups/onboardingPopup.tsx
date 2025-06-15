"use client";

import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { CategorySelect } from "../categorySelect";
import { getCategoriesByTemplateId } from "@/api/templates";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { usePortfolioStore } from "@/store/portfolio.store";
import { GenericTemplateSchema } from "@/schemas/templates.schema";
import { useRouter } from "next/navigation";
import { CategoryItem } from "@/types/category.types";

export const OnboardingPopup = ({
    children,
    templateId,
    previewUrl,
}: {
    children: React.ReactNode;
    templateId: string;
    previewUrl: string;
}) => {
    const { resetData } = usePortfolioStore();
    const router = useRouter();

    const [categoryData, setCategoryData] = useState<CategoryItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleDataChange = (data: GenericTemplateSchema) => {
        resetData(data);
        setIsOpen(false);
        router.push(previewUrl);
    };

    const fetchCategories = async () => {
        try {
            setIsLoading(true);
            const response = await getCategoriesByTemplateId(templateId);
            // console.log(response);
            setCategoryData(response.categories);
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

    return (
        <Dialog onOpenChange={(open) => setIsOpen(open)} defaultOpen={false}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-h-[80vh] flex flex-col gap-4">
                <DialogTitle className="text-2xl font-medium mb-2">
                    Choose your content Category
                </DialogTitle>

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

                <h1 className="self-center font-semibold text-xl">OR</h1>

                <Button onClick={() => alert("Coming soon")}>
                    Generate Content with AI{" "}
                    <span className="ml-2">
                        <Sparkles />
                    </span>
                </Button>
            </DialogContent>
        </Dialog>
    );
};
