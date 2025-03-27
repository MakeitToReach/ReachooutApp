import { PFWorkCarousel } from "@/components/template-components/professional/workCarousel";
import React from "react";

export const PFWorkSection = () => {
  return (
    <section className="bg-zinc-900 w-full text-white">
      <div className="md:px-[20%]">
        <h1 className="text-center font-semibold text-4xl p-4">My Work</h1>
        <PFWorkCarousel />
      </div>
    </section>
  );
};
