import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PF_CATALOG } from "../types/serviceCatalog.types";
import { PFCatalogServicesCard } from "./PFCatalogServiceCard";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";

export const PFCatalogServicesCarousel = ({
  catalogServices,
}: {
  catalogServices: PF_CATALOG[];
}) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...Array.from(new Set(catalogServices.map((service) => service.category).filter(cat => cat && cat.trim() !== ''))),
  ];

  const filteredServices =
    selectedCategory === "All"
      ? catalogServices
      : catalogServices.filter(
        (service) =>
          service.category === selectedCategory ||
          !service.category ||
          service.category.trim() === ''
      );

  return (
    <div className="w-full">
      {/* categories */}
      <div className="flex overflow-x-scroll mb-12 w-full hide-scrollbar gap-3 px-2">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className={cn(
              "cursor-pointer px-4 py-2 font-medium transition-all duration-200 text-lg",
              selectedCategory === category
                ? "bg-template-text-secondary text-template-secondary hover:bg-template-text-secondary/80"
                : "border-template-text-secondary/30 text-template-text-secondary hover:bg-template-text-secondary/10 hover:border-template-text-secondary/50",
            )}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>
      <div className="relative w-full">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={
            filteredServices.length > 1 ? [Autoplay({ delay: 6000 })] : []
          }
          className="w-full"
        >
          <CarouselContent className="md:-ml-4">
            {filteredServices.map((service, idx) => (
              <CarouselItem key={idx} className="sm:basis-1/2 gap-2 basis-1/1">
                <PFCatalogServicesCard {...service} />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Custom Navigation Buttons */}
          <div className="flex gap-2 mt-8">
            <CarouselPrevious className="static translate-y-0 bg-template-text-secondary border-template-text-secondary text-template-secondary">
              <ChevronLeft className="h-4 w-4" />
            </CarouselPrevious>
            <CarouselNext className="static translate-y-0 bg-template-text-secondary border-template-text-secondary text-template-secondary">
              <ChevronRight className="h-4 w-4" />
            </CarouselNext>
          </div>
        </Carousel>
      </div>
    </div>
  );
};
