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
    PFContactSection,
} from "./sections";
import { PageLoader } from "@/components/editor-components/pageLoader";
import { AnimatePresence, motion as m } from "motion/react";
import { PF_SECTION_BLOCK } from "./schema/PFTemplateSchema";

type Props = {
    data: {
        sections: PF_SECTION_BLOCK[];
    };
};

export const ProfessionalPortfolio = ({ data }: Props) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timeout);
    }, []);

    const renderSection = (section: PF_SECTION_BLOCK, index: number) => {
        switch (section.type) {
            case "navbar":
                return <PFNavbar key={`navbar-${index}`} />;
            case "hero":
                return <PFHeroSection key={`hero-${index}`} {...section.data} />;
            case "about":
                return <PFAboutSection key={`about-${index}`} {...section.data} />;
            case "projects":
                return <PFWorkSection key={`work-${index}`} {...section.data} />;
            case "social":
                return <PFSocialSection key={`social-${index}`} {...section.data} />;
            case "gallery":
                return <PFGallerySection key={`gallery-${index}`} {...section.data} />;
            case "services":
                return <PFServicesSection key={`services-${index}`} {...section.data} />;
            case "contact":
                return <PFContactSection key={`contact-${index}`} />;
            case "footer":
                return <PFFooter key={`footer-${index}`} />;
            default:
                return null;
        }
    };

    return (
        <>
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

            {!loading && (
                <div className="space-y-20 px-4">
                    {data.sections.map((section, index) => (
                        <div key={index} className="relative p-2">
                            {renderSection(section, index)}
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};
