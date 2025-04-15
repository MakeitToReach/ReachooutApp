import React from "react";
import { DEV_PROJECT_SECTION } from "../types/projectSection.types";
import { ProjectCard } from "@/components/template-components/dev/projectCard";

export const DevProjectSection = ({ projects }: DEV_PROJECT_SECTION) => {
    return (
        <section>
            <h2 className="font-semibold text-lg mb-4">Projects</h2>
            <div className="space-y-4">
                {projects.map((project, i) => (
                    <ProjectCard key={i} {...project} />
                ))}
            </div>
        </section>
    );
};
