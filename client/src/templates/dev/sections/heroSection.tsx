import React from "react";
import { DEV_HERO_SECTION } from "../types/heroSection.types";

export const DevHeroSection = ({ title }: DEV_HERO_SECTION) => {
    return (
        <section>
            <h1 className="text-4xl font-bold mb-2">{title}</h1>
        </section>
    );
};
