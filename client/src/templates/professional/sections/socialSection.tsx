import { PFSocialCard } from "@/components/template-components/professional/socialCard";
import React from "react";

export const PFSocialSection = () => {
    return (
        <section className="relative">
            <div className="absolute z-0 w-[80%] h-[110%] right-0 top-0 bg-blue-100 rounded-md"></div>
            <div className="max-w-6xl mx-auto px-4">
                <div className="z-10 relative flex flex-col gap-6 md:p-10">
                    <h1 className="text-3xl font-semibold md:text-6xl">My Socials</h1>
                    <h3 className="text-xl">Get latest updates</h3>
                    <div className="flex flex-col md:flex-row gap-4">
                        <PFSocialCard />
                        <PFSocialCard />
                        <PFSocialCard />
                    </div>
                </div>
            </div>
        </section>
    );
};
