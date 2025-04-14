import { FlipText } from "@/components/template-components/professional/flipText";
import { Button } from "@/components/ui/button";
import { LucideArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { CldImage } from "next-cloudinary";
import { PF_HERO_SECTION } from "../types/heroSection";

export const PFHeroSection = ({
    title,
    professions,
    btnLink,
    btnText,
    heroImgUrl,
}: PF_HERO_SECTION) => {
    return (
        <section className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 px-4">
                <div className="space-y-4">
                    {/* sm logo here */}
                    <div>
                        <h1 className="text-4xl md:text-6xl font-bold">{title}</h1>
                        <FlipText
                            texts={professions}
                            className="text-4xl md:text-5xl font-bold text-green-600"
                        />
                    </div>
                    <Link href={btnLink}>
                        <Button className="p-6 text-md rounded-sm">
                            {btnText}
                            <span>
                                <LucideArrowRight />
                            </span>
                        </Button>
                    </Link>
                </div>
                <CldImage
                    src={heroImgUrl}
                    alt="heroimg"
                    className="mt-20 md:max-h-[500px] md:max-w-[500px] object-contain"
                    width={600}
                    height={600}
                />
            </div>
        </section>
    );
};
