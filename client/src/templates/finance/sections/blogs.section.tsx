import { FBlogCard } from "../components/FBlogCard";
import { F_BLOGS_SECTION } from "../types/blogs.types";

export const FBlogsSection = ({ heading, blogs }: F_BLOGS_SECTION) => {
    return (
        <section className="w-full rounded-lg min-h-[75vh] overflow-hidden my-14 py-4">
            <div className="max-w-6xl mx-auto h-full my-10 space-y-8 overflow-x-visible">
                <h2 className="text-center font-semibold sm:text-5xl text-3xl tracking-tight">
                    {heading}
                </h2>
                <div className="grid sm:grid-cols-3 grid-cols-1 gap-12">
                    {blogs.map((blog, index) => (
                        <FBlogCard
                            key={index}
                            imgUrl={blog.imgUrl}
                            author={blog.author}
                            avatarUrl={blog.authorImgUrl}
                            title={blog.title}
                            description={blog.description}
                            category={blog.category}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
