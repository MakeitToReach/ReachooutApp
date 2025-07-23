import YouTube from "react-youtube";
import { PF_HERO_SECTION } from "../types/heroSection";
import { FlipText } from "@/components/template-components/professional/flipText";
import { Button } from "@/components/ui/button";
import { LucideArrowRight } from "lucide-react";
import React from "react";
import { getYouTubeVideoId } from "@/lib/utils";
import Image from "next/image";

export const PFHeroSection = ({
    title,
    professions,
    btnLink = "#",
    btnText,
    heroImgUrl,
    heroVidUrl,
    description,
}: PF_HERO_SECTION) => {
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
        <section className="max-w-6xl mx-auto pt-10 sm:pt-20" id="hero">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 px-4">
                <div className="space-y-4">
                    <div>
                        <h1 className="text-5xl sm:text-6xl font-bold text-template-text-primary">
                            {title}
                        </h1>
                        {professions && (
                            <FlipText
                                texts={professions}
                                className="text-4xl sm:text-5xl sm:leading-16 leading-12 font-bold text-template-text-accent-tertiary"
                            />
                        )}
                        {description && (
                            <div
                                className="
    prose prose-lg max-w-none text-template-text-primary
    prose-p:text-template-text-primary
    prose-strong:text-template-text-primary
    prose-h1:text-template-text-primary
    prose-h2:text-template-text-primary
    prose-h3:text-template-text-primary
    prose-h4:text-template-text-primary
    prose-h5:text-template-text-primary
    prose-h6:text-template-text-primary
  "
                                dangerouslySetInnerHTML={{ __html: description }}
                            />
                        )}
                    </div>
                    <a href={btnLink} rel="noopener noreferrer" target="_blank">
                        <Button className="p-6 text-md rounded-xs bg-template-btn">
                            <span className="text-template-text-btn">{btnText}</span>
                            <span>
                                <LucideArrowRight className="text-template-text-btn" />
                            </span>
                        </Button>
                    </a>
                </div>
                {videoId ? (
                    <div className="relative w-full max-w-[600px] aspect-video rounded-xs overflow-hidden">
                        <YouTube
                            videoId={videoId}
                            className="absolute top-0 left-0 w-full h-full"
                            iframeClassName="w-full h-full"
                            opts={opts}
                        />
                    </div>
                ) : (
                    <Image
                        src={heroImgUrl || "/placeholder.png"}
                        alt="heroimg"
                        className="mt-20 sm:mt-0 sm:max-h-[600px] sm:max-w-[600px] rounded-xs object-cover"
                        width={600}
                        height={600}
                    />
                )}
            </div>
        </section>
    );
};
