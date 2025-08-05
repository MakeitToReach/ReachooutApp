"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { PF_PROJECT } from "@/templates/professional/types/project";
import Autoplay from "embla-carousel-autoplay";
import { cn, getYouTubeVideoId } from "@/lib/utils";
import { ViewMoreDrawer } from "./viewMoreDrawer";
import Image from "next/image";
import YouTube from "react-youtube";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PFWorkCarouselProps {
  Projects: PF_PROJECT[];
}

export function PFWorkCarousel({ Projects }: PFWorkCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
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

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="sm:space-y-20 space-y-8 w-full">
      {/* Filter Bar */}
      <ScrollArea className="w-full whitespace-nowrap mb-12 max-w-full overflow-x-auto">
        <div className="flex flex-nowrap justify-center gap-3 px-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={cn(
                "cursor-pointer px-4 py-2 font-medium transition-all duration-200 text-lg",
                selectedCategory === category
                  ? "bg-template-text-secondary text-template-secondary hover:bg-template-text-secondary/80"
                  : "border-template-text-secondary/30 text-template-text-secondary hover:bg-template-text-secondary/10 hover:border-template-text-secondary/50"
              )}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </ScrollArea>
      {/* Carousel */}
      <Carousel
        setApi={setApi}
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
                    <div className="relative sm:h-[50vh] sm:w-[30vw] aspect-video h-[40vh] w-full rounded-sm">
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
                        "sm:h-[50vh] sm:w-[30vw] h-[40vh] w-full rounded-sm object-cover",
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
                    <div className="flex gap-2">
                      <ViewMoreDrawer content={project} type="Project">
                        <Button className="text-template-text-btn bg-template-btn rounded-sm text-lg hover:bg-template-btn cursor-pointer">
                          View Details
                          <ArrowUpRight size={16} />
                        </Button>
                      </ViewMoreDrawer>
                      {project.btnLink && (
                        <a
                          href={project.btnLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button className="text-template-btn bg-template-text-btn rounded-sm text-lg hover:bg-template-text-btn/80 cursor-pointer flex items-center gap-2">
                            {project.btnText}
                          </Button>
                        </a>
                      )}
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
            <CarouselPrevious className="bg-template-btn border-template-text-secondary text-template-text-btn" />
            <CarouselNext className="bg-template-btn text-template-text-btn border-template-text-secondary" />
          </div>
        )}
      </Carousel>

      {/* Mobile Dots */}
      {filteredProjects.length > 1 && (
        <div className="flex justify-center gap-2 mt-4 md:hidden">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                current === index + 1
                  ? "bg-template-text-secondary"
                  : "bg-template-text-secondary/30"
              )}
              onClick={() => api?.scrollTo(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
