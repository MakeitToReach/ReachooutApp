import { Separator } from "@/components/ui/separator";
import { FeaturedServiceCard } from "../components/FfeaturedServiceCard";

const FEAT_SERVICES_STATIC_DATA = [
    {
        title: "Global Accounting",
        description: "Expert accounting services for global businesses",
    },
    {
        title: "Tax Consulting",
        description: "Optimize your taxes with expert consulting planning",
    },
    {
        title: "Admin Services",
        description: "Streamline your operations with our administrative services",
    },
];
export const FFeaturedServicesSection = () => {
    return (
        <section>
            <div className="max-w-6xl mx-auto py-10">
                <div className="flex flex-col sm:flex-row gap-10 items-center">
                    {FEAT_SERVICES_STATIC_DATA.map((service, index) => (
                        <FeaturedServiceCard
                            key={index}
                            title={service.title}
                            description={service.description}
                        />
                    ))}
                </div>
            </div>
            <Separator />
        </section>
    );
};
