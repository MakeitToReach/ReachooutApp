import { FServicesCard } from "../components/FServicesCard";

export const FServiceCatalogSection = () => {
    return (
        <section className="w-full rounded-lg h-[90vh] bg-template-secondary overflow-hidden my-14 px-6 py-4">
            <div className="max-w-6xl mx-auto h-full text-white my-10 space-y-8 overflow-x-visible">
                <div className="w-fit rounded-full translate-x-10 bg-gradient-to-r from-template-secondary/50 via-template-secondary to-black/70 flex items-center justify-center px-4 py-2 uppercase font-semibold text-lg">
                    Our services
                </div>
                <div className="space-y-2">
                    <h2 className="font-semibold sm:text-5xl text-3xl tracking-tight">
                        Service Catalog
                    </h2>
                    <h4>Full-service accouting to drive your financial success</h4>
                </div>
                <div className="w-[100vw] bg-black rounded-lg">
                    <FServicesCard
                        imgUrl="/placeholder.png"
                        title="Tax Planning"
                        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore officiis facere qui quisquam at molestiae incidunt vel totam expedita nihil."
                    />
                </div>
            </div>
        </section>
    );
};
