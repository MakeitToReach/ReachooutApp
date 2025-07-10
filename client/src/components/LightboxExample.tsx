"use client";

import React from "react";
import Image from "next/image";
import { Lightbox } from "./Lightbox";

interface LightboxExampleProps {
    imageUrl: string;
    thumbnailUrl?: string;
    alt?: string;
}

export const LightboxExample: React.FC<LightboxExampleProps> = ({
    imageUrl,
    thumbnailUrl,
    alt = "Clickable image"
}) => {
    return (
        <Lightbox imageUrl={imageUrl} alt={alt}>
            <Image
                src={thumbnailUrl || imageUrl}
                width={600}
                height={400}
                className="rounded-lg object-cover w-full h-auto"
                alt={alt}
            />
        </Lightbox>
    );
}; 