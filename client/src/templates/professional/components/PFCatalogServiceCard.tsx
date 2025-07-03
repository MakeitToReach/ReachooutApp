"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PF_CATALOG } from "../types/serviceCatalog.types";
import { ViewMoreDrawer } from "@/components/template-components/professional/viewMoreDrawer";

export const PFCatalogServicesCard = ({
    imgUrls,
    title,
    description,
    btnText,
    btnLink,
    category,
}: PF_CATALOG) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const catalogServiceContent = {
        title,
        description,
        imgUrls,
        btnText,
        btnLink,
        category,
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % imgUrls.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [imgUrls.length]);

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % imgUrls.length);
    };
    const prevImage = () => {
        setCurrentIndex((prev) => (prev === 0 ? imgUrls.length - 1 : prev - 1));
    };

    return (
        <div className="relative h-fit sm:w-[20vw] flex flex-col border border-template-accent-primary w-full text-template-text-secondary overflow-visible rounded-lg space-y-6 pb-6">
            <div className="relative w-full h-[250px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        layout
                        key={imgUrls[currentIndex]}
                        initial={{ filter: "blur(10px)", opacity: 0 }}
                        animate={{ filter: "blur(0px)", opacity: 1 }}
                        exit={{ filter: "blur(10px)", opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <Image
                            src={imgUrls[currentIndex]}
                            alt={`service-img-${currentIndex}`}
                            fill
                            className="object-cover rounded-t-lg"
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Gradient to make arrows visible */}
                <div className="absolute h-full bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent z-10" />

                {/* Prev/Next buttons only */}
                <div className="absolute bottom-2 right-2 z-20 flex gap-2">
                    <Button
                        onClick={prevImage}
                        variant="ghost"
                        className="p-2 rounded-full dark border-white text-white hover:bg-white/10"
                    >
                        <ChevronLeft size={16} />
                    </Button>
                    <Button
                        onClick={nextImage}
                        variant="ghost"
                        className="p-2 rounded-full dark border-white text-white hover:bg-white/10"
                    >
                        <ChevronRight size={16} />
                    </Button>
                </div>
            </div>

            {/* Text content */}
            <div className="px-6 space-y-1 text-center">
                <h2 className="font-semibold text-lg tracking-tight">{title}</h2>
                {/* <p className="text-xs line-clamp-3 leading-6 text-gray-600"> */}
                {/*     {description} */}
                {/* </p> */}
            </div>

            <ViewMoreDrawer type="CatalogService" content={catalogServiceContent}>
                <button className="flex self-center items-center px-2 rounded-md z-30 font-semibold border border-template-accent-primary">
                    See More
                </button>
            </ViewMoreDrawer>
        </div>
    );
};
