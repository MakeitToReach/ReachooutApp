"use client";

import EmailInput from "@/components/template-components/professional/emailInput";
import PhnNumberInput from "@/components/template-components/professional/phoneNumberInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import React, { useEffect } from "react";
import { motion as m } from "motion/react";
import { Textarea } from "@/components/ui/textarea";
import { PF_CONTACT_SECTION } from "../types/contact.types";
import Cal, { getCalApi } from "@calcom/embed-react";

export const PFContactSection = ({
  heading,
  calUrl,
  calTheme,
}: PF_CONTACT_SECTION) => {

//     const isValidCalLink = (url: string) =>
//   /^https:\/\/cal\.com\/your-username(\/[\w-]*)?$/.test(url);

  useEffect(() => {
    (async function () {
      const Cal = await getCalApi();
      Cal("ui", {
        theme: calTheme,
        hideEventTypeDetails: false,
        // cssVarsPerTheme: {
        //   light: {
        //     "cal-brand": "#6F61C0",
        //     "cal-text": "#6F61C0",
        //     "cal-text-emphasis": "#4D408D",
        //     "cal-border-emphasis": "#4D408D",
        //     "cal-text-error": "pink",
        //     "cal-border": "#A090E0",
        //     "cal-border-default": "#A090E0",
        //     "cal-border-subtle": "#A090E0",
        //     "cal-border-booker": "#A090E0",
        //     "cal-text-muted": "#C0B8FF",
        //     "cal-bg-emphasis": "#E1DFFF",
        //     "cal-border-booker-width": "3px",
        //     // More CSS variables are defined here
        //     // https://github.com/calcom/cal.com/blob/main/packages/config/tailwind-preset.js
        //   },
        //   dark: {
        //     // Set the similar variables as in light theme but for dark mode.
        //   },
        // },
      });
    })();
  }, []);

  const containerVariants = {
    initial: {
      opacity: 0,
      filter: "blur(10px)",
      y: 20,
    },
    animate: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    initial: {
      opacity: 0,
      filter: "blur(10px)",
      y: 20,
    },
    animate: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { duration: 0.2 },
    },
  };

  return (
    <m.section
      variants={containerVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ amount: 0.5, once: true }}
      className="max-w-6xl mx-auto space-y-10 px-4 py-20"
      id="contact"
    >
      <m.h2
        variants={itemVariants}
        className="text-4xl font-semibold md:text-6xl text-center text-template-text-primary"
      >
        {heading}
      </m.h2>

      {!calUrl ? (
        <m.form
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ amount: 0.2, once: false }}
          className="lg:w-2xl mx-auto space-y-4"
        >
          <m.div variants={itemVariants}>
            <Input type="text" placeholder="Name" />
          </m.div>

          <m.div variants={itemVariants}>
            <EmailInput />
          </m.div>

          <m.div variants={itemVariants}>
            <PhnNumberInput />
          </m.div>

          <m.div variants={itemVariants}>
            <Textarea
              placeholder="Your message"
              className="border p-2 w-full rounded-md h-20"
            />
          </m.div>

          <m.div variants={itemVariants}>
            <Button className="flex items-center gap-2">
              Send Message
              <Send />
            </Button>
          </m.div>
        </m.form>
      ) : (
        <Cal calLink={calUrl} />
      )}
    </m.section>
  );
};
