import Image from "next/image";
import YouTube from "react-youtube";
import { getYouTubeVideoId } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ImageVideoProps {
  imgUrl?: string;
  vidUrl?: string;
  alt?: string;
  width?: number;
  height?: number;
  imageClassName?: string;
  embedClassName?: string;
  iframeClassName?: string;
  fallbackImgUrl?: string;
}

export const ImageVideo = ({
  imgUrl,
  vidUrl,
  alt = "media content",
  width = 400,
  height = 250,
  imageClassName = "",
  embedClassName = "",
  iframeClassName = "",
  fallbackImgUrl = "/placeholder.png",
}: ImageVideoProps) => {
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
    <>
      {showVideo ? (
        <div className={cn("w-full h-full", embedClassName)}>
          <YouTube
            videoId={videoId || ""}
            opts={opts}
            className={cn("w-full h-full", embedClassName)}
            iframeClassName={cn("w-full h-full", iframeClassName)}
          />
        </div>
      ) : (
        <Image
          src={imgUrl || fallbackImgUrl}
          alt={alt}
          width={width}
          height={height}
          className={cn("w-full h-full object-cover", imageClassName)}
        />
      )}
    </>
  );
}; 