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
import { cn, getYouTubeVideoId } from "@/lib/utils";
import { getSocialIconFromRegistry } from "@/lib/utils";

import { PF_PROJECT } from "@/templates/professional/types/workSection";
import { Button } from "@/components/ui/button";
import { PF_TEAM_MEMBER } from "@/templates/professional/types/teamMember.types";
import { LucideX } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PF_BLOG } from "@/templates/professional/types/blog.types";
import { PF_CATALOG } from "@/templates/professional/types/serviceCatalog.types";
import { PF_ABOUT_SECTION } from "@/templates/professional/types/about.types";

interface ViewMoreDrawerProps {
  children: React.ReactNode;
  content:
    | PF_PROJECT
    | PF_TEAM_MEMBER
    | PF_BLOG
    | PF_CATALOG
    | PF_ABOUT_SECTION;
  type: "Project" | "TeamMember" | "Blog" | "CatalogService" | "About";
}

export const ViewMoreDrawer = ({
  content,
  children,
  type,
}: ViewMoreDrawerProps) => {
  const [open, setOpen] = React.useState(false);

  const project = type === "Project" ? (content as PF_PROJECT) : null;
  const teamMember = type === "TeamMember" ? (content as PF_TEAM_MEMBER) : null;
  const blog = type === "Blog" ? (content as PF_BLOG) : null;
  const catalogService =
    type === "CatalogService" ? (content as PF_CATALOG) : null;
  const about = type === "About" ? (content as PF_ABOUT_SECTION) : null;

  const videoId = getYouTubeVideoId(
    project?.vidUrl || catalogService?.vidUrl || ""
  );
  const catalogVideoId = getYouTubeVideoId(catalogService?.vidUrl || "");
  const blogVideoId = getYouTubeVideoId(blog?.vidUrl || "");

  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  React.useEffect(() => {
    setCurrentImageIndex(0);
  }, [content]);

  const handleInternalLink = (link: string) => {
    setOpen(false); // Close the drawer first
    if (link === "#") {
      return;
      // scrollTo({ top: 0, behavior: "smooth" });
    }
    setTimeout(() => {
      const element = document.querySelector(link);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 800); // 300ms delay
  };

  const nextImage = () => {
    if (catalogService?.imgUrls) {
      setCurrentImageIndex(
        (prev) => (prev + 1) % catalogService.imgUrls.length
      );
    }
  };

  const prevImage = () => {
    if (catalogService?.imgUrls) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? catalogService.imgUrls.length - 1 : prev - 1
      );
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="p-0 max-w-full theme-wrapper bg-template-primary sm:max-w-4xl mx-auto min-h-[90vh] sm:min-h-[95vh] flex flex-col rounded-xs">
        {/* Header */}
        <DrawerHeader className="p-4 border-b">
          <DrawerTitle className="text-left text-2xl flex flex-col gap-1">
            <span>
              {project?.heading ||
                teamMember?.name ||
                blog?.title ||
                catalogService?.title ||
                about?.heading}
            </span>
            {teamMember && (
              <span className="text-left text-base font-light">
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
            {type === "CatalogService" && catalogVideoId ? (
              <YouTube
                videoId={catalogVideoId}
                className="w-full max-w-full aspect-video"
                iframeClassName="w-full h-full"
              />
            ) : blogVideoId ? (
              <YouTube
                videoId={blogVideoId}
                className="w-full max-w-full aspect-video"
                iframeClassName="w-full h-full"
              />
            ) : videoId ? (
              <YouTube
                videoId={videoId}
                className="w-full max-w-full aspect-video"
                iframeClassName="w-full h-full"
              />
            ) : type === "CatalogService" &&
              catalogService &&
              catalogService.imgUrls &&
              catalogService.imgUrls.length > 0 ? (
              <div className="relative w-full h-[400px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={catalogService.imgUrls[currentImageIndex]}
                    initial={{ filter: "blur(10px)", opacity: 0 }}
                    animate={{ filter: "blur(0px)", opacity: 1 }}
                    exit={{ filter: "blur(10px)", opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <Image
                      src={
                        catalogService.imgUrls[currentImageIndex] ||
                        "https://reachooutassets.s3.ap-south-1.amazonaws.com/static/placeholder.png"
                      }
                      alt={`${catalogService.title}-img-${currentImageIndex}`}
                      fill
                      className="object-cover rounded"
                    />
                  </motion.div>
                </AnimatePresence>
                {catalogService.imgUrls.length > 1 && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/30" />
                    <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20">
                      <Button
                        onClick={prevImage}
                        variant="ghost"
                        className="p-2 rounded-full bg-white/80 text-black hover:bg-white/30 border border-white/30"
                      >
                        <ChevronLeft size={20} />
                      </Button>
                    </div>
                    <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20">
                      <Button
                        onClick={nextImage}
                        variant="ghost"
                        className="p-2 rounded-full bg-white/80 text-black hover:bg-white/30 border border-white/30"
                      >
                        <ChevronRight size={20} />
                      </Button>
                    </div>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
                      <div className="flex gap-2">
                        {catalogService.imgUrls.map((_, index) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              index === currentImageIndex
                                ? "bg-white"
                                : "bg-white/50"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              !about && (
                <Image
                  src={
                    project?.imgUrl ||
                    teamMember?.imgUrl ||
                    blog?.imgUrl ||
                    "https://reachooutassets.s3.ap-south-1.amazonaws.com/static/placeholder.png"
                  }
                  alt={`${project?.heading || teamMember?.name}-img`}
                  width={500}
                  height={400}
                  className={cn(
                    "rounded w-full sm:h-[400px] object-cover object-center",
                    project?.imgUrl && "sm:w-1/2"
                  )}
                />
              )
            )}
          </div>

          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{
              __html:
                project?.description ||
                teamMember?.description ||
                blog?.description ||
                catalogService?.description ||
                about?.description ||
                "no description",
            }}
          />
        </div>

        {/* Fixed Footer Button */}
        {project && project.btnLink && (
          <div className="p-4 border-t flex justify-start">
            {project?.btnLink?.startsWith("#") ? (
              <Button onClick={() => handleInternalLink(project.btnLink)}>
                {project?.btnText}
              </Button>
            ) : (
              <a
                href={project?.btnLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>{project?.btnText}</Button>
              </a>
            )}
          </div>
        )}
        {catalogService && catalogService.btnLink && (
          <div className="p-4 border-t flex justify-start">
            {catalogService?.btnLink?.startsWith("#") ? (
              <Button
                onClick={() => handleInternalLink(catalogService.btnLink)}
              >
                {catalogService.btnText}
              </Button>
            ) : (
              <a
                href={catalogService.btnLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>{catalogService.btnText}</Button>
              </a>
            )}
          </div>
        )}

        {blog && blog.btnLink && (
          <div className="p-4 border-t flex justify-start">
            <a href={blog.btnLink} target="_blank" rel="noopener noreferrer">
              <Button>{blog.btnText}</Button>
            </a>
          </div>
        )}

        {teamMember && teamMember.socials && teamMember.socials.length > 0 && (
          <div className="p-4 flex justify-start items-center">
            <div className="flex gap-2">
              {teamMember.socials
                .filter((social) => social.url)
                .map((social, index) => (
                  <a
                    key={index}
                    href={social.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    {getSocialIconFromRegistry(social.name)}
                  </a>
                ))}
            </div>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
};
