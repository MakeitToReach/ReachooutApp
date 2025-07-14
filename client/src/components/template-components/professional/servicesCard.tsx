import { getIconFromRegistry } from "@/lib/utils";
import React from "react";

interface ServicesCardProps {
    icon: string;
    heading: string;
    description: string;
}
export const ServicesCard = ({
    icon,
    heading,
    description,
}: ServicesCardProps) => {
    return (
        <div className="flex flex-col p-6 gap-3 text-center items-center justify-center border border-template-accent-primary shadow-xs shadow-template-text-primary rounded-md">
            <span>{getIconFromRegistry(icon)}</span>
            <h1 className="text-lg font-semibold">{heading}</h1>
            <div
                className="
    prose prose-sm max-w-none text-template-text-primary
    prose-p:text-template-text-primary
    prose-strong:text-template-text-primary
    prose-h1:text-template-text-primary
    prose-h2:text-template-text-primary
    prose-h3:text-template-text-primary
    prose-h4:text-template-text-primary
    prose-h5:text-template-text-primary
    prose-h6:text-template-text-primary
  "
                dangerouslySetInnerHTML={{ __html: description }}
            />
        </div>
    );
};
