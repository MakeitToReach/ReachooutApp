import { Avatar, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { ClientLogos } from "@/components/template-components/professional/clientLogos";
import { PF_CLIENT_SECTION } from "../types/clientSection";

export const PFClientSection: React.FC<PF_CLIENT_SECTION> = ({
    avatarImg,
    title,
    colorTxt,
    clientImgs,
    subtitle,
    startText,
}) => {
    return (
        <section className="px-4 max-w-6xl mx-auto py-20" id="client">
            <div className="flex flex-col gap-4">
                <Avatar className="size-[80px]">
                    <AvatarImage src={avatarImg} />
                    {/* <AvatarFallback>CN</AvatarFallback> */}
                </Avatar>
                <h1 className="font-semibold text-4xl sm:text-6xl text-template-text-primary">
                    {startText}{" "}
                    <span className="text-template-text-accent-tertiary">{colorTxt}</span>{" "}
                    {title}
                </h1>
                {subtitle && (
                    <h3 className="text-xl sm:text-2xl text-template-text-primary opacity-50">{subtitle}</h3>
                )}
            </div>
            <div className="relative mt-20 sm:mt-30">
                <ClientLogos clientImgs={clientImgs} />
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-template-primary"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-template-primary"></div>
            </div>
        </section>
    );
};
