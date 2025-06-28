import { FCatalogServicesCarousel } from "../components/FCatalogServicesCarousel";
import { F_SERVICE_CATALOG_SECTION } from "../types/service-catalog.types";

export const FServiceCatalogSection = ({
    badgeText,
    title,
    subtitle,
    catalogServices,
}: F_SERVICE_CATALOG_SECTION) => {
    return (
        <section id="service-catalog" className="w-full rounded-lg min-h-[90vh] bg-template-secondary overflow-hidden my-14 px-6 py-4">
            <div className="max-w-6xl mx-auto h-full my-10 space-y-8 overflow-x-visible text-template-text-secondary">
                <div className="w-fit rounded-full translate-x-10 bg-gradient-to-r from-template-secondary/50 via-template-secondary to-black/30 flex items-center justify-center px-4 py-2 uppercase font-semibold text-lg">
                    {badgeText}
                </div>
                <div className="space-y-2">
                    <h2 className="font-semibold sm:text-5xl text-3xl tracking-tight">
                        {title}
                    </h2>
                    <h4 className="text-template-text-secondary/80">{subtitle}</h4>
                </div>
                <div className="sm:w-[130vw] rounded-lg">
                    <FCatalogServicesCarousel catalogServices={catalogServices} />
                </div>
            </div>
        </section>
    );
};
