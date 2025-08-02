import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { FViewMoreDrawer } from "@/components/template-components/finance/FViewMoreDrawer";
import { F_SERVICE } from "../types/services.types";

export const FServicesCard = ({
  imgUrl,
  title,
  description,
  category,
  btnText,
  btnLink,
}: F_SERVICE) => {
  return (
    <div className="h-fit sm:w-[20vw] w-full bg-template-primary text-template-text-primary rounded-lg overflow-hidden space-y-6 pb-6 shadow-lg shadow-black/30">
      <Image
        src={imgUrl || "/placeholder.png"}
        alt="blog-img"
        width={400}
        height={250}
        className="w-full h-[250px] object-cover"
      />
      <div className="px-6 space-y-1">
        <h2 className="font-semibold text-xl tracking-tight text-template-text-primary">
          {title}
        </h2>
        <div
          className="
    prose prose-xl sm:prose-base max-w-none text-template-text-primary/80
    prose-p:text-template-text-primary/80
    prose-strong:text-template-text-primary/80
    prose-h1:text-template-text-primary/80
    prose-h2:text-template-text-primary/80
    prose-h3:text-template-text-primary/80
    prose-h4:text-template-text-primary/80
    prose-h5:text-template-text-primary/80
    prose-h6:text-template-text-primary/80
    line-clamp-6
  "
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
      <div className="w-full flex justify-between items-center px-6">
        <FViewMoreDrawer
          type="Services"
          content={{ imgUrl, title, description, category: category || "", btnText, btnLink }}
        >
          <Button
            variant={"link"}
            className="flex items-center px-0 text-template-text-primary font-semibold text-xl sm:text-base"
          >
            View Details
          </Button>
        </FViewMoreDrawer>
        <FViewMoreDrawer
          type="Services"
          content={{ imgUrl, title, description, category: category || "", btnText, btnLink }}
        >
          <Button
            variant="default"
            className="flex items-center text-template-text-primary border border-template-text-primary/50 hover:bg-template-text-primary/10 rounded-full font-semibold bg-template-primary"
          >
            <ArrowUpRight size={20} />
          </Button>
        </FViewMoreDrawer>
      </div>
    </div>
  );
};
