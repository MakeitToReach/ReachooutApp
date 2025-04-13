import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { PF_CLIENT_SECTION } from "../types/clientSection";

export const PFClientSection = ({
    title,
    clientImgs = [
        "https://github.com/shadcn.png",
        "https://github.com/shadcn.png",
        "https://github.com/shadcn.png",
        "https://github.com/shadcn.png",
    ],
    colorTxt,
}: PF_CLIENT_SECTION) => {
    return (
        <section className="px-4 max-w-6xl mx-auto">
            <div className="flex flex-col gap-4">
                <Avatar className="size-[80px]">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h1 className="font-semibold text-xl md:text-6xl">
                    Worked with <span className="text-green-600">{colorTxt}</span> {title}
                </h1>
                <h3 className="md:text-2xl text-neutral-500">
                    Clients I&apos;ve worked with
                </h3>
            </div>

            <div className="flex flex-wrap gap-4">
                {clientImgs.map((img) => (
                    <img src={img} alt="client-logo" className="p-4 object-contain" key={img}/>
                ))}
            </div>
        </section>
    );
};
