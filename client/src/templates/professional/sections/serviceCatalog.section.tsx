import React from "react";
import { PFCatalogCarousel } from "@/components/template-components/professional/serviceCatalogCarousel";
import { PF_CATALOG_SECTION } from "../types/serviceCatalog.types";

export const PFCatalogSection = ({ projects }: PF_CATALOG_SECTION) => {
    return (
        <section id="service-catalog" className="bg-template-secondary overflow-x-hidden py-10 text-template-text-secondary">
            <div className="max-w-6xl mx-auto flex flex-col justify-center items-center px-4">
                <h1 className="text-center font-semibold text-4xl p-4">Service Catalog</h1>
                <PFCatalogCarousel Projects={projects} />
            </div>
        </section>
    );
};
