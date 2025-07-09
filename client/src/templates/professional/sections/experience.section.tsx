import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PF_EXPERIENCE_SECTION } from "../types/experience.types";
import { PFExperienceItem } from "../components/PFExperienceItem";

export const PFExperienceSection = ({
  heading,
  imgUrl,
  experiences,
}: PF_EXPERIENCE_SECTION) => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="py-20" id="experience">
      <div className="relative">
        <div className="absolute z-0 w-[80%] h-[110%] left-0 -top-6 md:top-0 bg-template-accent-secondary rounded-md" />
        <div className="max-w-6xl mx-auto px-4 text-template-text-accent-secondary flex flex-col sm:flex-row items-center gap-4 sm:gap-0">
          {/* Responsive image container */}
          <div className="relative w-[200px] h-[200px] sm:w-[500px] sm:h-[500px] z-10 sm:mt-20 mt-10">
            <Image
              src={imgUrl || "/placeholder.png"}
              alt="Placeholder"
              fill
              className="object-cover rounded-md"
              // sizes="(min-width: 768px) 300px, 150px"
            />
          </div>

          <div className="z-10 relative flex flex-col gap-6 md:gap-10 md:p-20">
            <h1 className="text-4xl font-semibold md:text-6xl">{heading}</h1>
            <div className="flex gap-10">
              {/* Animated vertical line */}
              <motion.div
                className="bg-template-accent-primary w-0.5 origin-top"
                style={{ scaleY }}
              />
              <div className="flex flex-col gap-10">
                {experiences.map((experience, idx) => (
                  <PFExperienceItem
                    key={idx}
                    title={experience.title}
                    subtitle={experience.subtitle}
                    description={experience.description}
                    timePeriod={experience.timePeriod}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
