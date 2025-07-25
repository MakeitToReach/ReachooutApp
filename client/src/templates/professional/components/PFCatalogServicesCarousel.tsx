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
import { ScrollArea } from "@/components/ui/scroll-area";

export const PFCatalogServicesCarousel = ({
    catalogServices,
}: {
    catalogServices: PF_CATALOG[];
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
                (service) => service.category === selectedCategory,
            );

    return (
        <div>
            {/* categories */}
            <ScrollArea className="w-full whitespace-nowrap mb-12 max-w-full overflow-x-auto">
                <div className="flex flex-nowrap justify-center gap-3 px-2">
                    {categories.map((category) => (
                        <Badge
                            key={category}
                            variant={selectedCategory === category ? "default" : "outline"}
                            className={cn(
                                "cursor-pointer px-4 py-2 text-sm font-medium transition-all duration-200 text-lg",
                                selectedCategory === category
                                    ? "bg-white text-slate-800 hover:bg-gray-100"
                                    : "border-white/30 text-white hover:bg-white/10 hover:border-white/50"
                            )}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </Badge>
                    ))}
                </div>
            </ScrollArea>
            <div className="relative w-full">
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
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
                        <CarouselPrevious className="static translate-y-0 bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white">
                            <ChevronLeft className="h-4 w-4" />
                        </CarouselPrevious>
                        <CarouselNext className="static translate-y-0 bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white">
                            <ChevronRight className="h-4 w-4" />
                        </CarouselNext>
                    </div>
                </Carousel>
            </div>
        </div>
    );
};
