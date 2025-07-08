"use client";

import EmailInput from "@/components/template-components/professional/emailInput";
import { Button } from "@/components/ui/button";
import React from "react";
import { PF_NEWSLETTER_SECTION } from "../types/newsletter.types";

export const PFNewsletterSection = ({ heading }: PF_NEWSLETTER_SECTION) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert("WIP!");
    }
    return (
        <section className="py-20 max-w-6xl mx-auto flex flex-col justify-center items-center space-y-10 px-4" id="newsletter">
            <h2 className="text-4xl font-semibold md:text-6xl text-center text-template-text-primary">
                {heading}
            </h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
                <EmailInput />
                <Button type="submit">Subscribe</Button>
            </form>
        </section>
    );
};
