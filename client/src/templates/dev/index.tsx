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
        <div className="min-h-screen px-6 py-10 text-white bg-gradient-to-br from-black via-gray-900 to-gray-800 font-sans">
            <div className="max-w-5xl mx-auto space-y-8">
                {data.sections.map((section, idx) => (
                    <div key={idx} className="relative">
                        {renderSection(section, idx)}
                    </div>
                ))}

                {/* <section> */}
                {/*     <h2 className="font-semibold text-lg">Work Experience</h2> */}
                {/*     <p className="text-sm font-semibold"> */}
                {/*         SDE-1 Intern at Engineer&apos;s Cradle{" "} */}
                {/*         <a href="#" target="_blank" rel="noreferrer"> */}
                {/*             <ExternalLink className="inline w-4 h-4" /> */}
                {/*         </a> */}
                {/*     </p> */}
                {/*     <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1 mt-1"> */}
                {/*         <li> */}
                {/*             Worked on the frontend development of the company’s website */}
                {/*         </li> */}
                {/*         <li>Contributed in integration of the API with the frontend</li> */}
                {/*         <li>Developed the landing page for the company’s website</li> */}
                {/*     </ul> */}
                {/* </section> */}

                {/* <section> */}
                {/*     <h2 className="font-semibold text-lg mb-2">Skills</h2> */}
                {/*     <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1"> */}
                {/*         <li> */}
                {/*             <strong>Languages</strong> – JavaScript, TypeScript, Python, C++, */}
                {/*             Go */}
                {/*         </li> */}
                {/*         <li> */}
                {/*             <strong>Frontend</strong> – React, TailwindCSS, NextJS, HTML, CSS */}
                {/*         </li> */}
                {/*         <li> */}
                {/*             <strong>Backend</strong> – NodeJS, ExpressJS, Fiber/Go */}
                {/*         </li> */}
                {/*         <li> */}
                {/*             <strong>Mobile Dev</strong> – React Native */}
                {/*         </li> */}
                {/*     </ul> */}
                {/* </section> */}
            </div>
        </div>
    );
};
