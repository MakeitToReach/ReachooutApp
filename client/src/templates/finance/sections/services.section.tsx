import { FServicesCarousel } from "../components/FServicesCarousel";
import { F_SERVICE_SECTION } from "../types/services.types";

export const FServicesSection = ({
    badgeText,
    title,
    subtitle,
    services,
}: F_SERVICE_SECTION) => {
    return (
        <section id="services" className="w-full rounded-lg min-h-[90vh] bg-template-secondary overflow-hidden my-14 px-6 py-4">
            <div className="max-w-6xl mx-auto h-full text-white my-10 space-y-8 overflow-x-visible">
                <div className="w-fit rounded-full translate-x-10 bg-gradient-to-r from-template-secondary/50 via-template-secondary to-black/70 flex items-center justify-center px-4 py-2 uppercase font-semibold text-lg">
                    {badgeText}
                </div>
                <div className="space-y-2">
                    <h2 className="font-semibold sm:text-5xl text-3xl tracking-tight">
                        {title}
                    </h2>
                    <h4>{subtitle}</h4>
                </div>
                <div className="sm:w-[130vw] rounded-lg">
                <FServicesCarousel services={services} />
                </div>
            </div>
        </section>
    );
};
