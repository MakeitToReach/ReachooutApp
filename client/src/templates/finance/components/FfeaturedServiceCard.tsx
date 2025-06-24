import { LucideCalendar } from "lucide-react";

interface FeaturedServiceCardProps {
    title: string;
    description: string;
}
export const FeaturedServiceCard = ({
    title,
    description,
}: FeaturedServiceCardProps) => {
    return (
        <div className="flex gap-4 items-center">
            <LucideCalendar size={100} className="font-light" />

            <div className="flex flex-col gap-3">
                <h2 className="font-semibold text-lg tracking-tight">{title}</h2>
                <p className="text-xs">{description}</p>
            </div>
        </div>
    );
};
