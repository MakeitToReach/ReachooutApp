import { ServicesCard } from "@/components/template-components/professional/servicesCard";
import React from "react";
import { PF_SERVICE_SECTION } from "../types/serviceSection";

export const PFServicesSection = ({
    title,
    subtitle,
    services,
}: PF_SERVICE_SECTION) => {
    return (
        <section
            className="max-w-6xl mx-auto py-20 px-4 text-template-text-primary"
            id="services"
        >
            <h1 className="text-3xl font-semibold md:text-6xl text-center">
                {title}
            </h1>

            <h2 className="text-center text-xl text-neutral-400 mt-10">{subtitle}</h2>
            <div className="flex flex-col md:flex-row gap-3 mt-10">
                {services.map((service, idx) => (
                    <ServicesCard
                        key={idx}
                        icon={service.icon}
                        heading={service.heading}
                        description={service.description}
                    />
                ))}
            </div>
        </section>
    );
};
