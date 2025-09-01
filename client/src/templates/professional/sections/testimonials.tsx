import { Marquee } from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";
import { PF_TESTIMONIAL_SECTION } from "../types/testimonials.types";
import { motion as m } from "motion/react";
import { useState } from "react";
import Image from "next/image";

const delay = 0.15;

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username?: string;
  body: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Check if content is longer than 8 lines (approximate)
  const shouldShowReadMore = body.length > 200; // Rough estimate for 8 lines

  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-sm border p-4",
        "border-template-accent-primary"
      )}
    >
      <div className="flex flex-row items-center gap-2 text-template-text-primary">
        {/* eslint-disable-next-line */}
        <Image
          className="rounded-full"
          width="32"
          height="32"
          alt=""
          src={img || "/placeholder.png"}
        />
        <div className="flex flex-col">
          <figcaption className="sm:text-base text-xl font-medium ">
            {name}
          </figcaption>
          {username && <p className="text-xs font-medium">{username}</p>}
        </div>
      </div>
      <blockquote
        className={cn(
          "mt-2 sm:text-base text-xl text-template-text-primary",
          !isExpanded && shouldShowReadMore && "line-clamp-8"
        )}
      >
        {body}
      </blockquote>
      {shouldShowReadMore && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          className="mt-2 text-sm font-medium text-template-text-primary hover:text-template-accent-primary/80 transition-colors"
        >
          {isExpanded ? "Read less" : "Read more"}
        </button>
      )}
    </figure>
  );
};

export function PFTestimonialsSection({
  title,
  subtitle,
  testimonials,
}: PF_TESTIMONIAL_SECTION) {
  // const firstRow = testimonials.slice(0, testimonials.length / 2);
  // const secondRow = testimonials.slice(testimonials.length / 2);
  return (
    <section
      id="testimonials"
      className="relative flex max-w-6xl mx-auto py-20 px-4 gap-10 flex-col items-center justify-center"
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
        className="text-4xl font-semibold sm:text-6xl text-center text-template-text-primary"
      >
        {title}
      </m.h1>
      {subtitle && (
        <m.p
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.5,
            delay: delay * 1.5,
            ease: "easeOut",
          }}
          viewport={{ amount: 0.5, once: true }}
          className="text-lg sm:text-xl text-center text-template-text-primary/50 max-w-2xl"
        >
          {subtitle}
        </m.p>
      )}

      {/* Testimonials area with gradient masks */}
      <div className="relative w-full overflow-hidden">
        <Marquee pauseOnHover className="[--duration:20s]">
          {testimonials.map((review, idx) => (
            <ReviewCard key={idx} {...review} />
          ))}
        </Marquee>

        {/* Gradient masks - only covering the testimonials area */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-template-primary"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-template-primary"></div>
      </div>
    </section>
  );
}
