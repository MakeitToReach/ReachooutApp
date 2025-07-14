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

                <div
                    className="
    prose prose-sm max-w-none text-template-text-primary
    prose-p:text-template-text-primary
    prose-strong:text-template-text-primary
    prose-h1:text-template-text-primary
    prose-h2:text-template-text-primary
    prose-h3:text-template-text-primary
    prose-h4:text-template-text-primary
    prose-h5:text-template-text-primary
    prose-h6:text-template-text-primary
  "
                    dangerouslySetInnerHTML={{ __html: description }}
                />
                <ViewMoreDrawer type="Blog" content={blogContent}>
                    <button className="hover:underline">Read more...</button>
                </ViewMoreDrawer>
            </div>
        </div>
    );
};
