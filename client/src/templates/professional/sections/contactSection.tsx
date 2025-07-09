"use client";

import EmailInput from "@/components/template-components/professional/emailInput";
import PhnNumberInput from "@/components/template-components/professional/phoneNumberInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import React from "react";
import { motion as m } from "motion/react";
import { Textarea } from "@/components/ui/textarea";
import { PF_CONTACT_SECTION } from "../types/contact.types";

export const PFContactSection = ({ heading }: PF_CONTACT_SECTION) => {
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
            viewport={{ amount: 0.5, once: false }}
            className="max-w-6xl mx-auto space-y-10 px-4 py-20"
            id="contact"
        >
            <m.h2
                variants={itemVariants}
                className="text-4xl font-semibold md:text-6xl text-center text-template-text-primary"
            >
                {heading}
            </m.h2>

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
        </m.section>
    );
};
