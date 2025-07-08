import { ViewMoreDrawer } from "@/components/template-components/professional/viewMoreDrawer";
import Image from "next/image";

interface PFBlogCardProps {
    imgUrl: string;
    title: string;
    description: string;
}
export const PFBlogCard = ({ imgUrl, title, description }: PFBlogCardProps) => {
    const blogContent = { imgUrl, title, description };
    return (
        <div className="h-fit sm:w-[20vw] w-full bg-template-primary rounded-lg overflow-hidden space-y-6 pb-6 text-template-text-primary">
            <Image
                quality={100}
                src={imgUrl || "/placeholder.png"}
                alt="blog-img"
                width={400}
                height={240}
                className="w-full h-[15rem] object-cover"
            />
            <div className="space-y-2 text-left">
                <h2 className="font-semibold text-lg tracking-tight">{title}</h2>

                <p className="text-xs line-clamp-4 text-template-text-primary/70">
                    {description}
                </p>
                <ViewMoreDrawer type="Blog" content={blogContent}>
                    <button className="hover:underline">Read more...</button>
                </ViewMoreDrawer>
            </div>
        </div>
    );
};
