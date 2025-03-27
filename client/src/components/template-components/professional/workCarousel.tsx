import * as React from "react";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { PROJECTS } from "@/templates/professional/types/projects";
import Link from "next/link";

interface PFWorkCarouselProps {
    Projects: PROJECTS[];
}

export function PFWorkCarousel({ Projects }: PFWorkCarouselProps) {
    return (
        <Carousel className="px-4 w-full">
            <CarouselContent>
                {Projects.map((project, idx) => (
                    <CarouselItem key={idx}>
                        <div className="flex flex-col gap-4">
                            <img
                                src={project.imgUrl}
                                alt="img"
                                className="w-60 h-50 object-cover self-center"
                            />
                            <div>
                                <h1>{project.heading}</h1>
                                <h2>{project.subtitle}</h2>
                                <p>{project.description}</p>
                                <Link href={project.btnLink}>
                                    <Button>{project.btnText}</Button>
                                </Link>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4" />
            <CarouselNext className="-right-4" />
        </Carousel>
    );
}
