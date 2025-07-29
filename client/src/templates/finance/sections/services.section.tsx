import { FServicesCarousel } from "../components/FServicesCarousel";
import { F_SERVICE_SECTION } from "../types/services.types";
import { motion as m } from "motion/react";

const delay = 0.15;

export const FServicesSection = ({
  badgeText,
  title,
  subtitle,
  services,
}: F_SERVICE_SECTION) => {
  return (
    <section className="py-20">
      <div
        id="services"
        className="w-full rounded-lg min-h-[90vh] bg-template-secondary overflow-hidden px-6 py-4"
      >
        <div className="max-w-6xl mx-auto h-full my-10 space-y-8 overflow-x-visible text-template-text-secondary">
          <m.div
            initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.5,
              delay: delay,
              ease: "easeOut",
            }}
            className="w-fit rounded-full bg-black/30 flex items-center justify-center px-6 py-2 uppercase font-semibold text-lg"
          >
            {badgeText}
          </m.div>
          <div className="space-y-2">
            <m.h2
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: delay * 2,
                ease: "easeOut",
              }}
              className="font-semibold sm:text-5xl text-3xl tracking-tight"
            >
              {title}
            </m.h2>
            <m.h4
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: delay * 3,
                ease: "easeOut",
              }}
              className="text-template-text-secondary/80"
            >
              {subtitle}
            </m.h4>
          </div>
          <div className="sm:w-[130vw] rounded-lg">
            <FServicesCarousel services={services} />
          </div>
        </div>
      </div>
    </section>
  );
};
