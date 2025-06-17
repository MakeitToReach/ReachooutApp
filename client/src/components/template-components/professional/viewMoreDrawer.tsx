import * as React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Image from "next/image";
import YouTube from "react-youtube";

import { PF_PROJECT } from "@/templates/professional/types/workSection";
import { Button } from "@/components/ui/button";

interface ViewMoreDrawerProps {
  children: React.ReactNode;
  Project: PF_PROJECT;
}

export const ViewMoreDrawer = ({ Project, children }: ViewMoreDrawerProps) => {
  const getYouTubeId = (url: string) => {
    const regExp =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/embed\/|youtu\.be\/)([^\s?&/]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const videoId = getYouTubeId(Project.vidUrl || "");

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>

      {/* Drawer Content with min height and flex layout */}
      <DrawerContent className="p-0 max-w-full md:max-w-6xl mx-auto min-h-[80vh] flex flex-col">
        {/* Header */}
        <DrawerHeader className="p-4 border-b">
          <DrawerTitle className="text-left text-xl">
            {Project.heading}
          </DrawerTitle>
        </DrawerHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Project Media */}
          <div className="flex justify-center">
            {videoId && (
              <YouTube
                videoId={videoId}
                className="w-full max-w-full aspect-video"
              />
            )}

            {!videoId && Project.imgUrl && (
              <Image
                src={Project.imgUrl || Project.imgUrl[0]}
                alt={Project.heading}
                width={500}
                height={400}
                className="rounded w-full md:h-[400px] object-cover object-center"
              />
            )}
          </div>

          {/* Project Description */}
          <p className="text-sm text-gray-700">{Project.description}</p>
        </div>

        {/* Fixed Footer Button */}
        <div className="p-4 border-t flex justify-end">
          <a href={Project.btnLink} target="_blank" rel="noopener noreferrer">
            <Button>{Project.btnText}</Button>
          </a>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
