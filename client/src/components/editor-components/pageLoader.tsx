import React from "react";
import { motion } from "motion/react";

export const PageLoader = () => {
  return (
    <div className="w-full h-screen bg-black text-white flex justify-center items-center">
      <motion.h1
        initial={{ opacity: 0, y: 100, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="text-4xl md:text-7xl md:leading-tight font-bold mb-6 bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent"
      >
        Reachoout
      </motion.h1>
    </div>
  );
};
