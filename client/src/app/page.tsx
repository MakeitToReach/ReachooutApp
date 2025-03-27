"use client";
import React from "react";
import { Code2, ChevronRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function page() {
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

    return (
        <div className="min-h-screen bg-black text-white font-Poppins">
            {/* Hero Section */}
            <header className="container mx-auto px-6 py-24 md:py-32">
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
                        className="text-4xl md:text-7xl md:leading-tight font-bold mb-6 bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent"
                    >
                        Build Your Digital Identity
                    </motion.h1>

                    <motion.p
                        variants={fadeIn}
                        className="text-xl text-gray-400 mb-12 max-w-2xl"
                    >
                        Transform your work into a stunning portfolio with our minimal
                        templates and intuitive editor.
                    </motion.p>

                    <motion.div variants={fadeIn} className="flex gap-4">
                        <Link href={"/explore"}>
                            <Button className="dark scale-125">
                                Start Creating
                                <ChevronRight size={20} />
                            </Button>
                        </Link>
                    </motion.div>
                </motion.div>
            </header>

            {/* Templates Section */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="container mx-auto px-6 py-24"
            >
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map((template) => (
                        <motion.div
                            key={template}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -8 }}
                            transition={{ duration: 0.4 }}
                            viewport={{ once: true }}
                            className="group relative rounded-xl overflow-hidden"
                        >
                            <img
                                src={`https://github.com/shadcn.png`}
                                alt={`Template ${template}`}
                                className="w-full h-[500px] object-cover brightness-75 group-hover:brightness-100 transition duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent">
                                <div className="absolute bottom-0 p-8">
                                    <h3 className="text-2xl font-semibold mb-3">
                                        Template {template}
                                    </h3>
                                    <p className="text-gray-300 mb-4">
                                        A minimal design that puts your work in the spotlight.
                                    </p>
                                    <button className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg font-medium hover:bg-white/20 transition">
                                        Preview Template
                                    </button>
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

export default page;
