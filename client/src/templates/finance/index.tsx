import React from "react";
import { SectionBlock } from "@/schemas/templates.schema";
import {
  FAboutSection,
  FBlogsSection,
  FContactSection,
  FFaqSection,
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
  FStatsSection,
  FTeamSection,
  FTestimonialsSection,
  FTimelineSection,
  FWhyChooseUsSection,
} from "./sections";

type Props = {
  data: {
    sections: SectionBlock[];
    theme: Record<string, string>;
  };
};
export const FinancePortfolio = ({ data }: Props) => {
  if (!data) return <div>No data found</div>;

  const navSections = data.sections
    .filter((section) => section.isHidden === false)
    .map((section) => ({
      name: section.sectionName,
      href: `#${section.type}`,
    }));
  const renderSection = (section: SectionBlock, index: number) => {
    switch (section.type) {
      // case "navbar":
      //   return (
      //     <>
      //       <FNavbarSection
      //         key={`navbar-${index}`}
      //         {...section.data}
      //         sections={navSections}
      //       />
      //     </>
      //   );

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
      case "timeline":
        return (
          <>
            {!section.isHidden && (
              <FTimelineSection key={`about-${index}`} {...section.data} />
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
      case "stats":
        return (
          <>
            {!section.isHidden && (
              <FStatsSection key={`newsletter-${index}`} {...section.data} />
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
      case "faqs":
        return (
          <>
            {!section.isHidden && (
              <FFaqSection key={`faqs-${index}`} {...section.data} />
            )}
          </>
        );
      case "footer":
        return <FFooterSection key={`footer-${index}`} {...section.data} />;
      default:
        return null;
    }
  };

  const navbarSection = data?.sections.find(
    (section) => section.type === "navbar"
  );

  const otherSections = data?.sections.filter(
    (section) => section.type !== "navbar"
  );

  return (
    <>
      <div className="relative">
        {navbarSection && !navbarSection.isHidden && (
          <div className="sticky top-0 z-50 theme-wrapper text-template-text-primary" style={data.theme}>
            <FNavbarSection {...navbarSection.data} sections={navSections} />
          </div>
        )}
        {otherSections.map((section, idx) => (
          <div
            key={idx}
            style={data.theme}
            className="relative theme-wrapper overflow-x-hidden bg-template-primary px-4 sm:px-12"
          >
            {renderSection(section, idx)}
          </div>
        ))}
      </div>
    </>
  );
};
