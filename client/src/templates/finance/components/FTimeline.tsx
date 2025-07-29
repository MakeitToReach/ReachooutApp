import { cn } from "@/lib/utils";
import Image from "next/image";
import { F_TIMELINE_STEP } from "../types/timeline.types";
import { motion as m } from "motion/react";

const delay = 0.15;

interface FTimelineProps {
  steps: F_TIMELINE_STEP[];
}

export const FTimeline = ({ steps }: FTimelineProps) => {
  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 py-12">
      {/* Vertical line */}
      <div className="absolute left-1/2 top-0 w-1 bg-gray-200 h-full transform -translate-x-1/2 z-0" />

      <div className="flex flex-col gap-16">
        {steps.map((step, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={index}
              className="relative z-10 flex flex-col sm:flex-row items-center"
            >
              {/* Step Circle */}
              <div className="absolute left-1/2 transform -translate-x-1/2 sm:translate-y-0 -translate-y-1/2 z-20">
                <div className="w-10 h-10 rounded-full bg-template-accent-primary text-template-text-accent-primary flex items-center justify-center font-bold border-4 border-white shadow">
                  {index + 1}
                </div>
              </div>

              <div
                className={`flex flex-col sm:flex-row items-center w-full gap-8 sm:gap-20 mt-10`}
              >
                {/* Image */}
                <m.div
                  initial={{
                    opacity: 0,
                    x: isEven ? -40 : 40,
                    filter: "blur(10px)",
                  }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.5,
                    delay: delay * (index + 1),
                    ease: "easeOut",
                  }}
                  className={cn(
                    "w-full sm:w-1/2 sm:aspect-video aspect-square relative",
                    isEven ? "order-1" : "sm:order-2"
                  )}
                >
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="rounded-lg shadow-lg object-cover"
                  />
                </m.div>

                {/* Text Content */}
                <div
                  className={cn(
                    "w-full sm:w-1/2 bg-template-primary text-template-text-primary",
                    isEven ? "order-2" : "sm:order-1"
                  )}
                >
                  <m.span
                    initial={{ opacity: 0, x: -40, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.5,
                      delay: delay * (index + 1),
                      ease: "easeOut",
                    }}
                    className="text-sm font-semibold text-template-text-accent-primary bg-template-accent-primary px-3 py-1 rounded-full inline-block mb-2"
                  >
                    {step.badgeText}
                  </m.span>
                  <m.h3
                    initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.5,
                      delay: delay * (index + 2),
                      ease: "easeOut",
                    }}
                    className="text-2xl font-bold mb-4"
                  >
                    {step.title}
                  </m.h3>
                  <m.div
                    initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.5,
                      delay: delay * (index + 3),
                      ease: "easeOut",
                    }}
                    className="
    prose prose-xl sm:prose-base max-w-none text-gray-600
    prose-p:text-gray-600
    prose-strong:text-gray-600
    prose-h1:text-gray-600
    prose-h2:text-gray-600
    prose-h3:text-gray-600
    prose-h4:text-gray-600
    prose-h5:text-gray-600
    prose-h6:text-gray-600
  "
                    dangerouslySetInnerHTML={{ __html: step.description }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
