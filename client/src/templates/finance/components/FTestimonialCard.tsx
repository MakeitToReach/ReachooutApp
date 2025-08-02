import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { IconStarFilled } from "@tabler/icons-react";
import { useState } from "react";

interface FTestimonialCardProps {
    avatarUrl: string;
    name: string;
    designation: string;
    description: string;
    rating: number;
}
export const FTestimonialCard = ({
    avatarUrl,
    name,
    designation,
    description,
    rating,
}: FTestimonialCardProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    // Check if content is longer than 5 lines (approximate)
    const shouldShowReadMore = description.length > 200; // Rough estimate for 5 lines

    return (
        <div className="flex flex-col gap-6 bg-template-primary shadow-lg shadow-black/20 text-template-text-primary rounded-lg p-10">
            <div className="flex gap-2 items-center">
                <Avatar className="size-12">
                    <AvatarImage
                        src={avatarUrl || "/placeholder.png"}
                        alt="testimonial-user-img"
                        className="object-cover"
                    />
                    <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div>
                    <h2 className="font-semibold">{name}</h2>
                    <h3 className="font-semibold opacity-50">{designation}</h3>
                </div>
            </div>
            <div
                className={cn(
                    "prose prose-xl sm:prose-base max-w-none text-template-text-primary",
                    "prose-p:text-template-text-primary",
                    "prose-strong:text-template-text-primary",
                    "prose-h1:text-template-text-primary",
                    "prose-h2:text-template-text-primary",
                    "prose-h3:text-template-text-primary",
                    "prose-h4:text-template-text-primary",
                    "prose-h5:text-template-text-primary",
                    "prose-h6:text-template-text-primary",
                    { "line-clamp-5": !isExpanded && shouldShowReadMore }
                )}
                dangerouslySetInnerHTML={{ __html: description }}
            />
            <div className="flex gap-1">
                {Array.from({ length: rating }).map((_, index) => (
                    <IconStarFilled key={index} className="text-yellow-400" />
                ))}
            </div>
            {shouldShowReadMore && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsExpanded(!isExpanded);
                    }}
                    className="mt-2 text-sm font-medium text-template-text-primary hover:text-template-accent-primary/80 transition-colors"
                >
                    {isExpanded ? "Read less" : "Read more"}
                </button>
            )}
        </div>
    );
};
