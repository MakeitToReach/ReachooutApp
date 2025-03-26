import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface TemplateCardProps {
  imageUrl?: string;
  title?: string;
  previewUrl?: string;
  id?: string;
}
export const TemplateCard = ({
  imageUrl,
  previewUrl = "/",
}: TemplateCardProps) => {
  return (
    <div className="relative w-[400px] h-[300px] rounded-xl overflow-hidden">
      {/* gradient cover */}
      <div className="absolute w-full h-full flex justify-center items-center gap-2 bottom-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent rounded-xl opacity-0 hover:opacity-100 transition-all duration-200 z-40">
        <Link href={previewUrl}>
          <Button className="md:text-md cursor-pointer">Preview</Button>
        </Link>
        <Button className="md:text-md cursor-pointer">Use</Button>
      </div>
      <img src={imageUrl} alt="template" />
    </div>
  );
};
