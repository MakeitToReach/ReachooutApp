"use client";
import React from "react";
import { PF_GALLERY_SECTION } from "../types/gallerySection";
import { PFGalleryCarousel } from "../components/PFGalleryCarousel";

export const PFGallerySection = ({ imgs, heading }: PF_GALLERY_SECTION) => {
    return (
        <section
            id="gallery"
            className="max-w-6xl mx-auto text-center overflow-hidden py-20"
        >
            <h1 className="text-4xl font-semibold text-template-text-primary md:text-6xl">
                {heading}
            </h1>
            <div className="flex px-4 mt-10 items-center justify-center">
                <PFGalleryCarousel images={imgs} />
            </div>
        </section>
    );
};
