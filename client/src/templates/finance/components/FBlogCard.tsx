import { LucideChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { FViewMoreDrawer } from "@/components/template-components/finance/FViewMoreDrawer";

interface FBlogCardProps {
  imgUrl: string;
  category: string;
  title: string;
  description: string;
  date?: string;
}
export const FBlogCard = ({
  imgUrl,
  title,
  category,
  description,
}: FBlogCardProps) => {
  return (
    <div className="w-full bg-template-secondary rounded-lg overflow-hidden space-y-6 pb-6">
      <Image
        src={imgUrl || "/placeholder.png"}
        alt="blog-img"
        width={400}
        height={100}
        className="w-full h-[20vh] object-cover"
      />
      <div className="px-6 space-y-1">
        <Badge className="font-semibold w-fit rounded-full bg-template-accent-primary text-template-text-accent-primary px-3 py-1 uppercase">
          {category}
        </Badge>
        <h2 className="font-semibold line-clamp-2 text-lg tracking-tight text-template-text-secondary">
          {title}
        </h2>
        <div
          className="
    prose prose-xl sm:prose-base max-w-none text-template-text-secondary/80
    prose-p:text-template-text-secondary/80
    prose-strong:text-template-text-secondary/80
    prose-h1:text-template-text-secondary/80
    prose-h2:text-template-text-secondary/80
    prose-h3:text-template-text-secondary/80
    prose-h4:text-template-text-secondary/80
    prose-h5:text-template-text-secondary/80
    prose-h6:text-template-text-secondary/80
  "
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <FViewMoreDrawer
          type="Blog"
          content={{ imgUrl, title, description, category }}
        >
          <button className="flex items-center hover:underline text-template-accent-primary font-semibold ">
            Read More
            <span>
              <LucideChevronRight />
            </span>
          </button>
        </FViewMoreDrawer>
      </div>
    </div>
  );
};
