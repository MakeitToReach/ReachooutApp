import React from "react";

const LanderPortfolio = () => {
    return (
        <div className="relative min-h-screen bg-black text-white font-sans overflow-hidden">
            {/* Navigation */}
            <nav className="absolute top-0 left-0 w-full flex justify-between items-center p-6 z-10">
                <div className="text-xl font-bold flex items-center space-x-2">
                    <div className="w-6 h-6 bg-white rounded-md" />
                    <span>Portfolite</span>
                </div>
                <div className="flex items-center space-x-8 text-sm text-gray-300">
                    <a href="#services" className="hover:text-white">
                        Services
                    </a>
                    <a href="#projects" className="hover:text-white">
                        Projects
                    </a>
                    <a href="#testimonials" className="hover:text-white">
                        Testimonials
                    </a>
                    <a href="#contact" className="hover:text-white">
                        Contact
                    </a>
                    <button className="ml-4 px-4 py-2 border border-white rounded-full hover:bg-white hover:text-black transition">
                        Get for Free
                    </button>
                </div>
            </nav>

            {/* Smoke / Glow Effect */}
            <div className="absolute inset-0 z-0">
                <div className="w-full h-full opacity-40 blur-2xl bg-gradient-to-tr from-white/10 to-white/30 rounded-full" />
            </div>

            {/* Hero Section */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center pt-40 pb-32 px-6">
                <span className="text-sm text-gray-400 mb-4 px-4 py-1 border border-white/20 rounded-full">
                    ● Crafting Unique Brand Identities
                </span>
                <h1 className="text-5xl sm:text-6xl font-bold leading-tight mb-6 max-w-3xl">
                    Branding that you <br /> need Indeed
                </h1>
                <p className="text-gray-300 max-w-xl mb-10 text-sm sm:text-base">
                    Elevate your brand with custom identity and package design. Showcase
                    your story through bold visuals and strategic design solutions.
                </p>
                <div className="flex space-x-4 mb-12">
                    <button className="px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition">
                        Book a Free Call
                    </button>
                    <button className="px-6 py-3 border border-white rounded-full hover:bg-white hover:text-black transition">
                        See Projects
                    </button>
                </div>
                <div className="text-sm text-gray-500 flex items-center space-x-2 mb-12">
                    <span>Scroll down</span>
                    <div className="w-5 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center">
                        <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" />
                    </div>
                    <span>to see projects</span>
                </div>
            </div>

            {/* Brand Logos */}
            <div className="flex justify-center space-x-10 text-gray-300 text-lg mb-20 z-10 relative">
                <span className="hover:text-white transition">✱Asterisk</span>
                <span className="hover:text-white transition">Ξooks</span>
                <span className="hover:text-white transition">⟲Opal</span>
                <span className="hover:text-white transition">◌Dune</span>
            </div>

        </div>
    );
};

export default LanderPortfolio;
