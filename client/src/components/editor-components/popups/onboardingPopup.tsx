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
import { Loader2, Sparkles } from "lucide-react";
import { usePortfolioStore } from "@/store/portfolio.store";
import { GenericTemplateSchema } from "@/schemas/templates.schema";
import { useRouter } from "next/navigation";
import { CategoryItem } from "@/types/category.types";
import { Textarea } from "@/components/ui/textarea";
import { generateContent } from "@/api/genai";
import { promptPresets } from "@/static_data/prompt-presets";
import { motion, AnimatePresence } from "motion/react";

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
  const [selectedPreset, setSelectedPreset] = useState<string>();

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

  const handlePresetInject = (text: string) => {
    setAiForm((prev) => ({ ...prev, userInput: text }));
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
          <DialogTitle className="text-lg font-medium">
            {isAiMode ? (
              <div className="flex gap-2 items-center">
                <Sparkles className="text-gray-600" size={16} />
                <span>AI Content Generation</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span>Create Your Reachpage</span>
              </div>
            )}
          </DialogTitle>
          {isAiMode ? (
            <DialogDescription className="text-sm text-gray-500">
              The more detailed and specific you are, the better content will be
              generated.
            </DialogDescription>
          ) : (
            <DialogDescription className="text-sm text-gray-500">
              Choose how you'd like to create your portfolio content
            </DialogDescription>
          )}
        </DialogHeader>

        {!isPreview ? (
          <motion.div
            className="space-y-6"
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* AI Mode Section - Primary Option */}
            <motion.div
              className="border border-gray-200 rounded-lg p-4 space-y-4"
              layout
              transition={{ duration: 0.2 }}
            >
              <AnimatePresence mode="wait">
                {isAiMode ? (
                  <motion.div
                    className="space-y-4"
                    key="ai-form"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        Tell us about yourself, your services, and experience.
                      </Label>
                      <Textarea
                        placeholder="Describe yourself, your services, and your experience here..."
                        value={aiForm.userInput}
                        onChange={(e) =>
                          handleAiInputChange("userInput", e.target.value)
                        }
                        className="min-h-[100px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Quick Start Templates</Label>
                      <motion.div
                        className="flex flex-wrap gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.2 }}
                      >
                        {promptPresets.map((preset, index) => (
                          <motion.div
                            key={preset.label}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 + index * 0.05 }}
                          >
                            <Button
                              type="button"
                              variant={selectedPreset === preset.label ? "default" : "outline"}
                              className="rounded-full text-xs h-8"
                              onClick={() => {
                                if (selectedPreset === preset.label) {
                                  setSelectedPreset(undefined);
                                  setAiForm({ userInput: "" });
                                } else {
                                  setSelectedPreset(preset.label);
                                  handlePresetInject(preset.text);
                                }
                              }}
                            >
                              {preset.label}
                            </Button>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                    <motion.div
                      className="flex gap-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.2 }}
                    >
                      <Button
                        onClick={handleAiSubmit}
                        className="flex-1"
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
                      <Button
                        variant="outline"
                        onClick={() => setIsAiMode(false)}
                        className="px-4"
                      >
                        Back
                      </Button>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="ai-button"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="text-gray-600" size={16} />
                      <h3 className="text-base font-medium text-gray-900">AI Content Generation</h3>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        Recommended
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Let AI create personalized content for your portfolio.
                    </p>
                    <Button
                      onClick={() => setIsAiMode(true)}
                      className="w-full"
                    >
                      <Sparkles className="mr-2" size={16} />
                      Generate Content with AI
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Manual Category Selection - Secondary Option - Only show when not in AI mode */}
            <AnimatePresence>
              {!isAiMode && (
                <motion.div
                  className="border-t pt-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-700">Or choose from content templates</h3>
                    <span className="text-xs text-gray-500">Manual</span>
                  </div>

                  {isLoading ? (
                    <div className="flex justify-center items-center h-20">
                      <Loader2 className="animate-spin" />
                      <span className="ml-2 text-sm">Loading templates...</span>
                    </div>
                  ) : (
                    <CategorySelect
                      categoryItems={categoryData}
                      placeholder="Select ready content"
                      onChange={(data, category) =>
                        handleDataChange(data, category)
                      }
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <>
            {isLoading ? (
              <div className="flex justify-center items-center h-20">
                <Loader2 className="animate-spin" />
                <span className="ml-2">Loading templates...</span>
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
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
