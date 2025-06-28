import { Separator } from "@/components/ui/separator";
import { FeaturedServiceCard } from "../components/FfeaturedServiceCard";
import { F_FEATURED_SERVICE_SECTION } from "../types/featured-services.types";

export const FFeaturedServicesSection = ({
    featuredServices,
}: F_FEATURED_SERVICE_SECTION) => {
    return (
        <section id="featured-services">
            <div className="max-w-6xl mx-auto py-10">
                <div className="flex flex-col sm:flex-row gap-10 items-center">
                    {featuredServices.map((service, index) => (
                        <FeaturedServiceCard
                            key={index}
                            icon={service.icon}
                            title={service.title}
                            subtitle={service.subtitle}
                        />
                    ))}
                </div>
            </div>
            <Separator />
        </section>
    );
};
