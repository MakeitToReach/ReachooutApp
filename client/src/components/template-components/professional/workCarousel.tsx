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
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { cn,  getYouTubeVideoId } from "@/lib/utils";
import { ViewMoreDrawer } from "./viewMoreDrawer";
import Image from "next/image";
import YouTube from "react-youtube";

interface PFWorkCarouselProps {
  Projects: PF_PROJECT[];
}

export function PFWorkCarousel({ Projects }: PFWorkCarouselProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    null
  );

  const categories = Array.from(
    new Set(Projects.map((project) => project.category))
  );

  const filteredProjects = selectedCategory
    ? Projects.filter((project) => project.category === selectedCategory)
    : Projects;

  const videoId =
    Projects.length > 0 ? getYouTubeVideoId(filteredProjects[0].vidUrl) : null;

  const youtubeOpts = {
    playerVars: {
      autoplay: 1,
      loop: 1,
      playlist: videoId,
      controls: 0,
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
    <div className="sm:space-y-10 space-y-8 w-full">
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
        <CarouselContent>
          {filteredProjects.map((project, idx) => {
            return (
              <CarouselItem
                key={idx}
                className="flex justify-center items-center"
              >
                <div className="flex flex-col sm:flex-row sm:flex-row-reverse sm:justify-between overflow-hidden">
                  <dialog>test dialog</dialog>
                  {project.vidUrl ? (
                    <div className="relative sm:h-[500px] sm:w-[500px] aspect-video h-[300px] w-full rounded-md">
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
                        "sm:h-[50vh] sm:w-auto h-[40vh] w-full rounded-md object-cover",
                        "sm:max-h-[50vh] sm:max-w-full max-w-full max-h-[40vh]"
                      )}
                      width={500}
                      height={500}
                    />
                  )}

                  {/* text content */}
                  <div className="flex flex-col gap-4 self-center md:w-[60%]">
                    <div>
                      <h1 className="md:text-xl text-lg font-semibold">
                        {project.heading}
                      </h1>
                      <Badge>{project.category}</Badge>
                    </div>

                    <div
                      className="
    prose prose-sm max-w-none text-template-text-secondary
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
