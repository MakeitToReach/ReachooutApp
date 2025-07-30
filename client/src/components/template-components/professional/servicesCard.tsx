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
        <div className="flex flex-col p-6 gap-3 text-center items-center justify-center rounded-sm bg-template-primary text-template-secondary">
            <span>
                {getIconFromRegistry(icon, {
                    className: "sm:size-20 size-16 text-template-text-primary",
                })}
            </span>
            <h1 className="text-2xl font-semibold text-template-text-primary">{heading}</h1>
            <div
                className="
    prose prose-xl sm:prose-lg max-w-none text-template-text-primary
    prose-p:text-template-text-primary
    prose-strong:text-template-text-primary
    prose-h1:text-template-text-primary
    prose-h2:text-template-text-primary
    prose-h3:text-template-text-primary
    prose-h4:text-template-text-primary
    prose-h5:text-template-text-primary
    prose-h6:text-template-text-primary
    line-clamp-6
  "
                dangerouslySetInnerHTML={{ __html: description }}
            />
        </div>
    );
};
