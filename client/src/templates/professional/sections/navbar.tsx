import { Button } from "@/components/ui/button";
import { LucideMenu } from "lucide-react";
import React from "react";
import { PF_NAVBAR_SECTION } from "../types/navbarSection";

export const PFNavbar = ({ logoUrl, textLogo }: PF_NAVBAR_SECTION) => {
    return (
        <nav className="bg-template-primary backdrop-blur-md sticky top-0 left-0 z-50">
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

                <Button variant={"ghost"}>
                    <LucideMenu className="text-template-text-primary size-[24px]" />
                </Button>
            </div>
        </nav>
    );
};
