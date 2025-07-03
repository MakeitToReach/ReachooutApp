"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import {
    Autoplay,
    EffectCoverflow,
    Navigation,
    Pagination,
} from "swiper/modules";

import { PF_GALLERY_IMG } from "../types/gallerySection";

interface CarouselProps {
    images: PF_GALLERY_IMG[];
    autoplayDelay?: number;
    showPagination?: boolean;
    showNavigation?: boolean;
}

export const PFGalleryCarousel: React.FC<CarouselProps> = ({
    images,
    autoplayDelay = 2500,
    showPagination = true,
    showNavigation = true,
}) => {
    const css = `
        .swiper {
            width: 100%;
            padding-bottom: 40px;
        }

        .swiper-slide {
            background-position: center;
            background-size: cover;
            width: 250px;
            max-width: 90vw;
        }

        .swiper-slide img {
            display: block;
            width: 100%;
            height: auto;
        }

        .swiper-3d .swiper-slide-shadow-left,
        .swiper-3d .swiper-slide-shadow-right {
            background-image: none;
        }
    `;

    return (
        <section className="w-full px-4">
            <style>{css}</style>
            <div className="w-full mx-auto max-w-7xl">
                <Swiper
                    spaceBetween={50}
                    autoplay={{
                        delay: autoplayDelay,
                        disableOnInteraction: false,
                    }}
                    effect={"coverflow"}
                    grabCursor={true}
                    centeredSlides={true}
                    loop={true}
                    slidesPerView={"auto"}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 2.5,
                    }}
                    pagination={showPagination}
                    navigation={
                        showNavigation
                            ? {
                                  nextEl: ".swiper-button-next",
                                  prevEl: ".swiper-button-prev",
                              }
                            : undefined
                    }
                    modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={`first-${index}`}>
                            <div className="overflow-hidden rounded-2xl">
                                <Image
                                    src={image.src}
                                    width={600}
                                    height={400}
                                    className="rounded-xl object-cover w-full h-auto"
                                    alt={image.alt}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                    {images.map((image, index) => (
                        <SwiperSlide key={`second-${index}`}>
                            <div className="overflow-hidden rounded-2xl">
                                <Image
                                    src={image.src}
                                    width={600}
                                    height={400}
                                    className="rounded-xl object-cover w-full h-auto"
                                    alt={image.alt}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};
