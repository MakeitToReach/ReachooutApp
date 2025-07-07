import { Marquee } from "@/components/magicui/marquee";
import Image from "next/image";

export const FLogos = ({ imgs }: { imgs: string[] }) => {
    return (
        <Marquee className="py-4 [--duration:20s]">
            {" "}
            {imgs.map((logo, idx) => (
                <Image
                    key={idx}
                    src={logo || "/placeholder.png"}
                    alt={`logo ${idx + 1}`}
                    height={40}
                    width={120}
                    className="object-contain mx-10"
                />
            ))}
        </Marquee>
    );
};
