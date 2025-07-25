import { Marquee } from "@/components/magicui/marquee";
import Image from "next/image";

type ClientLogosProps = {
    clientImgs: string[];
};

export const ClientLogos = ({ clientImgs }: ClientLogosProps) => {
    return (
        <>
            <Marquee className="py-4 [--duration:20s]">
                {" "}
                {clientImgs.map((client, idx) => (
                    <Image
                        key={idx}
                        src={client}
                        alt={`Client ${idx + 1}`}
                        height={40}
                        width={120}
                        className="object-contain mx-10"
                    />
                ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-template-primary"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-template-primary"></div>
        </>
    );
};
