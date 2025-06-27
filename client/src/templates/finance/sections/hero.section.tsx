import Image from "next/image";
import { FButton } from "../components/FButton";
import { motion as m } from "motion/react";
import { F_HERO_SECTION } from "../types/hero.types";

export const FHeroSection = ({
    imgUrls,
    title,
    btnText,
    btnLink,
}: F_HERO_SECTION) => {
    return (
        <section className="bg-black rounded-lg w-full h-[75vh] relative overflow-hidden">
            <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <Image
                    quality={100}
                    fill
                    className="object-cover"
                    // src="https://www.okler.net/previews/porto/12.1.0/img/demos/accounting-1/slides/slide-2.jpg"
                    src={imgUrls[0]}
                    alt="hero-img"
                    priority
                />
            </m.div>

            <div className="absolute h-full w-full bg-black/50 flex flex-col gap-10 justify-end items-start p-4 sm:p-0 sm:items-center sm:justify-center">
                <m.h1
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="font-semibold sm:text-6xl text-3xl tracking-tight text-white sm:text-center sm:w-[40%] w-full"
                >
                    {title}
                </m.h1>
                <m.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <a href={btnLink}>
                        <FButton
                            btnText={btnText}
                            className="py-7 dark px-10 text-black bg-white"
                        />
                    </a>
                </m.div>
            </div>
        </section>
    );
};
