import { PF_ABOUT_SECTION } from "../types/about.types";
import { motion as m } from "motion/react";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { cn, splitNumericValue } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ViewMoreDrawer } from "@/components/template-components/professional/viewMoreDrawer";

const delay = 0.15;

export const PFAboutSection = ({
  title,
  colorTitle,
  description,
  heading,
  stats,
}: PF_ABOUT_SECTION) => {
  const aboutContent = { title, colorTitle, description, heading, stats };
  return (
    <section className="max-w-6xl mx-auto py-20" id="about">
      <div className="px-4 lg:px-0 flex flex-col lg:flex-row w-full lg:gap-20 lg:mt-20">
        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-2  lg:gap-5 lg:gap-y-2 lg:mt-20 h-fit lg:w-1/2">
          <m.div
            initial={{ opacity: 0, x: -40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.5,
              delay: delay,
              ease: "easeOut",
            }}
            viewport={{ amount: 0, once: true }}
          >
            <NumberTickerCard
              value={splitNumericValue(stats[0].value).number}
              suffix={splitNumericValue(stats[0].value).suffix}
              title={stats[0].title}
              accent="secondary"
            />
          </m.div>

          <m.div
            initial={{ opacity: 0, x: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.5,
              delay: delay,
              ease: "easeOut",
            }}
            viewport={{ amount: 0, once: true }}
          >
            <NumberTickerCard
              value={splitNumericValue(stats[1].value).number}
              suffix={splitNumericValue(stats[1].value).suffix}
              title={stats[1].title}
              accent="primary"
            />
          </m.div>
          <m.div
            initial={{ opacity: 0, x: -40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.5,
              delay: delay,
              ease: "easeOut",
            }}
            viewport={{ amount: 0, once: true }}
          >
            <NumberTickerCard
              value={splitNumericValue(stats[2].value).number}
              suffix={splitNumericValue(stats[2].value).suffix}
              title={stats[2].title}
              accent="primary"
            />
          </m.div>

          <m.div
            initial={{ opacity: 0, x: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.5,
              delay: delay,
              ease: "easeOut",
            }}
            viewport={{ amount: 0, once: true }}
          >
            <NumberTickerCard
              value={splitNumericValue(stats[3].value).number}
              suffix={splitNumericValue(stats[3].value).suffix}
              title={stats[3].title}
              accent="secondary"
            />
          </m.div>
        </div>
        {/* Content */}
        <div className="flex flex-col gap-4 mt-8 lg:mt-0 lg:w-3/5">
          <m.h1
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ amount: 1, once: true }}
            transition={{
              duration: 0.5,
              delay: delay,
              ease: "easeOut",
            }}
            className="text-4xl sm:text-5xl font-semibold text-template-text-primary"
          >
            {heading}
          </m.h1>
          <m.h2
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.5,
              delay: delay * 2,
              ease: "easeOut",
            }}
            viewport={{ amount: 1, once: true }}
            className="uppercase font-medium text-template-text-primary text-xl"
          >
            {title}{" "}
            <span className="text-template-text-accent-tertiary">
              {colorTitle}
            </span>
          </m.h2>
          <m.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.5,
              delay: delay,
              ease: "easeOut",
            }}
            viewport={{ amount: 1, once: true }}
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
          <m.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.5,
              delay: delay * 2,
              ease: "easeOut",
            }}
            viewport={{ amount: 0, once: true }}
          >
            <ViewMoreDrawer type="About" content={aboutContent}>
              <Button className="self-start rounded-sm bg-template-btn text-template-text-btn text-lg hover:bg-template-btn cursor-pointer">
                Read more
              </Button>
            </ViewMoreDrawer>
          </m.div>
        </div>
      </div>
    </section>
  );
};

// NumberTickerCard: A reusable card for displaying a NumberTicker with title and suffix
export function NumberTickerCard({
  value,
  suffix,
  title,
  accent = "primary",
}: {
  value: number;
  suffix?: string;
  title: string;
  accent?: "primary" | "secondary";
}) {
  const accentClass =
    accent === "primary"
      ? "bg-template-accent-primary text-template-text-accent-primary"
      : "bg-template-accent-secondary text-template-text-accent-secondary";
  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center rounded-sm h-full max-h-48 p-10 overflow-hidden",
        accentClass
      )}
    >
      <div className="flex items-baseline gap-1">
        <NumberTicker
          value={value}
          className={cn("font-bold text-5xl sm:text-6xl", accentClass)}
        />
        {suffix && (
          <span className={cn("font-bold text-4xl sm:text-5xl", accentClass)}>
            {suffix}
          </span>
        )}
      </div>
      <h2 className={cn("mt-2 text-2xl w-full text-center", accentClass)}>
        {title}
      </h2>
    </div>
  );
}
