import { FTimeline } from "../components/FTimeline";
import { F_TIMELINE_SECTION } from "../types/timeline.types";
import { motion as m } from "motion/react";

const delay = 0.15;

export const FTimelineSection = ({
  title,
  subtitle,
  steps,
}: F_TIMELINE_SECTION) => {
  return (
    <section
      id="timeline"
      className="w-full rounded-lg overflow-hidden py-20 sm:px-6"
    >
      <div className="max-w-6xl mx-auto h-full my-10 space-y-8 overflow-x-visible text-template-text-primary">
        <m.h2
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.5,
            delay: delay,
            ease: "easeOut",
          }}
          className="font-semibold text-5xl max-w-2xl mx-auto tracking-tight text-center"
        >
          {title}
        </m.h2>
        <m.p
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.5,
            delay: delay * 2,
            ease: "easeOut",
          }}
          className="text-center text-xl sm:text-lg line-clamp-4 text-template-text-primary/80"
        >
          {subtitle}
        </m.p>
      </div>
      <FTimeline steps={steps} />
    </section>
  );
};
