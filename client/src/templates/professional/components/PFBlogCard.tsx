import { ViewMoreDrawer } from "@/components/template-components/professional/viewMoreDrawer";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

interface PFBlogCardProps {
  imgUrl: string;
  title: string;
  description: string;
  btnText?: string;
  btnLink?: string;
}
export const PFBlogCard = ({
  imgUrl,
  title,
  description,
  btnText,
  btnLink,
}: PFBlogCardProps) => {
  const blogContent = { imgUrl, title, description, btnText, btnLink };
  return (
    <div className="h-fit w-full bg-template-primary rounded-sm overflow-hidden space-y-6 pb-6 text-template-text-primary">
      <Image
        quality={100}
        src={imgUrl || "/placeholder.png"}
        alt="blog-img"
        width={400}
        height={240}
        className="w-full h-[15rem] rounded-sm object-cover"
      />
      <div className="space-y-2 text-left">
        <h2 className="font-semibold sm:text-lg text-2xl tracking-tight line-clamp-2">
          {title}
        </h2>

        <div
          className="
    prose prose-xl sm:prose-base max-w-none text-template-text-primary 
    prose-p:text-template-text-primary
    prose-strong:text-template-text-primary
    prose-h1:text-template-text-primary
    prose-h2:text-template-text-primary
    prose-h3:text-template-text-primary
    prose-h4:text-template-text-primary
    prose-h5:text-template-text-primary
    prose-h6:text-template-text-primary
    line-clamp-2
  "
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <ViewMoreDrawer type="Blog" content={blogContent}>
          <button className="hover:underline text-xl sm:text-base flex items-center gap-1">
            Read more{" "}
            <ArrowUpRight
              size={16}
              className="text-template-text-accent-tertiary"
            />
          </button>
        </ViewMoreDrawer>
      </div>
    </div>
  );
};
