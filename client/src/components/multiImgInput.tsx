"use client"

import { AlertCircleIcon, ImageIcon, UploadIcon, XIcon } from "lucide-react"

import { useFileUpload } from "@/hooks/use-file-upload"
import { Button } from "@/components/ui/button"
import { uploadImage } from "@/api/image-upload"


interface MultipleImageInputProps {
  initialImages?: string[];
  onImageRemove?: (index: number) => void;
  onImageAdd?: (imgUrl: string) => void;
}

export function MultipleImageInput({ initialImages, onImageRemove, onImageAdd }: MultipleImageInputProps) {
  const maxSizeMB = 5
  const maxSize = maxSizeMB * 1024 * 1024 // 5MB default
  const maxFiles = 6

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
    multiple: true,
    maxFiles,
    initialFiles: initialImages?.map((imgUrl, index) => ({ 
      url: imgUrl, 
      name: `image-${index + 1}`, 
      size: 100, 
      type: "image/png", 
      id: `initial-${index}-${Date.now()}` 
    })) || [],
    onFilesAdded: async (addedFiles) => {
      // Upload all added files to S3 concurrently
      const fileUploads = addedFiles
        .filter((fileWithPreview) => fileWithPreview.file instanceof File)
        .map(async (fileWithPreview) => {
          const file = fileWithPreview.file as File
          try {
            // Assuming you have an uploadImage function for multiImgInput as well
            // You'll need to import it or pass it as a prop
            const url = await uploadImage(file)
            console.log("Uploaded to S3:", url)
            return url
          } catch (error) {
            console.error("Failed to upload image:", error)
            throw error
          }
        })

      try {
        const urls = await Promise.all(fileUploads)
        // Call the callback with the uploaded URLs
        urls.forEach((url: string) => onImageAdd?.(url))
      } catch (error) {
        console.error("One or more uploads failed:", error)
        // You might want to show an error message to the user here
      }
    },
  })

  return (
    <div className="flex flex-col gap-2">
      {/* Drop area */}
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-dragging={isDragging || undefined}
        data-files={files.length > 0 || undefined}
        className="border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors not-data-[files]:justify-center has-[input:focus]:ring-[3px]"
      >
        <input
          {...getInputProps()}
          className="sr-only"
          aria-label="Upload image file"
        />
        {files.length > 0 ? (
          <div className="flex w-full flex-col gap-3 dark">
            <div className="flex items-center justify-between gap-2">
              <h3 className="truncate text-sm font-medium">
                Uploaded Files ({files.length})
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={openFileDialog}
                disabled={files.length >= maxFiles}
              >
                <UploadIcon
                  className="-ms-0.5 size-3.5 opacity-60"
                  aria-hidden="true"
                />
                Add more
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="bg-accent relative aspect-square rounded-md"
                >
                  <img
                    src={file.preview}
                    alt={file.file.name}
                    className="size-40 rounded-[inherit] object-cover"
                  />
                  <Button
                    onClick={() => {
                      removeFile(file.id)
                      // Call onImageRemove if this is an initial image
                      if (file.file && typeof file.file === 'object' && 'url' in file.file) {
                        const fileMetadata = file.file as { url: string }
                        const initialIndex = initialImages?.indexOf(fileMetadata.url)
                        if (initialIndex !== undefined && initialIndex >= 0) {
                          onImageRemove?.(initialIndex)
                        }
                      }
                    }}
                    size="icon"
                    className="border-background focus-visible:border-background absolute -top-2 -right-2 size-6 rounded-full border-2 shadow-none"
                    aria-label="Remove image"
                  >
                    <XIcon className="size-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
            <div
              className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
              aria-hidden="true"
            >
              <ImageIcon className="size-4 opacity-60" />
            </div>
            <p className="mb-1.5 text-sm font-medium">Drop your images here</p>
            <p className="text-muted-foreground text-xs">
              SVG, PNG, JPG or GIF (max. {maxSizeMB}MB)
            </p>
            <Button variant="outline" className="mt-4" onClick={openFileDialog}>
              <UploadIcon className="-ms-1 opacity-60" aria-hidden="true" />
              Select images
            </Button>
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
