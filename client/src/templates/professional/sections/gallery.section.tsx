"use client";
import React, { useEffect, useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { AnimatePresence, motion as m } from "motion/react";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import { PF_GALLERY_SECTION } from "../types/gallerySection";

export const PFGallerySection = ({ gallery }: PF_GALLERY_SECTION) => {
    return (
        <section
            id="gallery"
            className="max-w-6xl mx-auto text-center overflow-hidden"
        >
            <h1 className="text-4xl font-semibold md:text-6xl">Gallery</h1>
            <div className="flex px-4 mt-10 items-center justify-center">
                <CatalogCarousel gallery={gallery} />
            </div>
        </section>
    );
};

const CatalogCarousel = ({ gallery }: PF_GALLERY_SECTION) => {
    return (
        <Carousel
            className="w-full"
            opts={{ loop: true, align: "center" }}
            plugins={[
                Autoplay({
                    delay: 6000,
                }),
            ]}
        >
            <CarouselContent className="">
                {gallery.map((_, idx) => (
                    <>
                        <CarouselItem key={idx} className="flex justify-center">
                            <CatalogImages
                                imgs={gallery[idx].items.map((item) => item.img)}
                            />
                        </CarouselItem>
                    </>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
};

export const CatalogImages = ({ imgs }: { imgs: string[] | string }) => {
    const [currIdx, setCurrIdx] = useState(0);
    if (typeof imgs === "string") imgs = [imgs];
    const totalLength = imgs.length;

    useEffect(() => {
        const timeout = setTimeout(() => {
            setCurrIdx((prev) => (prev + 1) % totalLength);
        }, 5000);
        return () => clearTimeout(timeout);
    }, [currIdx, totalLength]);

    return (
        <div>
            <AnimatePresence mode="wait">
                <m.img
                    key={imgs[currIdx]}
                    src={imgs[currIdx]}
                    alt={`catalog-${currIdx}`}
                    className="md:h-[500px] md:w-[700px] h-[300px] w-[400px] rounded-md object-cover"
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(10px)" }}
                    transition={{ duration: 0.5 }}
                />
            </AnimatePresence>
            <div className="text-black flex flex-col items-center my-4">
                <div className="flex gap-2">
                    {totalLength > 1 && (
                        <>
                            {Array.from({ length: totalLength }, (_, index) => (
                                <div
                                    key={index}
                                    role="button"
                                    onClick={() => setCurrIdx(index)}
                                    className={cn(
                                        "size-4 rounded-full transition-all cursor-pointer hover:scale-105",
                                        {
                                            "bg-black": index === currIdx,
                                            "bg-gray-300": index !== currIdx,
                                        },
                                    )}
                                />
                            ))}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
