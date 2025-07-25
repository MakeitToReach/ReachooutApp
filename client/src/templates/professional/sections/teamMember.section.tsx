import React from "react";
import { PF_TEAM_MEMBER_SECTION } from "../types/teamMember.types";
import { PFTeamCarousel } from "../components/PFTeamCarousel";
import { motion as m } from "motion/react";

const delay = 0.15;

export const PFTeamMembersSection = ({
  title,
  subtitle,
  teamMembers,
}: PF_TEAM_MEMBER_SECTION) => {
  return (
    <section
      className="max-w-6xl mx-auto py-20 px-4 text-template-text-primary"
      id="team"
    >
      <m.h1
        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{
          duration: 0.5,
          delay: delay,
          ease: "easeOut",
        }}
        viewport={{ amount: 1, once: true }}
        className="text-4xl font-semibold sm:text-6xl text-center"
      >
        {title}
      </m.h1>
      <m.h2
        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{
          duration: 0.5,
          delay: delay * 2,
          ease: "easeOut",
        }}
        viewport={{ amount: 1, once: true }}
        className="text-center text-xl text-template-text-primary/50 mt-8"
      >
        {subtitle}
      </m.h2>
      <m.div
        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{
          duration: 0.5,
          delay: delay * 3,
          ease: "easeOut",
        }}
        viewport={{ amount: 1, once: true }}
        className="w-full mt-10"
      >
        <PFTeamCarousel team={teamMembers} />
      </m.div>
    </section>
  );
};
