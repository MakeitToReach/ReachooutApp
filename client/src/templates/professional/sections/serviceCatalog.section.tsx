import React from "react";
import { PF_CATALOG_SECTION } from "../types/serviceCatalog.types";
import { PFCatalogServicesCarousel } from "../components/PFCatalogServicesCarousel";
import { motion as m } from "motion/react";

const delay = 0.15;

export const PFCatalogSection = ({
  catalogServices,
  heading,
}: PF_CATALOG_SECTION) => {
  return (
    <section
      id="service-catalog"
      className="bg-template-secondary overflow-x-hidden py-10 text-template-text-secondary"
    >
      <div className="max-w-6xl mx-auto flex flex-col justify-center px-4">
        <m.h1
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.5,
            delay: delay,
            ease: "easeOut",
          }}
          viewport={{ amount: 0.5, once: true }}
          className="text-center font-semibold text-4xl sm:text-6xl p-4 mb-4"
        >
          {heading}
        </m.h1>
        <PFCatalogServicesCarousel catalogServices={catalogServices} />
      </div>
    </section>
  );
};
