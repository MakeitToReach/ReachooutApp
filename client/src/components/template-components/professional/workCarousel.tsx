"use client";

import * as React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { PF_PROJECT } from "@/templates/professional/types/project";
import Autoplay from "embla-carousel-autoplay";
import { CldImage } from "next-cloudinary";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { getTrimmedTextWithToggle } from "@/lib/utils";
import { ReadMorePopup } from "@/components/editor-components/popups/readMorePopup";
import { ViewMoreDrawer } from "./viewMoreDrawer";
// import YouTube from "react-youtube";

interface PFWorkCarouselProps {
    Projects: PF_PROJECT[];
}

export function PFWorkCarousel({ Projects }: PFWorkCarouselProps) {
    const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
        null,
    );

    const categories = Array.from(
        new Set(Projects.map((project) => project.category)),
    );

    const filteredProjects = selectedCategory
        ? Projects.filter((project) => project.category === selectedCategory)
        : Projects;

    return (
        <div className="space-y-6">
            {/* Filter Bar */}
            <ScrollArea className="w-full flex justify-center gap-2">
                <Button
                    variant={selectedCategory === null ? "outline" : "default"}
                    onClick={() => setSelectedCategory(null)}
                    className="dark"
                >
                    All
                </Button>
                {categories.map((category) => (
                    <Button
                        key={category}
                        variant={selectedCategory === category ? "outline" : "default"}
                        onClick={() => setSelectedCategory(category)}
                        className="bg-template-btn text-template-text-btn"
                    >
                        {category}
                    </Button>
                ))}
            </ScrollArea>

            {/* Carousel */}
            <Carousel
                opts={{ loop: filteredProjects.length > 1, align: "center" }}
                plugins={filteredProjects.length > 1 ? [Autoplay({ delay: 6000 })] : []}
            >
                <CarouselContent className="min-h-[600px]">
                    {filteredProjects.map((project, idx) => {
                        const { isLong, shortText } = getTrimmedTextWithToggle(
                            project.description,
                            500,
                        );
                        return (
                            <CarouselItem key={idx}>
                                <div className="flex flex-col md:flex-row lg:flex-row-reverse mt-10">
                                    <CldImage
                                        src={project.imgUrl!}
                                        alt="project-img"
                                        className="md:h-[500px] md:w-[700px] h-[300px] w-full rounded-md object-cover"
                                        width={700}
                                        height={500}
                                    />
                                    {/* {project.vidUrl ? ( */}
                                    {/*   <div className="relative max-w-[600px] aspect-video rounded-md overflow-hidden"> */}
                                    {/*     <YouTube */}
                                    {/*       videoId={project.vidUrl.split("v=")[1]} */}
                                    {/*       className="mt-20 md:max-h-[500px] h-[300px] md:max-w-[700px] rounded-md object-cover" */}
                                    {/*       iframeClassName="mt-20 md:max-h-[500px] h-[300px] md:max-w-[700px] rounded-md object-cover" */}
                                    {/*       // opts={opts} */}
                                    {/*     /> */}
                                    {/*   </div> */}
                                    {/* ) : ( */}
                                    {/*   <CldImage */}
                                    {/*     src={project.imgUrl || "/placeholder.png"} */}
                                    {/*     alt="heroimg" */}
                                    {/*     className="mt-20 md:max-h-[500px] h-[300px] md:max-w-[700px] rounded-md object-cover" */}
                                    {/*     width={700} */}
                                    {/*     height={500} */}
                                    {/*   /> */}
                                    {/* )} */}

                                    {/* text content */}
                                    <div className="flex flex-col gap-4 self-center md:w-[60%]">
                                        <div>
                                            <h1 className="md:text-xl text-lg font-semibold">
                                                {project.heading}
                                            </h1>
                                            {/* <h2 className="font-extralight">{project.subtitle}</h2> */}
                                            <Badge>{project.category}</Badge>
                                        </div>

                                        <div>
                                            <p className="whitespace-pre-line leading-relaxed">
                                                {shortText}
                                            </p>
                                            {isLong && (
                                                <ReadMorePopup content={project.description}>
                                                    <p
                                                        className="underline text-blue-500 mt-1"
                                                        role="button"
                                                    >
                                                        Read more
                                                    </p>
                                                </ReadMorePopup>
                                            )}
                                        </div>
                                        <div className="space-x-2">
                                            <a
                                                href={project.btnLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Button className="text-template-text-btn bg-template-btn">
                                                    {project.btnText}
                                                </Button>
                                            </a>

                                            <ViewMoreDrawer content={project} type="Project">
                                                <Button className="text-template-text-btn bg-template-btn">
                                                    View Details
                                                </Button>
                                            </ViewMoreDrawer>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>

                {/* Conditional nav buttons */}
                {filteredProjects.length > 1 && (
                    <div className="hidden md:block">
                        <CarouselPrevious className="-left-10 dark" />
                        <CarouselNext className="-right-10 dark" />
                    </div>
                )}
            </Carousel>
        </div>
    );
}
