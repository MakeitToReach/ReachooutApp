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
        <div className="h-fit sm:w-[20vw] w-full bg-white rounded-lg overflow-hidden space-y-6 pb-6 shadow-lg shadow-black/30">
            <Image
                src={imgUrl || "/placeholder.png"}
                alt="blog-img"
                width={400}
                height={250}
                className="w-full h-[250px] object-cover"
            />
            <div className="px-6 space-y-1">
                <h2 className="font-semibold text-lg tracking-tight text-black">
                    {title}
                </h2>
                <div
                    className="
    prose prose-sm max-w-none text-gray-600
    prose-p:text-gray-600
    prose-strong:text-gray-600
    prose-h1:text-gray-600
    prose-h2:text-gray-600
    prose-h3:text-gray-600
    prose-h4:text-gray-600
    prose-h5:text-gray-600
    prose-h6:text-gray-600
  "
                    dangerouslySetInnerHTML={{ __html: description }}
                />
            </div>
            <div className="w-full flex justify-between items-center px-6">
                <FViewMoreDrawer type="Services" content={{ imgUrl, title, description, category: category || "" }}>
                    <Button
                        variant={"link"}
                        className="flex items-center px-0 text-template-accent-primary font-semibold "
                    >
                        View Details
                    </Button>
                </FViewMoreDrawer>
                <Button
                    variant={"outline"}
                    className="flex items-center text-black p-2 rounded-full font-semibold "
                >
                    <LucideArrowRight size={40} className="font-semibold" />
                </Button>
            </div>
        </div>
    );
};
