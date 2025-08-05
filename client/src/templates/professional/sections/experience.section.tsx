import Image from "next/image";
import { useRef } from "react";
import { PF_EXPERIENCE_SECTION } from "../types/experience.types";
import { PFExperienceItem } from "../components/PFExperienceItem";
import { motion as m, useScroll, useTransform } from "motion/react";

const delay = 0.15;

export const PFExperienceSection = ({
  heading,
  subheading,
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
    <section className="bg-template-secondary" id="experience">
      <div className="relative">
        <div className="max-w-6xl mx-auto px-4 text-template-text-secondary flex flex-col sm:flex-row items-center gap-4 py-20 min-w-0">
          {/* Responsive image container */}
          <div
            className="relative w-[200px] h-[200px] sm:w-[500px] sm:h-[500px] z-10 sm:mt-20 mt-10"
          >
            <Image
              src={imgUrl || "/placeholder.png"}
              alt="Placeholder"
              fill
              className="object-cover rounded-sm"
              // sizes="(min-width: 768px) 300px, 150px"
            />
          </div>

          <div className="z-10 relative flex flex-col gap-6 md:gap-10 md:p-20">
            <m.h1
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.5,
                delay: delay,
                ease: "easeOut",
              }}
              viewport={{ amount: 0.5, once: true }}
              className="text-4xl font-semibold md:text-6xl"
            >
              {heading}
            </m.h1>
            {subheading && (
              <m.p
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.5,
                  delay: delay * 1.5,
                  ease: "easeOut",
                }}
                viewport={{ amount: 0.5, once: true }}
                className="text-lg sm:text-xl text-template-text-secondary/50 max-w-2xl mb-2"
              >
                {subheading}
              </m.p>
            )}
            <m.div
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.5,
                delay: delay * 2,
                ease: "easeOut",
              }}
              viewport={{ amount: 0.5, once: true }}
              className="flex gap-10"
            >
              {/* Animated vertical line */}
              <m.div
                className="bg-template-text-accent-tertiary w-0.5 origin-top"
                style={{ scaleY }}
              />
              <m.div className="flex flex-col gap-10">
                {experiences.map((experience, idx) => (
                  <m.div
                    key={idx}
                    initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.5,
                      delay: delay * (idx + 1),
                      ease: "easeOut",
                    }}
                    viewport={{ amount: 0, once: true }}
                  >
                    <PFExperienceItem
                      title={experience.title}
                      subtitle={experience.subtitle}
                      description={experience.description}
                      timePeriod={experience.timePeriod}
                    />
                  </m.div>
                ))}
              </m.div>
            </m.div>
          </div>
        </div>
      </div>
    </section>
  );
};
