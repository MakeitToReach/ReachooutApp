"use client";

import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Lightbox } from "@/components/Lightbox";
import { cn } from "@/lib/utils";

interface CarouselProps {
  images: string[];
  showPagination?: boolean;
  showNavigation?: boolean;
}

export const PFGalleryCarousel: React.FC<CarouselProps> = ({
  images,
  showPagination = true,
  showNavigation = true,
}) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

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
    <div className="relative w-full">
      <Carousel
        setApi={setApi}
        opts={{ align: "start", loop: true }}
        className="w-full"
      >
        <CarouselContent>
          {images.map((image, idx) => (
            <CarouselItem key={idx} className="sm:basis-1/3 basis-1/1">
              <div className="overflow-visible rounded-2xl">
                <Lightbox imageUrl={image} alt={`Image-${idx}`}>
                  <Image

                    src={image}
                    width={600}
                    height={600}
                    className={cn(
                      "rounded-xl object-cover w-full h-auto",
                      "sm:h-[50vh] sm:w-[30vw] h-[40vh] w-full",
                      "sm:max-h-[50vh] sm:max-w-full max-w-full max-h-[40vh]"
                    )}
                    alt={`Image-${idx}`}
                  />
                </Lightbox>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {showNavigation && (
          <div className="sm:flex gap-2 mt-8 justify-center hidden">
            <CarouselPrevious className="static translate-y-0 bg-transparent border-template-text-primary/80 text-template-text-primary" />
            <CarouselNext className="static translate-y-0 bg-transparent border-template-text-primary/80 text-template-text-primary" />
          </div>
        )}
      </Carousel>

      {/* Mobile Dots */}
      {showPagination && images.length > 1 && (
        <div className="flex justify-center gap-2 mt-4 md:hidden">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                current === index + 1
                  ? "bg-template-text-primary"
                  : "bg-template-text-primary/30"
              )}
              onClick={() => api?.scrollTo(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
