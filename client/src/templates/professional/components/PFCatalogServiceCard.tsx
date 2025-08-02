"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PF_CATALOG } from "../types/serviceCatalog.types";
import YouTube from "react-youtube";
import { getYouTubeVideoId } from "@/lib/utils";
import { ViewMoreDrawer } from "@/components/template-components/professional/viewMoreDrawer";

export const PFCatalogServicesCard = ({
  imgUrls = ["/placeholder.png"],
  title,
  description,
  btnText,
  btnLink,
  category,
  vidUrl,
}: PF_CATALOG) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const catalogServiceContent = {
    title,
    description,
    imgUrls,
    btnText,
    btnLink,
    category,
    vidUrl,
  };

  // Extract videoId from videoUrl
  const videoId = getYouTubeVideoId(vidUrl);
  const showVideo = Boolean(videoId);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % imgUrls.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [imgUrls.length]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % imgUrls.length);
  };
  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? imgUrls.length - 1 : prev - 1));
  };

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
    <div className="relative h-fit bg-template-primary text-template-text-primary flex flex-col border border-template-accent-primary/60 w-full overflow-visible rounded-sm space-y-6 pb-6">
      {/* Video or Images */}
      <div className="relative w-full h-[30vh]">
        {showVideo ? (
          <YouTube
            videoId={videoId || ""}
            opts={opts}
            className="absolute inset-0 w-full h-full rounded-t-xs"
            iframeClassName="w-full h-full rounded-t-xs"
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
                  className="object-cover rounded-t-xs"
                />
              </motion.div>
            </AnimatePresence>
            {/* Gradient to make arrows visible */}
            {imgUrls.length > 1 && (
              <>
                <div className="absolute h-full bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
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
      <div className="px-6 space-y-3 space-x-2">
        <h2 className="font-semibold text-2xl tracking-tight">{title}</h2>
        <div
          className=" 
                    prose prose-lg max-w-[90%] text-template-text-primary
                    prose-p:text-template-text-primary
                    prose-strong:text-template-text-primary
                    prose-h1:text-template-text-primary
                    prose-h2:text-template-text-primary
                    prose-h3:text-template-text-primary
                    prose-h4:text-template-text-primary
                    prose-h5:text-template-text-primary
                    prose-h6:text-template-text-primary
                    line-clamp-3
                    "
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <div className="flex gap-2">
          <ViewMoreDrawer type="CatalogService" content={catalogServiceContent}>
            {/* <Button className="self-start bg-template-text-primary border text-template-primary rounded-sm hover:bg-transparent cursor-pointer"> */}
            <Button className="self-start text-template-text-btn bg-template-btn rounded-sm text-lg hover:bg-template-btn cursor-pointer">
              View Details
              <ArrowUpRight size={16} />
            </Button>
          </ViewMoreDrawer>
          {btnLink && (
            <a href={btnLink} target="_blank" rel="noopener noreferrer">
              <Button className="text-template-btn bg-template-text-btn rounded-sm text-lg hover:bg-template-text-btn/80 cursor-pointer flex items-center gap-2 border border-template-btn/40">
                <span className="flex items-center">{btnText}</span>
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
