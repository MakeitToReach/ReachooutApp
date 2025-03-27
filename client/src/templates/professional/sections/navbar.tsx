import { Button } from "@/components/ui/button";
import { LucideMenu,  } from "lucide-react";
import React from "react";

export const PFNavbar = () => {
  return (
    <nav className="w-full sticky top-0 left-0 z-50 h-16 flex justify-between items-center px-4 md:px-[20%] bg-white/70 backdrop-blur-md">
      <h1 className="font-semibold text-xl">ReachOut</h1>
      <Button variant={"ghost"}>
        <LucideMenu className="text-black size-[24px]" />
      </Button>
    </nav>
  );
};
