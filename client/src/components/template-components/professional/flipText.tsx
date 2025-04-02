"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface FlipTextProps {
    texts: string | string[];
    interval?: number; // Time in ms between text changes
    className?: string;
}

export const FlipText: React.FC<FlipTextProps> = ({
    texts,
    interval = 2000,
    className = "",
}) => {
    // Process input to ensure we have an array of strings
    const textArray =
        typeof texts === "string"
            ? texts
                .split(",")
                .map((text) => text.trim())
                .filter((text) => text !== "")
            : texts;

    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (!textArray || textArray.length <= 1) return;

        const timer = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % textArray.length);
        }, interval);

        return () => clearInterval(timer);
    }, [textArray, interval]);

    // Animation variants for vertical sliding
    const variants = {
        enter: {
            y: -70,
            opacity: 0,
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
        exit: {
            y: 70,
            opacity: 0,
            transition: {
                duration: 0.5,
                ease: "easeIn",
            },
        },
    };

    // Return empty div if no texts
    if (!textArray || textArray.length === 0) {
        return <div className={`relative h-16 ${className}`}></div>;
    }

    return (
        <div className={`relative h-16 overflow-hidden ${className}`}>
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={index}
                    variants={variants}
                    initial="enter"
                    animate="visible"
                    exit="exit"
                // className="absolute w-full h-full flex items-center justify-center text-2xl font-bold"
                >
                    {textArray[index]}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
