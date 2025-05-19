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
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { CldImage } from "next-cloudinary";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { getTrimmedTextWithToggle } from "@/lib/utils";
import { ReadMorePopup } from "@/components/editor-components/popups/readMorePopup";

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
        className="px-4 w-full"
        opts={{ loop: filteredProjects.length > 1 }}
        plugins={filteredProjects.length > 1 ? [Autoplay({ delay: 3000 })] : []}
      >
        <CarouselContent className="min-h-[600px]">
          {filteredProjects.map((project, idx) => {
            const { isLong, shortText } = getTrimmedTextWithToggle(
              project.description,
              500,
            );
            return (
              <CarouselItem
                key={idx}
                className="flex justify-center" // ensure same alignment for 1 or many
              >
                <div className="flex flex-col lg:flex-row-reverse gap-4 lg:justify-around lg:items-center mt-10 max-w-6xl">
                  <CldImage
                    src={project.imgUrl!}
                    alt="project-img"
                    className="md:max-h-[500px] md:max-w-[500px] object-cover rounded-md"
                    width={500}
                    height={500}
                  />
                  <div className="space-y-4">
                    <div>
                      <h1 className="text-xl font-semibold">
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
                    <Link href={project.btnLink}>
                      <Button className="text-template-text-btn bg-template-btn">{project.btnText}</Button>
                    </Link>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* Conditional nav buttons */}
        {filteredProjects.length > 1 && (
          <>
            <CarouselPrevious className="-left-4 dark" />
            <CarouselNext className="-right-4 dark" />
          </>
        )}
      </Carousel>
    </div>
  );
}
