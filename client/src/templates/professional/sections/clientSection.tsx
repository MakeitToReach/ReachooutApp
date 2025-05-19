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
}) => {
    return (
        <section className="px-4 max-w-6xl mx-auto md:my-40" id="client">
            <div className="flex flex-col gap-4">
                <Avatar className="size-[80px]">
                    <AvatarImage src={avatarImg} />
                    {/* <AvatarFallback>CN</AvatarFallback> */}
                </Avatar>
                <h1 className="font-semibold text-3xl md:text-6xl text-template-text-primary">
                    Worked with{" "}
                    <span className="text-template-text-accent-tertiary">{colorTxt}</span>{" "}
                    {title}
                </h1>
                {subtitle && (
                    <h3 className="md:text-2xl text-template-text-primary">{subtitle}</h3>
                )}
            </div>
            <div className="relative mt-20 md:mt-40">
                <ClientLogos clientImgs={clientImgs} />
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-template-primary"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-template-primary"></div>
            </div>
        </section>
    );
};
