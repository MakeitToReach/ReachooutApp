"use client";
import React, { useEffect, useState } from "react";
import {
    PFNavbar,
    PFAboutSection,
    PFWorkSection,
    PFHeroSection,
    PFFooter,
} from "./sections";
import { PageLoader } from "@/components/editor-components/pageLoader";
import { AnimatePresence, motion as m } from "motion/react";
import { PF_STATIC_STATS } from "@/static_data/professional/stats";
import { PF_STATIC_PROJECTS } from "@/static_data/professional/projects";

export const ProfessionalPortfolio = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000); // Adjust duration if needed
    }, []);

    return (
        <>
            {/* Loader Animation */}
            <AnimatePresence mode="wait">
                {loading && (
                    <m.div
                        key="loader"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: 0.5,
                            stiffness: 100,
                            damping: 20,
                            mass: 0.5,
                        }}
                        className="fixed inset-0 flex items-center justify-center bg-white"
                    >
                        <PageLoader />
                    </m.div>
                )}
            </AnimatePresence>

            {/* Main Content Animation */}
            <AnimatePresence>
                {!loading && (
                    <m.div
                        key="content"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }} // Delay to smooth transition
                        className="space-y-20 w-full"
                    >
                        <div className="space-y-10">
                            <PFNavbar />
                            <PFHeroSection
                                title="Hi, I'm John Doe"
                                professions={["Founder"]}
                                btnText="Visit our Website"
                                btnLink="/"
                                heroImgUrl="https://github.com/shadcn.png"
                            />
                        </div>
                        <PFAboutSection
                            stats={PF_STATIC_STATS}
                            title="Founder of"
                            colorTitle="INCUBE COMPANY"
                            description="lorem100"
                        />
                        <PFWorkSection projects={PF_STATIC_PROJECTS} />
                        <PFFooter />
                    </m.div>
                )}
            </AnimatePresence>
        </>
    );
};
