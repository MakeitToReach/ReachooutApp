import React from "react";
import { PF_CATALOG_SECTION } from "../types/serviceCatalog.types";
import { PFCatalogServicesCarousel } from "../components/PFCatalogServicesCarousel";

export const PFCatalogSection = ({
    catalogServices,
    heading,
}: PF_CATALOG_SECTION) => {
    return (
        <section
            id="service-catalog"
            className="bg-template-secondary overflow-x-hidden py-10 text-template-text-secondary"
        >
            <div className="max-w-6xl mx-auto flex flex-col justify-center items-center px-4">
                <h2 className="text-center font-semibold text-4xl p-4">{heading}</h2>
                <PFCatalogServicesCarousel catalogServices={catalogServices} />
            </div>
        </section>
    );
};
