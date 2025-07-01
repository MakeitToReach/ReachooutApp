import { FFaqAccordion } from "../components/FFaqAccordion";
import { FFAQ_SECTION } from "../types/faq.types";

export const FFaqSection = ({heading, faqs}: FFAQ_SECTION) => {
    return (
        <section id="faqs" className="w-full rounded-lg bg-template-secondary overflow-hidden my-14 px-6 py-4">
            <div className="max-w-6xl mx-auto h-full text-white my-10 space-y-8 overflow-x-visible">
                <h2 className="font-semibold text-left sm:text-5xl text-3xl tracking-tight text-template-text-secondary">
                    {heading}
                </h2>
                <div className="w-ful rounded-lg">
                    <FFaqAccordion faqs={faqs} />
                </div>
            </div>
        </section>
    );
};
