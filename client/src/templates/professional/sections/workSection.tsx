import { PFWorkCarousel } from "@/components/template-components/professional/workCarousel";
import React from "react";
import { PF_WORK_SECTION } from "../types/workSection";
import { motion as m } from "motion/react";

const delay = 0.15;

export const PFWorkSection = ({ projects, heading }: PF_WORK_SECTION) => {
  return (
    <section
      id="projects"
      className="bg-template-secondary overflow-x-hidden py-10 text-template-text-secondary"
    >
      <div className="max-w-6xl mx-auto flex flex-col justify-center items-center px-4">
        <m.h1
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.5,
            delay: delay,
            ease: "easeOut",
          }}
          viewport={{ amount: 1, once: true }}
          className="text-center font-semibold text-4xl sm:text-6xl p-4 mb-4"
        >
          {heading}
        </m.h1>
        <PFWorkCarousel Projects={projects} />
      </div>
    </section>
  );
};
