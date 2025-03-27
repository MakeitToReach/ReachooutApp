import { PFSocialCard } from "@/components/template-components/professional/socialCard";
import React from "react";

export const PFSocialSection = () => {
  return (
    <section className="relative px-4 md:px-[20%]">
      <span className="absolute z-0 w-[80%] h-[110%] right-0 top-0 bg-blue-100"></span>
      <div className="z-10 relative flex flex-col gap-6">
        <h1 className="text-3xl font-semibold">My Socials</h1>
        <h3>Get latest updates</h3>
        <PFSocialCard />
        <PFSocialCard />
        <PFSocialCard />
      </div>
    </section>
  );
};
