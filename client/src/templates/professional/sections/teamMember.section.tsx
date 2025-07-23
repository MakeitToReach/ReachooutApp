import React from "react";
import { PF_TEAM_MEMBER_SECTION } from "../types/teamMember.types";
import { PFTeamCarousel } from "../components/PFTeamCarousel";

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
      <h1 className="text-4xl font-semibold sm:text-6xl text-center">
        {title}
      </h1>
      <h2 className="text-center text-xl text-template-text-primary/50 mt-8">
        {subtitle}
      </h2>
      <div className="w-full mt-10">
        <PFTeamCarousel team={teamMembers} />
      </div>
    </section>
  );
};
