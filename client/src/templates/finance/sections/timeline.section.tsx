import { FTimeline } from "../components/FTimeline";
import { F_TIMELINE_SECTION } from "../types/timeline.types";

export const FTimelineSection = ({title, subtitle, steps} : F_TIMELINE_SECTION) => {
    return (
        <section
            id="timeline"
            className="w-full rounded-lg overflow-hidden my-14 sm:px-6 py-4"
        >
            <div className="max-w-6xl mx-auto h-full my-10 space-y-8 overflow-x-visible text-template-text-primary">
                <h2 className="font-semibold sm:text-5xl text-3xl tracking-tight text-center">
                    {title}
                </h2>
                <p className="text-center line-clamp-4">{subtitle}</p>
            </div>
            <FTimeline steps={steps} />
        </section>
    );
};
