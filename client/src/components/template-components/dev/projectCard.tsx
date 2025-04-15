import { ExternalLink } from "lucide-react";
import React from "react";

interface ProjectCardProps {
    title: string;
    desc: string;
    tech: string;
    projectImg: string;
}
export const ProjectCard = ({ title, desc, tech, projectImg }: ProjectCardProps) => {
    return (
        <div className="flex gap-4 bg-white/5 p-4 rounded-lg items-start backdrop-blur-sm">
            <img
                src={projectImg}
                alt={title}
                className="w-32 h-20 object-cover rounded-md"
            />
            <div className="flex-1">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold">{title}</h3>
                    <a href="#" target="_blank" rel="noreferrer">
                        <ExternalLink className="w-4 h-4 text-white/50 hover:text-white" />
                    </a>
                </div>
                <p className="text-sm text-gray-300">{desc}</p>
                <p className="text-xs text-gray-400 mt-1">Tech Used – {tech}</p>
            </div>
        </div>
    );
};
