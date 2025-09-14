"use client";
import React, { useEffect, useState } from "react";
import { ChevronRight, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { AuthPopup } from "@/components/editor-components/popups/authPopup";
import { getToken } from "@/lib/isAuthenticated";
import { Navbar } from "@/components/editor-components/navbar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

function Home() {
  const isMobile = useIsMobile();

  const [token, setToken] = useState<string>("");
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  useEffect(() => {
    const token = getToken();
    setToken(token || "");
  }, []);

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white font-Inter overflow-x-hidden">
      {/* Hero Section */}
      {isMobile ? (
        <>
          <Navbar />
          <header className="flex flex-col items-center justify-center py-10 overflow-x-hidden px-6">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.2 } },
              }}
              className="w-full flex flex-col items-start"
            >
              <motion.div
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full mb-4"
              >
                <Sparkles size={18} className="text-purple-400" />
                <span className="text-xs font-medium">
                  No-code website builder
                </span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-4xl font-bold mb-4 text-left bg-gradient-to-r from-orange-100 to-orange-400 bg-clip-text text-transparent"
              >
                Build Your
                <span className="block mt-2 text-orange-400">Professional Presence</span>
                <span className="text-lg font-normal text-gray-300">
                  in minutes
                </span>
              </motion.h1>
              {/* <motion.p
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="text-base text-gray-400 mb-8 max-w-xs mx-auto"
              >
                Transform your work into a stunning portfolio with our minimal
                templates and intuitive editor.
              </motion.p> */}
              <motion.div
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col gap-2 w-full items-start"
              >
                {token ? (
                  <Link href={"/user"}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="cursor-pointer flex items-center justify-center gap-2 bg-white text-black px-4 py-3 rounded-md font-semibold text-sm shadow-md"
                    >
                      Get Started <ChevronRight size={20} />
                    </motion.button>
                  </Link>
                ) : (
                  <AuthPopup>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="cursor-pointer flex items-center justify-center gap-2 bg-white text-black px-4 py-3 rounded-md font-semibold text-sm shadow-md"
                    >
                      Get Started <ChevronRight size={20} />
                    </motion.button>
                  </AuthPopup>
                )}
                <Link href={"/explore"}>
                  <Button
                    variant="ghost"
                    className="px-2 py-2 dark self-start rounded-md font-semibold text-sm shadow-md"
                  >
                    Explore Templates
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </header>
        </>
      ) : (
        <>
          <Navbar />
          <header className="container mx-auto px-6 py-24 md:py-20">
            <motion.div
              initial="initial"
              animate="animate"
              variants={stagger}
              className="flex flex-col items-center text-center"
            >
              <motion.div
                variants={fadeIn}
                className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full mb-8"
              >
                <Sparkles size={18} className="text-purple-400" />
                <span className="text-sm font-medium">
                  No-code website builder
                </span>
              </motion.div>
              <motion.h1
                variants={fadeIn}
                layout
                transition={{ layout: { duration: 0.5, ease: "easeInOut" } }}
                className="text-xl md:text-5xl text-center md:leading-tight font-bold mb-6 bg-gradient-to-r from-orange-100 to-orange-400 bg-clip-text text-transparent"
              >
                Build Your{" "}
                <motion.span
                  layout
                  className="bg-white text-orange-400 rounded-full px-4 inline-flex justify-center items-center overflow-hidden min-w-0"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span className="inline-block whitespace-nowrap">
                      Professional Presence
                    </motion.span>
                  </AnimatePresence>
                </motion.span>
                <p>in minutes</p>
              </motion.h1>
              <motion.p
                variants={fadeIn}
                className="text-lg md:text-2xl text-gray-400 mb-12 max-w-2xl"
              >
                Log in and launch your website quickly. Explore our modern
                templates and start building right away.
              </motion.p>
              <motion.div variants={fadeIn} className="flex gap-4">
                {token ? (
                  <div className="flex gap-12">
                    <Link href={"/user"}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        role="button"
                        className="cursor-pointer scale-125 flex items-center gap-2 bg-white text-black backdrop-blur-sm px-4 py-2 rounded-full  "
                      >
                        Get Started
                      </motion.div>
                    </Link>
                    <Link href={"/explore"}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        role="button"
                        className="cursor-pointer scale-125 flex items-center gap-2 bg-white text-black backdrop-blur-sm px-4 py-2 rounded-full  "
                      >
                        Explore Templates
                      </motion.div>
                    </Link>
                  </div>
                ) : (
                  <div className="flex gap-12">
                    <AuthPopup>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        role="button"
                        className="cursor-pointer scale-125 flex items-center gap-2 bg-white text-black backdrop-blur-sm px-4 py-2 rounded-full"
                      >
                        Get Started
                        <ChevronRight size={20} />
                      </motion.div>
                    </AuthPopup>
                    <Link href={"/explore"}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        role="button"
                        className="cursor-pointer scale-125 flex items-center gap-2 bg-white text-black backdrop-blur-sm px-4 py-2 rounded-full  "
                      >
                        Explore Templates
                      </motion.div>
                    </Link>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </header>
        </>
      )}

      <section className="container mx-auto px-6 sm:py-24 flex justify-center">
        <Image
          src="https://reachoout.com/wp-content/uploads/2025/06/Reachoout-15secs.gif"
          alt="gif"
          width={1000}
          height={1000}
          className="bg-white rounded-xl"
        />
      </section>

      {/* Templates Section */}
      {/* <motion.section */}
      {/*   initial={{ opacity: 0 }} */}
      {/*   whileInView={{ opacity: 1 }} */}
      {/*   transition={{ duration: 0.8 }} */}
      {/*   viewport={{ once: true }} */}
      {/*   className="container mx-auto px-6 sm:py-24" */}
      {/* > */}
      {/*   <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"> */}
      {/*     {TEMPLATES_STATIC.map((template, idx) => ( */}
      {/*       <motion.div */}
      {/*         key={idx} */}
      {/*         initial={{ opacity: 0, scale: 0.95 }} */}
      {/*         whileInView={{ opacity: 1, scale: 1 }} */}
      {/*         whileHover={{ y: -8 }} */}
      {/*         transition={{ duration: 0.4 }} */}
      {/*         viewport={{ once: true }} */}
      {/*         className="group relative rounded-xl overflow-hidden" */}
      {/*       > */}
      {/*         <Image */}
      {/*           src={template.imageUrl} */}
      {/*           alt={`Template ${template}`} */}
      {/*           width={100} */}
      {/*           height={500} */}
      {/*           loading="lazy" */}
      {/*           loader={() => template.imageUrl} */}
      {/*           className="w-full h-[500px] object-cover object-top brightness-75 group-hover:brightness-100 transition duration-500" */}
      {/*         /> */}
      {/*         <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"> */}
      {/*           <div className="absolute bottom-0 p-8"> */}
      {/*             <h3 className="text-2xl font-semibold mb-3"> */}
      {/*               Template {idx + 1} */}
      {/*             </h3> */}
      {/*             <p className="text-gray-300 mb-4"> */}
      {/*               A minimal design that puts your work in the spotlight. */}
      {/*             </p> */}
      {/*             <Link href={template.previewUrl}> */}
      {/*               <button className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg font-medium hover:bg-white/20 transition"> */}
      {/*                 Preview Template */}
      {/*               </button> */}
      {/*             </Link> */}
      {/*           </div> */}
      {/*         </div> */}
      {/*       </motion.div> */}
      {/*     ))} */}
      {/*   </div> */}
      {/* </motion.section> */}

      {/* Footer */}
      <footer className="container absolute bottom-0 sm:static  mx-auto px-6 py-12 border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-1"
          >
            <Image
              src="/reachout-logo.png"
              alt="logo"
              width={100}
              height={100}
              className="cursor-pointer object-cover size-[50px] md:size-[50px]"
            />
            <span className="font-semibold text-xl">Reachoout</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-8 text-gray-400"
          >
            <a
              target="_blank"
              href="https://reachoout.com/help"
              className="hover:text-white transition"
            >
              Helpbook
            </a>
            <a
              target="_blank"
              href="https://reachoout.com/support"
              className="hover:text-white transition"
            >
              Support
            </a>
            <a
              target="_blank"
              href="https://reachoout.com/resources"
              className="hover:text-white transition"
            >
              Blog
            </a>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
