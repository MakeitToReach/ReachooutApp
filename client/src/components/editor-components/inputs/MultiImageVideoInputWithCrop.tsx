import { useState } from "react";
import { Label } from "@/components/ui/label";
import { MultipleImageInputWithCrop } from "@/components/MultipleImageInputWithCrop";
import { ReqInput } from "./reqInput";
import { cn } from "@/lib/utils";
import { getCropOptions, CROP_PRESETS } from "@/components/ui/ImageInputPresets";

interface MultiImageVideoInputWithCropProps {
  initialImages?: string[];
  initialVideoUrl?: string;
  onImageAdd?: (imgUrl: string) => void;
  onImageRemove?: (index: number) => void;
  onVideoUrlChange: (videoUrl: string) => void;
  className?: string;
  cropPreset?: keyof typeof CROP_PRESETS;
  maxFiles?: number;
  maxSizeMB?: number;
}

export const MultiImageVideoInputWithCrop = ({
  initialImages = [],
  initialVideoUrl = "",
  onImageAdd,
  onImageRemove,
  onVideoUrlChange,
  className = "",
  cropPreset = "SQUARE",
  maxFiles = 6,
  maxSizeMB = 2
}: MultiImageVideoInputWithCropProps) => {
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
        <MultipleImageInputWithCrop
          initialImages={initialImages}
          onImageAdd={onImageAdd}
          onImageRemove={onImageRemove}
          cropOptions={getCropOptions(cropPreset)}
          maxFiles={maxFiles}
          maxSizeMB={maxSizeMB}
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