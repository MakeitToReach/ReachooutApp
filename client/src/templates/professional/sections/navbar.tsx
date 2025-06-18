import { Button } from "@/components/ui/button";
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

export const PFNavbar = ({
    logoUrl,
    textLogo,
    sections,
}: PF_NAVBAR_SECTION) => {
    const visibleSections = sections.slice(2, 6); // Sections 2, 3, 4, 5
    const overflowSections = sections.slice(6, sections.length - 2); // Sections 6+

    const handleSelectChange = (value: string) => {
        if (value) {
            scrollToSection(value); // You can adjust the scroll speed here
        }
    };

    return (
        <nav
            id="navbar"
            className="bg-template-primary backdrop-blur-md sticky top-0 left-0 z-50"
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
                                    <SelectItem key={section.name} value={section.href} className="capitalize">
                                        {section.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}

                    {/* Mobile Menu Button */}
                    <Button variant="default" className="md:hidden block">
                        <LucideMenu className="text-template-text-primary size-[24px]" />
                    </Button>
                </div>
            </div>
        </nav>
    );
};
