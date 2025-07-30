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
import { F_CATLOG_SERVICES } from "../types/service-catalog.types";
import { FCatalogServicesCard } from "./FCatalogServiceCard";

export const FCatalogServicesCarousel = ({
  catalogServices,
}: {
  catalogServices: F_CATLOG_SERVICES[];
}) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...Array.from(new Set(catalogServices.map((service) => service.category))),
  ];

  const filteredServices =
    selectedCategory === "All"
      ? catalogServices
      : catalogServices.filter(
          (service) => service.category === selectedCategory
        );

  return (
    <div>
      {/* categories */}
      <div className="flex flex-wrap justify-start gap-3 mb-12">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className={`cursor-pointer px-4 py-2 text-sm font-medium transition-all duration-200 ${
              selectedCategory === category
                ? "bg-white text-slate-800 hover:bg-gray-100"
                : "border-white/30 text-white hover:bg-white/10 hover:border-white/50"
            }`}
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
          className="w-full overflow-visible"
        >
          <CarouselContent className="md:-ml-4 overflow-visible w-full">
            {filteredServices.map((service, idx) => (
              <CarouselItem
                key={idx}
                // className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                className="sm:basis-1/3 sm:-mr-[17vw]  basis-1/1"
              >
                <FCatalogServicesCard {...service} />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Custom Navigation Buttons */}
          <div className="flex gap-2 mt-8">
            <CarouselPrevious className="static translate-y-0 bg-transparent border-template-text-secondary/30 text-template-text-secondary hover:bg-white/10 hover:text-white">
              <ChevronLeft className="h-4 w-4" />
            </CarouselPrevious>
            <CarouselNext className="static translate-y-0 bg-transparent border-template-text-secondary/30 text-template-text-secondary hover:bg-white/10 hover:text-white">
              <ChevronRight className="h-4 w-4" />
            </CarouselNext>
          </div>
        </Carousel>
      </div>
    </div>
  );
};
