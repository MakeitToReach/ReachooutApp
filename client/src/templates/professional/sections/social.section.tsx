import { PFSocialCard } from "@/components/template-components/professional/socialCard";
import React from "react";
import { PF_SOCIAL_SECTION } from "../types/social.types";

export const PFSocialSection = ({
    socials,
    heading,
    subHeading,
}: PF_SOCIAL_SECTION) => {
    return (
        <section className="py-20" id="socials">
        <div className="relative">
            <div className="absolute z-0 w-[80%] h-[110%] right-0 -top-6 md:top-0 bg-template-accent-primary rounded-md"></div>
            <div className="max-w-6xl mx-auto px-4 text-template-text-accent-primary">
                <div className="z-10 relative flex flex-col gap-6 md:gap-10 md:p-20">
                    <h1 className="text-4xl font-semibold md:text-6xl">{heading}</h1>
                    <h3 className="text-xl text-template-text-accent-primary/60">
                        {subHeading}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {socials
                            .filter((social) => social.btnLink)
                            .map((social, idx) => (
                                <PFSocialCard
                                    key={idx}
                                    title={social.title}
                                    btnLink={social.btnLink}
                                    followerCounts={social.followerCounts}
                                />
                            ))}
                        </div>
                </div>
                </div>
            </div>
        </section>
    );
};
