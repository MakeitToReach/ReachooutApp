import { PFSocialCard } from "@/components/template-components/professional/socialCard";
import React from "react";
import { PF_SOCIAL_SECTION } from "../types/social.types";
import { motion as m } from "motion/react";

const delay = 0.15;

export const PFSocialSection = ({
  socials,
  heading,
  subHeading,
}: PF_SOCIAL_SECTION) => {
  return (
    <section className="bg-template-secondary" id="socials">
      <div className="relative">
        <div className="max-w-6xl mx-auto px-4 text-template-text-secondary py-20">
          <div className="z-10 relative flex flex-col gap-6 md:gap-10 md:p-20">
            <m.h1
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.5,
                delay: delay,
                ease: "easeOut",
              }}
              viewport={{ amount: 1, once: true }}
              className="text-4xl font-semibold md:text-6xl"
            >
              {heading}
            </m.h1>
            <m.h3
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.5,
                delay: delay * 2,
                ease: "easeOut",
              }}
              viewport={{ amount: 1, once: true }}
              className="text-xl text-template-text-secondary/60"
            >
              {subHeading}
            </m.h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {socials
                .filter((social) => social.btnLink)
                .map((social, idx) => (
                  <m.div
                    key={idx}
                    initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.5,
                      delay: delay * (idx + 1),
                      ease: "easeOut",
                    }}
                    viewport={{ amount: 1, once: true }}
                  >
                    <PFSocialCard
                      key={idx}
                      title={social.title}
                      btnLink={social.btnLink}
                      followerCounts={social.followerCounts}
                    />
                  </m.div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
