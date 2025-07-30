import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PF_TEAM_MEMBER } from "../types/teamMember.types";
import { PFTeamCard } from "./PFTeamCard";

export const PFTeamCarousel = ({ team }: { team: PF_TEAM_MEMBER[] }) => {
  return (
    <div>
      <div className="relative w-full">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="flex rounded-sm">
            {team.map((team, idx) => (
              <CarouselItem key={idx} className="sm:basis-1/3 basis-1/1">
                <PFTeamCard {...team} />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Custom Navigation Buttons */}
          <div className="flex gap-2 mt-8">
            <CarouselPrevious className="static translate-y-0 bg-template-primary border-template-text-primary/40 text-template-text-primary hover:bg-template-secondary hover:text-template-text-secondary">
              <ChevronLeft className="h-4 w-4" />
            </CarouselPrevious>
            <CarouselNext className="static translate-y-0 bg-template-primary border-template-text-primary/40 text-template-text-primary hover:bg-template-secondary hover:text-template-text-secondary">
              <ChevronRight className="h-4 w-4" />
            </CarouselNext>
          </div>
        </Carousel>
      </div>
    </div>
  );
};
