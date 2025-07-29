"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LucideArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FViewMoreDrawer } from "@/components/template-components/finance/FViewMoreDrawer";

interface FCatalogServicesCardProps {
    imgUrls: string[];
    title: string;
    description: string;
    category?: string;
}

export const FCatalogServicesCard = ({
    imgUrls,
    title,
    description,
    category,
}: FCatalogServicesCardProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % imgUrls.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [imgUrls.length]);

    const nextImage = () =>
        setCurrentIndex((prev) => (prev + 1) % imgUrls.length);
    const prevImage = () =>
        setCurrentIndex((prev) => (prev === 0 ? imgUrls.length - 1 : prev - 1));

    return (
        <div className="h-fit sm:w-[20vw] w-full bg-template-primary text-template-text-primary rounded-lg overflow-hidden space-y-6 pb-6">
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
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent z-10" />

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
            <div className="px-6 space-y-1">
                <h2 className="font-semibold text-lg tracking-tight text-template-text-primary">
                    {title}
                </h2>
                <div
                    className="
    prose prose-xl sm:prose-base max-w-none text-template-text-primary/80
    prose-p:text-template-text-primary/80
    prose-strong:text-template-text-primary/80
    prose-h1:text-template-text-primary/80
    prose-h2:text-template-text-primary/80
    prose-h3:text-template-text-primary/80
    prose-h4:text-template-text-primary/80
    prose-h5:text-template-text-primary/80
    prose-h6:text-template-text-primary/80
  "
                    dangerouslySetInnerHTML={{ __html: description }}
                />
            </div>

            {/* "View Details" and arrow button (below image) */}
            <div className="w-full flex justify-between items-center px-6">
                <FViewMoreDrawer type="Catalog" content={{ imgUrls, title, description, category: category || "" }}>
                    <Button
                        variant="link"
                        className="flex items-center px-0 text-template-accent-primary font-semibold"
                    >
                        View Details
                    </Button>
                </FViewMoreDrawer>
                <Button
                    variant="outline"
                    className="flex items-center text-black p-2 rounded-full font-semibold"
                >
                    <LucideArrowRight size={20} />
                </Button>
            </div>
        </div>
    );
};
