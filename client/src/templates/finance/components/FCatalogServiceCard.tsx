"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FViewMoreDrawer } from "@/components/template-components/finance/FViewMoreDrawer";
import YouTube from "react-youtube";
import { getYouTubeVideoId } from "@/lib/utils";

interface FCatalogServicesCardProps {
  imgUrls: string[];
  title: string;
  description: string;
  category?: string;
  btnText?: string;
  btnLink?: string;
  vidUrl?: string;
}

export const FCatalogServicesCard = ({
  imgUrls,
  title,
  description,
  category,
  btnText,
  btnLink,
  vidUrl,
}: FCatalogServicesCardProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Extract videoId from videoUrl
  const videoId = getYouTubeVideoId(vidUrl);
  const showVideo = Boolean(videoId);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % imgUrls.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [imgUrls.length]);

  const nextImage = () =>
    setCurrentIndex((prev) => (prev + 1) % imgUrls.length);
  const prevImage = () =>
    setCurrentIndex((prev) => (prev === 0 ? imgUrls.length - 1 : prev - 1));

  const opts = {
    playerVars: {
      width: "100%",
      height: "100%",
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
    <div className="h-fit w-full bg-template-primary text-template-text-primary rounded-lg overflow-hidden space-y-6 pb-6">
      <div className="relative w-full h-[250px]">
        {showVideo ? (
          <YouTube
            videoId={videoId || ""}
            opts={opts}
            className="absolute inset-0 w-full h-full rounded-t-lg"
            iframeClassName="w-full h-full rounded-t-lg"
          />
        ) : (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                layout
                key={imgUrls[currentIndex]}
                initial={{ filter: "blur(10px)", opacity: 0 }}
                animate={{ filter: "blur(0px)", opacity: 1 }}
                exit={{ filter: "blur(10px)", opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={imgUrls[currentIndex] || "/placeholder.png"}
                  alt={`service-img-${currentIndex}`}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </motion.div>
            </AnimatePresence>

            {/* Gradient to make arrows visible */}
            {imgUrls.length > 1 && (
              <>
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent z-10" />

                {/* Prev/Next buttons only */}
                <div className="absolute bottom-2 right-2 z-20 flex gap-2">
                  <Button
                    onClick={prevImage}
                    variant="ghost"
                    className="p-2 rounded-full dark border-white text-white hover:bg-white/10"
                  >
                    <ChevronLeft size={16} />
                  </Button>
                  <Button
                    onClick={nextImage}
                    variant="ghost"
                    className="p-2 rounded-full dark border-white text-white hover:bg-white/10"
                  >
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* Text content */}
      <div className="px-6 space-y-1">
        <h2 className="font-semibold text-2xl sm:text-xl tracking-tight text-template-text-primary">
          {title}
        </h2>
        <div
          className="
    prose prose-xl sm:prose-base max-w-none text-template-text-primary/80
    prose-p:text-template-text-primary/80
    prose-strong:text-template-text-primary/80
    prose-h1:text-template-text-primary/80
    prose-h2:text-template-text-primary/80
    prose-h3:text-template-text-primary/80
    prose-h4:text-template-text-primary/80
    prose-h5:text-template-text-primary/80
    prose-h6:text-template-text-primary/80
    line-clamp-5
  "
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>

      {/* "View Details" and arrow button (below image) */}
      <div className="w-full flex justify-between items-center px-6">
        <FViewMoreDrawer
          type="Catalog"
          content={{
            imgUrls,
            title,
            description,
            category: category || "",
            btnText,
            btnLink,
            vidUrl,
          }}
        >
          <Button
            variant="link"
            className="flex items-center px-0 text-template-text-primary font-semibold text-lg"
          >
            View Details
          </Button>
        </FViewMoreDrawer>
        <FViewMoreDrawer
          type="Catalog"
          content={{
            imgUrls,
            title,
            description,
            category: category || "",
            btnText,
            btnLink,
            vidUrl,
          }}
        >
          <Button
            variant="default"
            className="flex items-center text-template-text-primary border border-template-text-primary/50 hover:bg-template-text-primary/10 rounded-full font-semibold bg-template-primary"
          >
            <ArrowUpRight size={20} />
          </Button>
        </FViewMoreDrawer>
      </div>
    </div>
  );
};
