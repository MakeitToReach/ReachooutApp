import { ServicesCard } from "@/components/template-components/professional/servicesCard";
import React from "react";
import { PF_SERVICE_SECTION } from "../types/serviceSection";
import { motion as m } from "motion/react";

const delay = 0.15;

export const PFServicesSection = ({
    title,
    subtitle,
    services,
}: PF_SERVICE_SECTION) => {
    return (
        <section className="relative w-full bg-template-secondary">
            <div
                className="max-w-6xl mx-auto py-20 px-4 text-template-text-secondary"
                id="services"
            >
                <m.h1
                    initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                        duration: 0.5,
                        delay: delay,
                        ease: "easeOut",
                    }}
                    viewport={{ amount: 0.5, once: true }}
                    className="text-4xl font-semibold sm:text-6xl text-center"
                >
                    {title}
                </m.h1>
                <m.h2
                    initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                        duration: 0.5,
                        delay: delay * 2,
                        ease: "easeOut",
                    }}
                    viewport={{ amount: 0.5, once: true }}
                    className="text-center w-full sm:text-xl text-lg text-template-text-secondary/50 mt-8"
                >
                    {subtitle}
                </m.h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-10 justify-items-center">
                    {services.map((service, idx) => (
                        <m.div
                            key={idx}
                            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{
                                duration: 0.5,
                                delay: delay * idx,
                                ease: "easeOut",
                            }}
                            viewport={{ amount: 0.5, once: true }}
                        >
                            <ServicesCard
                                key={idx}
                                icon={service.icon}
                                heading={service.heading}
                                description={service.description}
                            />
                        </m.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
