import { Separator } from "@/components/ui/separator";
import { FFeaturedServiceCard } from "../components/FfeaturedServiceCard";
import { F_FEATURED_SERVICE_SECTION } from "../types/featured-services.types";
import { motion } from "framer-motion";

export const FFeaturedServicesSection = ({
    featuredServices,
}: F_FEATURED_SERVICE_SECTION) => {
    return (
        <section id="featured-services">
            <div className="max-w-6xl mx-auto py-10">
                {/* Add staggered fade-in and slide-up animation using Framer Motion */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 items-stretch">
                    {featuredServices.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.15,
                                ease: "easeOut",
                            }}
                            className="w-full"
                        >
                            <FFeaturedServiceCard
                                icon={service.icon}
                                title={service.title}
                                subtitle={service.subtitle}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
            <Separator />
        </section>
    );
};
