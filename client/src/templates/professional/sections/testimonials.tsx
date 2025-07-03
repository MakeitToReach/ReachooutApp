import { Marquee } from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";
import { PF_TESTIMONIAL_SECTION } from "../types/testimonials.types";

const ReviewCard = ({
    img,
    name,
    username,
    body,
}: {
    img: string;
    name: string;
    username?: string;
    body: string;
}) => {
    return (
        <figure
            className={cn(
                "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
                "border-template-accent-primary",
            )}
        >
            <div className="flex flex-row items-center gap-2 text-template-text-primary">
                {/* eslint-disable-next-line */}
                <img className="rounded-full" width="32" height="32" alt="" src={img} />
                <div className="flex flex-col">
                    <figcaption className="text-sm font-medium ">{name}</figcaption>
                    {username && <p className="text-xs font-medium">{username}</p>}
                </div>
            </div>
            <blockquote className="mt-2 text-sm text-template-text-primary">
                {body}
            </blockquote>
        </figure>
    );
};

export function PFTestimonialsSection({
    title,
    testimonials,
}: PF_TESTIMONIAL_SECTION) {
    const firstRow = testimonials.slice(0, testimonials.length / 2);
    const secondRow = testimonials.slice(testimonials.length / 2);
    return (
        <section
            id="testimonials"
            className="relative flex max-w-6xl mx-auto md:my-40 gap-10 flex-col items-center justify-center overflow-hidden"
        >
            <h1 className="text-4xl font-semibold md:text-6xl text-center text-template-text-primary">
                {title}
            </h1>
            <div>
                <Marquee pauseOnHover className="[--duration:20s]">
                    {firstRow.map((review, idx) => (
                        <ReviewCard key={idx} {...review} />
                    ))}
                </Marquee>
                <Marquee reverse pauseOnHover className="[--duration:20s]">
                    {secondRow.map((review, idx) => (
                        <ReviewCard key={idx} {...review} />
                    ))}
                </Marquee>
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-template-primary"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-template-primary"></div>
        </section>
    );
}
