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
import { Button } from "@/components/ui/button";
import { LucideX, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Finance template types
import { F_BLOG } from "@/templates/finance/types/blogs.types";
import { F_PROJECT } from "@/templates/finance/types/projects.types";
import { F_SERVICE } from "@/templates/finance/types/services.types";
import { F_CATLOG_SERVICES } from "@/templates/finance/types/service-catalog.types";
import { F_TEAM_MEMBER } from "@/templates/finance/types/team.types";
import { F_ABOUT_SECTION } from "@/templates/finance/types/about.types";

interface FViewMoreDrawerProps {
  children: React.ReactNode;
  content:
    | F_BLOG
    | F_PROJECT
    | F_SERVICE
    | F_CATLOG_SERVICES
    | F_TEAM_MEMBER
    | F_ABOUT_SECTION;
  type: "Blog" | "Project" | "Services" | "Catalog" | "Team" | "About";
}

export const FViewMoreDrawer = ({
  content,
  children,
  type,
}: FViewMoreDrawerProps) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const blog = type === "Blog" ? (content as F_BLOG) : null;
  const project = type === "Project" ? (content as F_PROJECT) : null;
  const service = type === "Services" ? (content as F_SERVICE) : null;
  const catalogService =
    type === "Catalog" ? (content as F_CATLOG_SERVICES) : null;
  const teamMember = type === "Team" ? (content as F_TEAM_MEMBER) : null;
  const aboutSection = type === "About" ? (content as F_ABOUT_SECTION) : null;

  const videoId = getYouTubeVideoId(
    project?.vidUrl || catalogService?.vidUrl || blog?.vidUrl || ""
  );
  const catalogVideoId = getYouTubeVideoId(catalogService?.vidUrl || "");
  const blogVideoId = getYouTubeVideoId(blog?.vidUrl || "");

  // Reset image index when drawer opens
  React.useEffect(() => {
    setCurrentImageIndex(0);
  }, [content]);

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

  // Add handleInternalLink function (after useEffect)
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
    }, 800);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>

      <DrawerContent className="sm:px-8 max-w-full theme-wrapper bg-template-primary sm:max-w-7xl mx-auto sm:min-h-[95vh] min-h-[90vh] flex flex-col">
        {/* Header */}
        <DrawerHeader className="p-4 border-b">
          <DrawerTitle className="text-left text-3xl flex flex-col gap-2">
            <span>
              {blog?.title ||
                project?.title ||
                service?.title ||
                catalogService?.title ||
                teamMember?.name ||
                aboutSection?.title}
            </span>
            {teamMember && (
              <span className="text-left text-xl font-light">
                {teamMember.designation}
              </span>
            )}
            {(project || service || catalogService) && (
              <span className="text-left text-xl font-light">
                {project?.category ||
                  service?.category ||
                  catalogService?.category}
              </span>
            )}
          </DrawerTitle>

          <DrawerClose className="absolute top-4 right-4 cursor-pointer">
            <LucideX className="size-8" />
          </DrawerClose>
        </DrawerHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Media Section */}
          <div className="flex justify-center sm:h-[55vh]">
            {type === "Catalog" && catalogVideoId ? (
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
            ) : type === "Catalog" &&
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
                        "/placeholder.png"
                      }
                      alt={`${catalogService.title}-img-${currentImageIndex}`}
                      fill
                      className="object-contain rounded-xl"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation buttons for catalog images */}
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
              !blog &&
              !service &&
              !teamMember &&
              !aboutSection && (
                <Image
                  src={project?.imgUrl || "/placeholder.png"}
                  alt={`${project?.title}-img`}
                  width={500}
                  height={400}
                  className={cn(
                    "rounded-xl w-full sm:h-[400px] object-contain object-center"
                  )}
                />
              )
            )}

            {blog && !blog.vidUrl && (
              <Image
                src={blog.imgUrl || "/placeholder.png"}
                alt={`${blog.title}-img`}
                width={1000}
                height={1000}
                className="rounded-xl w-full md:h-[400px] object-contain object-center"
              />
            )}

            {service && (
              <Image
                src={service.imgUrl || "/placeholder.png"}
                alt={`${service.title}-img`}
                width={1000}
                height={1000}
                className="rounded-xl w-full md:h-[400px] object-contain object-center"
              />
            )}

            {teamMember && (
              <Image
                src={teamMember.imgUrl || "/placeholder.png"}
                alt={`${teamMember.name}-img`}
                width={1000}
                height={1000}
                className="rounded-xl w-full sm:h-[400px] object-contain object-center"
              />
            )}

            {aboutSection && (
              <Image
                src={aboutSection.imgUrl || "/placeholder.png"}
                alt={`${aboutSection.title}-img`}
                width={1000}
                height={1000}
                className="rounded-xl w-full md:h-[400px] object-contain object-center"
              />
            )}
          </div>

          {/* Description Section */}
          <div className="space-y-4">
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{
                __html:
                  blog?.description ||
                  project?.description ||
                  service?.description ||
                  catalogService?.description ||
                  teamMember?.description ||
                  aboutSection?.description ||
                  "",
              }}
            />
          </div>
        </div>

        {/* Fixed Footer Buttons */}

        {project && project.btnLink && (
          <div className="p-4 border-t flex justify-start">
            {project.btnLink.startsWith("#") ? (
              <Button onClick={() => handleInternalLink(project.btnLink!)}>
                {project.btnText}
              </Button>
            ) : (
              <a
                href={project.btnLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>{project.btnText}</Button>
              </a>
            )}
          </div>
        )}

        {teamMember && teamMember.socials && teamMember.socials.length > 0 && (
          <div className="p-4 flex justify-start">
            <div className="flex gap-2">
              {teamMember.socials
                .filter((social) => social.url)
                .map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
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
        {catalogService && catalogService.btnLink && (
          <div className="p-4 border-t flex justify-start">
            {catalogService.btnLink.startsWith("#") ? (
              <Button
                onClick={() => handleInternalLink(catalogService.btnLink!)}
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
            {blog.btnLink.startsWith("#") ? (
              <Button onClick={() => handleInternalLink(blog.btnLink!)}>
                {blog.btnText}
              </Button>
            ) : (
              <a href={blog.btnLink} target="_blank" rel="noopener noreferrer">
                <Button>{blog.btnText}</Button>
              </a>
            )}
          </div>
        )}

        {service && service.btnLink && (
          <div className="p-4 border-t flex justify-start">
            {service.btnLink.startsWith("#") ? (
              <Button onClick={() => handleInternalLink(service.btnLink!)}>
                {service.btnText}
              </Button>
            ) : (
              <a
                href={service.btnLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>{service.btnText}</Button>
              </a>
            )}
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
};
