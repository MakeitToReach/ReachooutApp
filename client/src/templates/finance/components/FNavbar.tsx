import { LucideMenu } from "lucide-react";
import React from "react";
import { F_NAVBAR_SECTION } from "../types/navbar.types";
import { scrollToSection } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";
import { FButton } from "./FButton";

export const FNavbar = ({
    logoUrl,
    textLogo,
    sections,
    btnText,
    btnLink,
}: F_NAVBAR_SECTION) => {
    const visibleSections = sections.slice(2, 6);
    const overflowSections = sections.slice(6, sections.length - 2);
    const isMobile = useIsMobile();

    const handleSelectChange = (value: string) => {
        if (value) {
            scrollToSection(value);
        }
    };

    return (
        <nav
            id="navbar"
            className="bg-template-primary backdrop-blur-md px-2 sm:px-8"
        >
            <div className="h-16 px-4 flex justify-between items-center">
                {textLogo && (
                    <h1 className="font-semibold text-xl text-template-text-primary">
                        {textLogo}
                    </h1>
                )}

                {logoUrl && (
                    <img
                        src={logoUrl}
                        alt="logo"
                        className="md:size-16 size-12 object-contain my-2"
                    />
                )}

                <div className="hidden space-x-4 md:flex items-center">
                    {visibleSections.map((section) => (
                        <button
                            key={section.name}
                            className="text-template-text-primary hover:underline cursor-pointer capitalize font-semibold"
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection(section.href);
                            }}
                        >
                            {section.name}
                        </button>
                    ))}

                    {overflowSections.length > 0 && (
                        <Select onValueChange={handleSelectChange}>
                            <SelectTrigger className="w-fit px-3 py-1 text-template-text-primary shadow-none bg-transparent border-none hover:underline">
                                <span>More</span>
                            </SelectTrigger>
                            <SelectContent>
                                {overflowSections.map((section) => (
                                    <SelectItem
                                        key={section.name}
                                        value={section.href}
                                        className="capitalize"
                                    >
                                        {section.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                </div>

                {!isMobile && (
                    <a href={btnLink} target="_blank" rel="noopener noreferrer">
                        <FButton btnText={btnText} />
                    </a>
                )}
                {/* Mobile Menu Button */}

                {isMobile && (
                    <Select onValueChange={handleSelectChange}>
                        <SelectTrigger
                            showIcon={false}
                            className="w-fit px-3 py-1 text-template-text-primary shadow-none bg-transparent border-none hover:underline flex items-center gap-1 [&>[data-slot='icon']]:hidden"
                        >
                            <LucideMenu size={20} />
                        </SelectTrigger>
                        <SelectContent>
                            {sections.slice(2, sections.length - 2).map((section) => (
                                <SelectItem
                                    key={section.name}
                                    value={section.href}
                                    className="capitalize"
                                >
                                    {section.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            </div>
        </nav>
    );
}; 