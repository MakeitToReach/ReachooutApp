import {
  PFNavbar,
  PFAboutSection,
  PFWorkSection,
  PFHeroSection,
  PFFooter,
  PFServicesSection,
  PFContactSection,
  PFTestimonialsSection,
  PFClientSection,
  PFGallerySection,
  PFTeamMembersSection,
  PFWidgetsSection,
  PFSocialSection,
  PFFaqSection,
  PFBlogSection,
  PFCatalogSection,
  PFNewsletterSection,
  PFCertificationSection,
} from "./sections";
// import { PageLoader } from "@/components/editor-components/pageLoader";
// import { motion as m } from "motion/react";
import type { SectionBlock } from "@/schemas/templates.schema";
import { PFExperienceSection } from "./sections/experience.section";
import { Loading } from "@/components/editor-components/loading";

type Props = {
  data: {
    sections: SectionBlock[];
    theme: Record<string, string>;
  };
};

export const ProfessionalPortfolio = ({ data }: Props) => {
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
      //     <div className="sticky top-0 left-0 z-50">
      //       <PFNavbar
      //         key={`navbar-${index}`}
      //         {...section.data}
      //         sections={navSections}
      //       />
      //     </div>
      //   );

      case "hero":
        return (
          <>
            {!section.isHidden && (
              <PFHeroSection key={`hero-${index}`} {...section.data} />
            )}
          </>
        );

      case "socials":
        return (
          <>
            {!section.isHidden && (
              <PFSocialSection key={`social-${index}`} {...section.data} />
            )}
          </>
        );
      case "experience":
        return (
          <>
            {!section.isHidden && (
              <PFExperienceSection
                key={`experience-${index}`}
                {...section.data}
              />
            )}
          </>
        );

      case "faqs":
        return (
          <>
            {!section.isHidden && (
              <PFFaqSection key={`faqs-${index}`} {...section.data} />
            )}
          </>
        );
      case "about":
        return (
          <>
            {!section.isHidden && (
              <PFAboutSection key={`about-${index}`} {...section.data} />
            )}
          </>
        );
      case "blogs":
        return (
          <>
            {!section.isHidden && (
              <PFBlogSection key={`blogs-${index}`} {...section.data} />
            )}
          </>
        );
      case "projects":
        return (
          <>
            {!section.isHidden && (
              <PFWorkSection key={`work-${index}`} {...section.data} />
            )}
          </>
        );
      case "services":
        return (
          <>
            {!section.isHidden && (
              <PFServicesSection key={`services-${index}`} {...section.data} />
            )}
          </>
        );
      case "gallery":
        return (
          <>
            {!section.isHidden && (
              <PFGallerySection key={`gallery-${index}`} {...section.data} />
            )}
          </>
        );
      case "testimonials":
        return (
          <>
            {!section.isHidden && (
              <PFTestimonialsSection
                key={`testimonials-${index}`}
                {...section.data}
              />
            )}
          </>
        );
      case "client":
        return (
          <>
            {!section.isHidden && (
              <PFClientSection key={`clients-${index}`} {...section.data} />
            )}
          </>
        );
      case "team":
        return (
          <>
            {!section.isHidden && (
              <PFTeamMembersSection key={`team-${index}`} {...section.data} />
            )}
          </>
        );
      case "service-catalog":
        return (
          <>
            {!section.isHidden && (
              <PFCatalogSection
                key={`service-catalog-${index}`}
                {...section.data}
              />
            )}
          </>
        );
      case "newsletter":
        return (
          <>
            {!section.isHidden && (
              <PFNewsletterSection
                key={`newsletter-${index}`}
                {...section.data}
              />
            )}
          </>
        );
      case "contact":
        return (
          <>
            {!section.isHidden && (
              <PFContactSection key={`contact-${index}`} {...section.data} />
            )}
          </>
        );
      case "certifications":
        return (
          <>
            {!section.isHidden && (
              <PFCertificationSection key={`certifications-${index}`} {...section.data} />
            )}
          </>
        );
      case "footer":
        return <PFFooter key={`footer-${index}`} {...section.data} />;
      default:
        return null;
    }
  };

  const widgetsSection = data?.sections.find(
    (section) => section.type === "contact widgets"
  );

  const navbarSection = data?.sections.find(
    (section) => section.type === "navbar"
  );

  const otherSections = data?.sections.filter(
    (section) => section.type !== "contact widgets" && section.type !== "navbar"
  );

  return (
    <>
      {navbarSection && !navbarSection.isHidden && (
        <div
          className="sticky top-0 z-50 theme-wrapper text-template-text-primary"
          style={data.theme}
        >
          <PFNavbar {...navbarSection.data} sections={navSections} />
        </div>
      )}
      <div className="relative overflow-x-hidden">
        {data ? (
          otherSections.map((section, index) => (
            <div
              key={index}
              style={data.theme}
              className="theme-wrapper bg-template-primary"
            >
              {renderSection(section, index)}
            </div>
          ))
        ) : (
          <Loading />
        )}
      </div>

      {widgetsSection && !widgetsSection.isHidden && (
        <div className="fixed md:bottom-10 md:right-10 bottom-4 right-4 z-10">
          <PFWidgetsSection {...widgetsSection.data} />
        </div>
      )}
    </>
  );
};
