"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const PFFaqItem = React.forwardRef<
    HTMLDivElement,
    {
        question: string;
        answer: string;
        index: number;
    }
>((props, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const { question, answer, index } = props;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.1 }}
            className={cn(
                "group rounded-lg",
                "transition-all duration-200 ease-in-out",
                "border border-template-accent-primary/70",
            )}
        >
            <Button
                variant="ghost"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-4 h-auto sm:flex sm:justify-between hover:bg-transparent"
            >
                <h3
                    className={cn(
                        "text-xl font-medium w-full text-left break-words whitespace-normal",
                        "text-template-text-primary opacity-70",
                        isOpen && "text-template-text-primary opacity-40",
                    )}
                >
                    {question}
                </h3>
                <motion.div
                    animate={{
                        rotate: isOpen ? 180 : 0,
                        scale: isOpen ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                        "p-0.5 rounded-full flex-shrink-0",
                        "transition-colors duration-200",
                        isOpen
                            ? "text-template-text-primary"
                            : "text-template-text-primary opacity-60",
                    )}
                >
                    <ChevronDown className="h-4 w-4" />
                </motion.div>
            </Button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                            height: "auto",
                            opacity: 1,
                            transition: { duration: 0.2, ease: "easeOut" },
                        }}
                        exit={{
                            height: 0,
                            opacity: 0,
                            transition: { duration: 0.2, ease: "easeIn" },
                        }}
                    >
                        <div className="px-6 pb-4 pt-2">
                            <motion.div
                                initial={{ y: -10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -10, opacity: 0 }}
                                className="
    prose prose-lg max-w-none text-template-text-primary
    prose-p:text-template-text-primary
    prose-strong:text-template-text-primary
    prose-h1:text-template-text-primary
    prose-h2:text-template-text-primary
    prose-h3:text-template-text-primary
    prose-h4:text-template-text-primary
    prose-h5:text-template-text-primary
    prose-h6:text-template-text-primary
  "
                                dangerouslySetInnerHTML={{ __html: answer }}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
});

PFFaqItem.displayName = "PFFaqItem";

export { PFFaqItem };
