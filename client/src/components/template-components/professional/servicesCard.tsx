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
        <div className="flex flex-col p-6 gap-3 text-center items-center justify-center border border-template-accent-primary rounded-md">
            <span>{getIconFromRegistry(icon)}</span>
            <h1 className="text-lg font-semibold">{heading}</h1>
            <p className="text-md">{description}</p>
        </div>
    );
};
