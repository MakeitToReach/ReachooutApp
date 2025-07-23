import { PFWorkCarousel } from "@/components/template-components/professional/workCarousel";
import React from "react";
import { PF_WORK_SECTION } from "../types/workSection";

export const PFWorkSection = ({ projects, heading }: PF_WORK_SECTION) => {
  return (
    <section
      id="projects"
      className="bg-template-secondary overflow-x-hidden py-10 text-template-text-secondary"
    >
      <div className="max-w-6xl mx-auto flex flex-col justify-center items-center px-4">
        <h1 className="text-center font-semibold text-4xl sm:text-6xl p-4 mb-4">
          {heading}
        </h1>
        <PFWorkCarousel Projects={projects} />
      </div>
    </section>
  );
};
