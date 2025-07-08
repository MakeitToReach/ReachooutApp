"use client";
import React from "react";
import { PF_FAQ_SECTION } from "../types/faq.types";
import { PFFaqItem } from "../components/PFFaqAccordion";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const PFFaqSection = React.forwardRef<HTMLElement, PF_FAQ_SECTION>(
  ({ heading, subHeading, faqs, ...props }, ref) => {
    return (
      <section
        ref={ref}
        id="faqs"
        className={cn("py-16 max-w-6xl mx-auto")}
        {...props}
      >
        <div className="container">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-6 sm:space-y-10 mb-12"
          >
            <h2 className="text-4xl font-semibold md:text-6xl text-center text-template-text-primary">
              {heading}
            </h2>
            {subHeading && (
              <p className="text-sm text-template-text-primary opacity-60">
                {subHeading}
              </p>
            )}
          </motion.div>

          {/* FAQ Items */}
          <div className="sm:max-w-2xl sm:mx-auto w-full px-2 space-y-2">
            {faqs.map((faq, index) => (
              <PFFaqItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    );
  },
);
PFFaqSection.displayName = "PFFaqSection";
