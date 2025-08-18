import { FTeamCarousel } from "../components/FTeamCarousel";
import { F_TEAM_SECTION } from "../types/team.types";
import { motion as m } from "motion/react";

const delay = 0.15;

export const FTeamSection = ({ team, heading, subheading }: F_TEAM_SECTION) => {
  return (
    <section className="py-20" id="team">
      <div className="w-full rounded-lg bg-template-secondary overflow-hidden px-6 py-4">
        <div className="max-w-6xl mx-auto h-full text-white my-10 space-y-8 overflow-x-visible">
          <m.h2
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.5,
              delay: delay,
              ease: "easeOut",
            }}
            className="font-semibold sm:text-5xl text-4xl tracking-tight text-center text-template-text-secondary"
          >
            {heading}
          </m.h2>
          {subheading && (
            <m.p
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.5,
                delay: delay * 1.5,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-center text-lg sm:text-xl text-template-text-secondary/80"
            >
              {subheading}
            </m.p>
          )}
          <div className="w-full rounded-lg">
            <FTeamCarousel team={team} />
          </div>
        </div>
      </div>
    </section>
  );
};
