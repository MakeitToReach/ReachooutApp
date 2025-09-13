import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { F_PROJECTS_SECTION } from "../types/projects.types";
import { FProjectCard } from "../components/FProjectCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { motion as m } from "motion/react";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";

const delay = 0.15;

export const FProjectsSection = ({
  title,
  subtitle,
  projects,
}: F_PROJECTS_SECTION) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...Array.from(new Set(projects.map((project) => project.category).filter(cat => cat && cat.trim() !== ''))),
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) =>
        project.category === selectedCategory ||
        !project.category ||
        project.category.trim() === ''
      );

  return (
    <section className="py-20">
      <div
        id="projects"
        className="w-full rounded-lg bg-template-secondary overflow-hidden px-6 py-4"
      >
        <div className="max-w-6xl mx-auto h-full text-white my-10 space-y-8 overflow-x-visible">
          <m.h2
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.5,
              delay: delay,
              ease: "easeOut",
            }}
            className="font-semibold sm:text-5xl text-4xl tracking-tight text-center text-template-text-secondary"
          >
            {title}
          </m.h2>
          <m.p
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.5,
              delay: delay * 2,
              ease: "easeOut",
            }}
            className="text-center text-xl line-clamp-4 text-template-text-secondary/80"
          >
            {subtitle}
          </m.p>
          <div className="rounded-lg">
            <m.div
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0 }}
              transition={{
                duration: 0.5,
                delay: delay * 3,
                ease: "easeOut",
              }}
              className="flex overflow-x-scroll mb-12 w-full hide-scrollbar gap-3 px-2"
            >
              <div className="flex gap-3 w-full">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={
                      selectedCategory === category ? "default" : "outline"
                    }
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
            </m.div>
            <div className="relative">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                plugins={
                  filteredProjects.length > 1 ? [Autoplay({ delay: 6000 })] : []
                }
                className="w-full"
              >
                <CarouselContent className="md:-ml-4">
                  {filteredProjects.map((project, idx) => (
                    <CarouselItem
                      key={idx}
                      // className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                      className="sm:basis-1/3 basis-1/1"
                    >
                      <m.div
                        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                          duration: 0.5,
                          delay: delay * 4,
                          ease: "easeOut",
                        }}
                      >
                        <FProjectCard {...project} />
                      </m.div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {/* Custom Navigation Buttons */}
                <div className="flex gap-2 mt-8">
                  <CarouselPrevious className="static translate-y-0 bg-template-text-secondary border-template-text-secondary text-template-secondary">
                    <ChevronLeft className="h-4 w-4" />
                  </CarouselPrevious>
                  <CarouselNext className="static translate-y-0 bg-template-text-secondary border-template-text-secondary text-template-secondary">
                    <ChevronRight className="h-4 w-4" />
                  </CarouselNext>
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
