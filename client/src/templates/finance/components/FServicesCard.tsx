import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { FViewMoreDrawer } from "@/components/template-components/finance/FViewMoreDrawer";
import { F_SERVICE } from "../types/services.types";
import YouTube from "react-youtube";
import { getYouTubeVideoId } from "@/lib/utils";

export const FServicesCard = ({
  imgUrl,
  title,
  description,
  category,
  btnText,
  btnLink,
  vidUrl,
}: F_SERVICE) => {
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
    <div className="h-fit w-full bg-template-primary text-template-text-primary rounded-lg overflow-hidden space-y-6 pb-6 shadow-lg shadow-black/30">
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
    line-clamp-6
  "
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
      <div className="w-full flex justify-between items-center px-6">
        <FViewMoreDrawer
          type="Services"
          content={{ imgUrl, title, description, category: category || "", btnText, btnLink, vidUrl }}
        >
          <Button
            variant={"link"}
            className="flex items-center px-0 text-template-text-primary font-semibold text-xl sm:text-base"
          >
            View Details
          </Button>
        </FViewMoreDrawer>
        <FViewMoreDrawer
          type="Services"
          content={{ imgUrl, title, description, category: category || "", btnText, btnLink, vidUrl }}
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
