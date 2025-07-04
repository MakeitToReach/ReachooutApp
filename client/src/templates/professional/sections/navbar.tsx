import { LucideMenu } from "lucide-react";
import React from "react";
import { PF_NAVBAR_SECTION } from "../types/navbarSection";
import { scrollToSection } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";

export const PFNavbar = ({
    logoUrl,
    textLogo,
    sections,
}: PF_NAVBAR_SECTION) => {
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
            className="bg-template-primary backdrop-blur-md sticky w-full top-0 left-0 z-50"
        >
            <div className="max-w-6xl mx-auto h-16 px-4 flex justify-between items-center">
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
                            className="text-template-text-primary hover:underline cursor-pointer capitalize"
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
