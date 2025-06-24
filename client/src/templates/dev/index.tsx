import React from "react";
import { SectionBlock } from "@/schemas/templates.schema";
import { DevHeroSection } from "./sections/heroSection";
import { DevProjectSection } from "./sections/projectSection";
// import { DEV_STATIC_DATA } from "@/static_data/dev/DEVStaticData";

type Props = {
    data: {
        sections: SectionBlock[];
    };
};
export const DevPortfolio = ({ data }: Props) => {
    // const data = DEV_STATIC_DATA;
    //
    if (!data) return <div>No data found</div>;

    const renderSection = (section: SectionBlock, index: number) => {
        switch (section.type) {
            case "hero":
                return <DevHeroSection key={`hero-${index}`} {...section.data} />;
            case "projects":
                return <DevProjectSection key={`work-${index}`} {...section.data} />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen px-6 py-10 text-white font-Poppins bg-template-primary">
            <div className="max-w-5xl mx-auto space-y-8">
                {data.sections.map((section, idx) => (
                    <div key={idx} className="relative">
                        {renderSection(section, idx)}
                    </div>
                ))}
            </div>
        </div>
    );
};
