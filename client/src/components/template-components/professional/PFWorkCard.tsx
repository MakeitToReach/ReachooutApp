"use client";

import React from "react";
import Image from "next/image";
import YouTube from "react-youtube";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { cn, getYouTubeVideoId } from "@/lib/utils";
import { ViewMoreDrawer } from "./viewMoreDrawer";
import { PF_PROJECT } from "@/templates/professional/types/project";

interface PFWorkCardProps {
  project: PF_PROJECT;
}

export function PFWorkCard({ project }: PFWorkCardProps) {
  const videoId = getYouTubeVideoId(project.vidUrl ?? "");
  
  const youtubeOpts = {
    playerVars: {
      loop: 1,
      playlist: videoId,
      controls: 1,
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
    <div className="flex flex-col sm:flex-row-reverse sm:justify-between overflow-hidden">
      {videoId ? (
        <div className="relative sm:h-[50vh] sm:w-[30vw] aspect-video h-[40vh] w-full rounded-sm">
          <YouTube
            videoId={videoId ?? ""}
            className="absolute top-0 left-0 w-full h-full aspect-video"
            iframeClassName="w-full h-full aspect-video"
            opts={youtubeOpts}
          />
        </div>
      ) : (
        <Image
          src={project.imgUrl || "/placeholder.png"}
          alt="project-img"
          className={cn(
            "sm:h-[50vh] sm:w-[30vw] h-[40vh] w-full rounded-sm object-cover",
            "sm:max-h-[50vh] sm:max-w-full max-w-full max-h-[40vh]"
          )}
          width={500}
          height={500}
        />
      )}

      <div className="flex flex-col gap-4 py-6 self-center md:w-[60%]">
        <div className="space-y-2">
          <h1 className="sm:text-4xl text-2xl font-semibold">{project.heading}</h1>
        </div>

        <div
          className=" 
            prose prose-lg max-w-[90%] text-template-text-secondary
            prose-p:text-template-text-secondary
            prose-strong:text-template-text-secondary
            prose-h1:text-template-text-secondary
            prose-h2:text-template-text-secondary
            prose-h3:text-template-text-secondary
            prose-h4:text-template-text-secondary
            prose-h5:text-template-text-secondary
            prose-h6:text-template-text-secondary
            line-clamp-6
          "
          dangerouslySetInnerHTML={{ __html: project.description }}
        />
        <div className="flex gap-2">
          <ViewMoreDrawer content={project} type="Project">
            <Button className="text-template-text-btn bg-template-btn rounded-sm text-lg hover:bg-template-btn cursor-pointer">
              View Details
              <ArrowUpRight size={16} />
            </Button>
          </ViewMoreDrawer>
          {project.btnLink && (
            <a href={project.btnLink}>
              <Button className="text-template-btn bg-template-text-btn rounded-sm text-lg hover:bg-template-text-btn/80 cursor-pointer flex items-center gap-2">
                {project.btnText}
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}


