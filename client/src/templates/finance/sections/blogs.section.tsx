import { FBlogCard } from "../components/FBlogCard";
import { F_BLOGS_SECTION } from "../types/blogs.types";
import { motion as m } from "motion/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";

const delay = 0.15;

export const FBlogsSection = ({ heading, blogs }: F_BLOGS_SECTION) => {
    return (
        <section id="blogs" className="w-full rounded-lg overflow-hidden py-20">
            <div className="max-w-6xl mx-auto h-full my-10 space-y-8 overflow-x-visible ">
                <m.h2
                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                    duration: 0.5,
                    delay: delay,
                    ease: "easeOut",
                }}
                className="text-center font-semibold text-5xl tracking-tight text-template-text-primary">
                    {heading}
                </m.h2>
                <m.div
                    initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                        duration: 0.5,
                        delay: delay * 2,
                        ease: "easeOut",
                    }}
                    viewport={{ amount: 0.5, once: true }}
                    className="relative w-full mt-10 px-4 sm:px-0"
                >
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="md:-ml-4">
                            {blogs.map((blog, idx) => (
                                <CarouselItem key={idx} className="sm:basis-1/3 basis-1/1">
                                    <FBlogCard
                                        imgUrl={blog.imgUrl}
                                        title={blog.title}
                                        description={blog.description}
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        {/* Custom Navigation Buttons */}
                        <div className="flex gap-2 mt-8">
                            <CarouselPrevious className="static translate-y-0 bg-transparent border-template-text-primary/80 text-template-text-primary">
                                <ChevronLeft className="h-4 w-4" />
                            </CarouselPrevious>
                            <CarouselNext className="static translate-y-0 bg-transparent border-template-text-primary/80 text-template-text-primary">
                                <ChevronRight className="h-4 w-4" />
                            </CarouselNext>
                        </div>
                    </Carousel>
                </m.div>
            </div>
        </section>
    );
};
