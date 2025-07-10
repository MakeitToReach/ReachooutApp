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
    <div className="relative w-full h-full">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <div className="cursor-pointer transition-transform hover:scale-1.02">
            {children}
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-[100vw] max-h-[100vh] w-screen h-screen p-0 border-0 bg-white m-0">
          <DialogHeader className="sr-only hidden">
            <DialogTitle>image-lightbox</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center w-full h-full relative">
            <Image
              src={imageUrl}
              width={1000}
              height={1000}
              className="max-w-full max-h-full object-contain"
              alt={alt}
              priority
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
