import { FLogos } from "../components/FLogos";
import { F_LOGOS_SECTION } from "../types/logos.types";
import { motion as m } from "motion/react";

const delay = 0.15;

export const FLogoSection = ({
  heading,
  subHeading,
  imgs,
}: F_LOGOS_SECTION) => {
  return (
    <section
      id="logos"
      className="w-full rounded-lg overflow-hidden py-20 px-6"
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
          className="font-semibold sm:text-5xl text-3xl tracking-tight text-center"
        >
          {heading}
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
          className="text-center text-xl sm:text-lg line-clamp-4"
        >
          {subHeading}
        </m.p>
        <FLogos imgs={imgs} />
      </div>
    </section>
  );
};
