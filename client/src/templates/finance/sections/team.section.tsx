import { FTeamCarousel } from "../components/FTeamCarousel";
import { F_TEAM_SECTION } from "../types/team.types";
import { motion as m } from "motion/react";

const delay = 0.15;

export const FTeamSection = ({ team, heading }: F_TEAM_SECTION) => {
    return (
        <section className="py-20">
        <div id="team" className="w-full rounded-lg bg-template-secondary overflow-hidden px-6 py-4">
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
                className="font-semibold text-5xl tracking-tight text-center text-template-text-secondary">
                    {heading}
                </m.h2>
                <div className="sm:w-[130vw] rounded-lg">
                    <FTeamCarousel team={team} />
                    </div>
                </div>
            </div>
        </section>
    );
};
