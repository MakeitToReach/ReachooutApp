"use client";
import React from "react";
import { F_CERTIFICATION_SECTION } from "../types/certification.types";
import { FCertificationCarousel } from "../components/FCertificationCarousel";
import { motion as m } from "motion/react";

const delay = 0.15;

export const FCertificationSection = ({
    heading,
    subHeading,
    certifications,
}: F_CERTIFICATION_SECTION) => {
    return (
        <section className="py-20">
            <div
                id="certifications"
                className="w-full rounded-lg bg-template-secondary overflow-hidden px-6 py-4"
            >
                <div className="max-w-6xl mx-auto h-full text-white my-10 space-y-8 overflow-x-visible">
                    <m.h2
                        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                            duration: 0.5,
                            delay: delay,
                            ease: "easeOut",
                        }}
                        className="font-semibold sm:text-5xl text-4xl tracking-tight text-center text-template-text-secondary"
                    >
                        {heading}
                    </m.h2>
                    {subHeading && (
                        <m.p
                            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{
                                duration: 0.5,
                                delay: delay * 2,
                                ease: "easeOut",
                            }}
                            className="text-center text-xl line-clamp-4 text-template-text-secondary/80"
                        >
                            {subHeading}
                        </m.p>
                    )}
                    <div className="rounded-lg">
                        <FCertificationCarousel certifications={certifications} />
                    </div>
                </div>
            </div>
        </section>
    );
}; 
