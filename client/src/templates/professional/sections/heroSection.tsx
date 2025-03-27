import { Button } from "@/components/ui/button";
import { LucideArrowRight } from "lucide-react";
import React from "react";

export const PFHeroSection = () => {
  return (
    <section className="lg:px-[20%]">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 px-4">
        <div className="space-y-4">
          {/* sm logo here */}
          <div>
            <h1 className="text-3xl md:text-6xl font-bold">Hi, I&apos;m John Doe</h1>
            <h2 className="text-3xl md:text-5xl font-bold text-green-600">Profession</h2>
          </div>
          <Button className="p-6 text-md rounded-sm">
            Visit Company Website{" "}
            <span>
              <LucideArrowRight />
            </span>
          </Button>
        </div>
        <img src="https://github.com/shadcn.png" alt="heroimg" />
      </div>
    </section>
  );
};
