interface FWhyChooseUsCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}
export const FWhyChooseUsCard = ({
    icon,
    title,
    description,
}: FWhyChooseUsCardProps) => {
    return (
        <div className="flex flex-col gap-3 shadow-xl rounded-lg p-6">
            <div className="text-lg">
                {icon}
            </div>
            <h2 className="font-semibold text-2xl tracking-tight">
                {title}
            </h2>
            <p className="line-clamp-4 text-sm">{description}</p>
        </div>
    );
};
