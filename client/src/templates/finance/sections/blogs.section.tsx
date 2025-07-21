import { FBlogCard } from "../components/FBlogCard";
import { F_BLOGS_SECTION } from "../types/blogs.types";
import { motion as m } from "motion/react";

const delay = 0.15;

export const FBlogsSection = ({ heading, blogs }: F_BLOGS_SECTION) => {
    return (
        <section id="blogs" className="w-full rounded-lg min-h-[75vh] overflow-hidden py-24">
            <div className="max-w-6xl mx-auto h-full my-10 space-y-8 overflow-x-visible ">
                <m.h2
                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                    duration: 0.5,
                    delay: delay,
                    ease: "easeOut",
                }}
                className="text-center font-semibold sm:text-5xl text-3xl tracking-tight text-template-text-primary">
                    {heading}
                </m.h2>
                <div className="grid sm:grid-cols-3 grid-cols-1 gap-12">
                    {blogs.map((blog, index) => (
                        <m.div
                            key={index}
                            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{
                                duration: 0.8,
                                delay: delay * (index + 1),
                                ease: "easeOut",
                            }}
                        >
                            <FBlogCard
                                imgUrl={blog.imgUrl}
                                author={blog.author}
                                avatarUrl={blog.authorImgUrl}
                                title={blog.title}
                                description={blog.description}
                                category={blog.category}
                            />
                        </m.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
