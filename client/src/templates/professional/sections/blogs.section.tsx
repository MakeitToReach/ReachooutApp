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

export const PFBlogSection = ({ heading, blogs }: PF_BLOG_SECTION) => {
    return (
        <section
            id="blogs"
            className="max-w-6xl mx-auto text-center overflow-hidden py-20"
        >
            <h1 className="text-4xl font-semibold text-template-text-primary sm:text-6xl text-center">
                {heading}
            </h1>
            <div className="relative w-full mt-10 px-4 sm:px-0">
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent className="md:-ml-4">
                        {blogs.map((blog, idx) => (
                            <CarouselItem
                                key={idx}
                                className="sm:basis-1/3 basis-1/1"
                            >
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
            </div>
        </section>
    );
};
