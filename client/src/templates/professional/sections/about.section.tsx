import { PF_ABOUT_SECTION } from "../types/about.types";
import { motion as m } from "motion/react";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { splitNumericValue } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ViewMoreDrawer } from "@/components/template-components/professional/viewMoreDrawer";

export const PFAboutSection = ({
    title,
    colorTitle,
    description,
    heading,
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
    return (
        <section className="max-w-6xl mx-auto py-20" id="about">
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
                <div className="flex flex-col gap-4 mt-8 lg:mt-0 lg:w-3/5">
                    <m.h1
                        variants={animateVariants}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ amount: 1, once: true }}
                        className="text-4xl sm:text-5xl font-semibold text-template-text-primary"
                    >
                        {heading}
                    </m.h1>
                    <m.h2
                        variants={animateVariants}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ amount: 1, once: true }}
                        className="uppercase font-medium text-template-text-primary text-xl"
                    >
                        {title}{" "}
                        <span className="text-template-text-accent-tertiary">
                            {colorTitle}
                        </span>
                    </m.h2>
                    <div
                        className="
    prose prose-xl sm:prose-lg max-w-none text-template-text-primary
    prose-p:text-template-text-primary
    prose-strong:text-template-text-primary
    prose-h1:text-template-text-primary
    prose-h2:text-template-text-primary
    prose-h3:text-template-text-primary
    prose-h4:text-template-text-primary
    prose-h5:text-template-text-primary
    prose-h6:text-template-text-primary
  "
                        dangerouslySetInnerHTML={{ __html: description }}
                    />
                    <ViewMoreDrawer type="About" content={description}>
                        <Button className="self-start rounded-sm bg-template-btn text-template-text-btn text-lg">
                            Read more
                        </Button>
                    </ViewMoreDrawer>
                </div>
            </div>
        </section>
    );
};
