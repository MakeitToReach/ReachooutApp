"use client";
import React, { useEffect, useState } from "react";
import {
    PFNavbar,
    PFAboutSection,
    PFWorkSection,
    PFHeroSection,
    PFFooter,
    PFSocialSection,
    PFGallerySection,
    PFServicesSection,
    // PFClientSection,
} from "./sections";
import { PageLoader } from "@/components/editor-components/pageLoader";
import { AnimatePresence, motion as m } from "motion/react";

//eslint-disable-next-line
export const ProfessionalPortfolio = ({ data }: any) => {
    const [loading, setLoading] = useState(true);
    const { sections } = data;

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
                                professions={sections.heroSection.professions}
                                title={sections.heroSection.title}
                                btnLink={sections.heroSection.btnLink}
                                btnText={sections.heroSection.btnText}
                                heroImgUrl={sections.heroSection.heroImgUrl}
                            />
                        </div>
                        <PFAboutSection
                            stats={sections.aboutSection.stats}
                            title={sections.aboutSection.title}
                            colorTitle={sections.aboutSection.colorTitle}
                            description={sections.aboutSection.description}
                        />
                        <PFWorkSection projects={sections.workSection.projects} />
                        {/* <PFClientSection */}
                        {/*     title={sections.clientSection.title} */}
                        {/*     clientImgs={sections.clientSection.clientImgs} */}
                        {/*     colorTxt={sections.clientSection.colorTxt} */}
                        {/* /> */}
                        <PFSocialSection socials={sections.socialSection.socials} />

                        {sections.gallerySection && <PFGallerySection />}

                        <PFServicesSection services={sections.servicesSection.services} subtitle={sections.servicesSection.subtitle} />

                        <PFFooter />
                    </m.div>
                )}
            </AnimatePresence>
        </>
    );
};
