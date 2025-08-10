"use client"

import { AlertCircleIcon, ImageIcon, UploadIcon, XIcon } from "lucide-react"

import { useFileUpload } from "@/hooks/use-file-upload"
import { Button } from "@/components/ui/button"
import { uploadImage } from "@/api/image-upload"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface ImageInputProps {
  onImageUpload?: (imgUrl: string) => void
  onImageRemove?: () => void
  initialImgUrl?: string
  className?: string
}

export function ImageInput({ onImageUpload, onImageRemove, initialImgUrl, className }: ImageInputProps) {
  const maxSizeMB = 1
  const maxSize = maxSizeMB * 1024 * 1024 // 2MB default

  const [isUploading, setIsUploading] = useState(false)

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
      const fileWithPreview = addedFiles[0].file
      if (fileWithPreview instanceof File) {
        try {
          setIsUploading(true)
          const url = await uploadImage(fileWithPreview)
          // console.log("Uploaded to S3:", url)
          onImageUpload?.(url.imgUrl || "")
        } catch (error) {
          console.error("Failed to upload image:", error)
          toast.error("Failed to upload image")
        } finally {
          setIsUploading(false)
        }
      }
    },
  })
  const previewUrl = files[0]?.preview || null

  return (
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
                removeFile(files[0]?.id)
                onImageRemove?.()
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
  )
}
