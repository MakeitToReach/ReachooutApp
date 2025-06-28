import { Button } from "@/components/ui/button";
import { LucideArrowRight } from "lucide-react";
import Image from "next/image";

interface FServicesCardProps {
    imgUrl: string;
    title: string;
    description: string;
}
export const FServicesCard = ({
    imgUrl,
    title,
    description,
}: FServicesCardProps) => {
    return (
        <div className="h-fit sm:w-[20vw] w-full bg-white rounded-lg overflow-hidden space-y-6 pb-6 shadow-lg shadow-black/30">
            <Image
                src={imgUrl || "/placeholder.png"}
                alt="blog-img"
                width={100}
                height={100}
                className="w-full h-[250px] object-cover"
            />
            <div className="px-6 space-y-1">
                <h2 className="font-semibold text-lg tracking-tight text-black">
                    {title}
                </h2>
                <p className="text-xs line-clamp-3 leading-8 text-gray-600">
                    {description}
                </p>
            </div>
            <div className="w-full flex justify-between items-center px-6">
                <Button
                    variant={"link"}
                    className="flex items-center px-0 text-green-500 font-semibold "
                >
                    View Details
                </Button>
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
