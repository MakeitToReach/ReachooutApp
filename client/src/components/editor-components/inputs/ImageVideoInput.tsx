import { useState } from "react";
import { Label } from "@/components/ui/label";
import { ImageInput } from "@/components/imgInput";
import { ReqInput } from "./reqInput";
import { cn } from "@/lib/utils";

interface ImageVideoInputProps {
  initialImgUrl?: string;
  initialVideoUrl?: string;
  onImageUpload: (imgUrl: string) => void;
  onImageRemove: () => void;
  onVideoUrlChange: (videoUrl: string) => void;
  className?: string;
}

export const ImageVideoInput = ({
  initialImgUrl = "",
  initialVideoUrl = "",
  onImageUpload,
  onImageRemove,
  onVideoUrlChange,
  className = "",
}: ImageVideoInputProps) => {
  const [videoUrl, setVideoUrl] = useState(initialVideoUrl);

  const handleVideoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVideoUrl = e.target.value;
    setVideoUrl(newVideoUrl);
    onVideoUrlChange(newVideoUrl);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Label className="text-lg">Image or Video</Label>
      <div className="flex flex-col md:gap-6 gap-6 w-full">
        <ImageInput
          initialImgUrl={initialImgUrl}
          className="w-full"
          onImageUpload={onImageUpload}
          onImageRemove={onImageRemove}
        />
        <h2 className="text-sm font-semibold text-center">OR</h2>
        <ReqInput
          className="w-full"
          label="Video URL"
          type="text"
          placeholder="https://youtube.com/watch?v=******"
          value={videoUrl}
          onChange={handleVideoUrlChange}
        />
      </div>
    </div>
  );
}; 