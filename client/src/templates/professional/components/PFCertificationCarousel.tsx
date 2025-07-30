import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { PFCertificationCard } from "./PFCertificationCard";
import type { PF_CERTIFICATION } from "../types/certification.types";

interface PFCertificationCarouselProps {
  certifications: PF_CERTIFICATION[];
}

export const PFCertificationCarousel = ({ certifications }: PFCertificationCarouselProps) => {
  return (
    <div className="relative w-full">
      <Carousel opts={{ align: "start", loop: true }} className="w-full">
        <CarouselContent>
          {certifications.map((cert, idx) => (
            <CarouselItem key={idx} className="sm:basis-1/3 basis-3/4">
              <PFCertificationCard {...cert} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="sm:flex gap-2 mt-8 justify-start hidden">
          <CarouselPrevious className="static translate-y-0 bg-transparent border-template-text-secondary/80 text-template-text-secondary" />
          <CarouselNext className="static translate-y-0 bg-transparent border-template-text-secondary/80 text-template-text-secondary" />
        </div>
      </Carousel>
    </div>
  );
}; 