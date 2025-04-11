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

    // Categorize sections
    const fixedStartTypes = ["navbar", "hero"];
    const fixedEndTypes = ["contact", "footer"];

    const fixedStartSections = data.sections.filter((s) =>
        fixedStartTypes.includes(s.type),
    );
    const fixedEndSections = data.sections.filter((s) =>
        fixedEndTypes.includes(s.type),
    );
    const initialReorderable = data.sections.filter(
        (s) => !fixedStartTypes.includes(s.type) && !fixedEndTypes.includes(s.type),
    );

    const [reorderableSections, setReorderableSections] =
        useState<PF_SECTION_BLOCK[]>(initialReorderable);

    // Loader animation
    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timeout);
    }, []);

    // Render any section by type
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
                return (
                    <PFServicesSection key={`services-${index}`} {...section.data} />
                );
            case "contact":
                return <PFContactSection key={`contact-${index}`} />;
            case "footer":
                return <PFFooter key={`footer-${index}`} />;
            default:
                return null;
        }
    };

    // Move section up or down in reorderable list
    const moveSection = (from: number, to: number) => {
        const newSections = [...reorderableSections];
        const [moved] = newSections.splice(from, 1);
        newSections.splice(to, 0, moved);
        setReorderableSections(newSections);
    };

    // Combine all sections for display
    // const finalSections = [
    //     ...fixedStartSections,
    //     ...reorderableSections,
    //     ...fixedEndSections,
    // ];

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

            {!loading && (
                <div className="space-y-20 px-4 pt-10">
                    {fixedStartSections.map((s, i) => renderSection(s, i))}

                    {reorderableSections.map((section, index) => (
                        <div key={index} className="relative group border rounded p-2">
                            {renderSection(section, index)}

                            <div className="absolute right-2 top-2 flex flex-col space-y-1">
                                {index > 0 && (
                                    <button
                                        className="bg-gray-200 text-xs px-2 py-1 rounded"
                                        onClick={() => moveSection(index, index - 1)}
                                    >
                                        ↑ Move Up
                                    </button>
                                )}
                                {index < reorderableSections.length - 1 && (
                                    <button
                                        className="bg-gray-200 text-xs px-2 py-1 rounded"
                                        onClick={() => moveSection(index, index + 1)}
                                    >
                                        ↓ Move Down
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}

                    {fixedEndSections.map((s, i) => renderSection(s, i))}
                </div>
            )}
        </>
    );
};
