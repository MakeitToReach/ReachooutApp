"use client";
import React from "react";
import { PF_BLOG_SECTION } from "../types/blog.types";
import { PFBlogCard } from "../components/PFBlogCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion as m } from "motion/react";

const delay = 0.15;

export const PFBlogSection = ({ heading, blogs }: PF_BLOG_SECTION) => {
  return (
    <section
      id="blogs"
      className="max-w-6xl mx-auto text-center overflow-hidden py-20"
    >
      <m.h1
        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{
          duration: 0.5,
          delay: delay,
          ease: "easeOut",
        }}
        viewport={{ amount: 1, once: true }}
        className="text-4xl font-semibold text-template-text-primary sm:text-6xl text-center"
      >
        {heading}
      </m.h1>
      <m.div
        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{
          duration: 0.5,
          delay: delay * 2,
          ease: "easeOut",
        }}
        viewport={{ amount: 1, once: true }}
        className="relative w-full mt-10 px-4 sm:px-0"
      >
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="md:-ml-4">
            {blogs.map((blog, idx) => (
              <CarouselItem key={idx} className="sm:basis-1/3 basis-1/1">
                <PFBlogCard key={idx} {...blog} />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Custom Navigation Buttons */}
          <div className="flex gap-2 mt-8">
            <CarouselPrevious className="static translate-y-0 bg-transparent border-template-text-primary/80 text-template-text-primary">
              <ChevronLeft className="h-4 w-4" />
            </CarouselPrevious>
            <CarouselNext className="static translate-y-0 bg-transparent border-template-text-primary/80 text-template-text-primary">
              <ChevronRight className="h-4 w-4" />
            </CarouselNext>
          </div>
        </Carousel>
      </m.div>
    </section>
  );
};
