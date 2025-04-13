import { PFSocialCard } from "@/components/template-components/professional/socialCard";
import React from "react";
import { PF_SOCIAL_SECTION } from "../types/socialSection";

export const PFSocialSection = ({ socials }: PF_SOCIAL_SECTION) => {
    return (
        <section className="relative">
            <div className="absolute z-0 w-[80%] h-[110%] right-0 -top-6 md:top-0 bg-blue-100 rounded-md"></div>
            <div className="max-w-6xl mx-auto px-4">
                <div className="z-10 relative flex flex-col gap-6 md:gap-10 md:p-20">
                    <h1 className="text-4xl font-semibold md:text-6xl">My Socials</h1>
                    <h3 className="text-xl text-neutral-400">Get latest updates</h3>
                    <div className="flex flex-col md:flex-row gap-4 md:gap-10">
                        {socials.map((social, idx) => (
                            <PFSocialCard
                                key={idx}
                                title={social.title}
                                socialLink={social.socialLink}
                                followerCounts={social.followerCounts}
                                icon={social.icon}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
