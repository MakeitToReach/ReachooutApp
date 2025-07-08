"use client";
import React from "react";
import { PF_BLOG_SECTION } from "../types/blog.types";
import { PFBlogCard } from "../components/PFBlogCard";
import { cn } from "@/lib/utils";

export const PFBlogSection = ({ heading, blogs }: PF_BLOG_SECTION) => {
    return (
        <section
            id="blogs"
            className="max-w-6xl mx-auto text-center overflow-hidden"
        >
            <h1 className="text-4xl font-semibold text-template-text-primary md:text-6xl">
                {heading}
            </h1>
            <div
                className={cn(
                    "mt-10 px-4 sm:px-0 grid grid-cols-1 sm:grid-cols-3 gap-4",
                )}
            >
                {blogs.map((blog, idx) => (
                    <PFBlogCard key={idx} {...blog} />
                ))}
            </div>
        </section>
    );
};
