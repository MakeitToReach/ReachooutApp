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
import { cn, getYouTubeVideoId } from "@/lib/utils";
import { ViewMoreDrawer } from "./viewMoreDrawer";
import Image from "next/image";
import YouTube from "react-youtube";
import { Badge } from "@/components/ui/badge";

interface PFWorkCarouselProps {
  Projects: PF_PROJECT[];
}

export function PFWorkCarousel({ Projects }: PFWorkCarouselProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    "All"
  );

  const categories = [
    "All",
    ...Array.from(new Set(Projects.map((project) => project.category))),
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? Projects
      : Projects.filter((project) => project.category === selectedCategory);

  const videoId =
    Projects.length > 0 ? getYouTubeVideoId(filteredProjects[0].vidUrl) : null;

  const youtubeOpts = {
    playerVars: {
      autoplay: 1,
      loop: 1,
      playlist: videoId,
      controls: 1,
      modestbranding: 1,
      rel: 0,
      iv_load_policy: 3,
      disablekb: 1,
      fs: 0,
      mute: 1,
      playsinline: 1,
    },
  };

  return (
    <div className="sm:space-y-20 space-y-8 w-full">
      {/* Filter Bar */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className={cn(
              "cursor-pointer px-4 py-2 text-sm font-medium transition-all duration-200 text-lg",
              selectedCategory === category
                ? "bg-white text-slate-800 hover:bg-gray-100"
                : "border-white/30 text-white hover:bg-white/10 hover:border-white/50"
            )}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>
      {/* Carousel */}
      <Carousel
        opts={{ loop: filteredProjects.length > 1, align: "center" }}
        plugins={filteredProjects.length > 1 ? [Autoplay({ delay: 6000 })] : []}
      >
        <CarouselContent>
          {filteredProjects.map((project, idx) => {
            return (
              <CarouselItem
                key={idx}
                className="flex justify-center items-center"
              >
                <div className="flex flex-col sm:flex-row-reverse sm:justify-between overflow-hidden">
                  <dialog>test dialog</dialog>
                  {project.vidUrl ? (
                    <div className="relative sm:h-[50vh] sm:w-[30vw] aspect-video h-[40vh] w-full rounded-xs">
                      <YouTube
                        videoId={videoId ?? ""}
                        className="absolute top-0 left-0 w-full h-full"
                        iframeClassName="w-full h-full"
                        opts={youtubeOpts}
                      />
                    </div>
                  ) : (
                    <Image
                      src={project.imgUrl || "/placeholder.png"}
                      alt="project-img"
                      className={cn(
                        "sm:h-[50vh] sm:w-[30vw] h-[40vh] w-full rounded-xs object-cover",
                        "sm:max-h-[50vh] sm:max-w-full max-w-full max-h-[40vh]"
                      )}
                      width={500}
                      height={500}
                    />
                  )}

                  {/* text content */}
                  <div className="flex flex-col gap-4 py-6 self-center md:w-[60%]">
                    <div className="space-y-2">
                      <h1 className="sm:text-4xl text-2xl font-semibold">
                        {project.heading}
                      </h1>
                    </div>

                    <div
                      className=" 
                                            prose prose-lg max-w-[90%] text-template-text-secondary
                                            prose-p:text-template-text-secondary
                                            prose-strong:text-template-text-secondary
                                            prose-h1:text-template-text-secondary
                                            prose-h2:text-template-text-secondary
                                            prose-h3:text-template-text-secondary
                                            prose-h4:text-template-text-secondary
                                            prose-h5:text-template-text-secondary
                                            prose-h6:text-template-text-secondary
                                            line-clamp-6
                                            "
                      dangerouslySetInnerHTML={{ __html: project.description }}
                    />
                    <div className="space-x-2">
                      <ViewMoreDrawer content={project} type="Project">
                        <Button className="text-template-text-btn bg-template-btn rounded-xs text-lg">
                          View Details
                        </Button>
                      </ViewMoreDrawer>
                      <a
                        href={project.btnLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button className="text-template-text-btn bg-template-btn rounded-xs text-lg">
                          {project.btnText}
                        </Button>
                      </a>
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
            <CarouselPrevious className="-left-10 bg-template-btn border-template-text-secondary text-template-text-btn" />
            <CarouselNext className="-right-10 bg-template-btn text-template-text-btn border-template-text-secondary" />
          </div>
        )}
      </Carousel>
    </div>
  );
}
