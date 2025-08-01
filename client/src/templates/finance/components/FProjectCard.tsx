import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { F_PROJECT } from "../types/projects.types";
import { FViewMoreDrawer } from "@/components/template-components/finance/FViewMoreDrawer";
import YouTube from "react-youtube";
import { getYouTubeVideoId } from "@/lib/utils";

export const FProjectCard = ({
  imgUrl,
  title,
  description,
  projectUrl = "#",
  category,
  btnText,
  btnLink,
  vidUrl,
}: F_PROJECT) => {
  // Extract videoId from videoUrl
  const videoId = getYouTubeVideoId(vidUrl);
  const showVideo = Boolean(videoId);

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
    <div className="h-fit sm:w-[22vw] w-full bg-template-primary text-template-text-primary rounded-lg overflow-hidden space-y-6 pb-6">
      {showVideo ? (
        <div className="w-full h-[250px]">
          <YouTube
            videoId={videoId || ""}
            opts={opts}
            className="w-full h-full"
            iframeClassName="w-full h-full"
          />
        </div>
      ) : (
        <Image
          src={imgUrl || "/placeholder.png"}
          alt="blog-img"
          width={400}
          height={250}
          className="w-full h-[250px] object-cover"
        />
      )}
      <div className="px-6 space-y-1">
        <h2 className="font-semibold text-xl tracking-tight text-template-text-primary">
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
    line-clamp-6
  "
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
      <div className="flex gap-2 px-6">
        <FViewMoreDrawer
          content={{ imgUrl, title, description, projectUrl, category, vidUrl }}
          type="Project"
        >
          <Button className="text-template-text-btn bg-template-btn rounded-sm text-lg hover:bg-template-btn cursor-pointer">
            View Details
            <ArrowUpRight size={16} />
          </Button>
        </FViewMoreDrawer>
        {btnLink && (
          <a href={btnLink} target="_blank" rel="noopener noreferrer">
            <Button className="text-template-btn bg-template-text-btn rounded-sm text-lg hover:bg-template-text-btn/80 cursor-pointer flex items-center gap-2 border border-template-btn/40">
              {btnText}
            </Button>
          </a>
        )}
      </div>
      {/* <div className="w-full flex justify-between items-center px-6">
        <FViewMoreDrawer
          type="Project"
          content={{ imgUrl, title, description, projectUrl, category }}
        >
          <Button
            variant={"link"}
            className="flex items-center px-0 text-lg text-template-text-primary font-semibold "
          >
            View Details
          </Button>
        </FViewMoreDrawer>
      </div> */}
    </div>
  );
};
