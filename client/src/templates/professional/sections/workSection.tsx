import { PFWorkCarousel } from "@/components/template-components/professional/workCarousel";
import { PF_STATIC_PROJECTS } from "@/static_data/professional/projects";
import React from "react";

export const PFWorkSection = () => {
    return (
        <section className="bg-blue-900 overflow-x-hidden py-10 text-white">
            <div className="max-w-6xl mx-auto flex flex-col justify-center items-center">
                <h1 className="text-center font-semibold text-4xl p-4">My Work</h1>
                <PFWorkCarousel Projects={PF_STATIC_PROJECTS} />
            </div>
        </section>
    );
};
