import { Separator } from "@/components/ui/separator";
import { LucideArrowRight } from "lucide-react";
import Image from "next/image";

export const FStatsSection = () => {
    return (
        <section className="w-full sm:h-[55vh] min-h-fit flex flex-col items-center justify-center bg-template-secondary rounded-lg overflow-hidden relative py-16 px-4">
            {/* Content container */}
            <div className="max-w-6xl py-10 mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-10 text-template-text-secondary mb-20 sm:mb-0">
                {/* Left: Text Content */}
                <div className="flex flex-col gap-10 sm:w-2/3 w-full">
                    <h2 className="font-semibold sm:text-5xl text-3xl tracking-tight">
                        Delivering Excellence Through Expertise and Dedication
                    </h2>

                    {/* Stats Block */}
                    <div className="flex flex-col sm:flex-row justify-between gap-6 w-full">
                        <div className="space-y-2 flex-1">
                            <div>
                                <h2 className="font-bold text-6xl">90%</h2>
                                <h4 className="italic font-light font-serif text-2xl">
                                    Increased Profitability
                                </h4>
                            </div>
                            <p>Through strategic financial planning and detailed analysis.</p>
                        </div>
                        <div className="space-y-2 flex-1">
                            <div>
                                <h2 className="font-bold text-6xl">85%</h2>
                                <h4 className="italic font-light font-serif text-2xl">
                                    Client Retention
                                </h4>
                            </div>
                            <p className="text-sm">
                                By fostering long-term relationships and trust.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right: Image */}
                <div className="sm:w-1/3 w-full flex justify-center">
                    <Image
                        src="/placeholder.png"
                        width={300}
                        height={300}
                        alt="stats"
                        className="rounded-lg object-contain"
                    />
                </div>
            </div>

            {/* Bottom CTA Bar */}
            <div className="bg-template-accent-primary w-full flex absolute bottom-0">
                <div className="max-w-6xl mx-auto sm:flex-row flex flex-col gap-2 sm:gap-20 items-center justify-between">
                    <div className="bg-gradient-to-r from-template-accent-primary to-black/60 text-white flex items-center justify-center h-full px-6 rounded-full py-6">
                        Explore Further
                    </div>
                    <button
                        type="button"
                        className="flex items-center text-white gap-2 hover:underline"
                    >
                        Learn More{" "}
                        <span>
                            <LucideArrowRight />
                        </span>
                    </button>
                    <Separator orientation="vertical" className="hidden sm:block" />
                    <button
                        type="button"
                        className="flex items-center text-white gap-2 hover:underline"
                    >
                        Get Free Consulatation
                        <span>
                            <LucideArrowRight />
                        </span>
                    </button>
                </div>
            </div>
        </section>
    );
};
