import { BookOpen, ImageDown, Ticket, Newspaper } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ReferencesButtons() {
  return (
    <ScrollArea className="w-full">
      <div className="inline-flex -space-x-px rounded-md shadow-xs rtl:space-x-reverse overflow-x-auto whitespace-nowrap pr-4">
        <Button
          asChild
          className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10 text-lg"
          variant="outline"
        >
          <a
            href="https://reachoout.com/help/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BookOpen
              className="-ms-1 opacity-60"
              size={16}
              aria-hidden="true"
            />
            Tutorials
          </a>
        </Button>
        <Button
          asChild
          className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10 text-lg"
          variant="outline"
        >
          <a
            href="https://pixabay.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ImageDown
              className="-ms-1 opacity-60"
              size={16}
              aria-hidden="true"
            />
            Download Free Images
          </a>
        </Button>
        <Button
          asChild
          className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10 text-lg"
          variant="outline"
        >
          <a
            href="https://imageresizer.com/crop-image"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ImageDown
              className="-ms-1 opacity-60"
              size={16}
              aria-hidden="true"
            />
            Image Cropper
          </a>
        </Button>
        <Button
          asChild
          className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10 text-lg"
          variant="outline"
        >
          <a
            href="https://imageresizer.com/image-compressor"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ImageDown
              className="-ms-1 opacity-60"
              size={16}
              aria-hidden="true"
            />
            Reduce Image Size
          </a>
        </Button>
        <Button
          asChild
          className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10 text-lg"
          variant="outline"
        >
          <a
            href="https://reachoout.com/support/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Ticket className="-ms-1 opacity-60" size={16} aria-hidden="true" />
            Reachoout Support
          </a>
        </Button>
        <Button
          asChild
          className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10 text-lg"
          variant="outline"
        >
          <a
            href="https://reachoout.com/resources/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Newspaper
              className="-ms-1 opacity-60"
              size={16}
              aria-hidden="true"
            />
            Product Blog
          </a>
        </Button>
      </div>
    </ScrollArea>
  );
}
