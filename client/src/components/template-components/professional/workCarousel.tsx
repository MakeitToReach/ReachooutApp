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

interface PFWorkCarouselProps {
  Projects: PF_PROJECT[];
}

export function PFWorkCarousel({ Projects }: PFWorkCarouselProps) {
  return (
    <Carousel
      className="px-4 w-full"
      opts={{ loop: true }}
      plugins={[Autoplay({ delay: 3000 })]}
    >
      <CarouselContent>
        {Projects.map((project, idx) => (
          <CarouselItem key={idx}>
            <div className="flex flex-col lg:flex-row-reverse gap-4 lg:justify-around lg:items-center mt-10">
              <img
                src={project.imgUrl}
                alt="img"
                className="w-80 rounded-md h-50  lg:size-90 object-cover self-center"
              />
              <div className="space-y-4">
                <div>
                  <h1 className="text-xl font-semibold">{project.heading}</h1>
                  <h2 className="font-extralight">{project.subtitle}</h2>
                </div>
                <p>{project.description}</p>
                <Link href={project.btnLink}>
                  <Button>{project.btnText}</Button>
                </Link>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="-left-4 dark" />
      <CarouselNext className="-right-4 dark" />
    </Carousel>
  );
}
