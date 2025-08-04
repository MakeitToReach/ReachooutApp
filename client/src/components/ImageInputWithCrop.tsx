import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ImageIcon, UploadIcon, XIcon, AlertCircleIcon } from "lucide-react";
import { useFileUpload } from "@/hooks/use-file-upload";
import { uploadImage } from "@/api/image-upload";
import { toast } from "sonner";
import { CropModal } from "@/components/ui/CropModal";

interface CropOptions {
  aspectRatio?: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
}

interface ImageInputWithCropProps {
  onImageUpload?: (url: string) => void;
  onImageRemove?: () => void;
  initialImgUrl?: string;
  className?: string;
  cropOptions?: CropOptions;
  maxSizeMB?: number;
}

export function ImageInputWithCrop({ 
  onImageUpload, 
  onImageRemove, 
  initialImgUrl, 
  className,
  cropOptions = {
    aspectRatio: 1,
    minWidth: 100,
    minHeight: 100,
    maxWidth: 2000,
    maxHeight: 2000
  },
  maxSizeMB = 2
}: ImageInputWithCropProps) {
  const maxSize = maxSizeMB * 1024 * 1024;
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showCropModal, setShowCropModal] = useState(false);

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    accept: "image/svg+xml,image/png,image/jpeg,image/jpg,image/gif",
    maxSize,
    initialFiles: initialImgUrl ? [{ url: initialImgUrl, name: "image", size: 100, type: "image", id: "image" }] : [],
    onFilesAdded: async (addedFiles) => {
      const file = addedFiles[0].file;
      if (file instanceof File) {
        // Instead of uploading immediately, show crop modal
        setSelectedFile(file);
        setShowCropModal(true);
      }
    },
  });

  const handleCropComplete = async (croppedBlob: Blob) => {
    if (!selectedFile) return;
    
    try {
      setIsUploading(true);
      // Convert Blob to File
      const croppedFile = new File([croppedBlob], selectedFile.name, {
        type: selectedFile.type
      });
      
      const url = await uploadImage(croppedFile);
      onImageUpload?.(url.imgUrl || "");
      setShowCropModal(false);
      setSelectedFile(null);
    } catch (error) {
      console.error("Failed to upload cropped image:", error);
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleCropCancel = () => {
    setShowCropModal(false);
    setSelectedFile(null);
    // Remove the file from the upload state
    if (files[0]?.id) {
      removeFile(files[0].id);
    }
  };

  const previewUrl = files[0]?.preview || null;

  return (
    <>
      <div className={cn("flex flex-col gap-2", className)}>
        <div className="relative">
          {/* Drop area */}
          <div
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            data-dragging={isDragging || undefined}
            className="border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-border p-4 transition-colors has-[input:focus]:ring-[3px]"
          >
            <input
              {...getInputProps()}
              className="sr-only"
              aria-label="Upload image file"
            />
            {previewUrl ? (
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <img
                  src={previewUrl}
                  alt={files[0]?.file?.name || "Uploaded image"}
                  className={cn("mx-auto max-h-full rounded object-contain", isUploading ? "animate-pulse" : "")}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
                <div
                  className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
                  aria-hidden="true"
                >
                  <ImageIcon className="size-4 opacity-60" />
                </div>
                <p className="mb-1.5 text-sm font-medium">Drop your image here</p>
                <p className="text-muted-foreground text-xs">
                  SVG, PNG, JPG or GIF (max. {maxSizeMB}MB)
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={openFileDialog}
                >
                  <UploadIcon
                    className="-ms-1 size-4 opacity-60"
                    aria-hidden="true"
                  />
                  Select image
                </Button>
              </div>
            )}
          </div>

          {previewUrl && (
            <div className="absolute top-4 right-4">
              <button
                type="button"
                className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
                onClick={() => {
                  removeFile(files[0]?.id);
                  onImageRemove?.();
                }}
                aria-label="Remove image"
              >
                <XIcon className="size-4" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>

        {errors.length > 0 && (
          <div
            className="text-destructive flex items-center gap-1 text-xs"
            role="alert"
          >
            <AlertCircleIcon className="size-3 shrink-0" />
            <span>{errors[0]}</span>
          </div>
        )}
      </div>

      {/* Crop Modal */}
      {showCropModal && selectedFile && (
        <CropModal
          file={selectedFile}
          cropOptions={cropOptions}
          onCropComplete={handleCropComplete}
          onCancel={handleCropCancel}
        />
      )}
    </>
  );
} 