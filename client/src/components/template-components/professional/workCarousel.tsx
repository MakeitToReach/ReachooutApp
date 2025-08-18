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
import { PF_PROJECT } from "@/templates/professional/types/project";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { PFWorkCard } from "./PFWorkCard";

interface PFWorkCarouselProps {
  Projects: PF_PROJECT[];
}

export function PFWorkCarousel({ Projects }: PFWorkCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    "All",
  );

  const categories = [
    "All",
    ...Array.from(new Set(Projects.map((project) => project.category))),
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? Projects
      : Projects.filter((project) => project.category === selectedCategory);

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
      <div className="flex overflow-x-scroll mb-12 w-full hide-scrollbar gap-3 px-2">
        <div className="flex gap-3 w-max">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={cn(
                "cursor-pointer px-4 py-2 font-medium transition-all duration-200 text-lg",
                selectedCategory === category
                  ? "bg-template-text-secondary text-template-secondary hover:bg-template-text-secondary/80"
                  : "border-template-text-secondary/30 text-template-text-secondary hover:bg-template-text-secondary/10 hover:border-template-text-secondary/50",
              )}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>
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
                <PFWorkCard project={project} />
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* Conditional nav buttons */}
        {filteredProjects.length > 1 && (
          <div className="hidden md:block">
            <CarouselPrevious className="bg-template-text-secondary border-template-text-secondary text-template-secondary" />
            <CarouselNext className="bg-template-text-secondary border-template-text-secondary text-template-secondary" />
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
                  : "bg-template-text-secondary/30",
              )}
              onClick={() => api?.scrollTo(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
