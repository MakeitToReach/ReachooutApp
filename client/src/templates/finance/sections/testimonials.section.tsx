import { FButton } from "../components/FButton";
import { FTestimonialCard } from "../components/FTestimonialCard";
import { F_TESTIMONIAL_SECTION } from "../types/testimonials.types";

export const FTestimonialsSection = ({
    testimonials,
    title,
    description,
    btnText,
    btnLink,
    badgeText,
}: F_TESTIMONIAL_SECTION) => {
    return (
        <section id="testimonials" className="max-w-6xl mx-auto sm:py-20 py-10 px-4">
            <div className="flex flex-col sm:flex-row gap-10">
                {/* text content */}
                <div className="flex flex-col sm:gap-8 gap-10 sm:w-1/2 w-full text-template-text-primary">
                    <div className="w-fit rounded-full translate-x-10 bg-gradient-to-r from-template-primary to-template-accent-primary via-template-accent-primary/10 flex items-center justify-center px-4 py-2 uppercase font-semibold text-lg text-template-text-accent-primary">
                        {badgeText}
                    </div>
                    <h2 className="font-semibold sm:text-5xl text-3xl tracking-tight">
                        {title}
                    </h2>
                    <div
                        className="
    prose prose-sm max-w-none text-template-text-primary
    prose-p:text-template-text-primary
    prose-strong:text-template-text-primary
    prose-h1:text-template-text-primary
    prose-h2:text-template-text-primary
    prose-h3:text-template-text-primary
    prose-h4:text-template-text-primary
    prose-h5:text-template-text-primary
    prose-h6:text-template-text-primary
  "
                        dangerouslySetInnerHTML={{ __html: description }}
                    />

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
