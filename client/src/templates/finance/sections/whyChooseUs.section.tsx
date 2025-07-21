import { FButton } from "../components/FButton";
import { FWhyChooseUsCard } from "../components/FWhyChooseUsCard";
import { F_WHY_CHOOSE_US_SECTION } from "../types/why-choose-us.types";
import { motion as m } from "motion/react";

const delay = 0.15;

export const FWhyChooseUsSection = ({
  features,
  title,
  description,
  btnText,
  btnLink,
  badgeText,
}: F_WHY_CHOOSE_US_SECTION) => {
  return (
    <section
      id="why-choose-us"
      className="max-w-6xl mx-auto sm:py-20 py-10 px-4"
    >
      <div className="flex flex-col sm:flex-row gap-10">
        {/* text content */}
        <div className="flex flex-col sm:gap-8 gap-10 sm:w-1/2 w-full text-template-text-primary">
          <m.div
            initial={{ opacity: 0, x: -40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.5,
              delay: delay,
              ease: "easeOut",
            }}
            className="w-fit rounded-full translate-x-10 bg-gradient-to-r from-template-primary to-template-accent-primary via-template-accent-primary/10 text-template-text-accent-primary flex items-center justify-center px-4 py-2 uppercase font-semibold text-lg"
          >
            {badgeText}
          </m.div>
          <m.h2
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.5,
              delay: delay * 2,
              ease: "easeOut",
            }}
            className="font-semibold sm:text-5xl text-3xl tracking-tight"
          >
            {title}
          </m.h2>
          <m.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.5,
              delay: delay * 3,
              ease: "easeOut",
            }}
            className="
    prose prose-sm max-w-none text-template-text-primary
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
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.5,
              delay: delay * 4,
              ease: "easeOut",
            }}
            className="flex gap-10 items-center"
          >
            <a href={btnLink}>
              <FButton btnText={btnText} className="py-7 px-10" />
            </a>
          </m.div>
        </div>

        <div className="flex flex-col sm:gap-8 gap-10 sm:w-1/2 w-full">
          {features.map((card, index) => (
            <FWhyChooseUsCard
              key={index}
              icon={card.icon}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
