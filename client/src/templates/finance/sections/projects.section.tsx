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

const delay = 0.15;

export const FProjectsSection = ({
  title,
  subtitle,
  projects,
}: F_PROJECTS_SECTION) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = Array.from(
    new Set(projects.map((project) => project.category))
  );

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((projects) => projects.category === selectedCategory);

  return (
    <section className="py-20">
      <div
        id="projects"
        className="w-full rounded-lg overflow-hidden sm:px-6 py-4"
      >
        <div className="max-w-6xl mx-auto h-full my-10 space-y-8 overflow-x-visible text-template-text-primary">
          <m.h2
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.5,
              delay: delay,
              ease: "easeOut",
            }}
            className="font-semibold sm:text-5xl text-3xl tracking-tight text-center"
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
            className="text-center line-clamp-4"
          >
            {subtitle}
          </m.p>
        </div>
        <div className="bg-template-secondary sm:w-[100vw] px-4 rounded-xl">
          <div className="max-w-6xl mx-auto py-10 overflow-x-visible">
            <m.div
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: delay * 3,
                ease: "easeOut",
              }}
              className="flex flex-wrap justify-start gap-3 mb-12"
            >
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  className={`cursor-pointer px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-white text-slate-800 hover:bg-gray-100"
                      : "border-white/30 text-white hover:bg-white/10 hover:border-white/50"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </m.div>
            <div className="relative">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
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
      </div>
    </section>
  );
};
