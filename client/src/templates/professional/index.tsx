"use client";
// import React, { useEffect, useState } from "react";
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
} from "./sections";
// import { PageLoader } from "@/components/editor-components/pageLoader";
import { motion as m } from "motion/react";
import type { SectionBlock } from "@/schemas/templates.schema";

type Props = {
  data: {
    sections: SectionBlock[];
    theme: Record<string, string>;
  };
};

export const ProfessionalPortfolio = ({ data }: Props) => {
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //     const timeout = setTimeout(() => {
  //         setLoading(false);
  //     }, 1000);
  //     return () => clearTimeout(timeout);
  // }, []);

  const renderSection = (section: SectionBlock, index: number) => {
    switch (section.type) {
      case "navbar":
        return <PFNavbar key={`navbar-${index}`} {...section.data} />;
      case "hero":
        return <PFHeroSection key={`hero-${index}`} {...section.data} />;
      case "about":
        return <PFAboutSection key={`about-${index}`} {...section.data} />;
      case "projects":
        return <PFWorkSection key={`work-${index}`} {...section.data} />;
      case "services":
        return (
          <PFServicesSection key={`services-${index}`} {...section.data} />
        );
      case "gallery":
        return <PFGallerySection key={`gallery-${index}`} {...section.data} />;
      case "testimonials":
        return (
          <PFTestimonialsSection
            key={`testimonials-${index}`}
            {...section.data}
          />
        );
      case "client":
        return <PFClientSection key={`clients-${index}`} {...section.data} />;
      case "team":
        return <PFTeamMembersSection key={`team-${index}`} {...section.data} />;
      case "contact":
        return <PFContactSection key={`contact-${index}`} />;
      case "footer":
        return <PFFooter key={`footer-${index}`} {...section.data} />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* <AnimatePresence mode="wait"> */}
      {/*     {loading && ( */}
      {/*         <m.div */}
      {/*             key="loader" */}
      {/*             initial={{ opacity: 0 }} */}
      {/*             animate={{ opacity: 1 }} */}
      {/*             exit={{ opacity: 0 }} */}
      {/*             transition={{ */}
      {/*                 duration: 0.5, */}
      {/*             }} */}
      {/*             className="fixed inset-0 flex items-center justify-center bg-white" */}
      {/*         > */}
      {/*             <PageLoader /> */}
      {/*         </m.div> */}
      {/*     )} */}
      {/* </AnimatePresence> */}

      {/* {!loading && ( */}
      <m.div
        initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        transition={{
          duration: 0.8,
        }}
        className="space-y-20 bg-template-primary"
      >
        {data ? (
          data.sections.map((section, index) => (
            <div
              key={index}
              style={data.theme}
              className="relative theme-wrapper"
            >
              {renderSection(section, index)}
            </div>
          ))
        ) : (
          <div>Loading</div>
        )}
      </m.div>
    </>
  );
};
