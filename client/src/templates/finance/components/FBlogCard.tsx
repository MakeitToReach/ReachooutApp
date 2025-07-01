import { LucideChevronRight } from "lucide-react";
import Image from "next/image";

interface FBlogCardProps {
    imgUrl: string;
    category: string;
    title: string;
    description: string;
    avatarUrl: string;
    author: string;
    date?: string;
}
export const FBlogCard = ({
    imgUrl,
    title,
    category,
    description,
    avatarUrl,
    author,
}: FBlogCardProps) => {
    return (
        <div className="h-fit sm:w-[20vw] w-full bg-white rounded-lg overflow-hidden space-y-6 pb-6 shadow-xl shadow-black/20">
            <Image
                src={imgUrl}
                alt="blog-img"
                width={200}
                height={200}
                className="w-full h-[30%] object-cover"
            />
            <div className="px-6 space-y-1">
                <div className="font-semibold w-fit rounded-full bg-black text-white px-3 py-1 uppercase">
                    {category}
                </div>
                <h2 className="font-semibold text-lg tracking-tight">{title}</h2>
                <p className="text-xs line-clamp-3 leading-8 text-gray-600">
                    {description}
                </p>
                <button className="flex items-center hover:underline text-template-accent-primary font-semibold ">
                    Read More
                    <span>
                        <LucideChevronRight />
                    </span>
                </button>
            </div>
            <div className="flex items-center gap-2 px-6">
                <Image
                    src={avatarUrl}
                    alt="profile"
                    width={30}
                    height={30}
                    className="size-6 rounded-full"
                />
                <h4 className="font-semibold text-sm">{author}</h4>
            </div>
        </div>
    );
};
