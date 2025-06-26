import React from "react";
import { SectionBlock } from "@/schemas/templates.schema";
import {
    FAboutSection,
    FBlogsSection,
    FContactSection,
    FFeaturedServicesSection,
    FFooterSection,
    FGallerySection,
    FHeroSection,
    FLogoSection,
    FNavbarSection,
    FNewsletterSection,
    FProjectsSection,
    FServiceCatalogSection,
    FServicesSection,
    FTeamSection,
    FTestimonialsSection,
    FWhyChooseUsSection,
} from "./sections";

type Props = {
    data: {
        sections: SectionBlock[];
    };
};
export const FinancePortfolio = ({ data }: Props) => {
    if (!data) return <div>No data found</div>;

    const renderSection = (section: SectionBlock, index: number) => {
        switch (section.type) {
            case "navbar":
                return (
                    <>
                        <FNavbarSection
                            key={`navbar-${index}`}
                            {...section.data}
                        // sections={navSections}
                        />
                    </>
                );

            case "hero":
                return (
                    <>
                        {!section.isHidden && (
                            <FHeroSection key={`hero-${index}`} {...section.data} />
                        )}
                    </>
                );
            case "featured-services":
                return (
                    <>
                        {!section.isHidden && (
                            <FFeaturedServicesSection
                                key={`about-${index}`}
                                {...section.data}
                            />
                        )}
                    </>
                );
            case "about":
                return (
                    <>
                        {!section.isHidden && (
                            <FAboutSection key={`about-${index}`} {...section.data} />
                        )}
                    </>
                );
            case "projects":
                return (
                    <>
                        {!section.isHidden && (
                            <FProjectsSection key={`work-${index}`} {...section.data} />
                        )}
                    </>
                );
            case "services":
                return (
                    <>
                        {!section.isHidden && (
                            <FServicesSection key={`services-${index}`} {...section.data} />
                        )}
                    </>
                );
            case "newsletter":
                return (
                    <>
                        {!section.isHidden && (
                            <FNewsletterSection
                                key={`newsletter-${index}`}
                                {...section.data}
                            />
                        )}
                    </>
                );
            case "gallery":
                return (
                    <>
                        {!section.isHidden && (
                            <FGallerySection key={`gallery-${index}`} {...section.data} />
                        )}
                    </>
                );
            case "testimonials":
                return (
                    <>
                        {!section.isHidden && (
                            <FTestimonialsSection
                                key={`testimonials-${index}`}
                                {...section.data}
                            />
                        )}
                    </>
                );
            case "logos":
                return (
                    <>
                        {!section.isHidden && (
                            <FLogoSection key={`clients-${index}`} {...section.data} />
                        )}
                    </>
                );
            case "team":
                return (
                    <>
                        {!section.isHidden && (
                            <FTeamSection key={`team-${index}`} {...section.data} />
                        )}
                    </>
                );
            case "service-catalog":
                return (
                    <>
                        {!section.isHidden && (
                            <FServiceCatalogSection
                                key={`service-catalog-${index}`}
                                {...section.data}
                            />
                        )}
                    </>
                );
            case "why-choose-us":
                return (
                    <>
                        {!section.isHidden && (
                            <FWhyChooseUsSection
                                key={`service-catalog-${index}`}
                                {...section.data}
                            />
                        )}
                    </>
                );
            case "contact":
                return (
                    <>
                        {!section.isHidden && (
                            <FContactSection key={`contact-${index}`} {...section.data} />
                        )}
                    </>
                );
            case "blogs":
                return (
                    <>
                        {!section.isHidden && (
                            <FBlogsSection key={`blogs-${index}`} {...section.data} />
                        )}
                    </>
                );
            case "footer":
                return <FFooterSection key={`footer-${index}`} {...section.data} />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-template-primary">
            <div className="sm:px-12 px-4">
                {data.sections.map((section, idx) => (
                    <div key={idx} className="relative">
                        {renderSection(section, idx)}
                    </div>
                ))}
            </div>
        </div>
    );
};
