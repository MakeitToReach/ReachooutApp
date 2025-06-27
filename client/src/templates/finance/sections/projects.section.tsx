import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { F_PROJECTS_SECTION } from "../types/projects.types";
import { FProjectCard } from "../components/FProjectCard";
import {  ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export const FProjectsSection = ({
    title,
    subtitle,
    projects,
}: F_PROJECTS_SECTION) => {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = Array.from(
        new Set(projects.map((project) => project.category)),
    );

    const filteredProjects =
        selectedCategory === "All"
            ? projects
            : projects.filter((projects) => projects.category === selectedCategory);

    return (
        <section className="w-full rounded-lg overflow-hidden my-14 sm:px-6 py-4">
            <div className="max-w-6xl mx-auto h-full my-10 space-y-8 overflow-x-visible">
                <h2 className="font-semibold sm:text-5xl text-3xl tracking-tight text-center">
                    {title}
                </h2>
                <p className="text-center line-clamp-4">{subtitle}</p>
            </div>
            <div className="bg-template-secondary sm:w-[100vw] px-4 rounded-xl">
                <div className="max-w-6xl mx-auto py-10 overflow-x-visible">
                    <div className="flex flex-wrap justify-start gap-3 mb-12">
                        {categories.map((category) => (
                            <Badge
                                key={category}
                                variant={selectedCategory === category ? "default" : "outline"}
                                className={`cursor-pointer px-4 py-2 text-sm font-medium transition-all duration-200 ${selectedCategory === category
                                        ? "bg-white text-slate-800 hover:bg-gray-100"
                                        : "border-white/30 text-white hover:bg-white/10 hover:border-white/50"
                                    }`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </Badge>
                        ))}
                    </div>
                    <div className="relative">
                        <Carousel
                            opts={{
                                align: "start",
                                loop: true,
                            }}
                            className="w-full"
                        >
                            <CarouselContent 
                                className="md:-ml-4"
                            >
                                {filteredProjects.map((project, idx) => (
                                    <CarouselItem
                                        key={idx}
                                        // className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                                        className="sm:basis-1/3 basis-1/1"
                                    >
                                        <FProjectCard {...project} />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>

                            {/* Custom Navigation Buttons */}
                            <div className="flex gap-2 mt-8">
                                <CarouselPrevious className="static translate-y-0 bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white">
                                    <ChevronLeft className="h-4 w-4" />
                                </CarouselPrevious>
                                <CarouselNext className="static translate-y-0 bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white">
                                    <ChevronRight className="h-4 w-4" />
                                </CarouselNext>
                            </div>
                        </Carousel>
                    </div>
                </div>
            </div>
        </section>
    );
};
