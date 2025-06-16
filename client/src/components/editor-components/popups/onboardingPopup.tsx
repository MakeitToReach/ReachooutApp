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
import { Textarea } from "@/components/ui/textarea";
import { generateContent } from "@/api/genai";

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
  const [defaultCategoryData, setDefaultCategoryData] =
    useState<GenericTemplateSchema>({} as GenericTemplateSchema);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAiMode, setIsAiMode] = useState(false);

  const [aiForm, setAiForm] = useState({
    about: "",
    projects: "",
    testimonials: "",
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
      "About: " +
      aiForm.about +
      " Projects/Services: " +
      aiForm.projects +
      " Testimonials: " +
      aiForm.testimonials;
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
        <DialogTitle className="text-2xl font-medium mb-2">
          {isAiMode ? "Generate with AI" : "Choose your content Category"}
        </DialogTitle>

        {isAiMode ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-base">Tell us about yourself</Label>
              <Textarea
                placeholder="Write about yourself here..."
                value={aiForm.about}
                onChange={(e) => handleAiInputChange("about", e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-base">
                Tell us about your projects/services
              </Label>
              <Textarea
                placeholder="Describe your projects or services..."
                value={aiForm.projects}
                onChange={(e) =>
                  handleAiInputChange("projects", e.target.value)
                }
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-base">Share any testimonials</Label>
              <Textarea
                placeholder="Include any client testimonials or feedback..."
                value={aiForm.testimonials}
                onChange={(e) =>
                  handleAiInputChange("testimonials", e.target.value)
                }
                className="min-h-[100px]"
              />
            </div>

            <Button onClick={handleAiSubmit} className="w-full" disabled={isLoading}>
              {isLoading ? "Generating..." : "Generate Content"}
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

            <h1 className="self-center font-semibold text-xl">OR</h1>

            <Button onClick={() => setIsAiMode(true)}>
              Generate Content with AI{" "}
              <span className="ml-2">
                <Sparkles />
              </span>
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
