import { getIconFromRegistry } from "@/lib/utils";

interface FWhyChooseUsCardProps {
    icon: string;
    title: string;
    description: string;
}
export const FWhyChooseUsCard = ({
    icon,
    title,
    description,
}: FWhyChooseUsCardProps) => {
    return (
        <div className="flex flex-col gap-3 shadow-xl shadow-black/20 rounded-lg p-6 text-template-text-primary">
            <div className="text-lg">{getIconFromRegistry(icon)}</div>
            <h2 className="font-semibold text-2xl tracking-tight">{title}</h2>
            <p className="line-clamp-4 text-sm">{description}</p>
        </div>
    );
};
