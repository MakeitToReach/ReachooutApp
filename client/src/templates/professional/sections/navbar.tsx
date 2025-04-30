import { Button } from "@/components/ui/button";
import { LucideMenu } from "lucide-react";
import React from "react";

export const PFNavbar = () => {
  return (
    <nav className="bg-template-primary  backdrop-blur-md sticky top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto h-16 px-4 flex justify-between items-center">
        <h1 className="font-semibold text-xl">Reachoout</h1>
        <Button variant={"ghost"}>
          <LucideMenu className="text-black size-[24px]" />
        </Button>
      </div>
    </nav>
  );
};
