"use client";
import { LayoutGridDemo } from "@/components/template-components/professional/galleryLayout";
import React from "react";

// interface PFGallerySectionProps {
//     images: string[];
// }
export const PFGallerySection = () => {
    return (
        <section id="gallery" className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl font-semibold md:text-6xl">Gallery</h1>
            <div className="flex gap-2 mt-10">
                <LayoutGridDemo />
            </div>
        </section>
    );
};
