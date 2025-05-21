import React from "react";
import { PF_TEAM_MEMBER_SECTION } from "../types/teamMember.types";

export const PFTeamMembersSection = ({
    title,
    subtitle,
    teamMembers,
}: PF_TEAM_MEMBER_SECTION) => {
    return (
        <section
            className="max-w-6xl mx-auto md:my-40 px-4 text-template-text-primary"
            id="team"
        >
            <h1 className="text-3xl font-semibold md:text-6xl text-center">
                {title}
            </h1>
            <h2 className="text-center text-xl text-template-text-primary/50 mt-10">
                {subtitle}
            </h2>
            <div className="flex flex-wrap items-center justify-center flex-col md:flex-row gap-3 mt-10 w-full">
                {/* <div className="grid grid-cols-2 md:grid-cols-7 gap-3  mt-10"> */}
                {teamMembers.map((member, idx) => (
                    <TeamMemberCard
                        key={idx}
                        avatar={member.avatar}
                        name={member.name}
                        designation={member.designation}
                    />
                ))}
            </div>
        </section>
    );
};

const TeamMemberCard = ({
    avatar,
    name,
    designation,
}: {
    avatar: string;
    name: string;
    designation: string;
}) => {
    return (
        <div className="flex min-w-36 flex-col items-center">
            <img
                src={avatar}
                alt={`${name}'s avatar`}
                className="w-24 h-24 rounded-full object-cover mb-4"
            />
            <h3 className="text-lg font-medium text-center break-words w-full">
                {name}
            </h3>
            <p className="text-sm text-neutral-400 text-center mt-2 break-words w-full">
                {designation}
            </p>
        </div>
    );
};
