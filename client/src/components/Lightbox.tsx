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
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="cursor-pointer transition-transform hover:scale-1.02">
          {children}
        </div>
      </DialogTrigger>
      <DialogContent
        showCloseButton={isMobile ? true : false}
        showDarkOverlay={true}
        className="w-screen min-h-screen bg-transparent border-0 shadow-none focus:outline-none focus:ring-0 overflow-scroll"
      >
        <DialogHeader className="sr-only hidden">
          <DialogTitle>image-lightbox</DialogTitle>
        </DialogHeader>

        <Image
          src={imageUrl}
          fill
          className="object-contain"
          alt={alt}
          priority
        />
      </DialogContent>
    </Dialog>
  );
};
