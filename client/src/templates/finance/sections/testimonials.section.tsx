import { FButton } from "../components/FButton";
import { FTestimonialCard } from "../components/FTestimonialCard";
import { F_TESTIMONIAL_SECTION } from "../types/testimonials.types";

export const FTestimonialsSection = ({
    badgeText,
    title,
    description,
    btnText,
    btnLink,
    testimonials,
}: F_TESTIMONIAL_SECTION) => {
    return (
        <section id="testimonials" className="max-w-6xl mx-auto sm:py-20 py-10 px-4">
            <div className="flex flex-col sm:flex-row gap-10">
                {/* text content */}
                <div className="flex flex-col sm:gap-8 gap-10 sm:w-1/2 w-full">
                    <div className="w-fit rounded-full translate-x-10 bg-gradient-to-r from-gray-100 to-green-200 via-green-100 flex items-center justify-center px-4 py-2 uppercase font-semibold text-lg">
                        {badgeText}
                    </div>
                    <h2 className="font-semibold sm:text-5xl text-3xl tracking-tight">
                        {title}
                    </h2>
                    <p className="line-clamp-2">{description}</p>

                    <div className="flex gap-10 items-center">
                        <a href={btnLink}>
                            <FButton btnText={btnText} className="py-7 px-10" />
                        </a>
                    </div>
                </div>

                <div className="flex flex-col sm:gap-8 gap-10 sm:w-1/2 w-full">
                    {testimonials.map((card, index) => (
                        <FTestimonialCard
                            key={index}
                            avatarUrl={card.avatarUrl}
                            name={card.name}
                            description={card.message}
                            designation={card.designation}
                            rating={card.rating}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
