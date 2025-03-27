import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

interface TemplateCardProps {
  imageUrl: string;
  title?: string;
  previewUrl?: string;
  id?: string;
}
export const TemplateCard = ({
  imageUrl = "",
  previewUrl = "/",
}: TemplateCardProps) => {
  return (
    <div className="relative  rounded-xl overflow-hidden">
      {/* gradient cover */}
      <div className="absolute w-full h-full flex justify-center items-center gap-2 bottom-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent rounded-xl md:opacity-0 opacity-100 hover:opacity-100 transition-all duration-200 z-40 ">
        <Link href={previewUrl}>
          <Button className="md:text-md cursor-pointer">Preview</Button>
        </Link>
        <Button className="md:text-md cursor-pointer">Use</Button>
      </div>
      <Image
        src={imageUrl}
        alt="template"
        width={100}
        height={400}
        loading="lazy"
        loader={() => imageUrl}
        className="w-full h-[400px] object-cover object-top"
      />
    </div>
  );
};
