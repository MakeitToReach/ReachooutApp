import { Marquee } from "@/components/magicui/marquee";
import Image from "next/image";

type Logo = {
    src: string;
    alt?: string;
};

type FLogosProps = {
    imgs: Logo[];
};

export const FLogos = ({ imgs }: FLogosProps) => {
    return (
        <Marquee className="py-4 [--duration:20s]">
            {" "}
            {imgs.map((logo, idx) => (
                <Image
                    key={idx}
                    src={logo.src}
                    alt={logo.alt || `logo ${idx + 1}`}
                    height={40}
                    width={120}
                    className="object-contain mx-10"
                />
            ))}
        </Marquee>
    );
};
