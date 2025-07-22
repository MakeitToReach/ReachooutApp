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
    userInput: "",
  });

  const handleDataChange = (data: GenericTemplateSchema, category?: string) => {
    if (isPreview) {
      //   router.push(
      //     `${previewUrl}?category=${
      //       category ? category : "Default"
      //     }&tid=${templateId}`
      //   );
      router.push(`${previewUrl}?tid=${templateId}&category=${category}`);
      return;
    }
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
          (category: CategoryItem) => category.category === "Default"
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
    const completeInput = aiForm.userInput;
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
                Tell us about yourself, your services, and any relevant experience or projects. 
              </Label>
              <Textarea
                placeholder="Describe yourself, your services, and your experience here..."
                value={aiForm.userInput}
                onChange={(e) => handleAiInputChange("userInput", e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <Button
              onClick={handleAiSubmit}
              className="w-full"
              disabled={isLoading}
            >
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
                  onChange={(data, category) =>
                    handleDataChange(data, category)
                  }
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
