"use client";
import React from "react";
import { PF_GALLERY_SECTION } from "../types/gallerySection";
import { PFGalleryCarousel } from "../components/PFGalleryCarousel";
import { motion as m } from "motion/react";

const delay = 0.15;

export const PFGallerySection = ({ imgs, heading, subheading }: PF_GALLERY_SECTION) => {
  return (
    <section
      id="gallery"
      className="max-w-6xl mx-auto text-center overflow-hidden py-20"
    >
      <m.h1
        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{
          duration: 0.5,
          delay: delay,
          ease: "easeOut",
        }}
        viewport={{ amount: 0.5, once: true }}
        className="text-4xl font-semibold text-template-text-primary sm:text-6xl text-center"
      >
        {heading}
      </m.h1>
      {subheading && (
        <m.p
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.5,
            delay: delay * 1.5,
            ease: "easeOut",
          }}
          viewport={{ amount: 0.5, once: true }}
          className="text-lg sm:text-xl text-center text-template-text-primary/50 max-w-2xl mx-auto my-10"
        >
          {subheading}
        </m.p>
      )}
      <m.div
        initial={{ opacity: 0, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        transition={{
          duration: 0.5,
          delay: delay * 2,
          ease: "easeOut",
        }}
        viewport={{ amount: 0, once: true }}
        className="flex px-4 mt-10 items-center justify-center"
      >
        <PFGalleryCarousel images={imgs} />
      </m.div>
    </section>
  );
};
