import { Separator } from "@/components/ui/separator";
import { LucideArrowRight } from "lucide-react";
import Image from "next/image";
import { F_STATS_SECTION } from "../types/stat.types";

export const FStatsSection = ({
  heading,
  stats,
  imgUrl,
  btn1Text,
  btn1Link = "#",
  btn2Text,
  btn2Link = "#",
}: F_STATS_SECTION) => {
  return (
    <section className="py-20">
      <div className="w-full sm:h-[55vh] min-h-fit flex flex-col items-center justify-center bg-template-secondary rounded-lg overflow-hidden relative py-16 px-4">
        {/* Content container */}
        <div className="max-w-6xl py-10 mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-10 text-template-text-secondary mb-20 sm:mb-0">
          {/* Left: Text Content */}
          <div className="flex flex-col gap-10 sm:w-2/3 w-full">
            <h2 className="font-semibold sm:text-5xl text-3xl tracking-tight">
              {heading}
            </h2>

            {/* Stats Block */}
            <div className="flex flex-col sm:flex-row justify-between gap-6 w-full">
              <div className="space-y-2 flex-1">
                <div>
                  <h2 className="font-bold text-6xl">{stats[0].statNumber}</h2>
                  <h4 className="italic font-light font-serif text-2xl">
                    {stats[0].statText}
                  </h4>
                </div>
                <p>{stats[0].statDescription}</p>
              </div>
              <div className="space-y-2 flex-1">
                <div>
                  <h2 className="font-bold text-6xl">{stats[1].statNumber}</h2>
                  <h4 className="italic font-light font-serif text-2xl">
                    {stats[1].statText}
                  </h4>
                </div>
                <p className="text-sm">{stats[1].statDescription}</p>
              </div>
            </div>
          </div>

          {/* Right: Image */}
          <div className="sm:w-1/3 w-full flex justify-center">
            <Image
              src={imgUrl || "/placeholder.png"}
              width={300}
              height={300}
              alt="stats"
              className="rounded-lg object-contain"
            />
          </div>
        </div>

        {/* Bottom CTA Bar */}
        <div className="bg-template-accent-primary w-full sm:flex absolute bottom-0">
          <div className="max-w-6xl mx-auto sm:flex-row flex flex-col gap-4 divide-black sm:gap-20 items-center justify-between py-6 px-4">
            <a href={btn1Link}>
              <button
                type="button"
                className="flex items-center text-template-text-accent-primary gap-2 hover:underline"
              >
                {btn1Text}
                <span>
                  <LucideArrowRight />
                </span>
              </button>
            </a>
            <Separator
              orientation="vertical"
              className="h-10 w-0.5 bg-template-text-accent-primary"
            />
            <a href={btn2Link}>
              <button
                type="button"
                className="flex items-center text-template-text-accent-primary gap-2 hover:underline"
              >
                {btn2Text}
                <span>
                  <LucideArrowRight />
                </span>
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
