import { LucideChevronRight } from "lucide-react";
import { ImageVideo } from "@/components/ImageVideo";
import { FViewMoreDrawer } from "@/components/template-components/finance/FViewMoreDrawer";
import { F_BLOG } from "../types/blogs.types";

export const FBlogCard = ({
  imgUrl,
  vidUrl,
  title,
  description,
  btnLink,
  btnText,
}: F_BLOG) => {
  return (
    <div className="w-full bg-template-primary rounded-lg overflow-hidden space-y-6 pb-6 border border-template-accent-primary">
      <div className="w-full h-[15rem]">
        <ImageVideo
          imgUrl={imgUrl}
          vidUrl={vidUrl}
          alt="blog-img"
          width={400}
          height={240}
          fallbackImgUrl="https://github.com/shadcn.png"
          iframeClassName="w-full h-full"
          imageClassName="w-full h-full object-cover"
        />
      </div>
      <div className="space-y-1 px-4">
        <h2 className="font-semibold line-clamp-2 text-xl tracking-tight text-template-text-primary">
          {title}
        </h2>
        <div
          className="
    prose line-clamp-3 prose-xl sm:prose-lg max-w-none text-template-text-primary/80
    prose-p:text-template-text-primary/80
    prose-strong:text-template-text-primary/80
    prose-h1:text-template-text-primary/80
    prose-h2:text-template-text-primary/80
    prose-h3:text-template-text-primary/80
    prose-h4:text-template-text-primary/80
    prose-h5:text-template-text-primary/80
    prose-h6:text-template-text-primary/80
  "
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <FViewMoreDrawer
          type="Blog"
          content={{
            imgUrl,
            vidUrl,
            title,
            description,
            btnLink,
            btnText,
          }}
        >
          <button className="flex items-center hover:underline text-template-text-primary font-semibold ">
            Read More
            <span>
              <LucideChevronRight className="text-template-text-accent-tertiary" />
            </span>
          </button>
        </FViewMoreDrawer>
      </div>
    </div>
  );
};
