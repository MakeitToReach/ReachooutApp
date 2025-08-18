
import { useIsMobile } from "@/hooks/use-mobile";
import { FButton } from "../components/FButton";
import { FWhyChooseUsCard } from "../components/FWhyChooseUsCard";
import { F_WHY_CHOOSE_US_SECTION } from "../types/why-choose-us.types";
import {
  easeOut,
  motion as m,
  useScroll,
  useTransform,
} from "framer-motion";
import React, { useRef } from "react";

const delay = 0.15;

export const FWhyChooseUsSection = ({
  features,
  title,
  description,
  btnText,
  btnLink,
  badgeText,
}: F_WHY_CHOOSE_US_SECTION) => {
  const containerRef = useRef(null);

  // Scroll progress for the section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Transform scroll progress to make left content follow scroll downward
  const leftContentY = useTransform(scrollYProgress, [0, 0.6, 1], [0, 400, 400], {
    ease: easeOut,
  });

  const leftContentOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.95, 0.9]);

  const isMobile = useIsMobile();

  return (
    <section
      id="why-choose-us"
      ref={containerRef}
      className="max-w-6xl mx-auto sm:py-20 py-10 px-4 relative overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row gap-10">
        {/* Left sticky + animated content */}
        <m.div
          style={{
            y: !isMobile ? leftContentY : 0,
            opacity: !isMobile ? leftContentOpacity : 1,
          }}
          className="flex flex-col sm:gap-8 gap-10 sm:w-1/2 w-full text-template-text-primary"
        >
          <m.div
            initial={{ opacity: 0, x: -40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.5,
              delay: delay,
              ease: "easeOut",
            }}
            className="w-fit rounded-full bg-template-accent-secondary text-template-text-accent-secondary flex items-center justify-center px-6 py-2 uppercase font-semibold text-lg"
          >
            {badgeText}
          </m.div>
          <m.h2
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.5,
              delay: delay * 2,
              ease: "easeOut",
            }}
            className="font-semibold sm:text-5xl text-4xl tracking-tight"
          >
            {title}
          </m.h2>
          <m.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.5,
              delay: delay * 3,
              ease: "easeOut",
            }}
            className="
    prose prose-xl sm:prose-lg max-w-none text-template-text-primary
    prose-p:text-template-text-primary
    prose-strong:text-template-text-primary
    prose-h1:text-template-text-primary
    prose-h2:text-template-text-primary
    prose-h3:text-template-text-primary
    prose-h4:text-template-text-primary
    prose-h5:text-template-text-primary
    prose-h6:text-template-text-primary
    line-clamp-6
  "
            dangerouslySetInnerHTML={{ __html: description }}
          />

          <m.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.5,
              delay: delay * 4,
              ease: "easeOut",
            }}
            className="flex gap-10 items-center"
          >
            <a href={btnLink}>
              <FButton btnText={btnText} className="py-7 px-10" />
            </a>
          </m.div>
        </m.div>

        {/* Right features list */}
        <div className="flex flex-col sm:gap-8 gap-10 sm:w-1/2 w-full">
          {features.map((card, index) => (
            <FWhyChooseUsCard
              key={index}
              icon={card.icon}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
