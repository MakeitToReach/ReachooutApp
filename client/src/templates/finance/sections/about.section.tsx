import Image from "next/image";
import { FButton } from "../components/FButton";
import { F_ABOUT_SECTION } from "../types/about.types";
import { motion as m } from "motion/react";

const delay = 0.15;

export const FAboutSection = ({
  badgeText,
  title,
  description,
  imgUrl,
  btnText,
  btnLink,
  experience,
}: F_ABOUT_SECTION) => {
  return (
    <section id="about" className="max-w-6xl mx-auto sm:py-20 py-10 px-4">
      <div className="flex flex-col sm:flex-row justify-between gap-10">
        {/* text content */}
        <div className="flex flex-col sm:gap-8 gap-10 sm:w-1/2 w-full text-template-text-primary">
          <m.div
            initial={{ opacity: 0, x: -40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.5,
              delay: delay,
              ease: "easeOut",
            }}
            className="w-fit rounded-full bg-template-accent-primary text-template-text-accent-primary flex items-center justify-center px-6 py-2 uppercase font-semibold text-lg"
          >
            {badgeText}
          </m.div>
          <m.h2
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.5,
              delay: delay * 2,
              ease: "easeOut",
            }}
            className="font-semibold sm:text-5xl text-3xl tracking-tight"
          >
            {title}
          </m.h2>
          <m.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.5,
              delay: delay * 3,
              ease: "easeOut",
            }}
            className="
    prose prose-xl sm:prose-lg max-w-none text-template-text-primary
    prose-p:text-template-text-primary
    prose-strong:text-template-text-primary
    prose-h1:text-template-text-primary
    prose-h2:text-template-text-primary
    prose-h3:text-template-text-primary
    prose-h4:text-template-text-primary
    prose-h5:text-template-text-primary
    prose-h6:text-template-text-primary
    line-clamp-[11]
  "
            dangerouslySetInnerHTML={{ __html: description }}
          />

          <m.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.5,
              delay: delay * 4,
              ease: "easeOut",
            }}
            className="flex items-center gap-2"
          >
            {experience && (
              <>
                <h2 className="font-bold text-7xl  bg-gradient-to-b from-template-primary to-template-accent-primary via-template-accent-primary/10 text-template-text-accent-primary">
                  {experience}
                </h2>
                <h3 className="font-extralight sm:text-3xl text-2xl tracking-tighter italic">
                  Years of Experience
                </h3>
              </>
            )}
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.5,
              delay: delay * 4.5,
              ease: "easeOut",
            }}
            className="flex gap-10 items-center"
          >
            <a href={btnLink}>
              <FButton btnText={btnText} className="py-7 px-10" />
            </a>
          </m.div>
        </div>

        <div className="self-end relative w-full max-w-[420px] mx-auto sm:h-[500px] h-[400px]">
          <div className="absolute inset-0 w-full h-full overflow-hidden drop-shadow-xl rounded-2xl">
            <Image
              src={imgUrl}
              alt="Profile"
              fill
              style={{
                objectFit: "cover",
              }}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};
