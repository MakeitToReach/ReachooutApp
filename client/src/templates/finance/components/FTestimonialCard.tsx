import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { IconStarFilled } from "@tabler/icons-react";

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
  "
                dangerouslySetInnerHTML={{ __html: description }}
            />
            <div className="flex gap-1">
                {Array.from({ length: rating }).map((_, index) => (
                    <IconStarFilled key={index} className="text-yellow-400" />
                ))}
            </div>
        </div>
    );
};
