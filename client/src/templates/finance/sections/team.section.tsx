import { FTeamCarousel } from "../components/FTeamCarousel";
import { F_TEAM_SECTION } from "../types/team.types";

export const FTeamSection = ({ team, heading }: F_TEAM_SECTION) => {
    return (
        <section className="w-full rounded-lg bg-template-secondary overflow-hidden my-14 px-6 py-4">
            <div className="max-w-6xl mx-auto h-full text-white my-10 space-y-8 overflow-x-visible">
                <h2 className="font-semibold sm:text-5xl text-3xl tracking-tight text-center">
                    {heading}
                </h2>
                <div className="sm:w-[130vw] rounded-lg">
                    <FTeamCarousel team={team} />
                </div>
            </div>
        </section>
    );
};
