"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { X } from "lucide-react";

interface LightboxProps {
  children: React.ReactNode;
  imageUrl: string;
  alt?: string;
}

export const Lightbox: React.FC<LightboxProps> = ({
  children,
  imageUrl,
  alt = "Lightbox image",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="cursor-pointer transition-transform hover:scale-1.02">
          {children}
        </div>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        showDarkOverlay={true}
        className="min-w-screen min-h-screen bg-transparent border-0 shadow-none focus:outline-none focus:ring-0 overflow-hidden"
      >
        <DialogHeader className="sr-only hidden">
          <DialogTitle>image-lightbox</DialogTitle>
        </DialogHeader>
        
        <div className="relative w-full h-full">
          <Image
            src={imageUrl}
            fill
            className="object-contain"
            alt={alt}
            priority
          />
          <button
            onClick={() => setIsOpen(false)}
            className="absolute sm:top-0 top-8 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6 text-black" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
