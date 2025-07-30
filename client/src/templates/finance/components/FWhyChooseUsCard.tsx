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
            <div className="text-lg">
                {getIconFromRegistry(icon, {
                    className: "size-14",
                })}
            </div>
            <h2 className="font-semibold text-2xl tracking-tight">{title}</h2>
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
        </div>
    );
};
