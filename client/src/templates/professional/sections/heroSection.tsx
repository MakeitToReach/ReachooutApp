import YouTube from "react-youtube";
import { PF_HERO_SECTION } from "../types/heroSection";
import { FlipText } from "@/components/template-components/professional/flipText";
import { Button } from "@/components/ui/button";
import { LucideArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { CldImage } from "next-cloudinary";

export const PFHeroSection = ({
    title,
    professions,
    btnLink,
    btnText,
    heroImgUrl,
    heroVidUrl,
}: PF_HERO_SECTION) => {
    const getYouTubeVideoId = (url: string | undefined) => {
        if (!url) return null;
        const regExp =
            /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
        const match = url.match(regExp);
        return match ? match[1] : null;
    };

    const videoId = getYouTubeVideoId(heroVidUrl);

    const opts = {
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

    return (
        <section className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 px-4">
                <div className="space-y-4">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-bold text-template-text-primary">
                            {title}
                        </h1>
                        <FlipText
                            texts={professions}
                            className="text-4xl md:text-5xl font-bold text-template-text-accent-primary"
                        />
                    </div>
                    <Link href={btnLink}>
                        <Button className="p-6 text-md rounded-sm bg-template-btn">
                            <span className="text-template-text-btn">{btnText}</span>
                            <span>
                                <LucideArrowRight className="text-template-text-btn" />
                            </span>
                        </Button>
                    </Link>
                </div>
                {videoId ? (
                    <div className="relative w-full max-w-[600px] aspect-video rounded-md overflow-hidden">
                        <YouTube
                            videoId={videoId}
                            className="absolute top-0 left-0 w-full h-full"
                            iframeClassName="w-full h-full"
                            opts={opts}
                        />
                    </div>
                ) : (
                    <CldImage
                        src={heroImgUrl || "/placeholder.png"}
                        alt="heroimg"
                        className="mt-20 md:max-h-[500px] md:max-w-[500px] rounded-md object-contain"
                        width={600}
                        height={600}
                    />
                )}
            </div>
        </section>
    );
};
