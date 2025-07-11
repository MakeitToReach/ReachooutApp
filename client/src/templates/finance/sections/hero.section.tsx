import Image from "next/image";
import { FButton } from "../components/FButton";
import { AnimatePresence, motion as m, motion } from "motion/react";
import { F_HERO_SECTION } from "../types/hero.types";
import { useEffect, useState } from "react";
import { getYouTubeVideoId } from "@/lib/utils";
import YouTube from "react-youtube";

export const FHeroSection = ({
    imgUrls,
    title,
    btnText,
    btnLink,
    vidUrl,
}: F_HERO_SECTION) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const videoId = getYouTubeVideoId(vidUrl);

    const opts = {
        width: "100%",
        height: "100%",
        playerVars: {
            autoplay: 1,
            loop: 1,
            playlist: videoId,
            controls: 0,
            modestbranding: 1,
            rel: 0,
            iv_load_policy: 3,
            disablekb: 1,
            fs: 0,
            mute: 1,
            playsinline: 1,
        },
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % imgUrls.length);
        }, 7000);
        return () => clearInterval(interval);
    }, [imgUrls.length]);
    return (
        <section
            id="hero"
            className="bg-black rounded-lg w-full h-[75vh] relative overflow-hidden"
        >
            {videoId && (
                <div className="absolute inset-0 aspect-video w-full h-full">
                    <YouTube
                        videoId={videoId}
                        opts={opts}
                        className="w-full h-full pointer-events-none"
                        iframeClassName="w-full h-full absolute top-0 left-0 object-cover"
                    />
                </div>
            )}

            {!videoId && (
                <AnimatePresence mode="wait">
                    <motion.div
                        layout
                        key={imgUrls[currentIndex]}
                        initial={{ filter: "blur(10px)", opacity: 0 }}
                        animate={{ filter: "blur(0px)", opacity: 1 }}
                        exit={{ filter: "blur(10px)", opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <Image
                            src={imgUrls[currentIndex] || "/placeholder.png"}
                            alt={`hero-img-${currentIndex}`}
                            fill
                            className="object-cover rounded-t-lg"
                        />
                    </motion.div>
                </AnimatePresence>
            )}
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
