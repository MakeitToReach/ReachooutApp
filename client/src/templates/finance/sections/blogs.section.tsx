import { FBlogCard } from "../components/FBlogCard";

const BLOGS_STATIC_DATA = [
    {
        imgUrl: "/placeholder.png",
        category: "Business",
        title: "Common Tax Mistakes",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore officiis facere qui quisquam at molestiae incidunt vel totam expedita nihil.",
        avatarUrl: "https:/github.com/shadcn.png",
        author: "John Doe",
    },
    {
        imgUrl: "/placeholder.png",
        category: "Business",
        title: "Common Tax Mistakes",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore officiis facere qui quisquam at molestiae incidunt vel totam expedita nihil.",
        avatarUrl: "https:/github.com/shadcn.png",
        author: "John Doe",
    },
    {
        imgUrl: "/placeholder.png",
        category: "Business",
        title: "Common Tax Mistakes",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore officiis facere qui quisquam at molestiae incidunt vel totam expedita nihil.",
        avatarUrl: "https:/github.com/shadcn.png",
        author: "John Doe",
    },
];

export const FBlogsSection = () => {
    return (
        <section className="w-full rounded-lg min-h-[75vh] overflow-hidden my-14 py-4">
            <div className="max-w-6xl mx-auto h-full my-10 space-y-8 overflow-x-visible">
                <h2 className="text-center font-semibold sm:text-5xl text-3xl tracking-tight">
                    Latest Blogs
                </h2>
                <div className="grid sm:grid-cols-3 grid-cols-1 gap-12">
                    {BLOGS_STATIC_DATA.map((blog, index) => (
                        <FBlogCard key={index} {...blog} />
                    ))}
                </div>
            </div>
        </section>
    );
};
