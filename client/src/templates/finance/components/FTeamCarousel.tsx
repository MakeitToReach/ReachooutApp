// import { useState } from "react";
// import { F_SERVICE } from "../types/services.types";
// import { Badge } from "@/components/ui/badge";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { F_TEAM_MEMBER } from "../types/team.types";
import { FTeamCard } from "./FTeamCard";

export const FTeamCarousel = ({ team }: { team: F_TEAM_MEMBER[] }) => {
    return (
        <div className="w-full overflow-x-visible">
            <div className="relative">
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="sm:w-[62vw] w-full"
                >
                    <CarouselContent className="md:-ml-4">
                        {team.map((team, idx) => (
                            <CarouselItem
                                key={idx}
                                className="sm:basis-1/3 basis-1/1"
                            >
                                <FTeamCard {...team} />
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
