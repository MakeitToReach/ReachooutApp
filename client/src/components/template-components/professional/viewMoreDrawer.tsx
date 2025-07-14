import * as React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Image from "next/image";
import YouTube from "react-youtube";

import { PF_PROJECT } from "@/templates/professional/types/workSection";
import { Button } from "@/components/ui/button";
import { PF_TEAM_MEMBER } from "@/templates/professional/types/teamMember.types";
import { LucideX } from "lucide-react";
import { PF_BLOG } from "@/templates/professional/types/blog.types";
import { PF_CATALOG } from "@/templates/professional/types/serviceCatalog.types";

interface ViewMoreDrawerProps {
  children: React.ReactNode;
  content: PF_PROJECT | PF_TEAM_MEMBER | PF_BLOG | PF_CATALOG;
  type: "Project" | "TeamMember" | "Blog" | "CatalogService";
}

export const ViewMoreDrawer = ({
  content,
  children,
  type,
}: ViewMoreDrawerProps) => {
  const getYouTubeId = (url: string) => {
    const regExp =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/embed\/|youtu\.be\/)([^\s?&/]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const project = type === "Project" ? (content as PF_PROJECT) : null;
  const teamMember = type === "TeamMember" ? (content as PF_TEAM_MEMBER) : null;
  const blog = type === "Blog" ? (content as PF_BLOG) : null;
  const catalogService =
    type === "CatalogService" ? (content as PF_CATALOG) : null;

  const videoId = getYouTubeId(project?.vidUrl || "");

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="p-0 max-w-full theme-wrapper bg-template-primary sm:max-w-4xl mx-auto min-h-[90vh] flex flex-col">
        {/* Header */}
        <DrawerHeader className="p-4 border-b">
          <DrawerTitle className="text-left text-xl flex flex-col gap-2">
            <span>
              {project?.heading ||
                teamMember?.name ||
                blog?.title ||
                catalogService?.title}
            </span>
            {teamMember && (
              <span className="text-left text-sm font-light">
                {teamMember?.designation}
              </span>
            )}
          </DrawerTitle>

          <DrawerClose className="absolute top-4 right-4 cursor-pointer">
            <LucideX className="size-8" />
          </DrawerClose>
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

            {!videoId && (
              <Image
                src={
                  project?.imgUrl ||
                  teamMember?.imgUrl ||
                  blog?.imgUrl ||
                  // TODO: have a different image component for catalog services
                  catalogService?.imgUrls[0] ||
                  "/placeholder.png"
                }
                alt={`${project?.heading || teamMember?.name}-img`}
                width={500}
                height={400}
                className="rounded w-full md:h-[400px] object-cover object-center"
              />
            )}
          </div>

          <div
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{
              __html:
                project?.description ||
                teamMember?.description ||
                blog?.description ||
                catalogService?.description ||
                "no description"
            }}
          />
        </div>

        {/* Fixed Footer Button */}
        {project && (
          <div className="p-4 border-t flex justify-start">
            <a
              href={project?.btnLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button>{project?.btnText}</Button>
            </a>
          </div>
        )}
        {catalogService && (
          <div className="p-4 border-t flex justify-start">
            <a
              href={catalogService.btnLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button>{catalogService.btnText}</Button>
            </a>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
};
