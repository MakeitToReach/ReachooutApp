import React from "react";
import { Button } from "../ui/button";
// import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePortfolioStore } from "@/store/portfolio.store";
import { getUserTemplateData } from "@/api/user-template";
import { useRouter } from "next/navigation";
import { OnboardingPopup } from "./popups/onboardingPopup";
import { LucideEye } from "lucide-react";

interface TemplateCardProps {
    imageUrl: string;
    templateName?: string;
    previewUrl?: string;
    editorUrl: string;
    id?: string;
    isPublished?: boolean;
    textClassName?: string;
    className?: string;
    children?: React.ReactNode;
    onPreviewClick?: () => void; //TODO: remove this later, using temporarily
    showPreview?: boolean;
}
export const TemplateCard = ({
    imageUrl = "",
    previewUrl = "#",
    editorUrl = "#",
    isPublished = false,
    templateName = "",
    children,
    className,
    textClassName,
    onPreviewClick,
    showPreview,
    id,
}: TemplateCardProps) => {
    const router = useRouter();
    const { resetData } = usePortfolioStore();

    const handleEdit = async () => {
        const fetchedData = await getUserTemplateData(templateName);
        if (!fetchedData) router.push(`/`);

        if (fetchedData) {
            resetData(fetchedData.userTemplateData);
            router.push(editorUrl);
        }
    };
    return (
        <div
            className={cn(
                className,
                "relative border border-border rounded-xl overflow-hidden",
            )}
        >
            <Image
                src={imageUrl}
                alt="template"
                width={100}
                height={400}
                loading="lazy"
                loader={() => imageUrl}
                className="w-full object-contain object-top" //1280x720
            />
            <div className="px-4 py-2 flex justify-between items-center">
                <h3
                    className={cn("text-white capitalize font-semibold", textClassName)}
                >
                    {templateName}
                </h3>
                {showPreview && (
                    <OnboardingPopup templateId={id!} previewUrl={previewUrl} isPreview>
                        <Button
                            className="md:text-md cursor-pointer"
                            onClick={onPreviewClick}
                            variant={"link"}
                        >
                            <LucideEye />
                        </Button>
                    </OnboardingPopup>
                )}
                {isPublished ? (
                    <Button className="md:text-md cursor-pointer" onClick={handleEdit}>
                        Edit
                    </Button>
                ) : (
                    <>{children}</>
                )}
            </div>
        </div>
    );
};
