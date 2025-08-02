import { Separator } from "@/components/ui/separator";
import { LucideArrowRight } from "lucide-react";
import Image from "next/image";
import { F_STATS_SECTION } from "../types/stat.types";
import { motion as m } from "motion/react";
import { getIconFromRegistry } from "@/lib/utils";

const delay = 0.15;

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
    <section id="stats">
      <div className="w-full min-h-fit flex flex-col items-center justify-center bg-template-secondary rounded-lg overflow-hidden relative px-4 py-10">
        {/* Content container */}
        <div className="max-w-6xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-10 text-template-text-secondary mb-20 sm:mb-10">
          {/* Left: Text Content */}
          <div className="flex flex-col gap-10 sm:w-2/3 w-full">
            <m.h2
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: delay,
                ease: "easeOut",
              }}
              className="font-semibold sm:text-5xl text-4xl tracking-tight"
            >
              {heading}
            </m.h2>

            {/* Stats Block */}
            <div className="flex flex-col sm:flex-row justify-between gap-6 w-full">
              <m.div
                initial={{ y: 10, filter: "blur(10px)", scale: 1.2 }}
                whileInView={{ y: 0, filter: "blur(0px)", scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: delay * 2,
                  ease: "easeOut",
                }}
                className="space-y-2 flex-1"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-bold text-7xl">
                      {stats[0].statNumber}
                    </h2>
                    <span>
                      {getIconFromRegistry(stats[0].statIcon, {
                        className:
                          "sm:size-18 size-16 text-template-text-accent-tertiary",
                      })}
                    </span>
                  </div>
                  <h4 className="italic font-light text-3xl">
                    {stats[0].statText}
                  </h4>
                </div>
                <p className="text-lg leading-tight">
                  {stats[0].statDescription}
                </p>
              </m.div>
              <m.div
                initial={{ y: 10, filter: "blur(10px)", scale: 1.2 }}
                whileInView={{ y: 0, filter: "blur(0px)", scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: delay * 3,
                  ease: "easeOut",
                }}
                className="space-y-2 flex-1"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-bold text-7xl">
                      {stats[1].statNumber}
                    </h2>
                    <span>
                      {getIconFromRegistry(stats[1].statIcon, {
                        className:
                          "sm:size-18 size-16 text-template-text-accent-tertiary",
                      })}
                    </span>
                  </div>
                  <h4 className="italic font-light text-3xl">
                    {stats[1].statText}
                  </h4>
                </div>
                <p className="text-lg leading-tight">{stats[1].statDescription}</p>
              </m.div>
            </div>
          </div>

          {/* Right: Image */}
          <div className="sm:w-1/3 w-full flex justify-center items-center mb-10">
            <Image
              src={imgUrl || "/placeholder.png"}
              width={300}
              height={300}
              alt="stats"
              className="rounded-lg object-cover w-full h-auto max-w-[320px] max-h-[320px] sm:max-w-[18vw] sm:max-h-[18vw] aspect-square"
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
