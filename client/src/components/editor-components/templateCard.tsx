import React, { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePortfolioStore } from "@/store/portfolio.store";
import { getProjectTemplateInstanceData } from "@/api/user-template";
import { useRouter } from "next/navigation";
import { OnboardingPopup } from "./popups/onboardingPopup";
import { Edit, ExternalLink, LucideEye, QrCode, Settings, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { deleteTemplateInstanceByOrder } from "@/api/templates";
import { toast } from "sonner";
import { TemplateItem } from "@/types/projectTemplate.types";
import QRCodeModal from "./QRCodeModal";

interface TemplateCardProps {
  imageUrl: string;
  templateName?: string;
  previewUrl?: string;
  editorUrl: string;
  isPublished?: boolean;
  textClassName?: string;
  className?: string;
  children?: React.ReactNode;
  onPreviewClick?: () => void; //TODO: remove this later, using temporarily
  onDelete?: (templates: TemplateItem[]) => void;
  showPreview?: boolean;
  templateId: string;
  index?: number;
  projectId?: string;
  slug?: string;
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
  templateId,
  projectId,
  index,
  slug,
  onDelete,
}: TemplateCardProps) => {
  const router = useRouter();
  const { resetData } = usePortfolioStore();
  const [qrOpen, setQROpen] = useState(false);

  const handleEdit = async () => {
    const fetchedData = await getProjectTemplateInstanceData(
      templateId,
      projectId!,
      index || 0
    );
    if (!fetchedData) router.push(`/`);

    if (fetchedData) {
      resetData(fetchedData.template.data);
      router.push(editorUrl);
    }
  };

  const isMobile = useIsMobile();

  const handleDelete = async () => {
    if (!projectId) {
      toast.error("Project ID is missing");
      return;
    }
    if (slug === null) {
      toast.error("You cannot delete the default website");
      return;
    }
    if (!slug) {
      toast.error("Slug is missing");
      return;
    }
    const newTemplates = await deleteTemplateInstanceByOrder(projectId, slug);
    if (newTemplates) {
      onDelete?.(newTemplates.templates);
    }
  };
  return (
    <div
      className={cn(
        className,
        "relative border border-border rounded-xl overflow-hidden"
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
          <OnboardingPopup
            templateId={templateId}
            previewUrl={previewUrl}
            isPreview
          >
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div
                role="button"
                className="cursor-pointer"
                title="More Settings"
                onClick={(e) => e.stopPropagation()}
              >
                <Settings className="text-muted-foreground hover:text-primary" />
                <span className="sr-only">More</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-48"
              side={isMobile ? "bottom" : "right"}
              align={isMobile ? "end" : "start"}
              onClick={(e) => e.stopPropagation()}
            >
              <a href={previewUrl} target="_blank">
                <DropdownMenuItem>
                  <ExternalLink className="text-muted-foreground" />
                  <span>View Website</span>
                </DropdownMenuItem>
              </a>
              <DropdownMenuItem onClick={handleEdit}>
                <Edit className="text-muted-foreground" />
                <span>Edit Website</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setQROpen(true)}>
                <QrCode className="text-muted-foreground" />
                <span>View QR Code</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleDelete}>
                <Trash2 className="text-destructive" />
                <span>Delete Website</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>{children}</>
        )}
      </div>
      <QRCodeModal
        open={qrOpen}
        onClose={() => setQROpen(false)}
        value={previewUrl}
      />
    </div>
  );
};
