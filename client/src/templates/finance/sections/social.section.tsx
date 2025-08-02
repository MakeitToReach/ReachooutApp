import { FSocialCard } from "../components/FSocialCard";
import React from "react";
import { F_SOCIAL_SECTION } from "../types/social.types";
import { motion as m } from "motion/react";

const delay = 0.15;

export const FSocialSection = ({
  socials,
  heading,
  subHeading,
}: F_SOCIAL_SECTION) => {
  return (
    <section className="py-20">
      <div
        id="socials"
        className="w-full rounded-lg bg-template-secondary overflow-hidden px-6 py-4"
      >
        <div className="max-w-6xl mx-auto h-full text-white my-10 space-y-8 overflow-x-visible">
          <m.h2
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.5,
              delay: delay,
              ease: "easeOut",
            }}
            className="font-semibold text-5xl tracking-tight text-center text-template-text-secondary"
          >
            {heading}
          </m.h2>
          <m.p
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.5,
              delay: delay * 2,
              ease: "easeOut",
            }}
            className="text-center text-xl line-clamp-4 text-template-text-secondary/80"
          >
            {subHeading}
          </m.p>
          <div className="rounded-lg">
            <m.div
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: delay * 3,
                ease: "easeOut",
              }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              {socials
                .filter((social) => social.btnLink)
                .map((social, idx) => (
                  <m.div
                    key={idx}
                    initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.5,
                      delay: delay * (idx + 4),
                      ease: "easeOut",
                    }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <FSocialCard
                      key={idx}
                      title={social.title}
                      btnLink={social.btnLink}
                      followerCounts={social.followerCounts}
                    />
                  </m.div>
                ))}
            </m.div>
          </div>
        </div>
      </div>
    </section>
  );
}; 