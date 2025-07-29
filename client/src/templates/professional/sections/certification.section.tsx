"use client";
import React from "react";
import { PF_CERTIFICATION_SECTION } from "../types/certification.types";
import { PFCertificationCarousel } from "../components/PFCertificationCarousel";
import { motion as m } from "motion/react";

const delay = 0.15;

export const PFCertificationSection = ({
    heading,
    certifications,
}: PF_CERTIFICATION_SECTION) => {
    return (
        <section className="relative w-full bg-template-secondary">
            <div
                id="certifications"
                className="max-w-6xl mx-auto text-center overflow-hidden py-20"
            >
                <m.h1
                    initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                        duration: 0.5,
                        delay: delay,
                        ease: "easeOut",
                    }}
                    viewport={{ amount: 1, once: true }}
                    className="text-4xl font-semibold text-template-text-secondary sm:text-6xl text-center mb-10"
                >
                    {heading}
                </m.h1>
                <PFCertificationCarousel certifications={certifications} />
            </div>
        </section>
    );
};
