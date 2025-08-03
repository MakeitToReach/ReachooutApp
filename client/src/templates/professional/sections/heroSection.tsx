import YouTube from "react-youtube";
import { PF_HERO_SECTION } from "../types/heroSection";
import { FlipText } from "@/components/template-components/professional/flipText";
import { Button } from "@/components/ui/button";
import { LucideArrowRight } from "lucide-react";
import React from "react";
import { getYouTubeVideoId } from "@/lib/utils";
import Image from "next/image";
import { motion as m } from "motion/react";

const delay = 0.15;

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
    <section className="max-w-6xl mx-auto py-10 sm:py-10" id="hero">
      <m.div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 px-4">
        <div className="space-y-4">
          <div>
            <m.h1
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: delay,
                ease: "easeOut",
              }}
              className="text-5xl sm:text-6xl font-bold text-template-text-primary"
            >
              {title}
            </m.h1>
            {professions && (
              <m.div
                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: delay * 2,
                  ease: "easeOut",
                }}
              >
                <FlipText
                  texts={professions}
                  className="text-4xl sm:text-5xl sm:leading-16 leading-12 font-bold text-template-text-accent-tertiary"
                />
              </m.div>
            )}
            {description && (
              <m.div
                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: delay * 3,
                  ease: "easeOut",
                }}
                className="
    prose prose-xl max-w-none text-template-text-primary
    prose-p:text-template-text-primary
    prose-strong:text-template-text-primary
    prose-h1:text-template-text-primary
    prose-h2:text-template-text-primary
    prose-h3:text-template-text-primary
    prose-h4:text-template-text-primary
    prose-h5:text-template-text-primary
    prose-h6:text-template-text-primary
    line-clamp-5
  "
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}
          </div>
          <a href={btnLink}>
            <m.div
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: delay * 4,
                ease: "easeOut",
              }}
            >
              <Button className="p-6 text-md rounded-sm bg-template-btn hover:bg-template-btn cursor-pointer">
                <span className="text-template-text-btn">{btnText}</span>
                <span>
                  <LucideArrowRight className="text-template-text-btn" />
                </span>
              </Button>
            </m.div>
          </a>
        </div>
        {videoId ? (
          <m.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.5,
              delay: delay * 5,
              ease: "easeOut",
            }}
            className="relative w-full max-w-[600px] aspect-video rounded-sm overflow-hidden"
          >
            <YouTube
              videoId={videoId}
              className="absolute top-0 left-0 w-full h-full"
              iframeClassName="w-full h-full"
              opts={opts}
            />
          </m.div>
        ) : (
          <m.div
            initial={{ opacity: 0, x: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.5,
              delay: delay * 5,
              ease: "easeOut",
            }}
            className="mt-20 sm:mt-0 sm:min-h-[500px] sm:min-w-[500px] sm:max-h-[500px] sm:max-w-[500px] rounded-sm object-cover w-full h-full relative overflow-hidden"
          >
            <Image
              src={heroImgUrl || "https://placehold.co/600x600"}
              alt="heroimg"
              className="object-cover w-full h-full"
              width={500}
              height={500}
            />
          </m.div>
        )}
      </m.div>
    </section>
  );
};
