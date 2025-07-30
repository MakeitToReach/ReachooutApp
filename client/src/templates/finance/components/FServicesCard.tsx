import { Button } from "@/components/ui/button";
import { LucideArrowRight } from "lucide-react";
import Image from "next/image";
import { FViewMoreDrawer } from "@/components/template-components/finance/FViewMoreDrawer";

interface FServicesCardProps {
    imgUrl: string;
    title: string;
    description: string;
    category?: string;
}
export const FServicesCard = ({
    imgUrl,
    title,
    description,
    category,
}: FServicesCardProps) => {
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
  "
                    dangerouslySetInnerHTML={{ __html: description }}
                />
            </div>
            <div className="w-full flex justify-between items-center px-6">
                <FViewMoreDrawer type="Services" content={{ imgUrl, title, description, category: category || "" }}>
                    <Button
                        variant={"link"}
                        className="flex items-center px-0 text-template-text-primary font-semibold text-xl sm:text-base"
                    >
                        View Details
                    </Button>
                </FViewMoreDrawer>
                <Button
                    variant={"outline"}
                    className="flex items-center bg-transparent border-template-text-primary text-template-text-primary p-2 rounded-full font-semibold "
                >
                    <LucideArrowRight size={40} className="font-semibold" />
                </Button>
            </div>
        </div>
    );
};
