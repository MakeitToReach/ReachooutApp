import { Button } from "@/components/ui/button";
import React from "react";

export const PFSocialCard = () => {
  return (
    <div className="w-full p-4 bg-white rounded-md flex items-center gap-6">
      <img src="https://github.com/shadcn.png" alt="logo" className="size-14" />
      <div className="flex flex-col gap-1">
        <h1 className="font-semibold">Linkedin</h1>
        <h4 className="text-gray-600 text-sm">500+ followers</h4>
        <Button>Check</Button>
      </div>
    </div>
  );
};
