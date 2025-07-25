"use client";
import React from "react";
import { PF_FAQ_SECTION } from "../types/faq.types";
import { PFFaqItem } from "../components/PFFaqAccordion";
import { motion as m } from "motion/react";
import { cn } from "@/lib/utils";

const delay = 0.15;

export const PFFaqSection = React.forwardRef<HTMLElement, PF_FAQ_SECTION>(
  ({ heading, subHeading, faqs, ...props }, ref) => {
    return (
      <section
        ref={ref}
        id="faqs"
        className={cn("py-20 max-w-6xl mx-auto px-4")}
        {...props}
      >
        <div className="container">
          {/* Header */}
          <div className="text-center space-y-6 sm:space-y-10 mb-12">
            <m.h2
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.5,
                delay: delay,
                ease: "easeOut",
              }}
              viewport={{ amount: 1, once: true }}
              className="text-4xl font-semibold sm:text-6xl text-center text-template-text-primary"
            >
              {heading}
            </m.h2>
            {subHeading && (
              <m.p
                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                whileInView={{ opacity: 0.6, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.5,
                  delay: delay * 2,
                  ease: "easeOut",
                }}
                viewport={{ amount: 1, once: true }}
                className="text-lg sm:text-xl text-center text-template-text-primary opacity-50"
              >
                {subHeading}
              </m.p>
            )}
          </div>

          {/* FAQ Items */}
          <div className="sm:max-w-2xl sm:mx-auto w-full px-2 space-y-2">
            {faqs.map((faq, index) => (
              <m.div
                key={index}
                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.5,
                  delay: delay * (index + 1),
                  ease: "easeOut",
                }}
                viewport={{ amount: 1, once: true }}
              >
                <PFFaqItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  index={index}
                />
              </m.div>
            ))}
          </div>
        </div>
      </section>
    );
  }
);
PFFaqSection.displayName = "PFFaqSection";
