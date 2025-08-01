import { useState } from "react";
import { Label } from "@/components/ui/label";
import { MultipleImageInput } from "@/components/multiImgInput";
import { ReqInput } from "./reqInput";
import { cn } from "@/lib/utils";

interface MultiImageVideoInputProps {
  initialImages?: string[];
  initialVideoUrl?: string;
  onImageAdd?: (imgUrl: string) => void;
  onImageRemove?: (index: number) => void;
  onVideoUrlChange: (videoUrl: string) => void;
  className?: string;
}

export const MultiImageVideoInput = ({
  initialImages = [],
  initialVideoUrl = "",
  onImageAdd,
  onImageRemove,
  onVideoUrlChange,
  className = "",
}: MultiImageVideoInputProps) => {
  const [videoUrl, setVideoUrl] = useState(initialVideoUrl);

  const handleVideoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVideoUrl = e.target.value;
    setVideoUrl(newVideoUrl);
    onVideoUrlChange(newVideoUrl);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Label className="text-lg">Images or Video</Label>
      <div className="flex flex-col md:gap-6 gap-6 w-full">
        <MultipleImageInput
          initialImages={initialImages}
          onImageAdd={onImageAdd}
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