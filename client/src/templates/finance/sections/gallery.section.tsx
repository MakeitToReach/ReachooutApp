import Image from "next/image";
import { F_GALLERY_SECTION } from "../types/gallery.types";
import { motion as m } from "motion/react";
import { Lightbox } from "@/components/Lightbox";

const delay = 0.15;

export const FGallerySection = ({
  title,
  subtitle,
  imgs,
}: F_GALLERY_SECTION) => {
  return (
    <section
      id="gallery"
      className="w-full rounded-lg overflow-hidden py-20 px-6"
    >
      <div className="max-w-6xl mx-auto h-full my-10 space-y-8 overflow-x-visible text-template-text-primary">
        <m.h2
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.5,
            delay: delay,
            ease: "easeOut",
          }}
          className="font-semibold sm:text-5xl text-3xl tracking-tight text-center"
        >
          {title}
        </m.h2>
        <m.p
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.5,
            delay: delay * 2,
            ease: "easeOut",
          }}
          className="text-center text-xl line-clamp-4"
        >
          {subtitle}
        </m.p>
        <div className="grid sm:h-[90vh] h-fit sm:grid-cols-3 grid-cols-1 gap-6 mt-10">
          {/* column 1 */}
          <div className="space-y-6">
            <m.div
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: delay * 1,
                ease: "easeOut",
              }}
              className="sm:h-[55%] h-[20vh] bg-zinc-950 relative overflow-hidden rounded-xl"
            >
              <Lightbox imageUrl={imgs[0] || "/placeholder.png"}>
                <Image
                  src={imgs[0] || "/placeholder.png"}
                  fill
                  className="object-cover"
                  alt="Image 1"
                />
              </Lightbox>
            </m.div>
            <m.div
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: delay * 1.5,
                ease: "easeOut",
              }}
              className="sm:h-[40%] h-[20vh] bg-zinc-950 rounded-xl overflow-hidden  relative"
            >
              <Lightbox imageUrl={imgs[1] || "/placeholder.png"}>
                <Image
                  src={imgs[1] || "/placeholder.png"}
                  fill
                  className="object-cover"
                  alt="Image 1"
                />
              </Lightbox>
            </m.div>
          </div>
          <div className="space-y-6">
            <m.div
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: delay * 2,
                ease: "easeOut",
              }}
              className="sm:h-[40%] h-[20vh] bg-zinc-950 relative overflow-hidden rounded-xl"
            >
              <Lightbox imageUrl={imgs[2] || "/placeholder.png"}>
                <Image
                  src={imgs[2] || "/placeholder.png"}
                  fill
                  className="object-cover"
                  alt="Image 1"
                />
              </Lightbox>
            </m.div>
            <m.div
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: delay * 2.5,
                ease: "easeOut",
              }}
              className="sm:h-[55%] h-[20vh] bg-zinc-950 rounded-xl overflow-hidden relative"
            >
              <Lightbox imageUrl={imgs[3] || "/placeholder.png"}>
                <Image
                  src={imgs[3] || "/placeholder.png"}
                  fill
                  className="object-cover"
                  alt="Image 1"
                />
              </Lightbox>
            </m.div>
          </div>
          <div className="space-y-6">
            <m.div
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: delay * 3,
                ease: "easeOut",
              }}
              className="sm:h-[55%] h-[20vh] bg-zinc-950 relative overflow-hidden rounded-xl"
            >
              <Lightbox imageUrl={imgs[4] || "/placeholder.png"}>
                <Image
                  src={imgs[4] || "/placeholder.png"}
                  fill
                  className="object-cover"
                  alt="Image 1"
                />
              </Lightbox>
            </m.div>
            <m.div
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: delay * 3.5,
                ease: "easeOut",
              }}
              className="sm:h-[40%] h-[20vh] bg-zinc-950 rounded-xl overflow-hidden  relative"
            >
              <Lightbox imageUrl={imgs[5] || "/placeholder.png"}>
                <Image
                  src={imgs[5] || "/placeholder.png"}
                  fill
                  className="object-cover"
                  alt="Image 1"
                />
              </Lightbox>
            </m.div>
          </div>
        </div>
      </div>
    </section>
  );
};
