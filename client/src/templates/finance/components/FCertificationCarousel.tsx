import { F_CERTIFICATION } from "../types/certification.types";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { FCertificationCard } from "./FCertificationCard";

export const FCertificationCarousel = ({ certifications }: { certifications: F_CERTIFICATION[] }) => {
    return (
        <div className="relative w-full">
            <Carousel opts={{ align: "start", loop: true }} className="w-full">
                <CarouselContent>
                    {certifications.map((certification, idx) => (
                        <CarouselItem key={idx} className="sm:basis-1/3 basis-3/4">
                            <FCertificationCard {...certification} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="sm:flex gap-2 mt-8 justify-start hidden">
                    <CarouselPrevious className="static translate-y-0 bg-template-text-secondary border-template-text-secondary text-template-secondary" />
                    <CarouselNext className="static translate-y-0 bg-template-text-secondary border-template-text-secondary text-template-secondary" />
                </div>
            </Carousel>
        </div>
    );
}; 
