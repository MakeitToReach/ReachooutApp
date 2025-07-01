import { cn } from "@/lib/utils";
import Image from "next/image";
import { F_TIMELINE_STEP } from "../types/timeline.types";

interface FTimelineProps {
    steps: F_TIMELINE_STEP[];
}
export const FTimeline = ({ steps }: FTimelineProps) => {
    return (
        <div className="relative w-full max-w-6xl mx-auto px-4 py-12">
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 w-1 bg-gray-200 h-full transform -translate-x-1/2 z-0" />

            <div className="flex flex-col gap-16">
                {steps.map((step, index) => {
                    const isEven = index % 2 === 0;
                    return (
                        <div
                            key={index}
                            className="relative z-10 flex flex-col sm:flex-row items-center"
                        >
                            {/* Step Circle */}
                            <div className="absolute left-1/2 transform -translate-x-1/2 sm:translate-y-0 -translate-y-1/2 z-20">
                                <div className="w-10 h-10 rounded-full bg-template-accent-primary text-template-text-accent-primary flex items-center justify-center font-bold border-4 border-white shadow">
                                    {index + 1}
                                </div>
                            </div>

                            <div
                                className={`flex flex-col sm:flex-row items-center w-full gap-8 sm:gap-20 mt-10`}
                            >
                                {/* Image */}
                                <div
                                    className={cn(
                                        "w-full sm:w-1/2 sm:aspect-video aspect-square relative",
                                        isEven ? "order-1" : "sm:order-2",
                                    )}
                                >
                                    <Image
                                        src={step.image}
                                        alt={step.title}
                                        fill
                                        className="rounded-lg shadow-lg object-cover"
                                    />
                                </div>

                                {/* Text Content */}
                                <div
                                    // className={`w-full sm:w-1/2 ${isEven ? "order-2" : "sm:order-1"} text-left`}
                                    className={cn(
                                        "w-full sm:w-1/2 backdrop-blur-xl text-template-text-primary",
                                        isEven ? "order-2" : "sm:order-1",
                                    )}
                                >
                                    <span className="text-sm font-semibold text-template-text-accent-primary bg-template-accent-primary px-3 py-1 rounded-full inline-block mb-2">
                                        {step.badgeText}
                                    </span>
                                    <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                                    <p className="text-gray-600">{step.description}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
