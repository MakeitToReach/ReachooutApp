import { getIconFromRegistry } from "@/lib/utils";

interface FeaturedServiceCardProps {
    icon: string;
    title: string;
    subtitle: string;
}
export const FeaturedServiceCard = ({
    title,
    subtitle,
    icon,
}: FeaturedServiceCardProps) => {
    return (
        <div className="flex gap-4 items-center text-template-text-primary">
            <div className="size-20 bg-template-accent-primary  rounded-full flex items-center justify-center">
                {getIconFromRegistry(icon, { className: "sm:size-20 size-14 text-template-text-accent-primary" })}
            </div>

            <div className="flex flex-col gap-3">
                <h2 className="font-semibold text-lg tracking-tight">{title}</h2>
                <p className="text-xs">{subtitle}</p>
            </div>
        </div>
    );
};
