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
              <CldImage
                src={project.imgUrl}
                alt="project-img"
                className="md:max-h-[500px] md:max-w-[500px] object-cover rounded-md"
                width={500}
                height={500}
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
