"use client";
import React, { useEffect, useState } from "react";
import { Code2, ChevronRight, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { TEMPLATES_STATIC } from "@/static_data/templates";
import { AuthPopup } from "@/components/editor-components/popups/authPopup";
import { getToken } from "@/lib/isAuthenticated";
import { useUserStore } from "@/store/user.store";
import { getUserFromToken } from "@/api/auth";
import { Navbar } from "@/components/editor-components/navbar";
import { useIsMobile } from "@/hooks/use-mobile";
import { FlipText } from "@/components/template-components/professional/flipText";
import { Button } from "@/components/ui/button";

function Home() {
  const { setUser } = useUserStore();
  const rotatingWords = ["Portfolio", "Brandsite"];
  const [wordIndex, setWordIndex] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3000); // Change every 3 seconds
    return () => clearInterval(interval);
  }, []);

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

    if (token) {
      const fetchUserDetails = async () => {
        try {
          const response = await getUserFromToken(token);
          if (response) {
            setUser(response.user);
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchUserDetails();
      setToken(token);
    } else {
      setToken("");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white font-Inter overflow-x-hidden">
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
                <span className="text-xs font-medium">Create without code</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-4xl font-bold mb-4 text-left bg-gradient-to-r from-orange-100 to-orange-400 bg-clip-text text-transparent"
              >
                Launch Your
                <span className="block mt-2">
                  {/* <span className="text-orange-400 text-4xl font-extrabold">
                    Portfolio
                  </span> */}
                  <FlipText
                    texts={rotatingWords}
                    interval={1500}
                    className="text-orange-400 tracking-tight text-4xl font-extrabold"
                  />
                </span>
                <span className="text-lg font-normal text-gray-300">
                  before your coffee gets cold
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
                <span className="text-sm font-medium">Create without code</span>
              </motion.div>
              <motion.h1
                variants={fadeIn}
                layout
                transition={{ layout: { duration: 0.5, ease: "easeInOut" } }}
                className="text-xl md:text-5xl text-center md:leading-tight font-bold mb-6 bg-gradient-to-r from-orange-100 to-orange-400 bg-clip-text text-transparent"
              >
                Launch Your{" "}
                <motion.span
                  layout
                  className="bg-white text-orange-400 rounded-full px-4 inline-flex justify-center items-center overflow-hidden min-w-0"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      layout
                      key={rotatingWords[wordIndex]}
                      initial={{ opacity: 0, filter: "blur(4px)", width: 0 }}
                      animate={{
                        opacity: 1,
                        filter: "blur(0px)",
                        width: "auto",
                      }}
                      exit={{ opacity: 0, filter: "blur(4px)", width: 0 }}
                      transition={{
                        duration: 0.4,
                        ease: "easeInOut",
                        delay: 0.1, // Slight delay to let layout animation start first
                      }}
                      className="inline-block whitespace-nowrap"
                      style={{
                        position: "relative",
                        display: "inline-block",
                      }}
                    >
                      {rotatingWords[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </motion.span>{" "}
                before{" "}
                <span className="hidden md:inline">
                  <br />
                </span>{" "}
                your coffee gets cold
              </motion.h1>
              <motion.p
                variants={fadeIn}
                className="text-lg md:text-2xl text-gray-400 mb-12 max-w-2xl"
              >
                Transform your work into a stunning portfolio with our minimal
                templates and intuitive editor.
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

      {/* Templates Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto px-6 sm:py-24"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEMPLATES_STATIC.map((template, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="group relative rounded-xl overflow-hidden"
            >
              <Image
                src={template.imageUrl}
                alt={`Template ${template}`}
                width={100}
                height={500}
                loading="lazy"
                loader={() => template.imageUrl}
                className="w-full h-[500px] object-cover object-top brightness-75 group-hover:brightness-100 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent">
                <div className="absolute bottom-0 p-8">
                  <h3 className="text-2xl font-semibold mb-3">
                    Template {idx + 1}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    A minimal design that puts your work in the spotlight.
                  </p>
                  <Link href={template.previewUrl}>
                    <button className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg font-medium hover:bg-white/20 transition">
                      Preview Template
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto px-6 py-24"
      >
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-900/50 to-black p-12 text-center">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to showcase your work?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join creators who&apos;ve already launched their portfolios.
            </p>
            <button className="px-8 py-4 bg-white text-black rounded-lg font-semibold hover:bg-purple-100 transition flex items-center gap-2 mx-auto">
              Create Your Portfolio
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(138,62,255,0.1),transparent_100%)]" />
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2"
          >
            <Code2 size={24} className="text-purple-400" />
            <span className="font-semibold text-xl">ReachoOut</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-8 text-gray-400"
          >
            <a href="#" className="hover:text-white transition">
              Templates
            </a>
            <a href="#" className="hover:text-white transition">
              Features
            </a>
            <a href="#" className="hover:text-white transition">
              Pricing
            </a>
            <a href="#" className="hover:text-white transition">
              Contact
            </a>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
