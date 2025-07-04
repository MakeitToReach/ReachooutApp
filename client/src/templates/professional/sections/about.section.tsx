import { PF_ABOUT_SECTION } from "../types/about.types";
import { motion as m } from "motion/react";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { ReadMorePopup } from "@/components/editor-components/popups/readMorePopup";
import { splitNumericValue } from "@/lib/utils";

export const PFAboutSection = ({
    title,
    colorTitle,
    description,
    stats,
}: PF_ABOUT_SECTION) => {
    const animateVariants = {
        initial: {
            opacity: 0,
            y: 20,
            filter: "blur(10px)",
        },
        animate: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                duration: 0.5,
            },
        },
    };

    const trimmedDescription = description.trim();
    const isLong = trimmedDescription.length > 500;
    const visibleText = isLong
        ? `${trimmedDescription.slice(0, 500)}...`
        : trimmedDescription;

    const paragraphs = visibleText
        .split(/\n{2,}/)
        .filter((para) => para.trim() !== "");
    return (
        <section className="max-w-6xl mx-auto" id="about">
            <div className="px-4 lg:px-0 flex flex-col lg:flex-row w-full lg:gap-20 lg:mt-20">
                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-2  lg:gap-5 lg:gap-y-2 lg:mt-20 h-fit lg:w-1/2">
                    {/* Stat card example */}
                    <div className="flex flex-col justify-center items-center rounded-sm bg-template-accent-secondary max-h-48 p-10 overflow-hidden">
                        <div className="flex items-baseline gap-1">
                            <NumberTicker
                                value={splitNumericValue(stats[0].value).number}
                                className="font-bold text-5xl lg:text-7xl text-template-text-accent-secondary"
                            />
                            <span className="font-bold text-3xl lg:text-5xl text-template-text-accent-secondary">
                                {splitNumericValue(stats[0].value).suffix}
                            </span>
                        </div>
                        <h2 className="mt-2 text-xl lg:text-2xl w-full text-center text-template-text-accent-secondary">
                            {stats[0].title}
                        </h2>
                    </div>
                    <div className="flex flex-col justify-center items-center rounded-sm bg-template-accent-primary max-h-48 p-10 overflow-hidden">
                        <div className="flex items-baseline gap-1">
                            <NumberTicker
                                value={splitNumericValue(stats[1].value).number}
                                className="font-bold text-5xl lg:text-7xl text-template-text-accent-primary"
                            />
                            <span className="font-bold text-3xl lg:text-5xl text-template-text-accent-primary">
                                {splitNumericValue(stats[1].value).suffix}
                            </span>
                        </div>
                        <h2 className="mt-2 text-xl lg:text-2xl w-full text-center text-template-text-accent-primary">
                            {stats[1].title}
                        </h2>
                    </div>
                    <div className="flex flex-col justify-center items-center rounded-sm bg-template-accent-primary max-h-48 p-10 overflow-hidden">
                        <div className="flex items-baseline gap-1">
                            <NumberTicker
                                value={splitNumericValue(stats[2].value).number}
                                className="font-bold text-5xl lg:text-7xl text-template-text-accent-primary"
                            />
                            <span className="font-bold text-3xl lg:text-5xl text-template-text-accent-primary">
                                {splitNumericValue(stats[2].value).suffix}
                            </span>
                        </div>
                        <h2 className="mt-2 text-xl lg:text-2xl w-full text-center text-template-text-accent-primary">
                            {stats[2].title}
                        </h2>
                    </div>
                    <div className="flex flex-col justify-center items-center rounded-sm bg-template-accent-secondary max-h-48 p-10 overflow-hidden">
                        <div className="flex items-baseline gap-1">
                            <NumberTicker
                                value={splitNumericValue(stats[3].value).number}
                                className="font-bold text-5xl lg:text-7xl text-template-text-accent-secondary"
                            />
                            <span className="font-bold text-3xl lg:text-5xl text-template-text-accent-secondary">
                                {splitNumericValue(stats[3].value).suffix}
                            </span>
                        </div>
                        <h2 className="mt-2 text-xl lg:text-2xl w-full text-center text-template-text-accent-secondary">
                            {stats[3].title}
                        </h2>
                    </div>
                </div>
                {/* Content */}
                <div className="flex flex-col gap-6 mt-8 lg:mt-0 lg:w-3/5">
                    <m.h1
                        variants={animateVariants}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ amount: 1, once: true }}
                        className="text-3xl lg:text-5xl font-semibold text-template-text-primary"
                    >
                        About Me
                    </m.h1>
                    <m.h2
                        variants={animateVariants}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ amount: 1, once: true }}
                        className="uppercase font-medium text-template-text-primary"
                    >
                        {title}{" "}
                        <span className="text-template-accent-secondary">{colorTitle}</span>
                    </m.h2>
                    <m.div
                        variants={animateVariants}
                        whileInView={"animate"}
                        initial={"initial"}
                        viewport={{ amount: 1, once: true }}
                    >
                        {paragraphs.map((para, index) => (
                            <p
                                key={index}
                                className="text-template-text-primary leading-relaxed mb-4 whitespace-pre-line"
                            >
                                {para.trim()}
                            </p>
                        ))}

                        {isLong && (
                            <ReadMorePopup content={description}>
                                <p className="underline" role="button">
                                    Read more
                                </p>
                            </ReadMorePopup>
                        )}
                    </m.div>
                    {/* <ul className="grid grid-cols-2 gap-y-3 gap-x-4 mt-2"> */}
                    {/*     <li className="flex items-center"> */}
                    {/*         <span className="inline-block w-4 h-4 mr-2 bg-[#fbe8d3] rounded-sm"></span> */}
                    {/*         <span className="font-medium">Centers in 3+ cities</span> */}
                    {/*     </li> */}
                    {/*     <li className="flex items-center"> */}
                    {/*         <span className="inline-block w-4 h-4 mr-2 bg-[#d6eef8] rounded-sm"></span> */}
                    {/*         <span className="font-medium">Founded in 2017</span> */}
                    {/*     </li> */}
                    {/*     <li className="flex items-center"> */}
                    {/*         <span className="inline-block w-4 h-4 mr-2 bg-[#d6eef8] rounded-sm"></span> */}
                    {/*         <span className="font-medium"> */}
                    {/*             Savitribai Phule Pune University */}
                    {/*         </span> */}
                    {/*     </li> */}
                    {/*     <li className="flex items-center"> */}
                    {/*         <span className="inline-block w-4 h-4 mr-2 bg-[#fbe8d3] rounded-sm"></span> */}
                    {/*         <span className="font-medium">100% +ve reviews</span> */}
                    {/*     </li> */}
                    {/* </ul> */}{" "}
                </div>
            </div>
        </section>
    );
};
