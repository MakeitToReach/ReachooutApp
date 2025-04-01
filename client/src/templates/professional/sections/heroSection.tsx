import { Button } from "@/components/ui/button";
import { LucideArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface PFHeroSetionProps {
  title: string;
  professions: string[];
  btnText: string;
  btnLink: string;
  heroImgUrl: string;
}
export const PFHeroSection = ({
  title,
  professions,
  btnLink,
  btnText,
  heroImgUrl,
}: PFHeroSetionProps) => {
  return (
    <section className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 px-4">
        <div className="space-y-4">
          {/* sm logo here */}
          <div>
            <h1
              className="text-3xl md:text-6xl font-bold"
            >
              {title}
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold text-green-600">
              {professions[0]}
            </h2>
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
        <img src={heroImgUrl} alt="heroimg" className="mt-20 max-h-[700px]" />
      </div>
    </section>
  );
};
